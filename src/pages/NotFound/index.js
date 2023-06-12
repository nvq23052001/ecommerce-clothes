import routes from 'config/routes';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const PageNotFound = () => {
  return (
    <div>
      <section className={cx('breadcrumb')}>
        <div className={cx('breadcrumb__overlay')}></div>
        <div className={cx('breadcrumb__content')}>
          <div className={cx('breadcrumb__wrapper')}>
            <div className={cx('breadcrumb__big')}>
              <h2 className={cx('breadcrumb__title')}>LIÊN KẾT BẠN TRUY CẬP KHÔNG TỒN TẠI</h2>
            </div>
          </div>
        </div>
      </section>
      <div id="PageContainer" className="is-moved-by-drawer">
        <div className={cx('page-wrapper')}>
          <div className={cx('wrapper')}>
            <div className={cx('inner')}>
              <h1>Không tìm thấy trang</h1>
              <p>
                Trang không tồn tại. Click vào <Link to={routes.product}>đây</Link> để tiếp tục mua hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
