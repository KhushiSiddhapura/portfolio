export const initialProjectsListState = {
  projects: [],
  loading: true,
  search: '',
  statusFilter: 'all',
  categoryFilter: 'All',
  deleteId: null,
  deleting: false,
};

export const initialProjectBuilderSettings = {
  title: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  category: 'Full Stack',
  organization: '',
  role: 'Full-stack development and implementation',
  duration: '',
  technologies: 'React.js, Node.js, Express.js, MongoDB, Tailwind CSS',
  coverImage: { url: '', public_id: '' },
  links: { github: '', live: '' },
  status: 'draft',
  featured: false,
};

