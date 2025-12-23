import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { SearchBar } from "./SearchBar";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black py-12 px-4 relative overflow-hidden">
      {/* Animated neon gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/30 via-purple-900/20 to-red-900/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,128,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-transparent"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Table
            </Link>
            <SearchBar />
          </div>

          <h1 className="text-5xl md:text-6xl text-white mb-6">About Me</h1>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300">
          <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl text-white mb-4">Who I Am</h2>
            <p className="mb-4">
              I'm a multidisciplinary creative lead with a passion for blending
              art, technology, and storytelling. My work spans across various
              mediums, from video editing and motion graphics to interactive web
              experiences and 3D visualization.
            </p>
            <p>
              With over two decades of experience in the creative industry, I've
              developed a unique skillset that allows me to approach projects
              from multiple angles, combining technical expertise with artistic
              vision.
            </p>
          </section>

          <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl text-white mb-4">My Journey</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-fuchsia-500 pl-4">
                <h3 className="text-xl text-white mb-1">
                  2004 - The Beginning
                </h3>
                <p>
                  Started my journey in video editing and graphic design,
                  working on independent projects and building my creative
                  foundation.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-xl text-white mb-1">
                  2007 - Audio Production
                </h3>
                <p>
                  Expanded into audio production, adding another dimension to my
                  multimedia capabilities.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl text-white mb-1">
                  2015 - Motion Graphics
                </h3>
                <p>
                  Dove deep into motion graphics, combining my video and design
                  skills to create dynamic visual experiences.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <h3 className="text-xl text-white mb-1">
                  2018 - Generalist & R3F
                </h3>
                <p>
                  Embraced 3D generalist work and React Three Fiber for
                  interactive 3D experiences on the web.
                </p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="text-xl text-white mb-1">2020 - UI Design</h3>
                <p>
                  Mastered modern design tools like Figma and Codux, focusing on
                  user-centered design systems.
                </p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <h3 className="text-xl text-white mb-1">
                  Present - Frontend Dev
                </h3>
                <p>
                  It's complicated - but building complex web applications with
                  React, TypeScript, and modern web technologies.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl text-white mb-4">Philosophy</h2>
            <p className="mb-4">
              I believe that the best creative work happens at the intersection
              of disciplines. Just like elements in the periodic table can
              combine to create new compounds with unique properties, combining
              different creative skills leads to innovative solutions and unique
              experiences.
            </p>
            <p>
              Whether I'm crafting a brand identity, producing a video, or
              building an interactive web experience, I approach each project
              with curiosity, technical rigor, and a commitment to pushing
              creative boundaries.
            </p>
          </section>

          <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl text-white mb-6">Let's Connect</h2>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:hello@example.com"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-600/20 to-red-600/20 hover:from-fuchsia-600/30 hover:to-red-600/30 text-fuchsia-300 rounded-lg transition-all border border-fuchsia-500/30 hover:border-fuchsia-400/50 hover:shadow-lg hover:shadow-fuchsia-500/20"
              >
                <Mail className="w-5 h-5" />
                Email
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 hover:border-fuchsia-500/30 hover:shadow-lg hover:shadow-fuchsia-500/20"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 hover:border-fuchsia-500/30 hover:shadow-lg hover:shadow-fuchsia-500/20"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 hover:border-fuchsia-500/30 hover:shadow-lg hover:shadow-fuchsia-500/20"
              >
                <Twitter className="w-5 h-5" />
                Twitter
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
