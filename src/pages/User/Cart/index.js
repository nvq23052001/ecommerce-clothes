import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import currency from 'utils/currency';
import routes from 'config/routes';
import { useApis } from 'services/api';
import useAuth from 'store/auth/hook';

// styles
import styles from './Cart.module.css';
import classNames from 'classnames/bind';
import { apiUrls } from 'config/apis';
import CartItemsMobile from './CartItemsMobile';
const cx = classNames.bind(styles);

const Cart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const { apiGet } = useApis();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(routes.checkout);
  };

  const getCart = useCallback(
    (userId) => {
      apiGet(apiUrls.userCart(userId), '', ({ data: { items }, status }) => {
        if (status) {
          setCart(items);
          setTotal(
            items.reduce((acc, curr) => {
              return acc + curr.total;
            }, 0)
          );
        }
      });
    },
    [apiGet]
  );

  useEffect(() => {
    if (user?.id) {
      getCart(user.id);
    } else {
      navigate(routes.login);
    }
  }, [getCart, navigate, user]);

  return (
    <div>
      <section className={cx('breadcrumb')}>
        <div className={cx('breadcrumb__overlay')}></div>
        <div className={cx('breadcrumb__content')}>
          <div className={cx('breadcrumb__wrapper')}>
            <div className={cx('breadcrumb__big')}>
              <h2 className={cx('breadcrumb__title')}>GIỎ HÀNG CỦA BẠN</h2>
            </div>
            <div className={cx('breadcrumb__small')}>
              <p className={cx('breadcrumb__direct')}>
                <Link to={routes.home} className={cx('breadcrumb__back')}>
                  Trang chủ
                </Link>
                <span> / </span>
                <span className={cx('breadcrumb__desc')}>Giỏ hàng của bạn</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className={cx('page-wrapper')}>
        <div className={cx('wrapper')}>
          <div className={cx('inner')}>
            <h1>Giỏ hàng</h1>
            {cart.length > 0 ? <form action="/cart" method="post" noValidate className={cx('cart', 'table-wrap')}>
              <>
              <div className={cx('cart-mobile', 'full', 'table--responsive')}>
              {cart?.map((cart, index) => (
                    <CartItemsMobile key={index} cart={cart} callback={() => getCart(user.id)} />
                  ))}
              </div>
              <table className={cx('cart-table', 'full', 'table--responsive')}>
                <thead className={cx('cart__row', 'cart__header-labels')}>
                  <tr>
                    <th colSpan={2} className={cx('text-center')}>
                      Thông tin chi tiết sản phẩm
                    </th>
                    <th className={cx('text-center')}>Đơn giá</th>
                    <th className={cx('text-center')}>Số lượng</th>
                    <th className={cx('text-right')}>Tổng giá</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((cart, index) => (
                    <CartItem key={index} cart={cart} callback={() => getCart(user.id)} />
                  ))}
                </tbody>
              </table>
              </>
              <div className={cx('cart-total')}>
                {/* <div className={cx('grid__item', 'two-thirds', 'small--one-whole')}></div> */}
                <div className={cx('')}>
                  <p>
                    <span className={cx('cart__subtotal-title')}>Tổng tiền</span>
                    <span className={cx('h3', 'cart__subtotal')}>{currency(total)}</span>
                  </p>
                  <button onClick={handleCheckout} className={cx('btn')}>
                    Thanh toán
                  </button>
                </div>
              </div>
            </form> : <div><div className={cx('cart_emtry_title')}><img src='https://bizweb.dktcdn.net/100/408/147/themes/794761/assets/empty-cart.png?1614232945745' alt='' /></div>
            <div className={cx('cart_emtry_button')}><Link to="/products" ><button className={cx('btn')}>MUA NGAY</button></Link> </div>
              </div>}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
