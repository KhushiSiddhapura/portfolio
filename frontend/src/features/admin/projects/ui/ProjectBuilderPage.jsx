
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  Plus,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Layers,
  Heading,
  AlignLeft,
  Image as ImageIcon,
  Images,
  Video,
  ListCheck,
  Code2,
  Quote,
  Columns,
  AlertCircle,
  FolderOpen,
  Settings2,
  ExternalLink,
  Github,
  Globe,
} from 'lucide-react';

import useProjectBuilder from '../hook/useProjectBuilder';
import ProjectContentRenderer from '../../../projects/ui/ProjectContentRenderer';
import ImageUpload from '../../../../shared/ui/ImageUpload';
import Button from '../../../../shared/ui/Button';
import Loader from '../../../../shared/ui/Loader';

export const ProjectBuilderPage = () => {
  const { id } = useParams();

  const {
    isEditing,
    loading,
    saving,
    previewMode,
    setPreviewMode,
    settings,
    setSettings,
    blocks,
    handleTitleChange,
    handleAddBlock,
    moveBlockUp,
    moveBlockDown,
    duplicateBlock,
    deleteBlock,
    updateBlockData,
    handleSave,
  } = useProjectBuilder(id);

  if (loading) {
    return <Loader text="Loading project builder..." className="py-24" />;
  }

  // --------------------------------------------------
  // BLOCK PALETTE
  // --------------------------------------------------

  const blockGroups = [
    {
      title: 'Basic Elements',
      items: [
        { type: 'heading', label: 'Heading', icon: Heading },
        { type: 'paragraph', label: 'Paragraph', icon: AlignLeft },
      ],
    },
    {
      title: 'Media',
      items: [
        { type: 'image', label: 'Image', icon: ImageIcon },
        { type: 'gallery', label: 'Gallery', icon: Images },
        { type: 'video', label: 'Video', icon: Video },
      ],
    },
    {
      title: 'Development',
      items: [
        { type: 'feature-list', label: 'Feature List', icon: ListCheck },
        { type: 'technology-list', label: 'Tech Stack', icon: Layers },
        { type: 'code-block', label: 'Code Block', icon: Code2 },
      ],
    },
    {
      title: 'Layout & Extras',
      items: [
        { type: 'quote', label: 'Quote', icon: Quote },
        { type: 'architecture-image', label: 'Architecture', icon: Layers },
        { type: 'two-column', label: 'Two Column', icon: Columns },
        { type: 'callout', label: 'Callout', icon: AlertCircle },
      ],
    },
  ];

  // --------------------------------------------------
  // SHARED INPUT CLASSES
  // --------------------------------------------------

  const inputClass =
    'w-full min-w-0 text-sm rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2.5 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors';

  const textareaClass =
    'w-full min-w-0 text-sm rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] resize-y transition-colors';

  const labelClass =
    'block text-xs font-semibold text-[var(--text-secondary)] mb-1.5';

  // --------------------------------------------------
  // REUSABLE SETTINGS FIELD
  // --------------------------------------------------

  const SettingsField = ({ label, children }) => (
    <div className="min-w-0 space-y-1">
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );

  // --------------------------------------------------
  // BLOCK ACTION BUTTON
  // --------------------------------------------------

  const ActionButton = ({ icon: Icon, onClick, disabled, danger, title }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        w-8 h-8 flex items-center justify-center rounded-lg
        transition-colors cursor-pointer
        disabled:opacity-30 disabled:cursor-not-allowed
        ${
          danger
            ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30'
            : 'text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)]'
        }
      `}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  // --------------------------------------------------
  // CONTENT BLOCK EDITOR
  // --------------------------------------------------

  const renderBlockEditor = (block, index) => {
    switch (block.type) {
      case 'heading':
        return (
          <div className="space-y-3">
            <input
              type="text"
              value={block.data.text || ''}
              onChange={(e) =>
                updateBlockData(index, 'text', e.target.value)
              }
              placeholder="Enter section heading..."
              className={inputClass}
            />

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="text-[var(--text-muted)] font-medium">
                Heading Level:
              </span>

              {[1, 2, 3].map((lvl) => (
                <label
                  key={lvl}
                  className="flex items-center gap-1.5 text-[var(--text-secondary)] cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`lvl-${index}`}
                    checked={block.data.level === lvl}
                    onChange={() =>
                      updateBlockData(index, 'level', lvl)
                    }
                    className="accent-[var(--primary)]"
                  />
                  H{lvl}
                </label>
              ))}
            </div>
          </div>
        );

      case 'paragraph':
        return (
          <textarea
            rows={5}
            value={block.data.text || ''}
            onChange={(e) =>
              updateBlockData(index, 'text', e.target.value)
            }
            placeholder="Write your project description..."
            className={textareaClass}
          />
        );

      case 'image':
      case 'architecture-image':
        return (
          <div className="space-y-3">
            <ImageUpload
              value={block.data.url}
              onChange={(res) =>
                updateBlockData(index, 'url', res.url)
              }
              folder="projects"
              label={
                block.type === 'image'
                  ? 'Upload Image'
                  : 'Upload Architecture Diagram'
              }
            />

            <input
              type="text"
              value={block.data.caption || ''}
              onChange={(e) =>
                updateBlockData(index, 'caption', e.target.value)
              }
              placeholder="Image caption / description..."
              className={inputClass}
            />
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-3">
            <input
              type="text"
              value={block.data.title || ''}
              onChange={(e) =>
                updateBlockData(index, 'title', e.target.value)
              }
              placeholder="Gallery title..."
              className={inputClass}
            />

            <div className="space-y-2">
              {(block.data.images || []).map((img, imgIdx) => (
                <div
                  key={imgIdx}
                  className="flex items-center gap-2 min-w-0"
                >
                  <input
                    type="text"
                    value={typeof img === 'string' ? img : img.url}
                    onChange={(e) => {
                      const newImgs = [...(block.data.images || [])];

                      newImgs[imgIdx] = {
                        url: e.target.value,
                        caption:
                          typeof img === 'string'
                            ? ''
                            : img.caption || '',
                      };

                      updateBlockData(index, 'images', newImgs);
                    }}
                    placeholder="Image URL..."
                    className={inputClass}
                  />

                  <ActionButton
                    icon={Trash2}
                    danger
                    title="Remove image"
                    onClick={() => {
                      const newImgs = block.data.images.filter(
                        (_, i) => i !== imgIdx
                      );

                      updateBlockData(index, 'images', newImgs);
                    }}
                  />
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                icon={Plus}
                onClick={() => {
                  const newImgs = [
                    ...(block.data.images || []),
                    { url: '', caption: '' },
                  ];

                  updateBlockData(index, 'images', newImgs);
                }}
              >
                Add Image
              </Button>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-3">
            <input
              type="url"
              value={block.data.url || ''}
              onChange={(e) =>
                updateBlockData(index, 'url', e.target.value)
              }
              placeholder="YouTube / Video Embed URL..."
              className={inputClass}
            />

            <input
              type="text"
              value={block.data.caption || ''}
              onChange={(e) =>
                updateBlockData(index, 'caption', e.target.value)
              }
              placeholder="Video caption..."
              className={inputClass}
            />
          </div>
        );

      case 'feature-list':
        return (
          <div className="space-y-3">
            <input
              type="text"
              value={block.data.title || ''}
              onChange={(e) =>
                updateBlockData(index, 'title', e.target.value)
              }
              placeholder="Feature section title..."
              className={inputClass}
            />

            <textarea
              rows={5}
              value={(block.data.items || []).join('\n')}
              onChange={(e) =>
                updateBlockData(
                  index,
                  'items',
                  e.target.value
                    .split('\n')
                    .filter((item) => item.trim() !== '')
                )
              }
              placeholder={'Enter each feature on a new line...\nUser Authentication\nDashboard Management\nResponsive Design'}
              className={textareaClass}
            />
          </div>
        );

      case 'technology-list':
        return (
          <div className="space-y-3">
            <input
              type="text"
              value={block.data.title || ''}
              onChange={(e) =>
                updateBlockData(index, 'title', e.target.value)
              }
              placeholder="Section title..."
              className={inputClass}
            />

            <input
              type="text"
              value={(block.data.technologies || []).join(', ')}
              onChange={(e) =>
                updateBlockData(
                  index,
                  'technologies',
                  e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean)
                )
              }
              placeholder="React.js, Node.js, MongoDB..."
              className={inputClass}
            />
          </div>
        );

      case 'code-block':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={block.data.language || ''}
                onChange={(e) =>
                  updateBlockData(index, 'language', e.target.value)
                }
                placeholder="Language (javascript...)"
                className={inputClass}
              />

              <input
                type="text"
                value={block.data.filename || ''}
                onChange={(e) =>
                  updateBlockData(index, 'filename', e.target.value)
                }
                placeholder="Filename (optional)"
                className={inputClass}
              />
            </div>

            <textarea
              rows={7}
              value={block.data.code || ''}
              onChange={(e) =>
                updateBlockData(index, 'code', e.target.value)
              }
              placeholder="Paste your code snippet..."
              className="w-full min-w-0 text-xs font-mono rounded-lg bg-[#1a1a20] text-gray-100 border border-[var(--border)] p-4 focus:outline-none focus:border-[var(--primary)] resize-y"
              spellCheck={false}
            />
          </div>
        );

      case 'quote':
        return (
          <div className="space-y-3">
            <textarea
              rows={4}
              value={block.data.quote || ''}
              onChange={(e) =>
                updateBlockData(index, 'quote', e.target.value)
              }
              placeholder="Enter quote..."
              className={`${textareaClass} italic`}
            />

            <input
              type="text"
              value={block.data.author || ''}
              onChange={(e) =>
                updateBlockData(index, 'author', e.target.value)
              }
              placeholder="Author name / role..."
              className={inputClass}
            />
          </div>
        );

      case 'callout':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-[140px_minmax(0,1fr)] gap-2">
              <select
                value={block.data.type || 'info'}
                onChange={(e) =>
                  updateBlockData(index, 'type', e.target.value)
                }
                className={inputClass}
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
                <option value="danger">Danger</option>
              </select>

              <input
                type="text"
                value={block.data.title || ''}
                onChange={(e) =>
                  updateBlockData(index, 'title', e.target.value)
                }
                placeholder="Callout title..."
                className={inputClass}
              />
            </div>

            <textarea
              rows={3}
              value={block.data.text || ''}
              onChange={(e) =>
                updateBlockData(index, 'text', e.target.value)
              }
              placeholder="Callout message..."
              className={textareaClass}
            />
          </div>
        );

      case 'two-column':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[var(--text-muted)]">
                LEFT COLUMN
              </p>

              <input
                type="text"
                value={block.data.leftTitle || ''}
                onChange={(e) =>
                  updateBlockData(index, 'leftTitle', e.target.value)
                }
                placeholder="Left title..."
                className={inputClass}
              />

              <textarea
                rows={4}
                value={block.data.leftContent || ''}
                onChange={(e) =>
                  updateBlockData(index, 'leftContent', e.target.value)
                }
                placeholder="Left column content..."
                className={textareaClass}
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-[var(--text-muted)]">
                RIGHT COLUMN
              </p>

              <input
                type="text"
                value={block.data.rightTitle || ''}
                onChange={(e) =>
                  updateBlockData(index, 'rightTitle', e.target.value)
                }
                placeholder="Right title..."
                className={inputClass}
              />

              <textarea
                rows={4}
                value={block.data.rightContent || ''}
                onChange={(e) =>
                  updateBlockData(index, 'rightContent', e.target.value)
                }
                placeholder="Right column content..."
                className={textareaClass}
              />
            </div>
          </div>
        );

      default:
        return (
          <p className="text-sm text-[var(--text-muted)]">
            No editor available for this block type.
          </p>
        );
    }
  };

  // --------------------------------------------------
  // PROJECT SETTINGS
  // --------------------------------------------------

  const renderProjectSettings = () => (
    <div className="space-y-5">

      {/* General */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
          <FolderOpen className="w-4 h-4 text-[var(--primary)]" />
          <h4 className="text-xs font-bold text-[var(--text)] uppercase tracking-wide">
            General Information
          </h4>
        </div>

        <SettingsField label="Project Title *">
          <input
            type="text"
            required
            value={settings.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Project title..."
            className={inputClass}
          />
        </SettingsField>

        <SettingsField label="URL Slug *">
          <input
            type="text"
            required
            value={settings.slug}
            onChange={(e) =>
              setSettings({ ...settings, slug: e.target.value })
            }
            placeholder="project-url-slug"
            className={`${inputClass} font-mono text-xs`}
          />
        </SettingsField>

        <SettingsField label="Category">
          <select
            value={settings.category}
            onChange={(e) =>
              setSettings({ ...settings, category: e.target.value })
            }
            className={inputClass}
          >
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="AI / ML">AI / ML</option>
            <option value="Academic">Academic</option>
            <option value="UI / UX">UI / UX</option>
          </select>
        </SettingsField>

        <SettingsField label="Short Summary">
          <textarea
            rows={3}
            value={settings.shortDescription}
            onChange={(e) =>
              setSettings({
                ...settings,
                shortDescription: e.target.value,
              })
            }
            placeholder="Briefly describe your project..."
            className={textareaClass}
          />
          <p className="text-[10px] text-[var(--text-muted)]">
            Displayed on project cards.
          </p>
        </SettingsField>

        <SettingsField label="Technologies">
          <input
            type="text"
            value={settings.technologies}
            onChange={(e) =>
              setSettings({
                ...settings,
                technologies: e.target.value,
              })
            }
            placeholder="React, Node.js, MongoDB..."
            className={inputClass}
          />
          <p className="text-[10px] text-[var(--text-muted)]">
            Separate technologies using commas.
          </p>
        </SettingsField>
      </section>

      {/* Project Details */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
          <Settings2 className="w-4 h-4 text-[var(--primary)]" />
          <h4 className="text-xs font-bold text-[var(--text)] uppercase tracking-wide">
            Project Details
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SettingsField label="Organization">
            <input
              type="text"
              value={settings.organization}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  organization: e.target.value,
                })
              }
              placeholder="Organization..."
              className={inputClass}
            />
          </SettingsField>

          <SettingsField label="Duration">
            <input
              type="text"
              value={settings.duration}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  duration: e.target.value,
                })
              }
              placeholder="2026 / Academic"
              className={inputClass}
            />
          </SettingsField>
        </div>
      </section>

      {/* Cover Image */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
          <ImageIcon className="w-4 h-4 text-[var(--primary)]" />
          <h4 className="text-xs font-bold text-[var(--text)] uppercase tracking-wide">
            Cover Image
          </h4>
        </div>

        <ImageUpload
          value={settings.coverImage?.url}
          onChange={(res) =>
            setSettings({ ...settings, coverImage: res })
          }
          folder="projects"
          label="Upload Project Cover"
        />
      </section>

      {/* Links */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
          <ExternalLink className="w-4 h-4 text-[var(--primary)]" />
          <h4 className="text-xs font-bold text-[var(--text)] uppercase tracking-wide">
            Project Links
          </h4>
        </div>

        <SettingsField label="GitHub URL">
          <div className="relative">
            <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="url"
              value={settings.links?.github || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  links: {
                    ...settings.links,
                    github: e.target.value,
                  },
                })
              }
              placeholder="https://github.com/..."
              className={`${inputClass} pl-9`}
            />
          </div>
        </SettingsField>

        <SettingsField label="Live Project URL">
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="url"
              value={settings.links?.live || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  links: {
                    ...settings.links,
                    live: e.target.value,
                  },
                })
              }
              placeholder="https://..."
              className={`${inputClass} pl-9`}
            />
          </div>
        </SettingsField>
      </section>

      {/* Featured */}
      <div className="pt-4 border-t border-[var(--border)]">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={settings.featured}
            onChange={(e) =>
              setSettings({
                ...settings,
                featured: e.target.checked,
              })
            }
            className="mt-0.5 w-4 h-4 rounded accent-[var(--primary)] cursor-pointer"
          />

          <div>
            <p className="text-sm font-semibold text-[var(--text)]">
              Featured Project
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Display this project on the public homepage.
            </p>
          </div>
        </label>
      </div>
    </div>
  );

  // --------------------------------------------------
  // MAIN PAGE
  // --------------------------------------------------

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6 pb-8">

      {/* ============================================= */}
      {/* TOP TOOLBAR */}
      {/* ============================================= */}

      <div className="
        flex flex-col
        sm:flex-row sm:items-center
        justify-between
        gap-4
        p-3 sm:p-4
        rounded-xl
        border border-[var(--border)]
        bg-[var(--card)]
      ">

        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/admin/projects"
            className="
              w-9 h-9 shrink-0
              flex items-center justify-center
              rounded-lg
              border border-[var(--border)]
              text-[var(--text-secondary)]
              hover:text-[var(--primary)]
              hover:bg-[var(--surface)]
              transition-colors cursor-pointer
            "
            title="Back to Projects"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text)] truncate">
              {isEditing
                ? `Edit: ${settings.title || 'Untitled'}`
                : 'New Project Builder'}
            </h2>

            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />

              <span className="text-[10px] sm:text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider">
                {settings.status || 'Draft'}
              </span>
            </div>
          </div>
        </div>

        <div className="
          grid grid-cols-3
          sm:flex sm:items-center
          gap-2
          w-full sm:w-auto
        ">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`
              flex items-center justify-center gap-1.5
              px-2.5 sm:px-3.5 py-2
              rounded-lg border
              text-xs sm:text-sm font-semibold
              transition-colors cursor-pointer
              ${
                previewMode
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:border-[var(--primary)]'
              }
            `}
          >
            <Eye className="w-4 h-4 shrink-0" />
            <span>{previewMode ? 'Editor' : 'Preview'}</span>
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave('draft')}
            loading={saving}
          >
            Save Draft
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => handleSave('published')}
            loading={saving}
          >
            Publish
          </Button>
        </div>
      </div>

      {/* ============================================= */}
      {/* LIVE PREVIEW */}
      {/* ============================================= */}

      {previewMode ? (
        <div className="
          w-full max-w-5xl mx-auto
          p-4 sm:p-6 lg:p-8
          rounded-xl
          border border-[var(--border)]
          bg-[var(--card)]
        ">

          <div className="mb-6 pb-5 border-b border-[var(--border)]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
              {settings.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] mt-2 break-words">
              {settings.title}
            </h1>

            <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
              {settings.shortDescription}
            </p>
          </div>

          {settings.coverImage?.url && (
            <img
              src={settings.coverImage.url}
              alt="Project Cover"
              className="
                w-full max-h-[420px]
                object-cover rounded-xl
                mb-8 border border-[var(--border)]
              "
            />
          )}

          <ProjectContentRenderer blocks={blocks} />
        </div>
      ) : (

        /* ============================================= */
        /* RESPONSIVE BUILDER WORKSPACE */
        /* ============================================= */

        <div className="
          grid grid-cols-1
          gap-4 lg:gap-5
          items-start
          min-w-0
          ">

          {/* ========================================= */}
          {/* LEFT: BLOCK LIBRARY */}
          {/* ========================================= */}

          <aside className="
            min-w-0
            bg-[var(--card)]
            border border-[var(--border)]
            rounded-xl
            p-4
            space-y-4
          ">

            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[var(--text)]">
                  Block Library
                </h3>

                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Add content to your project.
                </p>
              </div>

              <div className="w-8 h-8 shrink-0 rounded-lg bg-[var(--surface)] flex items-center justify-center">
                <Plus className="w-4 h-4 text-[var(--primary)]" />
              </div>
            </div>

            {blockGroups.map((group) => (
              <div key={group.title} className="space-y-2">

                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {group.title}
                </h4>

                <div className="
                  grid grid-cols-2
                  sm:grid-cols-3
                  lg:grid-cols-4
                  2xl:grid-cols-6
                  gap-2
                ">
                  {group.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => handleAddBlock(item.type)}
                        className="
                          min-w-0 w-full
                          flex items-center gap-2.5
                          px-3 py-2.5
                          rounded-lg
                          text-xs sm:text-sm
                          font-medium
                          text-[var(--text-secondary)]
                          bg-[var(--surface)]
                          border border-[var(--border)]
                          hover:border-[var(--primary-border)]
                          hover:text-[var(--primary)]
                          hover:bg-[var(--surface-alt)]
                          transition-colors
                          text-left cursor-pointer
                        "
                      >
                        <Icon className="w-4 h-4 text-[var(--primary)] shrink-0" />

                        <span className="truncate">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="
              hidden xl:flex
              items-start gap-2
              p-3 rounded-lg
              bg-[var(--surface)]
              border border-[var(--border)]
            ">
              <AlertCircle className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />

              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                Select any block to add it to your project content.
              </p>
            </div>

          </aside>

          {/* ========================================= */}
          {/* CENTER: CONTENT EDITOR */}
          {/* ========================================= */}

          <main className="min-w-0 space-y-4">

            <div className="
              flex flex-col
              sm:flex-row sm:items-center
              justify-between
              gap-2
            ">
              <div>
                <h3 className="text-base font-bold text-[var(--text)]">
                  Content Editor
                </h3>

                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Build and organize your project story.
                </p>
              </div>

              <span className="
                self-start sm:self-auto
                px-2.5 py-1
                rounded-md
                text-xs font-semibold
                bg-[var(--surface)]
                border border-[var(--border)]
                text-[var(--text-secondary)]
              ">
                {blocks.length} {blocks.length === 1 ? 'Block' : 'Blocks'}
              </span>
            </div>

            {/* EMPTY STATE */}

            {blocks.length === 0 ? (
              <div className="
                min-h-[300px] sm:min-h-[380px]
                flex flex-col items-center justify-center
                text-center
                rounded-xl
                border border-dashed border-[var(--border)]
                bg-[var(--surface)]
                px-5 py-12
              ">

                <div className="
                  w-14 h-14
                  rounded-2xl
                  bg-[var(--surface-alt)]
                  flex items-center justify-center
                  mb-5
                ">
                  <Layers className="w-7 h-7 text-[var(--primary)]" />
                </div>

                <h4 className="text-base font-bold text-[var(--text)]">
                  Start building your project
                </h4>

                <p className="text-sm text-[var(--text-muted)] mt-2 max-w-sm leading-relaxed">
                  Your project content will appear here. Choose a block
                  from the library to add headings, descriptions,
                  screenshots, code snippets and more.
                </p>

                <div className="
                  mt-5
                  flex items-center gap-2
                  text-xs font-semibold
                  text-[var(--primary)]
                ">
                  <Plus className="w-4 h-4" />
                  Select a block to get started
                </div>

              </div>
            ) : (

              /* CONTENT BLOCKS */

              <div className="space-y-4">
                {blocks.map((block, index) => {
                  const blockInfo = blockGroups
                    .flatMap((group) => group.items)
                    .find((item) => item.type === block.type);

                  const BlockIcon = blockInfo?.icon || Layers;

                  return (
                    <div
                      key={block._id || block._tempId || index}
                      className="
                        min-w-0
                        rounded-xl
                        border border-[var(--border)]
                        bg-[var(--card)]
                        overflow-hidden
                      "
                    >

                      {/* BLOCK HEADER */}

                      <div className="
                        flex flex-wrap
                        items-center justify-between
                        gap-2
                        px-3 sm:px-4 py-3
                        bg-[var(--surface)]
                        border-b border-[var(--border)]
                      ">

                        <div className="flex items-center gap-2.5 min-w-0">

                          <div className="
                            w-8 h-8 shrink-0
                            rounded-lg
                            bg-[var(--surface-alt)]
                            flex items-center justify-center
                          ">
                            <BlockIcon className="w-4 h-4 text-[var(--primary)]" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[var(--text)] truncate">
                              {blockInfo?.label || block.type}
                            </p>

                            <p className="text-[10px] text-[var(--text-muted)]">
                              Block {String(index + 1).padStart(2, '0')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5">

                          <ActionButton
                            icon={ChevronUp}
                            onClick={() => moveBlockUp(index)}
                            disabled={index === 0}
                            title="Move Up"
                          />

                          <ActionButton
                            icon={ChevronDown}
                            onClick={() => moveBlockDown(index)}
                            disabled={index === blocks.length - 1}
                            title="Move Down"
                          />

                          <ActionButton
                            icon={Copy}
                            onClick={() => duplicateBlock(index)}
                            title="Duplicate"
                          />

                          <ActionButton
                            icon={Trash2}
                            onClick={() => deleteBlock(index)}
                            danger
                            title="Delete"
                          />

                        </div>
                      </div>

                      {/* BLOCK BODY */}

                      <div className="p-3 sm:p-4">
                        {renderBlockEditor(block, index)}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </main>

          {/* ========================================= */}
          {/* RIGHT: PROJECT SETTINGS */}
          {/* ========================================= */}

          <aside className="
            min-w-0
            bg-[var(--card)]
            border border-[var(--border)]
            rounded-xl
            p-4 sm:p-5
            space-y-5
          ">

            <div>
              <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-[var(--primary)]" />

                <h3 className="text-sm font-bold text-[var(--text)]">
                  Project Settings
                </h3>
              </div>

              <p className="text-xs text-[var(--text-muted)] mt-1">
                Configure your project information.
              </p>
            </div>

            {renderProjectSettings()}

          </aside>

        </div>
      )}

    </div>
  );
};

export default ProjectBuilderPage;
