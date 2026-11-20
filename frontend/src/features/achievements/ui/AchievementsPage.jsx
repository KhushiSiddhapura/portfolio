import React from 'react';
import { Award, Calendar, Trophy, Palette } from 'lucide-react';
import useAchievements from '../hook/useAchievements';
import Loader from '../../../shared/ui/Loader';

export const AchievementsPage = () => {
  const { achievements, loading } = useAchievements();

  if (loading) {
    return <Loader text="Loading achievements..." className="min-h-[50vh]" />;
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Competition':
        return Trophy;
      case 'Design':
        return Palette;
      default:
        return Award;
    }
  };

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
            <Award className="w-3.5 h-3.5" />
            <span>Honors & Competitions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight">
            Achievements & Awards
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Academic milestones, programming contest standings, and design accolades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, idx) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div
                key={item._id || idx}
                className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary-border)] hover:shadow-xs transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[var(--surface-alt)] text-[var(--primary)] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--primary)] bg-[var(--surface-alt)] px-2.5 py-1 rounded-md border border-[var(--primary-border)]">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-[var(--text)] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.date && (
                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5" /> {item.date}
                    </span>
                    <span className="font-semibold text-[var(--primary)]">Verified Milestone</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
