import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PostLikeAvatar } from '@/shared/api/services/posts/posts.api.types'
import { RootState } from '@/shared/providers/store-provider'

const postSlice = createSlice({
  name: 'post',
  initialState: {
    currentPhotoIndex: 0,
    photosCount: 0,
    isPostLiked: null as boolean | null,
    postLikesCount: null as number | null,
    likeAvatar: null as PostLikeAvatar | null,
    threeLikeAvatars: null as Array<PostLikeAvatar> | null,
  },
  reducers: {
    setCurrentPhotoIndex(state, action: PayloadAction<number>) {
      state.currentPhotoIndex = action.payload
    },
    setPhotosCount(state, action: PayloadAction<number>) {
      state.photosCount = action.payload
    },
    setIsPostLiked(state, action: PayloadAction<boolean | null>) {
      state.isPostLiked = action.payload
    },
    setPostLikesCount(state, action: PayloadAction<number | null>) {
      state.postLikesCount = action.payload
    },
    setThreeLikeAvatars(state, action: PayloadAction<Array<PostLikeAvatar> | null>) {
      state.threeLikeAvatars = action.payload
    },
    setLikeAvatar(state, action: PayloadAction<PostLikeAvatar | null>) {
      state.likeAvatar = action.payload
    },
  },
})

export const {
  setCurrentPhotoIndex,
  setPhotosCount,
  setIsPostLiked,
  setPostLikesCount,
  setThreeLikeAvatars,
  setLikeAvatar,
} = postSlice.actions
export const postReducer = postSlice.reducer

export const selectCurrentPhotoIndex = (state: RootState) => state.post.currentPhotoIndex
export const selectPhotosCount = (state: RootState) => state.post.photosCount
export const selectIsPostLiked = (state: RootState) => state.post.isPostLiked
export const selectPostLikesCount = (state: RootState) => state.post.postLikesCount
export const selectThreeLikeAvatars = (state: RootState) => state.post.threeLikeAvatars
export const selectLikeAvatar = (state: RootState) => state.post.likeAvatar
