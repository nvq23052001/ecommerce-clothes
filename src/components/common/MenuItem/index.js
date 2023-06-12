import { Link } from 'react-router-dom';
import { DropDownIcon, PlusIcon, MinusIcon } from '~/assets/icons';
import { useState } from 'react';

import Submenu from '../Submenu';

import styles from './MenuItem.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const MenuItem = ({ item, hiddenNav }) => {
  const [dropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
    setDropDown((preValue) => !preValue);
  };

  return (
    <>
      {item.submenu ? (
        <>
          <li className={cx('nav__item')} key={item.id} onMouseOver={handleDropDown} onMouseOut={handleDropDown}>
            <Link to={item.url} onClick={handleDropDown} className={cx('nav__item-link')}>
              <span>{item.title}</span>
              <DropDownIcon width="1.4rem" height="1.4rem" />
            </Link>
            {dropDown && (
              <Submenu item={item.submenu} handleClick={handleDropDown} handleHiddenNav={hiddenNav}></Submenu>
            )}
          </li>
          <li className={cx('nav__item-res')} key={item.id + 1}>
            <div className={cx('nav__item-wrapper')}>
              <Link to={item.url} className={cx('nav__item-link')} onClick={() => hiddenNav()}>
                <span>{item.title}</span>
              </Link>
              {dropDown ? (
                <span onClick={handleDropDown}>
                  <MinusIcon width="3rem" height="3rem" />
                </span>
              ) : (
                <span onClick={handleDropDown}>
                  <PlusIcon width="3rem" height="3rem" />
                </span>
              )}
            </div>
            {dropDown && (
              <Submenu item={item.submenu} handleClick={handleDropDown} handleHiddenNav={hiddenNav}></Submenu>
            )}
          </li>
        </>
      ) : (
        <>
          <li className={cx('nav__item')} key={item.id}>
            <Link to={item.url} onClick={handleDropDown} className={cx('nav__item-link')}>
              <span>{item.title}</span>
            </Link>
          </li>
          <li className={cx('nav__item-res')} key={item.id + 1} onClick={handleDropDown}>
            <Link to={item.url} className={cx('nav__item-link')}>
              <span>{item.title}</span>
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default MenuItem;
