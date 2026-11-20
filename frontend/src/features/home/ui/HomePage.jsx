import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Sparkles,
  Briefcase,
  Award,
  Send,
  Flame,
  Layers,
  Database,
  Terminal,
} from 'lucide-react';
import useHome from '../hook/useHome';
import VisibleLongWave from '../../../shared/components/svg/VisibleLongWave';
import WaveBottom from '../../../shared/components/svg/WaveBottom';
import WaveTop from '../../../shared/components/svg/WaveTop';
import CurvedDivider from '../../../shared/components/svg/CurvedDivider';
import SectionTransition from '../../../shared/components/svg/SectionTransition';
import OrganicShape from '../../../shared/components/svg/OrganicShape';
import Loader, { Skeleton } from '../../../shared/ui/Loader';
import Button from '../../../shared/ui/Button';

export const HomePage = () => {
  const {
    profile,
    featuredProjects,
    skillsGrouped,
    experience,
    achievements,
    loading,
    contactForm,
    setContactForm,
    submittingContact,
    handleContactSubmit,
  } = useHome();

  return (
    <div className="w-full overflow-hidden">
      {/* 1. HERO SECTION WITH CENTER PHOTO & GIANT TYPOGRAPHY (Zalanidhish Style) */}
      <section className="relative pt-6 pb-28 md:pt-10 md:pb-36 bg-[var(--background)] overflow-hidden">
        {/* Ambient Dark Nebula / Radiant Purple Glow in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-700/25 via-fuchsia-600/20 to-indigo-600/20 rounded-full blur-[140px] pointer-events-none select-none opacity-80 dark:opacity-60" />

        {/* Top Banner Status Pill */}
        <div className="max-w-[1200px] mx-auto px-4 text-center relative z-20 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--card)]/90 backdrop-blur-md border border-[var(--primary-border)] text-[var(--primary)] text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Internships & Full-Stack Projects</span>
          </div>
        </div>

        {/* Center Stage: Giant Name Text + Centered Portrait + Floating Badges */}
        <div className="relative max-w-[1300px] mx-auto px-4 min-h-[460px] sm:min-h-[540px] md:min-h-[600px] flex flex-col items-center justify-end z-10 select-none">
          {/* Giant Bold Background Typography */}
          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
            <h1 className="font-black text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] tracking-tighter uppercase leading-none bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent opacity-85 dark:opacity-75 drop-shadow-2xl">
              KHUSHI
            </h1>
          </div>

          {/* Floating Aesthetic Tech Badges Left & Right (like Zalanidhish site) */}
          {/* Left Badges */}
          <div className="absolute left-4 sm:left-12 lg:left-24 top-[22%] z-20 animate-float hidden sm:block">
            <div className="p-3.5 sm:p-4 rounded-2xl glass-panel border border-orange-500/30 text-orange-500 bg-zinc-900/40 shadow-lg backdrop-blur-xl">
              <Code2 className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute left-2 sm:left-8 lg:left-16 top-[48%] z-20 animate-float-reverse hidden sm:block">
            <div className="p-3 rounded-2xl glass-panel border border-purple-500/30 text-purple-400 bg-zinc-900/40 shadow-lg backdrop-blur-xl">
              <Flame className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <div className="absolute left-6 sm:left-16 lg:left-28 top-[72%] z-20 animate-float hidden sm:block">
            <div className="p-3 rounded-2xl glass-panel border border-[var(--primary-border)] text-[var(--primary)] bg-zinc-900/40 shadow-lg backdrop-blur-xl">
              <Terminal className="w-5 h-5" />
            </div>
          </div>

          {/* Right Badges */}
          <div className="absolute right-4 sm:right-12 lg:right-24 top-[22%] z-20 animate-float-reverse hidden sm:block">
            <div className="p-3.5 sm:p-4 rounded-2xl glass-panel border border-indigo-500/30 text-indigo-400 bg-zinc-900/40 shadow-lg backdrop-blur-xl">
              <Layers className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute right-2 sm:right-8 lg:right-16 top-[48%] z-20 animate-float hidden sm:block">
            <div className="p-3 rounded-2xl glass-panel border border-emerald-500/30 text-emerald-400 bg-zinc-900/40 shadow-lg backdrop-blur-xl">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="absolute right-6 sm:right-16 lg:right-28 top-[72%] z-20 animate-float-reverse hidden sm:block">
            <div className="p-3 rounded-2xl glass-panel border border-[var(--primary-border)] text-[var(--primary)] bg-zinc-900/40 shadow-lg backdrop-blur-xl">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>

          {/* Central Portrait of Khushi (Rising in Center overlapping Giant Text) */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-64 sm:w-80 md:w-96 aspect-[4/5] rounded-t-[3rem] sm:rounded-t-[4rem] overflow-hidden border-t-2 border-x-2 border-[var(--primary-border)] shadow-2xl bg-gradient-to-b from-[var(--surface-alt)]/60 to-[var(--surface)] group">
              <img
                src={profile?.profileImage?.url || '/khushi.jpg'}
                alt={profile?.name || 'Khushi Siddhapura'}
                onError={(e) => {
                  if (e.currentTarget.src !== window.location.origin + '/khushi.png') {
                    e.currentTarget.src = '/khushi.png';
                  }
                }}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Bottom fade into the curve */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Intro Tagline & CTA Action Bar below the center visual */}
        <div className="relative max-w-[850px] mx-auto px-4 text-center mt-6 z-20 space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Khushi Siddhapura
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[var(--primary)]">
              Full Stack Developer • B.Tech Information Technology @ BVM
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            {profile?.heroIntroduction ||
              'Turning ideas into practical digital experiences. Building scalable web applications across the MERN stack with clean architecture and modern UX.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/resume"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm text-[var(--text)] bg-[var(--card)] hover:bg-[var(--surface-alt)] border border-[var(--border-strong)] hover:border-[var(--primary)] transition-all shadow-xs"
            >
              <FileText className="w-4 h-4 text-[var(--primary)]" />
              <span>Resume</span>
            </Link>

            <div className="flex items-center gap-2 pl-2">
              <a
                href={profile?.socialLinks?.github || 'https://github.com/KhushiSiddhapura'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile?.socialLinks?.linkedin || 'https://www.linkedin.com/in/khushi-siddhapura-7247a0397'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Sweeping Visible Long Wave at the Bottom */}
        <div className="absolute bottom-0 inset-x-0 z-20">
          <VisibleLongWave fill="var(--surface)" height="90px" accentColor="#7C3AED" secondaryColor="#8B5CF6" />
        </div>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section className="py-20 bg-[var(--surface)] relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About Developer</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[var(--text)] tracking-tight">
                Curiosity, Problem-Solving & Hands-on Development
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {profile?.aboutIntroduction ||
                  'A passionate Information Technology student interested in full-stack web development, building practical applications, exploring new technologies, and creating useful digital experiences.'}
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
                >
                  <span>Read Full Developer Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary-border)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-alt)] border border-[var(--primary-border)] text-[var(--primary)] flex items-center justify-center font-bold text-sm shadow-2xs">
                  01
                </div>
                <h4 className="font-bold text-sm text-[var(--text)]">Education at BVM</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Pursuing B.Tech in Information Technology at Birla Vishvakarma Mahavidyalaya (BVM), Gujarat.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary-border)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-alt)] border border-[var(--primary-border)] text-[var(--primary)] flex items-center justify-center font-bold text-sm shadow-2xs">
                  02
                </div>
                <h4 className="font-bold text-sm text-[var(--text)]">Full-Stack Focus</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  React.js, Node.js, Express, MongoDB, PHP, and MySQL for robust, end-to-end digital solutions.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary-border)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-alt)] border border-[var(--primary-border)] text-[var(--primary)] flex items-center justify-center font-bold text-sm shadow-2xs">
                  03
                </div>
                <h4 className="font-bold text-sm text-[var(--text)]">Practical Experience</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Web Development Intern at My Job Grow, actively contributing to modern web engineering workflows.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary-border)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-alt)] border border-[var(--primary-border)] text-[var(--primary)] flex items-center justify-center font-bold text-sm shadow-2xs">
                  04
                </div>
                <h4 className="font-bold text-sm text-[var(--text)]">Competitions & UI/UX</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Awarded 2nd rank in Cracking the Code and top 3 in college Figma UI/UX design challenges.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0">
          <VisibleLongWave fill="var(--background)" height="80px" accentColor="#6D28D9" secondaryColor="#A78BFA" />
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section className="py-24 bg-[var(--background)] relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)] mb-2">
                <Code2 className="w-3.5 h-3.5" />
                <span>Selected Works</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[var(--text)] tracking-tight">
                Featured Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
                  <Skeleton className="w-full h-44" />
                  <Skeleton className="w-1/2 h-5" />
                  <Skeleton className="w-full h-12" />
                </div>
              ))}
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-muted)] text-sm">
              No featured projects published yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <article
                  key={project._id}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="w-full h-48 bg-[var(--surface-alt)] relative overflow-hidden flex items-center justify-center border-b border-[var(--border)]">
                      {project.coverImage?.url ? (
                        <img
                          src={project.coverImage.url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-center p-6 space-y-2">
                          <Code2 className="w-8 h-8 text-[var(--primary)] mx-auto opacity-75" />
                          <span className="text-xs font-medium text-[var(--text-muted)] block">
                            {project.category}
                          </span>
                        </div>
                      )}
                      <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--card)]/90 backdrop-blur-xs text-[var(--primary)] border border-[var(--primary-border)] shadow-2xs">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-lg text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                        {project.shortDescription}
                      </p>

                      {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.technologies.slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-[10px] text-[var(--text-muted)] self-center">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-transparent flex items-center justify-between text-xs font-semibold">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-[var(--primary)] hover:text-[var(--primary-hover)] inline-flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub Repository"
                          className="text-[var(--text-muted)] hover:text-[var(--text)] p-1"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.links?.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live Demo"
                          className="text-[var(--text-muted)] hover:text-[var(--text)] p-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 inset-x-0">
          <VisibleLongWave fill="var(--surface)" height="80px" accentColor="#7C3AED" secondaryColor="#8B5CF6" />
        </div>
      </section>

      {/* 4. TECHNICAL SKILLS SECTION */}
      <section className="py-24 bg-[var(--surface)] relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
              <Code2 className="w-3.5 h-3.5" />
              <span>Technical Skills</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Tools & Technologies
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Organized skill categories covering languages, client interfaces, backend APIs, databases, and development tooling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsGrouped.map((group, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xs space-y-4"
              >
                <h3 className="font-bold text-sm text-[var(--text)] border-b border-[var(--border)] pb-2.5 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[var(--primary)] rounded-full" />
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills?.map((skill) => (
                    <div
                      key={skill._id}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--surface-alt)] text-[var(--text)] border border-[var(--primary-border)] hover:border-[var(--primary)] transition-colors flex items-center gap-1.5"
                    >
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0">
          <VisibleLongWave fill="var(--background)" height="80px" accentColor="#5B21B6" secondaryColor="#7C3AED" />
        </div>
      </section>

      {/* 5. EXPERIENCE & TIMELINE SECTION */}
      <section className="py-24 bg-[var(--background)] relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Experience</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Internship & Developer Journey
            </h2>
          </div>

          <div className="relative border-l-2 border-[var(--primary-border)] ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
            {experience.map((item) => (
              <div key={item._id} className="relative group">
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--primary)] group-hover:scale-125 transition-transform" />

                <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-base text-[var(--text)]">
                      {item.position}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-alt)] text-[var(--primary)] border border-[var(--primary-border)] self-start sm:self-auto">
                      {item.startDate} {item.endDate ? `- ${item.endDate}` : '(Current)'}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-[var(--primary)]">
                    {item.organization} • {item.location || 'Online'}
                  </p>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>

                  {item.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0">
          <VisibleLongWave fill="var(--surface)" height="80px" accentColor="#7C3AED" secondaryColor="#A78BFA" />
        </div>
      </section>

      {/* 6. ACHIEVEMENTS SECTION */}
      <section className="py-24 bg-[var(--surface)] relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
              <Award className="w-3.5 h-3.5" />
              <span>Recognition</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Academic & Design Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((item, idx) => (
              <div
                key={item._id || idx}
                className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary-border)] transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-alt)] text-[var(--primary)] flex items-center justify-center font-bold text-sm">
                    #{idx + 1}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--primary)] bg-[var(--surface-alt)] px-2 py-1 rounded-md border border-[var(--primary-border)]">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[var(--text)] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
                {item.date && (
                  <p className="text-[11px] font-medium text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
                    {item.date}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0">
          <VisibleLongWave fill="var(--background)" height="80px" accentColor="#6D28D9" secondaryColor="#8B5CF6" />
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section className="py-24 bg-[var(--background)] relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                <Mail className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight">
                Let's Build Something Meaningful Together
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Whether you have an internship opportunity, a project to collaborate on, or simply want to connect, feel free to drop a message.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-alt)] text-[var(--primary)] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[var(--text-muted)] block">Email</span>
                    <a
                      href={`mailto:${profile?.email || 'khushi.siddhapura@example.com'}`}
                      className="text-sm font-semibold text-[var(--text)] hover:text-[var(--primary)]"
                    >
                      {profile?.email || 'khushi.siddhapura@example.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-alt)] text-[var(--primary)] flex items-center justify-center">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[var(--text-muted)] block">LinkedIn</span>
                    <a
                      href={profile?.socialLinks?.linkedin || 'https://linkedin.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[var(--text)] hover:text-[var(--primary)]"
                    >
                      Khushi Siddhapura
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleContactSubmit}
                className="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm px-3.5 py-2.5 text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
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
                    placeholder="Internship / Collaboration / Inquiry"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm px-3.5 py-2.5 text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm px-3.5 py-2.5 text-[var(--text)] focus:outline-none focus:border-[var(--primary)] resize-y"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={submittingContact}
                  icon={Send}
                  className="w-full sm:w-auto"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

