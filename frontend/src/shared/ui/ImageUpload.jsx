import React, { useState } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import axiosInstance from '../../services/axiosInstance';
import { toast } from 'react-toastify';

export const ImageUpload = ({
  value, // { url, public_id } or string URL
  onChange,
  folder = 'general',
  label = 'Image Upload',
  aspectRatio = 'aspect-video',
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(typeof value === 'object' ? value?.url : value || '');

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, WEBP, SVG)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    // Set temporary local preview
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    // Upload to server
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    setUploading(true);
    try {
      const response = await axiosInstance.post('/admin/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data = response.data.data;
      setPreview(data.url);
      onChange?.(data);
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload image');
      setPreview(typeof value === 'object' ? value?.url : value || '');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview('');
    onChange?.({ url: '', public_id: '' });
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
          {label}
        </label>
      )}

      <div
        className={`relative group overflow-hidden rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] bg-[var(--surface)] transition-all cursor-pointer ${aspectRatio} flex items-center justify-center`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="absolute inset-0 opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
        />

        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
              <span className="text-white text-xs font-medium bg-black/60 px-3 py-1 rounded-md">
                Change Image
              </span>
              <button
                type="button"
                onClick={handleRemove}
                className="text-white bg-red-600/80 hover:bg-red-600 p-1.5 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-[var(--surface-alt)] text-[var(--primary)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              {uploading ? (
                <div className="w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
              ) : (
                <UploadCloud className="w-5 h-5" />
              )}
            </div>
            <p className="text-xs font-medium text-[var(--text)]">
              {uploading ? 'Uploading...' : 'Click or drag image to upload'}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
              PNG, JPG, WEBP, SVG up to 10MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

