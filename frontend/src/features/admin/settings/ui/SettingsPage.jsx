import React from 'react';
import { Save } from 'lucide-react';
import Button from '../../../../shared/ui/Button';
import Loader from '../../../../shared/ui/Loader';
import useAdminSettings from '../hook/useAdminSettings';

export const SettingsPage = () => {
  const {
    settings,
    loading,
    saving,
    updateField,
    updateSocialLink,
    toggleHomepageSection,
    saveSettings,
  } = useAdminSettings();

  if (loading) {
    return <Loader text="Loading website settings..." className="py-12" />;
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-xl font-bold text-[var(--text)]">Website Settings & SEO</h2>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Configure site metadata, brand identity text, social profiles, and homepage section displays.
        </p>
      </div>

      <form onSubmit={saveSettings} className="space-y-8">
        {/* General Site Identity */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
          <h3 className="font-bold text-sm text-[var(--text)] border-b border-[var(--border)] pb-2">
            Brand & General Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Website Meta Title
              </label>
              <input
                type="text"
                value={settings?.websiteTitle || ''}
                onChange={(e) => updateField('websiteTitle', e.target.value)}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Brand Logo Text
              </label>
              <input
                type="text"
                value={settings?.logoText || 'Khushi'}
                onChange={(e) => updateField('logoText', e.target.value)}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
              Website Meta Description
            </label>
            <textarea
              rows={2}
              value={settings?.websiteDescription || ''}
              onChange={(e) => updateField('websiteDescription', e.target.value)}
              className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3 text-[var(--text)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Contact Inquiries Email
              </label>
              <input
                type="email"
                value={settings?.contactEmail || ''}
                onChange={(e) => updateField('contactEmail', e.target.value)}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Footer Tagline
              </label>
              <input
                type="text"
                value={settings?.footerText || ''}
                onChange={(e) => updateField('footerText', e.target.value)}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
          <h3 className="font-bold text-sm text-[var(--text)] border-b border-[var(--border)] pb-2">
            Social Profiles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                value={settings?.socialLinks?.github || ''}
                onChange={(e) => updateSocialLink('github', e.target.value)}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={settings?.socialLinks?.linkedin || ''}
                onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>
          </div>
        </div>

        {/* Homepage Sections Visibility */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
          <h3 className="font-bold text-sm text-[var(--text)] border-b border-[var(--border)] pb-2">
            Homepage Section Visibility
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.keys(settings?.homepageSections || {}).map((secKey) => (
              <label
                key={secKey}
                className="flex items-center gap-2 p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-medium cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={Boolean(settings?.homepageSections?.[secKey])}
                  onChange={() => toggleHomepageSection(secKey)}
                  className="rounded border-[var(--border)] text-[var(--primary)]"
                />
                <span className="capitalize">
                  {secKey.replace('show', '').replace(/([A-Z])/g, ' $1')}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save} loading={saving}>
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;

