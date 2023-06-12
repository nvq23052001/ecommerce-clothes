import React from 'react';
import style from './style.module.css';

import classNames from 'classnames/bind';
const cx = classNames.bind(style);
const LoadingGlobal = () => {
  return (
    <div className={cx('loading-container')}>
      <div className={cx('loading-page')} />
    </div>
  );
};

export default LoadingGlobal;
