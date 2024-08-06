import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { baseURL } from '../base-url.api'

import {
  GetAllPostsArgs,
  GetAllPublicPostsResponseType,
  CreatePostCommentRequestType,
  CreatePostCommentResponseType,
  GetUserPostsRequestType,
  GetUserPostsResponseType,
  ImagesResponse,
  PostResponseType,
  PostsType,
  UpdatePostRequestType,
  GetCommentsRequestType,
  GetCommentsResponseType,
  ChangeCommentLikeStatusType,
  CreatePostCommentAnswerResponseType,
  CreatePostCommentAnswerRequestType,
  GetCommentAnswersRequestType,
  GetCommentAnswersResponseType,
  ChangeCommentAnswerLikeStatusType,
  ChangePostLikeStatusType,
  GetPostLikesResponseType,
  GetPostLikesRequestType,
} from '@/shared/api/services/posts/posts.api.types'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [
    'editPost',
    'deletePost',
    'createPost',
    'getPostComments',
    'getPostCommentAnswers',
    'getPostLikes',
    'getPublicPost',
    'getAllPublicPosts',
  ],
  endpoints: build => {
    return {
      createPost: build.mutation<PostResponseType, PostsType>({
        query: body => {
          return {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: 'posts',
            body,
          }
        },
        invalidatesTags: ['createPost'],
      }),
      getPublicPost: build.query<PostResponseType, number>({
        query: postId => {
          return {
            method: 'GET',
            url: `public-posts/${postId}`,
          }
        },
        providesTags: ['editPost', 'getPublicPost'],
      }),
      getAllPublicPosts: build.query<GetAllPublicPostsResponseType, GetAllPostsArgs>({
        query: ({ endCursorPostId, pageSize, sortBy, sortDirection }) => {
          return {
            method: 'GET',
            url: `public-posts/all/${endCursorPostId}`,
            params: {
              pageSize,
              sortBy,
              sortDirection,
            },
          }
        },
        providesTags: ['getAllPublicPosts'],
      }),
      deletePost: build.mutation<void, number>({
        query: postId => {
          return {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/${postId}`,
          }
        },
        invalidatesTags: ['deletePost'],
      }),
      getPublicUserPosts: build.query<GetUserPostsResponseType, GetUserPostsRequestType>({
        query: ({ userId, pageNumber, pageSize, endCursorPostId }) => {
          return {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `public-posts/user/${userId}/${endCursorPostId}`,
            params: {
              pageSize,
              pageNumber,
            },
          }
        },
        providesTags: ['deletePost', 'createPost'],
      }),
      uploadImage: build.mutation<ImagesResponse, FormData>({
        query: body => {
          return {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: 'posts/image',
            body,
          }
        },
      }),
      updatePost: build.mutation<void, UpdatePostRequestType>({
        query: ({ postId, body }) => {
          return {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/${postId}`,
            body,
          }
        },
        invalidatesTags: ['editPost'],
      }),
      getPostLikes: build.query<GetPostLikesResponseType, GetPostLikesRequestType>({
        query: ({ postId, search, pageSize, pageNumber, cursor }) => {
          return {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/${postId}/likes`,
            params: { search, pageSize, pageNumber, cursor },
          }
        },
        providesTags: ['getPostLikes'],
      }),
      changePostLikeStatus: build.mutation<void, ChangePostLikeStatusType>({
        query: ({ postId, likeStatus }) => {
          return {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/${postId}/like-status`,
            body: { likeStatus },
          }
        },
      }),
      createPostComment: build.mutation<
        CreatePostCommentResponseType,
        CreatePostCommentRequestType
      >({
        query: ({ postId, content }) => {
          return {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/${postId}/comments`,
            body: { content },
          }
        },
        invalidatesTags: ['getPostComments'],
      }),
      createPostCommentAnswer: build.mutation<
        CreatePostCommentAnswerResponseType,
        CreatePostCommentAnswerRequestType
      >({
        query: ({ postId, commentId, content }) => {
          return {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/${postId}/comments/${commentId}/answers`,
            body: { content },
          }
        },
        invalidatesTags: ['getPostCommentAnswers'],
      }),
      changeCommentLikeStatus: build.mutation<void, ChangeCommentLikeStatusType>({
        query: ({ postId, commentId, likeStatus }) => {
          return {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/${postId}/comments/${commentId}/like-status`,
            body: { likeStatus },
          }
        },
        invalidatesTags: ['getPostComments'],
      }),
      changeCommentAnswerLikeStatus: build.mutation<void, ChangeCommentAnswerLikeStatusType>({
        query: ({ postId, commentId, answerId, likeStatus }) => {
          return {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
            body: { likeStatus },
          }
        },
        invalidatesTags: ['getPostCommentAnswers'],
      }),
      getPostComments: build.query<GetCommentsResponseType, GetCommentsRequestType>({
        query: ({ postId, pageNumber, pageSize, sortBy, sortDirection }) => {
          return {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/${postId}/comments`,
            params: {
              pageSize,
              pageNumber,
              sortBy,
              sortDirection,
            },
          }
        },
        providesTags: ['getPostComments'],
      }),
      getPostCommentAnswers: build.query<
        GetCommentAnswersResponseType,
        GetCommentAnswersRequestType
      >({
        query: ({ postId, commentId, pageNumber, pageSize, sortBy, sortDirection }) => {
          return {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/${postId}/comments/${commentId}/answers`,
            params: {
              pageSize,
              pageNumber,
              sortBy,
              sortDirection,
            },
          }
        },
        providesTags: ['getPostCommentAnswers'],
      }),
    }
  },
})

export const {
  useCreatePostMutation,
  useUploadImageMutation,
  useLazyGetAllPublicPostsQuery,
  useLazyGetPublicPostQuery,
  useLazyGetPublicUserPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useCreatePostCommentMutation,
  useCreatePostCommentAnswerMutation,
  useLazyGetPostCommentsQuery,
  useChangeCommentLikeStatusMutation,
  useChangePostLikeStatusMutation,
  useChangeCommentAnswerLikeStatusMutation,
  useLazyGetPostCommentAnswersQuery,
  useLazyGetPostLikesQuery,
} = postsApi
