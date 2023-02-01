import React, { useEffect, useRef, useState } from 'react'
import { decode } from 'blurhash'

function convertDataFromUint8ClampedArray(arr: Uint8ClampedArray, w: number, h: number) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('no canvas context')
  }

  canvas.width = w;
  canvas.height = h;

  const imgData = ctx.createImageData(w, h)
  imgData.data.set(arr)
  ctx.putImageData(imgData, 0, 0)
  return canvas.toDataURL()
}

function fetchImage(src: string, width?: number, height?: number) {
  return new Promise<Event>((resolve, reject) => {
    const _img = new Image(width, height)
    _img.onload = (ev) => {
      resolve(ev)
    }
    _img.onerror = (ev) => {
      console.error('err', ev)
      reject(ev)
    }
    _img.src = src
  })
}

type BlurhashViewProps = {
  className?: string
  style?: React.CSSProperties
  blurhashValue: string
  src: string
  width?: number
  height?: number
  punch?: number
  alt?: string
  onError?: (ev: Event | string) => void
  onLoad?: (ev: Event) => void
}

function BlurhashView(props: BlurhashViewProps) {
  const { blurhashValue, className, style, src, onError, onLoad, alt, width, height, punch } = props
  const imgRef = useRef<HTMLImageElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading || !imgRef.current) {
      return
    }
    const cachedData = decode(blurhashValue, width ?? 128, height ?? 128, punch)
    imgRef.current.src = convertDataFromUint8ClampedArray(cachedData, width ?? 128, height ?? 128)
  }, [blurhashValue, width, height, punch, loading])

  useEffect(() => {
    if (!imgRef.current) {
      return
    }
    (async function () {
      setLoading(true)
      try {
        const img = await fetchImage(src, width, height)
        imgRef.current!.src = src
        if (onLoad) {
          onLoad(img)
        }
      } catch (e: any) {
        if (onError) {
          onError(e)
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [src, width, height])
  return (
    <img
      ref={imgRef}
      className={className}
      style={style}
      height={height}
      width={width}
      alt={alt}
    />
  )
}

export default BlurhashView