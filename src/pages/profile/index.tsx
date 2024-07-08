import React, { useEffect, useState } from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDispatch, useSelector } from 'react-redux'

import style from './profile.module.scss'

import { SomePost } from '@/entities/some-post/some-post'
import { ProfileData } from '@/features/profile-data/profile-data'
import { selectIsLoggedIn } from '@/shared/api'
import { setLikeAvatar } from '@/shared/api/services/posts/post.slice'
import { useLazyGetPublicUserPostsQuery } from '@/shared/api/services/posts/posts.api'
import { useLazyGetProfileUserQuery } from '@/shared/api/services/profile/profile.api'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const postsAmount = 9

function Profile() {
  const [getProfile, { data: profileData }] = useLazyGetProfileUserQuery()
  const [getUserPosts, { data: userPost }] = useLazyGetPublicUserPostsQuery()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(postsAmount)
  const [pageCount, setPageCount] = useState(1)
  const [userId, setUserId] = useState<number | null>(null)
  const [totalCount, setTotalCount] = useState(postsAmount)
  const [endCursorPostId, setEndCursorPostId] = useState(0)
  const [isFetching, setIsFetching] = useState(true)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const posts = userPost?.items || []
  const dispatch = useDispatch()

  dispatch(setLikeAvatar({ id: profileData?.id, url: profileData?.avatars[1]?.url }))

  useEffect(() => {
    getProfile()
      .unwrap()
      .then(res => {
        if (res.id) {
          setUserId(res.id)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (userId && isFetching && posts.length < totalCount) {
      getUserPosts({ userId, pageNumber, pageSize, endCursorPostId })
        .unwrap()
        .then(res => {
          setPageCount(res.pagesCount)
          setPageSize(prev => prev + postsAmount)
          setIsFetching(false)
          setTotalCount(res.totalCount)
        })
    }
  }, [isFetching, userId])

  const scrollHandler = () => {
    const { scrollHeight } = document.documentElement
    const { scrollTop } = document.documentElement
    const { innerHeight } = window

    if (scrollHeight - (scrollTop + innerHeight) < 100 && posts.length < totalCount) {
      setIsFetching(true)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return () => document.removeEventListener('scroll', scrollHandler)
  }, [totalCount])

  return (
    <div className={style.profileContainer}>
      <ProfileData profileData={profileData} />
      <div className={style.photosContainer}>
        {posts.map(p => (
          <SomePost key={p.id} p={p} isLoggedIn={isLoggedIn} profileData={profileData} />
        ))}
      </div>
    </div>
  )
}

Profile.getLayout = getLayout
export default Profile
