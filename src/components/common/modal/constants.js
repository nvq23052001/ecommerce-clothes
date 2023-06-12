import React from 'react'

export const ModalContext = React.createContext({
  dirty: false,
  setShowAttention: (() => {}),
})
