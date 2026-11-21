import React from 'react';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, Quote, Code2, Layers } from 'lucide-react';

export const ProjectContentRenderer = ({ blocks = [] }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const sortedBlocks = [...blocks].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-8 my-8 text-[var(--text)]">
      {sortedBlocks.map((block, index) => {
        const key = block._id || `block-${index}`;
        const data = block.data || {};

        switch (block.type) {
          case 'heading': {
            const level = data.level || 2;
            const text = data.text || '';
            if (level === 1) {
              return (
                <h1 key={key} className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)] mt-8 mb-4 border-b border-[var(--border)] pb-2">
                  {text}
                </h1>
              );
            }
            if (level === 3) {
              return (
                <h3 key={key} className="text-lg sm:text-xl font-semibold text-[var(--text)] mt-6 mb-2">
                  {text}
                </h3>
              );
            }
            return (
              <h2 key={key} className="text-xl sm:text-2xl font-bold text-[var(--text)] mt-8 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[var(--primary)] rounded-full inline-block" />
                {text}
              </h2>
            );
          }

          case 'paragraph': {
            return (
              <p key={key} className="text-base text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                {data.text}
              </p>
            );
          }

          case 'image': {
            return (
              <figure key={key} className="my-6 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                <img
                  src={data.url}
                  alt={data.caption || 'Project visual'}
                  className="w-full h-auto max-h-125 object-cover"
                  loading="lazy"
                />
                {data.caption && (
                  <figcaption className="p-3 text-xs text-center text-[var(--text-muted)] bg-[var(--surface)] border-t border-[var(--border)]">
                    {data.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case 'gallery': {
            const images = data.images || [];
            if (images.length === 0) return null;
            return (
              <div key={key} className="my-6">
                {data.title && (
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                    {data.title}
                  </h4>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((img, i) => (
                    <figure key={i} className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] group">
                      <img
                        src={typeof img === 'string' ? img : img.url}
                        alt={img.caption || `Gallery visual ${i + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-102 transition-transform duration-300"
                        loading="lazy"
                      />
                      {img.caption && (
                        <figcaption className="p-2.5 text-xs text-center text-[var(--text-muted)] truncate">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            );
          }

          case 'video': {
            return (
              <div key={key} className="my-6 rounded-xl overflow-hidden border border-[var(--border)] bg-black aspect-video">
                {data.url?.includes('youtube.com') || data.url?.includes('youtu.be') ? (
                  <iframe
                    src={data.url.replace('watch?v=', 'embed/')}
                    title={data.title || 'Project video'}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                ) : (
                  <video src={data.url} controls className="w-full h-full object-cover">
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            );
          }

          case 'feature-list': {
            const items = data.items || [];
            return (
              <div key={key} className="my-6 p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                {data.title && (
                  <h3 className="text-base font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[var(--primary)]" />
                    {data.title}
                  </h3>
                )}
                <ul className="space-y-3">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          case 'technology-list': {
            const techs = data.technologies || [];
            return (
              <div key={key} className="my-6">
                {data.title && (
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                    {data.title}
                  </h4>
                )}
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--surface-alt)] text-[var(--primary)] border border-[var(--primary-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          }

          case 'code-block': {
            return (
              <div key={key} className="my-6 rounded-xl overflow-hidden border border-[var(--border-strong)] bg-[#1e1e24] text-gray-100 font-mono text-xs shadow-md">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700/60 bg-[#17171c] text-gray-400">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span>{data.language || 'code'}</span>
                  </div>
                  {data.filename && <span className="text-[11px]">{data.filename}</span>}
                </div>
                <pre className="p-4 overflow-x-auto leading-relaxed">
                  <code>{data.code}</code>
                </pre>
              </div>
            );
          }

          case 'quote': {
            return (
              <blockquote key={key} className="my-6 p-6 rounded-xl border-l-4 border-[var(--primary)] bg-[var(--surface-alt)] italic">
                <Quote className="w-6 h-6 text-[var(--primary)] mb-2 opacity-50" />
                <p className="text-base text-[var(--text)] font-medium leading-relaxed">
                  "{data.quote}"
                </p>
                {data.author && (
                  <footer className="mt-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] not-italic">
                    — {data.author}
                  </footer>
                )}
              </blockquote>
            );
          }

          case 'architecture-image': {
            return (
              <div key={key} className="my-8 p-5 rounded-xl border border-[var(--primary-border)] bg-[var(--surface-alt)]">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-5 h-5 text-[var(--primary)]" />
                  <h4 className="text-sm font-semibold text-[var(--text)]">
                    {data.title || 'System Architecture & Data Flow'}
                  </h4>
                </div>
                {data.description && (
                  <p className="text-xs text-[var(--text-secondary)] mb-4">{data.description}</p>
                )}
                {data.url && (
                  <div className="rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--card)] p-2">
                    <img src={data.url} alt="System Architecture" className="w-full h-auto object-contain max-h-105 mx-auto" />
                  </div>
                )}
              </div>
            );
          }

          case 'two-column': {
            return (
              <div key={key} className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  {data.leftTitle && (
                    <h4 className="text-sm font-semibold text-[var(--text)] mb-2 border-b border-[var(--border)] pb-1.5">
                      {data.leftTitle}
                    </h4>
                  )}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                    {data.leftContent}
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  {data.rightTitle && (
                    <h4 className="text-sm font-semibold text-[var(--text)] mb-2 border-b border-[var(--border)] pb-1.5">
                      {data.rightTitle}
                    </h4>
                  )}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                    {data.rightContent}
                  </p>
                </div>
              </div>
            );
          }

          case 'callout': {
            const type = data.type || 'info';
            const typeConfig = {
              info: {
                bg: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/40 text-purple-900 dark:text-purple-200',
                icon: Info,
                iconColor: 'text-[var(--primary)]',
              },
              warning: {
                bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200',
                icon: AlertTriangle,
                iconColor: 'text-amber-500',
              },
              success: {
                bg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200',
                icon: CheckCircle2,
                iconColor: 'text-emerald-500',
              },
              danger: {
                bg: 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40 text-rose-900 dark:text-rose-200',
                icon: AlertCircle,
                iconColor: 'text-rose-500',
              },
            }[type] || typeConfig.info;

            const Icon = typeConfig.icon;

            return (
              <div key={key} className={`my-6 p-4 rounded-xl border flex items-start gap-3.5 ${typeConfig.bg}`}>
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${typeConfig.iconColor}`} />
                <div className="flex-1">
                  {data.title && <h5 className="text-sm font-semibold mb-1">{data.title}</h5>}
                  <p className="text-sm leading-relaxed">{data.text}</p>
                </div>
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
};

export default ProjectContentRenderer;

