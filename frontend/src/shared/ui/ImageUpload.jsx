
import { useState, useEffect } from 'react';
import { UploadCloud, X } from 'lucide-react';
import axiosInstance from '../../services/axiosInstance';
import { toast } from 'react-toastify';

export const ImageUpload = ({
  value,
  onChange,
  folder = 'general',
  label = 'Image Upload',
  aspectRatio = 'aspect-video',
  maxHeight = '180px',
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(
    typeof value === 'object' ? value?.url : value || ''
  );

  useEffect(() => {
    setPreview(typeof value === 'object' ? value?.url : value || '');
  }, [value]);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, WEBP, SVG)');
      e.target.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB');
      e.target.value = '';
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    setUploading(true);

    try {
      const response = await axiosInstance.post(
        '/admin/upload/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const data = response.data.data;

      setPreview(data.url);
      onChange?.(data);

      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to upload image'
      );

      setPreview(
        typeof value === 'object' ? value?.url : value || ''
      );
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();

    setPreview('');
    onChange?.({ url: '', public_id: '' });
  };

  return (
    <div className="w-full min-w-0">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
          {label}
        </label>
      )}

      <div
        style={{ maxHeight }}
        className={`
          relative group overflow-hidden
          rounded-xl border border-dashed
          border-[var(--border)]
          hover:border-[var(--primary)]
          bg-[var(--surface)]
          transition-colors
          ${aspectRatio}
        `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="
            absolute inset-0 w-full h-full
            opacity-0 cursor-pointer z-10
            disabled:cursor-not-allowed
          "
        />

        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Image Preview"
              className="w-full h-full object-cover"
            />

            {/* Image Overlay */}
            <div className="
              absolute inset-0
              bg-black/40
              opacity-0 group-hover:opacity-100
              transition-opacity
              flex items-center justify-center
              z-20
            ">
              <span className="
                text-white text-xs font-medium
                bg-black/60
                px-3 py-2 rounded-lg
              ">
                Change Image
              </span>
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="
                absolute top-2 right-2 z-30
                p-1.5 rounded-lg
                bg-red-600 text-white
                hover:bg-red-700
                transition-colors
                cursor-pointer
                disabled:opacity-50
              "
              title="Remove Image"
            >
              <X className="w-4 h-4" />
            </button>

            {uploading && (
              <div className="
                absolute inset-0 z-30
                bg-black/50
                flex items-center justify-center
              ">
                <div className="flex items-center gap-2 text-white text-xs">
                  <div className="
                    w-4 h-4 border-2
                    border-white border-t-transparent
                    rounded-full animate-spin
                  " />
                  Uploading...
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="
            w-full h-full
            flex flex-col items-center justify-center
            p-4 text-center
          ">
            <div className="
              w-10 h-10 rounded-xl
              bg-[var(--surface-alt)]
              text-[var(--primary)]
              flex items-center justify-center
              mb-2
            ">
              {uploading ? (
                <div className="
                  w-5 h-5 border-2
                  border-[var(--primary)]
                  border-t-transparent
                  rounded-full animate-spin
                " />
              ) : (
                <UploadCloud className="w-5 h-5" />
              )}
            </div>

            <p className="text-xs font-semibold text-[var(--text)]">
              {uploading ? 'Uploading...' : 'Upload Image'}
            </p>

            <p className="
              text-[10px] text-[var(--text-muted)]
              mt-1
            ">
              PNG, JPG, WEBP, SVG · Max 10MB
            </p>
          </div>
        )}
      </div>

      {preview && (
        <p className="text-[10px] text-[var(--text-muted)] mt-2">
          Click image to replace it.
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
