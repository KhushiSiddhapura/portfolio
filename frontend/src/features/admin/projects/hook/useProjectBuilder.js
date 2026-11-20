import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import adminProjectsApi from '../api/adminProjectsApi';
import { initialProjectBuilderSettings } from '../state/adminProjectsState';

export const useProjectBuilder = (id) => {
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [settings, setSettings] = useState(initialProjectBuilderSettings);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    if (isEditing) {
      const fetchProject = async () => {
        try {
          const p = await adminProjectsApi.getProjectById(id);
          setSettings({
            title: p.title || '',
            slug: p.slug || '',
            shortDescription: p.shortDescription || '',
            fullDescription: p.fullDescription || '',
            category: p.category || 'Full Stack',
            organization: p.organization || '',
            role: p.role || '',
            duration: p.duration || '',
            technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : '',
            coverImage: p.coverImage || { url: '', public_id: '' },
            links: {
              github: p.links?.github || '',
              live: p.links?.live || '',
            },
            status: p.status || 'draft',
            featured: Boolean(p.featured),
          });
          setBlocks(p.contentBlocks || []);
        } catch (err) {
          toast.error('Failed to load project details');
          navigate('/admin/projects');
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [id, isEditing, navigate]);

  const handleTitleChange = (newTitle) => {
    setSettings((prev) => {
      const autoSlug = newTitle
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return {
        ...prev,
        title: newTitle,
        slug: !isEditing && (!prev.slug || prev.slug === '') ? autoSlug : prev.slug,
      };
    });
  };

  const handleAddBlock = (type) => {
    const newOrder = blocks.length + 1;
    let defaultData = {};

    switch (type) {
      case 'heading':
        defaultData = { text: 'New Section Title', level: 2 };
        break;
      case 'paragraph':
        defaultData = { text: 'Write your project content description here...' };
        break;
      case 'image':
        defaultData = { url: '', caption: '' };
        break;
      case 'gallery':
        defaultData = { title: 'Project Screenshots', images: [{ url: '', caption: '' }] };
        break;
      case 'video':
        defaultData = { url: '', title: 'Demo Walkthrough' };
        break;
      case 'feature-list':
        defaultData = {
          title: 'Key Implemented Features',
          items: ['First key feature description', 'Second architectural capability'],
        };
        break;
      case 'technology-list':
        defaultData = {
          title: 'Technologies Applied',
          technologies: ['React.js', 'Node.js', 'MongoDB'],
        };
        break;
      case 'code-block':
        defaultData = {
          language: 'javascript',
          filename: 'controller.js',
          code: '// Example code snippet\nconst express = require("express");\nconst app = express();',
        };
        break;
      case 'quote':
        defaultData = {
          quote: 'Building this project deepened my understanding of scalable web architecture.',
          author: 'Khushi Siddhapura',
        };
        break;
      case 'architecture-image':
        defaultData = {
          title: 'System Architecture & Data Flow',
          description: 'Client layer communicating with Express REST APIs and MongoDB Atlas database.',
          url: '',
        };
        break;
      case 'two-column':
        defaultData = {
          leftTitle: 'Problem Statement',
          leftContent: 'Manual tracking was prone to discrepancies and slow queries.',
          rightTitle: 'Engineered Solution',
          rightContent: 'A centralized portal with automated validation and structured reporting.',
        };
        break;
      case 'callout':
        defaultData = {
          type: 'info',
          title: 'Design Note',
          text: 'Highlighted achievement or implementation constraint.',
        };
        break;
      default:
        break;
    }

    const newBlock = {
      type,
      data: defaultData,
      order: newOrder,
      _tempId: `temp-${Date.now()}-${Math.random()}`,
    };

    setBlocks([...blocks, newBlock]);
    toast.info(`Added ${type} block`);
  };

  const moveBlockUp = (index) => {
    if (index === 0) return;
    const updated = [...blocks];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setBlocks(updated);
  };

  const moveBlockDown = (index) => {
    if (index === blocks.length - 1) return;
    const updated = [...blocks];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setBlocks(updated);
  };

  const duplicateBlock = (index) => {
    const target = blocks[index];
    const clone = {
      ...JSON.parse(JSON.stringify(target)),
      _id: undefined,
      _tempId: `temp-${Date.now()}`,
    };
    const updated = [...blocks];
    updated.splice(index + 1, 0, clone);
    setBlocks(updated);
    toast.info('Block duplicated');
  };

  const deleteBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const updateBlockData = (index, key, value) => {
    const updated = [...blocks];
    updated[index].data = {
      ...updated[index].data,
      [key]: value,
    };
    setBlocks(updated);
  };

  const handleSave = async (targetStatus) => {
    if (!settings.title.trim()) {
      toast.error('Project title is required');
      return;
    }

    setSaving(true);
    try {
      const techArray = settings.technologies
        ? settings.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

      const orderedBlocks = blocks.map((b, i) => ({
        type: b.type,
        data: b.data,
        order: i + 1,
      }));

      const payload = {
        title: settings.title.trim(),
        slug: settings.slug.trim(),
        shortDescription: settings.shortDescription.trim(),
        fullDescription: settings.fullDescription.trim(),
        category: settings.category,
        organization: settings.organization.trim(),
        role: settings.role.trim(),
        duration: settings.duration.trim(),
        technologies: techArray,
        coverImage: settings.coverImage,
        links: settings.links,
        featured: settings.featured,
        status: targetStatus || settings.status,
        contentBlocks: orderedBlocks,
      };

      if (isEditing) {
        await adminProjectsApi.updateProject(id, payload);
        toast.success(`Project updated (${targetStatus || settings.status})`);
      } else {
        const created = await adminProjectsApi.createProject(payload);
        toast.success(`Project created (${targetStatus || settings.status})`);
        navigate(`/admin/projects/edit/${created._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return {
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
  };
};

export default useProjectBuilder;

