import React from 'react';
import Header from '~/components/Header';

const HeaderOnly = ({ children }) => {
  return (
    <>
      <Header /> Only
      {children}
    </>
  );
};

export default HeaderOnly;
