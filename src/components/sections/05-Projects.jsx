import React from 'react';
import useGitHub from '../../hooks/useGitHub';
import {
  FiGithub,
  FiExternalLink,
  FiMusic,
  FiPenTool,
  FiCalendar,
  FiShoppingCart,
  FiTv,
  FiCode
} from 'react-icons/fi';
import { TextReveal } from '../ui/TextReveal';
import { Reveal } from '../ui/Reveal';
import { Parallax } from '../ui/Parallax';
import { triggerHaptic } from '../../utils/triggerHaptic';

const GITHUB_USERNAME = 'TheRealLaksh';

const genreIcons = {
  music: <FiMusic size={20} />,
  art: <FiPenTool size={20} />,
  calendar: <FiCalendar size={20} />,
  shop: <FiShoppingCart size={20} />,
  tv: <FiTv size={20} />,
  code: <FiCode size={20} />
};

const langColors = {
  JavaScript: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20',
  HTML: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
  CSS: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
  Python: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  TypeScript: 'text-blue-400 bg-blue-600/10 border-blue-600/20',
  Vue: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  React: 'text-sky-300 bg-sky-500/10 border-sky-500/20',
  Java: 'text-red-300 bg-red-500/10 border-red-500/20',
  Shell: 'text-green-300 bg-green-500/10 border-green-500/20',
  default: 'text-zinc-300 bg-zinc-800/50 border-zinc-700/50'
};

const ProjectSkeleton = () => (
  <div className="w-full h-[350px] bg-slate-900/50 border border-zinc-800 rounded-2xl p-6 animate-pulse">
    <div className="flex justify-between mb-6">
      <div className="w-10 h-10 rounded-full bg-zinc-800"></div>
      <div className="w-20 h-8 rounded-full bg-zinc-800"></div>
    </div>
    <div className="h-6 w-3/4 bg-zinc-800 rounded mb-4"></div>
    <div className="h-4 w-full bg-zinc-800 rounded mb-2"></div>
    <div className="h-4 w-2/3 bg-zinc-800 rounded"></div>
  </div>
);

const Projects = () => {
  const { projects, loading, error } = useGitHub();

  return (
    <section
      id="projects"
      className="my-16 sm:my-32 scroll-mt-28 sm:scroll-mt-24 relative z-10 overflow-hidden w-full"
    >
      
      {/* Background Number - Aligned Left-4 */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <Parallax speed={-0.2} className="absolute top-[5%] left-4 text-slate-800/50 text-6xl font-bold font-mono opacity-20">05</Parallax>
      </div>

      <div className="w-full px-0 md:px-12 relative z-10">
        <TextReveal className="mb-8 md:mb-12 px-6">
          <div className="flex items-center justify-between max-w-[1600px] mx-auto">
            <h2 className="text-3xl font-bold text-white">GitHub Shipments</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-slate-700 to-transparent ml-6 hidden md:block"></div>
          </div>
        </TextReveal>

        <div
          id="github-projects-grid"
          className="
            grid grid-cols-1 gap-6 pb-12 px-6
            sm:grid-cols-2 lg:grid-cols-3
            max-w-[1600px] mx-auto
          "
        >
          {loading && (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          )}

          {error && (
            <p className="text-red-400 col-span-full text-center px-6">
              ⚠️ {error}
            </p>
          )}

          {!loading &&
            !error &&
            projects.map((repo, index) => {
              const Icon = genreIcons[repo.genre] || genreIcons.code;
              const languages =
                repo.languages.length > 0 ? repo.languages : ['Code'];

              return (
                <Reveal key={repo.id} delay={index * 0.1} className="h-full">
                  <div
                    onClick={triggerHaptic}
                    className="group relative flex flex-col h-full bg-[#050505] border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-zinc-600 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                  >
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-center mb-6">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                          {Icon}
                        </div>

                        {/* ✅ SOCIAL SIDEBAR STYLE BUTTONS */}
                        <div className="flex gap-3">
                          {repo.demo && (
                            <a
                              href={repo.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative flex items-center justify-start w-10 hover:w-28 h-10 rounded-full overflow-hidden transition-all duration-500 ease-out bg-transparent border border-transparent hover:bg-slate-800 hover:border-slate-700 hover:shadow-lg hover:shadow-emerald-900/20"
                            >
                              <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <div className="w-10 h-10 flex items-center justify-center shrink-0 z-10 text-slate-400 group-hover:text-emerald-400 transition-colors duration-300">
                                <FiExternalLink size={18} />
                              </div>
                              <span className="opacity-0 group-hover:opacity-100 text-emerald-400 font-medium text-sm whitespace-nowrap transition-all duration-500 delay-100 absolute left-10 pl-1">
                                Live
                              </span>
                            </a>
                          )}

                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-start w-10 hover:w-28 h-10 rounded-full overflow-hidden transition-all duration-500 ease-out bg-transparent border border-transparent hover:bg-slate-800 hover:border-slate-700 hover:shadow-lg hover:shadow-green-900/20"
                          >
                            <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="w-10 h-10 flex items-center justify-center shrink-0 z-10 text-slate-400 group-hover:text-green-400 transition-colors duration-300">
                              <FiGithub size={18} />
                            </div>
                            <span className="opacity-0 group-hover:opacity-100 text-green-400 font-medium text-sm whitespace-nowrap transition-all duration-500 delay-100 absolute left-10 pl-1">
                              Code
                            </span>
                          </a>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-sky-200 transition-colors">
                        {repo.name}
                      </h3>

                      <p className="text-sm text-zinc-400 leading-relaxed font-light flex-grow mb-6 line-clamp-3">
                        {repo.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-zinc-900">
                        {languages.map((lang, i) => {
                          const colorClass =
                            langColors[lang] || langColors.default;
                          return (
                            <span
                              key={i}
                              className={`text-[10px] font-semibold px-2.5 py-1 rounded-md border ${colorClass}`}
                            >
                              {lang}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
        </div>

        <Reveal delay={0.2}>
          <div className="view-more-container mt-8 md:mt-16 text-center px-6">
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerHaptic}
              className="relative inline-flex w-full md:w-auto group items-center justify-center px-8 py-3 overflow-hidden font-medium text-sky-400 border border-sky-400/30 rounded-lg hover:bg-sky-400/10 transition-all duration-300 active:scale-95"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-sky-400 rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span className="relative flex items-center gap-2">
                Explore All Repos
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;