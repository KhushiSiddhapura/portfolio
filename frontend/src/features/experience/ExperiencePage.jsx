import React, { useEffect, useState } from 'react';
import { Briefcase, Building, Calendar, MapPin } from 'lucide-react';
import axiosInstance from '../../services/axiosInstance';
import Loader from '../../shared/ui/Loader';

export const ExperiencePage = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axiosInstance.get('/experience');
        setExperience(res.data.data || []);
      } catch (err) {
        console.error('Failed to load experience:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  if (loading) {
    return <Loader text="Loading experience timeline..." className="min-h-[50vh]" />;
  }

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career & Practical Experience</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight">
            Experience Timeline
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Hands-on internships, roles, and software engineering experience.
          </p>
        </div>

        <div className="relative border-l-2 border-[var(--primary-border)] ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
          {experience.map((item) => (
            <div key={item._id} className="relative group">
              <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--primary)] group-hover:scale-125 transition-transform" />

              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-bold text-lg text-[var(--text)]">{item.position}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-alt)] text-[var(--primary)] border border-[var(--primary-border)] self-start sm:self-auto">
                    {item.startDate} {item.endDate ? `- ${item.endDate}` : '(Current)'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-[var(--text-muted)]">
                  <span className="flex items-center gap-1 text-[var(--primary)]">
                    <Building className="w-3.5 h-3.5" /> {item.organization}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {item.location || 'Online / Remote'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>

                {item.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border)]">
                    {item.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]"
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
    </div>
  );
};

export default ExperiencePage;
