import React from 'react';
import { Upload, FileText, CheckCircle2, Download, AlertCircle } from 'lucide-react';
import useAdminResume from '../hook/useAdminResume';
import Loader from '../../../../shared/ui/Loader';

export const ResumeManagementPage = () => {
  const { profile, loading, uploading, handleFileUpload } = useAdminResume();

  if (loading) {
    return <Loader text="Loading resume manager..." className="py-12" />;
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-xl font-bold text-[var(--text)]">Resume Management</h2>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Upload and replace your verified PDF resume. The public download link automatically syncs with this file.
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
        <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
          <FileText className="w-4 h-4 text-[var(--primary)]" />
          Active Published Resume
        </h3>

        {profile?.resumeUrl ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-950/20">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Resume is Active & Downloadable
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
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              No custom PDF resume uploaded yet. Visitors on the public website currently use the responsive printable CV view.
            </span>
          </div>
        )}
      </div>

      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
        <h3 className="font-bold text-sm text-[var(--text)]">Upload / Replace PDF Document</h3>

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
                {uploading ? 'Uploading PDF Document...' : 'Select or drag your PDF resume here'}
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

