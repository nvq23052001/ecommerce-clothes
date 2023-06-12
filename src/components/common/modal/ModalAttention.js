import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import Button from '../button/Button'

const ModalAttention= ({ className, show, onClose, onCloseAttention }) => {
  return (
    <Dialog
      className={`Modal ${className}`}
      open={show}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        Information
        <i className="fa-solid fa-xmark Modal-close" onClick={onCloseAttention} />
      </DialogTitle>
      <DialogContent style={{ fontWeight: 500, textAlign: 'center' }}>
        If you click <span className="text-hightlight">Cancel</span>, any information you entered
        will not be saved.
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onCloseAttention?.()
            onClose?.()
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={onCloseAttention}>
          Keep editing
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalAttention
