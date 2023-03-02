"use client";

import api from "#/utils/appwrite";
import { AnimatePresence, motion } from "framer-motion";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProjectImages from "#/ui/layout/Admin/Project/Images";
import EditProject from "#/ui/layout/Admin/Project/EditProject";
import { ProjectProps } from "#/types/Project";
import { textColor } from "#/utils/color";
import useWindowDimensions from "#/hooks/useWindowDimensions";

type Image = {
  name: string;
  image: URL;
};

export default function Project({ content }: ProjectProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!content) return;
    const fetchImages: Image[] = [];

    for (let i = 0; i < content.images.length; i++) {
      if (content.images[i] == null) continue;
      const img = api.getFilePreview(content.images[i], {
        height: "256",
        quality: "100",
        gravity: "center",
      });
      fetchImages.push({ name: content.images[i], image: img });
    }

    setImages(fetchImages);
  }, [content]);

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

    for (let i = 0; i < content.images.length; i++) {
      if (content.images[i] == null) continue;
      try {
        await api.deleteFile(content.images[i]);
      } catch (error: any) {
        toast.update(toastId, {
          render: "Error deleting file: " + error.message,
          type: "error",
          isLoading: false,
        });
      }
    }

    try {
      await api.deleteDocument(content.$collectionId, content.$id);
    } catch (error: any) {
      toast.update(toastId, {
        render: "Error deleting document: " + error.message,
        type: "error",
        isLoading: false,
      });
      return;
    }

    toast.update(toastId, {
      render: `${content.title} successfully deleted!`,
      type: "success",
      isLoading: false,
    });
  };

  return (
    <motion.article
      initial="initial"
      whileHover="hover"
      animate="initial"
      className="flex h-96 w-full flex-none flex-col-reverse flex-nowrap gap-2 md:flex-row"
      onClick={() => setOpen(!open)}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              height: width <= 768 ? 0 : "100%",
              width: width >= 768 ? 0 : "100%",
            }}
            animate={{
              height: width <= 768 ? "3rem" : "100%",
              width: width >= 768 ? "4rem" : "100%",
            }}
            exit={{
              height: width <= 768 ? 0 : "100%",
              width: width >= 768 ? 0 : "100%",
            }}
            className="flex flex-none flex-row gap-2 md:flex-col"
          >
            <EditProject content={content} />
            <button
              className="grid h-full w-full place-items-center overflow-hidden rounded-xl bg-rose-600 text-white"
              onClick={() => deleteProject()}
            >
              <Trash size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`h-full w-full rounded-xl border  bg-slate-50 p-4 text-slate-900  dark:bg-slate-800 dark:text-white ${
          content.showcase
            ? "border-4 border-blue-500"
            : "border-slate-200 dark:border-slate-700"
        }`}
      >
        <div className="grid h-full w-full grid-cols-1 gap-4 overflow-hidden md:grid-cols-2">
          <div className="flex h-full w-full flex-col gap-2 overflow-y-auto py-2">
            <h2 className="display w-full text-xl font-bold">
              <a
                href={`/Project/${content.$id}`}
                rel="noreferrer"
                target="_blank"
              >
                {content.title}
              </a>
            </h2>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-200">
                Short Description:
              </p>
              <p>{content.short_description}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-200">
                Description:
              </p>
              <p>{content.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-200">
                Tags:
              </p>
              <div className="flex flex-row gap-1">
                {content.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="relative whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold"
                    {...textColor(content.accent_color, true)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ProjectImages images={images} content={content} />
        </div>
      </div>
    </motion.article>
  );
}
