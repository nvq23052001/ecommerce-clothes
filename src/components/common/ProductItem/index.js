/* eslint-disable no-unused-vars */
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import currency from '~/utils/currency';
import classes from './ProductItem.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { useApis } from 'services/api';
import { apiUrls } from 'config/apis';
import useAuth from 'store/auth/hook';
import routes from 'config/routes';
import { toast } from 'react-toastify';
import { BACK_TO_PREVIOUS_PAGE } from 'constants/storage';

const cx = classNames.bind(classes);
const ProductItem = ({ product, isFavorite, callback }) => {
  const percent = product.promotion_price
    ? Math.floor(((product.price - product.promotion_price) / product.price) * 100)
    : null;
  const [ratingIcon, setRatingIcon] = useState(isFavorite);
  const { apiPost } = useApis();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const change = () => {
    if (isAuth) {
      apiPost(apiUrls.userFavoriteProduct(), { product: product._id }, ({ data }) => {
        if (data) {
          setRatingIcon(!ratingIcon);
          callback && callback();
        }
      });
    } else {
      navigate(routes.login);
      localStorage.setItem(BACK_TO_PREVIOUS_PAGE, location.pathname);
      toast.warning('Vui lòng đăng nhập để thực hiện chức năng này');
    }
  };

  return (
    <div className={cx('product__wrapper')}>
      <div className={cx('product__image')}>
        {percent && (
          <div className={cx('sale')}>
            <p className={cx('sale-percent')}>{percent}%</p>
          </div>
        )}
        <div className={cx('icon')} onClick={change}>
          {!ratingIcon ? (
            <FavoriteBorderIcon className={cx('icon-favo')} />
          ) : (
            <FavoriteIcon className={cx('icon-favo')} />
          )}
        </div>
        <Link to={`/product/${product._id}`} className={cx('product__link')}>
          <img src={product.image} alt="" className={cx('product__img')} />
        </Link>
      </div>
      <h3 className={cx('product__name')}>
        <Link to={`/product/${product._id}`} className={cx('product__name-link')}>
          {product.name}
        </Link>
      </h3>
      <div className={cx('price')}>
        {product?.promotion_price ? (
          <>
            <p className={cx('price__promotion')}>{currency(product.promotion_price)}</p>
            <p className={cx('price__main')}>{currency(product.price)}</p>
          </>
        ) : (
          <p className={cx('price__promotion')}>{currency(product.price)}</p>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
