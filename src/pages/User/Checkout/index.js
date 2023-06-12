// hooks
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// constants
import { banks } from 'constants/bank';
import { HttpStatusCode, paymentMethods } from 'constants/payment';

// config
import { apiUrlGHN, apiUrls } from 'config/apis';

// notification
import { toastMessage } from 'constants/payment';
import { toast } from 'react-toastify';

// mui
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// helper
import { CommonHelper } from 'helpers/CommonHelper';

// router
import routes from 'config/routes';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// service
import { useApis } from 'services/api';
import executeAxios from 'services/apiGHN';
import { getDistricts, getProvinces, getWards } from 'services/province';

// utils
import currency from 'utils/currency';

// styles
import classNames from 'classnames/bind';
import styles from './Checkout.module.css';

// Icon
import { MarkIcon } from 'assets/icons';

import { createPortal } from 'react-dom';
import useAuth from 'store/auth/hook';
const cx = classNames.bind(styles);

const popupEl = document.getElementById('popup');

const Checkout = () => {
  // state
  const [provinces, setProvinces] = useState([]);
  const [infoAddress, setInfoAddress] = useState({});

  const [districts, setDistricts] = useState([]);

  const [wards, setWards] = useState([]);

  const [fee, setFee] = useState(0);

  const [payment, setPayment] = useState([]);

  const [showMethodPay, setShowMethodPay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods['COD']);
  const [bankCode, setBankCode] = useState('');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [service, setService] = useState([]);

  const [modalAddress, setModalAddress] = useState(false);
  const [visibleListAddress, setVisibleListAddress] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [updateAddress, setUpdateAddress] = useState(false);
  const [listAddress, setListAddress] = useState([]);
  const [addressCheckout, setAddressCheckout] = useState({});
  const [currentAddress, setCurrentAddress] = useState({});
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { apiPost, apiGet, apiDelete, apiPatch } = useApis();

  // query params
  const searchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(searchParams.entries());

  // form
  const { register, handleSubmit, formState, setValue, resetField, clearErrors } = useForm();
  const { errors } = formState;

  // store
  const { user } = useAuth();

  const handleOrder = async (cart) => {
    const timeDelivery = await getDeliveryTime();
    const cartCheck = {
      ...cart,
      estimated_delivery_time: new Date(Date.now() + timeDelivery?.data?.leadtime),
      fee: fee,
      payment_method: paymentMethod
    };
    delete cartCheck.infoOrderGHN;
    apiPost(apiUrls.userOrders(), cartCheck, ({ status }) => {
      if (status) {
        apiDelete(apiUrls.userCart());
        navigate(routes.userOrder + '?from=checkout');
        toast.success('Đặt hàng thành công');
        localStorage.removeItem('cart');
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại');
      }
    });
  };

  const handleChangePaymentMethod = ({ target: { value } }) => {
    setPaymentMethod(paymentMethods[value]);
  };

  const onSubmit = (data) => {
    try {
      const params = {
        ...data,
        province: +data.province,
        district: +data.district,
        address: data.apartment_number
      };
      if (updateAddress) {
        apiPatch(apiUrls.updateAddress(user.id, infoAddress._id), params, (res) => {
          toast.success('Cập nhập địa chỉ thành công!');

          if (res.status) {
            fetchListAddress();
          }
        });
      } else {
        apiPost(apiUrls.addressClient(user.id), params, (res) => {
          toast.success('Thêm mới địa chỉ thành công!');
          if (res.status) {
            if (listAddress.length === 0) {
              setModalAddress(false);
              fetchListAddress();
              fetchAddress();
            } else {
              fetchListAddress();
            }
          }
        });
      }
      setUpdateAddress(false);
      setAddAddress(false);
      setVisibleListAddress(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleShowMethod = () => {
    if (!showMethodPay) {
      if (!currentAddress?.address) {
        toast.error('Bạn chưa có địa chỉ nhận hàng. Vui lòng thêm địa chỉ nhận hàng');
        return;
      }
      setShowMethodPay(true);
      CommonHelper.scrollToTop();
    } else {
      handlePayment(currentAddress);
    }
  };

  const getProvinceName = (province) => {
    if (provinces.length > 0) {
      const textProvince = provinces.find((_province) => _province.ProvinceID === +province).ProvinceName;
      return textProvince;
    }
  };
  const getDistrictName = (district) => {
    if (districts.length > 0) {
      const textDistrict = districts.find((_district) => _district.DistrictID === +district).DistrictName;
      return textDistrict;
    }
  };
  const getWardName = (ward) => {
    if (wards.length > 0) {
      const textWard = wards.find((_ward) => _ward.WardCode === ward)?.WardName;
      return textWard;
    }
  };
  const handleShowMethodPay = () => setShowMethodPay(false);

  const handlePayment = (data) => {
    const { province, district, ward, name, phone, address } = data;
    // const address = transformAddress(address, ward, district, province);
    const provinceName = getProvinceName(province);
    const districtName = getDistrictName(district);
    const wardName = getWardName(ward);
    const userInfo = { address, phone, name };
    const infoOrderGHN = {
      provinceName,
      districtName,
      wardName,
      payment_method: paymentMethod,
      service_id: service[0].service_id,
      service_type_id: service[0].service_type_id
    };

    const _cart = cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      name: item?.product.name,
      price: item?.product.price
    }));

    const requestBody = {
      user: user.id,
      cart: _cart,
      email: user.email,
      total,
      ...userInfo,
      infoOrderGHN: infoOrderGHN
    };
    if (paymentMethod === paymentMethods['BANK_TRANSFER']) {
      localStorage.setItem('cart', JSON.stringify({ ...requestBody }));
      apiPost(apiUrls.userPayment(), { user: user.id, bankCode, amount: total + fee }, ({ data: { params } }) => {
        if (params) {
          window.location.replace(process.env.REACT_APP_VNP_URL + params);
        }
      });
      return;
    } else {
      handleOrder(requestBody);
    }
  };

  const handleNavigateToCart = () => navigate(routes.cart);

  // const handleApplyCouPon = () => {};

  const listProvinces = async () => {
    try {
      const { data } = await getProvinces();
      setProvinces(data?.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getDistrict = async (ProvinceID) => {
    try {
      const { data } = await getDistricts(ProvinceID);
      return data?.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleChangeProvince = async ({ target: { value: ProvinceID } }) => {
    setFee(0);
    setDistricts([]);
    setWards([]);
    const listDistrict = await getDistrict(ProvinceID);
    setDistricts(listDistrict);
  };

  const getWard = async (DistrictID) => {
    try {
      const { data } = await getWards(DistrictID);
      return data?.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleChangeDistrict = async ({ target: { value: DistrictID } }) => {
    setFee(0);
    setWards([]);
    const listWard = await getWard(DistrictID);
    setWards(listWard);
  };

  const getCart = (userId) => {
    apiGet(apiUrls.userCart(userId), '', ({ data: { items } }) => {
      setCart(items);
      setTotal(
        items.reduce((acc, curr) => {
          return acc + curr.total;
        }, 0)
      );
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGetService = async (district) => {
    try {
      if (district) {
        const params = {
          shop_id: 3989904,
          from_district: 3440,
          to_district: +district
        };
        const { data } = await executeAxios(apiUrlGHN.getService, params);
        setService(data.data);
        return data;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Lấy thời gian giao hàng dự kiến
  const getDeliveryTime = async () => {
    try {
      const params = {
        from_district_id: 3440,
        from_ward_code: '13010',
        to_district_id: currentAddress.district,
        to_ward_code: currentAddress.ward,
        service_id: service[0].service_id
      };
      const { data } = await executeAxios(apiUrlGHN.calculateTimeDelivery, params);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Lấy danh sách phương thức thanh toán
  const getPayment = () => {
    apiGet(apiUrls.getAdminPayment(), {}, ({ data: items }) => {
      const filter = items.items.filter((item) => item.status !== 0);
      setPayment(filter);
    });
  };

  // Hiện thị popup address
  const handleShowListAddress = () => {
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    setModalAddress(true);
    setVisibleListAddress(true);
  };

  const handleUpdateAddress = async (item) => {
    setInfoAddress(item);
    const listDistrict = await getDistrict(item.province);
    const listWard = await getWard(item.district);
    setWards(listWard);
    setDistricts(listDistrict);
    setValue('ward', item.ward);
    setValue('district', item.district);
    setValue('name', item.name);
    setValue('phone', item.phone);
    setValue('apartment_number', item.address);
    setValue('province', item.province);

    setVisibleListAddress(false);
    setUpdateAddress(true);
  };

  const handleChangeAddress = (item) => {
    setAddressCheckout(item);
  };

  const handleConformAddress = () => {
    document.body.style.height = 'auto';
    document.body.style.overflow = 'scroll';
    setCurrentAddress(addressCheckout);
    setModalAddress(false);
    setService([]);
    handleGetService(addressCheckout.district);
  };

  const handleAddAddress = () => {
    resetField('name');
    resetField('phone');
    resetField('district');
    resetField('province');
    resetField('ward');
    resetField('apartment_number');
    setDistricts([]);
    setWards([]);
    setVisibleListAddress(false);
    setUpdateAddress(false);
    setAddAddress(true);
    setModalAddress(true);
  };

  const handleBackList = () => {
    setVisibleListAddress(true);
    setUpdateAddress(false);
    setAddAddress(false);
    clearErrors();
    if (!currentAddress) {
      setModalAddress(false);
    }
  };

  const handleCloseModal = () => {
    document.body.style.height = 'auto';
    document.body.style.overflow = 'scroll';
    setModalAddress(false);
    setVisibleListAddress(false);
    setUpdateAddress(false);
    setAddAddress(false);
  };

  // Tính phí giao hàng GHN
  useEffect(() => {
    const handleCalculateFee = async (value) => {
      try {
        const params = {
          from_district_id: 3440,
          service_id: service[0].service_id,
          service_type_id: service[0].service_type_id,
          to_district_id: currentAddress.district,
          to_ward_code: currentAddress.ward,
          height: 50,
          length: 20,
          weight: 200,
          width: 20,
          insurance_value: 1000,
          coupon: null
        };
        const { data } = await executeAxios(apiUrlGHN.calculateFee, params);
        if (data) {
          setFee(data.data?.total);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    if (service.length > 0) {
      handleCalculateFee();
    }
  }, [service, currentAddress]);

  useEffect(() => {
    listProvinces();
    getPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user?.id) {
      if (!Object.keys(params).length) {
        localStorage.removeItem('cart');
      }
      getCart(user.id);
    } else {
      navigate(routes.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const { vnp_OrderInfo, vnp_ResponseCode } = params;
    if (vnp_OrderInfo && vnp_ResponseCode) {
      if (vnp_ResponseCode === HttpStatusCode['SUCCESS']) {
        const cart = JSON.parse(localStorage.getItem('cart')) ?? {};
        if (Object.keys(cart)?.length) {
          handleOrder(cart);
        }
      } else {
        localStorage.removeItem('cart');
        window.history.pushState({}, '', window.location.origin + window.location.pathname);
        toast.error(toastMessage[vnp_ResponseCode] || toastMessage[HttpStatusCode['OTHER_ERRORS']]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchListAddress = () => {
    apiGet(apiUrls.addressClient(user.id), {}, ({ data }) => {
      // List address
      setListAddress(data.items);
    });
  };
  const fetchAddress = () => {
    apiGet(apiUrls.addressClient(user.id), {}, ({ data }) => {
      if (data && data.items) {
        setAddressCheckout(data?.items[0]);
        setCurrentAddress(data?.items[0]);
        handleGetService(data?.items[0]?.district);
        // List address
        setListAddress(data?.items);
      }
    });
  };
  useEffect(() => {
    fetchAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinces, user.id]);
  return (
    <>
      <div className={cx('content')}>
        <div className={cx('wrap')}>
          <div className={cx('sidebar')}>
            <div className={cx('sidebar-content')}>
              <div className={cx('order-summary', 'order-summary-is-collapsed')}>
                <h2 className={cx('visually-hidden')}>Thông tin đơn hàng</h2>
                <div className={cx('order-summary-sections')}>
                  <div
                    className={cx('order-summary-section', 'order-summary-section-product-list')}
                    data-order-summary-section="line-items"
                  >
                    <table className={cx('product-table')}>
                      <thead>
                        <tr>
                          <th scope="col">
                            <span className={cx('visually-hidden')}>Hình ảnh</span>
                          </th>
                          <th scope="col">
                            <span className={cx('visually-hidden')}>Mô tả</span>
                          </th>
                          <th scope="col">
                            <span className={cx('visually-hidden')}>Số lượng</span>
                          </th>
                          <th scope="col">
                            <span className={cx('visually-hidden')}>Giá</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart?.map((item) => {
                          return (
                            <tr className={cx('product')} key={item._id}>
                              <td className={cx('product-image')}>
                                <div className={cx('product-thumbnail')}>
                                  <div className={cx('product-thumbnail-wrapper')}>
                                    <img
                                      className={cx('product-thumbnail-image')}
                                      alt={item.name}
                                      src={item.product.image}
                                    />
                                  </div>
                                  <span className={cx('product-thumbnail-quantity')} aria-hidden="true">
                                    {item.quantity}
                                  </span>
                                </div>
                              </td>
                              <td className={cx('product-description')}>
                                <span className={cx('product-description-name', 'order-summary-emphasis')}>
                                  {item.product.name}
                                </span>
                                <span className={cx('product-description-variant', 'order-summary-small-text')}>
                                  {/* Đen / S / Da Cừu */}
                                </span>
                              </td>
                              <td className={cx('product-quantity', 'visually-hidden')}>1</td>
                              <td className={cx('product-price')}>
                                <span className={cx('order-summary-emphasis')}>{currency(item.total)}</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* coupon */}
                  {/* <div
                className={cx('order-summary-section', 'order-summary-section-discount')}
                data-order-summary-section="discount"
              >
                <input name="utf8" type="hidden" defaultValue="✓" />
                <div className={cx('fieldset')}>
                  <div className={cx('field')}>
                    <div className={cx('field-input-btn-wrapper')}>
                      <div className={cx('field-input-wrapper')}>
                        <label className={cx('field-label')} htmlFor="discount.code">
                          Mã giảm giá
                        </label>
                        <input
                          placeholder="Mã giảm giá"
                          className={cx('field-input')}
                          autoComplete="false"
                          autoCapitalize="off"
                          spellCheck="false"
                          size={30}
                          type="text"
                          id="discount.code"
                          name="discount.code"
                          onChange={({ target: { value } }) => setCoupon(value)}
                        />
                      </div>
                      <button
                        type="submit"
                        onClick={handleApplyCouPon}
                        className={cx('field-input-btn', 'btn', 'btn-default', 'btn-apply-cou-pon', {
                          'btn-disabled': coupon.length <= 0
                        })}
                      >
                        <span className={cx('btn-content')}>Sử dụng</span>
                        <i className={cx('btn-spinner', 'icon', 'icon-button-spinner')} />
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
                  <div
                    className={cx('order-summary-section', 'order-summary-section-total-lines', 'payment-lines')}
                    data-order-summary-section="payment-lines"
                  >
                    <table className={cx('total-line-table')}>
                      <thead>
                        <tr>
                          <th scope="col">
                            <span className={cx('visually-hidden')}>Mô tả</span>
                          </th>
                          <th scope="col">
                            <span className={cx('visually-hidden')}>Giá</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={cx('total-line', 'total-line-subtotal')}>
                          <td className={cx('total-line-name')}>Tạm tính</td>
                          <td className={cx('total-line-price')}>
                            <span
                              className={cx('order-summary-emphasis')}
                              data-checkout-subtotal-price-target={149250000}
                            >
                              {currency(total)}
                            </span>
                          </td>
                        </tr>
                        <tr className={cx('total-line', 'total-line-shipping')}>
                          <td className={cx('total-line-name')}>Phí ship</td>
                          <td className={cx('total-line-price')}>
                            <span className={cx('order-summary-emphasis')} data-checkout-total-shipping-target={0}>
                              {currency(fee)}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot className={cx('total-line-table-footer')}>
                        <tr className={cx('total-line')}>
                          <td className={cx('total-line-name', 'payment-due-label')}>
                            <span className={cx('payment-due-label-total')}>Tổng tiền</span>
                          </td>
                          <td className={cx('total-line-name', 'payment-due')}>
                            <span className={cx('payment-due-price')} data-checkout-payment-due-target={149250000}>
                              {currency(total + fee)}
                            </span>
                            <span className={cx('checkout_version')} data_checkout_version={7}></span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('main')}>
            <div className={cx('main-header')}>
              <Link to={routes.home} className={cx('logo')}>
                <h1 className={cx('logo-text')}>Hakken</h1>
              </Link>
              <ul className={cx('breadcrumb')}>
                <li className={cx('breadcrumb-item')}>
                  <Link href={routes.cart}>Giỏ hàng</Link>
                </li>
                <li className={cx('breadcrumb-item', 'breadcrumb-item-current')} onClick={handleShowMethodPay}>
                  Thông tin vận chuyển
                </li>
                <li className={cx('breadcrumb-item')}>Phương thức thanh toán</li>
              </ul>
            </div>
            <div className={cx('main-content')}>
              <div
                id="checkout_order_information_changed_error_message"
                className={cx('hidden')}
                style={{ marginBottom: 15 }}
              >
                <p className={cx('field-message', 'field-message-error', 'alert', 'alert-danger')}>
                  <svg
                    x="0px"
                    y="0px"
                    viewBox="0 0 286.054 286.054"
                    style={{ enableBackground: 'new 0 0 286.054 286.054' }}
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        style={{ fill: '#E2574C' }}
                        d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027 c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236 c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209 S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972 c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723 c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843 C160.878,195.732,152.878,187.723,143.036,187.723z"
                      />
                    </g>
                  </svg>
                  <span></span>
                </p>
              </div>
              <div className={cx('step-sections')} step={1}>
                {showMethodPay && (
                  <>
                    <div className={cx('section')}>
                      <div className={cx('section-header')}>
                        <h2 className={cx('section-title')}>Phương thức vận chuyển</h2>
                      </div>
                      <div className={cx('section-content', 'section-customer-information', 'no-mb')}>
                        {service.map((item, index) => (
                          <div className={cx('content-box')} key={index}>
                            <div className={cx('content-row')}>
                              <div className={cx('radio-wrapper')}>
                                <label className={cx('radio-label')}>
                                  <div className={cx('radio-input')}>
                                    <div>
                                      <input type="radio" className={cx('input-radio')} defaultChecked={true} />
                                    </div>
                                  </div>
                                  <span className={cx('radio-label-primary')}>{item.short_name}</span>
                                  <span className={cx('radio-accessory')}>{currency(fee)}</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div id="change_pick_location_or_shipping"></div>
                    </div>
                    <div className={cx('section')}>
                      <div className={cx('section-header')}>
                        <h2 className={cx('section-title')}>Phương thức thanh toán</h2>
                      </div>
                      <div className={cx('section-content', 'section-customer-information', 'no-mb')}>
                        {payment.map((item) => (
                          <div key={item._id} style={{ marginTop: '10px' }}>
                            <div className={cx('content-box')}>
                              <div className={cx('content-row')}>
                                <div className={cx('radio-wrapper')}>
                                  <label className={cx('radio-label')}>
                                    <div className={cx('radio-input')}>
                                      <input
                                        type="radio"
                                        className={cx('input-radio')}
                                        name="payload"
                                        onClick={handleChangePaymentMethod}
                                        defaultChecked={item.code}
                                        value={item.code}
                                      />
                                    </div>
                                    <div className={cx('radio-content-input')}>
                                      <img alt="" className={cx('main-img')} src={item.image} />
                                      <span className={cx('radio-label-primary')}>{item.name}</span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            {item.content && paymentMethod === paymentMethods[item.code] && (
                              <div className={cx('content-box-row-third')} htmlFor="payment_method_id_1002877322">
                                <div className={cx('blank-slate')}>{item.content}</div>
                              </div>
                            )}
                            {paymentMethod === paymentMethods['BANK_TRANSFER'] &&
                              paymentMethod === paymentMethods[item.code] && (
                                <div className={cx('content-box-row-third')} htmlFor="payment_method_id_1002877322">
                                  <div className={cx('blank-slate')}>
                                    <FormControl fullWidth>
                                      <InputLabel className={cx('banking-label')}>Ngân hàng</InputLabel>
                                      <Select
                                        labelId="banking"
                                        id="banking"
                                        className={cx('banking-selected')}
                                        defaultValue=""
                                        onChange={({ target: { value } }) => setBankCode(value)}
                                      >
                                        {banks.map((bank, index) => (
                                          <MenuItem value={bank.code} key={index} className={cx('banking-item')}>
                                            {bank.text}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </div>
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                      <div id="change_pick_location_or_shipping"></div>
                    </div>
                  </>
                )}
                {!showMethodPay && (
                  <div className={cx('section')}>
                    <div className={cx('section-header')}>
                      <h2 className={cx('section-title')}>Thông tin thanh toán</h2>
                    </div>

                    <div className={cx('section-content', 'section-customer-information', 'no-mb')}>
                      <input name="utf8" type="hidden" defaultValue="✓" />
                      <div className={cx('inventory_location_data')}>
                        <input name="customer_shipping_country" type="hidden" defaultValue={241} />
                        <input name="customer_shipping_province" type="hidden" defaultValue />
                        <input name="customer_shipping_district" type="hidden" defaultValue />
                        <input name="customer_shipping_ward" type="hidden" defaultValue />
                      </div>
                      <input type="hidden" name="checkout_user[email]" defaultValue="teskads@gmail.com" />
                      <div className={cx('logged-in-customer-information')}>
                        &nbsp;
                        <div className={cx('logged-in-customer-information-avatar-wrapper')}>
                          <div
                            className={cx('logged-in-customer-information-avatar', 'gravatar')}
                            style={{
                              backgroundImage:
                                'url(//www.gravatar.com/avatar/d8d1eadc13e9309ddcd967a82408c44d.jpg?s=100&d=blank)',
                              filter:
                                'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="//www.gravatar.com/avatar/d8d1eadc13e9309ddcd967a82408c44d.jpg?s=100&d=blank", sizingMethod="scale")'
                            }}
                          />
                        </div>
                        <p className={cx('logged-in-customer-information-paragraph')}>
                          {user?.name && user?.email ? user.name + ' (' + user.email + ')' : user.email}
                        </p>
                      </div>
                      <div className={cx('address')}>
                        <div className={cx('address-line')}></div>
                        <div className={cx('address-title')}>
                          <MarkIcon width="1.5rem" height="1.5rem" />
                          <span style={{ marginLeft: '5px' }}>Địa chỉ nhận hàng</span>
                        </div>
                        {currentAddress?.address ? (
                          <div className={cx('address-des')}>
                            <p className={cx('address-desc-p')}>{`${currentAddress?.address}`}</p>
                            <p className={cx('address-change')} onClick={handleShowListAddress}>
                              Thay đổi
                            </p>
                          </div>
                        ) : (
                          <div className={cx('address-none')}>
                            <p className={cx('address-desc-p')}>Tài khoản của bạn chưa có địa chỉ</p>
                            <p className={cx('address-desc-p')}>
                              Thêm địa chỉ{' '}
                              <span className={cx('add-address')} onClick={handleAddAddress}>
                                ở đây
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div id="change_pick_location_or_shipping"></div>
                  </div>
                )}
              </div>
              <div className={cx('step-footer')} id="step-footer-checkout">
                <input name="utf8" type="hidden" defaultValue="✓" />
                <button type="submit" className={cx('step-footer-continue-btn', 'btn')} onClick={handleShowMethod}>
                  <span className={cx('btn-content')}>{showMethodPay ? 'Đặt hàng' : 'Phương thức thanh toán'}</span>
                  <i className={cx('btn-spinner icon icon-button-spinner')} />
                </button>
                <div onClick={handleNavigateToCart} className={cx('step-footer-previous-link')}>
                  Giỏ hàng
                </div>
              </div>
            </div>
            <div className={cx('hrv-coupons-popup')}>
              <div className={cx('hrv-title-coupons-popup')}>
                <p>
                  Chọn giảm giá <span className={cx('count-coupons')} />
                </p>
                <div className={cx('hrv-coupons-close-popup')}>
                  <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.1663 2.4785L15.5213 0.833496L8.99968 7.35516L2.47801 0.833496L0.833008 2.4785L7.35468 9.00016L0.833008 15.5218L2.47801 17.1668L8.99968 10.6452L15.5213 17.1668L17.1663 15.5218L10.6447 9.00016L17.1663 2.4785Z"
                      fill="#424242"
                    />
                  </svg>
                </div>
              </div>
              <div className={cx('hrv-content-coupons-code')}>
                <h3 className={cx('coupon_heading')}>Mã giảm giá của shop</h3>
                <div className={cx('hrv-discount-code-web')}></div>
                <div className={cx('hrv-discount-code-external')}></div>
              </div>
            </div>
            <div className={cx('hrv-coupons-popup-site-overlay')} />
          </div>
        </div>
      </div>
      {createPortal(<div className={cx('overlay', { 'over-lay': modalAddress })}></div>, popupEl)}

      {/* add address  */}
      {modalAddress &&
        createPortal(
          <div className={cx('section-content', 'popup')}>
            <div className={cx('popup-wrapper')}>
              <div className={cx('popup-title')}>
                {visibleListAddress
                  ? 'Địa chỉ của tôi'
                  : updateAddress
                  ? 'Cập nhập địa chỉ'
                  : addAddress && 'Thêm mới địa chỉ'}
              </div>
              {/* List address */}
              {visibleListAddress && (
                <div className={cx('list-address')}>
                  {listAddress &&
                    listAddress.map((item) => (
                      <div className={cx('address-item')} key={item?._id}>
                        <div className={cx('checkbox-wrapper')}>
                          <input
                            className={cx('radio-address')}
                            type="radio"
                            value={item?._id}
                            name="address"
                            onChange={() => handleChangeAddress(item)}
                            checked={item?._id === addressCheckout?._id}
                          />
                        </div>
                        <div className={cx('address-box')}>
                          <div className={cx('address-info')}>
                            <div className={cx('address-name-phone')}>
                              <p className={cx('name')}>{item?.name}</p>
                              <div className={cx('horizontal')}></div>
                              <p className={cx('phone')}>{item?.phone}</p>
                            </div>
                            <div className={cx('update-address')}>
                              <button className={cx('update-btn')} onClick={() => handleUpdateAddress(item)}>
                                Cập nhập
                              </button>
                            </div>
                          </div>
                          <div className={cx('address-detail')}>{item?.address}</div>
                        </div>
                      </div>
                    ))}
                  <div className={cx('create-address')}>
                    <button className={cx('btn-create-address')} onClick={handleAddAddress}>
                      + Thêm địa chỉ mới
                    </button>
                  </div>
                </div>
              )}
              {(updateAddress || addAddress) && (
                <div className={cx('sheet-wrapper')}>
                  <form className={cx('step')} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className={cx('fieldset')}>
                      <div className={cx('field', 'field-show-floating-label')}></div>
                      <div className={cx('field', { 'field-error': errors.name })}>
                        <div className={cx('field-input-wrapper')}>
                          <label className={cx('field-label')} htmlFor="billing_address_full_name">
                            Họ và tên
                          </label>
                          <input
                            placeholder="Họ và tên"
                            autoCapitalize="off"
                            {...register('name', {
                              required: {
                                value: true,
                                message: 'Không được bỏ trống tên'
                              }
                            })}
                            className={cx('field-input')}
                            id="billing_address_full_name"
                            autoComplete="false"
                          />
                        </div>
                        <p className={cx('field-message', 'field-message-error')}>
                          {errors.name && errors.name.message}
                        </p>
                      </div>
                      <div className={cx('field', 'field-required', { 'field-error': errors.phone })}>
                        <div className={cx('field-input-wrapper')}>
                          <label className={cx('field-label')} htmlFor="billing_address_phone">
                            Điện thoại
                          </label>
                          <input
                            form="form-information"
                            placeholder="Điện thoại"
                            className={cx('field-input')}
                            id="billing_address_phone"
                            {...register('phone', {
                              required: {
                                value: true,
                                message: 'Không được bỏ trống số điện thoại'
                              },
                              pattern: {
                                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                                message: 'Vui lòng nhập đúng định dạng số điện thoại'
                              }
                            })}
                          />
                        </div>
                        <p className={cx('field-message', 'field-message-error')}>
                          {errors.phone && errors.phone.message}
                        </p>
                      </div>
                    </div>
                    <div className={cx('fieldset')}>
                      <div
                        autoComplete="off"
                        id="form_update_shipping_method"
                        className={cx('field default')}
                        acceptCharset="UTF-8"
                        method="post"
                      >
                        <input name="utf8" type="hidden" defaultValue="✓" />
                        <div className={cx('content-box mt0')}>
                          <div
                            id="form_update_location_customer_shipping"
                            className={cx(
                              'order-checkout__loading',
                              'radio-wrapper',
                              'content-box-row',
                              'content-box-row-padding',
                              'content-box-row-secondary'
                            )}
                            htmlFor="customer_pick_at_location_false"
                          >
                            <input name="utf8" type="hidden" defaultValue="✓" />
                            <div className={cx('order-checkout__loading--box')}>
                              <div className={cx('order-checkout__loading--circle')} />
                            </div>
                            <div
                              className={cx('field', 'field-show-floating-label', 'field-half', {
                                'field-error': errors.province
                              })}
                            >
                              <div className={cx('field-input-wrapper', 'field-input-wrapper-select')}>
                                <label className={cx('field-label')} htmlFor="customer_shipping_province">
                                  Tỉnh
                                </label>
                                <select
                                  defaultValue="null"
                                  className={cx('field-input')}
                                  id="customer_shipping_province"
                                  {...register('province', {
                                    required: {
                                      value: true,
                                      message: 'Vui lòng chọn tỉnh thành'
                                    },
                                    onChange: (e) => handleChangeProvince(e)
                                  })}
                                >
                                  <option value="">Chọn tỉnh thành</option>
                                  {provinces?.map(({ ProvinceID, ProvinceName }) => (
                                    <option key={ProvinceID} value={ProvinceID}>
                                      {ProvinceName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <p className={cx('field-message', 'field-message-error')}>
                                {errors.province && errors.province?.message}
                              </p>
                            </div>
                            <div
                              className={cx('field', 'field-show-floating-label', 'field-half', {
                                'field-error': errors.district
                              })}
                            >
                              <div className={cx('field-input-wrapper', 'field-input-wrapper-select')}>
                                <label className={cx('field-label')} htmlFor="customer_shipping_district">
                                  Quận/Huyện
                                </label>
                                <select
                                  defaultValue="a"
                                  className={cx('field-input')}
                                  id="customer_shipping_district"
                                  {...register('district', {
                                    required: {
                                      value: true,
                                      message: 'Vui lòng chọn quận huyện'
                                    },
                                    onChange: (e) => handleChangeDistrict(e)
                                  })}
                                >
                                  <option value="">Chọn Quận/Huyện</option>
                                  {districts?.map(({ DistrictID, DistrictName }) => (
                                    <option key={DistrictID} value={DistrictID}>
                                      {DistrictName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <p className={cx('field-message', 'field-message-error')}>
                                {errors.district && errors.district?.message}
                              </p>
                            </div>
                            <div
                              className={cx('field', 'field-show-floating-label', 'field-half', {
                                'field-error': errors.district
                              })}
                            >
                              <div className={cx('field-input-wrapper', 'field-input-wrapper-select')}>
                                <label className={cx('field-label')} htmlFor="customer_shipping_district">
                                  Phường/Xã
                                </label>
                                <select
                                  defaultValue="a"
                                  className={cx('field-input')}
                                  id="customer_shipping_district"
                                  {...register('ward', {
                                    required: {
                                      value: true,
                                      message: 'Vui lòng chọn phường/xã'
                                    }
                                  })}
                                >
                                  <option value="">Chọn Phường/Xã</option>
                                  {wards?.map(({ WardCode, WardName }) => (
                                    <option key={WardCode} value={WardCode}>
                                      {WardName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <p className={cx('field-message', 'field-message-error')}>
                                {errors.ward && errors.ward?.message}
                              </p>
                            </div>
                            <div className={cx('field', { 'field-error': errors.name })}>
                              <div className={cx('field-input-wrapper')}>
                                <label className={cx('field-label')} htmlFor="billing_address_address1">
                                  Địa chỉ
                                </label>
                                <input
                                  placeholder="Địa chỉ đầy đủ"
                                  autoCapitalize="off"
                                  spellCheck="false"
                                  className={cx('field-input')}
                                  {...register('apartment_number', {
                                    required: {
                                      value: true,
                                      message: 'Vui lòng nhập địa chỉ đầy đủ'
                                    }
                                  })}
                                  size={30}
                                  type="text"
                                />
                              </div>
                              <p className={cx('field-message', 'field-message-error')}>
                                {errors.apartment_number && errors.apartment_number?.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              <div className={cx('btn-address-wrapper')}>
                {visibleListAddress && (
                  <div className={cx(cx('btn-box'))}>
                    <button className={cx('btn-back')} onClick={handleCloseModal}>
                      Hủy
                    </button>
                    <button type="submit" className={cx('btn-address-success', 'btn')} onClick={handleConformAddress}>
                      <span className={cx('btn-content')}>Xác nhận</span>
                      <i className={cx('btn-spinner icon icon-button-spinner')} />
                    </button>
                  </div>
                )}
                {(updateAddress || addAddress) && (
                  <div className={cx(cx('btn-box'))}>
                    <button className={cx('btn-back')} onClick={handleBackList}>
                      Trở lại
                    </button>
                    <button type="submit" className={cx('btn-address-success', 'btn')} onClick={handleSubmit(onSubmit)}>
                      <span className={cx('btn-content')}>Hoàn thành</span>
                      <i className={cx('btn-spinner icon icon-button-spinner')} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>,
          popupEl
        )}
    </>
  );
};

export default Checkout;
