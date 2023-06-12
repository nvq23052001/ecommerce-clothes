import React, {useRef, useEffect, useState } from 'react';
import background from '~/assets/images/background-contact.jpg';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchIcon } from '~/assets/icons';
import { RemoveRedEye } from '@material-ui/icons';
import { CartIcon } from 'assets/icons';
import ModalProduct from './ModalDetailProduct';
import apis , { useApis } from 'services/api';
import { apiUrls } from 'config/apis';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import routes from 'config/routes';
import useAuth from 'store/auth/hook';
//styles
import styles from './Search.module.css';
import classNames from 'classnames/bind';
import currency from 'utils/currency';
const cx = classNames.bind(styles);

function workKeys(key) {
  return `${key}`;
}

const Search = () => {
  const param = useLocation();
  const [openPopup, setOpenPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [productSelected, setProductsSelected] = useState([]);
  const { apiGet } = useApis();
  const { isAuth } = useAuth();
  const [isDisable, setIsDisable] = useState(false);
  const socketRef = useRef();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleSubmit, register } = useForm();
  const clickShowProductDetail = (item) => {
    setProductsSelected(item);
    setOpenPopup(true);
  };
  const onSubmit = (data) => {
    const { keyword } = data;
    navigate(routes.search + '?keyword=' + keyword);
  };
  const handlePopupCreate = (result) => {
    setOpenPopup(false);
  };

  const getProducts = (keyword) => {
    apiGet(apiUrls.searchProducts(keyword), '', (data) => {
      setProducts(data.data.items);
    });
  };

  function key(keyword) {
    apiGet(apiUrls.searchProducts(keyword), '', () => {
      return keyword;
    });
    return keyword;
  }

  useEffect(() => {
    getProducts(searchParams.get('keyword'));
    key(searchParams.get('keyword'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('keyword')]);


  const handleAddToCart = (action = 'cart', id) => {
    if (isAuth) {
      const data = {
        product: products.find(item => item._id === id),
        quantity : 1
      };
      setIsDisable(true);
      apis
        .post(apiUrls.userCart(), data, ({ status, errors }) => {
          console.log(status);
          if (status) {
            toast.success('Thêm vào giỏ hàng thành công')
            action === 'order' && navigate(routes.cart);
            socketRef.current.emit('refresh_cart', 'change_quantity');
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
    <div className={cx('container')}>
      <ModalProduct open={openPopup} handlePopup={handlePopupCreate} product={productSelected}></ModalProduct>
      <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
      <div className={cx('background-content')}>
        <h2 className={cx('title-content')}>TÌM KIẾM</h2>
        <div className={cx('text-content')}>
          <Link to="">Trang chủ</Link>
          <div>/</div>
          <p>Tìm kiếm</p>
        </div>
      </div>

      <div className={cx('main')}>
        {products.length ? (
          <div className={cx('title')}>
            <h2 className={cx('title-text')}>KẾT QUẢ TÌM KIẾM:</h2>
            <span className={cx('show-search')}>
              TẤT CẢ SẢN PHẨM / TỪ KHOÁ: {workKeys(key(decodeURIComponent(param.search.replace('?keyword=', ''))))}
            </span>
          </div>
        ) : (
          <div className={cx('title')}>
            <h2 className={cx('title-text')}>KHÔNG TÌM THẤY KẾT QUẢ TÌM KIẾM PHÙ HỢP CHO</h2>
            <span className={cx('show-search')}>
              TẤT CẢ SẢN PHẨM / TỪ KHOÁ: {workKeys(key(decodeURIComponent(param.search.replace('?keyword=', ''))))}
            </span>
          </div>
        )}

        <div className={cx('search')}>
          <div></div>
          <div className={cx('header__search')}>
            <form onSubmit={handleSubmit(onSubmit)} action="" className={cx('header__form')}>
              <select className={cx('header__search-select')}>
                <option value="">Tất cả</option>
              </select>
              <input
                type="text"
                {...register('keyword')}
                placeholder="Tìm kiếm ..."
                className={cx('header__search-input')}
              />
              <button type="submit" className={cx('header__search-btn')}>
                <SearchIcon width="2rem" height="2rem" />
              </button>
            </form>
          </div>
          <div></div>
        </div>

        <div className={cx('content-product')}>
          {products?.map((item, index) => (
            <div key={index} className={cx('box-product')}>
              <span className={cx('stock-product')}>{item.stock} %</span>
              <div className={cx('img-product')}>
                <Link to={`/product/${item._id}`}>
                  <img className={cx('box-img')} src={item.image} alt={item.name} />
                </Link>
              </div>
              <div className={cx('name-product')}>
                <Link to={`/product/${item._id}`}>{item.name}</Link>
              </div>
              {item.promotion_price ? (
                <div className={cx('box-price-product')}>
                  <div className={cx('price-stock')}>{currency(item.promotion_price)}</div>
                  <div className={cx('price-product')}>{currency(item.price)}</div>
                </div>
              ) : (
                <div className={cx('box-price-product')}>
                  <div className={cx('price-product-no-stock')}>{currency(item.price)}</div>
                </div>
              )}

              <div className={cx('action-product')}>
                <div>
                  <button className={cx('action-view')} onClick={() => clickShowProductDetail(item)}>
                    <RemoveRedEye />
                  </button>
                </div>
                <div>
                  <button onClick={() => handleAddToCart("order", item._id)} disabled={isDisable} className={cx('action-buy')}>MUA NGAY</button>
                </div>
                <div>
                  <button className={cx('action-cart')} onClick={() => handleAddToCart("cart", item._id)} >
                    <CartIcon width="50%" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
