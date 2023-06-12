import { DataTable } from 'components/common/dataTable';
import { apiUrls } from 'config/apis';
import React, { useEffect, useState } from 'react';
import { useApis } from 'services/api';

const Customer = () => {
  const { apiGet } = useApis();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState({ field: '', order_by: '' });

  const fieldsTable = {
    name: { label: 'Họ và tên', sort: 'asc' },
    email: { label: 'Email', sort: 'asc' },
    total_order: { label: 'Đơn hàng đã đặt ', sort: 'asc' },
    phone: { label: 'Số điện thoại', sort: 'asc' },
    createdAt: { label: 'Ngày gia nhập', type: 'date', sort: 'asc' },
    avatar: { label: 'Ảnh đại diện', type: 'avatar' }
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    apiGet(
      apiUrls.customerStatistic(),
      { sort_by: sort.field, order: sort.order_by },
      ({ data: { items }, status }) => {
        if (status) {
          setUsers(items);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <DataTable
      onChangeSort={setSort}
      pagination={{
        total: users.length,
        page,
        pageSize,
        onPageChange: handleChangePage,
        onPageSizeChange: setPageSize
      }}
      items={users}
      fields={fieldsTable}
    />
  );
};

export default Customer;
