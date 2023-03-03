"use client";

import useWindowDimensions from "#/hooks/useWindowDimensions";
import FormDisplayWrapper from "#/ui/form/Wrapper";
import Checkbox from "#/ui/form/input/Checkbox";
import Colorpicker from "#/ui/form/input/ColorPicker";
import ImageInput from "#/ui/form/input/Images";
import Input from "#/ui/form/input/Input";
import TagInput from "#/ui/form/input/Tags";
import Textarea from "#/ui/form/input/Textarea";
import api from "#/utils/appwrite";
import { Server } from "#/utils/config";
import { Plus, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateProject() {
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [title, setTitle] = useState<string | null>(null);
  const [shortDesc, setShortDesc] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [github, setGithub] = useState<string | null>(null);
  const [showcase, setShowcase] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#7e22ce");
  const [banner, setBanner] = useState<HTMLInputElement | null>(null);
  const { width } = useWindowDimensions();

  const clearForm = () => {
    setImages([]);
    setTags([]);
    setTag("");
    setTitle(null);
    setShortDesc(null);
    setDesc(null);
    setBanner(null);
    setColor("#7e22ce");
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
      await api.createDocument("63e17a3b092917cea721", {
        title: title,
        short_description: shortDesc,
        description: desc,
        github: github,
        website: website,
        tags: tags,
        showcase: showcase,
        accent_color: color,
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
    <FormDisplayWrapper
      trigger={
        <button
          type="button"
          className="fixed bottom-4 right-4 grid place-items-center overflow-hidden rounded-full bg-blue-500 p-4 text-white"
          //   onClick={() => deleteProject()}
        >
          <Plus size={24} />
        </button>
      }
    >
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          addProject();
        }}
        className="flex h-full flex-col md:w-[30rem] md:p-8 md:pr-6"
      >
        <div className="flex w-full flex-1 flex-col gap-2 overflow-y-auto pr-2">
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
          <Input
            label="Website"
            onChange={(e) => setWebsite(e.target.value)}
            value={website ? website : ""}
          />
          <Input
            label="GitHub"
            onChange={(e) => setGithub(e.target.value)}
            value={github ? github : ""}
          />
          <ImageInput
            setImages={setImages}
            images={images}
            setBanner={setBanner}
            banner={banner}
          />
          <TagInput setTag={setTag} tag={tag} setTags={setTags} tags={tags} />
          <Checkbox
            label="Showcase"
            value={showcase}
            onChange={(e) => setShowcase(e)}
          />
          <Colorpicker
            label="Accent Color"
            value={color}
            onChange={(e) => setColor(e.hex)}
          />
        </div>
        <div className="my-4 flex-none border-t border-slate-300 pt-4 dark:border-slate-700">
          <button
            type="submit"
            className="flex w-full flex-row flex-nowrap items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white"
          >
            Add Project
            <Send size={20} />
          </button>
        </div>
      </form>
    </FormDisplayWrapper>
  );
}
