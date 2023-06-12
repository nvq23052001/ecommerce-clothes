import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

import { HomeIcon, PhoneSolidIcon, MailIcon, SendIcon } from '~/assets/icons';
import routes from 'config/routes';

const cx = classNames.bind(styles);
const Footer = () => {
  return (
    <footer className={cx('footer')}>
      <div className={cx('wrapper')}>
        <div className={cx('overlay')}></div>
        <div className={cx('content')}>
          <div className={cx('content__wrapper')}>
            <h4 className={cx('content__title')}>Sản phẩm</h4>
            <ul className={cx('content__list')}>
              <li className={cx('content__item')}>
                <Link to="/" className={cx('content__item-link')}>
                  Áo khoác da nam
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to="/" className={cx('content__item-link')}>
                  Áo khoác da nữ
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to="/" className={cx('content__item-link')}>
                  Ví da
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to="/" className={cx('content__item-link')}>
                  Belts & Watchstrap
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to="/" className={cx('content__item-link')}>
                  Phụ kiện
                </Link>
              </li>
            </ul>
          </div>
          <div className={cx('content__wrapper')}>
            <h4 className={cx('content__title')}>MAIN MENU</h4>
            <ul className={cx('content__list')}>
              <li className={cx('content__item')}>
                <Link to={routes.sellPolicy} className={cx('content__item-link')}>
                  Chính sách bán hàng
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to={routes.warrantyPolicy} className={cx('content__item-link')}>
                  Chính sách bảo hành
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to={routes.goodsRefundPolicy} className={cx('content__item-link')}>
                  Chính sách đổi trả
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to={routes.shippingPolicy} className={cx('content__item-link')}>
                  Chính sách vận chuyển
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to={routes.shirtSizingGuide} className={cx('content__item-link')}>
                  Hướng dẫn đo size áo
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to="/" className={cx('content__item-link')}>
                  Khách hàng thân thiết
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to="/" className={cx('content__item-link')}>
                  May áo da thật theo yêu cầu
                </Link>
              </li>
            </ul>
          </div>
          <div className={cx('content__wrapper')}>
            <h4 className={cx('content__title')}>Sản phẩm</h4>
            <ul className={cx('content__list')}>
              <li className={cx('content__item')}>
                <Link to={routes.introduce} className={cx('content__item-link')}>
                  Giới thiệu
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to={routes.product} className={cx('content__item-link')}>
                  Tất cả sản phẩm
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to={routes.blog} className={cx('content__item-link')}>
                  Tin tức
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to={routes.contact} className={cx('content__item-link')}>
                  Liên hệ
                </Link>
              </li>
              <li className={cx('content__item')}>
                <Link to="/" className={cx('content__item-link')}>
                  Hệ thống cửa hàng
                </Link>
              </li>
            </ul>
          </div>
          <div className={cx('content__wrapper')}>
            <h4 className={cx('content__title')}>Thông tin liên hệ</h4>
            <ul className={cx('content__list')}>
              <li className={cx('content__item')}>
                <div className={cx('content__item-link')}>
                  <HomeIcon width="2rem" height="2rem" marginBottom="-4px"></HomeIcon>
                  <span> Tòa nhà FPT Polytechnic, P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội</span>
                </div>
              </li>
              <li className={cx('content__item')}>
                <div className={cx('content__item-link', 'content__item-flex')}>
                  <PhoneSolidIcon width="2rem" height="2rem"></PhoneSolidIcon>
                  <span> 19009057 / 0345 561 321</span>
                </div>
              </li>
              <li className={cx('content__item')}>
                <div className={cx('content__item-link', 'content__item-flex')}>
                  <MailIcon width="2rem" height="2rem"></MailIcon>
                  <span> support@hakken.click</span>
                </div>
              </li>
            </ul>
          </div>
          <div className={cx('content__wrapper')}>
            <h4 className={cx('content__title')}>Đăng ký nhận tin</h4>
            <ul className={cx('content__list')}>
              <li className={cx('content__item')}>
                <div className={cx('content__item-link', 'content__item-flex')}>Tin khuyến mãi / Tin thương hiệu</div>
              </li>
              <li className={cx('content__item')}>
                <form action="" className={cx('content__form')}>
                  <input type="text" placeholder="Nhập email của bạn" className={cx('content-input')} />
                  <button type="submit" className={cx('content-btn')}>
                    <SendIcon width="2rem" height="2rem"></SendIcon>
                  </button>
                </form>
              </li>
            </ul>
          </div>
          <div className={cx('content__wrapper')}>
            <h4 className={cx('content__title')}>Kết nối với chúng tôi</h4>
            <ul className={cx('content__list')}>
              <li className={cx('content__item')}>
                <div className={cx('content__item-link', 'content__item-flex')}>Mạng xã hội</div>
              </li>
              <li className={cx('content__item')}>
                <div className={cx('content__item-link', 'content__item-flex')}>
                  <Link to="/" className={cx('content__item-link')}></Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
