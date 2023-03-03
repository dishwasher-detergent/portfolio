"use client";

import { ProjectProps } from "#/types/Project";
import api from "#/utils/appwrite";
import { AnimatePresence, motion } from "framer-motion";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Image = {
  name: string;
  image: URL;
};

interface ProjectImagesProps extends ProjectProps {
  images: Image[];
}

export default function ProjectImages({ images, content }: ProjectImagesProps) {
  const [usedImages, setImages] = useState<Image[]>([]);
  const [banner, setBanner] = useState<string>("");

  useEffect(() => {
    if (images) setImages(images);
  }, [images]);

  useEffect(() => {
    if (!banner || banner == "") return;
    (async () => {
      await api.updateDocument(content.$collectionId, content.$id, {
        banner: banner,
      });
    })();
  }, [banner]);

  const addImage = async (e: HTMLInputElement) => {
    if (!e.files) return;
    const submittedImages: any[] = [];
    const id = toast.loading("Adding Image", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    try {
      for (let i = 0; i < e.files.length; i++) {
        let imageInfo = await api.createFile(e.files[i]);
        submittedImages.push(imageInfo);
      }
    } catch (error: any) {
      toast.update(id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }

    let doc;

    try {
      doc = await api.updateDocument(content.$collectionId, content.$id, {
        images: [
          ...usedImages.map((x) => x.name),
          ...submittedImages.map((x) => x.$id),
        ],
      });
    } catch (error: any) {
      toast.update(id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
      return;
    }

    toast.update(id, {
      render: `${doc.images.join(", ")} added`,
      type: "success",
      isLoading: false,
    });

    e.type = "test";
    e.type = "file";
  };

  const deleteImage = async (fileId: string) => {
    const newImageArray = usedImages.filter((x) => x.name != fileId);
    const id = toast.loading("Deleting Image", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    try {
      await api.deleteFile(fileId);
    } catch (error: any) {
      toast.update(id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }

    try {
      await api.updateDocument(content.$collectionId, content.$id, {
        images: [...newImageArray.map((x) => x.name)],
      });
    } catch (error: any) {
      toast.update(id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }

    toast.update(id, {
      render: `${fileId} deleted!`,
      type: "success",
      isLoading: false,
    });

    setImages(newImageArray);
  };

  return (
    <div className="overflow-y-auto">
      <div className="grid grid-cols-3 gap-2">
        <AnimatePresence initial={false} mode="popLayout">
          {usedImages.map((image: Image, index: number) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.2 },
                layout: {
                  type: "spring",
                  bounce: 0.4,
                  duration: 0.5,
                },
              }}
              key={image.name + index}
              className="h-24"
            >
              <div
                className={`group relative h-full w-full cursor-pointer overflow-hidden rounded-xl border  ${
                  content.banner == image.name
                    ? "border-4 border-blue-500"
                    : "border-slate-300"
                }`}
              >
                <Image
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={image.image.href}
                  alt={image.name}
                />
                <button
                  type="button"
                  onClick={() => deleteImage(image.name)}
                  className="absolute top-1 right-1 z-20 h-6 w-6 cursor-pointer place-items-center rounded-full bg-rose-600 p-1 text-white opacity-0 transition-all group-hover:opacity-100"
                >
                  <Trash size="100%" />
                </button>
                <input
                  id={image.name}
                  type="radio"
                  value={image.name}
                  name="primary-image"
                  className="peer/input hidden"
                  onChange={(e) => setBanner(e.target.value)}
                />
                <label
                  htmlFor={image.name}
                  className="absolute inset-0 z-10 cursor-pointer"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <label
          className={`relative grid h-24 w-full cursor-pointer place-items-center rounded-xl border border-slate-300 bg-slate-200 text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${
            images.length == 0 ? "col-span-3" : ""
          }`}
        >
          <ImagePlus size={24} />
          <input
            type="file"
            multiple
            className="hidden"
            accept="image/*"
            onChange={(e) => addImage(e.target)}
          />
        </label>
      </div>
    </div>
  );
}
