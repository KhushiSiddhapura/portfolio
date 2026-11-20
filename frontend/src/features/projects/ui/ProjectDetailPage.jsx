import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Calendar,
  User,
  Building,
  Tag,
  Share2,
} from 'lucide-react';
import { toast } from 'react-toastify';
import useProjectDetail from '../hook/useProjectDetail';
import Loader from '../../../shared/ui/Loader';
import ProjectContentRenderer from './ProjectContentRenderer';

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { project, navigation, loading, error } = useProjectDetail(slug);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Project link copied to clipboard!');
    }
  };

  if (loading) {
    return <Loader text="Loading project details..." className="min-h-[60vh]" />;
  }

  if (error || !project) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[var(--text)]">Project Not Found</h2>
        <p className="text-sm text-[var(--text-muted)]">
          {error || 'This project might be unpublished or under construction.'}
        </p>
        <div className="pt-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[var(--primary)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex items-center justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-1.5"
            title="Share project"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md bg-[var(--surface-alt)] text-[var(--primary)] border border-[var(--primary-border)]">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40">
                Featured Work
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs">
          {project.organization && (
            <div className="space-y-1">
              <span className="text-[var(--text-muted)] flex items-center gap-1">
                <Building className="w-3.5 h-3.5" /> Organization
              </span>
              <p className="font-semibold text-[var(--text)]">{project.organization}</p>
            </div>
          )}

          {project.role && (
            <div className="space-y-1">
              <span className="text-[var(--text-muted)] flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Role
              </span>
              <p className="font-semibold text-[var(--text)]">{project.role}</p>
            </div>
          )}

          {project.duration && (
            <div className="space-y-1">
              <span className="text-[var(--text-muted)] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Duration
              </span>
              <p className="font-semibold text-[var(--text)]">{project.duration}</p>
            </div>
          )}

          <div className="space-y-1">
            <span className="text-[var(--text-muted)] flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Type
            </span>
            <p className="font-semibold text-[var(--text)]">{project.category}</p>
          </div>
        </div>

        {(project.links?.github || project.links?.live) && (
          <div className="flex flex-wrap items-center gap-3">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-xs transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] border border-[var(--border)] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repository</span>
              </a>
            )}
          </div>
        )}

        {project.coverImage?.url && (
          <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-xs">
            <img
              src={project.coverImage.url}
              alt={project.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {project.technologies?.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Core Technologies Applied
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.fullDescription && (
          <div className="text-base text-[var(--text-secondary)] leading-relaxed whitespace-pre-line border-t border-[var(--border)] pt-8">
            {project.fullDescription}
          </div>
        )}

        {/* Dynamic content blocks */}
        <ProjectContentRenderer blocks={project.contentBlocks} />

        {/* Prev / Next navigation */}
        <div className="pt-10 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {navigation.prev ? (
            <Link
              to={`/projects/${navigation.prev.slug}`}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] transition-colors group flex flex-col justify-between"
            >
              <span className="text-[10px] font-semibold uppercase text-[var(--text-muted)] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Previous Project
              </span>
              <p className="font-bold text-sm text-[var(--text)] group-hover:text-[var(--primary)] transition-colors mt-1">
                {navigation.prev.title}
              </p>
            </Link>
          ) : <div />}

          {navigation.next ? (
            <Link
              to={`/projects/${navigation.next.slug}`}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] transition-colors group flex flex-col justify-between text-right"
            >
              <span className="text-[10px] font-semibold uppercase text-[var(--text-muted)] flex items-center justify-end gap-1">
                Next Project <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="font-bold text-sm text-[var(--text)] group-hover:text-[var(--primary)] transition-colors mt-1">
                {navigation.next.title}
              </p>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
