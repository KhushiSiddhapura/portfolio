import React from 'react';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';
import useProjectBuilder from '../hook/useProjectBuilder';
import ProjectContentRenderer from '../../../projects/ui/ProjectContentRenderer';
import ImageUpload from '../../../../shared/ui/ImageUpload';
import Button from '../../../../shared/ui/Button';
import Loader from '../../../../shared/ui/Loader';
import { useParams } from 'react-router-dom';

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

  const blockPalette = [
    { type: 'heading', label: 'Heading', icon: Heading },
    { type: 'paragraph', label: 'Paragraph', icon: AlignLeft },
    { type: 'image', label: 'Image', icon: ImageIcon },
    { type: 'gallery', label: 'Image Gallery', icon: Images },
    { type: 'video', label: 'Video Embed', icon: Video },
    { type: 'feature-list', label: 'Feature List', icon: ListCheck },
    { type: 'technology-list', label: 'Tech Stack', icon: Layers },
    { type: 'code-block', label: 'Code Block', icon: Code2 },
    { type: 'quote', label: 'Quote', icon: Quote },
    { type: 'architecture-image', label: 'Architecture', icon: Layers },
    { type: 'two-column', label: 'Two-Column', icon: Columns },
    { type: 'callout', label: 'Callout', icon: AlertCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] sticky top-16 z-20">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-base font-bold text-[var(--text)]">
              {isEditing ? `Edit: ${settings.title || 'Untitled'}` : 'New Project Builder'}
            </h2>
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
              Status: {settings.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
              previewMode
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:border-[var(--primary)]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{previewMode ? 'Return to Editor' : 'Live Preview'}</span>
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
            Publish Live
          </Button>
        </div>
      </div>

      {previewMode ? (
        <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] max-w-4xl mx-auto shadow-sm">
          <div className="mb-6 pb-4 border-b border-[var(--border)]">
            <span className="text-xs font-semibold uppercase text-[var(--primary)]">
              {settings.category}
            </span>
            <h1 className="text-3xl font-extrabold text-[var(--text)] mt-1">{settings.title}</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-2">{settings.shortDescription}</p>
          </div>
          {settings.coverImage?.url && (
            <img
              src={settings.coverImage.url}
              alt="Cover"
              className="w-full h-64 object-cover rounded-xl mb-8 border border-[var(--border)]"
            />
          )}
          <ProjectContentRenderer blocks={blocks} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT PANEL */}
          <div className="lg:col-span-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3 sticky top-36">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border)] pb-2">
              Content Blocks Palette
            </h3>
            <p className="text-[11px] text-[var(--text-muted)]">
              Click to add structured blocks into your project story.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 pt-1">
              {blockPalette.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => handleAddBlock(item.type)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] border border-[var(--border)] hover:border-[var(--primary-border)] transition-all text-left cursor-pointer active:scale-98"
                  >
                    <Icon className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CENTER PANEL */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--text)]">
                Project Body ({blocks.length} Blocks)
              </h3>
              <span className="text-xs text-[var(--text-muted)]">
                Reorder, inline edit, or duplicate blocks
              </span>
            </div>

            {blocks.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-[var(--border)] rounded-xl p-6 bg-[var(--surface)] space-y-2">
                <Layers className="w-8 h-8 text-[var(--primary)] mx-auto opacity-60" />
                <h4 className="text-sm font-semibold text-[var(--text)]">No Content Blocks Added</h4>
                <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
                  Select blocks from the left palette to add headings, paragraphs, code blocks, screenshots, or feature lists.
                </p>
              </div>
            ) : (
              blocks.map((block, index) => (
                <div
                  key={block._id || block._tempId || index}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-2xs space-y-3 group hover:border-[var(--primary-border)] transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[var(--primary)] text-[10px] bg-[var(--surface-alt)] px-2 py-0.5 rounded border border-[var(--primary-border)]">
                      {block.type}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveBlockUp(index)}
                        disabled={index === 0}
                        className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text)] disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlockDown(index)}
                        disabled={index === blocks.length - 1}
                        className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text)] disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => duplicateBlock(index)}
                        className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteBlock(index)}
                        className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {block.type === 'heading' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={block.data.text || ''}
                        onChange={(e) => updateBlockData(index, 'text', e.target.value)}
                        placeholder="Section Heading Text..."
                        className="w-full text-sm font-semibold rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                      />
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-[var(--text-muted)]">Heading Level:</span>
                        {[1, 2, 3].map((lvl) => (
                          <label key={lvl} className="flex items-center gap-1 text-[var(--text-secondary)] cursor-pointer">
                            <input
                              type="radio"
                              name={`lvl-${index}`}
                              checked={block.data.level === lvl}
                              onChange={() => updateBlockData(index, 'level', lvl)}
                            />
                            <span>H{lvl}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {block.type === 'paragraph' && (
                    <textarea
                      rows={4}
                      value={block.data.text || ''}
                      onChange={(e) => updateBlockData(index, 'text', e.target.value)}
                      placeholder="Write descriptive project paragraph..."
                      className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3 text-[var(--text)] focus:outline-none focus:border-[var(--primary)] resize-y"
                    />
                  )}

                  {block.type === 'image' && (
                    <div className="space-y-3">
                      <ImageUpload
                        value={block.data.url}
                        onChange={(res) => updateBlockData(index, 'url', res.url)}
                        folder="projects"
                        label="Upload Visual"
                      />
                      <input
                        type="text"
                        value={block.data.caption || ''}
                        onChange={(e) => updateBlockData(index, 'caption', e.target.value)}
                        placeholder="Image Caption / Description..."
                        className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
                      />
                    </div>
                  )}

                  {block.type === 'gallery' && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={block.data.title || ''}
                        onChange={(e) => updateBlockData(index, 'title', e.target.value)}
                        placeholder="Gallery Title (e.g. Dashboard Screenshots)"
                        className="w-full text-xs font-semibold rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
                      />
                      <div className="space-y-2">
                        {(block.data.images || []).map((img, imgIdx) => (
                          <div key={imgIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={typeof img === 'string' ? img : img.url}
                              onChange={(e) => {
                                const newImgs = [...(block.data.images || [])];
                                newImgs[imgIdx] = { url: e.target.value, caption: '' };
                                updateBlockData(index, 'images', newImgs);
                              }}
                              placeholder="Image URL..."
                              className="flex-1 text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 text-[var(--text)]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImgs = block.data.images.filter((_, i) => i !== imgIdx);
                                updateBlockData(index, 'images', newImgs);
                              }}
                              className="text-red-500 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Plus}
                          onClick={() => {
                            const newImgs = [...(block.data.images || []), { url: '', caption: '' }];
                            updateBlockData(index, 'images', newImgs);
                          }}
                        >
                          Add Image URL
                        </Button>
                      </div>
                    </div>
                  )}

                  {block.type === 'feature-list' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={block.data.title || ''}
                        onChange={(e) => updateBlockData(index, 'title', e.target.value)}
                        placeholder="Feature Section Title"
                        className="w-full text-xs font-semibold rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 text-[var(--text)]"
                      />
                      <textarea
                        rows={4}
                        value={(block.data.items || []).join('\n')}
                        onChange={(e) =>
                          updateBlockData(
                            index,
                            'items',
                            e.target.value.split('\n').filter((item) => item.trim() !== '')
                          )
                        }
                        placeholder="Enter each feature on a new line..."
                        className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3 text-[var(--text)]"
                      />
                    </div>
                  )}

                  {block.type === 'technology-list' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={block.data.title || ''}
                        onChange={(e) => updateBlockData(index, 'title', e.target.value)}
                        placeholder="Section Title"
                        className="w-full text-xs font-semibold rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 text-[var(--text)]"
                      />
                      <input
                        type="text"
                        value={(block.data.technologies || []).join(', ')}
                        onChange={(e) =>
                          updateBlockData(
                            index,
                            'technologies',
                            e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                          )
                        }
                        placeholder="Comma separated: React.js, Express, MongoDB"
                        className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
                      />
                    </div>
                  )}

                  {block.type === 'code-block' && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={block.data.language || ''}
                          onChange={(e) => updateBlockData(index, 'language', e.target.value)}
                          placeholder="Language (e.g. javascript, python)"
                          className="w-1/2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 text-[var(--text)]"
                        />
                        <input
                          type="text"
                          value={block.data.filename || ''}
                          onChange={(e) => updateBlockData(index, 'filename', e.target.value)}
                          placeholder="Filename (optional)"
                          className="w-1/2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 text-[var(--text)]"
                        />
                      </div>
                      <textarea
                        rows={5}
                        value={block.data.code || ''}
                        onChange={(e) => updateBlockData(index, 'code', e.target.value)}
                        placeholder="Paste code snippet here..."
                        className="w-full text-xs font-mono rounded-lg bg-[#1a1a20] text-gray-100 border border-[var(--border)] p-3"
                      />
                    </div>
                  )}

                  {block.type === 'quote' && (
                    <div className="space-y-2">
                      <textarea
                        rows={3}
                        value={block.data.quote || ''}
                        onChange={(e) => updateBlockData(index, 'quote', e.target.value)}
                        placeholder="Quote text..."
                        className="w-full text-xs italic rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3 text-[var(--text)]"
                      />
                      <input
                        type="text"
                        value={block.data.author || ''}
                        onChange={(e) => updateBlockData(index, 'author', e.target.value)}
                        placeholder="Author name / role"
                        className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 text-[var(--text)]"
                      />
                    </div>
                  )}

                  {block.type === 'callout' && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <select
                          value={block.data.type || 'info'}
                          onChange={(e) => updateBlockData(index, 'type', e.target.value)}
                          className="text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 text-[var(--text)]"
                        >
                          <option value="info">Info</option>
                          <option value="warning">Warning</option>
                          <option value="success">Success</option>
                          <option value="danger">Danger</option>
                        </select>
                        <input
                          type="text"
                          value={block.data.title || ''}
                          onChange={(e) => updateBlockData(index, 'title', e.target.value)}
                          placeholder="Callout Title"
                          className="flex-1 text-xs font-semibold rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 text-[var(--text)]"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={block.data.text || ''}
                        onChange={(e) => updateBlockData(index, 'text', e.target.value)}
                        placeholder="Callout message..."
                        className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] p-2.5 text-[var(--text)]"
                      />
                    </div>
                  )}

                  {block.type === 'two-column' && (
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={block.data.leftTitle || ''}
                          onChange={(e) => updateBlockData(index, 'leftTitle', e.target.value)}
                          placeholder="Left Title"
                          className="w-full rounded-md bg-[var(--surface)] border border-[var(--border)] px-2.5 py-1.5"
                        />
                        <textarea
                          rows={3}
                          value={block.data.leftContent || ''}
                          onChange={(e) => updateBlockData(index, 'leftContent', e.target.value)}
                          placeholder="Left Column Content..."
                          className="w-full rounded-md bg-[var(--surface)] border border-[var(--border)] p-2"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={block.data.rightTitle || ''}
                          onChange={(e) => updateBlockData(index, 'rightTitle', e.target.value)}
                          placeholder="Right Title"
                          className="w-full rounded-md bg-[var(--surface)] border border-[var(--border)] px-2.5 py-1.5"
                        />
                        <textarea
                          rows={3}
                          value={block.data.rightContent || ''}
                          onChange={(e) => updateBlockData(index, 'rightContent', e.target.value)}
                          placeholder="Right Column Content..."
                          className="w-full rounded-md bg-[var(--surface)] border border-[var(--border)] p-2"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4 sticky top-36">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border)] pb-2">
              Project Settings
            </h3>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={settings.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="NCC Management Web Application"
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--primary)]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-[var(--text-secondary)] mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={settings.slug}
                onChange={(e) => setSettings({ ...settings, slug: e.target.value })}
                placeholder="ncc-management-web-application"
                className="w-full text-xs font-mono rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--primary)]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Category
              </label>
              <select
                value={settings.category}
                onChange={(e) => setSettings({ ...settings, category: e.target.value })}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--primary)]"
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="AI / ML">AI / ML</option>
                <option value="Academic">Academic</option>
                <option value="UI / UX">UI / UX</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Short Summary (Card Preview)
              </label>
              <textarea
                rows={2}
                value={settings.shortDescription}
                onChange={(e) => setSettings({ ...settings, shortDescription: e.target.value })}
                placeholder="1-2 sentences summarizing the project..."
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] p-2.5 text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                value={settings.technologies}
                onChange={(e) => setSettings({ ...settings, technologies: e.target.value })}
                placeholder="React.js, Node.js, MongoDB"
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>

            <div>
              <ImageUpload
                value={settings.coverImage?.url}
                onChange={(res) => setSettings({ ...settings, coverImage: res })}
                folder="projects"
                label="Cover Image"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-[var(--text-secondary)] mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  value={settings.organization}
                  onChange={(e) => setSettings({ ...settings, organization: e.target.value })}
                  placeholder="38 GUJ BN NCC"
                  className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-2.5 py-1.5 text-[var(--text)]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase text-[var(--text-secondary)] mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={settings.duration}
                  onChange={(e) => setSettings({ ...settings, duration: e.target.value })}
                  placeholder="2026 / Academic"
                  className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-2.5 py-1.5 text-[var(--text)]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-[var(--text-secondary)] mb-1">
                  GitHub URL (Optional)
                </label>
                <input
                  type="url"
                  value={settings.links?.github || ''}
                  onChange={(e) =>
                    setSettings({ ...settings, links: { ...settings.links, github: e.target.value } })
                  }
                  placeholder="https://github.com/..."
                  className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-2.5 py-1.5 text-[var(--text)]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase text-[var(--text-secondary)] mb-1">
                  Live URL (Optional)
                </label>
                <input
                  type="url"
                  value={settings.links?.live || ''}
                  onChange={(e) =>
                    setSettings({ ...settings, links: { ...settings.links, live: e.target.value } })
                  }
                  placeholder="https://..."
                  className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-2.5 py-1.5 text-[var(--text)]"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs font-medium text-[var(--text)] cursor-pointer pt-2 border-t border-[var(--border)]">
              <input
                type="checkbox"
                checked={settings.featured}
                onChange={(e) => setSettings({ ...settings, featured: e.target.checked })}
                className="rounded border-[var(--border)] text-[var(--primary)]"
              />
              <span>Feature on Public Homepage</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectBuilderPage;
