/* eslint-disable react-hooks/exhaustive-deps */
import { DataTable } from 'components/common/dataTable';
import InputSearch from 'components/common/input/InputSearch';
import { apiUrls } from 'config/apis';
import React, { useCallback, useEffect, useState } from 'react';
import { useApis } from 'services/api';
import { defaultInitialValues } from './constants';
import ModalBanner from './ModalBanner';
import './index.scss';
import ModalConfirm from 'components/common/modal/ModalConfirm';
import { toast } from 'react-toastify';

const RenderStatus = ({ status }) => {
  const { background, text, label } = status
    ? { background: '#57ca22e0', text: '#fff', label: 'Hiển thị' }
    : { background: '#ff1943e0', text: '#fff', label: 'Ẩn' };

  return (
    <div className="d-f jc-c font-initial">
      <div className="RenderStatus" style={{ color: text, backgroundColor: background }}>
        {label}
      </div>
    </div>
  );
};

const Banner = () => {
  const [data, setData] = useState({ items: [] });
  const [modalBanner, setModalBanner] = useState({
    show: false,
    initialValues: defaultInitialValues,
    type: 'create'
  });
  const [modalConfirm, setModalConfirm] = useState({
    show: false,
    title: '',
    content: '',
    confirm: undefined,
    cancel: undefined
  });
  const [sort, setSort] = useState({ field: '', order_by: '' });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { apiGet, apiDelete } = useApis();

  // Lấy data Categories

  const getBanner = useCallback(() => {
    apiGet(apiUrls.adminBanner(), { sort_by: sort.field, order: sort.order_by }, ({ data, status }) => {
      if (status) {
        setData({ items: data.items });
      }
    });
  }, [sort]);

  useEffect(() => {
    getBanner();
  }, [getBanner]);

  const handleDeleteBanner = (id) => {
    apiDelete(apiUrls.adminBanner(id), {}, ({ status }) => {
      if (status) {
        toast.success('Xóa banner thành công');
        getBanner();
      } else {
        toast.error('Có lỗi xảy ra');
      }
    });
  };

  const hideModalConfirm = () => {
    setModalConfirm({ ...modalConfirm, show: false });
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const fieldsTable = {
    title: { label: 'Tiêu đề banner', style: { width: '15%' } },
    image: { label: 'Hình ảnh', style: { width: '15%' }, type: 'image' },
    link: { label: 'Link liên kết', style: { width: '15%' } },
    status: {
      label: 'Trạng thái',
      style: { width: '15%', textAlign: 'center' },
      renderContent: ({ status }) => <RenderStatus status={status} />,
      sort: 'asc'
    },
    actions: {
      type: 'actions',
      label: 'Thao tác',
      style: { width: '15%' },
      actions: [
        {
          icon: 'fa-pen',
          action: (item) => {
            setModalBanner({
              ...modalBanner,
              show: true,
              type: 'edit',
              initialValues: {
                id: item._id,
                status: item.status,
                image: item.image,
                title: item.title,
                link: item.link,
                description: item.description
              }
            });
          }
        },
        {
          icon: 'fa-trash',
          action: ({ _id }) => {
            setModalConfirm({
              show: true,
              title: 'Xóa banner',
              content: 'Bạn có chắc muốn xóa banner này?',
              confirm: {
                text: 'Xóa',
                action: () => {
                  handleDeleteBanner(_id);
                  hideModalConfirm();
                }
              },
              cancel: {
                text: 'Hủy',
                action: () => {
                  hideModalConfirm();
                }
              }
            });
          }
        }
      ]
    }
  };
  const { items = [] } = data;

  const handleDeleteMultiple = (ids) =>
    apiDelete(apiUrls.adminBanner('batch/destroy'), { ids: [...ids] }, ({ status }) => {
      if (status) {
        getBanner();
      } else {
        toast.error('Lỗi không xác định, vui lòng thử lại sau');
      }
    });

  return (
    <div>
      <ModalConfirm {...modalConfirm} small center />
      <ModalBanner
        {...modalBanner}
        onClose={() => setModalBanner({ ...modalBanner, show: false })}
        onSuccess={() => getBanner()}
      />
      <DataTable
        items={items}
        fields={fieldsTable}
        deleteMultipleItem={handleDeleteMultiple}
        allowMultiDeletion={true}
        headerLeft={
          <>
            <InputSearch placeholder="Tìm kiếm" />
          </>
        }
        createButton={{
          text: 'Thêm banner',
          action: () =>
            setModalBanner({ ...modalBanner, show: true, type: 'create', initialValues: defaultInitialValues })
        }}
        onChangeSort={setSort}
        pagination={{
          total: items.length,
          page: page,
          pageSize,
          onPageChange: handleChangePage,
          onPageSizeChange: setPageSize
        }}
      />
    </div>
  );
};

export default Banner;
