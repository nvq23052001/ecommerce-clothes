import classNames from 'classnames/bind';
import ProductItem from 'components/common/ProductItem';
import { apiUrls } from 'config/apis';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApis } from 'services/api';
import { PlusIcon } from '~/assets/icons';
import styles from './Favorite_product.module.css';
const cx = classNames.bind(styles);
const Favorite_product = () => {
  const { apiGet } = useApis();
  const [favorite, setFavorite] = useState([]);
  const [listChecked, setListChecked] = useState([]);

  const getFavorite = () => {
    apiGet(apiUrls.userFavoriteProduct(), {}, ({ data }) => {
      setFavorite(
        data.items?.map((favorite) => ({
          id: favorite._id,
          _id: favorite.product._id,
          name: favorite.product.name,
          price: favorite.product.price,
          promotion_price: favorite.product.promotion_price,
          image: favorite.product.image
        }))
      );
      setListChecked(data?.items?.map((item) => item.product._id));
    });
  };

  useEffect(() => {
    getFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx('breadcrumb')}>
        <div className={cx('breadcrumb__overlay')}></div>
        <div className={cx('breadcrumb__content')}>
          <div className={cx('breadcrumb__wrapper')}>
            <div className={cx('breadcrumb__big')}>
              <h2 className={cx('breadcrumb__title')}>SẢN PHẨM YÊU THÍCH</h2>
            </div>
            <div className={cx('breadcrumb__small')}>
              <p className={cx('breadcrumb__direct')}>
                <Link to="/" className={cx('breadcrumb__back')}>
                  Trang chủ
                </Link>
                <span> / </span>
                <span className={cx('breadcrumb__desc')}>Sản phẩm yêu thích</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={cx('collection')}>
        <div className={cx('wrapper')}>
          <div className={cx('inner')}>
            <div className={cx('sidebar')}>
              <div className={cx('sidebar__wrapper')}>
                <div className={cx('sidebar__content')}>
                  <div className={cx('sort-by')}>
                    <h5 className={cx('sort-by-text')}>Tìm theo</h5>
                  </div>
                  <div className={cx('sidebar-sort')}>
                    <div className={cx('side-title')}>
                      <button className={cx('accordion')}>Khoảng giá</button>
                      <PlusIcon />
                    </div>
                    <div className={cx('panel')}>
                      <ul className={cx('filter-price')}>
                        <li className={cx('filter-item')}>
                          <label htmlFor="" className={cx('filter-label')}>
                            <input
                              className={cx('filter-checkbox', 'checked')}
                              type="radio"
                              name="price-filter"
                              data-price="0:max"
                              value="((price:product>=0))"
                            />
                            <span className={cx('filter-span')}>Tất cả</span>
                          </label>
                        </li>
                        <li className={cx('filter-item')}>
                          <label htmlFor="" className={cx('filter-label')}>
                            <input
                              className={cx('filter-checkbox')}
                              type="radio"
                              name="price-filter"
                              data-price="0:1000000"
                              value="((price:product>=1000000))"
                            />
                            <span className={cx('filter-span')}>Nhỏ hơn 1,000,000₫</span>
                          </label>
                        </li>
                        <li className={cx('filter-item')}>
                          <label htmlFor="" className={cx('filter-label')}>
                            <input
                              className={cx('filter-checkbox')}
                              type="radio"
                              name="price-filter"
                              data-price="0:1000000"
                              value="((price:product>=1000000))"
                            />
                            <span className={cx('filter-span')}>Từ 1,000,000₫ - 2,500,000₫</span>
                          </label>
                        </li>
                        <li className={cx('filter-item')}>
                          <label htmlFor="" className={cx('filter-label')}>
                            <input
                              className={cx('filter-checkbox')}
                              type="radio"
                              name="price-filter"
                              data-price="0:1000000"
                              value="((price:product>=1000000))"
                            />
                            <span className={cx('filter-span')}>Từ 2,500,000₫ - 4,000,000₫</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('product')}>
              <h1 className={cx('product__title')}>SẢN PHẨM YÊU THÍCH</h1>
              <hr />
              <div className={cx('product__content')}>
                {favorite?.map((item) => (
                  <ProductItem
                    callback={getFavorite}
                    product={item}
                    key={item.id}
                    isFavorite={listChecked.includes(item._id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Favorite_product;
