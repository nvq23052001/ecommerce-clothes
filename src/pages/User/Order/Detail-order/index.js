import classNames from 'classnames/bind';
import styles from './Detail-order.module.css';
import { Link, useParams } from 'react-router-dom';
import { Box, Stepper, Step, StepButton } from '@mui/material';
import currency from 'utils/currency';
import { useEffect, useState } from 'react';
import { useApis } from 'services/api';
import { apiUrls } from 'config/apis';
import PageNotFound from 'pages/NotFound';
import { paymentMethods } from 'constants/payment';
import { STATUS } from 'pages/Admin/Order/constants';
import routes from 'config/routes';

const cx = classNames.bind(styles);

const steps = [
  {
    label: 'Đang chờ xử lý',
    value: [STATUS.PENDING, STATUS.CONFIRMED]
  },
  {
    label: 'Đang xử lý',
    value: [STATUS.PROCESSING, STATUS.PICKED]
  },
  {
    label: 'Giao hàng',
    value: [STATUS.DELIVERING, STATUS.FAIL, STATUS.SUCCESS]
  },
  {
    label: 'Đã hủy / Trả hàng',
    value: [STATUS.CANCELED, STATUS.RETURN]
  }
];

const listStatusOrder = [
  {
    label: 'Chờ xác nhận',
    value: STATUS.PENDING
  },
  {
    label: 'Đã xác nhận',
    value: STATUS.CONFIRMED
  },
  {
    label: 'Đang xử lý',
    value: STATUS.PROCESSING
  },
  { label: 'Đã lấy hàng', value: STATUS.PICKED },
  {
    label: 'Đang giao',
    value: STATUS.DELIVERING
  },
  { label: 'Giao hàng thất bại', value: STATUS.FAIL },
  {
    label: 'Giao hàng thành công',
    value: STATUS.SUCCESS
  },
  {
    label: 'Đã hủy',
    value: STATUS.CANCELED
  },
  {
    label: 'Trả hàng',
    value: STATUS.RETURN
  }
];

const DetailOrder = () => {
  const { id } = useParams();
  const { apiGet } = useApis();
  const [order, setOrder] = useState({});

  const getOrderDetail = (id) => {
    apiGet(apiUrls.userOrders(`detail/${id}`), '', ({ status, data: { items } }) => {
      if (status) {
        setOrder(items);
      }
    });
  };

  useEffect(() => {
    getOrderDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return Object.keys(order).length ? (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <div className={cx('content-top')}>
          <div className={cx('top-left')}>
            <Link to={routes.userOrder}> Trở lại</Link>
          </div>
          <div className={cx('top-right')}>
            <span className={cx('text-right-fr')}>Mã đơn hàng: {order.order_code}</span>
            <span className={cx('text-right-sc')}>|</span>
            <span className={cx('text-right-th')}>
              {order.status === STATUS['RECEIVED']
                ? 'Đã giao'
                : listStatusOrder.find((step) => step.status === order.status)?.label}
            </span>
          </div>
        </div>
        <div className={cx('content-second')}>
          <Box sx={{ fontSize: '26px' }}>
            <Stepper nonLinear activeStep={steps.indexOf(steps.find((step) => step.value.includes(order.status)))}>
              {steps.map((step, index) => (
                <Step className={cx('text-step')} key={index}>
                  <StepButton color="inherit">{step.label}</StepButton>
                </Step>
              ))}
            </Stepper>
            <div></div>
          </Box>
        </div>
        <div className={cx('line')}></div>
        <div className={cx('content-third')} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h4 className={cx('content-title-third')}>Địa chỉ nhận hàng</h4>
            <div className={cx('infor-title-third')}>
              <div className={cx('text-span-third')}>{order.name}</div>
              <div className={cx('text-span-third')}>{order.phone}</div>
              <span className={cx('text-span-third')}>{order.address}</span>
            </div>
          </div>
          <div>
            <h4 className={cx('content-title-third')}>Trạng thái</h4>
            <div className={cx('infor-title-third')}>
              {listStatusOrder.find((status) => status.value === order.status)?.label}
            </div>
          </div>
        </div>
        <div className={cx('content-four')}>
          <div className={cx('title-content-four')}>Sản phẩm</div>
          {order.cart.map((item) => (
            <div className={cx('four-top')} key={item._id}>
              <div className={cx('four-image')}>
                <img className={cx('image-detail')} src={item.product.image} alt="" />
              </div>
              <div className={cx('four-infor-product')}>
                <Link className={cx('infor-name')} to={'/product/' + item.product._id}>
                  {item.product.name}
                </Link>
                <div className={cx('infor-type')}>x {item.quantity}</div>
              </div>
              <div className={cx('four-price')}>
                {item.product.promotion_price && <div className={cx('price')}>{currency(item.product.price)}</div>}
                <div className={cx('promotion-price')}>
                  {currency(item.product.promotion_price || item.product.price)}
                </div>
              </div>
            </div>
          ))}

          <div className={cx('four-table-product')}>
            <div className={cx('table-product-left')}>
              <div className={cx('item-left')}>Tổng tiền hàng</div>
              <div className={cx('item-left')}>Phí vận chuyển</div>
              <div className={cx('item-left')}>Thành tiền</div>
            </div>
            <div className={cx('table-product-right')}>
              <div className={cx('item-right')}>{currency(order.total)}</div>
              <div className={cx('item-right')}>{order?.fee ? currency(order.fee) : 0}</div>
              <div className={cx('item-right-total')}>{currency(order.total + (order?.fee || 0))}</div>
            </div>
          </div>
        </div>
        {order.payment_method === paymentMethods['COD'] ? (
          <div className={cx('content-five')}>
            Vui lòng thanh toán <span className={cx('span-price')}>{currency(order.total)}</span> khi nhận hàng
          </div>
        ) : null}
        <div className={cx('content-six')}>
          <div className={cx('content-six-left')}>Phương thức thanh toán</div>
          <div className={cx('content-six-right')}>
            {order.payment_method === +paymentMethods['COD'] ? (
              'Thanh toán khi nhận hàng'
            ) : (
              <>
                Chuyển khoản <br /> (Đã thanh toán)
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <PageNotFound />
  );
};

export default DetailOrder;
