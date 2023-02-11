"use client";

import { Projects } from "#/app/Projects/[projects]/page";
import api from "#/utils/appwrite";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ProjectProps {
  project: Projects;
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
    width: "6rem",
  },
};

export default function Project({ project }: ProjectProps) {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (!project) return;
    const fetchImages: Image[] = [];

    for (let i = 0; i < project.images.length; i++) {
      if (project.images[i] == null) continue;
      const img = api.getFilePreview(project.images[i]);
      fetchImages.push({ name: project.images[i], image: img });
    }

    setImages(fetchImages);
  }, []);

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
      className="flex-none w-full h-96 flex flex-row flex-nowrap gap-2"
    >
      <motion.button
        variants={button}
        className="grid h-full bg-rose-600 text-white rounded-xl place-items-center"
        onClick={() => deleteProject()}
      >
        <Trash size={20} />
      </motion.button>
      <div className="w-full h-full p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full w-full overflow-hidden">
          <div className="w-full flex flex-col gap-2 py-2 h-full overflow-y-auto">
            <h2 className="display font-bold text-xl w-full">
              {project.title}
            </h2>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-xs text-slate-600">
                Short Description:
              </p>
              <p>{project.short_description}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-xs text-slate-600">
                Description:
              </p>
              <p>{project.description}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-xs text-slate-600">Tags:</p>
              <div className="flex flex-row gap-1">
                {project.tags.map((tag: string, index: number) => (
                  <div
                    key={index}
                    className="whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold text-white bg-emerald-600 relative"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 h-full w-full overflow-y-auto">
            {images.map((image: Image, index: number) => (
              <div
                key={index}
                className={`relative h-36 rounded-xl overflow-hidden ${
                  project.banner == image.name ? "border-4 border-blue-600" : ""
                }`}
              >
                <div className="bg-slate-900 absolute inset-0 z-0 text-white">
                  <Image
                    style={{ objectFit: "cover", objectPosition: "0% 15%" }}
                    fill={true}
                    src={image.image.href}
                    alt="This is the preview image of the component"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
