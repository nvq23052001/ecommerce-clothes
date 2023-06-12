/* eslint-disable react-hooks/exhaustive-deps */
import { DataTable } from 'components/common/dataTable';
import InputSearch from 'components/common/input/InputSearch';
import { apiUrls } from 'config/apis';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useApis } from 'services/api';
import ModalFeedback from './ModalFeedback';
import { formatCompare } from 'utils/common';

const Feedback = () => {
  const [data, setData] = useState({ items: [] });
  const [search, setSearch] = useState('');
  const initData = useRef([]);
  const [modalFeedback, setModalFeedback] = useState({
    show: false,
    initialValues: {}
  });

  const [sort, setSort] = useState({ field: '', order_by: '' });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { apiGet } = useApis();

  const getFeedback = useCallback(() => {
    apiGet(apiUrls.adminFeedback(), { sort_by: sort.field, order: sort.order_by }, ({ data, status }) => {
      if (status) {
        setData({ items: data.items });
        initData.current = data.items;
      }
    });
  }, [sort]);

  useEffect(() => {
    getFeedback();
  }, [getFeedback]);

  useEffect(() => {
    const newData = initData.current.filter((item) => {
      const value1 = formatCompare(item.product.name);
      const value2 = formatCompare(search);
      return value1.includes(value2);
    });
    setData({ items: newData });
  }, [search]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const fieldsTable = {
    name: { label: 'Tên sản phẩm', style: { width: '15%' } },
    image: { label: 'Hình ảnh', style: { width: '15%' }, type: 'image' },
    actions: {
      type: 'actions',
      label: 'Thao tác',
      style: { width: '15%' },
      actions: [
        {
          icon: 'fa-eye',
          action: (item) => {
            setModalFeedback({
              ...modalFeedback,
              show: true,
              type: 'detail',
              initialValues: {
                id: item._id,
                name: item.name,
                image: item.image
              }
            });
          }
        }
      ]
    }
  };
  const { items = [] } = data;

  return (
    <div>
      <ModalFeedback
        {...modalFeedback}
        onClose={() => setModalFeedback({ ...modalFeedback, show: false })}
        onSuccess={() => getFeedback()}
      />
      <DataTable
        items={items.map((item) => item.product)}
        fields={fieldsTable}
        headerLeft={
          <>
            <InputSearch placeholder="Tìm kiếm" onSearch={setSearch} />
          </>
        }
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

export default Feedback;
