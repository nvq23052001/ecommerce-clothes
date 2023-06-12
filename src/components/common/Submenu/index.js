import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import classes from './Submenu.module.css';

const cx = classNames.bind(classes);
function Submenu({ item, handleClick, handleHiddenNav }) {
  const handleClickSubNav = () => {
    handleClick();
    handleHiddenNav();
  };
  return (
    <ul className={cx('nav__list-sub')}>
      {item.map((item) => (
        <li className={cx('nav__item-sub')} onClick={handleClickSubNav} key={item.title}>
          <Link to={item.url} className={cx('nav__item-sub--link')}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Submenu;
