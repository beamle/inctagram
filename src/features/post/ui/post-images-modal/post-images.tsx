import React, { CSSProperties, useEffect, useState } from 'react'

import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'

import style from './post-images.module.scss'

import { SlideBar } from '@/features/create-post/components'
import { filterBestQualityImages } from '@/features/create-post/utils/filter-best-quality-images'
import {
  selectCurrentPhotoIndex,
  setCurrentPhotoIndex,
  setPhotosCount,
} from '@/shared/api/services/posts/post.slice'
import { ImageDataType, PostResponseType } from '@/shared/api/services/posts/posts.api.types'
import noImage from '@/shared/assets/icons/image/no-image.svg'

type Props = {
  postData: PostResponseType | undefined | any
  wrapperStyle?: CSSProperties
  imgStyle?: CSSProperties
}
export const PostImages = ({ postData, wrapperStyle, imgStyle }: Props) => {
  const [images, setImages] = useState<ImageDataType[] | undefined>(undefined)
  const currentIndex = useSelector(selectCurrentPhotoIndex)
  const dispatch = useDispatch()

  useEffect(() => {
    if (postData?.images && postData.images.length >= 0) {
      setImages(filterBestQualityImages(postData.images))
      dispatch(setCurrentPhotoIndex(0))
      dispatch(setPhotosCount(postData.images.length))
    }
  }, [postData])

  return (
    <div className={style.sliderWrapper} style={{ ...wrapperStyle }}>
      {!!images && (
        <Image
          src={images && images.length ? images[currentIndex]?.url : noImage}
          alt={images && images.length ? 'image' : 'no image'}
          height={(imgStyle && imgStyle.height && +imgStyle.height) || 562}
          width={(imgStyle && imgStyle?.width && +imgStyle.width) || 490}
          style={{
            objectFit: 'cover',
            ...imgStyle,
          }}
        />
      )}
      {images && images.length > 1 && <SlideBar styles={style} />}
    </div>
  )
}
