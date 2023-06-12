/* eslint-disable react-hooks/exhaustive-deps */
import { DialogActions, DialogContent, FormControlLabel, Radio } from '@mui/material';
import Button from 'components/common/button/Button';
import Input from 'components/common/input/Input';
import Modal from 'components/common/modal/Modal';
import { createRenderField } from 'components/common/renderField';
import UploadImage from 'components/common/uploadFile/UploadImage';
import { apiUrls } from 'config/apis';
import { uploadFileToServer } from 'config/constants';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApis } from 'services/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  title: yup.string().trim().required('Tiêu đề không được để trống'),
  description: yup.string().trim().required('Mô tả không được để trống'),
  link: yup.string().trim().required('Link liên kết không được để trống')
});

const RenderField = createRenderField({ labelWidth: 160, style: { minHeight: 40 } });

const ModalBanner = ({ show, type, initialValues, onClose, onSuccess }) => {
  const isUpdate = type === 'edit';

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(initialValues.image);
  const { apiPost, apiPatch } = useApis();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const onSubmit = async ({ id, title, description, link, status }) => {
    if (!file && !fileUrl) return;
    setLoading(true);
    const urlImage = file && (await uploadFileToServer(file));
    (isUpdate ? apiPatch : apiPost)(
      apiUrls.adminBanner(id),
      {
        title,
        description,
        link,
        image: urlImage,
        status
      },
      ({ status }) => {
        if (status) {
          toast.success(`${isUpdate ? 'Sửa' : 'Thêm'} banner thành công`);
          onClose?.();
          onSuccess?.();
        } else {
          toast.error('Có lỗi xảy ra');
        }
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    reset(initialValues);
    setFileUrl(initialValues.image);
  }, [show]);

  return (
    <Modal title={`${isUpdate ? 'Sửa' : 'Thêm'} banner`} show={show} size="sm" close={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent style={{ paddingTop: 12 }}>
          <RenderField label="Tiêu đề" required>
            <Input {...register('title')} error={errors?.title?.message} />
          </RenderField>
          <RenderField label="Mô tả cho banner" required>
            <Input {...register('description')} error={errors?.description?.message} />
          </RenderField>
          <RenderField label="Link liên kết" required>
            <Input {...register('link')} error={errors?.link?.message} />
          </RenderField>
          <RenderField label={'Trạng thái'} required>
            <div className="d-f">
              <FormControlLabel
                control={<Radio checked={watch('status') === 1} onClick={() => setValue('status', 1)} />}
                label="Hiển thị"
              />
              <FormControlLabel
                control={<Radio checked={watch('status') === 0} onClick={() => setValue('status', 0)} />}
                label="Ẩn"
              />
            </div>
          </RenderField>
          <RenderField label="Ảnh" register>
            <UploadImage
              image={fileUrl}
              onSuccess={(file, url) => {
                setFileUrl(url);
                setFile(file);
              }}
              onRemove={() => {
                setFileUrl('');
                setFile(null);
              }}
              error={'Ảnh không được để trống'}
              errorEmpty={isSubmitting}
            />
          </RenderField>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            {'Hủy'}
          </Button>
          <Button type="submit" variant="contained" color="primary" loading={loading}>
            {isUpdate ? 'Sửa' : 'Thêm'}
          </Button>
        </DialogActions>
      </form>
    </Modal>
  );
};

export default ModalBanner;
