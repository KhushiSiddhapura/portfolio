import { Link } from 'react-router-dom';
import { Search, Code2, ArrowRight, ExternalLink, Github } from 'lucide-react';
import useProjects from '../hook/useProjects';
import { projectCategories } from '../state/projectsState';
import { Skeleton } from '../../../shared/ui/Loader';
import EmptyState from '../../../shared/ui/EmptyState';

export const ProjectsPage = () => {
  const {
    projects,
    total,
    totalPages,
    currentPage,
    loading,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    page,
    setPage,
    refetch,
  } = useProjects();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
            <Code2 className="w-3.5 h-3.5" />
            <span>Portfolio Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight">
            Projects & Practical Applications
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Explore full-stack implementations, academic systems, and experimental concepts built across the MERN stack and modern web technologies.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex flex-wrap items-center gap-1.5">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--primary)] text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--card)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className="relative min-w-65">
            <input
              type="text"
              placeholder="Search by title, tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs rounded-lg bg-[var(--card)] border border-[var(--border)] pl-9 pr-4 py-2 text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
            />
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
                <Skeleton className="w-full h-44" />
                <Skeleton className="w-2/3 h-5" />
                <Skeleton className="w-full h-12" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <EmptyState
            title="No projects found"
            description={
              search
                ? `No published projects matching "${search}". Try adjusting your filters.`
                : 'No published projects in this category yet.'
            }
            actionText="Clear Filters"
            onAction={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <article
                key={project._id}
                className="group rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary-border)] hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="w-full h-48 bg-[var(--surface-alt)] relative overflow-hidden flex items-center justify-center border-b border-[var(--border)]">
                    {project.coverImage?.url ? (
                      <img
                        src={project.coverImage.url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-center p-6 space-y-2">
                        <Code2 className="w-8 h-8 text-[var(--primary)] mx-auto opacity-75" />
                        <span className="text-xs font-medium text-[var(--text-muted)] block">
                          {project.category}
                        </span>
                      </div>
                    )}
                    <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--card)]/90 backdrop-blur-xs text-[var(--primary)] border border-[var(--border)] shadow-2xs">
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
                    <span>View Project</span>
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

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg border border-[var(--border)] bg-[var(--card)] disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-xs text-[var(--text-muted)] px-3">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg border border-[var(--border)] bg-[var(--card)] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;

