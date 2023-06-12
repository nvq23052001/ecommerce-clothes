import React from 'react';
import classNames from 'classnames/bind';
import style from './WarrantyPolicy.module.css';
import background from '~/assets/images/background-contact.jpg';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

const WarrantyPolicy = () => {
  return (
    <div className={cx('content')}>
      <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
      <div className={cx('background-content')}>
        <h2 className={cx('title-content')}>CHÍNH SÁCH BẢO HÀNH</h2>
        <div className={cx('text-content')}>
          <Link to="">Trang chủ</Link>
          <div>/</div>
          <p>Chính sách bảo hành</p>
        </div>
      </div>
      <div className={cx('content-bottom')}>
        <h1 className={cx('title-bottom')}>CHÍNH SÁCH BẢO HÀNH</h1>
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
        <div className={cx('text-contentBottom')}>
          Với các lỗi phát sinh trong quá trình sử dụng, Hakken áp dụng chính sách bảo hành như sau:
        </div>
        <div className={cx('text-bold')}>1. Bảo hành miễn phí:</div>
        <div className={cx('text-bold')}>Điều kiện:</div>
        <div className={cx('text-contentBottom')}>- Còn trong thời hạn bảo hành.</div>
        <div className={cx('text-contentBottom')}>- Sản phẩm chưa bị thay đổi cấu trúc.</div>
        <div className={cx('text-contentBottom')}>
          - Sản phẩm hư hỏng do tự nhiên không chịu tác động của con người.
        </div>
        <div className={cx('text-contentBottom')}>
          - Sản phẩm không bị hư hại do tác động nhiệt, hóa chất gây biến dạng bề mặt da.
        </div>
        <div className={cx('text-bold')}>Hình thức bảo hành:</div>
        <div className={cx('text-contentBottom')}>
          Thay mới hoặc tương đương: các phụ kiện đi kèm sản phẩm (khóa kéo, nút bấm, chỉ may, keo dán tiếp xúc).
        </div>
        <div className={cx('text-contentBottom')}>
          Đổi mới sản phẩm/Thay mới một phần hoặc toàn bộ bề mặt da hư hại, đảm bảo phục hồi khả năng sử dụng của sản
          phẩm.
        </div>
        <div>
          <div className={cx('text-bold')}>1. Bảo hành thu phí:</div>
          <div className={cx('text-contentBottom')}>
            - Các lỗi phát sinh do người sử dụng làm hư hại bề mặt sản phẩm.
          </div>
          <div className={cx('text-contentBottom')}>- Do tác độn nhiệt, hóa chất.</div>
          <div className={cx('text-contentBottom')}>- Hết hạn thời hạn bảo hành.</div>
          <div className={cx('text-bold')}>Hình thức bảo hành:</div>
          <div className={cx('text-contentBottom')}>
            Hakken luôn lấy khách hàng làm trung tâm, chúng tôi luôn hạn chế tối đa mọi chi phí phát sinh từ phía khách
            hàng liên quan đến sản phẩm, trong nhiều trường hợp Hakken luôn luôn miễn phí bảo hành cho khách hành. Với
            các trường hợp bất khả kháng, Hakken xin cáo lỗi và sẽ thông báo với Quý khách hàng về chi phí phát sinh
            trước khi thực hiện sửa chữa.
          </div>
          <div className={cx('text-bold')}>B. QUY TRÌNH BẢO HÀNH:</div>
          <div className={cx('text-contentBottom')}>
            Để đảm bảo việc bảo hành và chăm sóc sản phẩm được tốt nhất, Quý khách hàng vui lòng liên hệ với Hakken để
            được hướng dẫn.
          </div>
          <div className={cx('text-italic')}>
            Cách 1: Quý khách hàng mang sản phẩm trực tiếp tới showroom của Hakken để được hỗ trợ.
          </div>
          <div className={cx('text-contentBottom')}>
            Ngay khi tiếp nhận thông tin yêu cầu bảo hành sản phẩm của Quý khách, Chuyên viên CSKH của Hakken sẽ xử lý
            trực tiếp và thông báo ngay cho Quý khách hàng.
          </div>
          <div className={cx('text-italic')}>
            Cách 2: Quý khách hàng liên hệ với Hakken qua Tổng đài CSKH 1900 9057 hoặc các kênh thông tin của chúng tôi
            để được hỗ trợ.
          </div>
          <div className={cx('text-contentBottom')}>Quy trình tiếp nhận bảo hành.</div>
          <div className={cx('text-contentBottom')}>
            Chuyên viên CSKH của Hakken tiếp nhận thông tin bảo hành của Quý khách hàng.
          </div>
          <div className={cx('text-contentBottom')}>
            Quý khách hàng gửi sản phẩm về cho Hakken qua các phương thức vận chuyển kèm thông tin (Họ Tên + SĐT + Địa
            chỉ nhận sản phẩm).
          </div>
          <div className={cx('text-contentBottom')}>
            Chuyên viên CSKH Hakken sẽ liên hệ với Quý khách hàng thông báo tiếp nhận sản phẩm và tình trạng bảo hành.
          </div>
          <div className={cx('text-contentBottom')}>
            Hakken sẽ gửi lại sản phẩm theo địa chỉ Quý khách hàng yêu cầu ngay sau khi đã phục hồi sản phẩm cho Quý
            khách hàng.
          </div>
          <div className={cx('text-contentBottom')}>Thời gian sửa chữa và phục hồi tối đa 30 ngày.</div>
          <div className={cx('text-bold')}>TRÂN TRỌNG.</div>
          <div className={cx('text-bold')}>Đội ngũ Hakken</div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyPolicy;
