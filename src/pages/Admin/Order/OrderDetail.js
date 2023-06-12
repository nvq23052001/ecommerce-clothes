import { Card, Step, StepButton, StepLabel, Stepper } from '@mui/material';
import { Box, Container } from '@mui/system';
import Loading from 'components/common/loading/Loading';
import { apiUrls } from 'config/apis';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApis } from 'services/api';
import currency from 'utils/currency';
import { mappingAdminOrderStatus, mappingAdminOrderStatusColor, STATUS } from './constants';
import './orderDetail.scss';

// eslint-disable-next-line no-unused-vars
const { ALL, PENDING, CONFIRMED, PROCESSING, DELIVERING, DELIVERED, RECEIVED, SUCCESS, CANCELED } = STATUS;

const OrderDetail = () => {
  const { apiGet } = useApis();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    apiGet(apiUrls.adminOrders(`detail/${id}`), {}, ({ status, data }) => {
      if (status) {
        setData(data.items);
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { status, order_code, phone, name, address, payment_method, cart = [], createdAt } = data;

  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item?.quantity * item?.product.price;
  });

  const activeStep = useMemo(() => {
    if (status === CONFIRMED) return 0;
    if (status === PROCESSING) return 1;
    if (status === DELIVERING) return 2;
    if (status === SUCCESS) return 3;
  }, [status]);

  const listSteps = [
    { value: CONFIRMED, icon: 'money-bill-alt' },
    { value: PROCESSING, icon: 'box' },
    { value: DELIVERING, icon: 'truck' },
    { value: SUCCESS, icon: 'star' }
  ];

  const renderStatus = useCallback(() => {
    if (!status) return null;

    const { background, text, border } = mappingAdminOrderStatusColor[Number(status)];

    const style = {
      backgroundColor: background,
      color: text,
      border: `1px solid ${border}`
    };

    return (
      <div className="AdminOrderStatus" style={style}>
        {mappingAdminOrderStatus[Number(status)]}
      </div>
    );
  }, [status]);

  const renderField = (title, children, header) => (
    <div className="AdminOrderDetail-block">
      <div className="AdminOrderDetail-blockTitle d-f ai-c">
        <div>{title}</div>
        <div>{header}</div>
      </div>
      {children?.map((item, index) => (
        <div className="AdminOrderDetail-blockContent" key={index}>
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {loading ? (
        <div style={{ minHeight: 300 }}>
          <Loading />
        </div>
      ) : (
        <Container>
          <div className="d-f jc-sb ai-c">
            <div></div>
            {renderStatus()}
          </div>

          {status === CANCELED ? (
            <div className="AdminOrderDetail-cancel">
              <div>Đơn hàng đã hủy</div>
            </div>
          ) : (
            <Box sx={{ maxWidth: 800, margin: '30px auto 20px' }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {listSteps.map((step, index) => {
                  const { value, icon } = step;
                  const label = mappingAdminOrderStatus[value];

                  return (
                    <Step key={value}>
                      <StepButton
                        icon={
                          <div className="step-icon">
                            <i
                              className={`fas fa-${icon}`}
                              style={{
                                color: activeStep >= index ? '#03a848' : undefined
                              }}
                            />
                          </div>
                        }
                        disabled
                      />
                      <StepLabel StepIconComponent={() => null}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
          )}
          <div className="AdminOrderDetail-wrapper">
            <div className="left">
              <Card sx={{ p: 3 }}>
                {renderField('Mã Đơn hàng', [`${order_code}`])}
                {renderField('Thông tin khách hàng', [`Họ và tên: ${name}`, `Số điện thoại: ${phone}`])}
                {renderField('Địa chỉ nhận hàng', [address])}
                {renderField('Phương thức thanh toán', [payment_method === 2 ? 'Chuyển khoản' : 'COD'])}
              </Card>
            </div>
            <div className="right">
              <Card sx={{ p: 3 }}>
                {cart.map((item) => {
                  const { quantity: amount, product = {} } = item;
                  const { image, name, price } = product;
                  return (
                    <div className="ProductItem">
                      <img className="ProductItem-img" alt="" width={48} height={48} src={image} />
                      <div className="ProductItem-information">
                        <div className="ProductItem-name">{name || ''}</div>
                        <div className="ProductItem-amount">{`Số lượng: ${amount}`}</div>
                      </div>
                      <div className="ProductItem-price">
                        {/* {oldPrice && <del className="ProductItem-oldPrice">{oldPrice}</del>} */}
                        <div className="ProductItem-newPrice">{currency(price * amount)}</div>
                      </div>
                    </div>
                  );
                })}
                <div className="d-f jc-sb" style={{ marginTop: 18 }}>
                  <div className="AdminOrderDetail-discountCode">
                    <div>Ngày đặt hàng: {moment(createdAt).format('DD/MM/YYYY')}</div>
                  </div>

                  <div style={{ minWidth: 280 }}>
                    <div className="UnitPrice" style={{ padding: '8px 16px 16px' }}>
                      <div className="UnitPrice-label label gray">Tổng cộng</div>
                      <div className={'UnitPrice-price redColor'}>{currency(totalPrice)}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default OrderDetail;
