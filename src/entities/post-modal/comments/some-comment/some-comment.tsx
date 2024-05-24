import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'

import styles from './some-comment.module.scss'

import { useChangeCommentLikeStatusMutation } from '@/shared/api/services/posts/posts.api'
import { CommentType } from '@/shared/api/services/posts/posts.api.types'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import { LikeIcon } from '@/shared/assets/icons/icons/like-icon'
import { LikeRedIcon } from '@/shared/assets/icons/icons/like-red-icon'
import { RoutersPath } from '@/shared/constants/paths'
import { findDate } from '@/shared/utils'

export const SomeComment = ({
  id,
  postId,
  from,
  content,
  createdAt,
  likeCount,
  isLiked,
  isLoggedIn,
  likeChange,
}: CommentType & {
  key: number
  isLoggedIn: boolean
  likeChange: () => void
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

  return (
    <div className={styles.commentContainer}>
      <div
        className={styles.avatarContainer}
        onClick={() => router.push(`${RoutersPath.profile}/${from.id}`)}
      >
        <Image src={from.avatars[1]?.url ?? noImage} alt={'avatar'} objectFit="cover" fill={true} />
      </div>
      <div className={styles.commentTextAndLikeWrapper}>
        <div className={styles.commentTextContainer}>
          <p className={styles.commentText}>
            <span
              className={styles.commentTextName}
              onClick={() => router.push(`${RoutersPath.profile}/${from.id}`)}
            >
              <strong>{from.username}</strong>
            </span>
            {content}
          </p>
          <div className={styles.commentLikeContainer} onClick={likeClickHandler}>
            {isLiked ? <LikeRedIcon /> : <LikeIcon />}
          </div>
        </div>
        <div className={styles.commentInfoContainer}>
          <p className={styles.commentTime}>{commentCreatedAt}</p>
          {isLoggedIn && (
            <>
              <p className={styles.commentLikes}>
                {t('Likes')}: {likeCount}
              </p>
              <p className={styles.commentAnswer}>{t('Answer')}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
