"use client";

import { ImagePlus, Plus, Send, Trash } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import api from "#/utils/appwrite";
import Input from "#/ui/form/Input";
import Textarea from "#/ui/form/Textarea";
import { toast } from "react-toastify";

export default function Admin() {
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [shortDesc, setShortDesc] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [banner, setBanner] = useState<HTMLInputElement | null>();

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
    const newImageArray = images.filter((image) => image.name != e);
    setImages(newImageArray);
    if (banner && e == banner.value) {
      setBanner(null);
      banner.checked = false;
    }
  };

  const addTagsToArray = () => {
    if (tag == null) return;
    if (tags.includes(tag)) return;
    setTags([...tags, tag]);
    setTag("");
  };

  const removeTagsFromArray = (e: string) => {
    const newTagArray = tags.filter((tag) => tag != e);
    setTags(newTagArray);
  };

  const addProject = async () => {
    const submittedImages: any[] = [];

    try {
      for (let i = 0; i < images.length; i++) {
        let imageInfo = await api.createFile(images[i]);
        submittedImages.push(imageInfo);
      }
    } catch (error: any) {
      toast(error.message);
      return;
    }

    try {
      await api.createDocument("63e17a3b092917cea721", {
        title: title,
        short_description: shortDesc,
        description: desc,
        tags: tags,
        images: submittedImages.map((x) => x.$id),
        banner: banner
          ? submittedImages.filter((x) => x.name == banner.value)[0].$id
          : "",
      });
    } catch (error: any) {
      toast(error.message);
      return;
    }

    toast(`${title} successfully created!`);
  };

  return (
    <>
      <section className="w-96 p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
        <div className="w-full flex flex-col gap-2">
          <Input
            label="Project Name"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Short Description"
            onChange={(e) => setShortDesc(e.target.value)}
          />
          <Textarea
            label="Description"
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <p className="text-xs pl-2 font-semibold text-slate-600">Images</p>
            {images.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {images.map((image: File, index: number) => {
                  return (
                    <div
                      key={index}
                      className="relative w-full h-24 rounded-xl border overflow-hidden border-slate-200 group cursor-pointer"
                    >
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
                  );
                })}
                <label className="relative w-full h-24 bg-slate-200 border border-slate-300 rounded-xl text-slate-400 grid place-items-center cursor-pointer">
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
            ) : (
              <label className="w-full bg-slate-200 border border-slate-300 h-32 rounded-xl text-slate-400 grid place-items-center cursor-pointer">
                <ImagePlus size={24} />
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => convertImagesToArray(e.target.files)}
                />
              </label>
            )}
            <div className="flex flex-col gap-1">
              <p className="text-xs pl-2 font-semibold text-slate-600">Tags</p>
              <div className="relative w-full p-2 min-h-[2rem] bg-slate-200 border border-slate-300 rounded-xl text-slate-400 flex flex-row gap-1 flex-wrap cursor-pointer">
                {tags.map((item: string, index: number) => {
                  if (item == null) return;
                  return (
                    <div
                      className="whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold text-white bg-emerald-600 group relative"
                      key={index}
                    >
                      {item}
                      <button
                        onClick={() => removeTagsFromArray(item)}
                        className="z-20 hidden group-hover:grid absolute top-0 left-0 w-6 h-full p-1 place-items-center cursor-pointer rounded-full bg-rose-600 text-white"
                      >
                        <Trash size="100%" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  placeholder="Add Tag"
                  className="h-9 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 w-full"
                  maxLength={16}
                  onChange={(e) => setTag(e.target.value)}
                />
                <button
                  className="p-2 grid place-items-center h-9 w-9 flex-none bg-blue-600 text-white rounded-xl"
                  onClick={() => addTagsToArray()}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-200 my-4">
          <button
            onClick={() => addProject()}
            className="w-full px-4 py-2 rounded-xl bg-blue-600 text-white flex flex-row flex-nowrap gap-2 items-center justify-center"
          >
            Add Project
            <Send size={20} />
          </button>
        </div>
      </section>
    </>
  );
}
