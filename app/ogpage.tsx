"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  return;
  <div>
    <main className="min-h-screen bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          className="flex flex-col items-center gap-6"
        >
          {/* Profile Picture Placeholder */}
          <div className="w-32 h-32 md:w-40 md:h-40 bg-muted rounded-2xl border flex items-center justify-center overflow-hidden">
            <span className="text-muted-foreground text-sm font-medium">
              Profile Image
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">
            RICHARD’S pORTFOLIO
          </h1>

          {/* Nav Links to Other Sections */}
          <nav className="flex items-center gap-8 mt-2 text-lg text-muted-foreground font-medium">
            <a
              href="#about"
              className="hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="hover:text-foreground transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>
        </motion.div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section
        id="about"
        className="min-h-screen flex items-center px-6 md:px-16 py-20 max-w-6xl mx-auto"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full"
        >
          {/* Left: Bio & Education */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                About Me
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I am a computer science student specializing in web development,
                interactive software, and creative tech.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                Education
              </h3>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-xs border font-medium">
                  PAU
                </div>
                <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-xs border font-medium">
                  B.Sc
                </div>
                <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-xs border font-medium">
                  2026
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Skills */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-6">
              Technical Skills
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                "React",
                "Next.js",
                "Tailwind",
                "JavaScript",
                "PHP",
                "Blender",
                "Git",
                "SQL",
              ].map((skill) => (
                <div
                  key={skill}
                  className="aspect-square bg-muted rounded-lg flex items-center justify-center p-2 text-center text-xs font-semibold border"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. PROJECTS SECTION */}
      <section
        id="projects"
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 max-w-6xl mx-auto"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold tracking-tight mb-12">Projects</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "2D Art", desc: "Digital & Vector Illustration" },
              { title: "Graphic Design", desc: "Branding & Visual Design" },
              { title: "programming", desc: "Web Apps & Systems" },
              { title: "3D Works", desc: "Blender Assets & Renders" },
            ].map((cat) => (
              <Card
                key={cat.title}
                className="bg-muted/40 border hover:border-foreground/30 transition-all aspect-square flex flex-col justify-center items-center text-center p-6 cursor-pointer group"
              >
                <CardContent className="p-0 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold group-hover:scale-105 transition-transform">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">
                    {cat.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. CONTACT SECTION */}
      <section
        id="contact"
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 max-w-6xl mx-auto"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          className="space-y-6 max-w-xl"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-8">Contact</h2>

          <div>
            <h3 className="text-xl font-semibold mb-2">Get In Touch</h3>
            <p className="text-muted-foreground">
              Interested in collaborating or hiring me for web dev or 3D art?
              Drop a message or find me online.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button asChild>
              <a href="mailto:your-email@example.com">Send Email</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  </div>;
}
