import React from 'react';
import classNames from 'classnames/bind';
import style from './GoodsRefundPolicy.module.css';
import background from '~/assets/images/background-contact.jpg';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

const GoodsRefundPolicy = () => {
  return (
    <div className={cx('content')}>
      <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
      <div className={cx('background-content')}>
        <h2 className={cx('title-content')}>CHÍNH SÁCH ĐỔI TRẢ</h2>
        <div className={cx('text-content')}>
          <Link to="">Trang chủ</Link>
          <div>/</div>
          <p>Chính sách đổi trả</p>
        </div>
      </div>
      <div className={cx('content-bottom')}>
        <h1 className={cx('title-bottom')}>CHÍNH SÁCH ĐỔI TRẢ</h1>
        <div className={cx('content-first')}>
          <span>Hakken</span> - Thương hiệu đồ da cao cấp hàng đầu Việt Nam, chúng tôi cam kết mọi sản phẩm đến tay Quý
          khách hàng đều là sản phẩm đạt chuẩn chất lượng. Tuy nhiên, trong quá trình trải nghiệm sản phẩm không thể
          tránh khỏi những vấn đề ngoài ý muốn, Hakken chân thành xin lỗi Quý khách hàng vì những trải nghiệm không đáng
          có.
        </div>
        <div className={cx('text-bold')}>Hakken cam kết:</div>
        <div className={cx('text-contentBottom')}>
          Mọi sản phẩm của Hakken đều được sản xuất chính hãng, được bảo hành toàn diện 5 năm về da và trọn đời với các
          phụ kiện (khóa kéo, nút bấm, chỉ may, keo dán tiếp xúc,…).
        </div>
        <div className={cx('text-contentBottom')}>
          Mọi sản phẩm sẽ được đổi mới trong 30 ngày nếu phát sinh lỗi từ nhà sản xuất.
        </div>
        <div className={cx('text-contentBottom')}>Với các đơn hàng đổi – trả, Hakken áp dụng chính sách như sau:</div>
        <div className={cx('text-bold')}>1.Đổi hàng miễn phí: Áp dụng trong thời hạn 30 ngày kể từ ngày mua hàng.</div>
        <div className={cx('text-bold')}>Điều kiện:</div>
        <div className={cx('text-contentBottom')}>- Sản phẩm còn nguyên vẹn chưa qua sử dụng. .</div>
        <div className={cx('text-contentBottom')}>- Sản phẩm còn đầy đủ tem mác, hộp đựng sản phẩm.</div>
        <div className={cx('text-contentBottom')}>- Mỗi sản phẩm được đổi hàng 1 lần.</div>
        <div className={cx('text-bold')}>Hình thức đổi hàng:</div>
        <div className={cx('table')}>
          <div className={cx('left-table')}>
            <div className={cx('box-left')}>Lỗi phát sinh của nhà sản xuất</div>
            <div className={cx('box-left')}>Không vừa size áo</div>
            <div className={cx('box-left')}>Không ưng mẫu</div>
          </div>
          <div className={cx('right-table')}>
            <div className={cx('box-right')}>Đổi mới sản phẩm</div>
            <div className={cx('box-right')}>Đổi mới size áo</div>
            <div className={cx('box-right')}>Đổi mẫu áo mới*</div>
          </div>
        </div>
        <div className={cx('text-italic')}>
          (*) Với trường hợp đổi mẫu, mẫu áo đổi có giá trị bằng hoặc thấp hơn mẫu áo đã mua. Hakken sẽ quy đổi giá trị
          dư bằng vouche trị tối đa 200.000đ cho Quý khách hàng. Với sản phẩm có giá trị cao hơn, Quý khách hàng vui
          lòng bù tiền chênh lệch.
        </div>
        <div className={cx('text-contentBottom')}>
          Đổi hàng dễ dàng & tận nơi: Hakken luôn lấy khách hàng làm trung tâm, chúng tôi luôn hạn chế tối đa mọi chi
          phí phát sinh từ phía khách hàng liên quan đến sản phẩm, Hakken sẽ giao sản phẩm mới tới và thu hồi sản phẩm
          cũ về.
        </div>
        <div className={cx('text-contentBottom')}>
          Bạn chỉ cần hỗ trợ Hakken một chút xíu, chính là đóng gói sản phẩm cũ lại để đưa bưu tá khi bưu tá giao hàng
          nhé!
        </div>
        <div className={cx('text-bold')}>2.Trả hàng: Nhanh chóng – Miễn phí – Bồi thường</div>
        <div className={cx('text-contentBottom')}>Điều kiện trả hàng:</div>
        <div className={cx('text-contentBottom')}>- Sản phẩm có lỗi do nhà sản xuất</div>
        <div className={cx('text-contentBottom')}>- Sản phẩm chưa qua sử dụng, còn nguyên tem mác, hộp đựng</div>
        <div className={cx('text-contentBottom')}>Hình thức trả hàng</div>
        <div className={cx('text-contentBottom')}>
          - Trả hàng trực tiếp tại cửa hàng Hakken: Chuyên viên dịch vụ khách hàng Hakken sẽ xử lý yêu cầu của Quý khách
          ngay tại chỗ. Quý khách sẽ được hoàn tiền ngay lập tức sau khi Hakken xác nhận sản phẩm.
        </div>
        <div className={cx('text-contentBottom')}>
          - Trả hàng thông qua đơn vị vận chuyển: Nếu không thể tới trực tiếp cửa hàng của Hakken, bạn có thể liên hệ
          Hakken thông qua tổng đài 1900 9057 hoặc Zalo OA Hakken để tạo yêu cầu trả hàng.
        </div>
        <div className={cx('text-contentBottom')}>
          Ngay sau khi nhận được sản phẩm Quý khách gửi trả, Hakken sẽ kiểm tra và xác nhận tình trạng sản phẩm. Hakken
          xin phép được xử lý yêu cầu trong 4 giờ kể từ khi nhận được sản phẩm, Quý khách hàng sẽ được hoàn tiền trong
          vòng 30 phút kể từ khi Hakken xác nhận đủ điều kiện.
        </div>
        <div className={cx('text-bold')}>Quà tặng:</div>
        <div className={cx('text-contentBottom')}>
          Hakken hiểu, việc trả hàng lại Hakken là điều mà Quý khách hàng không hề mong muốn, để dẫn tới việc Quý khách
          phải trả hàng hoàn toàn là lỗi của chúng tôi. Hakken chân thành xin lỗi Quý khách hàng vì trải nghiệm không
          tốt này.
        </div>
        <div className={cx('text-contentBottom')}>
          Hakken xin phép gửi tặng Quý khách hàng có đơn hàng trả sản phẩm là 1 voucher trị giá 200.000đ để thay lời xin
          lỗi của chúng tôi và mong Quý khách hàng lượng thứ và tiếp tục đồng hành cùng Hakken trong thời gian tiếp
          theo!
        </div>
        <div className={cx('text-bold')}>Trân trọng</div>
        <div className={cx('text-bold')}>Đội ngũ Hakken</div>
      </div>
    </div>
  );
};

export default GoodsRefundPolicy;
