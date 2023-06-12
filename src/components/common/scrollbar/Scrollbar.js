import React from 'react';
import './index.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const Scrollbar = ({ children, className = '', ...rest }) => {
  return (
    <SimpleBar {...rest} className={`Scrollbar ${className}`} timeout={500}>
      {children}
    </SimpleBar>
  );
};

export default Scrollbar;
