import Button from 'components/common/button/Button';
import { useContext } from 'react';
import { ModalContext } from './constants';

const ModalButtonCancel = ({ children, onClick, ...rest }) => {
  const { dirty, setShowAttention } = useContext(ModalContext);

  return (
    <Button
      {...rest}
      onClick={(e) => {
        if (dirty) setShowAttention(true);
        else onClick?.(e);
      }}
    >
      {children}
    </Button>
  );
};

export default ModalButtonCancel;
