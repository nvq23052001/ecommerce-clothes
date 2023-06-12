import { useSelector } from 'react-redux';
import { useToasts } from 'store/toasts';
import Toast from './Toast';

const ToastContainer = () => {
  const toasts = useSelector((state) => state.toasts);
  const { removeToast } = useToasts();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.key} onClose={() => removeToast(toast.key)} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
