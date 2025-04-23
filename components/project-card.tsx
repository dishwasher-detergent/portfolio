"use client";

import { Links } from "@/components/links";
import { Tags } from "@/components/tags";
import { BASE_URL } from "@/constants/base.constants";
import { Project } from "@/types/types";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";

export function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    document.body.style.overflow = isExpanded ? "auto" : "hidden";
  };

  const navigateImages = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentImageIndex(
        (prev) => (prev + 1) % (project.image_ids?.length || 1),
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? (project.image_ids?.length || 1) - 1 : prev - 1,
      );
    }
  };

  const imageUrl = `${BASE_URL}/projects/${project.id}/images/${project.image_ids[currentImageIndex]}?width=1024&height=1024&quality=80`;

  return (
    <LayoutGroup id={`project-${project.id}`}>
      <article className="flex flex-col items-start gap-4 md:flex-row">
        <div className="relative">
          {isExpanded && (
            <div
              className="invisible aspect-video w-full md:aspect-square md:w-64"
              aria-hidden="true"
            />
          )}

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="fixed inset-0 z-50 bg-slate-50/50 backdrop-blur-md dark:bg-slate-900/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleToggleExpand}
              />
            )}
          </AnimatePresence>
          <motion.div
            layoutId={`project-container-${project.id}`}
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
                className={
                  isExpanded
                    ? "relative aspect-square w-full overflow-hidden rounded-lg"
                    : "aspect-video w-full flex-none cursor-pointer overflow-hidden rounded-lg md:aspect-square md:w-64"
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
                  alt={`${project.title} project image ${currentImageIndex + 1} of ${project.image_ids.length}`}
                  className={
                    isExpanded
                      ? "h-full w-full object-contain"
                      : "h-full w-full object-cover"
                  }
                  transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
                />

                {isExpanded && (
                  <div className="absolute right-4 top-4">
                    <button
                      className="rounded-lg bg-slate-900/50 p-2 text-slate-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleExpand();
                      }}
                    >
                      <X size={24} />
                    </button>
                  </div>
                )}
              </motion.figure>

              {isExpanded && project.image_ids.length > 1 && (
                <motion.div
                  className="mt-4 flex w-full items-center justify-between rounded-xl bg-slate-900/30 p-3 backdrop-blur-md dark:bg-slate-50/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="rounded-xl p-2 text-slate-900 hover:bg-slate-600/20 dark:text-slate-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImages("prev");
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="rounded-xl bg-slate-900/50 px-3 py-1 text-sm font-semibold text-slate-50 dark:bg-slate-50/10">
                    {currentImageIndex + 1} / {project.image_ids.length}
                  </div>
                  <button
                    className="rounded-xl p-2 text-slate-900 hover:bg-slate-600/20 dark:text-slate-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImages("next");
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
        <div className="flex-1 space-y-4">
          <header>
            <h3 className="flex flex-row items-center gap-2 text-3xl font-bold">
              <span>{project.title}</span>
              <Links links={project.links} />
            </h3>
          </header>
          <section aria-label="Project technologies">
            <Tags tags={project.tags} />
          </section>
          <section aria-label="Project description">
            <p className="max-w-2xl">{project.description}</p>
          </section>
        </div>
      </article>
    </LayoutGroup>
  );
}
