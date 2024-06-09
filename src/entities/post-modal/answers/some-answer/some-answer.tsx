import React, { memo } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'

import styles from '../../comments/some-comment/some-comment.module.scss'

import { useChangeCommentAnswerLikeStatusMutation } from '@/shared/api/services/posts/posts.api'
import { AnswerType } from '@/shared/api/services/posts/posts.api.types'
import { RoutersPath } from '@/shared/constants/paths'
import { CommentAndAnswer } from '@/shared/ui/comments/comment-and-answer'
import { findDate } from '@/shared/utils'

export const SomeAnswer = memo(
  ({
    answerClickHandler,
    postId,
    id,
    commentId,
    from,
    content,
    createdAt,
    likeCount,
    isLiked,
    isLoggedIn,
    likeChange,
    userNameClickHandler,
  }: AnswerType & {
    postId: number
    isLoggedIn: boolean
    likeChange: () => void
    answerClickHandler: () => void
    userNameClickHandler: (name: string) => void
  }) => {
    const router = useRouter()
    const answerCreatedAt = findDate.difference(createdAt)
    const [changeCommentAnswerLikeStatus] = useChangeCommentAnswerLikeStatusMutation()
    const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
    const likeClickHandler = () => {
      likeChange()
      changeCommentAnswerLikeStatus({
        postId,
        answerId: id,
        commentId,
        likeStatus: isLiked ? 'DISLIKE' : 'LIKE',
      })
        .unwrap()
        .catch(() => {
          likeChange()
          toast.error(tError('SomethingWentWrong'))
        })
    }

    return (
      <div className={styles.commentContainer}>
        <CommentAndAnswer
          from={from}
          createdAt={answerCreatedAt}
          content={content}
          likeCount={likeCount}
          isLiked={isLiked}
          isLoggedIn={isLoggedIn}
          likeClickHandler={likeClickHandler}
          authorClickHandler={() => router.push(`${RoutersPath.profile}/${from.id}`)}
          answerClickHandler={answerClickHandler}
          userNameClickHandler={userNameClickHandler}
        />
      </div>
    )
  }
)
