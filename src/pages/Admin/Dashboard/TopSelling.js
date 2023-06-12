import React, { useCallback, useEffect, useState } from 'react';
import { apiUrls } from 'config/apis';
import { useApis } from 'services/api';
import { DataTable } from 'components/common/dataTable';
import { Box, Card, CardHeader } from '@mui/material';
import CustomDatePicker from 'components/common/datePicker/DatePicker';
import moment from 'moment';

const today = new Date();
const aMonthAgo = new Date();
aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);

const defaultMinDate = new Date('01/01/2021');

const TopSelling = () => {
  const { apiGet } = useApis();
  const [products, setProducts] = useState([]);

  const [from, setFrom] = useState(aMonthAgo);
  const [to, setTo] = useState(today);

  const getData = useCallback(() => {
    apiGet(
      apiUrls.topSelling(),
      { start_date: moment(from).format('YYYY-MM-DD'), end_date: moment(to).format('YYYY-MM-DD') },
      ({ status, data }) => {
        if (status) {
          setProducts(data?.items.topSelling);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);
  useEffect(() => {
    getData();
  }, [getData]);

  const fieldsTable = {
    name: { label: 'Tên sản phẩm', style: { width: '10%' } },
    image: { style: { width: '12%' }, label: 'Ảnh', type: 'image' },
    purchase_price: { style: { width: '12%' }, label: 'Giá nhập', type: 'price' },
    price: { style: { width: '12%' }, label: 'Giá bán', type: 'price' },
    quantity: { style: { width: '8%' }, label: 'Số lượng' },
    profit: { style: { width: '12%' }, label: 'Lợi nhuận', type: 'price' }
  };
  return (
    <Card sx={{ mb: 3, mt: 3 }}>
      <div className="d-f ai-c jc-sb" style={{ padding: '10px 16px 0 8px' }}>
        <CardHeader
          title={'Top sản phẩm bán chạy'}
          sx={{
            '.MuiTypography-root': {
              fontSize: '1.6rem',
              fontWeight: 600
            }
          }}
        />
      </div>
      <div className="d-f ai-c" style={{ marginBottom: 12, marginLeft: 20 }}>
        <CustomDatePicker
          date={from}
          fullWidth={false}
          label="Từ ngày"
          setDate={setFrom}
          disableClear
          style={{ width: 110, marginRight: 12 }}
          minDate={defaultMinDate}
          maxDate={to || today}
        />
        <CustomDatePicker
          date={to}
          fullWidth={false}
          label="Đến ngày"
          setDate={setTo}
          disableClear
          style={{ width: 110 }}
          minDate={from || defaultMinDate}
          maxDate={today}
        />
      </div>
      <Box sx={{ px: 3, pb: 1 }} dir="ltr">
        <DataTable items={products} fields={fieldsTable} minWidth="100%" />
      </Box>
    </Card>
  );
};

export default TopSelling;
