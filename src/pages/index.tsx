import React, { useEffect, useRef, useState } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { toast, Toaster } from 'react-hot-toast'

import s from './index.module.scss'

import { PublicPost } from '@/entities/public-post'
import { PostResponseType, postsApi } from '@/shared/api'
import { useLazyGetAllPublicPostsQuery } from '@/shared/api/services/posts/posts.api'
import { GetAllPublicPostsResponseType } from '@/shared/api/services/posts/posts.api.types'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'
import { wrapper } from '@/shared/providers/store-provider/model/store'
import { ServerSidePropsType } from '@/shared/types/common-types'
import { CircularLoader, ContentWrapper } from '@/shared/ui'
import { RegisteredUsersTablo } from '@/shared/ui/registered-users-tablo/ui/registered-users-tablo'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    const { query } = context
    const isSuccess = query.success === 'true'

    if (isSuccess) {
      return {
        redirect: {
          destination: '/profile/account-management/?success=true',
          permanent: false,
        },
      }
    }
    //fetch publicPosts

    if (context.locale === undefined) throw new Error()

    store.dispatch(postsApi.endpoints?.getAllPublicPosts.initiate({ pageSize: '16' }))

    const data: Array<ServerSidePropsType<GetAllPublicPostsResponseType>> = await Promise.all(
      store.dispatch(postsApi.util?.getRunningQueriesThunk())
    )
      .then(res => {
        return res
      })
      .catch(error => {
        return error
      })

    if (!data[0].data) {
      return {
        redirect: {
          destination: '/404' /*  todo Редирект на 404  */,
          permanent: false,
        },
      }
    }

    return {
      props: {
        ...(await serverSideTranslations(context.locale as string, 'common')),
        publicPostsData: data,
      },
    }
  }
)
type HomeProps = {
  publicPostsData: Array<ServerSidePropsType<GetAllPublicPostsResponseType>>
}

function Home(props: HomeProps) {
  const [endCursorPostId, setEndCursorPostId] = useState<number | undefined>(undefined)
  const publicPosts = props.publicPostsData[0].data
  const [getAllPublicPosts, { isLoading }] = useLazyGetAllPublicPostsQuery()
  const [posts, setPosts] = useState<PostResponseType[] | []>([])
  const [isNextPage, setIsNextPage] = useState(false)
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  useEffect(() => {
    if (publicPosts) {
      setEndCursorPostId(publicPosts.items[publicPosts.items.length - 1].id)
      setPosts(publicPosts.items)
    }
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isLoading && posts.length < publicPosts.totalCount) {
        setIsNextPage(true)
      }
    })

    observer.observe(bottomRef?.current as HTMLDivElement)

    return () => {
      observer.disconnect()
    }
  }, [])
  useEffect(() => {
    if (isNextPage) {
      getAllPublicPosts({
        endCursorPostId: endCursorPostId?.toString(),
        pageSize: '16',
      })
        .unwrap()
        .then(res => {
          setEndCursorPostId(res?.items[res?.items.length - 1].id)
          setPosts(prevState => {
            return res ? [...prevState, ...res.items] : prevState
          })
        })
        .catch(() => {
          toast.error(tError('SomethingWentWrong'))
        })
        .finally(() => setIsNextPage(false))
    }
  }, [isNextPage, endCursorPostId])

  const bottomRef = useRef<HTMLDivElement>(null)

  return (
    <div className={s.home}>
      <Toaster position={'bottom-center'} />
      <ContentWrapper className={s.homeContentWrapper}>
        <RegisteredUsersTablo registeredUsers={publicPosts.totalUsers} />
        <div className={s.postsContainer}>
          {posts.map(post => (
            <PublicPost key={post.id} {...post} />
          ))}

          <div ref={bottomRef} className={s.loader}>
            {isNextPage && <CircularLoader />}
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

Home.getLayout = getLayout
export default Home
