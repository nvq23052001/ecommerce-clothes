import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { apiUrls } from 'config/apis';
import apis from 'services/api';
import classes from './Home.module.css';

import { Link } from 'react-router-dom';

import BannerSlider from 'components/feature/Banner';
import ProductItem from '~/components/common/ProductItem';

const cx = classNames.bind(classes);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apis.get(apiUrls.getTopSellingProduct(), {}, ({ data: { items } }) => {
      setProducts(
        items.topSelling.map((product) => ({
          ...product,
          _id: product.productId
        }))
      );
    });
    apis.get(apiUrls.adminCategories(), {}, ({ data: { items } }) => {
      setCategories(items.slice(1, 5));
    });
  }, []);

  return (
    <div className={cx('home-wrapper')}>
      <div>
        <BannerSlider />
      </div>
      <section className={cx('collection')}>
        <div className={cx('collection__wrapper')}>
          <Link to="" className={cx('collection__link')}>
            <img
              src="https://theme.hstatic.net/200000366789/1000977522/14/banner_img_1.png?v=151"
              alt=""
              className={cx('collection__image')}
            />
          </Link>
          <Link to="" className={cx('collection__link')}>
            <img
              src="https://theme.hstatic.net/200000366789/1000977522/14/banner_img_2.png?v=151"
              alt=""
              className={cx('collection__image')}
            />
          </Link>
          <Link to="" className={cx('collection__link')}>
            <img
              src="https://theme.hstatic.net/200000366789/1000977522/14/banner_img_4.png?v=151"
              alt=""
              className={cx('collection__image')}
            />
          </Link>
          <Link to="" className={cx('collection__link')}>
            <img
              src="https://theme.hstatic.net/200000366789/1000977522/14/banner_img_3.png?v=151"
              alt=""
              className={cx('collection__image')}
            />
          </Link>
        </div>
      </section>
      <section className={cx('container')}>
        <div className={cx('container__header')}>
          <h2 className={cx('container__header-title')}>Sản phẩm bán chạy</h2>
          <div className={cx('line')}></div>
          <Link to="/" className={cx('container__banner', 'active')}>
            Sản phẩm bán chạy
          </Link>
        </div>
        <div className={cx('container__wrapper')}>
          {products.map((item) => (
            <ProductItem product={item} key={item.productId} />
          ))}
        </div>
        <div className={cx('container__footer')}>
          <Link to="/" className={cx('container__banner', 'active')}>
            Xem tất cả sản phẩm
          </Link>
        </div>
      </section>
      <section className={cx('gallery')}>
        <div className={cx('container__header')}>
          <h2 className={cx('container__header-title')}>Bộ sưu tập</h2>
          <div className={cx('line')}></div>
        </div>
        <div className={cx('gallery__wrapper')}>
          {categories?.map((category) => (
            <Link to={'/category/' + category._id} className={cx('gallery__link')} key={category._id}>
              <img src={category.image} alt={category.name} className={cx('gallery__img')} />
              <div className={cx('gallery__desc')}>
                <p className={cx('gallery__title')}>{category.name}</p>
                <p className={cx('gallery__product-total')}>{category.products_count} sản phẩm</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
