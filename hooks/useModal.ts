import { VNode } from 'preact'
import { useState } from 'preact/hooks'
import { ModalData } from '../context/modal-context'

export default function useModal(): ModalData {
  const [isOpen, setisOpen] = useState(false)
  const [content, setContent] = useState<VNode>(null)

  const toggle = ({ content, value }: { content?: VNode; value?: boolean }) => {
    if (isOpen == value) return // fixes issue where click on escape keypress handler fires close 3 times

    setisOpen(value ?? !isOpen)

    if (!isOpen) {
      setContent(content)
    }
  }

  return {
    toggle,
    content,
    isOpen,
  }
}
