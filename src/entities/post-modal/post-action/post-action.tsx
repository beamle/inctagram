import React, { memo } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import styles from './post-action.module.scss'

import { selectIsLoggedIn } from '@/shared/api'
import {
  selectIsPostLiked,
  selectLikeAvatar,
  selectPostLikesCount,
  selectThreeLikeAvatars,
  setIsPostLiked,
  setPostLikesCount,
  setThreeLikeAvatars,
} from '@/shared/api/services/posts/post.slice'
import { useChangePostLikeStatusMutation } from '@/shared/api/services/posts/posts.api'
import { PostLikeAvatar } from '@/shared/api/services/posts/posts.api.types'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import likeIcon from '@/shared/assets/icons/icons/like-icon.svg'
import likeRedIcon from '@/shared/assets/icons/icons/like-red-icon.svg'
import saveIcon from '@/shared/assets/icons/icons/save-icon.svg'
import shareIcon from '@/shared/assets/icons/icons/share-icon.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { findDate } from '@/shared/utils'

type Props = {
  createdAt: string
  id: number
}

export const PostAction = memo((props: Props) => {
  const { createdAt, id } = props
  const userAvatar = useSelector(selectLikeAvatar) as PostLikeAvatar
  const dispatch = useDispatch()
  const setLikesCount = (likesCount: number) => dispatch(setPostLikesCount(likesCount))
  const setIsLiked = (isLiked: boolean) => dispatch(setIsPostLiked(isLiked))
  const setLikeAvatars = (threeLikeAvatars: Array<PostLikeAvatar> | null) =>
    dispatch(setThreeLikeAvatars(threeLikeAvatars))
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isLiked = useSelector(selectIsPostLiked)
  const threeLikeAvatars = useSelector(selectThreeLikeAvatars)
  const likesCount = useSelector(selectPostLikesCount)
  const postCreatedAt = findDate.format(createdAt)
  const router = useRouter()
  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
  const [changePostLikeStatus, { isLoading: changeStatusLoading }] =
    useChangePostLikeStatusMutation()
  const onLikeClickHandler = () => {
    if (!changeStatusLoading) {
      setIsLiked(!isLiked)
      likesCount !== null
        ? setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
        : setLikesCount(1)
      !isLiked
        ? setLikeAvatars(threeLikeAvatars ? [userAvatar, ...threeLikeAvatars] : [userAvatar])
        : setLikeAvatars(threeLikeAvatars?.filter(item => item.id !== userAvatar?.id) ?? null)
      changePostLikeStatus({ postId: id, likeStatus: isLiked ? 'DISLIKE' : 'LIKE' })
        .unwrap()
        .catch(() => {
          setIsLiked(!isLiked)
          likesCount !== null ? setLikesCount(isLiked ? likesCount + 1 : likesCount - 1) : undefined
          !isLiked
            ? setLikeAvatars(threeLikeAvatars?.filter(item => item.id !== userAvatar?.id) ?? null)
            : setLikeAvatars(threeLikeAvatars ? [userAvatar, ...threeLikeAvatars] : [userAvatar])
          toast.error(tError('SomethingWentWrong'))
        })
    }
  }
  const avatarsCount =
    threeLikeAvatars && threeLikeAvatars?.length > 3 ? 3 : threeLikeAvatars?.length ?? 0
  const totalLikesPosition = threeLikeAvatars ? avatarsCount * 16 + 24 : 0
  const likeIconStyle = isLiked ? styles.redIcon : styles.icon

  return (
    <div className={styles.summaryContainer}>
      {isLoggedIn && (
        <div className={styles.actionsContainer}>
          <div className={styles.likeShareContainer}>
            {isLoggedIn && isLiked !== null && (
              <Image
                className={likeIconStyle}
                src={isLiked ? likeRedIcon : likeIcon}
                width={24}
                height={24}
                alt={'like'}
                onClick={onLikeClickHandler}
              />
            )}
            <Image className={styles.icon} src={shareIcon} width={24} height={24} alt={'share'} />
          </div>
          <div>
            <Image className={styles.icon} src={saveIcon} width={24} height={24} alt={'save'} />
          </div>
        </div>
      )}
      {likesCount ? (
        <div className={styles.totalLikes}>
          {threeLikeAvatars?.map((user, index) => {
            const onAvatarClickHandler = () => router.push(`${RoutersPath.profile}/${user?.id}`)
            const positionIndex = avatarsCount ? avatarsCount - index - 1 : 0

            return index < 3 ? (
              <Image
                className={styles.totalLikesAvatar}
                style={{ left: positionIndex * 16 }}
                key={user?.id}
                onClick={onAvatarClickHandler}
                src={user?.url ?? noImage}
                alt={'avatar'}
                width={24}
                height={24}
              />
            ) : undefined
          })}
          <p className={styles.totalLikesCount} style={{ left: totalLikesPosition }}>
            {likesCount.toLocaleString()} {t('Likes')}
          </p>
        </div>
      ) : (
        <div
          className={isLoggedIn ? styles.noLikes : undefined}
          onClick={isLoggedIn ? onLikeClickHandler : undefined}
        >
          {t('NoLikes')}
        </div>
      )}
      <div className={styles.postDate}>{postCreatedAt}</div>
    </div>
  )
})
