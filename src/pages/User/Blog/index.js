import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Blog.module.css';
import background from '~/assets/images/background-contact.jpg';
import { Link } from 'react-router-dom';
import { apiUrls } from 'config/apis';
import { useApis } from 'services/api';
import { ArrowForward, CalendarToday } from '@material-ui/icons';
import routes from 'config/routes';
const cx = classNames.bind(styles);
const Blog = () => {
  const { apiGet } = useApis();
  const [blogs, setBlogs] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getBlog = () => {
    apiGet(apiUrls.listBlogs(), {}, ({ data }) => {
      setBlogs(data.items);
    });
  };
  useEffect(() => {
    getBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={cx('container')}>
      <div style={{ backgroundImage: `url(${background})` }} className={cx('background')}></div>
      <div className={cx('background-content')}>
        <h2 className={cx('title-content')}>TIN TỨC</h2>
        <div className={cx('text-content')}>
          <Link to={routes.home}>Trang chủ</Link>
          <div>/</div>
          <p>Tin Tức</p>
        </div>
      </div>
      <div className={cx('main')}>
        <h1>TIN TỨC</h1>
        <hr />
        {blogs?.map((item, index) => (
          <div key={index}>
            <div className={cx('blog')}>
              <div className={cx('blog_img')}>
                <img className={cx('blog_image')} alt="" src={item.image} />
              </div>
              <div className={cx('blog_content')}>
                <h2>{item.title}</h2>
                <div className={cx('blog_content_icon')}>
                  <div className={cx('icon_calendar')}>
                    <CalendarToday /> <span> {item.createdAt}</span>
                  </div>
                </div>
                <p>
                  Áo khoác da là một trong những món đồ thời trang cao cấp phổ biến và được yêu thích nhất. Tuy nhiên,
                  không phải ai cũng biết và hiểu được tầm quan trọng của việc vệ sinh bảo quản áo da đúng cách, đặc
                  biệt là khi thời tiết nồm, ẩm khiến áo da dễ bị nấm, mốc. Nồm là gì? Nguyên nhân khiến áo da...
                </p>
                <div className={cx('icon')}>
                  <span>{item.content}</span>
                </div>
                <div className={cx('detail')}>
                  <Link to={`/blog/${item._id}`}>Xem thêm</Link> <ArrowForward />
                </div>
              </div>
            </div>
          </div>
        ))}
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

export default Blog;
