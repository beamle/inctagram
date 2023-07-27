import React, { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import BaseLayout from '../BaseLayout/BaseLayout'

export const MainLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <BaseLayout>{children}</BaseLayout>
    </>
  )
}

export const getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}
