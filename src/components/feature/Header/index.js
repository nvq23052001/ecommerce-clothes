// Socket IO
import { connect } from 'socket.io-client';

// assets
import { LogoutIcon } from 'assets/icons';
import images from '~/assets';
import { BarIcon, CardIcon, CartIcon, PhoneIcon, SearchIcon, UserIcon } from '~/assets/icons';

// routes
import routes from 'config/routes';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

// constants
import { menu } from 'constants/menu';

// config
import { apiUrls } from 'config/apis';

// service
import { useApis } from 'services/api';

// data
import MenuItem from '~/components/common/MenuItem';

// notification
import notification from 'pages/Admin/Order/notification';

// store
import useAuth from 'store/auth/hook';

// hooks
import { useCallback, useEffect, useRef, useState } from 'react';

// styles
import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { BACK_TO_PREVIOUS_PAGE } from 'constants/storage';
const cx = classNames.bind(styles);

const Header = () => {
  const { isAuth, signOut, user } = useAuth();
  const [responseNotification, setResponseNotification] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [searchParams] = useSearchParams();
  const [navigation, setNavigation] = useState([]);
  const [showNav, setShowNav] = useState(false);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const { apiGet } = useApis();

  const socketRef = useRef();

  const handleNavigate = (page = '') => {
    page === 'profile'
      ? isAuth
        ? navigate(routes.profile)
        : navigate(routes.login)
      : isAuth
      ? navigate(routes.cart)
      : navigate(routes.login);
  };

  const handleLogout = () => {
    signOut();
    setQuantity(0);
    navigate(localStorage.removeItem(BACK_TO_PREVIOUS_PAGE));
    navigate(routes.login);
    window.location.reload();
  };

  const getCategories = useCallback(() => {
    apiGet(apiUrls.adminCategories(), '', ({ data: { items }, status }) => {
      if (status && items) {
        const navigation = menu(
          items
            .filter((category) => category.status && category.name !== '-')
            .map((category) => ({
              title: category.name,
              url: routes.category + category._id
            }))
        );
        if (isAuth) {
          const newMenu = [
            {
              id: 5,
              title: 'Đơn hàng',
              url: '/orders'
            },
            {
              id: 6,
              title: 'Sản phẩm yêu thích',
              url: '/products/favorite'
            }
          ];
          setNavigation([...navigation, ...newMenu]);
        } else {
          setNavigation(navigation);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiGet]);

  const handleSearch = () => {
    if (keyword) {
      navigate(routes.search + '?keyword=' + keyword);
    }
  };

  const getCart = () => {
    apiGet(apiUrls.userCart(user?.id), '', ({ data: { items }, status }) => {
      if (status) {
        setQuantity(items?.length || 0);
      }
    });
  };

  const handleShowNav = () => {
    setShowNav(true);
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
  };
  const handleHiddenNav = () => {
    setShowNav(false);
    document.body.style.height = 'auto';
    document.body.style.overflow = 'scroll';
  };

  useEffect(() => {
    if (user && user.id) {
      getCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, searchParams.get('from')]);

  useEffect(() => {
    getCategories();
  }, [getCategories, isAuth]);

  useEffect(() => {
    if (isAuth) {
      socketRef.current = connect(process.env.REACT_APP_API_URL);
      socketRef.current.on('notification', (data) => setResponseNotification(data));
      socketRef.current.on('refresh_cart', (data) => {
        if (data === 'change_quantity') {
          getCart();
        }
      });
      return () => socketRef.current.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  useEffect(() => {
    if (Object.keys(responseNotification).length) {
      if (responseNotification.user === user?.id) {
        notification(responseNotification);
      }
    }
  }, [responseNotification, user?.id]);

  return (
    <header className={cx('header')}>
      <div className={cx('content-header')}>
        <div className={cx('wrapper')}>
          <div className={cx('header__info')}>
            <p className={cx('header__info-contract')}>
              <PhoneIcon width="2rem" height="2rem" />
              <span className={cx('header__info-text')}> Chăm sóc khách hàng: </span>
              <span className={cx('phone-number')}>19009057</span>
            </p>
            <p className={cx('header__info-online')}>
              <CardIcon width="2rem" height="2rem"></CardIcon>
              <span className={cx('header__info-text')}>Mua hàng online:</span>
              <span className={cx('phone-number')}>0345 561 321</span>
            </p>
          </div>
          <Link to={routes.home} className={cx('header__logo')}>
            <img src={images.logo} alt="" className={cx('header__logo-img')} />
          </Link>
          <div className={cx('header__search')}>
            <form className={cx('header__form')}>
              <select className={cx('header__search-select')}>
                <option value="">Tất cả</option>
              </select>
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                className={cx('header__search-input')}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="button" className={cx('header__search-btn')} onClick={handleSearch}>
                <SearchIcon width="2rem" height="2rem" />
              </button>
            </form>
            <ul className={cx('header__list')}>
              <li className={cx('header__item')} onClick={() => handleNavigate('profile')}>
                <UserIcon width="1.5rem" height="1.5rem" />
                <span>Tài khoản</span>
              </li>
              <li onClick={handleNavigate} className={cx('header__item', quantity && 'item_cart')} count={quantity}>
                <CartIcon width="1.5rem" height="1.5rem" />
                <span>Giỏ hàng</span>
              </li>
              {isAuth && (
                <>
                  <li onClick={handleLogout} className={cx('header__item')}>
                    <LogoutIcon width="1.5rem" height="1.5rem" />
                    <span>Đăng xuất</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <nav className={cx('header__menu')}>
          <ul className={cx('nav__list')}>
            {navigation &&
              navigation.map((item) => <MenuItem item={item} key={item.id} hiddenNav={handleHiddenNav}></MenuItem>)}
          </ul>
        </nav>
      </div>
      {/* Tablet */}
      <div className={cx('wrapper__res')}>
        <div className={cx('nav-button')} onClick={handleShowNav}>
          <BarIcon width="4rem" height="4rem" />
        </div>
        <div className={cx('logo__res')}>
          <Link to={routes.home} className={cx('header__logo')}>
            <img src={images.logo} alt="" className={cx('header__logo-img')} />
          </Link>
        </div>
        <div>
          <li onClick={handleNavigate} className={cx('header__item', quantity && 'item_cart')} count={quantity}>
            <CartIcon width="4rem" height="4rem" />
          </li>
        </div>
        <div className={cx('nav', { 'nav-visible': showNav }, { 'nav-hidden': !showNav })}>
          <div className={cx('nav__header')}>
            <h3 className={cx('nav__title')}>Hakken thương hiệu chuyên áo khác da</h3>
            <span className={cx('close')} onClick={handleHiddenNav}>
              x
            </span>
          </div>
          <form className={cx('header__form')}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm ..."
              className={cx('header__search-input')}
            />
            <button type="button" className={cx('header__search-btn')} onClick={handleSearch}>
              <SearchIcon width="2rem" height="2rem" />
            </button>
          </form>
          <nav className={cx('header__menu-res')}>
            <ul className={cx('nav__list')}>
              {navigation &&
                navigation.map((item) => <MenuItem item={item} key={item.id} hiddenNav={handleHiddenNav}></MenuItem>)}
              <li className={cx('header__item')} onClick={() => handleNavigate('profile')}>
                <span>Tài khoản</span>
              </li>
              {isAuth && (
                <li onClick={handleLogout} className={cx('header__item')}>
                  <span>Đăng xuất</span>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className={cx('overlay')}></div>
      </div>
    </header>
  );
};

export default Header;
