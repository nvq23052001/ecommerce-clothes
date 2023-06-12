import React, { useState } from 'react';
import { Avatar, Box, Button, Stack } from '@mui/material';
import { DEFAULT_AVATAR } from '~/config/constants';
import NavSection from '../../Admin/layout/NavSection';
import Scrollbar from 'components/common/scrollbar/Scrollbar';
import ChangePassword from '../../Admin/auth/ChangePassword';
import useAuth from 'store/auth/hook';
import { useNavigate } from 'react-router-dom';
import routes from 'config/routes';

import { useSelector } from 'react-redux';

const AdminSidebar = () => {
  const nameUser = useSelector((state) => state.auth.user.name);
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
      title: 'Quản lí đơn hàng',
      icon: 'fas fa-shopping-cart',
      path: routes.shipperOrder
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
        navigate(routes.shipperLogin);
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
          <h3>Xin chào, {nameUser}</h3>
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
