import React from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from './description.module.scss'

import { PostResponseType } from '@/shared/api'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import { RoutersPath } from '@/shared/constants/paths'
import { findDate } from '@/shared/utils/find-date'

export const Description = ({
  avatarOwner,
  ownerId,
  userName,
  updatedAt,
  description,
  isLoggedIn,
}: PostResponseType & { isLoggedIn: boolean }) => {
  const router = useRouter()
  const postUpdatedAt = findDate.difference(updatedAt)
  const textNameClass = clsx(styles.descriptionTextName, isLoggedIn && styles.isLoggedIn)
  const avatarClass = clsx(styles.avatarContainer, isLoggedIn && styles.pointer)

  return (
    <div className={styles.descriptionContainer}>
      <div
        className={avatarClass}
        onClick={() => isLoggedIn && router.push(`${RoutersPath.profile}/${ownerId}`)}
      >
        <Image src={avatarOwner || noImage} alt={'avatar'} objectFit="cover" fill={true} />
      </div>
      <div className={styles.descriptionWrapper}>
        <div className={styles.descriptionTextContainer}>
          <p className={styles.descriptionText}>
            <span
              className={textNameClass}
              onClick={() => isLoggedIn && router.push(`${RoutersPath.profile}/${ownerId}`)}
            >
              <strong>{userName}</strong>
            </span>
            {description}
          </p>
        </div>
        <div className={styles.descriptionInfoContainer}>
          <p className={styles.descriptionTime}>{postUpdatedAt}</p>
        </div>
      </div>
    </div>
  )
}
