/*eslint-disable*/
import { yupResolver } from '@hookform/resolvers/yup';
import { Card } from '@mui/material';
import Button from 'components/common/button/Button';
import Input from 'components/common/input/Input';
import { createRenderField } from 'components/common/renderField';
import Select from 'components/common/select/Select';
import UploadImage from 'components/common/uploadFile/UploadImage';
import { apiUrls } from 'config/apis';
import { uploadFileToServer } from 'config/constants';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApis } from 'services/api';
import { validateTypingNumberFull } from 'utils/validation';
import * as yup from 'yup';
import { defaultInitialValues } from './constants';
import './index.scss';

const schema = yup.object().shape({
  name: yup.string().trim().required('Tên sản phẩm không được để trống'),
  category: yup.string().required(),
  price: yup.string().required('Giá bán không được để trống'),
  purchase_price: yup.string().required('Giá nhập không được để trống'),
  stock: yup.string().required('Số lượng không được để trống'),
  description: yup.string().required('Mô tả sản phẩm không được để trống')
});

const RenderField = createRenderField({ labelWidth: 160, style: { minHeight: 40 } });

const ProductAdd = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const { apiPost, apiGet, apiPatch } = useApis();
  const [listCategories, setListCategories] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const changeImg = useRef(false);

  const navigate = useNavigate();

  const isUpdate = !!id;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data) => {
    if (!file && !fileUrl) return;
    setLoading(true);
    const urlImage = changeImg.current ? await uploadFileToServer(file) : fileUrl;
    (isUpdate ? apiPatch : apiPost)(
      apiUrls.adminProducts(id),
      {
        ...data,
        image: urlImage
      },
      ({ status }) => {
        if (status) {
          toast.success(`${isUpdate ? 'Sửa' : 'Thêm'} sản phẩm thành công`);
          navigate('/admin/products');
          setLoading(false);
        } else {
          toast.error('Có lỗi xảy ra');
          setLoading(false);
        }
      }
    );
  };

  const getCategories = () => {
    apiGet(apiUrls.adminCategories(), {}, ({ data, status }) => {
      if (status) {
        setListCategories(
          data?.items?.map((i) => ({
            label: i.name,
            value: i._id
          }))
        );
      }
    });
  };

  useEffect(() => {
    if (isUpdate && id) {
      apiGet(apiUrls.adminProducts(id), {}, ({ status, data }) => {
        if (status) {
          const values = {
            name: data.items.name,
            category: data.items.category._id,
            price: data.items.price,
            purchase_price: data.items.purchase_price,
            stock: data.items.stock,
            description: data.items.description,
            image: data.items.image,
            promotion_price: data.items.promotion_price
          };
          reset(values);
          setFileUrl(data?.items.image);
        }
      });
    } else {
      reset(defaultInitialValues);
    }
    getCategories();
  }, []);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ProductAdd">
      <div className="ProductAdd-container">
        <div className="left">
          <Card sx={{ p: 3 }}>
            <RenderField label="Tên sản phẩm" required>
              <Input {...register('name')} fullWidth style={{ maxWidth: 600 }} error={errors?.name?.message} />
            </RenderField>
            <RenderField label="Danh mục" required>
              <div style={{ width: '100%' }}>
                <Select
                  fullWidth
                  selected={watch('category')}
                  setSelected={(value) => setValue('category', value)}
                  data={listCategories}
                  errorEmpty={isSubmitting}
                  error={'Danh mục không được để trống'}
                />
              </div>
            </RenderField>
            {!isUpdate && (
              <RenderField label="Giá nhập" required>
                <Input
                  isPrice
                  style={{ maxWidth: 600 }}
                  {...register('purchase_price')}
                  value={watch('purchase_price')}
                  onBlur={() => {
                    if (!watch('purchase_price')) {
                      setError('purchase_price', { message: 'Giá nhập không được để trống' });
                    } else {
                      setError('purchase_price', { message: '' });
                    }
                  }}
                  onChange={(e) => {
                    if (validateTypingNumberFull(e)) setValue('purchase_price', e?.target.value);
                  }}
                  error={errors?.purchase_price?.message}
                />
              </RenderField>
            )}
            <RenderField label="Giá bán" required>
              <Input
                isPrice
                style={{ maxWidth: 600 }}
                {...register('price')}
                value={watch('price')}
                onBlur={() => {
                  if (!watch('price')) {
                    setError('price', { message: 'Giá bán không được để trống' });
                  } else {
                    setError('price', { message: '' });
                  }
                }}
                onChange={(e) => {
                  if (validateTypingNumberFull(e)) {
                    setValue('price', e?.target.value);
                  }
                }}
                error={errors?.price?.message}
              />
            </RenderField>
            <RenderField label="Số lượng" required>
              <Input
                style={{ maxWidth: 600 }}
                value={watch('stock')}
                {...register('stock')}
                onBlur={() => {
                  if (!watch('stock')) {
                    setError('stock', { message: 'Số lượng không được để trống' });
                  } else {
                    setError('stock', { message: '' });
                  }
                }}
                onChange={(e) => {
                  if (validateTypingNumberFull(e)) setValue('stock', e?.target.value);
                }}
                error={errors?.stock?.message}
              />
            </RenderField>
            <RenderField label="Giá khuyến mãi (nếu có)">
              <Input
                isPrice
                style={{ maxWidth: 600 }}
                {...register('promotion_price')}
                value={watch('promotion_price')}
                onChange={(e) => {
                  if (validateTypingNumberFull(e)) setValue('promotion_price', e?.target.value);
                }}
              />
            </RenderField>

            <RenderField label="Mô tả sản phẩm" required>
              <Input
                style={{ maxWidth: 600 }}
                multiline
                rows={3}
                {...register('description')}
                error={errors?.description?.message}
              />
            </RenderField>
          </Card>
        </div>

        <div className="right">
          <Card sx={{ p: 3 }}>
            <div>
              <RenderField label="Ảnh" required />
              <UploadImage
                image={fileUrl}
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
                error={'Hình ảnh không được để trống'}
                errorEmpty={isSubmitting}
              />
            </div>
          </Card>
          <div className="ProductAdd-button">
            <Button size="small" onClick={() => navigate(-1)}>
              Trở lại
            </Button>
            <Button variant="contained" size="small" type="submit" loading={loading}>
              {isUpdate ? 'Sửa' : 'Thêm'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductAdd;
