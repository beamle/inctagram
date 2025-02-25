import React, { ReactNode, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import style from './logout.module.scss'

import { useLogoutMutation, useMeQuery } from '@/shared/api'
import logoutImg from '@/shared/assets/icons/logout/logout.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { Modal, Button, ButtonSize, ButtonTheme, CircularLoader } from '@/shared/ui'

type Props = {
  className?: string
  theme?: ButtonTheme
  size?: ButtonSize
  isModalOpen: boolean
  setIsModalOpen: (modalOpen: boolean) => void
  hidden?: boolean
}

export const Logout = ({
  className,
  theme,
  size,
  isModalOpen,
  setIsModalOpen,
  hidden = false,
}: Props) => {
  const {
    t,
    i18n: { t: tRoot },
  } = useTranslation('common', { keyPrefix: 'Auth' })
  const router = useRouter()

  const [logout, { isLoading }] = useLogoutMutation()
  const { data: userData } = useMeQuery()

  // const [isModalOpen, setIsModalOpen] = useState(isModalOpen)

  const logoutApiHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        router.push(RoutersPath.signIn)
      })
      .finally(() => {
        closeModal()
      })
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  if (isLoading) {
    return <CircularLoader />
  }

  return (
    <>
      <Button
        className={`${style.logoutButton} ${className} ${hidden ? style.hidden : ''}`}
        theme={theme}
        size={size}
        onClick={openModal}
      >
        <Image src={logoutImg} alt={''} />
        <span className={style.description}>{t('LogOut')}</span>
      </Button>
      {isModalOpen && (
        <Modal
          title={t('LogOut')}
          extraButton={tRoot('Yes')}
          mainButton={tRoot('No')}
          callBackCloseWindow={closeModal}
          extraButtonCB={logoutApiHandler}
        >
          {t('LogOutOfYourAccount')}
          <span className={style.userName}> {!!userData && userData.email} ?</span>
        </Modal>
      )}
    </>
  )
}
