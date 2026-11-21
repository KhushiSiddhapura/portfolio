import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import adminResumeApi from "../api/adminResumeApi";

export const useAdminResume = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resumeSummary, setResumeSummary] = useState("");
  const [resumeActivities, setResumeActivities] = useState([]);

  const fetchProfile = useCallback(async () => {
    try {
      const data = await adminResumeApi.getProfile();
      setProfile(data);
      setResumeSummary(
        data.resumeSummary ||
          data.heroIntroduction ||
          "I am a Full Stack Developer and 2nd year B.Tech Information Technology student at Birla Vishvakarma Mahavidyalaya (CGPA: 8.52/10).",
      );
      setResumeActivities(
        Array.isArray(data.resumeActivities) && data.resumeActivities.length > 0
          ? data.resumeActivities
          : [
              "Active volunteer participating in NSS (National Service Scheme).",
              "Attended live college workshops on MERN stack & web applications security.",
              "Personal interests: Reading, Travelling, and Music.",
            ],
      );
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const addActivity = () => {
    setResumeActivities((prev) => [...prev, ""]);
  };

  const updateActivity = (index, value) => {
    setResumeActivities((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const removeActivity = (index) => {
    setResumeActivities((prev) => prev.filter((_, i) => i !== index));
  };

  const saveResumeContent = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const cleanedActivities = resumeActivities.filter(
        (act) => act.trim().length > 0,
      );
      await adminResumeApi.updateProfile({
        resumeSummary,
        resumeActivities: cleanedActivities,
      });
      toast.success("Resume content updated successfully!");
      fetchProfile();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update resume content.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file only.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error("File size exceeds the 20MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setUploading(true);
    try {
      await adminResumeApi.uploadResume(formData);
      toast.success("Resume PDF uploaded and updated successfully!");
      fetchProfile();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to upload resume file.",
      );
    } finally {
      setUploading(false);
    }
  };

  return {
    profile,
    loading,
    uploading,
    saving,
    resumeSummary,
    setResumeSummary,
    resumeActivities,
    addActivity,
    updateActivity,
    removeActivity,
    saveResumeContent,
    handleFileUpload,
    refetch: fetchProfile,
  };
};

export default useAdminResume;
