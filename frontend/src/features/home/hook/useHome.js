import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import homeApi from '../api/homeApi';
import { initialContactForm } from '../state/homeState';

export const useHome = () => {
  const [contactForm, setContactForm] = useState(initialContactForm);
  const [submittingContact, setSubmittingContact] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['homeData'],
    queryFn: async () => {
      const [profile, featuredProjects, skillsRes, experience, achievements] = await Promise.all([
        homeApi.getProfile().catch(() => null),
        homeApi.getFeaturedProjects().catch(() => []),
        homeApi.getSkills().catch(() => ({ grouped: [] })),
        homeApi.getExperience().catch(() => []),
        homeApi.getAchievements().catch(() => []),
      ]);

      return {
        profile,
        featuredProjects: featuredProjects || [],
        skillsGrouped: skillsRes?.grouped || [],
        experience: experience || [],
        achievements: achievements || [],
      };
    },
  });

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
    profile: data?.profile || null,
    featuredProjects: data?.featuredProjects || [],
    skillsGrouped: data?.skillsGrouped || [],
    experience: data?.experience || [],
    achievements: data?.achievements || [],
    loading: isLoading,
    error: error ? error.message : null,
    contactForm,
    setContactForm,
    submittingContact,
    handleContactSubmit,
    refetch,
  };
};

export default useHome;
