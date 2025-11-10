"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import { SectionHeading } from "@/components/custom-ui/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Loader2 } from "lucide-react";

// Map of language colors for styling
const languageColors: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  TypeScript: "#3178c6",
  Java: "#b07219",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Shell: "#89e051",
  "Jupyter Notebook": "#DA5B0B",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
};
const defaultColor = "#94a3b8";

// Define the structure of a GitHub Repo
interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  languages_url: string;
  languages: { name: string; color: string }[];
}

// New state for combined repo and language data
type RepoWithLanguages = Omit<GitHubRepo, "languages"> & {
  languages: { name: string; color: string }[];
};

export default function ProjectsSection() {
  const [repos, setRepos] = useState<RepoWithLanguages[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const username = "TheRealLaksh"; // Your GitHub username

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 1. Fetch repositories using your GitHub Token
        const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

        const repoResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`,
          {
            headers: githubToken ? {
              'Authorization': `Bearer ${githubToken}`,
              'X-GitHub-Api-Version': '2022-11-28'
            } : {}
          }
        );
        
        if (!repoResponse.ok) {
          throw new Error(`GitHub API Error: ${repoResponse.status}`);
        }
        const repoData: GitHubRepo[] = await repoResponse.json();

        // 2. Fetch languages for each repository
        const reposWithLanguages = await Promise.all(
          repoData.map(async (repo) => {
            let languages: { name: string; color: string }[] = [];
            try {
              const langResponse = await fetch(repo.languages_url, {
                headers: githubToken ? {
                  'Authorization': `Bearer ${githubToken}`,
                  'X-GitHub-Api-Version': '2022-11-28'
                } : {}
              });
              
              if (langResponse.ok) {
                const languagesData = await langResponse.json();
                const languageKeys = Object.keys(languagesData);
                languages = languageKeys.map((lang) => ({
                  name: lang,
                  color: languageColors[lang] || defaultColor,
                }));
              }
            } catch (langError) {
              console.error(`Could not fetch languages for ${repo.name}`, langError);
            }
            // If no languages found, add N/A
            if (languages.length === 0) {
              languages.push({ name: "N/A", color: defaultColor });
            }
            return { ...repo, languages };
          })
        );

        setRepos(reposWithLanguages);
      } catch (err) {
        console.error("Failed to fetch GitHub projects:", err);
        if (err instanceof Error) {
          setError(
            `Could not load projects. This might be due to API rate limiting. Please try again later.`
          );
        }
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, [username]);

  return (
    <section id="projects" className="py-24 sm:py-32 bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="My Projects"
          subtitle="My 6 Most Recent GitHub Repositories"
        />

        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-slate-400 h-64"
            >
              <Loader2 className="h-12 w-12 animate-spin text-blue-400 mb-4" />
              <p className="text-lg">Fetching projects from GitHub...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-400 bg-red-900/30 border border-red-700 p-6 rounded-lg max-w-2xl mx-auto"
            >
              <h3 className="text-xl font-semibold mb-2">
                Failed to load projects
              </h3>
              <p className="text-red-300">{error}</p>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-bold text-sky-400 hover:underline"
              >
                View my projects directly on GitHub
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading && !error && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {repos.map((repo, index) => (
                <ProjectCard key={repo.id} repo={repo} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// --- NEW DESIGN - ProjectCard Component ---
const ProjectCard = ({ repo, index }: { repo: RepoWithLanguages; index: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      } as React.CSSProperties}
      className="group relative bg-zinc-800/50 backdrop-blur-md border border-zinc-700/50 rounded-xl
                 shadow-xl p-6 flex flex-col justify-between overflow-hidden h-full"
    >
      {/* Mouse-following glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(56, 189, 248, 0.2), transparent 80%)',
        }}
      />
      
      <div className="relative z-20 flex flex-col flex-grow">
        {/* Main Content */}
        <div className="flex-grow">
          <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-teal-400 transition-colors mb-4">
            {repo.name.replace(/[-_]/g, " ")}
          </h3>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
            {repo.description || "No description provided."}
          </p>
        </div>

        {/* Languages */}
        <div className="mb-6">
          <p className="text-xs text-zinc-400 mb-2 font-medium">LANGUAGES</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {repo.languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: lang.color }}
                ></span>
                <span className="text-zinc-300 text-sm">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="relative z-20 flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-700/50">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white font-medium py-2 px-4 rounded-lg text-sm transform active:scale-95 transition-all duration-150 ease-in-out"
        >
          <Github className="w-4 h-4" />
          View Code
        </a>

        {/* Conditionally render Live Demo button only if homepage URL exists */}
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Live Site"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg text-sm py-2 px-4 text-center font-medium text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:opacity-90 transform active:scale-95 transition-all duration-150 ease-in-out"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};