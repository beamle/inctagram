import React, { useCallback, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

import styles from './comment.module.scss'

import { AddComment } from '@/entities/post-modal/comments/add-comment/add-comment'
import { SomeComment } from '@/entities/post-modal/comments/some-comment/some-comment'
import { Description } from '@/entities/post-modal/description/description'
import { selectIsLoggedIn, useMeQuery } from '@/shared/api'
import { useLazyGetPostCommentsQuery } from '@/shared/api/services/posts/posts.api'
import {
  AnswerType,
  CommentType,
  PostResponseType,
} from '@/shared/api/services/posts/posts.api.types'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import likeIcon from '@/shared/assets/icons/icons/like-icon.svg'
import saveIcon from '@/shared/assets/icons/icons/save-icon.svg'
import shareIcon from '@/shared/assets/icons/icons/share-icon.svg'
import { CircularLoader } from '@/shared/ui'
import { findDate } from '@/shared/utils'

export const Comments = (props: PostResponseType) => {
  const { avatarOwner, createdAt, id, likesCount } = props
  const postCreatedAt = findDate.format(createdAt)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { t } = useTranslation('common', { keyPrefix: 'Post' })

  const [pageNumber, setPageNumber] = useState(1)
  const [items, setItems] = useState<Array<CommentType> | undefined>(undefined)
  const [nextPageLoading, setNextPageLoading] = useState(false)
  const [commentsIdForAnswer, setCommentIdForAnswer] = useState<number | undefined>(undefined)
  const [commentAuthor, setCommentAuthor] = useState<string | undefined>(undefined)
  const [newAnswer, setNewAnswer] = useState<AnswerType | undefined>(undefined)
  const [getComments, { data: commentData, isLoading }] = useLazyGetPostCommentsQuery()
  const { data: userData } = useMeQuery()

  const userId = userData?.userId
  const commentRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setPageNumber(prevNumber => prevNumber + 1)
    }
  })
  const likeChange = useCallback((item: CommentType) => {
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
  const answerClickHandler = useCallback((item: CommentType) => {
    setCommentIdForAnswer(item.id)
    setCommentAuthor(item.from.username)
  }, [])

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (items && commentData && commentData?.totalCount > items?.length) {
      setNextPageLoading(true)
      getComments({
        postId: id,
        pageNumber,
        pageSize: 10,
      })
        .unwrap()
        .then(res => {
          if (items) {
            setItems(prevItems => [
              ...(prevItems as CommentType[]),
              ...(res.items as CommentType[]),
            ])
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
  const sortedIComments = myComments && notMyComments ? [...myComments, ...notMyComments] : items
  const addNewComment = useCallback(
    (newItem: CommentType) => {
      !!items && setItems([newItem, ...items])
      commentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      setCommentAuthor(undefined)
    },
    [items]
  )
  const addNewAnswer = (newAnswer: AnswerType) => {
    !!items &&
      setItems(
        items.map(el =>
          el.id === newAnswer.commentId ? { ...el, answerCount: el.answerCount + 1 } : el
        )
      )
    newAnswer && setNewAnswer(newAnswer)
    setCommentAuthor(undefined)
  }

  return (
    <div className={styles.commentContainerWrapper}>
      <div className={styles.allComments} ref={commentRef}>
        <Description {...props} />
        {sortedIComments?.map(item => (
          <SomeComment
            {...item}
            key={item.id}
            isLoggedIn
            answerClickHandler={(authorName?: string | undefined) => {
              answerClickHandler(
                authorName ? { ...item, from: { ...item.from, username: authorName } } : item
              )
            }}
            likeChange={() => likeChange(item)}
            newAnswer={item.id === commentsIdForAnswer ? newAnswer : undefined}
            changeCommentIdForAnswer={(commentId: number | undefined) =>
              setCommentIdForAnswer(commentId)
            }
            resetNewAnswer={() => setNewAnswer(undefined)}
          />
        ))}
        <div ref={bottomRef}>{(isLoading || nextPageLoading) && <CircularLoader />}</div>
      </div>
      <div className={styles.summaryContainer}>
        {isLoggedIn && (
          <div className={styles.actionsContainer}>
            <div className={styles.likeShareContainer}>
              {isLoggedIn && (
                <Image className={styles.icon} src={likeIcon} width={24} height={24} alt={'like'} />
              )}
              <Image className={styles.icon} src={shareIcon} width={24} height={24} alt={'share'} />
            </div>
            <div>
              <Image className={styles.icon} src={saveIcon} width={24} height={24} alt={'save'} />
            </div>
          </div>
        )}
        <div className={styles.totalLikes}>
          <div className={styles.avatarContainer}>
            <Image
              className={styles.totalLikesAvatar}
              src={avatarOwner || noImage}
              alt={'avatar'}
              width={24}
              height={24}
            />
          </div>
          <p className={styles.totalLikesCount}>
            {likesCount.toLocaleString()} {t('Likes')}
          </p>
        </div>
        <div className={styles.postDate}>{postCreatedAt}</div>
      </div>
      {isLoggedIn && (
        <AddComment
          {...props}
          addNewComment={addNewComment}
          addNewAnswer={addNewAnswer}
          commentsIdForAnswer={commentsIdForAnswer}
          commentAuthor={commentAuthor}
        />
      )}
    </div>
  )
}
