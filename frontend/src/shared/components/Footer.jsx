import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Identity */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white font-bold flex items-center justify-center text-sm">
                K
              </div>
              <span className="font-bold text-lg text-[var(--text)] tracking-tight">
                Khushi Siddhapura
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed">
              Full Stack Developer & B.Tech IT Student at Birla Vishvakarma Mahavidyalaya.
              Passionate about turning ideas into reliable, practical web applications.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] hover:text-[var(--primary)] flex items-center justify-center transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] hover:text-[var(--primary)] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                aria-label="Contact Khushi"
                className="w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] hover:text-[var(--primary)] flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[var(--primary)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--primary)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[var(--primary)] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-[var(--primary)] transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-[var(--primary)] transition-colors">
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-[var(--primary)] transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link to="/resume" className="hover:text-[var(--primary)] transition-colors">
                  Download Resume
                </Link>
              </li>
              <li className="text-xs text-[var(--text-muted)] pt-2">
                Birla Vishvakarma Mahavidyalaya (BVM), Gujarat
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© {currentYear} Khushi Siddhapura. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with MERN Stack & Tailwind CSS</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-md hover:bg-[var(--card)] hover:text-[var(--text)] transition-colors flex items-center gap-1"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

