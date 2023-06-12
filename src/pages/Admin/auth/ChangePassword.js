import { DialogActions } from '@mui/material';
import Button from 'components/common/button/Button';
import Input from 'components/common/input/Input';
import Modal from 'components/common/modal/Modal';
import React from 'react';
import { useForm } from 'react-hook-form';

const ChangePassword = ({ show, onClose }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {};
  return (
    <Modal title={'Đổi mật khẩu'} show={show} close={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          style={{ marginBottom: 18 }}
          fullWidth
          autoFocus
          type="password"
          {...register('current_password')}
          label="mật khẩu hiện tại"
          size="medium"
        />

        <Input
          style={{ marginBottom: 18 }}
          fullWidth
          type="password"
          {...register('new_password')}
          label="Mật khẩu mới"
          size="medium"
        />
        <Input
          style={{ marginBottom: 18 }}
          fullWidth
          type="password"
          {...register('confirm_password')}
          label="Xác nhận mật khẩu"
          size="medium"
        />
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </form>
    </Modal>
  );
};

export default ChangePassword;
