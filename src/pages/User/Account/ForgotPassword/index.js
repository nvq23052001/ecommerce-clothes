import React from 'react';

// routes
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// assets
import background from '~/assets/images/background-contact.jpg';

// styles
import classNames from 'classnames/bind';
import styles from './forgotPass.module.css';
const cx = classNames.bind(styles);

const ForgotPassword = () => {
  return (
    <div className={cx('container')}>
      <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
      <div className={cx('background-content')}>
        <h2 className={cx('title-content')}>TÀI KHOẢN</h2>
        <div className={cx('text-content')}>
          <Link to="">Trang chủ</Link>
          <div>/</div>
          <p>Tài Khoản</p>
        </div>
      </div>
      <div className={cx('main')}>
        <div className={cx('title')}>
          <h1>CÀI ĐẶT LẠI MẬT KHẨU</h1>
          <div className={cx('text')}>
            <p>Mật khẩu mới sẽ được gửi về email của bạn</p>
          </div>
        </div>
        <div className={cx('form')}>
          <form action="#" method="POST">
            <div className={cx('form-email')}>
              <input type="text" placeholder="Email" />
            </div>
            <div className={cx('button')}>
              <button type="submit">Gửi</button>
            </div>
          </form>
          <div className={cx('router')}>
            <div className={cx('link')}>
              <NavLink to="/login">Bỏ qua</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
