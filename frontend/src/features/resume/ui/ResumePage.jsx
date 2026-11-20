import React from 'react';
import {
  Download,
  Printer,
  Phone,
  Mail,
  Linkedin,
  Github,
  MapPin,
  ExternalLink,
  Sparkles,
  Calendar,
} from 'lucide-react';
import useResume from '../hook/useResume';
import Loader from '../../../shared/ui/Loader';
import Button from '../../../shared/ui/Button';
import ThemeToggle from '../../../shared/components/ThemeToggle';

export const ResumePage = () => {
  const { profile, loading } = useResume();

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <Loader text="Loading resume profile..." className="min-h-[50vh]" />;
  }

  const skillsList = [
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

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 md:py-16 bg-zinc-100/80 dark:bg-zinc-950 transition-colors duration-200">
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        {/* Top Control Bar (Hidden during print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm print:hidden">
          <div className="space-y-1">
            <h1 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <span>Khushi S Siddhapura — Curriculum Vitae</span>
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Two-column professional resume layout • Optimized for Light & Dark themes
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="mr-1">
              <ThemeToggle />
            </div>
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
              onClick={handlePrint}
            >
              Download PDF
            </Button>
          </div>
        </div>

        {/* ================= RESUME A4 SHEET ================= */}
        <div className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 p-8 sm:p-12 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-xl print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
          {/* 1. HEADER SECTION (Two parts: Info on Left, Circular Photo on Right) */}
          <header className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800 print:border-zinc-300">
            <div className="space-y-2 flex-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-zinc-900 dark:text-white print:text-black font-sans">
                Khushi S Siddhapura
              </h1>
              <h2 className="text-lg font-bold text-[#7C3AED] dark:text-violet-400 print:text-[#7C3AED]">
                Full Stack Developer
              </h2>

              {/* Contact Information Bar with Clean Icons */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-600 dark:text-zinc-300 print:text-zinc-700 pt-1">
                <a
                  href="tel:+918200886093"
                  className="flex items-center gap-1.5 hover:text-[#7C3AED] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7C3AED] dark:text-violet-400" />
                  <span>+91 8200886093</span>
                </a>

                <a
                  href="mailto:khushisiddhapura2010@gmail.com"
                  className="flex items-center gap-1.5 hover:text-[#7C3AED] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#7C3AED] dark:text-violet-400" />
                  <span>khushisiddhapura2010@gmail.com</span>
                </a>

                <a
                  href="https://linkedin.com/in/khushi-siddhapura-7247a0397"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#7C3AED] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#7C3AED] dark:text-violet-400" />
                  <span>linkedin.com/in/khushi-siddhapura</span>
                </a>

                <a
                  href="https://github.com/KhushiSiddhapura"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#7C3AED] transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-[#7C3AED] dark:text-violet-400" />
                  <span>github.com/KhushiSiddhapura</span>
                </a>

                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7C3AED] dark:text-violet-400" />
                  <span>Anand, Gujarat</span>
                </div>
              </div>
            </div>

            {/* Circular Portrait Photo (Top Right) */}
            <div className="shrink-0 self-center sm:self-auto">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#7C3AED] p-0.5 shadow-sm overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src="/khushi.png"
                  alt="Khushi S Siddhapura"
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
            </div>
          </header>

          {/* 2. TWO-COLUMN LAYOUT BODY */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
            {/* ================= LEFT COLUMN (~58%) ================= */}
            <div className="md:col-span-7 space-y-7">
              {/* SUMMARY */}
              <section className="space-y-2.5">
                <div className="border-b-2 border-zinc-900 dark:border-white print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white print:text-black">
                    Summary
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 print:text-zinc-800 text-justify">
                  I am a Full Stack Developer and 2nd year B.Tech Information Technology student at
                  Birla Vishvakarma Mahavidyalaya (CGPA: 8.52/10). Strong frontend expertise in
                  React.js, JavaScript, and Tailwind CSS, complemented by backend engineering using
                  Node.js, Express, MongoDB, and MySQL. Passionate about building scalable, secure,
                  and user-centric digital experiences with clean architecture and modern development
                  standards.
                </p>
              </section>

              {/* EXPERIENCE */}
              <section className="space-y-4">
                <div className="border-b-2 border-zinc-900 dark:border-white print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white print:text-black">
                    Experience
                  </h3>
                </div>

                {/* Experience 1 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white print:text-black">
                      Web Development Intern
                    </h4>
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 print:text-zinc-600">
                      01/2026 – Present
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[var(--primary)] dark:text-violet-400 print:text-[#7C3AED]">
                    My Job Grow
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 print:text-zinc-600 italic">
                    Online web development internship
                  </p>
                  <ul className="list-disc pl-4 text-xs text-zinc-700 dark:text-zinc-300 print:text-zinc-800 space-y-1 pt-0.5">
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

                {/* Experience 2 */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white print:text-black">
                      Web Developer (Freelance & Academic)
                    </h4>
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 print:text-zinc-600">
                      12/2025
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[var(--primary)] dark:text-violet-400 print:text-[#7C3AED]">
                    Rangila Resto & E-Commerce Web Platforms
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 print:text-zinc-600 italic">
                    Academic project & freelance web solutions
                  </p>
                  <ul className="list-disc pl-4 text-xs text-zinc-700 dark:text-zinc-300 print:text-zinc-800 space-y-1 pt-0.5">
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
              </section>

              {/* EDUCATION */}
              <section className="space-y-3.5">
                <div className="border-b-2 border-zinc-900 dark:border-white print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white print:text-black">
                    Education
                  </h3>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white print:text-black">
                      B.Tech in Information Technology
                    </h4>
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 print:text-zinc-600">
                      2025 – 2029
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[var(--primary)] dark:text-violet-400 print:text-[#7C3AED]">
                    Birla Vishvakarma Mahavidyalaya (BVM)
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 print:text-zinc-700">
                    <span>Anand, Gujarat</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 print:text-black">
                      CGPA: 8.52 / 10
                    </span>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-zinc-100 dark:border-zinc-800 print:border-zinc-200">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white print:text-black">
                      12th (Senior Secondary Examination)
                    </h4>
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 print:text-zinc-600">
                      2025
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 print:text-zinc-700">
                    <span>GSEB Board</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 print:text-black">
                      Score: 84%
                    </span>
                  </div>
                </div>

                <div className="space-y-1 pt-1.5 border-t border-zinc-100 dark:border-zinc-800 print:border-zinc-200">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white print:text-black">
                      10th (Secondary Examination)
                    </h4>
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 print:text-zinc-600">
                      2023
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 print:text-zinc-700">
                    <span>GSEB Board</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 print:text-black">
                      Score: 92%
                    </span>
                  </div>
                </div>
              </section>
            </div>

            {/* ================= RIGHT COLUMN (~42%) ================= */}
            <div className="md:col-span-5 space-y-7">
              {/* KEY ACHIEVEMENTS */}
              <section className="space-y-3">
                <div className="border-b-2 border-zinc-900 dark:border-white print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white print:text-black">
                    Key Achievements
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white print:text-black leading-tight">
                        Second Highest Score in HSC
                      </h4>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-300 print:text-zinc-700 leading-snug mt-0.5">
                        Achieved 84% in GSEB Class 12th Board examinations and 92% in 10th Board.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white print:text-black leading-tight">
                        Second Rank — Cracking the Code
                      </h4>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-300 print:text-zinc-700 leading-snug mt-0.5">
                        Awarded 2nd rank in the departmental coding and problem-solving competition (FY IT).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white print:text-black leading-tight">
                        Top 3 in Figma UI/UX Competition
                      </h4>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-300 print:text-zinc-700 leading-snug mt-0.5">
                        Recognized among the best three static designs in college design competition.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white print:text-black leading-tight">
                        Hackathon Participant (Odoo & TechSprint)
                      </h4>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-300 print:text-zinc-700 leading-snug mt-0.5">
                        Participated in Odoo Hackathon and TechSprint; conceived Smart India Hackathon 26154 AI concept.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SKILLS */}
              <section className="space-y-3">
                <div className="border-b-2 border-zinc-900 dark:border-white print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white print:text-black">
                    Skills
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {skillsList.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-md border border-zinc-300 dark:border-zinc-700 print:border-zinc-400 bg-zinc-50 dark:bg-zinc-900 print:bg-white text-zinc-800 dark:text-zinc-200 print:text-black"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* PROJECTS */}
              <section className="space-y-4">
                <div className="border-b-2 border-zinc-900 dark:border-white print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white print:text-black">
                    Projects
                  </h3>
                </div>

                {/* Project 1: NCC Portal */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white print:text-black">
                      NCC Management Portal
                    </h4>
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 print:text-zinc-600">
                      02/2026
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 print:text-zinc-700 italic">
                    Full-stack application for 38 GUJ BN NCC management
                  </p>
                  <ul className="list-disc pl-4 text-xs text-zinc-700 dark:text-zinc-300 print:text-zinc-800 space-y-1">
                    <li>
                      Engineered role-based access control, attendance management, and cadet tracking.
                    </li>
                    <li>
                      Designed scalable database models and automated workflows for college NCC administration.
                    </li>
                  </ul>
                </div>

                {/* Project 2: Rangila Resto */}
                <div className="space-y-1.5 pt-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white print:text-black">
                      Rangila Resto
                    </h4>
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 print:text-zinc-600">
                      12/2025
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 print:text-zinc-700 italic">
                    Restaurant web application with interactive UI
                  </p>
                  <ul className="list-disc pl-4 text-xs text-zinc-700 dark:text-zinc-300 print:text-zinc-800 space-y-1">
                    <li>
                      Developed responsive frontend using HTML, CSS, and JavaScript with modern UI design.
                    </li>
                    <li>
                      Deployed on Vercel with clean menu display and user engagement workflows.
                    </li>
                  </ul>
                </div>

                {/* Project 3: AI Content Engine */}
                <div className="space-y-1.5 pt-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white print:text-black">
                      AI Content Transformation Engine
                    </h4>
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 print:text-zinc-600">
                      SIH 26154
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 print:text-zinc-700 italic">
                    Smart India Hackathon problem statement solution
                  </p>
                  <ul className="list-disc pl-4 text-xs text-zinc-700 dark:text-zinc-300 print:text-zinc-800 space-y-1">
                    <li>
                      Designed architectural concept accepting diverse input formats and generating structured outputs.
                    </li>
                  </ul>
                </div>
              </section>

              {/* EXTRA-CURRICULAR & WORKSHOPS */}
              <section className="space-y-2.5">
                <div className="border-b-2 border-zinc-900 dark:border-white print:border-black pb-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white print:text-black">
                    Activities & Workshops
                  </h3>
                </div>
                <ul className="list-disc pl-4 text-xs text-zinc-700 dark:text-zinc-300 print:text-zinc-800 space-y-1">
                  <li>Active volunteer participating in NSS (National Service Scheme).</li>
                  <li>Attended live college workshops on MERN stack & web applications security.</li>
                  <li>Personal interests: Reading, Travelling, and Music.</li>
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
