import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from '@mui/material';
import classNames from 'classnames/bind';
import { apiUrls } from 'config/apis';
import routes from 'config/routes';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apis from 'services/api';
import useAuth from 'store/auth/hook';
import { formatQuantity } from '~/utils/common';
import currency from '~/utils/currency';
import styles from './Search.module.css';
const cx = classNames.bind(styles);

const ProductDetail = (props) => {
  const navigate = useNavigate();
  const { open, handlePopup, product } = props;
  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const socketRef = useRef();

  const { isAuth } = useAuth();

  const [isDisable, setIsDisable] = useState(false);

  const handleClickChangeQuantity = (isUp = true) => {
    const numValue = Number(quantity);

    const newQuantity = isUp ? numValue + 1 : Math.max(numValue - 1, 1);
    setQuantity(newQuantity);
  };

  const handleClose = () => {
    handlePopup(false);
  };

  const handleChange = (evt) => {
    const invalidChars = ['-', '+', 'e', 'E', ',', '.'];
    if (invalidChars.includes(evt.nativeEvent.data) || evt.target.value.startsWith(0)) {
      evt.preventDefault();
      return;
    }
    if (+evt.target.value > product.stock) {
      setQuantity(product.stock);
      return;
    }
    if (+evt.target.value <= product.stock) {
      setError('');
    }
    setQuantity(evt.target.value);
  };

  const handleKeyPress = (evt) => {
    if ((evt.which !== 8 && evt.which !== 0 && evt.which < 48) || evt.which > 57) {
      evt.preventDefault();
    }
  };

  const handleBlur = (evt) => {
    if (evt.target.value <= product.stock) {
      setError('');
    }
    if (evt.target.value === '' || +evt.target.value <= 0) {
      setQuantity(1);
    }
  };

  const handleAddToCart = (action = 'cart') => {
    if (isAuth) {
      const data = {
        product: product._id,
        quantity
      };
      setIsDisable(true);
      apis
        .post(apiUrls.userCart(), data, ({ status, errors }) => {
          if (status) {
            toast.success('Thêm vào giỏ hàng thành công');
            socketRef.current.emit('refresh_cart', 'change_quantity');
            action === 'order' && navigate(routes.cart);
          } else {
            if (errors && errors.code === 'quantity_exceeds_stock') {
              toast.error('Số lượng sản phẩm mua đã đạt giá trị tối đa có thể');
            }
          }
        })
        .finally(() => setIsDisable(false));
    } else {
      navigate(routes.login);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className={cx('main_productDetail')}>
          <CloseIcon className={cx('icon_close')} onClick={handleClose} />
          <div className={cx('product_detail')}>
            <div className={cx('bottom-first')}>
              <div className={cx('bottom-img')}>
                <div className={cx('img-detail')}>
                  <img src={product.image} alt="" id="ProductImg" />
                </div>
              </div>
              <div className={cx('short-description')}>
                <h1 className={cx('title-short-description')}>{product.name}</h1>
                <div>
                  Thương hiệu: Hakken <span className={cx('type')}>Loại: Khác</span>
                </div>
                <span className={cx('price')}>{currency(product.promotion_price ?? product.price)}</span>
                <div className={cx('content-des')}>
                  <div className={cx('title-des')}>Màu sắc</div>
                  <span className={cx('color-detail')}>Đen</span>
                </div>
                <div className={cx('quantity')}>
                  <div className={cx('text-quantity')}>Số lượng</div>
                  <div className={cx('click-quantity')}>
                    <div>
                      <button
                        onClick={() => handleClickChangeQuantity(false)}
                        data-action="decrement"
                        className={cx('button-quantity-left')}
                      >
                        -
                      </button>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="custom-input-number"
                        className={cx('custom-input-number')}
                        min="1"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyPress={handleKeyPress}
                        value={formatQuantity(quantity, true)}
                      />
                    </div>
                    <div>
                      <button
                        onClick={handleClickChangeQuantity}
                        data-action="increment"
                        className={cx('button-quantity-right')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button className={cx('addToCart')} onClick={handleAddToCart} disabled={isDisable}>
                  THÊM VÀO GIỎ HÀNG
                </button>
                <Link to={`/product/${product._id}`}>Hoặc Xem chi tiết</Link>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductDetail;
