import React, { useState } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { PostModal } from '@/entities/post-modal/post-modal'
import style from '@/entities/some-post/some-post.module.scss'
import {
  GetPostsResponseType,
  PostResponseType,
  ProfileUserType,
  useLazyGetPublicPostQuery,
} from '@/shared/api'
import { setIsLoggedIn } from '@/shared/api/services/auth/auth.slice'
import {
  setIsPostLiked,
  setPostLikesCount,
  setThreeLikeAvatars,
} from '@/shared/api/services/posts/post.slice'
import { useLazyGetPostLikesQuery } from '@/shared/api/services/posts/posts.api'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'

type Props = {
  isLoggedIn: boolean
  p: GetPostsResponseType
  profileData: ProfileUserType | undefined
}

export const SomePost = (props: Props) => {
  const [isLikesLoading, setIsLikesLoading] = useState(true)
  const [getPostLikes] = useLazyGetPostLikesQuery()
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
  const { isLoggedIn, p, profileData } = props
  const [isPostActive, setIsPostActive] = useState(false)
  const [getPost, { data: postData = {} as PostResponseType }] = useLazyGetPublicPostQuery()
  const togglePostModal = () => setIsPostActive(prevState => !prevState)
  const userName = profileData?.userName
  const dispatch = useDispatch()
  const toggleIsLiked = (isLiked: boolean | null) => {
    dispatch(setIsPostLiked(isLiked))
    setIsLikesLoading(false)
  }
  const postImageClickHandler = () => {
    if (isLoggedIn) {
      getPostLikes({
        postId: p.id,
        pageSize: 4,
        pageNumber: 1,
      })
        .unwrap()
        .then(res => {
          const user = res.items.find(item => item.userName === userName)

          dispatch(setPostLikesCount(res.totalCount))
          dispatch(
            setThreeLikeAvatars(
              res.items?.map(item => ({
                id: item.userId,
                url: item.avatars[1]?.url ?? noImage,
              }))
            )
          )

          if (user) toggleIsLiked(true)
          else if (res.totalCount < 5) toggleIsLiked(false)
          else {
            getPostLikes({
              postId: p.id,
              pageSize: 1,
              pageNumber: 1,
              search: userName,
            })
              .unwrap()
              .then(res => {
                if (res.totalCount) toggleIsLiked(true)
                else toggleIsLiked(false)
              })
              .catch(error => {
                if (error.status == 401) {
                  dispatch(setIsLoggedIn(false))
                  toast.error(tError('NotAuthorization'))
                } else toast.error(tError('SomethingWentWrong'))
              })
          }
        })
        .catch(error => {
          if (error.status == 401) {
            dispatch(setIsLoggedIn(false))
            toast.error(tError('NotAuthorization'))
          } else toast.error(tError('SomethingWentWrong'))
        })
    } else {
      dispatch(setPostLikesCount(p.likesCount))
      dispatch(setThreeLikeAvatars(null))
      toggleIsLiked(null)
    }
    getPost(p.id).unwrap().then(togglePostModal)
  }

  return (
    <>
      <figure className={style.photoWrapper}>
        <Image
          key={p.id}
          src={p?.images[0]?.url}
          alt={'post image'}
          className={style.photo}
          onClick={postImageClickHandler}
          fill
        />
      </figure>
      {isPostActive && !isLikesLoading && (
        <PostModal
          postData={postData}
          togglePostModal={togglePostModal}
          profileData={profileData}
        />
      )}
    </>
  )
}
