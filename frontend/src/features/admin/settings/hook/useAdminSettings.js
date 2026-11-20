import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import adminSettingsApi from '../api/adminSettingsApi';
import { initialSettingsState } from '../state/adminSettingsState';

export const useAdminSettings = () => {
  const [settings, setSettings] = useState(initialSettingsState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await adminSettingsApi.getSettings();
      if (res?.data) {
        setSettings({
          ...initialSettingsState,
          ...res.data,
          socialLinks: {
            ...initialSettingsState.socialLinks,
            ...(res.data.socialLinks || {}),
          },
          homepageSections: {
            ...initialSettingsState.homepageSections,
            ...(res.data.homepageSections || {}),
          },
        });
      }
    } catch (err) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateField = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateSocialLink = (network, value) => {
    setSettings((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [network]: value,
      },
    }));
  };

  const toggleHomepageSection = (sectionKey) => {
    setSettings((prev) => ({
      ...prev,
      homepageSections: {
        ...prev.homepageSections,
        [sectionKey]: !prev.homepageSections[sectionKey],
      },
    }));
  };

  const saveSettings = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await adminSettingsApi.updateSettings(settings);
      toast.success('Website settings updated successfully');
    } catch (err) {
      toast.error('Failed to update website settings');
    } finally {
      setSaving(false);
    }
  };

  return {
    settings,
    loading,
    saving,
    updateField,
    updateSocialLink,
    toggleHomepageSection,
    saveSettings,
    refresh: fetchSettings,
  };
};

export default useAdminSettings;

