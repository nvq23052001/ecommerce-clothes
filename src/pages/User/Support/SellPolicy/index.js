import React from 'react';
import classNames from 'classnames/bind';
import style from './SellPolicy.module.css';
import background from '~/assets/images/background-contact.jpg';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

const SellPolicy = () => {
  return (
    <div className={cx('content')}>
      <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
      <div className={cx('background-content')}>
        <h2 className={cx('title-content')}>CHÍNH SÁCH BÁN HÀNG HAKKEN</h2>
        <div className={cx('text-content')}>
          <Link to="">Trang chủ</Link>
          <div>/</div>
          <p>Chính sách bán hàng Hakken</p>
        </div>
      </div>
      <div className={cx('content-bottom')}>
        <h1 className={cx('title-bottom')}>CHÍNH SÁCH BÁN HÀNG Hakken</h1>
        <div className={cx('first-content')}>
          <div className={cx('title')}>A. MUA HÀNG TRỰC TIẾP</div>
          <div className={cx('text')}>
            Để gia tăng trải nghiệm sản phẩm cho Quý khách hàng, Thương hiệu đồ da cao cấp Hakken hiện có hệ thống cửa
            hàng tại Hà Nội và TP Hồ Chí Minh, quý khách hàng có thể tời tham quan và mua sắm tại:
          </div>
          <div className={cx('store')}>Hệ thống cửa hàng TP HCM</div>
          <div className={cx('address-store')}>1A Điện Biên Phủ, Phường Đa Kao, Quận 1, TP.HCM</div>
          <div className={cx('address-store')}>
            Tòa nhà FPT Polytechnic, P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội
          </div>
          <div className={cx('store')}>Hệ thống cửa hàng TP Hà Nội</div>
          <div className={cx('address-store')}>98 Quang Trung, Quận Hà Đông, TP Hà Nội </div>
        </div>
        <div className={cx('second-content')}>
          <div className={cx('title')}>B. KHÁCH MUA HÀNG ONLINE</div>
          <div className={cx('text')}>Quý khách hàng có thể mua các sản phẩm của Hakken tại</div>
          <div className={cx('infor')}>• Tại website: hakken.vn</div>
          <div className={cx('infor')}>• Qua tổng đài: 1900 9057</div>
          <div className={cx('infor')}>• Qua fanpage Hakken, Zalo OA và các kênh thông tin của chúng tôi.</div>
        </div>
        <div className={cx('last-content')}>
          <div className={cx('title')}>C. THANH TOÁN</div>
          <div className={cx('text')}>
            Tiện lợi và nhanh chóng là sự ưu tiên hàng đầu đối với sự hài lòng của khách hàng, Hakken hỗ trợ tất cả các
            hình thức thanh toán trên các nền tảng offline và online.
          </div>
          <div className={cx('text-title')}>
            Hakken hỗ trợ nhiều phương thức thanh toán linh hoạt cho Quý khách hàng
          </div>
          <div className={cx('infor')}>• Thanh toán tiền mặt</div>
          <div className={cx('infor')}>• Thanh toán qua thẻ tín dụng hoặc thanh toán trực tuyến</div>
          <div className={cx('infor')}>• Thanh toán chuyển khoản qua ngân hàng.</div>
          <div className={cx('infor')}>• Thanh toán COD với các đơn giao hàng toàn quốc.</div>
          <div className={cx('text')}>
            Quét mã QR tại cửa hàng hoặc chuyển khoản trực tiếp và số tài khoản cá nhân của chủ doanh nghiệp.
          </div>
          <div className={cx('title-infor')}>Thông tin chuyển khoản:</div>
          <div className={cx('text-infor')}>Số tài khoản: 135886</div>
          <div className={cx('text-infor')}>Tên chủ tài khoản: Huynh Thi Diem Trinh</div>
          <div className={cx('text-infor')}>Tên ngân hàng: ACB</div>
          <div className={cx('text-infor')}>Swift Code: ASCBVNVX</div>
          <div className={cx('text-title')}>
            Với các đơn đặt hàng online và thanh toán COD, Hakken cung cấp dịch vụ ưu đãi chưa từng có
          </div>
          <div className={cx('text')}>
            Quý khách hàng có thể đặt hàng và nhận hàng tại nhà. Khi nhận sản phẩm Quý khách hàng được mặc thử sản phẩm,
            nếu không vừa ý có thể gửi trả lại sản phẩm mà không mất bất cứ chi phí nào.
          </div>
          <div className={cx('text')}>
            Hakken áp dụng chính sách đổi hàng trong 30 ngày với bất cứ lỗi nào do nhà sản xuất.
          </div>
          <div className={cx('text-title')}>
            Khách hàng vui lòng kiểm tra kĩ sản phẩm và đơn hàng trước khi thanh toán.
          </div>
          <div className={cx('text-title')}>
            Hãy liên hệ ngay với chúng tôi qua hotline 1900 9057 hoặc Zalo OA Hakken khi có bất cứ vấn đề gì về giao
            nhận hàng.
          </div>
          <div className={cx('thanks')}>Trân trọng.</div>
          <div className={cx('name-company')}>Đội ngũ Hakken</div>
        </div>
      </div>
    </div>
  );
};

export default SellPolicy;
