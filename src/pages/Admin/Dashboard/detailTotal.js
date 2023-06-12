import React from 'react';
import { useLocation } from 'react-router-dom';
import Orders from '../Order/Orders';

const DetailTotal = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  return (
    <div>
      <Orders filterByDashboard dashboardParams={location.state} />
    </div>
  );
};

export default DetailTotal;
