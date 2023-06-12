export const STATUS = {
  ALL: 'all',
  PENDING: '0',
  CONFIRMED: '1',
  PROCESSING: '2',
  PICKED: '3',
  DELIVERING: '4',
  FAIL: '5',
  SUCCESS: '6',
  CANCELED: '7',
  RETURN: '8'
};

export const { ALL, PENDING, CONFIRMED, PROCESSING, DELIVERING, DELIVERED, SUCCESS, CANCELED, PICKED, FAIL, RETURN } =
  STATUS;

export const mappingAdminOrderStatus = {
  [ALL]: 'Tất cả đơn hàng',
  [PENDING]: 'Chờ xác nhận',
  [CONFIRMED]: 'Đã xác nhận',
  [PROCESSING]: 'Đang xử lý',
  [PICKED]: 'Đã lấy hàng',
  [DELIVERING]: 'Đang giao',
  [FAIL]: 'Giao hàng thất bại',
  [SUCCESS]: 'Giao hàng thành công',
  [CANCELED]: 'Đã hủy',
  [RETURN]: 'Trả hàng'
};

export const mappingAdminOrderStatusColor = {
  [PENDING]: { background: '#ff2744f0', text: '#fff', border: '#ff2744f0' },
  [CONFIRMED]: { background: '#2196f3', text: '#fff', border: '#2196f3' },
  [PROCESSING]: { background: '#5569ff', text: '#fff', border: '#5569ff' },
  [PICKED]: { background: '#5569fc', text: '#fff', border: '#5569fc' },
  [DELIVERING]: { background: '#5569ff', text: '#fff', border: '#5569ff' },
  [FAIL]: { background: '#FF3333', text: '#fff', border: '#FF3333' },
  [SUCCESS]: { background: '#57ca22dd', text: '#fff', border: '#57ca22' },
  [CANCELED]: { background: '#a1887f', text: '#fff', border: '#a1887f' },
  [RETURN]: { background: '#00E5EE', text: '#fff', border: '#00E5EE' }
};

export const mappingAdminOrderChange = {
  [PENDING]: [CONFIRMED, PROCESSING],
  [CONFIRMED]: [PROCESSING],
  [PROCESSING]: [],
  [DELIVERING]: [],
  [CANCELED]: []
};

export const mappingShipperOrderChange = {
  [CONFIRMED]: [PROCESSING],
  [PROCESSING]: [PICKED],
  [PICKED]: [DELIVERING],
  [DELIVERING]: [SUCCESS, FAIL],
  [FAIL]: [RETURN],
  [CANCELED]: []
};

export const listAdminOrderStatuses = [
  {
    label: 'Tất cả đơn hàng',
    value: 'ALL'
  },
  {
    label: 'Chờ xác nhận',
    value: 'PENDING'
  },
  {
    label: 'Đã xác nhận',
    value: 'CONFIRMED'
  },
  {
    label: 'Đang xử lý',
    value: 'PROCESSING'
  },
  { label: 'Đã lấy hàng', value: 'PICKED' },
  {
    label: 'Đang giao',
    value: 'DELIVERING'
  },
  { label: 'Giao hàng thất bại', value: 'FAIL' },
  {
    label: 'Giao hàng thành công',
    value: 'SUCCESS'
  },
  {
    label: 'Đã hủy',
    value: 'CANCELLED'
  },
  {
    label: 'Trả hàng',
    value: 'RETURN'
  }
];
