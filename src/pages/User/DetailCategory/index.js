import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PlusIcon } from '~/assets/icons';
import styles from './DetailCategory.module.css';
import ProductItem from '~/components/common/ProductItem';
import { apiUrls } from 'config/apis';
import PageNotFound from 'pages/NotFound';
import apis from 'services/api';
import useAuth from 'store/auth/hook';
import routes from 'config/routes';

const cx = classNames.bind(styles);

const Checkbox = (props) => {
  return (
    <div className={cx('margin-two-col')}>
      <input
        style={props.style}
        className={props.className}
        type="checkbox"
        checked={props.isChecked}
        onChange={props.onChange}
      />
      <span className={cx('filter-span')}>{props.label}</span>
    </div>
  );
};

const RenderProductsWithFilter = (props) => {
  const [responseProduct, setResponseProduct] = useState([]);
  const { id } = useParams();
  const { isAuth } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    apis.get(apiUrls.getDetailCategory(id), {}, ({ data: { items } }) => {
      setResponseProduct(items);
    });
  }, [id]);

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

  return (
    <div>
      {props.checkedId === 1 ? (
        <div className={cx('product__content')}>
          {responseProduct.products?.map((item) => (
            <ProductItem isFavorite={favorites.includes(item._id)} isChecked product={item} key={item._id} />
          ))}
        </div>
      ) : (
        <div className={cx('product__content')}></div>
      )}
      {props.checkedId === 2 ? (
        <div className={cx('product__content')}>
          {responseProduct.products
            ?.filter((products) => products.price < 1000000)
            .map((item) => (
              <ProductItem isFavorite={favorites.includes(item._id)} product={item} key={item._id} />
            ))}
        </div>
      ) : (
        <div className={cx('product__content')}></div>
      )}
      {props.checkedId === 3 ? (
        <div className={cx('product__content')}>
          {responseProduct.products
            ?.filter((products) => products.price >= 1000000 && products.price < 2500000)
            .map((item) => (
              <ProductItem isFavorite={favorites.includes(item._id)} product={item} key={item._id} />
            ))}
        </div>
      ) : (
        <div className={cx('product__content')}></div>
      )}
      {props.checkedId === 4 ? (
        <div className={cx('product__content')}>
          {responseProduct.products
            ?.filter((products) => products.price >= 2500000 && products.price <= 4000000)
            .map((item) => (
              <ProductItem isFavorite={favorites.includes(item._id)} product={item} key={item._id} />
            ))}
        </div>
      ) : (
        <div className={cx('product__content')}></div>
      )}
    </div>
  );
};

const DetailCategory = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: 'Tất cả', isChecked: true },
    { id: 2, label: 'Nhỏ hơn 1,000,000₫', isChecked: false },
    { id: 3, label: 'Từ 1,000,000₫ - 2,500,000₫', isChecked: false },
    { id: 4, label: 'Từ 2,500,000₫ - 4,000,000₫', isChecked: false }
  ]);

  const handleCheckboxChange = (id) => {
    const newCheckboxes = [...checkboxes];
    const index = newCheckboxes.findIndex((checkbox) => checkbox.id === id);
    newCheckboxes[index].isChecked = !newCheckboxes[index].isChecked;
    setCheckboxes(
      newCheckboxes.map((checkbox) => {
        if (checkbox.id !== id) {
          checkbox.isChecked = false;
        }
        return checkbox;
      })
    );
  };

  const checkedId = checkboxes.find((checkbox) => checkbox.isChecked)?.id;
  const [response, setResponse] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    apis.get(apiUrls.getDetailCategory(id), {}, ({ data: { items }, status }) => {
      if (status) {
        setResponse(items);
        setIsPublic(!!items.status);
      } else {
        setIsPublic(false);
      }
    });
  }, [id]);

  return isPublic ? (
    <div>
      <section className={cx('breadcrumb')}>
        <div className={cx('breadcrumb__overlay')}></div>
        <div className={cx('breadcrumb__content')}>
          <div className={cx('breadcrumb__wrapper')}>
            <div className={cx('breadcrumb__big')}>
              <h2 className={cx('breadcrumb__title')}>{response.name}</h2>
            </div>
            <div className={cx('breadcrumb__small')}>
              <p className={cx('breadcrumb__direct')}>
                <Link to={routes.home} className={cx('breadcrumb__back')}>
                  Trang chủ
                </Link>
                <span> / </span>
                <span className={cx('breadcrumb__desc')}>{response.name}</span>
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
                    <label name="price" id="price">
                      <div className={cx('side-title', 'side-title-price')}>
                        <p className={cx('accordion')}>Khoảng giá</p>
                        <PlusIcon />
                      </div>
                      <input type="checkbox" htmlFor="price" className={cx('show-sub-price')} />

                      <div className={cx('panel')}>
                        <div className={cx('filter-price')}>
                          {checkboxes.map((checkbox) => (
                            <Checkbox
                              className={
                                (checkboxes.isChecked = checkbox.isChecked
                                  ? cx('filter-checkbox', 'checked')
                                  : cx('filter-checkbox'))
                              }
                              key={checkbox.id}
                              label={checkbox.label}
                              isChecked={checkbox.isChecked}
                              onChange={() => handleCheckboxChange(checkbox.id)}
                            />
                          ))}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('product')}>
              <h1 className={cx('product__title')}>{response.name}</h1>
              <hr />
              <RenderProductsWithFilter checkedId={checkedId} />
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <PageNotFound />
  );
};

export default DetailCategory;
