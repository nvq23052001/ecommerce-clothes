/*eslint-disable*/
// Socket IO
import { connect } from 'socket.io-client';

// hooks
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import { DataTable } from 'components/common/dataTable';
import InputSearch from 'components/common/input/InputSearch';
import ModalConfirm from 'components/common/modal/ModalConfirm';

// using API
import { useApis } from 'services/api';
import { apiUrls } from 'config/apis';
import ChangeOrderStatus from './ChangeOrderStatus';

// List status
import { mappingAdminOrderChange } from './constants';

// utils
import currency from 'utils/currency';

// styles
import './index.scss';
import Select from 'components/common/select/Select';
import { listAdminOrderStatuses } from './constants';
import { formatCompare } from 'utils/common';

const Orders = ({ listOrder = mappingAdminOrderChange, filterByDashboard, dashboardParams }) => {
  const navigate = useNavigate();
  const { apiGet, apiPut } = useApis();
  const [data, setData] = useState([]);
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
  const socketRef = useRef();
  const [orderStatus, setOrderStatus] = useState('ALL');

  const [search, setSearch] = useState('');
  const initData = useRef([]);

  useEffect(() => {
    socketRef.current = connect(process.env.REACT_APP_API_URL);
    return () => socketRef.current.disconnect();
  }, []);

  const getData = useCallback(() => {
    apiGet(
      apiUrls.adminOrders(),
      !filterByDashboard
        ? {
            sort_by: sort.field,
            order: sort.order_by,
            status: orderStatus === 'ALL' ? undefined : orderStatus.toLowerCase()
          }
        : {
            sort_by: sort.field,
            order: sort.order_by,
            status: 'success',
            ...dashboardParams
          },
      ({ status, data }) => {
        if (status) {
          const newData = data?.items.map((item) => ({
            ...item,
            status: item.status || 1,
            note: item.note || ''
          }));
          setData(newData);
          initData.current = newData;
        }
      }
    );
  }, [sort, orderStatus]);

  useEffect(() => {
    getData();
  }, [getData]);

  const pushNotification = (data) => {
    socketRef.current.emit('notification', data);
  };

  const updateStatus = (id, status) => {
    apiPut(apiUrls.adminOrders(id), { status }, ({ status, data: { items } }) => {
      if (status) {
        const { user, order_code, status } = items;
        pushNotification({ user, order_code, status });
        getData();
      }
    });
  };

  const fieldsTable = {
    order_code: { label: 'Mã đơn hàng', style: { width: '14%' } },
    payment_method: { style: { width: '8%' }, label: 'Phương thức thanh toán', type: 'payment_method', sort: 'asc' },
    total: {
      style: { width: '12%', textAlign: 'center' },
      label: 'Tổng tiền',
      renderContent: ({ total }) => currency(total),
      sort: 'asc'
    },
    status: {
      style: { width: '17%' },
      label: 'Trạng thái',
      renderContent: (item) => {
        return (
          <ChangeOrderStatus
            paymentMethod={item.payment_method}
            status={item?.status}
            onChangeStatus={(s) => updateStatus(item._id, s)}
            listOrder={listOrder}
          />
        );
      },
      sort: filterByDashboard ? undefined : 'asc'
    },
    createdAt: { label: 'Ngày tạo', style: { width: '10%' }, type: 'date', sort: 'asc' },
    actions: {
      type: 'actions',
      label: 'Thao tác',
      style: { width: '10%' },
      actions: [
        {
          icon: 'fa-eye',
          action: ({ _id }) => navigate(`/admin/orders/${_id}`)
        }
      ]
    }
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const newData = initData.current.filter((item) => {
      const value1 = formatCompare(item.order_code);
      const value2 = formatCompare(search);
      return value1.includes(value2);
    });
    setData(newData);
  }, [search]);

  return data ? (
    <div>
      <ModalConfirm {...modalConfirm} small center />
      <DataTable
        items={data}
        fields={fieldsTable}
        headerLeft={
          <>
            <InputSearch placeholder="Tìm kiếm" onSearch={setSearch} />
            {!filterByDashboard && (
              <Select
                style={{ minWidth: 200 }}
                label="Trạng thái đơn hàng"
                selected={orderStatus}
                setSelected={setOrderStatus}
                data={listAdminOrderStatuses}
                hideSelected
              />
            )}
          </>
        }
        onChangeSort={setSort}
        pagination={{
          total: data.length,
          page: page,
          pageSize,
          onPageChange: handleChangePage,
          onPageSizeChange: setPageSize
        }}
      />
    </div>
  ) : null;
};

export default Orders;
