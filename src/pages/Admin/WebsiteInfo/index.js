import styles from './websiteInfo.module.css';
import classNames from 'classnames/bind';
import { useApis } from 'services/api';
import { apiUrls } from 'config/apis';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadFileToServer } from 'config/constants';
import UploadImage from 'components/common/uploadFile/UploadImage';

const cx = classNames.bind(styles);

const WebsiteInfo = () => {
  const { register, handleSubmit, reset } = useForm();
  const { apiGet, apiPut } = useApis();
  const [file, setFile] = useState(null);
  const [infor, setInfor] = useState([]);
  const [inputValue, setInputValue] = useState(infor);

  const getInfor = () => {
    apiGet(apiUrls.adminWebsiteInfo(), {}, ({ data }) => {
      setInfor(data.items);
      setInputValue(data.items);
    });
  };

  const onSubmit = async (data) => {
    const urlImage = await uploadFileToServer(file);
    apiPut(
      apiUrls.adminWebsiteInfo(),
      {
        ...data,
        image: urlImage
      },
      (data) => {}
    );
  };

  useEffect(() => {
    getInfor();
    reset(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div className={cx('website-info')}>
        <div className={cx('form-website-info')}>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <div className={cx('input-website-info')}>
              <label htmlFor="logo" className={cx('label-website-info')}>
                Logo
              </label>
              <div className={cx('avatar-upload')}>
                <UploadImage
                  image={inputValue.image}
                  onSuccess={(file) => {
                    setFile(file);
                  }}
                  onRemove={() => {
                    setFile(null);
                  }}
                />
              </div>
            </div>
            <div className={cx('input-website-info')}>
              <label htmlFor="name" className={cx('label-website-info')}>
                Tên cửa hàng
              </label>
              <input {...register('name')} type="text" name="name" className={cx('input-web-info')} />
            </div>
            <div className={cx('input-website-info')}>
              <label htmlFor="phone" className={cx('label-website-info')}>
                Số điện thoại
              </label>
              <input {...register('phone')} type="text" name="phone" className={cx('input-web-info')} />
            </div>
            <div className={cx('input-website-info')}>
              <label htmlFor="email" className={cx('label-website-info')}>
                Social media
              </label>
              <input {...register('socialMedia')} type="text" id="socialMedia" className={cx('input-web-info')} />
            </div>

            <div className={cx('input-website-info formbold-pt-3')}>
              <label className={cx('label-website-info label-website-info-2')}>Địa chỉ</label>
              <div className={cx('flex flex-wrap formbold--mx-3')}>
                <div className={cx('w-full sm:w-half formbold-px-3')}>
                  <div className={cx('input-website-info')}>
                    <input
                      {...register('address')}
                      type="text"
                      name="address"
                      id="address"
                      className={cx('input-web-info')}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button type="submit" className={cx('button-website-info')}>
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WebsiteInfo;
