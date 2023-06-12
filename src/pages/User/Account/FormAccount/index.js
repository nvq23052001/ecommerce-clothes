import { yupResolver } from '@hookform/resolvers/yup';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { RenderField } from 'components/common/renderField';
import UploadImage from 'components/common/uploadFile/UploadImage';
import { apiUrls } from 'config/apis';
import { uploadFileToServer } from 'config/constants';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useApis } from 'services/api';
import * as yup from 'yup';
import style from './FormAccount.module.css';
import { toast } from 'react-toastify';
const cx = classNames.bind(style);

const schema = yup.object().shape({
  name: yup.string().trim().required('Tên không được để trống'),
  phone: yup.string().required('Số điện thoại không được để trống')
});
const FormAccount = () => {
  const changeImg = useRef(false);
  const { apiGet, apiPatch } = useApis();
  const [dataInfo, setDataInfo] = useState(null);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  useEffect(() => {
    apiGet(apiUrls.profile(), {}, ({ status, data }) => {
      if (status) {
        reset({
          ...data?.items
        });
        setFileUrl(data?.items.avatar);
      }
      setDataInfo(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = async (data) => {
    const urlImage = changeImg.current ? await uploadFileToServer(file) : fileUrl;
    apiPatch(apiUrls.chagneProfile(), {
      ...data,
      avatar: urlImage
    });
    toast.success('Sửa thông tin thành công');
  };
  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <div className={cx('title-top')}>
          <p>Chỉnh sửa thông tin cá nhân</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cx('content-form')}>
            <div className={cx('avt')}>
              <div></div>
              <div className={cx('camera')}>
                <Stack direction="row">
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <div>
                      <RenderField label="Ảnh" required />
                      <UploadImage
                        image={dataInfo?.avatar}
                        onSuccess={(file, url) => {
                          setFileUrl(url);
                          setFile(file);
                          changeImg.current = true;
                        }}
                        onRemove={() => {
                          setFileUrl('');
                          setFile(null);
                          changeImg.current = true;
                        }}
                      />
                    </div>
                  </IconButton>
                </Stack>
              </div>
            </div>
            <div className={cx('input-name')}>
              <p>Tên</p>
              <div className={cx('input-flex')}>
                <input
                  className={cx('data-input')}
                  defaultValue={dataInfo?.name}
                  {...register('name', { required: true })}
                  placeholder="Tên người dùng"
                  type="text"
                />
                <p className={cx('validate-input')}>{errors.name?.type === 'required' && 'Vui lòng nhập tên'}</p>
              </div>
            </div>
            <div className={cx('input-name')}>
              <p>Email</p>
              <div className={cx('input-flex')}>
                <input
                  className={cx('data-input')}
                  value={dataInfo?.email}
                  placeholder="examle@gmail.com"
                  type="email"
                  // disabled
                />
              </div>
            </div>
            <div className={cx('input-name')}>
              <p>Số điện thoại</p>
              <div className={cx('input-flex')}>
                <input
                  className={cx('data-input')}
                  defaultValue={dataInfo?.phone}
                  {...register('phone')}
                  placeholder="0*********"
                  type="number"
                  error={errors?.phone?.message}
                />

                <p className={cx('validate-input')}>
                  {errors.phone?.type === 'required' && 'Vui lòng điền số điện thoại'}
                </p>
              </div>
            </div>
          </div>
          <div className={cx('group-btn')}>
            <Link to={'/'}>
              <button className={cx('back')}>Quay lại</button>
            </Link>
            <button type="submit" className={cx('save')}>
              Lưu lại
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAccount;
