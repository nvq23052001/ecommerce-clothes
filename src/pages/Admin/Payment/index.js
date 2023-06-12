import { DataTable } from 'components/common/dataTable';
import InputSearch from 'components/common/input/InputSearch';
import { apiUrls } from 'config/apis';
import React, { useCallback, useEffect, useState } from 'react';
import { useApis } from 'services/api';
import { defaultInitialValues } from './constants';
import ModalAddEditCategory from './ModalAddEditPayment';
import '../categories/index.scss';
import ModalConfirm from 'components/common/modal/ModalConfirm';
import { useRef } from 'react';
import { formatCompare } from 'utils/common';
import { toast } from 'react-toastify';

const Payment = () => {
  const [data, setData] = useState({ items: [] });
  const [modalPayment, setModalPayment] = useState({
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

  const [search, setSearch] = useState('');
  const initData = useRef([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { apiGet, apiDelete, apiPut } = useApis();

  const RenderStatus = ({ items }) => {
    const { background, text, label } = items.status
      ? { background: '#57ca22e0', text: '#fff', label: 'Hiển thị' }
      : { background: '#ff1943e0', text: '#fff', label: 'Ẩn' };
    const changeStatus = async () => {
      delete items.slug;
      delete items.createdAt;
      delete items.updatedAt;
      delete items.number;
      const params = { ...items, status: items.status === 1 ? 0 : 1 };
      apiPut(apiUrls.updatePayment(items._id), params, ({ status }) => {
        if (status) {
          getPayment();
          toast.success('Thay đổi trạng thái thành công');
        } else {
          toast.error('Thay đổi trạng thái thất bại');
        }
      });
    };
    return (
      <div className="d-f jc-c font-initial" onClick={changeStatus}>
        <div className="RenderStatus" style={{ color: text, backgroundColor: background, cursor: 'pointer' }}>
          {label}
        </div>
      </div>
    );
  };

  // Lấy data Categories

  const getPayment = useCallback(() => {
    apiGet(apiUrls.getAdminPayment(), {}, ({ data, status }) => {
      if (status) {
        setData({ items: data.items });
        initData.current = data.items;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    getPayment();
  }, [getPayment]);

  const handleDeletePayment = (items) => {
    console.log(items);
    apiDelete(apiUrls.deletePayment(items._id), {}, ({ status }) => {
      if (status) {
        toast.success(`Xóa phương thức thanh toán ${items.name} thành công`);
        getPayment();
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
    code: { label: 'Mã hình thức', style: { width: '15%' }, sort: 'asc' },
    name: { label: 'Tên hình thức', style: { width: '15%' }, sort: 'asc' },
    image: { label: 'Hình ảnh', style: { width: '15%' }, type: 'image' },
    status: {
      label: 'Trạng thái',
      style: { width: '15%', textAlign: 'center' },
      renderContent: (items) => <RenderStatus items={items} />,
      action: (record) => {
        console.log(record);
      },
      sort: 'asc'
    },
    content: { style: { width: '15%' }, label: 'Nội dung', sort: 'asc' },
    actions: {
      type: 'actions',
      label: 'Thao tác',
      style: { width: '15%' },
      actions: [
        {
          icon: 'fa-pen',
          action: (item) => {
            setModalPayment({
              ...modalPayment,
              show: true,
              type: 'edit',
              initialValues: {
                id: item._id,
                status: item.status,
                image: item.image,
                name: item.name,
                content: item.content,
                code: item.code
              }
            });
          }
        },
        {
          icon: 'fa-trash',
          action: (items) => {
            setModalConfirm({
              show: true,
              title: 'Xóa danh mục',
              content: 'Bạn có chắc muốn xóa hình thức này?',
              confirm: {
                text: 'Xóa',
                action: () => {
                  handleDeletePayment(items);
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

  useEffect(() => {
    const newData = initData.current.filter((item) => {
      const value1 = formatCompare(item.code);
      const value2 = formatCompare(item.name);
      const valueSearch = formatCompare(search);
      return value1.includes(valueSearch) || value2.includes(valueSearch) ;
    });
    setData({ items: newData });
  }, [search]);

  const { items = [] } = data;

  return (
    <div>
      <ModalConfirm {...modalConfirm} small center />
      <ModalAddEditCategory
        {...modalPayment}
        onClose={() => setModalPayment({ ...modalPayment, show: false })}
        onSuccess={() => getPayment()}
      />
      <DataTable
        items={items}
        fields={fieldsTable}
        headerLeft={
          <>
            <InputSearch placeholder="Tìm kiếm" onSearch={setSearch} />
          </>
        }
        createButton={{
          text: 'Thêm hình thức thanh toán',
          action: () =>
            setModalPayment({ ...modalPayment, show: true, type: 'create', initialValues: defaultInitialValues })
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

export default Payment;
