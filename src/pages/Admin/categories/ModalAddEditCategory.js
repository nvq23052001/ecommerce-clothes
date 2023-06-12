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
  name: yup.string().trim().required('Tên danh mục không được để trống')
});

const RenderField = createRenderField({ labelWidth: 160, style: { minHeight: 40 } });

const ModalAddEditCategory = ({ show, type, initialValues, onClose, onSuccess }) => {
  const isUpdate = type === 'edit';

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const { apiPost, apiPut } = useApis();
  const [loading,setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors,isSubmitting }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const onSubmit = async ({ id, name, status }) => {
    if (!file && !fileUrl) return;
    setLoading(true)
    const urlImage = file && (await uploadFileToServer(file));
    (isUpdate ? apiPut : apiPost)(
      apiUrls.adminCategories(id),
      {
        name,
        status,
        image: !urlImage ? fileUrl : urlImage
      },
      ({ status }) => {
        if (status) {
          toast.success(`${isUpdate ? 'Sửa' : 'Thêm'} danh mục thành công`)
          setLoading(false)
          onClose?.();
          onSuccess?.();
        }
      }
    );
  };

  useEffect(() => {
    reset(initialValues);
    setFileUrl(initialValues.image);
  }, [initialValues, reset, show]);

  return (
    <Modal title={`${isUpdate ? 'Sửa' : 'Thêm'} danh mục`} show={show} size="sm" close={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent style={{ paddingTop: 12 }}>
          <RenderField label="Tên danh mục" required>
            <Input {...register('name')} error={errors?.name?.message} />
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
          <RenderField label="Ảnh" required>
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

export default ModalAddEditCategory;
