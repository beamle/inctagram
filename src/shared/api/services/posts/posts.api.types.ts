export type PostResponseType = {
  avatarOwner: string
  id: number
  description: string
  location: string
  images: ImageDataType[]
  createdAt: string
  updatedAt: string
  ownerId: number
  userName: string
  owner: {
    firstName: string
    lastName: string
  }
  likesCount: number
}
export type PostsType = {
  description: string
  childrenMetadata: {
    uploadId: string
  }[]
}
export type ImageDataType = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}

export type ImagesResponse = {
  images: ImageDataType[]
}

export type GetPostsResponseType = PostResponseType & {
  avatarOwner: string
}

export type GetAllPublicPostsResponseType = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: PostResponseType[]
}

export type GetAllPostsArgs = {
  endCursorPostId?: string // ID of the last uploaded publicPost. If endCursorPostId not provided, the first set of posts is returned.
  pageSize?: string
  sortBy?: string // 'id', 'description', 'location', 'createdAt
  sortDirection?: 'desc' | 'asc' // default desc
}
export type GetUserPostsResponseType = {
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
  items: GetPostsResponseType[]
}

export type GetUserPostsRequestType = {
  userId: number
  pageSize: number
  pageNumber: number
  endCursorPostId: number
}
export type GetCommentsRequestType = {
  postId: number
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  sortDirection?: 'desc' | 'asc'
}
type Avatars = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}
export type AuthorType = {
  id: number
  username: string
  avatars: Array<Avatars>
}
export type CommentType = {
  id: number
  postId: number
  from: AuthorType
  content: string
  createdAt: string
  answerCount: number
  likeCount: number
  isLiked: boolean
}

export type GetCommentsResponseType = {
  pageSize: number
  totalCount: number
  items: Array<CommentType>
}
export type CreatePostRequest = {
  description: string
}
export type UpdatePostRequestType = {
  postId: number
  body: CreatePostRequest
}

export type CreatePostCommentRequestType = {
  postId: number
  content: string
}
export type CreatePostCommentAnswerResponseType = {
  id: number
  commentId: number
  from: AuthorType
  content: string
  createdAt: string
}
export type CreatePostCommentAnswerRequestType = CreatePostCommentRequestType & {
  commentId: number | undefined
}
export type CreatePostCommentResponseType = {
  id: number
  postId: number
  from: AuthorType
  content: string
  createdAt: string
}

export type ChangePostLikeStatusType = {
  postId: number
  likeStatus: 'NONE' | 'LIKE' | 'DISLIKE'
}

export type ChangeCommentLikeStatusType = ChangePostLikeStatusType & {
  commentId: number | undefined
}
export type GetCommentAnswersRequestType = GetCommentsRequestType & { commentId: number }
export type ChangeCommentAnswerLikeStatusType = ChangeCommentLikeStatusType & { answerId: number }
export type GetCommentAnswersResponseType = {
  pageSize: number
  totalCount: number
  items: [AnswerType]
}
export type AnswerType = {
  id: number
  commentId: number
  from: AuthorType
  content: string
  createdAt: string
  likeCount: number
  isLiked: boolean
}
export type GetPostLikesRequestType = {
  postId: number
  search?: string
  pageSize?: number
  pageNumber?: number
  cursor?: number
}
type LikeAuthorType = {
  id: number
  userId: number
  userName: string
  createdAt: string
  avatars: Array<Avatars>
  isFollowing: boolean
  isFollowedBy: boolean
}
export type GetPostLikesResponseType = {
  pageSize: number
  totalCount: number
  items: Array<LikeAuthorType>
}
export type PostLikeAvatar = {
  id?: number | undefined
  url?: string | undefined
}
