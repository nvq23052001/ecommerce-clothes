import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import Input from 'components/common/input/Input';
import { apiUrls } from 'config/apis';
import routes from 'config/routes';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApis } from 'services/api';
import useAuth from 'store/auth/hook';
import { validateEmail } from 'utils/validation';
import * as yup from 'yup';
import background from '~/assets/images/background-contact.jpg';
import styles from './register.module.css';

const cx = classNames.bind(styles);
const Register = () => {
  const { apiPost } = useApis();
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const { updateAuth } = useAuth();
  const [cachePassword, setCachePassword] = useState('');

  const schema = yup.object().shape({
    email: yup.string().trim().required('Email không được để trống').matches(validateEmail(), 'Email không hợp lệ'),
    ...(isShow
      ? { code: yup.string().trim().required('Vui lòng nhập mã xác thực') }
      : {
          password: yup.string().required('Mật khẩu không được để trống'),
          confirm_password: yup
            .string()
            .required('Mật khẩu không được để trống')
            .oneOf([yup.ref('password'), null], 'Mật khẩu chưa chính xác')
        })
  });

  const { register, handleSubmit, setValue, formState } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const { errors } = formState;

  const onSubmit = ({ email, password, code }) => {
    if (!isShow) {
      apiPost(apiUrls.userRegister(), { email, password }, ({ status, errors }) => {
        if (status) {
          setIsShow(true);
          setValue('email', email);
          setCachePassword(password);
        } else if (errors.code === 'already_exist_email') {
          toast.error('Địa chỉ email đã tồn tại');
        } else {
          toast.error('Đăng ký không thành công');
        }
      });
    } else {
      apiPost(apiUrls.userVerify(), { email, code }, ({ status }) => {
        if (status) {
          apiPost(apiUrls.userLogin(), { email, password: cachePassword }, ({ status, data }) => {
            if (status) {
              toast.success('Đăng kí thành công');
              navigate(routes.home);
              updateAuth(data);
            } else {
              toast.success('Đăng kí thất bại. Vui lòng thử lại');
            }
          });
        }
      });
    }
  };

  return (
    <div className={cx('container')}>
      <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
      <div className={cx('background-content')}>
        <h2 className={cx('title-content')}>TÀI KHOẢN</h2>
        <div className={cx('text-content')}>
          <Link to={routes.home}>Trang chủ</Link>
          <div>/</div>
          <p>Tài Khoản</p>
        </div>
      </div>
      <div className={cx('main')}>
        <div className={cx('title')}>
          <h1>{isShow ? 'XÁC THỰC TÀI KHOẢN' : 'TẠO TÀI KHOẢN'}</h1>
          <div className={cx('text')}>
            <hr />
          </div>
        </div>
        <div className={cx('form')}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('form-email')}>
              <Input disabled={isShow} placeholder="Email" {...register('email')} error={errors?.email?.message} />
            </div>

            {isShow ? (
              <div className={cx('form-email')}>
                <Input placeholder="Nhập mã xác thực" type="text" {...register('code')} error={errors?.code?.message} />
              </div>
            ) : (
              <>
                <div className={cx('form-pass')}>
                  <Input
                    placeholder="Mật khẩu"
                    type="password"
                    {...register('password')}
                    error={errors?.password?.message}
                  />
                </div>
                <div className={cx('form-confirm-pass')}>
                  <Input
                    placeholder="Nhập lại mật khẩu"
                    type="password"
                    {...register('confirm_password')}
                    error={errors?.confirm_password?.message}
                  />
                </div>
              </>
            )}
            <div className={cx('button')}>
              <button type="submit">{isShow ? 'Xác thực' : 'Đăng kí'}</button>
            </div>
          </form>
          <div className={cx('router')}>
            <div className={cx('link')}>
              <NavLink to={routes.login}>Đăng nhập</NavLink>
            </div>
            <div className={cx('link')}>
              <NavLink onClick={() => navigate(-1)}>Trở về</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
