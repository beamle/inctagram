import React, { memo, useCallback, useEffect, useState } from 'react'

import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'

import styles from './some-comment.module.scss'

import { SomeAnswer } from '@/entities/post-modal/answers/some-answer/some-answer'
import {
  useChangeCommentLikeStatusMutation,
  useLazyGetPostCommentAnswersQuery,
} from '@/shared/api/services/posts/posts.api'
import { AnswerType, CommentType } from '@/shared/api/services/posts/posts.api.types'
import { RoutersPath } from '@/shared/constants/paths'
import { useTriggerAddTimeout } from '@/shared/hooks/use-trigger-add-timeout'
import { CircularLoader } from '@/shared/ui'
import { CommentAndAnswer } from '@/shared/ui/comments/comment-and-answer'
import { Skeleton } from '@/shared/ui/comments/skeleton/skeleton'
import { findDate } from '@/shared/utils'
import { concatExcludeDuplicates } from '@/shared/utils/concat-exclude-duplicates'
type SomeCommentType = {
  item: CommentType
  isLoggedIn: boolean
  likeChange: (item: CommentType) => void
  newAnswer?: AnswerType | undefined
  answerClickHandler: (item: CommentType, authorName?: string | undefined) => void
  changeCommentIdForAnswer: (commentId: number | undefined) => void
  resetNewAnswer: () => void
  viewAnswers: (commentId: number) => void
}

export const SomeComment = memo(
  ({
    item,
    answerClickHandler,
    isLoggedIn,
    likeChange,
    newAnswer,
    changeCommentIdForAnswer,
    resetNewAnswer,
    viewAnswers,
  }: SomeCommentType) => {
    const { id, content, createdAt, likeCount, isLiked, answerCount, postId, from } = item
    const router = useRouter()
    const { t } = useTranslation('common', { keyPrefix: 'Post' })
    const commentCreatedAt = findDate.difference(createdAt)
    const [changeCommentLikeStatus] = useChangeCommentLikeStatusMutation()
    const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
    const likeClickHandler = () => {
      likeChange(item)
      changeCommentLikeStatus({
        postId,
        commentId: id,
        likeStatus: isLiked ? 'DISLIKE' : 'LIKE',
      })
        .unwrap()
        .catch(() => {
          likeChange(item)
          toast.error(tError('SomethingWentWrong'))
        })
    }
    const [openAnswers, setOpenAnswers] = useState(false)
    const [answers, setAnswers] = useState<Array<AnswerType> | undefined>(undefined)
    const [answerDownloadCount, setAnswerDownloadCount] = useState(answerCount)
    const [getCommentAnswers, { isLoading: answerIsLoading }] = useLazyGetPostCommentAnswersQuery()
    const [pageNumber, setPageNumber] = useState(0)
    const [nextPageLoading, setNextPageLoading] = useState(false)

    useEffect(() => {
      if (newAnswer) {
        !!answers && setAnswers([newAnswer, ...answers])
        if (!openAnswers) {
          viewAnswersClickHandler()
        }
        resetNewAnswer()
        changeCommentIdForAnswer(undefined)
      }
    }, [newAnswer])
    const userNameClickHandler = useCallback((name: string) => {
      const userId = answers?.find(answer => answer.from.username === name)?.from.id

      if (from.username === name) void router.push(`${RoutersPath.profile}/${from.id}`)
      else if (userId) void router.push(`${RoutersPath.profile}/${userId}`)
    }, [])

    const viewAnswersClickHandler = () => {
      setOpenAnswers(prevState => (!prevState ? true : answerDownloadCount > 0))
      if (!openAnswers || (openAnswers && answerDownloadCount > 0)) {
        setNextPageLoading(true)
        getCommentAnswers({
          postId,
          commentId: id,
          pageSize: 5,
          pageNumber: pageNumber + 1,
        })
          .unwrap()
          .then(res => {
            setAnswers(prevState =>
              prevState ? concatExcludeDuplicates(prevState, res.items) : res.items
            )
            setAnswerDownloadCount(answerDownloadCount - res.items.length)
          })
          .then(() => {
            setPageNumber(PrevState => PrevState + 1)
            setNextPageLoading(false)
            viewAnswers(id)
          })
          .catch(() => {
            toast.error(tError('SomethingWentWrong'))
          })
      }
    }
    const likeAnswerChange = useCallback((answer: AnswerType) => {
      setAnswers(prevState =>
        prevState
          ? prevState.map(el =>
              el.id === answer.id && el.commentId === answer.commentId
                ? {
                    ...el,
                    likeCount: el.isLiked ? el.likeCount - 1 : el.likeCount + 1,
                    isLiked: !el.isLiked,
                  }
                : el
            )
          : undefined
      )
    }, [])
    const answerClick = useCallback((authorName: string) => {
      changeCommentIdForAnswer(id)
      answerClickHandler(item, authorName)
    }, [])
    const answerCountToArray = (answerCount: number) => {
      const answerCountArray = [1]

      if (answerCount > 1)
        for (let i = 2; i <= answerCount && i < 6; i++) {
          answerCountArray.push(i)
        }

      return answerCountArray
    }
    const { switcher } = useTriggerAddTimeout(answerIsLoading, 100)

    return (
      <div className={styles.mainContainer}>
        <div className={styles.commentContainer}>
          <CommentAndAnswer
            answerClickHandler={() => answerClickHandler(item)}
            from={from}
            likeClickHandler={likeClickHandler}
            createdAt={commentCreatedAt}
            authorClickHandler={() => router.push(`${RoutersPath.profile}/${from.id}`)}
            isLoggedIn={isLoggedIn}
            isLiked={isLiked}
            likeCount={likeCount}
            content={content}
            userNameClickHandler={userNameClickHandler}
          />
        </div>
        <div className={styles.answersContainer}>
          {!!answerCount && (
            <div className={styles.answers} onClick={viewAnswersClickHandler}>
              <div className={styles.line}></div>{' '}
              {openAnswers && answerDownloadCount <= 0 ? t('HideAnswers') : t('ViewAnswers')} (
              {answerDownloadCount > 0 ? answerDownloadCount : answerCount})
              <div className={styles.loader}>
                {(answerIsLoading || nextPageLoading) && <CircularLoader />}
              </div>
            </div>
          )}
          <div
            className={openAnswers ? clsx(styles.answersBlock, styles.margin) : styles.answersBlock}
          >
            {switcher && answerCountToArray(answerCount).map(n => <Skeleton key={n} />)}
            {openAnswers &&
              !switcher &&
              answers?.map(answer => (
                <div className={styles.someAnswer} key={answer.id}>
                  <SomeAnswer
                    answer={answer}
                    postId={postId}
                    isLoggedIn
                    answerClickHandler={answerClick}
                    likeChange={likeAnswerChange}
                    userNameClickHandler={userNameClickHandler}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
)
