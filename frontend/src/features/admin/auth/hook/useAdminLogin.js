import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginAdmin, clearError } from '../../../auth/state/authSlice';
import { initialAdminLoginState } from '../state/adminAuthState';

export const useAdminLogin = () => {
  const [credentials, setCredentials] = useState(initialAdminLoginState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!credentials.email.trim() || !credentials.password) {
      toast.error('Please enter both email and password');
      return;
    }
    const result = await dispatch(
      loginAdmin({ email: credentials.email.trim(), password: credentials.password })
    );
    if (loginAdmin.fulfilled.match(result)) {
      toast.success('Welcome back, Admin!');
      navigate('/admin');
    }
  };

  const toggleShowPassword = () => {
    setCredentials((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  return {
    credentials,
    setCredentials,
    toggleShowPassword,
    loading,
    handleSubmit,
  };
};

export default useAdminLogin;
