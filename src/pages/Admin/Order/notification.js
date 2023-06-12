import { STATUS } from './constants';
import { toast } from 'react-toastify';

const { CONFIRMED, PROCESSING, DELIVERED, DELIVERING, CANCELED } = STATUS;

const notification = ({ order_code, status }) => {
  const order = `Đơn hàng ${order_code} của bạn`;
  switch (status) {
    case CANCELED:
      toast.error(`${order} đã bị huỷ`);
      break;
    case CONFIRMED:
      toast.success(`${order} đã được xác nhận thành công`);
      break;
    case PROCESSING:
      toast.success(`${order} đã bàn giao cho đơn vị vận chuyển, chúng tôi sẽ giao cho bạn trong thời gian sớm nhất`);
      break;
    case DELIVERED:
      toast.success(`${order} đã giao thành công`);
      break;
    case DELIVERING:
      toast.success(`${order} đang được giao tới bạn`);
      break;
    default:
      break;
  }
};

export default notification;
