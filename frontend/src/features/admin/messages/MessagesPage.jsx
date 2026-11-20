import React, { useEffect, useState } from 'react';
import { Mail, Search, Trash2, CheckCircle2, Clock, Eye, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../services/axiosInstance';
import Modal from '../../../shared/ui/Modal';
import ConfirmDialog from '../../../shared/ui/ConfirmDialog';
import Loader from '../../../shared/ui/Loader';
import EmptyState from '../../../shared/ui/EmptyState';
import Button from '../../../shared/ui/Button';

export const MessagesManagementPage = () => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isReadFilter, setIsReadFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [viewingMessage, setViewingMessage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params = {};
      if (isReadFilter !== 'all') params.isRead = isReadFilter === 'read';
      if (search.trim()) params.search = search.trim();

      const res = await axiosInstance.get('/admin/messages', { params });
      setMessages(res.data.data || []);
      setUnreadCount(res.data.unreadCount || 0);
    } catch (err) {
      toast.error('Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [isReadFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMessages();
  };

  const handleToggleRead = async (message) => {
    const newStatus = !message.isRead;
    try {
      const res = await axiosInstance.patch(`/admin/messages/${message._id}/read`, {
        isRead: newStatus,
      });
      setMessages((prev) =>
        prev.map((m) => (m._id === message._id ? { ...m, isRead: newStatus } : m))
      );
      setUnreadCount(res.data.unreadCount);
      if (viewingMessage && viewingMessage._id === message._id) {
        setViewingMessage({ ...viewingMessage, isRead: newStatus });
      }
      toast.info(`Message marked as ${newStatus ? 'read' : 'unread'}`);
    } catch (err) {
      toast.error('Failed to update read state');
    }
  };

  const openViewModal = async (message) => {
    setViewingMessage(message);
    if (!message.isRead) {
      // Auto mark as read on view
      handleToggleRead(message);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await axiosInstance.delete(`/admin/messages/${deleteId}`);
      toast.success('Message deleted successfully');
      setMessages(messages.filter((m) => m._id !== deleteId));
      setUnreadCount(res.data.unreadCount);
      setDeleteId(null);
      if (viewingMessage?._id === deleteId) {
        setViewingMessage(null);
      }
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--text)]">Contact Messages Inbox</h2>
          <p className="text-xs text-[var(--text-muted)]">
            Manage inquiries, feedback, and collaboration requests received through the public contact form.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--surface-alt)] text-[var(--primary)] border border-[var(--primary-border)]">
          <span>{unreadCount} Unread Messages</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search messages by sender, email, content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] pl-9 pr-4 py-2 text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
          />
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
        </form>

        <select
          value={isReadFilter}
          onChange={(e) => setIsReadFilter(e.target.value)}
          className="text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
        >
          <option value="all">All Inquiries</option>
          <option value="unread">Unread Only</option>
          <option value="read">Read Only</option>
        </select>
      </div>

      {/* Messages List */}
      {loading ? (
        <Loader text="Loading messages..." className="py-12" />
      ) : messages.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="Inbox Empty"
          description="No contact messages received matching your filter criteria."
        />
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m._id}
              onClick={() => openViewModal(m)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                !m.isRead
                  ? 'border-[var(--primary-border)] bg-[var(--surface-alt)] shadow-xs font-medium'
                  : 'border-[var(--border)] bg-[var(--card)] opacity-90'
              }`}
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[var(--text)]">{m.name}</span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    &lt;{m.email}&gt;
                  </span>
                  {!m.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />
                  )}
                </div>

                <p className="text-xs font-semibold text-[var(--text)]">
                  {m.subject || 'General Inquiry'}
                </p>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                  {m.message}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                <span className="text-[11px] text-[var(--text-muted)]">
                  {new Date(m.createdAt).toLocaleDateString()}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleRead(m)}
                  className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)] transition-colors"
                  title={m.isRead ? 'Mark as Unread' : 'Mark as Read'}
                >
                  {m.isRead ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Clock className="w-4 h-4 text-amber-500" />}
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteId(m._id)}
                  className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  title="Delete Message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Detail Modal */}
      <Modal
        isOpen={Boolean(viewingMessage)}
        onClose={() => setViewingMessage(null)}
        title={viewingMessage?.subject || 'Contact Inquiry Details'}
      >
        {viewingMessage && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-[var(--text)]">From: {viewingMessage.name}</span>
                <span className="text-[var(--text-muted)]">
                  {new Date(viewingMessage.createdAt).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">Reply to:</span>{' '}
                <a
                  href={`mailto:${viewingMessage.email}`}
                  className="font-semibold text-[var(--primary)] hover:underline"
                >
                  {viewingMessage.email}
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Message Body
              </h4>
              <p className="text-sm text-[var(--text)] leading-relaxed whitespace-pre-line p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                {viewingMessage.message}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
              <a
                href={`mailto:${viewingMessage.email}?subject=Re: ${encodeURIComponent(
                  viewingMessage.subject || 'Inquiry'
                )}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
              >
                Reply via Email
              </a>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleRead(viewingMessage)}
                >
                  Mark as {viewingMessage.isRead ? 'Unread' : 'Read'}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setDeleteId(viewingMessage._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Message?"
        message="Are you sure you want to permanently delete this message inquiry?"
      />
    </div>
  );
};

export default MessagesManagementPage;
