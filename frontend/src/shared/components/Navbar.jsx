import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full h-[72px] transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[var(--background)]/90 backdrop-blur-md border-[var(--border)] shadow-xs'
          : 'bg-[var(--background)] border-[var(--border)]'
      }`}
    >
      <div className="max-w-[1200px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group text-decoration-none focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-hover)] flex items-center justify-center text-white font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
            K
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-[var(--text)] leading-none group-hover:text-[var(--primary)] transition-colors">
              Khushi
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[var(--text-muted)] mt-0.5">
              Portfolio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'text-[var(--primary)] bg-[var(--primary-soft)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[var(--primary)] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Items: Theme Toggle & Resume */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/resume"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)] bg-[var(--surface-alt)] hover:bg-[var(--primary-soft)] border border-[var(--primary-border)] rounded-lg transition-all active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bg-[var(--background)] border-b border-[var(--border)] shadow-lg px-4 py-5 space-y-3 z-50">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                    active
                      ? 'text-[var(--primary)] bg-[var(--primary-soft)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-[var(--border)]">
            <Link
              to="/resume"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>View & Download Resume</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

