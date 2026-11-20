import { useSelector, useDispatch } from 'react-redux';
import { loginAdmin, logoutAdmin, checkAuth, clearError } from '../state/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login: (credentials) => dispatch(loginAdmin(credentials)),
    logout: () => dispatch(logoutAdmin()),
    verifySession: () => dispatch(checkAuth()),
    clearAuthError: () => dispatch(clearError()),
  };
};

export default useAuth;
