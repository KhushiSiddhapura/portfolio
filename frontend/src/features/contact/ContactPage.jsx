import React, { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import axiosInstance from '../../services/axiosInstance';
import Button from '../../shared/ui/Button';

export const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post('/messages', form);
      toast.success(res.data.message || 'Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Have a question, an opportunity, or a collaborative proposal? Send a message and let's discuss.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-6">
              <h3 className="font-bold text-base text-[var(--text)]">Direct Contact</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-alt)] text-[var(--primary)] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[var(--text-muted)] block">Email</span>
                    <a
                      href="mailto:khushi.siddhapura@example.com"
                      className="text-sm font-semibold text-[var(--text)] hover:text-[var(--primary)]"
                    >
                      khushi.siddhapura@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-alt)] text-[var(--primary)] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[var(--text-muted)] block">Location & Campus</span>
                    <p className="text-sm font-semibold text-[var(--text)]">
                      Gujarat, India
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Birla Vishvakarma Mahavidyalaya (BVM)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                  Online Profiles
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors flex items-center gap-2 text-xs font-medium"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors flex items-center gap-2 text-xs font-medium"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm px-3.5 py-2.5 text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm px-3.5 py-2.5 text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Internship / Full Stack Project"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm px-3.5 py-2.5 text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Share details of your inquiry or message..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm px-3.5 py-2.5 text-[var(--text)] focus:outline-none focus:border-[var(--primary)] resize-y"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                icon={Send}
                className="w-full sm:w-auto"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
