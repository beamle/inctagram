import React, { memo, useEffect, useRef, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { clsx } from 'clsx'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'

import styles from '@/entities/post-modal/comments/add-comment/add-comment.module.scss'
import { PostResponseType } from '@/shared/api'
import {
  useCreatePostCommentAnswerMutation,
  useCreatePostCommentMutation,
} from '@/shared/api/services/posts/posts.api'
import { AnswerType, CommentType } from '@/shared/api/services/posts/posts.api.types'
import { Button, CircularLoader, Input, InputType } from '@/shared/ui'

export const AddComment = memo(
  ({
    id,
    addNewComment,
    addNewAnswer,
    commentIdForAnswer,
    commentAuthor,
  }: PostResponseType & {
    addNewComment: (newComment: CommentType) => void
    addNewAnswer: (newAnswer: AnswerType) => void
    commentIdForAnswer?: number | undefined
    commentAuthor?: string | undefined
  }) => {
    const schema = yup.object().shape({
      content: yup.string().required('Error.RequiredField'),
    })
    const { register, reset, handleSubmit } = useForm<{ content: string }>({
      mode: 'onChange',
      resolver: yupResolver(schema),
      defaultValues: {
        content: '',
      },
    })
    const [createPostComment, { isLoading: isCommentLading }] = useCreatePostCommentMutation()
    const [createPostCommentAnswer, { isLoading: isAnswerLading }] =
      useCreatePostCommentAnswerMutation()
    const { t } = useTranslation('common', { keyPrefix: 'Post' })
    const createComment = (content: string) =>
      createPostComment({ postId: id, content })
        .unwrap()
        .then(res => {
          setCurrentValue('')
          addNewComment({ ...res, likeCount: 0, isLiked: false, answerCount: 0 })
        })
        .catch(error => {
          const errMessage = error.data?.messages[0].message

          toast.error(errMessage)
        })
    const createAnswer = (content: string) =>
      createPostCommentAnswer({ postId: id, commentId: commentIdForAnswer ?? undefined, content })
        .unwrap()
        .then(res => {
          reset()
          setCurrentValue('')
          addNewAnswer({ ...res, likeCount: 0, isLiked: false })
        })
        .catch(error => {
          const errMessage = error.data?.messages[0].message

          toast.error(errMessage)
        })
    const onSubmit = ({ content }: { content: string }) => {
      commentIdForAnswer ? void createAnswer(content) : void createComment(content)
    }
    const textareaRef: React.MutableRefObject<HTMLTextAreaElement | null> = useRef(null)
    const [currentValue, setCurrentValue] = useState('')
    const { ref, ...rest } = register('content')

    useEffect(() => {
      commentAuthor && setCurrentValue(`@${commentAuthor} `)
      textareaRef.current?.focus()
    }, [commentAuthor, commentIdForAnswer])

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = '0px'
        const scrollHeight = textareaRef.current.scrollHeight

        scrollHeight < 72
          ? (textareaRef.current.style.height = scrollHeight + 'px')
          : (textareaRef.current.style.height = '72px')
      }
    }, [currentValue])

    return (
      <div className={styles.addCommentContainer}>
        <form className={styles.addCommentForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            {(isCommentLading || isAnswerLading) && (
              <div className={styles.loaderContainer}>
                <CircularLoader />
              </div>
            )}
            <Input
              as={'textarea'}
              className={
                isCommentLading || isAnswerLading
                  ? clsx(styles.addCommentInput, styles.loading)
                  : styles.addCommentInput
              }
              placeholder={t('AddComment')}
              type={InputType.FRAMELESS}
              {...rest}
              value={currentValue}
              ref={e => {
                ref(e)
                textareaRef.current = e
              }}
              onChange={e => setCurrentValue(e.target.value)}
            />
          </div>
          <Button className={styles.addCommentButton} disabled={!currentValue}>
            {t('Publish')}
          </Button>
        </form>
      </div>
    )
  }
)
