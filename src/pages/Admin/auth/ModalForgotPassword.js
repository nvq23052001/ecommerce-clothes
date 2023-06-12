import { DialogActions } from '@mui/material';
import Button from 'components/common/button/Button';
import Input from 'components/common/input/Input';
import Modal from 'components/common/modal/Modal';
import React, { useEffect, useState } from 'react';
import { useApis } from 'services/api';

const ModalForgotPassword = ({ show, onClose }) => {
  const { apiPost } = useApis();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    if (!show) return;
  }, [show]);

  return (
    <Modal title={'Quên mật khẩu'} show={show} size="sm" close={onClose}>
      <div className="AdminAuthLayout-label">{'Nhập email của bạn để nhận mật khẩu mới'}</div>
      <Input
        fullWidth
        size="medium"
        autoComplete={'email'}
        label="Email"
        disabled={loading}
        errorFocused={!!error}
        onFocus={() => setError('')}
        maxLength={50}
      />
      <DialogActions className="mt-2">
        <Button type="submit" variant="contained" color="primary" loading={loading} size="medium" fullWidth>
          {'Quên mật khẩu'}
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default ModalForgotPassword;
