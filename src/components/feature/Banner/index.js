import classNames from 'classnames/bind';
import { apiUrls } from 'config/apis';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useApis } from 'services/api';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import classes from './Banner.module.css';

const cx = classNames.bind(classes);

const BannerSlider = () => {
  const [banner, setBanner] = useState([]);
  const { apiGet } = useApis();

  const getBanner = () => {
    apiGet(apiUrls.banner(), {}, ({ data }) => {
      setBanner(data.items);
    });
  };

  useEffect(() => {
    getBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div>
      <Slider {...settings}>
        {banner.map((item, index) => {
          return (
            <div key={index}>
              <Link to={item.link} className={cx('banner__link')}>
                <img src={item.image} alt={item.title} className={cx('banner')} />
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default BannerSlider;
