import React, { ChangeEvent, useState } from 'react'

import NextImage from 'next/image'
import { useWizard } from 'react-use-wizard'

import styles from './AddPhoto.module.scss'

import { useImageCropContext } from '@/features/create-post/context/CropProvider'
import { Publication } from '@/features/create-post/steps/publication/Publication'
import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import mockupPhoto from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import closeIcon from '@/shared/assets/icons/logout/close.svg'
import { Button } from '@/shared/ui/button/Button'

export const AddPhoto = () => {
  const { nextStep } = useWizard()
  const { setPhotoList, isOpen, setIsOpen } = useImageCropContext()

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [isPublicationOpen, setIsPublicationOpen] = useState(false)
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) return
    setPhotoList(files)
    await nextStep()
  }

  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    inputRef.current?.click()
  }

  const handleOpenDraft = () => {
    if (typeof localStorage !== 'undefined') {
      const savedImagesString = localStorage.getItem('uploadedImages')
      const savedImages = savedImagesString ? JSON.parse(savedImagesString) : null

      if (savedImages) {
        setIsPublicationOpen(true)
      }
    }
  }

  return (
    <NewPostModal
      isOpen={isOpen}
      title={'Add photo'}
      setIsOpen={setIsOpen}
      right={
        <NextImage
          style={{ cursor: 'pointer' }}
          src={closeIcon}
          alt={''}
          onClick={() => setIsOpen(false)}
        />
      }
    >
      <div className={styles.addPhotoContentContainer}>
        <div className={styles.darkBox}>
          <NextImage src={mockupPhoto} alt={'mockup photo'} />
        </div>
        <div className={styles.buttonsContainer}>
          <input
            type={'file'}
            accept={'image/*'}
            multiple={true}
            onChange={handleFileChange}
            ref={inputRef}
            className={styles.inputPhoto}
          />
          <Button onClick={openSelectHandler} className={styles.button}>
            Select from Computer
          </Button>
          <Button onClick={handleOpenDraft} className={styles.button}>
            Open Draft
          </Button>
        </div>
        {isPublicationOpen && <Publication />}
      </div>
    </NewPostModal>
  )
}
