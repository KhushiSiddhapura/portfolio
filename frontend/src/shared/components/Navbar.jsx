import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Menu, X, FileText} from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState (false);
  const [scrolled, setScrolled] = useState (false);
  const location = useLocation ();

  useEffect (() => {
    const handleScroll = () => {
      setScrolled (window.scrollY > 20);
    };

    window.addEventListener ('scroll', handleScroll);
    handleScroll ();

    return () => window.removeEventListener ('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect (
    () => {
      setIsOpen (false);
    },
    [location.pathname]
  );

  // Close menu when switching to desktop layout
  useEffect (() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen (false);
      }
    };

    window.addEventListener ('resize', handleResize);
    return () => window.removeEventListener ('resize', handleResize);
  }, []);

  const navLinks = [
    {name: 'Home', path: '/'},
    {name: 'About', path: '/about'},
    {name: 'Projects', path: '/projects'},
    {name: 'Experience', path: '/experience'},
    {name: 'Achievements', path: '/achievements'},
    {name: 'Contact', path: '/contact'},
  ];

  const isActive = path => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith (path);
  };

  return (
    <div className="sticky top-0 z-50 w-full pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none print:hidden">

      {/* Floating Island Navbar */}
      <header
        className={`max-w-280 mx-auto w-full transition-all duration-300 pointer-events-auto rounded-full px-3.5 sm:px-6 py-2.5 border ${scrolled ? 'bg-[var(--card)]/95 backdrop-blur-md border-[var(--border)] shadow-lg' : 'bg-[var(--card)]/85 backdrop-blur-md border-[var(--border)] shadow-md'} flex items-center justify-between gap-2`}
      >

        {/* Brand Logo & Name */}
        <Link
          to="/"
          className="flex items-center gap-2 group shrink-0 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[var(--primary)] to-[var(--primary-hover)] flex items-center justify-center text-white font-extrabold text-sm shadow-xs group-hover:scale-105 transition-transform shrink-0">
            K
          </div>

          <span className="font-extrabold text-sm sm:text-base tracking-tight text-[var(--text)] group-hover:text-[var(--primary)] transition-colors whitespace-nowrap">
            Khushi
            <span className="text-[var(--primary)] font-semibold hidden sm:inline">
              {' '}Siddhapura
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
          {navLinks.map (link => {
            const active = isActive (link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-full whitespace-nowrap transition-all ${active ? 'text-[var(--primary)] bg-[var(--primary-soft)]' : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)]'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Controls */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
          <Link
            to="/resume"
            className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-1.5 xl:py-2 text-xs font-bold text-white bg-zinc-900 hover:bg-[var(--primary)] rounded-full transition-all duration-200 active:scale-95 shadow-xs whitespace-nowrap ml-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </Link>
        </div>

        {/* Mobile & Tablet Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen (!isOpen)}
            className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)] focus:outline-none cursor-pointer"
            aria-label={
              isOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Drawer */}
      {isOpen &&
        <div className="lg:hidden pointer-events-auto max-w-280 mx-auto mt-2 rounded-2xl border border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-xl p-4 shadow-xl space-y-2">

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map (link => {
              const active = isActive (link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${active ? 'text-[var(--primary)] bg-[var(--primary-soft)] font-semibold' : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)]'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Resume Button */}
          <div className="pt-3 border-t border-[var(--border)]">
            <Link
              to="/resume"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View & Download Resume</span>
            </Link>
          </div>
        </div>}
    </div>
  );
};

export default Navbar;
