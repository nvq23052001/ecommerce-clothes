import React, { useEffect, useState } from 'react';
import Header from '~/components/feature/Header';
import Footer from '~/components/feature/Footer';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.css';
import { ArrowUpward } from '@material-ui/icons';
const cx = classNames.bind(styles);

const DefaultLayout = ({ children, title }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  useEffect(() => {
    document.title = title || 'Hakken Shop';
  }, [title]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {showButton && (
        <button onClick={scrollToTop} className={cx('back-to-top')}>
          <ArrowUpward />
        </button>
      )}
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
