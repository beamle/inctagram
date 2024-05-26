import React from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { MessengerApp } from '@/module-federation/imports'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const Messenger = () => {
  return <MessengerApp />
}

Messenger.getLayout = getLayout
export default Messenger
