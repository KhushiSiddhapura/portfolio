import React from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  FileText,
  CheckCircle2,
  Download,
  AlertCircle,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Briefcase,
  Code2,
  FolderGit2,
  Award,
} from 'lucide-react';
import useAdminResume from '../hook/useAdminResume';
import Loader from '../../../../shared/ui/Loader';
import Button from '../../../../shared/ui/Button';

export const ResumeManagementPage = () => {
  const {
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
  } = useAdminResume();

  if (loading) {
    return <Loader text="Loading resume manager..." className="py-12" />;
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Top Header & Public Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--text)]">Resume Management & Content CMS</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Control every section of your public resume. Content is dynamically rendered in real-time.
          </p>
        </div>

        <Link
          to="/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-xs transition-colors self-start sm:self-auto"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Resume</span>
        </Link>
      </div>

      {/* 1. Quick Section Shortcuts for Resume Content */}
      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
        <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
          <span>Resume Dynamic Content Modules</span>
        </h3>
        <p className="text-xs text-[var(--text-secondary)]">
          Your public resume pulls live records from each dedicated CMS module. Click any module below to manage entries:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/admin/experience"
            className="p-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] transition-all group flex flex-col items-center text-center space-y-2"
          >
            <div className="p-2 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[var(--text)]">Experience</span>
            <span className="text-[10px] text-[var(--text-muted)]">Jobs & Internships</span>
          </Link>

          <Link
            to="/admin/projects"
            className="p-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] transition-all group flex flex-col items-center text-center space-y-2"
          >
            <div className="p-2 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] group-hover:scale-110 transition-transform">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[var(--text)]">Projects</span>
            <span className="text-[10px] text-[var(--text-muted)]">Portfolio Works</span>
          </Link>

          <Link
            to="/admin/skills"
            className="p-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] transition-all group flex flex-col items-center text-center space-y-2"
          >
            <div className="p-2 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] group-hover:scale-110 transition-transform">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[var(--text)]">Skills</span>
            <span className="text-[10px] text-[var(--text-muted)]">Tech Stack Pills</span>
          </Link>

          <Link
            to="/admin/achievements"
            className="p-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] transition-all group flex flex-col items-center text-center space-y-2"
          >
            <div className="p-2 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[var(--text)]">Achievements</span>
            <span className="text-[10px] text-[var(--text-muted)]">Honors & Awards</span>
          </Link>
        </div>
      </div>

      {/* 2. Resume Summary & Activities Form */}
      <form onSubmit={saveResumeContent} className="space-y-6">
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
            <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--primary)]" />
              <span>Resume Summary Statement</span>
            </h3>
            <span className="text-[11px] text-[var(--text-muted)]">Appears in Summary column</span>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1.5">
              Professional Summary
            </label>
            <textarea
              rows={4}
              value={resumeSummary}
              onChange={(e) => setResumeSummary(e.target.value)}
              placeholder="Enter your executive professional summary for recruiters..."
              className="w-full text-xs rounded-xl bg-[var(--surface)] border border-[var(--border)] p-3 text-[var(--text)] leading-relaxed focus:border-[var(--primary)] focus:outline-none"
            />
          </div>
        </div>

        {/* Activities, Workshops & Extracurriculars */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
            <div>
              <h3 className="font-bold text-sm text-[var(--text)]">
                Activities, Workshops & Interests
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Appears in the right column of your resume under "Activities & Workshops".
              </p>
            </div>
            <Button variant="outline" size="sm" icon={Plus} onClick={addActivity} type="button">
              Add Item
            </Button>
          </div>

          <div className="space-y-3">
            {resumeActivities.map((act, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={act}
                  onChange={(e) => updateActivity(idx, e.target.value)}
                  placeholder="e.g. Active volunteer participating in NSS (National Service Scheme)"
                  className="flex-1 text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--primary)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeActivity(idx)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {resumeActivities.length === 0 && (
              <p className="text-xs text-zinc-400 italic py-2">
                No items added yet. Click "Add Item" above to add activities or workshops.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save} loading={saving}>
            Save Resume Content
          </Button>
        </div>
      </form>

      {/* 3. Published Physical PDF Document Upload */}
      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
        <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
          <FileText className="w-4 h-4 text-[var(--primary)]" />
          <span>Verified Physical PDF Document (Downloadable)</span>
        </h3>

        {profile?.resumeUrl ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-emerald-200 bg-emerald-50">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                PDF File Active & Synced
              </span>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                {profile.resumeFilename || 'Khushi_Siddhapura_Resume.pdf'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Test Download</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              No custom physical PDF uploaded yet. The "Download PDF" button will use your browser's direct printable PDF engine.
            </span>
          </div>
        )}

        <div className="relative border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] rounded-xl p-8 text-center bg-[var(--surface)] transition-all cursor-pointer group">
          <input
            type="file"
            accept="application/pdf"
            disabled={uploading}
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[var(--surface-alt)] text-[var(--primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
              {uploading ? (
                <div className="w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">
                {uploading ? 'Uploading PDF Document...' : 'Upload or Replace PDF File'}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Supports PDF up to 20MB. Automatically hosted and secured.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeManagementPage;

