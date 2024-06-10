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
import { CircularLoader } from '@/shared/ui'
import { CommentAndAnswer } from '@/shared/ui/comments/comment-and-answer'
import { findDate } from '@/shared/utils'

export const SomeComment = memo(
  ({
    answerCount,
    answerClickHandler,
    id,
    postId,
    from,
    content,
    createdAt,
    likeCount,
    isLiked,
    isLoggedIn,
    likeChange,
    newAnswer,
    changeCommentIdForAnswer,
    resetNewAnswer,
  }: CommentType & {
    key: number
    isLoggedIn: boolean
    likeChange: () => void
    newAnswer?: AnswerType | undefined
    answerClickHandler: (authorName?: string | undefined) => void
    changeCommentIdForAnswer: (commentId: number | undefined) => void
    resetNewAnswer: () => void
  }) => {
    const router = useRouter()
    const { t } = useTranslation('common', { keyPrefix: 'Post' })
    const commentCreatedAt = findDate.difference(createdAt)
    const [changeCommentLikeStatus] = useChangeCommentLikeStatusMutation()
    const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
    const likeClickHandler = () => {
      likeChange()
      changeCommentLikeStatus({
        postId,
        commentId: id,
        likeStatus: isLiked ? 'DISLIKE' : 'LIKE',
      })
        .unwrap()
        .catch(() => {
          likeChange()
          toast.error(tError('SomethingWentWrong'))
        })
    }
    const [openAnswers, setOpenAnswers] = useState(false)
    const [answers, setAnswers] = useState<Array<AnswerType> | undefined>(undefined)
    const [answerDownloadCount, setAnswerDownloadCount] = useState(answerCount)
    const [getCommentAnswers, { isLoading: answerIsLoading }] = useLazyGetPostCommentAnswersQuery()
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
      !!answers && !!newAnswer && setAnswers([newAnswer, ...answers])
      resetNewAnswer()
      changeCommentIdForAnswer(undefined)
    }, [newAnswer])
    const userNameClickHandler = (name: string) => {
      const userId = answers?.find(answer => answer.from.username === name)?.from.id

      if (from.username === name) void router.push(`${RoutersPath.profile}/${from.id}`)
      else if (userId) void router.push(`${RoutersPath.profile}/${userId}`)
    }

    const viewAnswersClickHandler = () => {
      setOpenAnswers(prevState =>
        !prevState
          ? !prevState && (answerDownloadCount === answerCount || answerDownloadCount === 0)
          : answerDownloadCount > 0
      )
      if (!openAnswers || (openAnswers && answerDownloadCount > 0))
        getCommentAnswers({
          postId,
          commentId: id,
          pageSize: 5,
          pageNumber: pageNumber + 1,
        })
          .unwrap()
          .then(res => {
            setAnswers(prevState => (prevState ? [...prevState, ...res.items] : res.items))
            setAnswerDownloadCount(answerDownloadCount - res.items.length)
          })
          .then(() => setPageNumber(PrevState => PrevState + 1))
          .catch(() => {
            toast.error(tError('SomethingWentWrong'))
          })
    }
    const likeAnswerChange = useCallback((item: AnswerType) => {
      setAnswers(prevState =>
        prevState
          ? prevState.map(el =>
              el.id === item.id && el.commentId === item.commentId
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
      answerClickHandler(authorName)
    }, [])

    return (
      <div className={styles.mainContainer}>
        <div className={styles.commentContainer}>
          <CommentAndAnswer
            answerClickHandler={() => answerClickHandler()}
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
              {openAnswers && !answerDownloadCount ? t('HideAnswers') : t('ViewAnswers')} (
              {answerDownloadCount > 0 ? answerDownloadCount : answerCount})
            </div>
          )}
          <div
            className={openAnswers ? clsx(styles.answersBlock, styles.margin) : styles.answersBlock}
          >
            {openAnswers &&
              answers?.map(answer => (
                <div className={styles.someAnswer} key={answer.id}>
                  <SomeAnswer
                    {...answer}
                    postId={postId}
                    isLoggedIn
                    answerClickHandler={() => answerClick(answer.from.username)}
                    likeChange={() => likeAnswerChange(answer)}
                    userNameClickHandler={userNameClickHandler}
                  />
                </div>
              ))}
            <div className={styles.loader}>{answerIsLoading && <CircularLoader />}</div>
          </div>
        </div>
      </div>
    )
  }
)
