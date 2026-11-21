import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Github,
  ExternalLink,
  Code2,
  Sparkles,
} from 'lucide-react';
import useHome from '../hook/useHome';
import VisibleLongWave from '../../../shared/components/svg/VisibleLongWave';
import { Skeleton } from '../../../shared/ui/Loader';

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
      {/* 1. HERO SECTION WITH CENTER PHOTO & BALANCED TYPOGRAPHY */}
      <section className="relative pb-24 md:pb-32 bg-(var(--background)) overflow-hidden max-w-full">
        {/* Ambient Dark Nebula / Soft Radiant Purple Glow in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-linear-to-tr from-purple-700/20 via-fuchsia-600/15 to-indigo-600/15 rounded-full blur-[130px] pointer-events-none select-none opacity-70 dark:opacity-50" />

        {/* Center Stage Container with Overflow Guard */}
        <div className="relative max-w-275 mx-auto px-4 min-h-100 sm:min-h-115 md:min-h-125 flex flex-col items-center justify-end z-10 select-none overflow-hidden">
          {/* Toned Down, Responsive Background Typography */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-full overflow-hidden text-center pointer-events-none select-none z-0 px-4">
            <h1
              className="font-black tracking-tight uppercase leading-none select-none whitespace-nowrap bg-linear-to-r from-purple-500/25 via-violet-400/20 to-indigo-500/25 dark:from-purple-400/15 dark:via-fuchsia-400/15 dark:to-indigo-400/15 bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(1.5rem, 8vw, 7.5rem)' }}
            >
              KHUSHI SIDDHAPURA
            </h1>
          </div>

          {/* Central High-Res Portrait Card of Khushi */}
          <div className="relative z-10 flex flex-col items-center justify-end w-full">

      {/* Ambient Aura */}
      <div className="absolute bottom-10 w-[75%] h-[65%]
        bg-linear-to-tr from-[var(--primary)]/20
        via-purple-500/10 to-transparent rounded-full
        blur-3xl opacity-60 pointer-events-none"
      />

      <img
        src="/khushi.png"
        alt={profile?.name || 'Khushi Siddhapura'}
        className="relative z-10 translate-y-20 sm:translate-y-24 md:translate-y-28
  h-95 sm:h-120 md:h-125 lg:h-140
  w-auto max-w-full object-contain object-bottom
  select-none pointer-events-none"
      />
    </div>
        </div>
        {/* Sweeping Visible Long Wave at the Bottom */}
        <div className="absolute bottom-0 inset-x-0 z-20">
          <VisibleLongWave fill="var(--surface)" height="84px" accentColor="#7C3AED" secondaryColor="#8B5CF6" />
        </div>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section className="py-20 bg-[var(--surface)] relative">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
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
    </div>
  );
};

export default HomePage;