import { useState, useEffect, useCallback } from 'react';
import dashboardApi from '../api/dashboardApi';
import { initialDashboardState } from '../state/dashboardState';

export const useDashboard = () => {
  const [data, setData] = useState(initialDashboardState);

  const fetchStats = useCallback(async () => {
    setData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const stats = await dashboardApi.getStats();
      setData({
        counts: stats.counts || initialDashboardState.counts,
        recentProjects: stats.recentProjects || [],
        recentMessages: stats.recentMessages || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to load dashboard metrics',
      }));
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    ...data,
    refetch: fetchStats,
  };
};

export default useDashboard;

