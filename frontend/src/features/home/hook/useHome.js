import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import homeApi from '../api/homeApi';
import { initialHomeState, initialContactForm } from '../state/homeState';

export const useHome = () => {
  const [data, setData] = useState(initialHomeState);
  const [contactForm, setContactForm] = useState(initialContactForm);
  const [submittingContact, setSubmittingContact] = useState(false);

  const fetchHomeData = useCallback(async () => {
    setData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const [profile, featuredProjects, skillsRes, experience, achievements] = await Promise.all([
        homeApi.getProfile().catch(() => null),
        homeApi.getFeaturedProjects().catch(() => []),
        homeApi.getSkills().catch(() => ({ grouped: [] })),
        homeApi.getExperience().catch(() => []),
        homeApi.getAchievements().catch(() => []),
      ]);

      setData({
        profile,
        featuredProjects: featuredProjects || [],
        skillsGrouped: skillsRes?.grouped || [],
        experience: experience || [],
        achievements: achievements || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to fetch homepage data',
      }));
    }
  }, []);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  const handleContactSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      toast.error('Please fill in your name, email, and message.');
      return false;
    }

    setSubmittingContact(true);
    try {
      const res = await homeApi.sendMessage(contactForm);
      toast.success(res.message || 'Message sent successfully!');
      setContactForm(initialContactForm);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
      return false;
    } finally {
      setSubmittingContact(false);
    }
  };

  return {
    ...data,
    contactForm,
    setContactForm,
    submittingContact,
    handleContactSubmit,
    refetch: fetchHomeData,
  };
};

export default useHome;
