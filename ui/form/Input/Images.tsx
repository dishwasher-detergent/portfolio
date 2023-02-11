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
    <div className="flex flex-col gap-1">
      <p className="text-xs pl-2 font-semibold text-slate-600">Images</p>
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
              <div className="relative w-full h-24 rounded-xl border overflow-hidden border-slate-200 group cursor-pointer">
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
                  className="z-20 hidden group-hover:grid absolute top-1 right-1 w-6 h-6 p-1 place-items-center cursor-pointer rounded-full bg-rose-600 text-white"
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
                  className="cursor-pointer absolute z-10 inset-0 peer-checked/input:bg-blue-500/30 rounded-xl"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <label
          className={`relative w-full h-24 bg-slate-200 border border-slate-300 rounded-xl text-slate-400 grid place-items-center cursor-pointer ${
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
