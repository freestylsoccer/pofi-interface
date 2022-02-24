import React, { useState, useRef } from 'react'
// import ChevronClosed from "../icons/ChevronClosed.svg"
// import ChevronOpen from "../icons/ChevronOpen.svg"
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/outline'
type AccordionProps = {
  title: string
  content: string
  key: string
}
export const Accordion = ({ title, content, key }: AccordionProps) => {
  const [isOpened, setOpened] = useState<boolean>(false)
  const [height, setHeight] = useState<string>('0px')
  const contentElement = useRef(null)

  const HandleOpening = () => {
    setOpened(!isOpened)
    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : '0px')
  }
  return (
    <div onClick={HandleOpening} className="border-b border-gray-400">
      <div className={'p-4 flex justify-between text-primary'}>
        <h4>{title}</h4>
        {isOpened ? <ChevronDownIcon width="24" height="24" /> : <ChevronRightIcon width="24" height="24" />}
      </div>
      <div
        ref={contentElement}
        style={{ height: height }}
        className="text-primary overflow-hidden transition-all duration-200"
      >
        <p className="p-4" key={key}>
          {content}
        </p>
      </div>
    </div>
  )
}
