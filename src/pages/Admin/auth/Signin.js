import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/common/button/Button';
import Input from 'components/common/input/Input';
import { apiUrls } from 'config/apis';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useApis } from 'services/api';
import useAuth from 'store/auth/hook';
import './index.scss';
import * as yup from 'yup';
import { validateEmail } from 'utils/validation';
import { useNavigate } from 'react-router-dom';
import routes from 'config/routes';

const schema = yup.object().shape({
  email: yup.string().trim().required('Email không được để trống').matches(validateEmail(), 'Email không hợp lệ'),
  password: yup.string().required('Mật khẩu không được để trống')
});

const SignIn = () => {
  const { apiPost } = useApis();
  const navigate = useNavigate();

  const { updateAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const onSubmit = ({ email, password }) => {
    apiPost(apiUrls.userLogin(), { email, password }, ({ status, data }) => {
      if (status) {
        updateAuth(data);
        navigate(routes.dashboardAdmin);
      }
    });
  };
  return (
    <div className="AdminAuthLayout">
      <div className="AdminAuthLayout-wrapper">
        <div className="AdminAuthLayout-card">
          <div className="AdminAuthLayout-header">
            <h2 className="AdminAuthLayout-title">Đăng nhập</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              style={{ marginBottom: 12 }}
              placeholder="Email"
              {...register('email')}
              error={errors?.email?.message}
            />
            <Input
              style={{ marginBottom: 12 }}
              placeholder="Mật khẩu"
              type="password"
              {...register('password')}
              error={errors?.password?.message}
            />
            <Button fullWidth type="submit" variant="contained" color="primary">
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
