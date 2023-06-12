import React from 'react';
import classNames from 'classnames/bind';
import background from '~/assets/images/background-contact.jpg';
import styles from './introduce.module.css';
import { Link } from 'react-router-dom';
import routes from 'config/routes';

const cx = classNames.bind(styles);
const Introduce = () => {
  return (
    <div className={cx('container')}>
      <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
      <div className={cx('background-content')}>
        <h2 className={cx('title-content')}>VỀ HAKKEN</h2>
        <div className={cx('text-content')}>
          <Link to={routes.home}>Trang chủ/</Link>
          <span> Về Hakken</span>
        </div>
      </div>
      <div className={cx('main')}>
        <div className={cx('name')}>
          <h1>VỀ HAKKEN</h1>
          <hr className={cx('line')}></hr>
        </div>
        <div className={cx('text')}>
          <p>
            <strong>Hakken</strong> là thương hiệu bán lẻ áo khoác da thật và phụ kiện da thật cao cấp trực thuộc công
            ty Leathermen - nhà máy sản xuất áo khoác da thật hàng đầu Việt Nam và Châu Á. Với lợi thế là thành viên của
            nhà máy sản xuất, Hakken ra đời với sự mệnh tạo ra một thương hiệu thời trang da thật Việt Nam đạt chuẩn
            Quốc tế như cách mà nhà máy của chúng tôi đã và đang làm cho các thương hiệu lớn khác trên thế giới.
          </p>
          <p>
            Xuất phát điểm của Hakken là thành viên của <strong>nhà máy sản xuất áo da Leathermen</strong> , chúng tôi
            đã và đang là nhà cung cấp các sản phẩm áo da thật cho nhiều khách hàng lớn từ khắp các thị trường Âu – Mỹ,
            Nhật Bản, Úc,.. chúng tôi tự hào là nhà máy duy nhất ở Đông Nam Á có năng lực sản xuất áo khoác da cho quân
            đội Úc, Canada và Cảnh sát Anh Quốc. Trải qua gần 10 năm hình thành và phát triển,chúng tôi đã làm việc, và
            giúp rất nhiều thương hiệu thời trang da thật lớn trên thế giới phát triển, nhưng ngay tại Việt Nam, sân nhà
            của chúng ta, chúng tôi chưa làm được điều đó, thị trường áo da thật hiện này xuất hiện khá nhiều thương
            hiệu đội lốt hàng Việt Nam nhưng hoàn toàn không có xuất xứ như giới thiệu.
          </p>
          <p>
            Vì lẽ đó, Hakken ra đời với sứ mệnh
            <strong>
              "xây dựng một thương hiệu, một nền tảng chuyên cung cấp các sản phẩm da thật, chất lượng cao đạt tiêu
              chuẩn quốc tế"
            </strong>
            cho người Việt Nam sử dụng, được thiết kế và sản xuất bởi chính bàn tay của nghệ nhân Việt Nam, với mức giá
            hợp lý và minh bạch trong vấn đề xuất xứ sản phẩm.
          </p>
          <p>
            Với cam kết <strong>“Chất lượng tuyệt hảo – Dịch vụ tận tâm – Giá trị đại chúng”</strong> Hakken cam kết từ
            trái tim, sẽ mang đến cho Quý khách hàng – người bạn, người đồng hành của chúng tôi- những trải nghiệm tốt
            nhất, giá trị nhất xứng đáng với kỳ vọng của quý khách hàng.
          </p>
          <p>
            Để hiện thực hóa các cam kết và sứ mệnh của mình, Hakken đã có những bước tiến vững chắc bằng việc liên tục
            khai trương và phát triển hệ thống cửa hàng để gia tăng trải nghiệm cho người dùng.
          </p>
          <strong>
            Tháng 11-2021: Cửa hàng giới thiệu và trưng bày sản phẩm đầu tiên ra đời, tọa lạc tại địa chỉ Tòa nhà FPT
            Polytechnic, P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội
          </strong>
          <br />
          <strong>
            Tháng 5 – 2022: Cửa hàng thứ 2 ra đời tại trung tâm của TP Hồ Chí Minh – số 1 Điện Biên Phủ, Phường Đa Kao,
            Quận 1.
          </strong>
          <br />
          <strong>
            Tháng 9 – 2022: Hakken hiện diện tại thủ đô Hà Nội bằng việc khai trương của hàng thứ 3 tại số 98 Quang
            Trung, Quận Hà Đông, TP Hà Nội.
          </strong>
          <div className={cx('content')}>
            <p>
              Tới đây, theo chiến lược phát triển chung của Hakken, chúng tôi sẽ phát triển chuỗi cửa hàng thứ 4 tại Hà
              Nội trong quý 4 năm 2022, phủ sóng toàn quốc bằng cửa hàng thứ 5 tại Đà Nẵng vào đầu năm 2023.
              <br />
              <strong>Trân trọng !</strong>
              <br />
              <strong>Đội ngũ Hakken</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
