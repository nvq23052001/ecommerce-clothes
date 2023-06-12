import { TruckIcon } from 'assets/icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import OrderList from '~/components/common/OrderList';

// styles
import classNames from 'classnames/bind';
import { apiUrls } from 'config/apis';
import routes from 'config/routes';
import { mappingAdminOrderStatus, STATUS } from 'pages/Admin/Order/constants';
import { useApis } from 'services/api';
import { connect } from 'socket.io-client';
import useAuth from 'store/auth/hook';
import currency from 'utils/currency';
import styles from './Order.module.css';
const cx = classNames.bind(styles);

export const LIST_ORDER_STATUS = [
  {
    title: 'Tất cả đơn hàng',
    status: ['all']
  },
  {
    title: 'Đang chờ xử lý',
    status: ['0', '1']
  },
  {
    title: 'Đang xử lý',
    status: '2'
  },
  { title: 'Giao hàng', status: ['3', '4', '5', '6'] },
  {
    title: 'Đã hủy/Trả hàng',
    status: ['7', '8']
  }
];

const Cart = () => {
  const { isAuth } = useAuth();
  const [isTab, setIsTab] = useState(['all']);
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const { apiGet, apiPut } = useApis();

  useEffect(() => {
    if (isAuth) {
      getOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const [responseSocket, setResponseSocket] = useState({});
  const socketRef = useRef();

  const getOrders = useCallback(
    () =>
      apiGet(apiUrls.userOrders(user.id), '', ({ data: { items }, status }) => {
        if (status) {
          setOrders(items);
        }
      }),
    [apiGet, user.id]
  );
  useEffect(() => {
    if (isAuth) {
      socketRef.current = connect(process.env.REACT_APP_API_URL);
      socketRef.current.on('notification', (data) => setResponseSocket(data));
      return () => socketRef.current.disconnect();
    }
  }, [isAuth]);

  useEffect(() => {
    if (Object.keys(responseSocket).length && isAuth) {
      getOrders();
    }
  }, [responseSocket, getOrders, isAuth]);

  const handleChangeTab = (id) => {
    setIsTab(id);
  };

  const handleChangeStatus = (id, status) => {
    if (
      (status === STATUS['SUCCESS'] && window.confirm('Xác nhận đã nhận được hàng ? ')) ||
      (status === STATUS['CANCELED'] && window.confirm('Bạn có chắc chắn muốn huỷ đơn hàng này ? '))
    ) {
      apiPut(apiUrls.userOrders(id), { status }, ({ status }) => {
        if (status) {
          getOrders();
        }
      });
    }
  };

  if (isAuth) {
    return (
      <div>
        <section className={cx('breadcrumb')}>
          <div className={cx('breadcrumb__overlay')}></div>
          <div className={cx('breadcrumb__content')}>
            <div className={cx('breadcrumb__wrapper')}>
              <div className={cx('breadcrumb__big')}>
                <h2 className={cx('breadcrumb__title')}>ĐƠN MUA CỦA BẠN</h2>
              </div>
              <div className={cx('breadcrumb__small')}>
                <p className={cx('breadcrumb__direct')}>
                  <Link to={routes.home} className={cx('breadcrumb__back')}>
                    Trang chủ
                  </Link>
                  <span> / </span>
                  <span className={cx('breadcrumb__desc')}>Đơn mua của bạn</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className={cx('page-wrapper')}>
          <div className={cx('wrapper')}>
            <ul className={cx('order-list')}>
              {LIST_ORDER_STATUS.map((item, index) => (
                <OrderList tab={item} isTab={isTab} handleChangeTab={handleChangeTab} key={index}></OrderList>
              ))}
            </ul>

            {(isTab.includes('all') ? orders : orders.filter((order) => isTab.includes(order.status)))?.map((order) => (
              <div className={cx('order-item-content')} key={order._id}>
                <div className={cx('content-wrapper')}>
                  <div className={cx('content-header')}>
                    <Link to={'/order/' + order._id}>Đơn hàng {order.order_code}</Link>
                    <p className={cx('content-status')}>
                      {order.status === STATUS['DELIVERED'] || order.status === STATUS['RECEIVED'] ? (
                        <>
                          <TruckIcon />
                          Đơn hàng đã giao thành công
                        </>
                      ) : (
                        mappingAdminOrderStatus[order.status]
                      )}
                    </p>
                  </div>
                  {order?.cart?.map((item) => (
                    <div key={item._id}>
                      <div className={cx('content-body')}>
                        <Link className={cx('content-img')} to={'/order/' + order._id}>
                          <img src={item.product.image} alt="" className={cx('img')} />
                        </Link>
                        <div className={cx('content-title')}>
                          <Link to={'/order/' + order._id}>
                            <h3 className={cx('content-name')}>{item.product.name}</h3>
                          </Link>
                          <p className={cx('content-quantity')}>x{item.quantity}</p>
                        </div>
                        <div className={cx('content-price')}>{currency(item.product.price)}</div>
                      </div>
                    </div>
                  ))}
                  <div className={cx('quantity')}>
                    <span className={cx('quantity-title')} style={{ fontSize: 15 }}>
                      Phí vận chuyển:{' '}
                    </span>
                    <span className={cx('quantity-price')}>{currency(order.fee)}</span>
                  </div>
                  <div className={cx('quantity')}>
                    <span className={cx('quantity-title')}>Thành tiền: </span>
                    <span className={cx('quantity-price')}>
                      {currency(
                        order?.cart?.reduce((acc, curr) => (acc += curr.quantity * curr.product.price), 0) + order.fee
                      )}
                    </span>
                  </div>
                  <div className={cx('repurchase')}>
                    {order.status === STATUS['DELIVERED'] && (
                      <button
                        className={cx('btn', 'btn-accept')}
                        onClick={() => handleChangeStatus(order._id, STATUS['SUCCESS'])}
                      >
                        Đã nhận được hàng
                      </button>
                    )}
                    {order.status === STATUS['SUCCESS'] && (
                      <button className={cx('btn', 'btn-feedback')}>Đánh giá</button>
                    )}
                    {[STATUS['DELIVERED'], STATUS['SUCCESS']].includes(order.status) && (
                      <button className={cx('btn')}>Mua lại</button>
                    )}
                    {[STATUS['PENDING']].includes(order.status) && (
                      <button
                        className={cx('btn', 'btn-cancel')}
                        onClick={() => handleChangeStatus(order._id, STATUS['CANCELED'])}
                      >
                        HUỶ
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to={routes.login} />;
  }
};

export default Cart;
