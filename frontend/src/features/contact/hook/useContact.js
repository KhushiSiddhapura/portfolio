import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import contactApi from "../api/contactApi";
import { initialContactFormState } from "../state/contactState";

export const useContact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialContactFormState,
  });

  const onSend = async (data) => {
    try {
      const res = await contactApi.sendMessage(data);
      toast.success(res.message || "Message sent successfully!");
      reset();
      return true;
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to send message. Please try again.",
      );
      return false;
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSend),
    errors,
    loading: isSubmitting,
    reset,
  };
};

export default useContact;
