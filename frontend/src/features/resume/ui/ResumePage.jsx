import React from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Printer,
  Phone,
  Mail,
  Linkedin,
  Github,
  MapPin,
  ExternalLink,
  Settings,
  Calendar,
} from 'lucide-react';
import useResume from '../hook/useResume';
import Loader from '../../../shared/ui/Loader';
import Button from '../../../shared/ui/Button';

export const ResumePage = () => {
  const { profile, resumeInfo, experience, skills, projects, achievements, loading, downloadOrPrint } =
    useResume();

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <Loader text="Loading resume profile..." className="min-h-[50vh]" />;
  }

  // Fallback skills list if skills array from CMS is empty
  const defaultSkillsList = [
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'JavaScript',
    'HTML',
    'CSS',
    'PHP',
    'MySQL',
    'Tailwind CSS',
    'REST APIs',
    'C',
    'C++',
    'Git',
    'GitHub',
    'VS Code',
    'Figma',
    'Vite',
    'Postman',
    'Vercel',
  ];

  const renderedSkills =
    Array.isArray(skills) && skills.length > 0
      ? skills.map((s) => (typeof s === 'string' ? s : s.name))
      : defaultSkillsList;

  // Fallback activities if none saved in CMS
  const defaultActivities = [
    'Active volunteer participating in NSS (National Service Scheme).',
    'Attended live college workshops on MERN stack & web applications security.',
    'Personal interests: Reading, Travelling, and Music.',
  ];

  const renderedActivities =
    Array.isArray(profile?.resumeActivities) && profile.resumeActivities.length > 0
      ? profile.resumeActivities
      : defaultActivities;

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-slate-100 text-zinc-900 transition-colors duration-200">
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        {/* Top Control Bar (Hidden during print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-sm print:hidden">
          <div className="space-y-1">
            <h1 className="text-lg sm:text-xl font-bold text-zinc-900 flex items-center gap-2">
              <span>{profile?.name || 'Khushi S Siddhapura'} — Curriculum Vitae</span>
            </h1>
            <p className="text-xs text-zinc-500">
              Two-column executive resume • Pure Light Theme • Live sync with Admin CMS
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              icon={Printer}
              onClick={handlePrint}
            >
              Print
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={downloadOrPrint}
            >
              Download PDF Resume
            </Button>

            <Link
              to="/admin/resume"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-zinc-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Manage resume content from Admin Dashboard"
            >
              <Settings className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>CMS</span>
            </Link>
          </div>
        </div>

        {/* ================= RESUME A4 SHEET (ALWAYS LIGHT THEME) ================= */}
        <div className="bg-white text-zinc-900 p-8 sm:p-12 rounded-xl border border-slate-200/90 shadow-xl print:p-0 print:border-none print:shadow-none print:rounded-none">
          {/* 1. HEADER SECTION (Info on Left, Circular Portrait on Right) */}
          <header className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-zinc-200 print:border-zinc-300">
            <div className="space-y-2 flex-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-zinc-900 print:text-black font-sans">
                {profile?.name || 'Khushi S Siddhapura'}
              </h1>
              <h2 className="text-lg font-bold text-[#7C3AED] print:text-[#7C3AED]">
                {profile?.title || 'Full Stack Developer'}
              </h2>

              {/* Contact Information Bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-600 print:text-zinc-700 pt-1">
                <a
                  href={`tel:${profile?.phone || '+918200886093'}`}
                  className="flex items-center gap-1.5 hover:text-[#7C3AED] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>{profile?.phone || '+91 8200886093'}</span>
                </a>

                <a
                  href={`mailto:${profile?.email || 'khushisiddhapura2010@gmail.com'}`}
                  className="flex items-center gap-1.5 hover:text-[#7C3AED] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>{profile?.email || 'khushisiddhapura2010@gmail.com'}</span>
                </a>

                <a
                  href={profile?.socialLinks?.linkedin || 'https://linkedin.com/in/khushi-siddhapura-7247a0397'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#7C3AED] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>linkedin.com/in/khushi-siddhapura</span>
                </a>

                <a
                  href={profile?.socialLinks?.github || 'https://github.com/KhushiSiddhapura'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#7C3AED] transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>github.com/KhushiSiddhapura</span>
                </a>

                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>{profile?.location || 'Anand, Gujarat'}</span>
                </div>
              </div>
            </div>

            {/* Circular Portrait Photo (Top Right) */}
            <div className="shrink-0 self-center sm:self-auto">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#7C3AED] p-0.5 shadow-sm overflow-hidden bg-slate-50">
                <img
                  src={profile?.profileImage?.url || '/khushi.png'}
                  alt={profile?.name || 'Khushi S Siddhapura'}
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
            </div>
          </header>

          {/* 2. TWO-COLUMN LAYOUT BODY */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
            {/* ================= LEFT COLUMN (~58%) ================= */}
            <div className="md:col-span-7 space-y-7">
              {/* SUMMARY (Dynamically sourced from CMS) */}
              <section className="space-y-2.5">
                <div className="border-b-2 border-zinc-900 print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 print:text-black">
                    Summary
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-zinc-700 print:text-zinc-800 text-justify">
                  {profile?.resumeSummary ||
                    profile?.heroIntroduction ||
                    profile?.aboutIntroduction ||
                    'I am a Full Stack Developer and 2nd year B.Tech Information Technology student at Birla Vishvakarma Mahavidyalaya (CGPA: 8.52/10). Strong frontend expertise in React.js, JavaScript, and Tailwind CSS, complemented by backend engineering using Node.js, Express, MongoDB, and MySQL. Passionate about building scalable, secure, and user-centric digital experiences with clean architecture and modern development standards.'}
                </p>
              </section>

              {/* EXPERIENCE (Dynamically mapped from CMS) */}
              <section className="space-y-4">
                <div className="border-b-2 border-zinc-900 print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 print:text-black">
                    Experience
                  </h3>
                </div>

                {Array.isArray(experience) && experience.length > 0 ? (
                  experience.map((exp, idx) => (
                    <div key={exp._id || idx} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-900 print:text-black">
                          {exp.role || exp.title || exp.position}
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-500 print:text-zinc-600">
                          {exp.period ||
                            `${exp.startDate || ''} – ${exp.current ? 'Present' : exp.endDate || ''}`}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#7C3AED] print:text-[#7C3AED]">
                        {exp.company || exp.organization}
                      </p>
                      {exp.location && (
                        <p className="text-[11px] text-zinc-500 print:text-zinc-600 italic">
                          {exp.location}
                        </p>
                      )}
                      {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 ? (
                        <ul className="list-disc pl-4 text-xs text-zinc-700 print:text-zinc-800 space-y-1 pt-0.5">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx}>{resp}</li>
                          ))}
                        </ul>
                      ) : exp.description ? (
                        <p className="text-xs text-zinc-700 print:text-zinc-800 pt-0.5">
                          {exp.description}
                        </p>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <>
                    {/* Default reference internship */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-900 print:text-black">
                          Web Development Intern
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-500 print:text-zinc-600">
                          01/2026 – Present
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#7C3AED] print:text-[#7C3AED]">
                        My Job Grow
                      </p>
                      <p className="text-[11px] text-zinc-500 print:text-zinc-600 italic">
                        Online web development internship
                      </p>
                      <ul className="list-disc pl-4 text-xs text-zinc-700 print:text-zinc-800 space-y-1 pt-0.5">
                        <li>
                          Designed and developed responsive web application interfaces focusing on
                          performance, mobile responsiveness, and clean UI.
                        </li>
                        <li>
                          Constructed structured full-stack components and integrated RESTful APIs with
                          efficient client-side state handling.
                        </li>
                        <li>
                          Maintained continuous version control, code quality, and structured team
                          collaboration via Git and GitHub.
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-900 print:text-black">
                          Web Developer (Freelance & Academic)
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-500 print:text-zinc-600">
                          12/2025
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#7C3AED] print:text-[#7C3AED]">
                        Rangila Resto & E-Commerce Web Platforms
                      </p>
                      <p className="text-[11px] text-zinc-500 print:text-zinc-600 italic">
                        Academic project & freelance web solutions
                      </p>
                      <ul className="list-disc pl-4 text-xs text-zinc-700 print:text-zinc-800 space-y-1 pt-0.5">
                        <li>
                          Built and deployed complete restaurant platform with responsive menu showcases
                          and clean user navigation.
                        </li>
                        <li>
                          Engineered backend authentication, database models, and cart interactions for
                          academic e-commerce application.
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </section>

              {/* EDUCATION (Dynamically mapped from CMS Profile) */}
              <section className="space-y-3.5">
                <div className="border-b-2 border-zinc-900 print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 print:text-black">
                    Education
                  </h3>
                </div>

                {Array.isArray(profile?.education) && profile.education.length > 0 ? (
                  profile.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className={`space-y-1 ${idx > 0 ? 'pt-2 border-t border-zinc-100 print:border-zinc-200' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-900 print:text-black">
                          {edu.degree}
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-500 print:text-zinc-600">
                          {edu.duration}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#7C3AED] print:text-[#7C3AED]">
                        {edu.institution}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-zinc-600 print:text-zinc-700">
                        <span>{edu.location || 'Gujarat, India'}</span>
                        <span className="font-semibold text-zinc-800 print:text-black">
                          {edu.score || edu.description}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-900 print:text-black">
                          B.Tech in Information Technology
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-500 print:text-zinc-600">
                          2025 – 2029
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#7C3AED] print:text-[#7C3AED]">
                        Birla Vishvakarma Mahavidyalaya (BVM)
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-zinc-600 print:text-zinc-700">
                        <span>Anand, Gujarat</span>
                        <span className="font-semibold text-zinc-800 print:text-black">
                          CGPA: 8.52 / 10
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-zinc-100 print:border-zinc-200">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-900 print:text-black">
                          12th (Senior Secondary Examination)
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-500 print:text-zinc-600">
                          2025
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-zinc-600 print:text-zinc-700">
                        <span>GSEB Board</span>
                        <span className="font-semibold text-zinc-800 print:text-black">
                          Score: 84%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1.5 border-t border-zinc-100 print:border-zinc-200">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-900 print:text-black">
                          10th (Secondary Examination)
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-500 print:text-zinc-600">
                          2023
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-zinc-600 print:text-zinc-700">
                        <span>GSEB Board</span>
                        <span className="font-semibold text-zinc-800 print:text-black">
                          Score: 92%
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </section>
            </div>

            {/* ================= RIGHT COLUMN (~42%) ================= */}
            <div className="md:col-span-5 space-y-7">
              {/* KEY ACHIEVEMENTS (Dynamically mapped from CMS) */}
              <section className="space-y-3">
                <div className="border-b-2 border-zinc-900 print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 print:text-black">
                    Key Achievements
                  </h3>
                </div>

                <div className="space-y-3">
                  {Array.isArray(achievements) && achievements.length > 0 ? (
                    achievements.map((ach, idx) => (
                      <div key={ach._id || idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 print:text-black leading-tight">
                            {ach.title}
                          </h4>
                          <p className="text-[11px] text-zinc-600 print:text-zinc-700 leading-snug mt-0.5">
                            {ach.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 print:text-black leading-tight">
                            Second Highest Score in HSC
                          </h4>
                          <p className="text-[11px] text-zinc-600 print:text-zinc-700 leading-snug mt-0.5">
                            Achieved 84% in GSEB Class 12th Board examinations and 92% in 10th Board.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 print:text-black leading-tight">
                            Second Rank — Cracking the Code
                          </h4>
                          <p className="text-[11px] text-zinc-600 print:text-zinc-700 leading-snug mt-0.5">
                            Awarded 2nd rank in the departmental coding and problem-solving competition (FY IT).
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 print:text-black leading-tight">
                            Top 3 in Figma UI/UX Competition
                          </h4>
                          <p className="text-[11px] text-zinc-600 print:text-zinc-700 leading-snug mt-0.5">
                            Recognized among the best three static designs in college design competition.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 print:text-black leading-tight">
                            Hackathon Participant (Odoo & TechSprint)
                          </h4>
                          <p className="text-[11px] text-zinc-600 print:text-zinc-700 leading-snug mt-0.5">
                            Participated in Odoo Hackathon and TechSprint; conceived Smart India Hackathon 26154 AI concept.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* SKILLS (Dynamically mapped from CMS) */}
              <section className="space-y-3">
                <div className="border-b-2 border-zinc-900 print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 print:text-black">
                    Skills
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {renderedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-md border border-slate-200 print:border-zinc-400 bg-slate-50 print:bg-white text-zinc-800 print:text-black shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* PROJECTS (Dynamically mapped from CMS) */}
              <section className="space-y-4">
                <div className="border-b-2 border-zinc-900 print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 print:text-black">
                    Projects
                  </h3>
                </div>

                {Array.isArray(projects) && projects.length > 0 ? (
                  projects.slice(0, 3).map((proj, idx) => (
                    <div key={proj._id || idx} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-900 print:text-black">
                          {proj.title}
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-500 print:text-zinc-600">
                          {proj.year || proj.date || 'Recent'}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 print:text-zinc-700 italic">
                        {Array.isArray(proj.technologies) && proj.technologies.length > 0
                          ? proj.technologies.join(', ')
                          : proj.summary || 'Full-stack application'}
                      </p>
                      {proj.description && (
                        <p className="text-xs text-zinc-700 print:text-zinc-800 leading-snug">
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-900 print:text-black">
                          NCC Management Portal
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-500 print:text-zinc-600">
                          02/2026
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 print:text-zinc-700 italic">
                        Full-stack application for 38 GUJ BN NCC management
                      </p>
                      <ul className="list-disc pl-4 text-xs text-zinc-700 print:text-zinc-800 space-y-1">
                        <li>
                          Engineered role-based access control, attendance management, and cadet tracking.
                        </li>
                        <li>
                          Designed scalable database models and automated workflows for college NCC administration.
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-1.5 pt-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-900 print:text-black">
                          Rangila Resto
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-500 print:text-zinc-600">
                          12/2025
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 print:text-zinc-700 italic">
                        Restaurant web application with interactive UI
                      </p>
                      <ul className="list-disc pl-4 text-xs text-zinc-700 print:text-zinc-800 space-y-1">
                        <li>
                          Developed responsive frontend using HTML, CSS, and JavaScript with modern UI design.
                        </li>
                        <li>
                          Deployed on Vercel with clean menu display and user engagement workflows.
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-1.5 pt-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-900 print:text-black">
                          AI Content Transformation Engine
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-500 print:text-zinc-600">
                          SIH 26154
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 print:text-zinc-700 italic">
                        Smart India Hackathon problem statement solution
                      </p>
                      <ul className="list-disc pl-4 text-xs text-zinc-700 print:text-zinc-800 space-y-1">
                        <li>
                          Designed architectural concept accepting diverse input formats and generating structured outputs.
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </section>

              {/* EXTRA-CURRICULAR & WORKSHOPS (Dynamically mapped from CMS) */}
              <section className="space-y-2.5">
                <div className="border-b-2 border-zinc-900 print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 print:text-black">
                    Activities & Workshops
                  </h3>
                </div>
                <ul className="list-disc pl-4 text-xs text-zinc-700 print:text-zinc-800 space-y-1">
                  {renderedActivities.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
