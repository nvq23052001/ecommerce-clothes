import React from 'react';
import classNames from 'classnames/bind';
import style from './ShippingPolicy.module.css';
import background from '~/assets/images/background-contact.jpg';
import { Link } from 'react-router-dom';
import imageQr from '~/assets/images/qr_zalo.jpg';

const cx = classNames.bind(style);

const ShippingPolicy = () => {
  return (
    <div className={cx('content')}>
      <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
      <div className={cx('background-content')}>
        <h2 className={cx('title-content')}>CHÍNH SÁCH VẬN CHUYỂN</h2>
        <div className={cx('text-content')}>
          <Link to="">Trang chủ</Link>
          <div>/</div>
          <p>Chính sách vận chuyển</p>
        </div>
      </div>
      <div className={cx('content-bottom')}>
        <h1 className={cx('title-bottom')}>CHÍNH SÁCH VẬN CHUYỂN</h1>
        <div className={cx('content-first')}>
          <span>Hakken</span> luôn hướng đến việc cung cấp dịch vụ vận chuyển tốt nhất với mức phí cạnh tranh cho tất cả
          các đơn hàng mà Quý khách hàng đặt với chúng tôi. Chúng tôi hỗ trợ giao hàng trên toàn quốc với chính sách
          giao hàng cụ thể như sau:
        </div>
        <div className={cx('text-bold')}>1. Phí vận chuyển</div>
        <div className={cx('text-contentBottom')}>
          Hakken miễn phí vận chuyển cho tất cả các đơn hàng có giá trị từ 500.000đ trở lên.
        </div>
        <div className={cx('text-contentBottom')}>
          Với các đơn hàng giá trị dưới 500.000đ, mức phí giao hàng sẽ phụ thuộc vào cước vận chuyển do bên Dịch vụ giao
          hàng thông báo.
        </div>
        <div className={cx('text-contentBottom')}>
          Với các sản phẩm bảo hành, đổi trả, Hakken miễn phí vận chuyển tới địa chỉ khách hàng yêu cầu.
        </div>
        <div className={cx('text-bold')}>2. Thời gian giao hàng</div>
        <div className={cx('text-contentBottom')}>
          Hakken sẽ tiến hành gửi sản phẩm cho Quý khách hàng ngay sau khi xác nhận đơn hàng, thời gian vận chuyển tùy
          theo khu vực, dao động từ 1-3 ngày làm việc. Hakken sẽ gửi mã vận đơn cho Quý khách hàng theo dõi ngay sau khi
          đơn hàng được tiếp nhận.
        </div>
        <div className={cx('text-contentBottom')}>
          Đội ngũ chăm sóc khách hàng Hakken sẽ theo dõi và thông báo tình trạng giao hàng cho Quý khách hàng theo yêu
          cầu hoặc có vấn đề phát sinh.
        </div>
        <div className={cx('text-bold')}>3. Khiếu nại</div>
        <div className={cx('text-contentBottom')}>
          Trong trường hợp gặp các vấn đề không như mong muốn: giao hàng trễ, sản phẩm không ưng ý, vấn đề về thanh
          toán,… Quý khách hàng vui lòng liên hệ Hakken qua các kênh hỗ trợ sau:
        </div>
        <div className={cx('text-contentBottom')}>- Tổng đài CSKH 1900 9057</div>
        <div className={cx('text-contentBottom')}>- Zalo OA Hakken</div>
        <div className={cx('image-qr')}>
          <img src={imageQr} alt="" />
        </div>
        <div className={cx('text-bold')}>Trân trọng.</div>
        <div className={cx('text-bold')}>Đội ngũ Hakken</div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
