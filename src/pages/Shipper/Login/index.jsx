/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import background from '~/assets/images/background-contact.jpg';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from 'components/common/input/Input';
import { apiUrls } from 'config/apis';
import { useApis } from 'services/api';
import useAuth from 'store/auth/hook';
import routes from 'config/routes';
const cx = classNames.bind(styles);
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { validatePhoneNumber } from 'utils/validation';
import images from '~/assets';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Số điên thoại không được để trống')
    .matches(validatePhoneNumber(), 'Số điện thoại không hợp lệ'),
  password: yup.string().required('Mật khẩu không được để trống')
});

const LoginShipper = () => {
  const { apiPost } = useApis();
  const navigate = useNavigate();
  const { updateAuth, signOut } = useAuth();
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
        navigate(routes.shipperOrder);
      }
    });
  };

  useEffect(() => {
    signOut();
  }, []);

  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')}>
        <div className={cx('sign')}>
          <img src="https://sso-v2.ghn.vn/static/media/397.191e1890.jpg" alt="" className={cx('sign-image')} />
        </div>
        <div className={cx('main')}>
          <div className={cx('form')}>
            <div className={cx('name')}>
              <img className={cx('logo')} src={images.logo} alt="" />
              <h1>ĐĂNG NHẬP</h1>
              <div className={cx('text')}>
                <hr />
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={cx('form-email')}>
                <Input placeholder="Số điện thoại nhân viên" {...register('email')} error={errors?.email?.message} />
              </div>
              <div className={cx('form-pass')}>
                <Input
                  placeholder="Mật khẩu"
                  type="password"
                  {...register('password')}
                  error={errors?.password?.message}
                />
              </div>
              <div className={cx('button')}>
                <button type="submit">Đăng nhập</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginShipper;
