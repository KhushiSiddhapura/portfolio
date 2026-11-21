import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import projectsApi from "../api/projectsApi";

export const useProjects = (initialCategory = "All") => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["projects", selectedCategory, search, page],
    queryFn: async () => {
      const params = {
        page,
        limit: 9,
      };
      if (selectedCategory !== "All") params.category = selectedCategory;
      if (search.trim()) params.search = search.trim();

      const res = await projectsApi.getProjects(params);
      return {
        projects: res.data || [],
        total: res.total || 0,
        totalPages: res.pages || 1,
        currentPage: page,
      };
    },
  });

  return {
    projects: data?.projects || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    currentPage: data?.currentPage || page,
    loading: isLoading,
    error: error ? error.response?.data?.message || error.message : null,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory: (cat) => {
      setSelectedCategory(cat);
      setPage(1);
    },
    page,
    setPage,
    refetch,
  };
};

export default useProjects;
