import React from 'react';
import classNames from 'classnames/bind';
import style from './Address.module.css';
const cx = classNames.bind(style);

const MyAddress = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <div className={cx('box-title')}>
          <h1 className={cx('title-address')}>Địa chỉ của tôi</h1>
          <button className={cx('add-address')}>+ Thêm địa chỉ</button>
        </div>
        <div className={cx('box-address')}>
          <div className={cx('box-address-left')}>
            <div className={cx('name-phone')}>
              Trần Minh Dũng | <span className={cx('phone')}>0345561321</span>
            </div>
            <div className={cx('address')}>Phương Canh - Nam Từ Liêm - Hà Nội</div>
            <span className={cx('setting')}>Mặc định</span>
          </div>
          <div className={cx('box-address-right')}>
            <button className={cx('click-update')}>Cập nhật</button>
            <button className={cx('click-delete')}>Delete</button>
          </div>
        </div>
        <div className={cx('box-address')}>
          <div className={cx('box-address-left')}>
            <div className={cx('name-phone')}>
              Trần Minh Dũng | <span className={cx('phone')}>0345561321</span>
            </div>
            <div className={cx('address')}>Xuân Thuỷ - Cầu Giấy - Hà Nội</div>
          </div>
          <div className={cx('box-address-right')}>
            <button className={cx('click-update')}>Cập nhật</button>
            <button className={cx('click-delete')}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAddress;
