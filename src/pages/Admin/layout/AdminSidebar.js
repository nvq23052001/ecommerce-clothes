import React, { useState } from 'react';
import { Avatar, Box, Button, Stack } from '@mui/material';
import { DEFAULT_AVATAR } from '~/config/constants';
import NavSection from './NavSection';
import Scrollbar from 'components/common/scrollbar/Scrollbar';
import ChangePassword from '../auth/ChangePassword';
import useAuth from 'store/auth/hook';
import { useNavigate } from 'react-router-dom';
import routes from 'config/routes';

const AdminSidebar = () => {
  const [open, setOpen] = useState(true);
  const { signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setOpen(!open);

  const handelChangePassword = () => {
    setShowModal(true);
  };

  const sidebarConfig = [
    {
      title: 'Thống kê',
      icon: 'fas fa-chart-line',
      path: routes.admin
    },
    {
      title: 'Quản lí đơn hàng',
      icon: 'fas fa-shopping-cart',
      path: routes.adminOrders
    },
    {
      title: 'Quản lí sản phẩm',
      icon: 'fas fa-newspaper',
      path: routes.productAdmin
    },
    {
      title: 'Quản lí danh mục',
      icon: 'fas fa-list-ul',
      path: routes.categoryAdmin
    },
    {
      title: 'Khách hàng',
      path: routes.customerStatistic,
      icon: 'fas fa-user'
    },
    {
      title: 'Quản lí banner',
      icon: 'fas fa-home',
      path: routes.adminBanner
    },
    {
      title: 'Quản lí hình thức thanh toán',
      icon: 'fa fa-credit-card',
      path: routes.paymentManagement
    },
    {
      title: 'Quản lí feedback',
      icon: 'fas fa-home',
      path: routes.adminFeedback
    },
    {
      title: 'Đổi mật khẩu',
      icon: 'fas fa-key',
      onClick: () => handelChangePassword()
    },
    {
      title: 'Đăng xuất',
      icon: 'fas fa-sign-out-alt',
      onClick: () => {
        signOut();
        navigate(routes.login);
      }
    }
  ];

  const renderContent = (
    <Scrollbar className={`AdminSidebar-scroll${!open ? ' disabled' : ''}`}>
      <Box sx={{ px: 2.5, py: 3 }}></Box>

      <Box sx={{ mb: 1, mx: 2.5 }}>
        <Stack alignItems="center" sx={{ mb: 3 }}>
          <Avatar src={DEFAULT_AVATAR} className="AdminSidebar-avatar" />
        </Stack>

        <Stack alignItems="center">
          <h3>Admin</h3>
        </Stack>
      </Box>

      <NavSection open={open} handleCloseSidebar={() => setOpen(false)} navConfig={sidebarConfig} isMobile={false} />
    </Scrollbar>
  );

  return (
    <>
      <ChangePassword show={showModal} onClose={() => setShowModal(false)} />
      <div className={`AdminSidebar${open ? ' open' : ' close'}`}>
        <div className="AdminSidebar-wrapper">
          <div className="AdminSidebar-collapse">
            <Button color="primary" variant="contained" onClick={toggleSidebar}>
              <i className={`fas fa-chevron-${open ? 'left' : 'right'}`} />
            </Button>
          </div>
          {renderContent}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
