import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Globe } from 'lucide-react';
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
    <div className="sticky top-0 z-50 w-full pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none">
      {/* Floating Island Capsule Navbar */}
      <header
        className={`max-w-[1120px] mx-auto w-full transition-all duration-300 pointer-events-auto rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 border ${
          scrolled
            ? 'bg-[var(--card)]/95 backdrop-blur-md border-[var(--border)] shadow-lg'
            : 'bg-[var(--card)]/85 backdrop-blur-md border-[var(--border)] shadow-md'
        } flex items-center justify-between gap-2 sm:gap-4`}
      >
        {/* Brand Logo & Name */}
        <Link
          to="/"
          className="flex items-center gap-2 group text-decoration-none focus:outline-none shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-hover)] flex items-center justify-center text-white font-extrabold text-sm shadow-xs group-hover:scale-105 transition-transform shrink-0">
            K
          </div>
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-[var(--text)] group-hover:text-[var(--primary)] transition-colors whitespace-nowrap">
            Khushi <span className="text-[var(--primary)] font-semibold hidden sm:inline">Siddhapura</span>
          </span>
        </Link>

        {/* Desktop Navigation Links - Optimized for clean spacing without wrapping */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5 shrink-0">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-full whitespace-nowrap transition-all ${
                  active
                    ? 'text-[var(--primary)] bg-[var(--primary-soft)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls: Language/Globe, Theme Toggle & Resume Button */}
        <div className="hidden md:flex items-center gap-2 lg:gap-2.5 shrink-0">

          <ThemeToggle />

          <Link
            to="/resume"
            className="inline-flex items-center gap-1.5 px-3.5 lg:px-4 py-1.5 lg:py-2 text-xs font-bold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 hover:bg-[var(--primary)] dark:hover:bg-[var(--primary)] dark:hover:text-white rounded-full transition-all duration-200 active:scale-95 shadow-xs whitespace-nowrap ml-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </Link>
        </div>

        {/* Mobile Navigation Toggle & Controls */}
        <div className="flex md:hidden items-center gap-1.5">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden pointer-events-auto max-w-[1120px] mx-auto mt-2 rounded-2xl border border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-xl p-4 shadow-xl space-y-2 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                    active
                      ? 'text-[var(--primary)] bg-[var(--primary-soft)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-[var(--border)] flex flex-col gap-2">
            <Link
              to="/resume"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>View & Download Resume</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
