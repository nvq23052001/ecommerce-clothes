import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ShipperLayout.module.css';
const cx = classNames.bind(styles);

const ShipperLayout = ({ children, title }) => {
  useEffect(() => {
    document.title = title || 'Hakken Shop';
  }, [title]);

  return (
    <>
      <div className={cx('background')}>{children}</div>
    </>
  );
};

export default ShipperLayout;
