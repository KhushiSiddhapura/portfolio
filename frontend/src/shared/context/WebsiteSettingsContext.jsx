import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosInstance';

const WebsiteSettingsContext = createContext(null);

const defaultSettings = {
  contactEmail: '',
  socialLinks: {
    github: '',
    linkedin: '',
  },
};

export const WebsiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    let ignore = false;

    axiosInstance
      .get('/settings')
      .then((response) => {
        if (!ignore) {
          const data = response.data?.data || {};
          setSettings({
            ...defaultSettings,
            ...data,
            socialLinks: {
              ...defaultSettings.socialLinks,
              ...(data.socialLinks || {}),
            },
          });
        }
      })
      .catch(() => {
        if (!ignore) setSettings(defaultSettings);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <WebsiteSettingsContext.Provider value={settings}>
      {children}
    </WebsiteSettingsContext.Provider>
  );
};

export const useWebsiteSettings = () => useContext(WebsiteSettingsContext) || defaultSettings;
