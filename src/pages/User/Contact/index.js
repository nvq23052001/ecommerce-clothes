import React from 'react';
import classNames from 'classnames/bind';
import style from './Contact.module.css';
import background from '~/assets/images/background-contact.jpg';
import { Link } from 'react-router-dom';
import { linkMaps } from '~/constants/google-maps';

const cx = classNames.bind(style);

const Contact = () => {
  return (
    <div className={cx('content')}>
      <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
      <div className={cx('background-content')}>
        <h2 className={cx('title-content')}>Liên hệ</h2>
        <div className={cx('text-content')}>
          <Link to="">Trang chủ</Link>
          <div>/</div>
          <p>Liên hệ</p>
        </div>
      </div>
      <div className={cx('content-bottom')}>
        <div className={cx('maps-content')}>
          <div className={cx('title-contact')}>
            <h1>LIÊN HỆ</h1>
          </div>
          <iframe className={cx('maps')} title="frameMaps" src={linkMaps}></iframe>
          {/* <GoogleMaps /> */}
        </div>
        <div className={cx('content-last')}>
          <div className={cx('place')}>
            <p className={cx('title-place')}>HỆ THỐNG CỬA HÀNG</p>
            <div className={cx('text-place')}>
              Địa Chỉ: Tòa nhà FPT Polytechnic, P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội
            </div>
            <div className={cx('text-place')}>Số điện thoại : 19009057 / 0345 561 321</div>
            <div className={cx('text-place')}>Email : support@hakken.click</div>
          </div>
          <div className={cx('form-input')}>
            <input className={cx('field-input')} placeholder="Họ và tên của bạn" id="" />
            <input className={cx('field-input')} placeholder="Địa chỉ email của bạn" id="" />
            <input className={cx('field-input')} placeholder="Số điện thoại của bạn" id="" />
            <textarea className={cx('field-input')} placeholder="Nội dung" name="" id="" cols="30" rows="5"></textarea>
            <button className={cx('button-send')}>Gửi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
