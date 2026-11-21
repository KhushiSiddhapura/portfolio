export const projectCategories = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "AI / ML",
  "Academic",
  "UI / UX",
];

export const initialProjectsListState = {
  projects: [],
  total: 0,
  totalPages: 1,
  currentPage: 1,
  loading: true,
  error: null,
};

export const initialProjectDetailState = {
  project: null,
  navigation: { prev: null, next: null },
  loading: true,
  error: null,
};
