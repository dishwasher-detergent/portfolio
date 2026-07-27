"use client";

import { Project } from "@kurioh/client/interfaces";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Links } from "@/components/links";
import { Tags } from "@/components/tags";
import { BASE_URL, TEAM_ID } from "@/constants/base.constants";

const imageTransition = { layout: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } };

export function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasSettled, setHasSettled] = useState(false);

  const handleToggleExpand = () => {
    setHasSettled(false);
    setIsExpanded(!isExpanded);
    document.body.style.overflow = isExpanded ? "auto" : "hidden";
  };

  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleToggleExpand();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  const navigateImages = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentImageIndex(
        (prev) => (prev + 1) % (project.images?.length || 1),
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? (project.images?.length || 1) - 1 : prev - 1,
      );
    }
  };

  const imageUrl = `${BASE_URL}/teams/${TEAM_ID}/projects/${project.id}/images/${project.images[currentImageIndex]}?width=1024&height=1024&quality=80`;

  return (
    <LayoutGroup id={`project-${project.id}`}>
      <article className="flex flex-col items-start gap-3 md:flex-row">
        <div className="relative">
          {isExpanded && (
            <div
              className="invisible aspect-video w-full md:aspect-square md:w-40"
              aria-hidden="true"
            />
          )}

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="fixed inset-0 z-50 bg-slate-50/70 backdrop-blur-md dark:bg-slate-950/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleToggleExpand}
              />
            )}
          </AnimatePresence>
          <div
            className={
              isExpanded
                ? "fixed inset-0 z-50 flex items-center justify-center"
                : "relative"
            }
          >
            <div
              className={
                isExpanded ? "flex w-full max-w-4xl flex-col items-center" : ""
              }
            >
              <motion.figure
                layoutId={`project-figure-${project.id}`}
                transition={imageTransition}
                onLayoutAnimationComplete={() => setHasSettled(isExpanded)}
                className={
                  isExpanded
                    ? "relative aspect-square w-full overflow-hidden rounded-xl"
                    : "aspect-video w-full flex-none cursor-pointer overflow-hidden rounded-xl md:aspect-square md:w-40"
                }
                onClick={isExpanded ? undefined : handleToggleExpand}
                style={{
                  pointerEvents: "auto",
                  zIndex: isExpanded ? 50 : "auto",
                }}
              >
                <motion.img
                  layoutId={`project-image-${project.id}-${currentImageIndex === 0 ? 0 : "other"}`}
                  key={
                    currentImageIndex === 0
                      ? "first-image"
                      : `image-${currentImageIndex}`
                  }
                  src={imageUrl}
                  alt={`${project.title} project image ${currentImageIndex + 1} of ${project.images.length}`}
                  className={
                    isExpanded && hasSettled
                      ? "h-full w-full object-contain"
                      : "h-full w-full object-cover"
                  }
                  transition={imageTransition}
                />

                {isExpanded && (
                  <motion.div
                    className="absolute right-3 top-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                  >
                    <button
                      className="rounded-lg bg-slate-50/70 p-1.5 text-slate-900 backdrop-blur-md hover:bg-slate-600/20 dark:bg-slate-950/70 dark:text-slate-50 dark:hover:bg-slate-200/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleExpand();
                      }}
                    >
                      <X size={20} />
                    </button>
                  </motion.div>
                )}
              </motion.figure>

              {isExpanded && project.images.length > 1 && (
                <motion.div
                  className="mt-3 flex items-center gap-1 rounded-xl bg-slate-50/70 p-1.5 backdrop-blur-md dark:bg-slate-950/70"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="rounded-lg p-1.5 text-slate-900 hover:bg-slate-600/20 dark:text-slate-50 dark:hover:bg-slate-200/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImages("prev");
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="rounded-lg px-2 text-xs font-semibold text-slate-900 dark:text-slate-50">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                  <button
                    className="rounded-lg p-1.5 text-slate-900 hover:bg-slate-600/20 dark:text-slate-50 dark:hover:bg-slate-200/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImages("next");
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <header>
            <h3 className="flex flex-row items-center gap-2 text-xl font-bold">
              <span>{project.title}</span>
              <Links links={project.links} />
            </h3>
          </header>
          <section aria-label="Project technologies">
            <Tags tags={project.tags} />
          </section>
          <section aria-label="Project description">
            <p className="max-w-2xl text-sm">{project.description}</p>
          </section>
        </div>
      </article>
    </LayoutGroup>
  );
}
