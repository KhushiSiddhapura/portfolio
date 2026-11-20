import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import adminResumeApi from '../api/adminResumeApi';

export const useAdminResume = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const data = await adminResumeApi.getProfile();
      setProfile(data);
    } catch (err) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file only.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error('File size exceeds the 20MB limit.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    setUploading(true);
    try {
      await adminResumeApi.uploadResume(formData);
      toast.success('Resume PDF uploaded and updated successfully!');
      fetchProfile();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload resume file.');
    } finally {
      setUploading(false);
    }
  };

  return {
    profile,
    loading,
    uploading,
    handleFileUpload,
    refetch: fetchProfile,
  };
};

export default useAdminResume;
