import { Link } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import { useApis } from 'services/api';
import { apiUrls } from 'config/apis';
import currency from 'utils/currency';
import Swal from 'sweetalert2';
import debounce from 'lodash.debounce';

// styles
import styles from './Cart.module.css';
import classNames from 'classnames/bind';
import { connect } from 'socket.io-client';
const cx = classNames.bind(styles);

const CartItem = ({ cart: { product, quantity: _quantity, _id: cartId, total }, callback }) => {
  const { apiPut, apiDelete } = useApis();
  const { price, name, image, _id, stock } = product;
  const [quantity, setQuantity] = useState(_quantity);
  const [error, setError] = useState('');
  const socketRef = useRef();

  const handleRemoveItem = (cartId) => {
    Swal.fire({
      title: 'Bạn có muốn xoá sản phẩm này khỏi giỏ hàng ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      text: name,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, hãy xoá!',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        apiDelete(apiUrls.userCart(cartId), '', ({ status }) => {
          if (status) {
            callback();
            socketRef.current.emit('refresh_cart', 'change_quantity');
            setError('');
          }
        });
      }
    });
  };

  const handleChangeQuantity = (type, cartId) => {
    const newQuantity = type === 'increase' ? quantity + 1 : quantity - 1;
    if (type === 'decrease') {
      setError('');
    }
    if (newQuantity === 0) {
      handleRemoveItem(cartId);
    } else {
      setQuantity(newQuantity);
      if (newQuantity > stock) {
        setError('Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này');
        setQuantity(stock);
        return;
      }
      apiPut(apiUrls.userCart(cartId), { quantity: newQuantity, id: _id }, ({ status }) => {
        if (!status) {
          setQuantity(stock);
        } else {
          callback();
        }
      });
    }
  };

  const handleDebounceChangeInput = (value) => {
    apiPut(apiUrls.userCart(cartId), { quantity: !value ? 1 : value, id: _id }, ({ status }) => {
      if (!status) {
        setQuantity(stock);
      } else {
        callback();
      }
    });
  };

  const handleChange = (evt) => {
    const invalidChars = ['-', '+', 'e', 'E', ',', '.'];
    if (invalidChars.includes(evt.nativeEvent.data) || evt.target.value.startsWith(0)) {
      evt.preventDefault();
      return;
    }
    if (+evt.target.value > stock) {
      setQuantity(stock);
      debouncedHandleChangeInput(stock);
      return;
    }
    setQuantity(evt.target.value);
    debouncedHandleChangeInput(+evt.target.value);
  };

  const handleKeyPress = (evt) => {
    if ((evt.which !== 8 && evt.which !== 0 && evt.which < 48) || evt.which > 57) {
      evt.preventDefault();
    }
  };

  const handleBlur = (evt) => {
    if (evt.target.value === '' || +evt.target.value <= 0) {
      setQuantity(1);
    }
  };

  const debouncedHandleChangeInput = useRef(debounce(handleDebounceChangeInput, 2000)).current;

  useEffect(() => {
    socketRef.current = connect(process.env.REACT_APP_API_URL);
    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      debouncedHandleChangeInput.cancel();
    };
  }, [debouncedHandleChangeInput]);

  return (
    <tr className={cx('cart__row', 'table__section')}>
      <td data-label="Sản phẩm" style={{ width: '60px' }}>
        <Link to={'/product/' + _id} className={cx('cart__image')} style={{ width: '60px' }}>
          <img src={image} alt={name} />
        </Link>
      </td>
      <td>
        <Link to={'/product/' + _id} className={cx('h4')}>
          {name}
        </Link>
        <br />
        {/* <small>Đen / L / Nỉ Nhật</small>
        <p>Hakken</p> */}
        <span onClick={() => handleRemoveItem(cartId)} className={cx('cart__remove')}>
          <small>Xóa</small>
        </span>
      </td>
      <td data-label="Đơn giá" className={cx('text-center')}>
        <span className={cx('h3')}>{currency(price)}</span>
      </td>
      <td data-label="Số lượng">
        <div className={cx('js-qty')}>
          <button
            type="button"
            className={cx('js-qty__adjust', 'js-qty__adjust--minus', 'icon-fallback-text')}
            data-id
            onClick={() => handleChangeQuantity('decrease', cartId)}
          >
            <span className={cx('icon', 'icon-minus')} aria-hidden="true" />
            <span className="fallback-text" aria-hidden="true">
              −
            </span>
            <span className={cx('visually-hidden')}>Giảm số lượng sản phẩm đi 1</span>
          </button>
          <input
            type="number"
            className={cx('js-qty__num')}
            value={quantity}
            maxLength={stock.toString().length}
            max={stock}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
          />
          <button
            type="button"
            className={cx('js-qty__adjust', 'js-qty__adjust--plus', 'icon-fallback-text')}
            onClick={() => handleChangeQuantity('increase', cartId)}
          >
            <span className={cx('icon', 'icon-plus')} aria-hidden="true" />
            <span className={cx('fallback-text')} aria-hidden="true">
              +
            </span>
            <span className={cx('visually-hidden')}>Tăng số lượng sản phẩm lên 1</span>
          </button>
          {error && <span className={cx('message-error')}>{error}</span>}
        </div>
      </td>
      <td data-label="Tổng giá" className={cx('text-right')}>
        <span className="h3">{currency(total)}</span>
      </td>
    </tr>
  );
};

export default CartItem;
