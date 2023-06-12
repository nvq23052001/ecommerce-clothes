/*eslint-disable*/
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
// eslint-disable-next-line no-unused-vars
import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'components/common/input/Input';
import { apiUrls } from 'config/apis';
import routes from 'config/routes';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApis } from 'services/api';
import useAuth from 'store/auth/hook';
import { validateEmail } from 'utils/validation';
import * as yup from 'yup';
import background from '~/assets/images/background-contact.jpg';
import { BACK_TO_PREVIOUS_PAGE } from 'constants/storage';
const cx = classNames.bind(styles);

const schema = yup.object().shape({
  email: yup.string().trim().required('Email không được để trống').matches(validateEmail(), 'Email không hợp lệ'),
  password: yup.string().required('Mật khẩu không được để trống')
});

const Login = () => {
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
        toast.success('Đăng nhập thành công');
        updateAuth(data);
        if (localStorage.getItem(BACK_TO_PREVIOUS_PAGE)) {
          navigate(localStorage.getItem(BACK_TO_PREVIOUS_PAGE));
        } else {
          navigate(routes.home);
          window.location.reload();
        }
      } else {
        toast.error('Đăng nhập thất bại');
      }
    });
  };

  useEffect(() => {
    signOut();
  }, []);

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
        <div className={cx('name')}>
          <h1>ĐĂNG NHẬP</h1>
          <div className={cx('text')}>
            <hr />
          </div>
        </div>
        <div className={cx('form')}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('form-email')}>
              <Input placeholder="Email" {...register('email')} error={errors?.email?.message} />
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
          <div className={cx('router')}>
            <div className={cx('link')}>
              <NavLink to="/">Trở về</NavLink>
            </div>
            <div className={cx('link')}>
              <NavLink to={routes.register}>Đăng kí</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
