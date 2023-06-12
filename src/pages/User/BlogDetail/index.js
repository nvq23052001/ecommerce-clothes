import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BlogDetail.module.css';
import background from '~/assets/images/background-contact.jpg';
import { Link, useParams } from 'react-router-dom';
import { CalendarToday } from '@material-ui/icons';
import { useApis } from 'services/api';
import { apiUrls } from 'config/apis';
const cx = classNames.bind(styles);
const BlogDetail = () => {
  const { apiGet } = useApis();
  // eslint-disable-next-line no-unused-vars
  const {id} = useParams()
  const [detailBlogs, setDetailBlogs] = useState([]);
  const getDetailBlog = () => {
    apiGet(apiUrls.detailBlog(id), {}, ({ data }) => {
      setDetailBlogs(data.items);
    });
  };
  useEffect(() => {
    getDetailBlog();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className={cx('container')}>
      <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
      <div className={cx('background-content')}>
        <div className={cx('group_content')}>
          <h2 className={cx('title-content')}>DA NAPPA - TỪ NGUYÊN LIỆU ĐẾN SẢN PHẨM THỜI TRANG CHẤT LƯỢNG CAO</h2>
          <div className={cx('text-content')}>
            <Link to="">Trang chủ</Link>
            <div>/</div>
            <p>DA NAPPA - TỪ NGUYÊN LIỆU ĐẾN SẢN PHẨM THỜI TRANG CHẤT LƯỢNG CAO</p>
          </div>
        </div>
      </div>

      <div className={cx('main')}>
      <h1>{detailBlogs.title}</h1>
            <hr />
            <div className={cx('blog')}>
              <div className={cx('icon_calendar')}>
                <CalendarToday /> <span>2023/12/02</span>
              </div>
              <p>
                Da Nappa là một loại da được ứng dụng rộng rãi trong đời sống, đặc biệt là các sản phẩm thời trang cao
                cấp hay nội thất xe. Với độ bóng mịn, mềm mại và bền đẹp, da Nappa đã trở thành lựa chọn hàng đầu của
                nhiều nhà sản xuất và người tiêu dùng. Qua bài viết này, Davinet sẽ giúp bạn hiểu rõ hơn về da Nappa.
              </p>
              <div className={cx('content')}>
                <h3>Da Nappa là gì? </h3>
                <p>
                  Da Nappa là một loại da cao cấp được làm từ da bê hoặc da cừu. Với lớp da ngoài cùng thuộc dòng Full
                  Grain (tức là da không bị can thiệp vào bề mặt để giữ lại cảm giác và tính thẩm mỹ). Da Nappa có đặc
                  tính mềm mại và mịn màng, đồng thời sở hữu độ bóng cao.
                </p>
                <div className={cx('blog_img')}>
                  <img
                    className={cx('blog_image')}
                    alt=""
                    src={detailBlogs.image}
                  />
                </div>

                <p className={cx('content_note')}>Định nghĩa da Nappa</p>
              </div>

              <div className={cx('content')}>
                <h3>Nguồn gốc da Nappa </h3>
                <p>
                  Da Nappa được tạo ra bởi một thợ da người Đức tên là Emanuel Manasse vào năm 1875 khi ông làm việc tại
                  một công ty chuyên thuộc da tại Napa, California. Tên gọi "Nappa" được đặt theo tên của thành phố này.
                </p>
                <div className={cx('blog_img')}>
                  <img
                    className={cx('blog_image')}
                    alt=""
                    src="https://file.hstatic.net/200000366789/file/_dsc8707_5d36375082094faa9bd62a0f5cb4f64b_grande.png"
                  />
                </div>

                <p className={cx('content_note')}>Thợ thuộc da Nappa người Đức Emanuel Manasse</p>
              </div>
            </div>

        <h1>BÀI VIẾT GẦN ĐÂY</h1>
        <hr />
        <div className={cx('new')}>
          <div className={cx('new_content')}>
            <div className={cx('new_content_img')}>
              <img
                className={cx('new_content_image')}
                alt=""
                src="https://file.hstatic.net/200000366789/article/da-saffiano-la-gi_40841e57b85a4620a2d874ad44dae98f_medium.png"
              />
            </div>
            <div className={cx('new_text')}>
              <h4>CÁCH BẢO QUẢN ÁO KHOÁC DA KHI TRỜI NỒM, ẨM</h4>
              <div className={cx('icon_calendar')}>
                📆<span> 22/2/2023</span>
              </div>
            </div>
          </div>

          <div className={cx('new_content')}>
            <div className={cx('new_content_img')}>
              <img
                className={cx('new_content_image')}
                alt=""
                src="https://file.hstatic.net/200000366789/article/da-saffiano-la-gi_40841e57b85a4620a2d874ad44dae98f_medium.png"
              />
            </div>
            <div className={cx('new_text')}>
              <h4>CÁCH BẢO QUẢN ÁO KHOÁC DA KHI TRỜI NỒM, ẨM</h4>
              <div className={cx('icon_calendar')}>
                📆<span> 22/2/2023</span>
              </div>
            </div>
          </div>

          <div className={cx('new_content')}>
            <div className={cx('new_content_img')}>
              <img
                className={cx('new_content_image')}
                alt=""
                src="https://file.hstatic.net/200000366789/article/da-saffiano-la-gi_40841e57b85a4620a2d874ad44dae98f_medium.png"
              />
            </div>
            <div className={cx('new_text')}>
              <h4>CÁCH BẢO QUẢN ÁO KHOÁC DA KHI TRỜI NỒM, ẨM</h4>
              <div className={cx('icon_calendar')}>
                📆<span> 22/2/2023</span>
              </div>
            </div>
          </div>

          <div className={cx('new_content')}>
            <div className={cx('new_content_img')}>
              <img
                className={cx('new_content_image')}
                alt=""
                src="https://file.hstatic.net/200000366789/article/da-saffiano-la-gi_40841e57b85a4620a2d874ad44dae98f_medium.png"
              />
            </div>
            <div className={cx('new_text')}>
              <h4>CÁCH BẢO QUẢN ÁO KHOÁC DA KHI TRỜI NỒM, ẨM</h4>
              <div className={cx('icon_calendar')}>
                📆<span> 22/2/2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
