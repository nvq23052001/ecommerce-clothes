import classNames from 'classnames/bind';
import styles from './Order.module.css';
import { Orders } from '~/pages';
import ShipperSidebar from '../Layout/ShipperSidebar';
//constant status order
import { mappingShipperOrderChange } from '../../Admin/Order/constants';

const cx = classNames.bind(styles);
function OrderShipper() {
  return (
    <div className={cx('wrapper')}>
      <div className="AdminLayout">
        <ShipperSidebar />
        <div className="AdminMain">
          <div className="AdminContainer">
            <Orders listOrder={mappingShipperOrderChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderShipper;
