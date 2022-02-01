import React from 'react'
import { SRLWrapper, useLightbox } from 'simple-react-lightbox'
import Button from '../Button'

interface IElements {
  src: string
  caption: string
  height: string
}

interface lightboxProps {
  elements: IElements[]
}

export default function Lightbox({ elements }: lightboxProps) {
  const { openLightbox } = useLightbox()
  return (
    <div className="flex px-1 mt-2">
      <Button id="view-gallery-button" color="gallery" className="" onClick={() => openLightbox()}>
        View gallery
      </Button>
      <SRLWrapper elements={elements} />
    </div>
  )
}
