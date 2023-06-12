import './index.scss';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="AdminLayout">
        <AdminSidebar />
        <div className="AdminMain">
          <div className="AdminContainer">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
