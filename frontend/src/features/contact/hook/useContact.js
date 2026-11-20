import { useState } from 'react';
import { toast } from 'react-toastify';
import contactApi from '../api/contactApi';
import { initialContactFormState } from '../state/contactState';

export const useContact = () => {
  const [form, setForm] = useState(initialContactFormState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please complete all required fields.');
      return false;
    }

    setLoading(true);
    try {
      const res = await contactApi.sendMessage(form);
      toast.success(res.message || 'Message sent successfully!');
      setForm(initialContactFormState);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    loading,
    handleSubmit,
  };
};

export default useContact;
