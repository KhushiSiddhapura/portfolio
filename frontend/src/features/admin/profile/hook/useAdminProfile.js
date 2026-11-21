import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import adminProfileApi from "../api/adminProfileApi";

export const useAdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminProfileApi.getProfile();
      setProfile(data);
    } catch (err) {
      toast.error("Failed to load profile details");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSaving(true);
    try {
      const updated = await adminProfileApi.updateProfile(profile);
      setProfile(updated);
      toast.success("Profile information updated successfully");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const addEducation = () => {
    setProfile((prev) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          institution: "Birla Vishvakarma Mahavidyalaya (BVM), Gujarat",
          degree: "B.Tech in Information Technology",
          duration: "Pursuing",
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  return {
    profile,
    setProfile,
    loading,
    saving,
    handleSave,
    addEducation,
    removeEducation,
    refetch: fetchProfile,
  };
};

export default useAdminProfile;
