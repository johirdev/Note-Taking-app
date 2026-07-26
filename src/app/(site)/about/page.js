import React from "react";

/**
 * Fonts: add these once in your root layout (app/layout.js) using next/font
 * so they load properly across the app — don't @import them per-page.
 *
 *   import { Kalam, Inter, JetBrains_Mono } from "next/font/google";
 *   const kalam = Kalam({ subsets: ["latin"], weight: ["400","700"], variable: "--font-kalam" });
 *   const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
 *   const mono  = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
 *
 *   <html className={`${kalam.variable} ${inter.variable} ${mono.variable}`}>
 *
 * Then Tailwind classes below (font-[family-name:var(--font-kalam)] etc.)
 * will resolve. Swapped inline below via style tags so this file works
 * standalone too.
 */

const FEATURES = [
  "Create, edit, and delete notes easily",
  "Organize notes with tags and categories",
  "Search and filter notes quickly",
  "User authentication and secure storage",
];

const STACK = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#12131a] px-6 py-14 flex justify-center font-[var(--fallback-body)]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
        .font-hand { font-family: 'Kalam', cursive; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-code { font-family: 'JetBrains Mono', monospace; }
        .ruled-paper {
          background-image: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 31px,
            rgba(255,255,255,0.05) 32px
          );
          background-position: 0 4px;
        }
        .torn-edge {
          clip-path: polygon(
            0% 1.5%, 3% 0%, 6% 1.2%, 9% 0.2%, 12% 1.4%, 15% 0%, 18% 1.1%,
            21% 0.1%, 24% 1.3%, 27% 0%, 30% 1.2%, 33% 0.2%, 36% 1.4%, 39% 0%,
            42% 1.1%, 45% 0.1%, 48% 1.3%, 51% 0%, 54% 1.2%, 57% 0.2%, 60% 1.4%,
            63% 0%, 66% 1.1%, 69% 0.1%, 72% 1.3%, 75% 0%, 78% 1.2%, 81% 0.2%,
            84% 1.4%, 87% 0%, 90% 1.1%, 93% 0.1%, 96% 1.3%, 100% 0%,
            100% 100%, 0% 100%
          );
        }
        .highlight {
          background: linear-gradient(120deg, rgba(253,230,138,0.35) 0%, rgba(253,230,138,0.35) 100%);
          background-repeat: no-repeat;
          background-size: 100% 45%;
          background-position: 0 65%;
        }
      `}</style>

      <div className="max-w-3xl w-full relative">
        {/* Notebook card */}
        <div className="torn-edge ruled-paper bg-[#1b1d29] shadow-xl pl-14 pr-8 sm:pr-10 pt-10 pb-8">
          {/* Title */}
          <h1 className="font-hand text-4xl sm:text-5xl font-bold mb-1">
            <span className="highlight px-1 text-[#fff]">
              Note&nbsp;Manager
            </span>
          </h1>
          <p className="font-body text-sm uppercase tracking-[0.2em] text-[#7d81a0] mb-8">
            page 01 — about this notebook
          </p>

          {/* Intro */}
          <p className="font-body text-[#c7cad8] leading-relaxed mb-10">
            Note Manager is a simple and powerful application designed to help
            you organize your thoughts, tasks, and ideas in one place. Whether
            you{"'"}re a student, developer, or professional, this app keeps
            your notes structured and easy to access.
          </p>

          {/* Features */}
          <section className="mb-10">
            <h2 className="font-hand text-2xl text-[#EDEFF5] mb-3">
              Key Features
            </h2>
            <ul className="space-y-2.5">
              {FEATURES.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-body text-[#c7cad8]"
                >
                  <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-sm border-2 border-[#8b93c9]/60 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-[1px] bg-[#D6534F]/80" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Tech Stack */}
          <section className="mb-10">
            <h2 className="font-hand text-2xl text-[#EDEFF5] mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <span
                  key={tech}
                  className="font-code text-xs px-2.5 py-1 rounded bg-[#8b93c9]/15 text-[#c3c9ef] border border-[#8b93c9]/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Mission */}
          <section className="mb-10">
            <h2 className="font-hand text-2xl text-[#EDEFF5] mb-3">
              Our Mission
            </h2>
            <p className="font-body text-[#c7cad8] leading-relaxed">
              Our goal is to make note-taking fast, simple, and distraction-free
              so users can focus more on ideas and less on managing them.
            </p>
          </section>

          {/* Footer — tear-off strip */}
          <div className="pt-5 border-t-2 border-dashed border-[#3a3d4a] flex items-center justify-between">
            <span className="font-code text-[11px] text-[#6a6e88]">
              © {new Date().getFullYear()} Note Manager
            </span>
            <span className="font-code text-[11px] text-[#6a6e88]">
              all rights reserved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
