import React from 'react';

import classNames from 'classnames/bind';
import classes from './Instruct.module.css';
const cx = classNames.bind(classes);

const Instruction = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <p className={cx('link')}>Trang chủ / Hướng dẫn mua hàng trên Hakken</p>
        <div className={cx('box-content')}>
          <h1 className={cx('title-box')}>Hướng dẫn mua hàng trên Website Hakken</h1>
          <div>
            Nhằm giúp khách hàng thuận lợi hơn trong mua sắm, nay Hakken ra mắt hình thức
            <span> ĐẶT HÀNG ONLINE TRÊN WEBSITE </span>, dưới đây là hướng dẫn những bước cơ bản để quý khách hàng có
            thể mua hàng online một cách dễ dàng.
          </div>
          <div className={cx('box-img')}>
            <img className={cx('image1')} src="https://i.ibb.co/qszwTjZ/image.png" alt="" />
          </div>
          <div className={cx('step1')}>
            <div className={cx('box-text')}>
              <span>Bước 1: Mở trình duyệt</span> trên thiết bị di động/máy tính cá nhân (Chrome, Cốc Cốc, ... ). Sau đó
              <span>truy cập</span> vào website: <p>www.hakken.com.vn</p> <span>lựa chọn</span> mục
              <span>SẢN PHẨM</span>
              <div>
                Tại đây bạn có thể thấy được những mục sản phẩm chính của Merriman hiện lên. Với sự đa dạng trong dòng
                sản phẩm, từ áo sơ mi Casual, Bamboo, áo len,... đến quần tây, quần kaki đều rất nhiều mẫu mã và đa dạng
                về chất liệu cho bạn lựa chọn.
              </div>
            </div>
            <div className={cx('box-img')}>
              <img className={cx('image1')} src="https://i.ibb.co/dWq9Fq2/Thi-t-k-ch-a-c-t-n.png" alt="" />
            </div>
          </div>
          <div className={cx('step2')}>
            <div className={cx('box-text')}>
              <span>Bước 2:</span> Nhấp vào sản phẩm bạn thích, sẽ xem được chi tiết của sản phẩm
              <p>- Chọn size, màu sắc</p>
              <p>- Chọn số lượng</p>
              <p>- Mô tả sản phẩm</p>
              <p>- Xem đánh giá và bình luận</p>
              <p>- Xem chính sách đổi trả và bảo hành</p>
              Và nhấp vào <span>"ĐẶT HÀNG"</span>
            </div>
            <div className={cx('box-img')}>
              <img className={cx('image1')} src="https://i.ibb.co/jHYrB8F/Thi-t-k-ch-a-c-t-n-1.png" alt="" />
            </div>
          </div>
          <div className={cx('step3')}>
            <div className={cx('box-text')}>
              <span>Bước 3: Điền các thông tin đơn hàng</span> để đơn vị vận chuyển giao hàng bao gồm
              <span>Họ tên, số điện thoại, địa chỉ</span>. Sau đó nhấn <span>"Phương thức thanh toán"</span>
            </div>
            <div className={cx('box-img')}>
              <img className={cx('image1')} src="https://i.ibb.co/dJbGzWn/Thi-t-k-ch-a-c-t-n-2.png" alt="" />
            </div>
          </div>
          <div className={cx('step4')}>
            <div className={cx('box-text')}>
              <span>Bước 4:</span>
              Vui lòng <span>chọn hình thức giao hàng:</span>thanh toán khi giao hàng ( COD ) hoặc chuyển khoản qua ngân
              hàng và đặt hàng
            </div>
            <div className={cx('box-img')}>
              <img className={cx('image1')} src="https://i.ibb.co/hVH1kLR/Thi-t-k-ch-a-c-t-n-3.png" alt="" />
            </div>
          </div>
          <div className={cx('text-end')}>
            Đơn hàng sau khi hoàn tất sẽ được <span> xác nhận thông qua email </span> đã đăng ký đồng thời sẽ được nhân
            viên gọi điện xác nhận lại trước khi giao hàng. Đến đây, bạn đã hoàn thành việc đặt hàng trên website của
            <span>Hakken</span> rồi đấy! Với 4 bước đươn giản trên bạn có thể mua hàng trên website của
            <span>Hakken</span> mọi lúc mọi nơi mà không phải tốn thời gian. Nếu bạn còn thắc mắc hãy liên hệ ngay qua
            hotline của <span>Hakken</span>, đội ngũ nhân viên sẽ giải đáp mọi thắc mắc của bạn.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
