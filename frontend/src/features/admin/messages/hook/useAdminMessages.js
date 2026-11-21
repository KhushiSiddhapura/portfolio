import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import adminMessagesApi from "../api/adminMessagesApi";

export const useAdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isReadFilter, setIsReadFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [viewingMessage, setViewingMessage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (isReadFilter !== "all") params.isRead = isReadFilter === "read";
      if (search.trim()) params.search = search.trim();

      const res = await adminMessagesApi.getMessages(params);
      setMessages(res.data || []);
      setUnreadCount(res.unreadCount || 0);
    } catch (err) {
      toast.error("Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  }, [isReadFilter, search]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleToggleRead = async (message) => {
    const newStatus = !message.isRead;
    try {
      const res = await adminMessagesApi.markRead(message._id, newStatus);
      setMessages((prev) =>
        prev.map((m) =>
          m._id === message._id ? { ...m, isRead: newStatus } : m,
        ),
      );
      setUnreadCount(res.unreadCount);
      if (viewingMessage && viewingMessage._id === message._id) {
        setViewingMessage({ ...viewingMessage, isRead: newStatus });
      }
      toast.info(`Message marked as ${newStatus ? "read" : "unread"}`);
    } catch (err) {
      toast.error("Failed to update read state");
    }
  };

  const openViewModal = async (message) => {
    setViewingMessage(message);
    if (!message.isRead) {
      handleToggleRead(message);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await adminMessagesApi.deleteMessage(deleteId);
      toast.success("Message deleted successfully");
      setMessages((prev) => prev.filter((m) => m._id !== deleteId));
      setUnreadCount(res.unreadCount);
      setDeleteId(null);
      if (viewingMessage?._id === deleteId) {
        setViewingMessage(null);
      }
    } catch (err) {
      toast.error("Failed to delete message");
    }
  };

  return {
    messages,
    unreadCount,
    loading,
    isReadFilter,
    setIsReadFilter,
    search,
    setSearch,
    viewingMessage,
    setViewingMessage,
    deleteId,
    setDeleteId,
    handleToggleRead,
    openViewModal,
    confirmDelete,
    refetch: fetchMessages,
  };
};

export default useAdminMessages;
