import { apiUrls } from 'config/apis';
import routes from 'config/routes';
import { isAdmin, isCustomer, isShipper } from 'middlewares/auth';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApis } from 'services/api';
import useAuth from 'store/auth/hook';
import Loading from '../LoadingPage';
import { LOGOUT_EVENT_NAME } from 'constants/event-name';

const ShipperPrivate = ({ children }) => {
  const { apiGet } = useApis();
  const { user } = useAuth();
  const [responseUser, setResponseUser] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleLogout = (event) => {
    if (event.key === LOGOUT_EVENT_NAME) setResponseUser({});
  };

  useEffect(() => {
    if (user?.email && user?.accessToken) {
      setLoading(true);
      apiGet(apiUrls.profile(), '', ({ data }) => {
        if (data) {
          setResponseUser(data);
        }
      }).finally(() => setLoading(false));
    }

    window.addEventListener('storage', handleLogout);

    return () => window.removeEventListener('storage', handleLogout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (loading) {
    return <Loading />;
  }

  if (isShipper(responseUser)) {
    return children;
  }

  if (isAdmin(responseUser)) {
    return <Navigate to={routes.admin} />;
  }

  if (isCustomer(responseUser)) {
    return <Navigate to={routes.home} />;
  }

  return routes.shipperLogin;
};

export default ShipperPrivate;
