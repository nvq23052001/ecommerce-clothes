import React from 'react';
import classNames from 'classnames/bind';
import style from './ShirtSizingGuide.module.css';
import background from '~/assets/images/background-contact.jpg';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
const ShirtSizingGuide = () => {
  return (
    <div className={cx('content')}>
      <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
      <div className={cx('background-content')}>
        <h2 className={cx('title-content')}>HƯỚNG DẪN ĐO SIZE ÁO</h2>
        <div className={cx('text-content')}>
          <Link to="">Trang chủ</Link>
          <div>/</div>
          <p>Hướng dẫn đo size áo</p>
        </div>
      </div>
      <div className={cx('content-bottom')}>
        <h1 className={cx('title-bottom')}>HƯỚNG DẪN ĐO SIZE ÁO</h1>
      </div>
    </div>
  );
};

export default ShirtSizingGuide;
