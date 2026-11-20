import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  FileText,
  Briefcase,
  Award,
  ArrowRight,
} from 'lucide-react';
import useAbout from '../hook/useAbout';
import Loader from '../../../shared/ui/Loader';

export const AboutPage = () => {
  const { profile, experience, achievements, loading } = useAbout();

  if (loading) {
    return <Loader text="Loading developer profile..." className="min-h-[50vh]" />;
  }

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Developer Profile</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight">
              About Khushi Siddhapura
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              {profile?.aboutIntroduction ||
                'A passionate Information Technology student interested in full-stack web development, building practical applications, exploring new technologies, and creating useful digital experiences.'}
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-48 sm:w-56 aspect-[4/5] rounded-[2rem] border-2 border-[var(--primary-border)] overflow-hidden shadow-lg p-2 bg-[var(--card)] animate-float">
              <img
                src={profile?.profileImage?.url || '/khushi.png'}
                alt={profile?.name || 'Khushi Siddhapura'}
                onError={(e) => {
                  if (e.currentTarget.src !== window.location.origin + '/khushi.svg') {
                    e.currentTarget.src = '/khushi.svg';
                  }
                }}
                className="w-full h-full object-cover object-top rounded-[1.5rem]"
              />
            </div>
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
          <h2 className="text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <span className="w-2 h-5 bg-[var(--primary)] rounded-full" />
            Developer Journey & Growth
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
            {profile?.developerJourney ||
              'My journey into software development started with curiosity about how web applications solve real-world problems. Throughout my B.Tech studies in Information Technology at Birla Vishvakarma Mahavidyalaya (BVM), I focused on building structured, practical projects across the MERN stack and relational databases.'}
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[var(--text)] flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-[var(--primary)]" />
            Education
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile?.education?.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-alt)] text-[var(--primary)] border border-[var(--primary-border)]">
                    {edu.duration || 'Pursuing'}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[var(--text)]">{edu.degree}</h3>
                <p className="text-xs font-semibold text-[var(--primary)]">{edu.institution}</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4">
            <h3 className="text-base font-bold text-[var(--text)] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--primary)]" />
              Technical Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {(profile?.technicalInterests || [
                'Full-Stack Web Development',
                'MERN Stack Architecture',
                'RESTful API Engineering',
                'UI/UX & Design Systems',
                'Database Modeling',
              ]).map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--surface-alt)] text-[var(--primary)] border border-[var(--primary-border)] flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4">
            <h3 className="text-base font-bold text-[var(--text)] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--primary)]" />
              Current Learning Focus
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {profile?.currentLearningFocus ||
                'Expanding proficiency in scalable full-stack application architecture, state orchestration, and performance tuning.'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[var(--text)] flex items-center gap-2.5">
              <Briefcase className="w-6 h-6 text-[var(--primary)]" />
              Practical Experience
            </h2>
            <Link
              to="/experience"
              className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
            >
              <span>View Experience Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experience.map((exp) => (
              <div key={exp._id} className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
                <span className="text-xs font-semibold text-[var(--primary)]">{exp.startDate} - {exp.endDate || 'Present'}</span>
                <h3 className="font-bold text-base text-[var(--text)]">{exp.position}</h3>
                <p className="text-xs font-medium text-[var(--text-secondary)]">{exp.organization}</p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[var(--text)] flex items-center gap-2.5">
              <Award className="w-6 h-6 text-[var(--primary)]" />
              Honors & Competitions
            </h2>
            <Link
              to="/achievements"
              className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
            >
              <span>View All Achievements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {achievements.map((ach) => (
              <div key={ach._id} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
                <span className="text-[10px] font-semibold uppercase text-[var(--primary)] bg-[var(--surface-alt)] px-2 py-0.5 rounded border border-[var(--primary-border)]">
                  {ach.category}
                </span>
                <h3 className="font-bold text-sm text-[var(--text)]">{ach.title}</h3>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-[var(--primary-border)] bg-[var(--surface-alt)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-[var(--text)]">Looking for Full Resume Details?</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Download or view the verified PDF curriculum vitae including detailed academic coursework and project briefs.
            </p>
          </div>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-xs transition-colors shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

