"use client";

import api from "#/utils/appwrite";
import { motion } from "framer-motion";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProjectImages from "#/ui/layout/Admin/Project/Images";
import EditProject from "#/ui/layout/Admin/Project/EditProject";

export interface ProjectProps {
  project: {
    $id: string;
    $collectionId: string;
    title: string;
    short_description: string;
    description: string;
    banner: string;
    images: string[];
    tags: string[];
    showcase: boolean;
    website: string;
    github: string;
  };
}

type Image = {
  name: string;
  image: URL;
};

const button = {
  initial: {
    width: "0",
  },
  hover: {
    width: "4rem",
  },
};

export default function Project({ project }: ProjectProps) {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (!project) return;
    const fetchImages: Image[] = [];

    for (let i = 0; i < project.images.length; i++) {
      if (project.images[i] == null) continue;
      const img = api.getFilePreview(project.images[i], {
        height: 256,
        quality: 100,
        gravity: "center",
      });
      fetchImages.push({ name: project.images[i], image: img });
    }

    setImages(fetchImages);
  }, [project]);

  const deleteProject = async () => {
    const toastId = toast.loading("Deleting Project.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

    for (let i = 0; i < project.images.length; i++) {
      if (project.images[i] == null) continue;
      try {
        await api.deleteFile(project.images[i]);
      } catch (error: any) {
        toast.update(toastId, {
          render: "Error deleting file: " + error.message,
          type: "error",
          isLoading: false,
        });
      }
    }

    try {
      await api.deleteDocument(project.$collectionId, project.$id);
    } catch (error: any) {
      toast.update(toastId, {
        render: "Error deleting document: " + error.message,
        type: "error",
        isLoading: false,
      });
      return;
    }

    toast.update(toastId, {
      render: `${project.title} successfully deleted!`,
      type: "success",
      isLoading: false,
    });
  };

  return (
    <motion.article
      initial="initial"
      whileHover="hover"
      animate="initial"
      className="flex h-96 w-full flex-none flex-row flex-nowrap gap-2"
    >
      <motion.div variants={button} className="flex flex-col gap-2">
        <EditProject project={project} />
        <button
          className="grid h-full w-full place-items-center overflow-hidden rounded-xl bg-rose-600 text-white"
          onClick={() => deleteProject()}
        >
          <Trash size={20} />
        </button>
      </motion.div>
      <div
        className={`h-full w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white ${
          project.showcase ? "border-4 border-blue-500" : ""
        }`}
      >
        <div className="grid h-full w-full grid-cols-1 gap-4 overflow-hidden md:grid-cols-2">
          <div className="flex h-full w-full flex-col gap-2 overflow-y-auto py-2">
            <h2 className="display w-full text-xl font-bold">
              {project.title}
            </h2>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-200">
                Short Description:
              </p>
              <p>{project.short_description}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-200">
                Description:
              </p>
              <p>{project.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-200">
                Tags:
              </p>
              <div className="flex flex-row gap-1">
                {project.tags.map((tag: string, index: number) => (
                  <div
                    key={index}
                    className="relative whitespace-nowrap rounded-full bg-emerald-600 px-2 py-1 text-xs font-semibold text-white"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ProjectImages images={images} project={project} />
        </div>
      </div>
    </motion.article>
  );
}
