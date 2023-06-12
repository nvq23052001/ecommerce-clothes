import classNames from 'classnames/bind';

import styles from './OrderList.module.css';

const cx = classNames.bind(styles);
function OrderList({ tab, isTab, handleChangeTab }) {
  const handleTab = (status) => {
    handleChangeTab(status);
  };
  return (
    <li
      className={cx('order-item', { 'tab-active': isTab.includes(tab.status[0]) || isTab === tab.status })}
      onClick={() => handleTab(tab.status)}
    >
      {tab.title}
    </li>
  );
}

export default OrderList;
