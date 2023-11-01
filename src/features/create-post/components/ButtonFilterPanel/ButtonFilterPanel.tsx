import React from 'react'

import style from './ButtonFilterPanel.module.scss'

import AspectRatioPanel from '@/features/create-post/components/AspectRatioPanel/AspectRatioPanel'
import ZoomPanel from '@/features/create-post/components/ZoomPanel/ZoomPanel'
import { CropContextType } from '@/features/create-post/context/CropProvider'
import { AddPhotoSlider } from '@/features/create-post/steps/AddPhotoSlider/AddPhotoSlider'

type Props = {
  cropContext: CropContextType
  index: number
}

export const ButtonFilterPanel = ({ cropContext, index }: Props) => {
  const handleAspectRatio = (aspectRatio: number) => {
    cropContext.handleAspectRatioClick(index)(aspectRatio)
  }

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const zoom = Number(event.target.value)

    cropContext.setZoom(index)(zoom)
  }

  const handlePhotoClick = (index: number) => {
    cropContext.setSelectedIndex(index)
  }

  return (
    <div className={style.filterPanelContainer}>
      <div className={style.leftPanel}>
        <div>
          <AspectRatioPanel
            originalAspect={cropContext.photos[index].originalAspect}
            handleAspectRatio={handleAspectRatio}
          />
        </div>
        <div>
          <ZoomPanel
            zoom={cropContext.photos[index].zoom}
            handleZoomChange={handleZoomChange}
            index={index}
          />
        </div>
      </div>
      <div className={style.rightButton}>
        <AddPhotoSlider cropContext={cropContext} handlePhotoClick={handlePhotoClick} />
      </div>
    </div>
  )
}
