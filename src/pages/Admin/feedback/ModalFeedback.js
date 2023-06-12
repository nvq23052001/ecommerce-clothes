/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { DataTable } from 'components/common/dataTable';
import Modal from 'components/common/modal/Modal';
import { createRenderField } from 'components/common/renderField';
import { apiUrls } from 'config/apis';
import React, { useCallback, useEffect, useState } from 'react';
import { useApis } from 'services/api';

const RenderField = createRenderField({ labelWidth: 160, style: { minHeight: 40 } });

const ModalFeedback = ({ show, type, initialValues, onClose, onSuccess }) => {
  const isUpdate = type === 'detail';
  const [data, setData] = useState({ items: [] });
  const [sort, setSort] = useState({ field: '', order_by: '' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const { apiGet } = useApis();
  const getFeedback = useCallback(() => {
    apiGet(apiUrls.adminDetailFeedback(initialValues.id), {}, ({ data, status }) => {
      if (status) {
        setData({ items: data.items });
      }
    });
  }, [initialValues]);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    getFeedback();
  }, [getFeedback, show]);
  const fieldsTable = {
    content: { label: 'Nhận xét', style: { width: '15%' } },
    rating: { label: 'Đánh giá chất lượng', style: { width: '15%' } }
  };
  const { items = [] } = data;
  console.log(items);
  return (
    <>
      <Modal title={`Chi tiết feedback`} show={show} size="lg" close={onClose}>
        <DataTable
          items={items}
          fields={fieldsTable}
          onChangeSort={setSort}
          pagination={{
            total: items.length,
            page: page,
            pageSize,
            onPageChange: handleChangePage,
            onPageSizeChange: setPageSize
          }}
        />
      </Modal>
    </>
  );
};

export default ModalFeedback;
