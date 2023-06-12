import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import ModalConfirm from './ModalConfirm'

const ModalConfirmContainer = () => {
  const modalConfirm = useSelector((state) => state.modalConfirm)

  return <ModalConfirm {...modalConfirm} />
}

export default ModalConfirmContainer
