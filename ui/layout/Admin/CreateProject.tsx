"use client";

import Card from "#/ui/form/Card";
import ImageInput from "#/ui/form/Input/Images";
import Input from "#/ui/form/Input/Input";
import TagInput from "#/ui/form/Input/Tags";
import Textarea from "#/ui/form/Input/Textarea";
import api from "#/utils/appwrite";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateProject() {
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [title, setTitle] = useState<string | null>(null);
  const [shortDesc, setShortDesc] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [banner, setBanner] = useState<HTMLInputElement | null>(null);

  const clearForm = () => {
    setImages([]);
    setTags([]);
    setTag("");
    setTitle(null);
    setShortDesc(null);
    setDesc(null);
    setBanner(null);
  };

  const addProject = async () => {
    const submittedImages: any[] = [];

    try {
      for (let i = 0; i < images.length; i++) {
        let imageInfo = await api.createFile(images[i]);
        submittedImages.push(imageInfo);
      }
    } catch (error: any) {
      toast(error.message, {
        type: "error",
      });
      return;
    }

    try {
      await api.createDocument(process.env.NEXT_PUBLIC_APP_COLLECTION_ID, {
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
      toast(error.message, {
        type: "error",
      });
      return;
    }

    clearForm();

    toast(`${title} created successfully!`, {
      type: "success",
    });
  };

  return (
    <Card
      type="form"
      title="Create Project"
      onSubmit={(e: HTMLFormElement) => {
        e.preventDefault();
        addProject();
      }}
      className="w-full flex-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-white dark:border-slate-700 dark:bg-slate-800 md:w-96"
    >
      <div className="flex w-full flex-col gap-2">
        <Input
          label="Project Name"
          onChange={(e) => setTitle(e.target.value)}
          value={title ? title : ""}
        />
        <Input
          label="Short Description"
          onChange={(e) => setShortDesc(e.target.value)}
          value={shortDesc ? shortDesc : ""}
        />
        <Textarea
          label="Description"
          onChange={(e) => setDesc(e.target.value)}
          value={desc ? desc : ""}
        />
        <ImageInput
          setImages={setImages}
          images={images}
          setBanner={setBanner}
          banner={banner}
        />
        <TagInput setTag={setTag} tag={tag} setTags={setTags} tags={tags} />
      </div>
      <div className="my-4 border-t border-slate-200 pt-4 dark:border-slate-700">
        <button
          type="submit"
          className="flex w-full flex-row flex-nowrap items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white"
        >
          Add Project
          <Send size={20} />
        </button>
      </div>
    </Card>
  );
}
