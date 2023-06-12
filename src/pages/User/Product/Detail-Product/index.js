import { Rating } from '@mui/material';
import classNames from 'classnames/bind';
import ProductItem from 'components/common/ProductItem';
import { apiUrls } from 'config/apis';
import routes from 'config/routes';
import { BACK_TO_PREVIOUS_PAGE } from 'constants/storage';
import PageNotFound from 'pages/NotFound';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import apis, { useApis } from 'services/api';
import { connect } from 'socket.io-client';
import useAuth from 'store/auth/hook';
import timestamp from 'utils/timestamp';
import background from '~/assets/images/background-contact.jpg';
import iconCertificate from '~/assets/images/certificate.jpg';
import iconHotline from '~/assets/images/hotline.jpg';
import iconRequest from '~/assets/images/request.jpg';
import iconShip from '~/assets/images/shipping.jpg';
import currency from '~/utils/currency';
import style from './Detail.module.css';
const cx = classNames.bind(style);

const DetailProduct = () => {
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState(true);
  const { apiGet, apiPost } = useApis();
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [comment, setComment] = useState([]);
  const [average, setAverage] = useState(0);
  const { id } = useParams();
  const { isAuth } = useAuth();
  const location = useLocation();
  const [isDisable, setIsDisable] = useState(false);
  const [error, setError] = useState('');
  const socketRef = useRef();
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const getComment = () => {
    apiGet(apiUrls.commentOfId(id), {}, ({ data }) => {
      setComment(data.items);
      const sum = data.items.reduce((a, b) => a + b.rating || 0, 0);
      setAverage(sum / data.items.length || 0);
    });
  };

  const SendComment = async (data) => {
    if (isAuth) {
      await apiPost(
        apiUrls.comment(),
        {
          ...data,
          product: id
        },
        (data) => {
          if (data) {
            toast.success('Bình luận thành công');
            reset();
            getComment();
            window.scrollTo(0, 5500);
          } else {
            toast.error('Không đánh giá được');
          }
        }
      );
    } else {
      localStorage.setItem(BACK_TO_PREVIOUS_PAGE, location.pathname);
      toast.warning('Vui lòng đăng nhập để đánh giá sản phẩm');
      setTimeout(() => {
        navigate(routes.login);
      });
    }
  };

  useEffect(() => {
    getComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeQuantity = (type) => {
    const newQuantity = type === 'increase' ? quantity + 1 : quantity - 1;
    if (type === 'decrease') {
      setError('');
    }
    if (newQuantity === 0) {
    } else {
      setQuantity(newQuantity);
      if (newQuantity > product.stock) {
        setError('Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này');
        setQuantity(product.stock);
        return;
      }
    }
  };

  useEffect(() => {
    apis.get(apiUrls.detailProduct(params?.id), {}, ({ data: { items }, status }) => {
      if (status) {
        setProduct(items);
      }
    });
  }, [params?.id]);

  useEffect(() => {
    apis.get(apiUrls.getProductsByCategory(params?.id), {}, ({ data: { items }, status }) => {
      setRelatedProducts(items.related_products);
      setIsPublic(!!items?.category?.status);
    });
  }, [params?.id]);

  useEffect(() => {
    if (isAuth) {
      socketRef.current = connect(process.env.REACT_APP_API_URL);
      return () => socketRef.current.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuth) {
      apis.get(apiUrls.userFavoriteProduct(), {}, ({ data: { items }, status }) => {
        if (status) {
          setFavorites(items?.map((item) => item.product._id));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            action === 'order' && navigate(routes.cart);
            socketRef.current.emit('refresh_cart', 'change_quantity');
            toast.success('Thêm vào giỏ hàng thành công');
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
    if (evt.target.value <= product.stock) {
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

  return isPublic ? (
    <div className={cx('content')}>
      <div className={cx('banner-img')}>
        <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
        <div className={cx('background-content')}>
          <h2 className={cx('title-content')}>{product.name}</h2>
          <div className={cx('text-content')}>
            <div className={cx('text-content-first')}>
              <Link to={routes.home}>
                <p>Trang chủ /</p>
              </Link>
              <p>Tất cả sản phẩm /</p>
            </div>
            <div>
              <p>{product.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('content-bottom')}>
        <div className={cx('bottom-first')}>
          <div className={cx('bottom-img')}>
            <img className={cx('img-detail')} src={product.image} alt="" />
          </div>
          <div className={cx('short-description')}>
            <h1 className={cx('title-short-description')}>{product.name}</h1>
            <div className={cx('trademark')}>
              Thương hiệu: Hakken <span className={cx('type')}>Loại: Khác</span>
            </div>
            <span className={cx('price')}>{currency(product.promotion_price ?? product.price)}</span>
            <div className={cx('quantity')}>
              <div className={cx('text-quantity')}>Số lượng</div>
              <div className={cx('click-quantity')}>
                <div>
                  <button
                    onClick={() => handleChangeQuantity('decrease')}
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
                    value={quantity}
                  />
                </div>
                <div>
                  <button
                    onClick={() => handleChangeQuantity('increase')}
                    data-action="increment"
                    className={cx('button-quantity-right')}
                  >
                    +
                  </button>
                </div>
                <span className={cx('stock')}>{product.stock} sản phẩm có sẵn</span>
                {error && <span className={cx('message-error')}>{error}</span>}
              </div>
            </div>
            <button
              className={cx('order')}
              style={error ? { margin: '33px 0 15px 0' } : {}}
              onClick={() => handleAddToCart('order')}
              disabled={isDisable}
            >
              ĐẶT HÀNG
            </button>
            <button className={cx('addToCart')} onClick={handleAddToCart} disabled={isDisable}>
              THÊM VÀO GIỎ HÀNG
            </button>
          </div>
          <div className={cx('services')}>
            <div className={cx('title-services')}>SẢN PHẨM NÀY SẼ TỚI TAY BẠN CHỈ TRONG 3-5 NGÀY LÀM VIỆC</div>
            <div className={cx('content-services')}>
              <div>
                <img className={cx('icon-service')} src={iconShip} alt="" />
              </div>
              <div>
                <div className={cx('title-sub-services')}>MIỄN PHÍ GIAO HÀNG</div>
                <div className={cx('text-services')}>Nhận hàng trong vòng 3 ngày</div>
              </div>
            </div>

            <div className={cx('content-services')}>
              <div>
                <img className={cx('icon-service')} src={iconCertificate} alt="" />
              </div>
              <div>
                <div className={cx('title-sub-services')}>CHẤT LƯỢNG ĐẢM BẢO</div>
                <div className={cx('text-services')}>Đổi Trả Trong vòng 14 ngày nếu không ưng ý</div>
              </div>
            </div>
            <div className={cx('content-services')}>
              <div>
                <img className={cx('icon-service')} src={iconRequest} alt="" />
              </div>
              <div>
                <div className={cx('title-sub-services')}>THIẾT KẾ VÀ MAY THEO YÊU CẦU</div>
                <div className={cx('text-services')}>Nhanh chóng trong vòng 24h</div>
              </div>
            </div>
            <div className={cx('content-services')}>
              <div>
                <img className={cx('icon-service')} src={iconHotline} alt="" />
              </div>
              <div>
                <div className={cx('title-sub-services')}>HOTLINE HỖ TRỢ</div>
                <div className={cx('text-services')}>
                  Gọi ngay <span>19009057</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('bottom-second')}>{product.description}</div>
        <div className={cx('rating-products')}>
          <div className={cx('rating')}>
            <div className={cx('total')}>
              <h1>{average}</h1>
              <span>
                <Rating name="size-large" size="large" value={average} />
              </span>
            </div>
            <div className={cx('total-detail')}>
              <div>
                <span>
                  <Rating name="size-large" size="large" value={average} />
                </span>
                <span> {comment.length || 0} đánh giá</span>
              </div>
            </div>
          </div>
          <div className={cx('rating-detail')}>
            <div className={cx('rating-detail-one')}>
              <p>
                Có <strong>{comment.length}</strong> đánh giá trên sản phẩm
                <strong> {product.name}</strong>
              </p>
            </div>
            {comment ? (
              comment.map((item, index) => {
                return (
                  <div key={item._id} className={cx('rating-items')}>
                    <div className={cx('rating-items-product')}>
                      <span>
                        <Rating name="size-large" size="large" value={item.rating} />
                      </span>
                      <span>
                        <strong>{item.user?.name}</strong>
                      </span>
                    </div>
                    <p>{item.content}</p>
                    <span>{timestamp(item.createdAt)}</span>
                  </div>
                );
              })
            ) : (
              <div>Không có đánh giá sản phẩm</div>
            )}
          </div>
        </div>
        <div className={cx('bottom-third')}>
          <h3 className={cx('bottom-third-title')}>ĐÁNH GIÁ</h3>
          <form onSubmit={handleSubmit(SendComment)}>
            <Controller
              {...register('rating', { required: true })}
              control={control}
              defaultValue={0}
              render={({ field: { onChange, value } }) => (
                <Rating
                  name="size-large"
                  size="large"
                  value={value}
                  onChange={(_, newValue) => {
                    onChange(newValue);
                  }}
                />
              )}
            />
            <p className={cx('text-valid-red')}>
              {errors.rating?.type === 'required' && 'Bạn vui lòng gửi đánh giá nhé !'}
            </p>
            <div className={cx('bottom-third-flex-input')}></div>
            <div className={cx('bottom-third-flex-input')}>
              <input
                className={cx('bottom-third-input')}
                type="text"
                name=""
                id=""
                placeholder="Tên của bạn (>3 ký tự và <20 ký tự)"
              />
              <input className={cx('bottom-third-input')} type="text" name="" id="" placeholder="xinchao@gmail.com" />
            </div>
            <textarea
              {...register('content', { required: true, minLength: 4, maxLength: 1000 })}
              className={cx('bottom-third-textarea')}
              placeholder="Viết nội dung đánh giá ở đây (>3 ký tự và < 1000 ký tự)"
              name="content"
              id=""
              rows="7"
            ></textarea>
            <p className={cx('text-valid-red')}>
              {errors.content?.type === 'required' && 'Bạn vui lòng ghi nội dung feedback nhé !'}
            </p>
            <p className={cx('text-valid-red')}>
              {errors.content?.type === 'minLength' && 'Bạn vui lòng nhập nội dung dài hơn nhé !'}
            </p>
            <p className={cx('text-valid-red')}>
              {errors.content?.type === 'maxLength' && 'Bạn vui lòng nhập ít nội dung hơn !'}
            </p>
            <div className={cx('bottom-third-box-submit')}>
              <button type="submit" className={cx('bottom-third-submit')}>
                Gửi đánh giá
              </button>
            </div>
          </form>
        </div>
        <div className={cx('related-products')}>
          <div className={cx('related-products-box-title')}>
            <h2 className={cx('related-products-title')}>SẢN PHẨM LIÊN QUAN</h2>
            <div className={cx('line-bottom')}></div>
          </div>
          <div className={cx('related-products-slide')}>
            {relatedProducts.slice(0, 4).map((item) => (
              <ProductItem product={item} key={item._id} isFavorite={favorites.includes(item._id)} />
            ))}
          </div>
        </div>
        <div className={cx('viewed-products')}>
          <div className={cx('related-products-box-title')}>
            <h2 className={cx('related-products-title')}>SẢN PHẨM ĐÃ XEM</h2>
            <div className={cx('line-bottom')}></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <PageNotFound />
  );
};

export default DetailProduct;
