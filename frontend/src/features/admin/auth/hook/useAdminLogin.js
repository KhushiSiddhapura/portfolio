import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginAdmin, clearError } from "../../../auth/state/authSlice";

export const useAdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onLogin = async (data) => {
    const result = await dispatch(
      loginAdmin({ email: data.email.trim(), password: data.password }),
    );
    if (loginAdmin.fulfilled.match(result)) {
      toast.success("Welcome back, Admin!");
      navigate("/admin");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    register,
    handleSubmit: handleSubmit(onLogin),
    errors,
    showPassword,
    toggleShowPassword,
    loading,
  };
};

export default useAdminLogin;
