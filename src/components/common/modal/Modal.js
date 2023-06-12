/* eslint-disable */
import { Breakpoint, Dialog, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { ModalContext } from './constants';
import './index.scss';
import ModalAttention from './ModalAttention';

const Modal = ({ show, title, close, children, size = 'xs', dirty }) => {
  const [showAttention, setShowAttention] = useState(false);

  const closeAttention = () => setShowAttention(false);

  return (
    <ModalContext.Provider value={{ dirty: dirty || false, setShowAttention }}>
      <Dialog className="Modal" open={show} fullWidth maxWidth={size}>
        {dirty && <ModalAttention onClose={close} onCloseAttention={closeAttention} show={showAttention} />}
        <DialogTitle>
          {title}
          {!!close && (
            <i
              className="fas fa-times Modal-close"
              onClick={() => {
                if (dirty) setShowAttention(true);
                else close();
              }}
            />
          )}
        </DialogTitle>
        {children}
      </Dialog>
    </ModalContext.Provider>
  );
};

export default Modal;
