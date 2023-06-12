import { DialogActions, DialogContent, FormControlLabel, Radio } from '@mui/material';
import Button from 'components/common/button/Button';
import { LoadingButton } from '@mui/lab';
import Input from 'components/common/input/Input';
import Modal from 'components/common/modal/Modal';
import { createRenderField } from 'components/common/renderField';
import UploadImage from 'components/common/uploadFile/UploadImage';
import { apiUrls } from 'config/apis';
import { uploadFileToServer } from 'config/constants';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApis } from 'services/api';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().trim().required('Tên hình thức không được để trống'),
  code: yup.string().trim().required('Mã hình thức không được để trống'),
  content: yup.string().trim().required('Nội dung không được để trống')
});

const RenderField = createRenderField({ labelWidth: 160, style: { minHeight: 40 } });

const ModalAddEditCategory = ({ show, type, initialValues, onClose, onSuccess }) => {
  const isUpdate = type === 'edit';

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { apiPost, apiPut } = useApis();

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
  const onSubmit = async ({ id, name, code, status, content }) => {
    setLoading(true);
    const urlImage = file && (await uploadFileToServer(file));
    (isUpdate ? apiPut : apiPost)(
      apiUrls.adminPayment(id),
      {
        name,
        status,
        code,
        image: !urlImage ? fileUrl : urlImage,
        content
      },
      ({ status, errors }) => {
        console.log(errors);
        if (status) {
          onClose?.();
          onSuccess?.();
          toast.success(`${id ? 'Sửa' : 'Thêm'} phương thức thanh toán thành công`);
        } else if (errors.code === 'already_exist_payment_code' && !id) {
          toast.error(`Mã hình thức thanh toán đã tồn tại`);
        }
        setLoading(false);
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    reset(initialValues);
    setFileUrl(initialValues.image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <Modal title={`${isUpdate ? 'Sửa' : 'Thêm'} hình thức thanh toán`} show={show} size="sm" close={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent style={{ paddingTop: 12 }}>
          <RenderField label="Tên hình thức" required>
            <Input {...register('name')} error={errors?.name?.message} />
          </RenderField>
          <RenderField label="Mã hình thức thanh toán" required>
            <Input {...register('code')} error={errors?.code?.message} />
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
          <RenderField label="Nội dung hình thức" required>
            <Input style={{ maxWidth: 600 }} multiline rows={2} {...register('content')} error={errors?.content?.message} />
          </RenderField>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            {'Hủy'}
          </Button>
          <LoadingButton loading={loading} variant="contained" type="submit" size="small">
            {isUpdate ? 'Sửa' : 'Thêm'}
          </LoadingButton>
        </DialogActions>
      </form>
    </Modal>
  );
};

export default ModalAddEditCategory;
