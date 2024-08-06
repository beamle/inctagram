import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

import styles from './comment.module.scss'

import { AddComment } from '@/entities/post-modal/comments/add-comment/add-comment'
import { SomeComment } from '@/entities/post-modal/comments/some-comment/some-comment'
import { Description } from '@/entities/post-modal/description/description'
import { PostAction } from '@/entities/post-modal/post-action/post-action'
import { selectIsLoggedIn, useGetProfileUserQuery } from '@/shared/api'
import { useLazyGetPostCommentsQuery } from '@/shared/api/services/posts/posts.api'
import {
  AnswerType,
  CommentType,
  PostResponseType,
} from '@/shared/api/services/posts/posts.api.types'
import { Skeleton } from '@/shared/ui/comments/skeleton/skeleton'
import { concatExcludeDuplicates } from '@/shared/utils/concat-exclude-duplicates'

export const Comments = (props: PostResponseType) => {
  const { createdAt, id } = props
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const [pageNumber, setPageNumber] = useState(1)
  const [items, setItems] = useState<Array<CommentType> | undefined>(undefined)
  const [nextPageLoading, setNextPageLoading] = useState(false)
  const [commentIdForAnswer, setCommentIdForAnswer] = useState<number | undefined>(undefined)
  const [commentAuthor, setCommentAuthor] = useState<string | undefined>(undefined)
  const [newAnswer, setNewAnswer] = useState<AnswerType | undefined>(undefined)
  const [getComments, { data: commentData, isLoading }] = useLazyGetPostCommentsQuery()
  const { data: userData } = useGetProfileUserQuery()
  const userId = userData?.id
  const newCommentRef = useRef<HTMLDivElement>(null)
  const viewCommentRef: React.MutableRefObject<
    HTMLDivElement | null | Map<number, HTMLDivElement>
  > = useRef(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setPageNumber(prevNumber => prevNumber + 1)
    }
  })
  const likeChangeHandler = useCallback((item: CommentType) => {
    setItems(prevState =>
      prevState
        ? prevState.map(el =>
            el.id === item.id && el.postId === item.postId
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

  useEffect(() => {
    isLoggedIn &&
      getComments({
        postId: id,
        pageNumber: 1,
        pageSize: 10,
      })
        .unwrap()
        .then(res => {
          setItems(res.items)
          if (+res.totalCount / res.pageSize > 1) {
            observer.observe(bottomRef?.current as HTMLDivElement)
          }
        })
        .catch(() => {
          toast.error(tError('SomethingWentWrong'))
        })

    return () => {
      observer.disconnect()
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (pageNumber > 1 && items && commentData && commentData?.totalCount > items?.length) {
      setNextPageLoading(true)
      getComments({
        postId: id,
        pageNumber,
        pageSize: 10,
      })
        .unwrap()
        .then(res => {
          if (items) {
            setItems(prevItems => concatExcludeDuplicates(prevItems, res.items))
          }
          if (res.totalCount === commentData?.totalCount)
            observer.unobserve(bottomRef?.current as HTMLDivElement)
          setNextPageLoading(false)
        })
        .catch(() => {
          toast.error(tError('SomethingWentWrong'))
        })
    }
  }, [pageNumber])
  const myComments = items?.filter(com => com.from.id === userId) as CommentType[]
  const notMyComments = items?.filter(com => com.from.id !== userId) as CommentType[]
  const sortedComments = myComments && notMyComments ? [...myComments, ...notMyComments] : items
  const addNewComment = useCallback(
    (newItem: CommentType) => {
      !!items && setItems([newItem, ...items])
      newCommentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      setCommentAuthor(undefined)
    },
    [items]
  )
  const addNewAnswer = useCallback(
    (newAnswer: AnswerType) => {
      !!items &&
        setItems(
          items.map(el =>
            el.id === newAnswer.commentId ? { ...el, answerCount: el.answerCount + 1 } : el
          )
        )
      newAnswer && setNewAnswer(newAnswer)
      setCommentAuthor(undefined)
    },
    [items]
  )
  const viewAnswers = useCallback(
    (commentId: number) => {
      const map = getMap() as Map<number, HTMLDivElement>
      const node = map?.get(commentId)

      node?.scrollIntoView({ block: 'start', inline: 'start', behavior: 'smooth' })
    },
    [viewCommentRef]
  )
  const resetNewAnswer = useCallback(() => setNewAnswer(undefined), [])
  const changeCommentIdForAnswer = useCallback(
    (commentId: number | undefined) => setCommentIdForAnswer(commentId),
    []
  )
  const getMap = () => {
    if (!viewCommentRef.current) {
      viewCommentRef.current = new Map()
    }

    return viewCommentRef.current
  }
  const likeChange = useCallback((item: CommentType) => likeChangeHandler(item), [])
  const answerClick = useCallback((item: CommentType, authorName?: string | undefined) => {
    const itemValue = authorName ? { ...item, from: { ...item.from, username: authorName } } : item

    setCommentIdForAnswer(itemValue.id)
    setCommentAuthor(itemValue.from.username)
  }, [])

  return (
    <div className={styles.commentContainerWrapper}>
      <div className={styles.allComments} ref={newCommentRef}>
        <Description {...props} isLoggedIn={isLoggedIn} />
        {sortedComments?.map(item => {
          const refCallback = (node: HTMLDivElement | null) => {
            const map = getMap() as Map<number, HTMLDivElement>

            if (node) {
              map.set(item.id, node)
            } else {
              map.delete(item.id)
            }
          }

          return (
            <>
              <div ref={refCallback} key={item.id}>
                <SomeComment
                  item={item}
                  isLoggedIn
                  answerClickHandler={answerClick}
                  likeChange={likeChange}
                  newAnswer={item.id === commentIdForAnswer ? newAnswer : undefined}
                  changeCommentIdForAnswer={changeCommentIdForAnswer}
                  resetNewAnswer={resetNewAnswer}
                  viewAnswers={viewAnswers}
                />
              </div>
            </>
          )
        })}
        <div ref={bottomRef} className={styles.skeleton}>
          {(isLoading || nextPageLoading) && [1, 2, 3, 4, 5, 6].map(n => <Skeleton key={n} />)}
        </div>
      </div>
      <PostAction id={id} createdAt={createdAt} />
      {isLoggedIn && (
        <AddComment
          {...props}
          addNewComment={addNewComment}
          addNewAnswer={addNewAnswer}
          commentIdForAnswer={commentIdForAnswer}
          commentAuthor={commentAuthor}
        />
      )}
    </div>
  )
}
