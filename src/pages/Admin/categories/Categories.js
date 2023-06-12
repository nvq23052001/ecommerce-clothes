import { DataTable } from 'components/common/dataTable';
import InputSearch from 'components/common/input/InputSearch';
import ModalConfirm from 'components/common/modal/ModalConfirm';
import { apiUrls } from 'config/apis';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useApis } from 'services/api';
import { formatCompare } from 'utils/common';
import ModalAddEditCategory from './ModalAddEditCategory';
import { defaultInitialValues } from './constants';
import './index.scss';

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

const Categories = () => {
  const [data, setData] = useState({ items: [] });
  const [modalCategory, setModalCategory] = useState({
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
  const { apiGet, apiDelete } = useApis();

  // Lấy data Categories

  const getCategories = useCallback(() => {
    apiGet(apiUrls.adminCategories(), { sort_by: sort.field, order: sort.order_by }, ({ data, status }) => {
      if (status) {
        setData({ items: data.items });
        initData.current = data.items;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleDeleteCategory = (id) => {
    apiDelete(apiUrls.adminCategories(id), {}, ({ status }) => {
      if (status) {
        toast.success('Xóa danh mục thành công');
        getCategories();
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
    name: { label: 'Tên danh mục', style: { width: '15%' }, sort: 'asc' },
    image: { label: 'Hình ảnh', style: { width: '15%' }, type: 'image' },
    products_count: { label: 'Số lượng sản phẩm', style: { width: '15%' } },
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
            setModalCategory({
              ...modalCategory,
              show: true,
              type: 'edit',
              initialValues: { id: item._id, status: item.status, image: item.image, name: item.name }
            });
          }
        },
        {
          icon: 'fa-trash',
          action: ({ _id }) => {
            setModalConfirm({
              show: true,
              title: 'Xóa danh mục',
              content: 'Bạn có chắc muốn xóa danh mục này?',
              confirm: {
                text: 'Xóa',
                action: () => {
                  handleDeleteCategory(_id);
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

  const handleDeleteMultiple = (ids) =>
    apiDelete(apiUrls.adminCategories('batch/destroy'), { ids: [...ids] }, ({ status }) => {
      if (status) {
        getCategories();
      } else {
        toast.error('Lỗi không xác định, vui lòng thử lại sau');
      }
    });

  useEffect(() => {
    const newData = initData.current.filter((item) => {
      const value1 = formatCompare(item.name);
      const value2 = formatCompare(search);
      return value1.includes(value2);
    });
    setData({ items: newData });
  }, [search]);

  const { items = [] } = data;

  return (
    <div>
      <ModalConfirm {...modalConfirm} small center />
      <ModalAddEditCategory
        {...modalCategory}
        onClose={() => setModalCategory({ ...modalCategory, show: false })}
        onSuccess={() => getCategories()}
      />
      <DataTable
        items={items}
        deleteMultipleItem={handleDeleteMultiple}
        fields={fieldsTable}
        headerLeft={
          <>
            <InputSearch placeholder="Tìm kiếm" onSearch={setSearch} />
          </>
        }
        allowMultiDeletion={true}
        createButton={{
          text: 'Thêm danh mục',
          action: () =>
            setModalCategory({ ...modalCategory, show: true, type: 'create', initialValues: defaultInitialValues })
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

export default Categories;
