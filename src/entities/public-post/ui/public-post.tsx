import React, { useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'

import s from './public-post.module.scss'

import { SomePost } from '@/entities/some-post/some-post'
import { PostResponseType, selectIsLoggedIn } from '@/shared/api'
import { setLikeAvatar } from '@/shared/api/services/posts/post.slice'
import { useLazyGetProfileUserQuery } from '@/shared/api/services/profile/profile.api'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { useTruncateText } from '@/shared/hooks'
import { findDate } from '@/shared/utils/find-date'

export const PublicPost = (post: PostResponseType) => {
  const {
    owner: { lastName, firstName },
    avatarOwner,
    description,
    createdAt,
    ownerId,
    id,
  } = post

  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const postCreatedAt = findDate.difference(createdAt)
  const router = useRouter()

  const { displayShowMore, isShowMoreActive, setIsShowMoreActive, dynamicText } = useTruncateText(
    description,
    80
  )
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const userName = `${firstName} ${lastName}` || t('AnonymousUser')
  const [getProfile, { data: profileData }] = useLazyGetProfileUserQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    isLoggedIn &&
      getProfile()
        .unwrap()
        .then(res => {
          dispatch(setLikeAvatar({ id: res?.id, url: res?.avatars[1]?.url }))
        })
        .catch(() => {})
  }, [isLoggedIn])

  return (
    <div className={s.post} key={id}>
      <div className={s.postLinkWrapper}>
        <SomePost p={post} isLoggedIn={isLoggedIn} profileData={profileData ?? undefined} />
        <div
          className={s.postContentWrapper}
          onClick={() => router.push(`${RoutersPath.profile}/${ownerId}`)}
        >
          <Image src={avatarOwner ?? noImage} width={36} height={36} alt={'Avatar picture'} />
          <h3 className={s.profileUrl}>{userName}</h3>
        </div>
      </div>
      <div>{postCreatedAt}</div>
      <p className={s.postDescription}>
        {dynamicText}{' '}
        {displayShowMore && (
          <span onClick={() => setIsShowMoreActive(!isShowMoreActive)} className={s.showMore}>
            {isShowMoreActive ? 'Hide' : 'Show more'}
          </span>
        )}
      </p>
    </div>
  )
}
