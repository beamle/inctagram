import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import styles from '@/entities/post-modal/comments/some-comment/some-comment.module.scss'
import { AuthorType } from '@/shared/api/services/posts/posts.api.types'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import { LikeIcon } from '@/shared/assets/icons/icons/like-icon'
import { LikeRedIcon } from '@/shared/assets/icons/icons/like-red-icon'
export type CommentAndAnswerProps = {
  authorClickHandler: () => void
  createdAt: string
  from: AuthorType
  content: string
  answerClickHandler: () => void
  likeClickHandler: () => void
  likeCount: number
  isLoggedIn: boolean
  isLiked: boolean
  userNameClickHandler: (name: string) => void
}
export const CommentAndAnswer = ({
  authorClickHandler,
  createdAt,
  from,
  content,
  answerClickHandler,
  likeClickHandler,
  likeCount,
  isLoggedIn,
  isLiked,
  userNameClickHandler,
}: CommentAndAnswerProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const editedContentArray = content.trim().split(' ')
  const wordCount = editedContentArray.length
  const addSpaces = (word: string, i: number) => (i < wordCount ? `${word.trim()} ` : word.trim())
  const editedContent = editedContentArray.map((word, i) => {
    if (word.trim().match(/@\S+/g)) {
      return (
        <span
          key={i}
          className={styles.userName}
          onClick={() => userNameClickHandler(word.slice(1))}
        >
          {addSpaces(word, i)}
        </span>
      )
    } else {
      return addSpaces(word, i)
    }
  })

  return (
    <>
      <div className={styles.avatarContainer} onClick={authorClickHandler}>
        <Image src={from.avatars[1]?.url ?? noImage} alt={'avatar'} objectFit="cover" fill={true} />
      </div>
      <div className={styles.commentTextAndLikeWrapper}>
        <div className={styles.commentTextContainer}>
          <div className={styles.commentText}>
            <span className={styles.commentTextName} onClick={authorClickHandler}>
              <strong>{from.username}</strong>
            </span>
            {editedContent}
          </div>
          <div className={styles.commentLikeContainer} onClick={likeClickHandler}>
            {isLiked ? <LikeRedIcon /> : <LikeIcon />}
          </div>
        </div>
        <div className={styles.commentInfoContainer}>
          <p className={styles.commentTime}>{createdAt}</p>
          {isLoggedIn && (
            <>
              <p className={styles.commentLikes}>
                {t('Likes')}: {likeCount}
              </p>
              <p className={styles.commentAnswer} onClick={answerClickHandler}>
                {t('Answer')}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
