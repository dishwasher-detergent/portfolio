import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ImageInputProps {
  setImages: Function;
  images: File[];
  setBanner: Function;
  banner: HTMLInputElement | null;
}

export default function ImageInput({
  setImages,
  images,
  setBanner,
  banner,
}: ImageInputProps) {
  const convertImagesToArray = (e: FileList | null) => {
    if (e == null) return;
    const imgObj = e;
    setImages(Array.from(imgObj));
  };

  const addImagesToArray = (e: FileList | null) => {
    if (e == null) return;
    const imgObj = e;
    setImages(images.concat(Array.from(imgObj)));
  };

  const removeImageFromArray = (e: string) => {
    setImages((images: File[]) =>
      images.filter((image: File) => image.name !== e)
    );
    if (banner && e == banner.value) {
      setBanner(null);
      banner.checked = false;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="pl-2 text-xs font-semibold text-slate-600 dark:text-slate-200">
        Images ({images.length})
      </p>
      <div className="grid grid-cols-3 gap-2">
        <AnimatePresence initial={false} mode="popLayout">
          {images.map((image: File, index: number) => (
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
              key={image.name}
            >
              <div className="group relative h-24 w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200">
                <Image
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                />
                <button
                  onClick={() => removeImageFromArray(image.name)}
                  className="absolute top-1 right-1 z-20 hidden h-6 w-6 cursor-pointer place-items-center rounded-full bg-rose-600 p-1 text-white group-hover:grid"
                >
                  <Trash size="100%" />
                </button>
                <input
                  id={image.name}
                  type="radio"
                  value={image.name}
                  name="primary-image"
                  className="peer/input hidden"
                  onChange={(e) => setBanner(e.target)}
                />
                <label
                  htmlFor={image.name}
                  className="absolute inset-0 z-10 cursor-pointer rounded-xl peer-checked/input:bg-blue-500/30"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <label
          className={`relative grid h-24 w-full cursor-pointer place-items-center rounded-xl border border-slate-200 bg-slate-200 text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${
            images.length == 0 ? "col-span-3" : ""
          }`}
        >
          <ImagePlus size={24} />
          <input
            type="file"
            multiple
            className="hidden"
            accept="image/*"
            onChange={(e) => addImagesToArray(e.target.files)}
          />
        </label>
      </div>
    </div>
  );
}
