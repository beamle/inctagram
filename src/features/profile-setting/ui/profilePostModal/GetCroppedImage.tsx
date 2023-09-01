// import { useCallback } from 'react'
//
// export const readFile = (file: File) => {
//   return new Promise<string | ArrayBuffer | null>(resolve => {
//     const reader = new FileReader()
//
//     reader.addEventListener('load', () => resolve(reader.result), false)
//     reader.readAsDataURL(file)
//   })
// }
// export const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise<HTMLImageElement>((resolve, reject) => {
//     const image = new Image()
//
//     image.addEventListener('load', () => resolve(image))
//     image.addEventListener('error', error => reject(error))
//     image.setAttribute('crossOrigin', 'anonymous')
//     image.src = url
//   })
//
// export function getRadianAngle(degreeValue: number): number {
//   return (degreeValue * Math.PI) / 180
// }
//
// export function rotateSize(
//   width: number,
//   height: number,
//   rotation: number
// ): { width: number; height: number } {
//   const rotRad = getRadianAngle(rotation)
//
//   return {
//     width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
//     height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
//   }
// }
//
// export default async function getCroppedImg(
//   imageSrc: string,
//   pixelCrop: {
//     x: number
//     y: number
//     width: number
//     height: number
//   },
//   rotation = 0,
//   flip = { horizontal: false, vertical: false }
// ): Promise<string | null> {
//   const image = await createImage(imageSrc)
//   const canvas = document.createElement('canvas')
//   const ctx = canvas.getContext('2d')
//
//   if (!ctx) {
//     return null
//   }
//
//   const rotRad = getRadianAngle(rotation)
//
//   const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)
//
//   // set canvas size to match the bounding box
//   canvas.width = bBoxWidth
//   canvas.height = bBoxHeight
//
//   ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
//   ctx.rotate(rotRad)
//   ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
//   ctx.translate(-image.width / 2, -image.height / 2)
//
//   ctx.drawImage(image, 0, 0)
//
//   const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height)
//
//   canvas.width = pixelCrop.width
//   canvas.height = pixelCrop.height
//
//   ctx.putImageData(data, 0, 0)
//
//   return new Promise((resolve, reject) => {
//     canvas.toBlob(file => {
//       if (file) {
//         resolve(URL.createObjectURL(file))
//       }
//     }, 'image/jpeg')
//   })
// }
//
// export interface CropResult {
//   file: Blob
//   url: string
// }

// eslint-disable-next-line import/no-unresolved

export const readFile = (file: File): Promise<string> => {
  return new Promise<string>(resolve => {
    const reader = new FileReader()

    reader.addEventListener('load', () => resolve(reader.result as string))
    reader.readAsDataURL(file)
  })
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180
}

export interface CropResult {
  file: Blob
  url: string
}

export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: {
    x: number
    y: number
    width: number
    height: number
  },
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<CropResult | null> => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)

  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)

  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  ctx.drawImage(image, 0, 0)

  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height)

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.putImageData(data, 0, 0)

  return new Promise<CropResult>((resolve, reject) => {
    canvas.toBlob(file => {
      if (file) {
        resolve({ file, url: URL.createObjectURL(file) })
      } else {
        reject(new Error('Failed to create Blob.'))
      }
    }, 'image/jpeg')
  })
}

export default getCroppedImg
