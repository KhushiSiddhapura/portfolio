import React from 'react';
import { GraduationCap, Plus, Trash2, Save } from 'lucide-react';
import useAdminProfile from '../hook/useAdminProfile';
import Button from '../../../../shared/ui/Button';
import Loader from '../../../../shared/ui/Loader';

export const ProfileManagementPage = () => {
  const { profile, setProfile, loading, saving, handleSave, addEducation, removeEducation } =
    useAdminProfile();

  if (loading || !profile) {
    return <Loader text="Loading profile manager..." className="py-12" />;
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-xl font-bold text-[var(--text)]">Profile & Identity Management</h2>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Manage your personal developer biography, education credentials, and public contact information.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
          <h3 className="font-bold text-sm text-[var(--text)] border-b border-[var(--border)] pb-2">
            Identity & Bio
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={profile.name || ''}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Professional Title *
              </label>
              <input
                type="text"
                required
                value={profile.title || ''}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
              Homepage Hero Introduction
            </label>
            <textarea
              rows={2}
              value={profile.heroIntroduction || ''}
              onChange={(e) => setProfile({ ...profile, heroIntroduction: e.target.value })}
              className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3 text-[var(--text)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
              About Section Introduction
            </label>
            <textarea
              rows={2}
              value={profile.aboutIntroduction || ''}
              onChange={(e) => setProfile({ ...profile, aboutIntroduction: e.target.value })}
              className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3 text-[var(--text)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
              Developer Journey & Growth Story
            </label>
            <textarea
              rows={4}
              value={profile.developerJourney || ''}
              onChange={(e) => setProfile({ ...profile, developerJourney: e.target.value })}
              className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3 text-[var(--text)] resize-y"
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
          <h3 className="font-bold text-sm text-[var(--text)] border-b border-[var(--border)] pb-2">
            Contact & Availability
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Location
              </label>
              <input
                type="text"
                value={profile.location || ''}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Availability Badge Text
              </label>
              <input
                type="text"
                value={profile.availabilityStatus?.text || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    availabilityStatus: {
                      ...profile.availabilityStatus,
                      text: e.target.value,
                    },
                  })
                }
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Current Learning Focus
              </label>
              <input
                type="text"
                value={profile.currentLearningFocus || ''}
                onChange={(e) => setProfile({ ...profile, currentLearningFocus: e.target.value })}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
            <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[var(--primary)]" />
              Education Records
            </h3>
            <Button variant="outline" size="sm" icon={Plus} onClick={addEducation}>
              Add Education
            </Button>
          </div>

          <div className="space-y-4">
            {(profile.education || []).map((edu, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-[var(--primary)]">Record #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeEducation(idx)}
                    className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => {
                      const updated = [...profile.education];
                      updated[idx].degree = e.target.value;
                      setProfile({ ...profile, education: updated });
                    }}
                    placeholder="Degree (e.g. B.Tech in Information Technology)"
                    className="text-xs rounded-lg bg-[var(--card)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
                  />

                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => {
                      const updated = [...profile.education];
                      updated[idx].institution = e.target.value;
                      setProfile({ ...profile, education: updated });
                    }}
                    placeholder="Institution (e.g. Birla Vishvakarma Mahavidyalaya)"
                    className="text-xs rounded-lg bg-[var(--card)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
                  />
                </div>

                <input
                  type="text"
                  value={edu.duration || ''}
                  onChange={(e) => {
                    const updated = [...profile.education];
                    updated[idx].duration = e.target.value;
                    setProfile({ ...profile, education: updated });
                  }}
                  placeholder="Duration (e.g. Pursuing / 2023 - 2027)"
                  className="w-full text-xs rounded-lg bg-[var(--card)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save} loading={saving}>
            Save Profile Updates
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileManagementPage;
