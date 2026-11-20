import React from 'react';
import { Download, GraduationCap, Briefcase, CheckCircle2, Award } from 'lucide-react';
import useResume from '../hook/useResume';
import Loader from '../../../shared/ui/Loader';
import Button from '../../../shared/ui/Button';

export const ResumePage = () => {
  const { profile, resumeInfo, loading, downloadOrPrint } = useResume();

  if (loading) {
    return <Loader text="Loading resume profile..." className="min-h-[50vh]" />;
  }

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-[var(--text)]">Curriculum Vitae</h1>
            <p className="text-xs text-[var(--text-muted)]">
              Khushi Siddhapura • Full Stack Developer & IT Student
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Download}
            onClick={downloadOrPrint}
          >
            {resumeInfo?.resumeUrl ? 'Download PDF Resume' : 'Print / Save as PDF'}
          </Button>
        </div>

        <div className="p-8 sm:p-12 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-8 print:border-none print:shadow-none">
          <div className="border-b border-[var(--border)] pb-6 space-y-2">
            <h2 className="text-3xl font-extrabold text-[var(--text)]">Khushi Siddhapura</h2>
            <p className="text-sm font-semibold text-[var(--primary)]">
              Full Stack Developer | B.Tech Information Technology Student
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Birla Vishvakarma Mahavidyalaya (BVM), Gujarat • khushi.siddhapura@example.com
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> Education
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[var(--text)]">
                    B.Tech in Information Technology
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Birla Vishvakarma Mahavidyalaya (BVM), Gujarat
                  </p>
                </div>
                <span className="text-xs font-semibold text-[var(--primary)]">Pursuing</span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Core coursework: Data Structures, Database Systems, Web Engineering, Object-Oriented Programming, and Software Engineering.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" /> Experience
            </h3>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[var(--text)]">
                    Web Development Intern
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)]">My Job Grow (Online)</p>
                </div>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  January 2026 – Present
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Participating in practical web development assignments, responsive UI component construction, and modern web application workflows.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-[var(--text)]">Languages:</span>{' '}
                <span className="text-[var(--text-secondary)]">C, C++, JavaScript, PHP</span>
              </div>
              <div>
                <span className="font-semibold text-[var(--text)]">Frontend:</span>{' '}
                <span className="text-[var(--text-secondary)]">HTML, CSS, React.js, Tailwind CSS</span>
              </div>
              <div>
                <span className="font-semibold text-[var(--text)]">Backend:</span>{' '}
                <span className="text-[var(--text-secondary)]">Node.js, Express.js, PHP, REST APIs</span>
              </div>
              <div>
                <span className="font-semibold text-[var(--text)]">Databases:</span>{' '}
                <span className="text-[var(--text-secondary)]">MongoDB, MySQL</span>
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold text-[var(--text)]">Tools:</span>{' '}
                <span className="text-[var(--text-secondary)]">Git, GitHub, VS Code, Figma, Vite</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Achievements
            </h3>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)] list-disc pl-5">
              <li>Secured second highest score in HSC.</li>
              <li>Achieved second rank in the Cracking the Code competition (FY IT).</li>
              <li>Recognized among the best three static designs in a Figma UI/UX competition.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
