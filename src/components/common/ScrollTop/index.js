import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CommonHelper } from 'helpers/CommonHelper';

const ScrollTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    CommonHelper.scrollToTop(0, 'auto');
  }, [location]);

  return children;
};

export default ScrollTop;
