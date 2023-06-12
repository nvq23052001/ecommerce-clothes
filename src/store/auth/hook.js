import { useDispatch, useSelector } from 'react-redux';
import { signOut, updateAuth } from '.';
import { LOGOUT_EVENT_NAME } from 'constants/event-name';

export default function useAuth() {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.auth);
  return {
    ...authReducer,
    isAuth: !!authReducer?.user?.email,
    signOut: () => {
      dispatch(signOut());
      window.localStorage.setItem(LOGOUT_EVENT_NAME, Date.now().toString());
    },
    updateAuth: (payload) => dispatch(updateAuth(payload))
  };
}
