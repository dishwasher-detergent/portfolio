"use client";

import { ProjectProps } from "#/types/Project";
import Checkbox from "#/ui/form/input/Checkbox";
import Colorpicker from "#/ui/form/input/ColorPicker";
import Input from "#/ui/form/input/Input";
import TagInput from "#/ui/form/input/Tags";
import Textarea from "#/ui/form/input/Textarea";
import FormDisplayWrapper from "#/ui/form/Wrapper";
import api from "#/utils/appwrite";
import * as Dialog from "@radix-ui/react-dialog";
import { Edit, Save, X as XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditProject({ content }: ProjectProps) {
  const [tags, setTags] = useState<string[]>(content.tags);
  const [tag, setTag] = useState<string>("");
  const [title, setTitle] = useState<string | null>(content.title);
  const [shortDesc, setShortDesc] = useState<string | null>(
    content.short_description
  );
  const [desc, setDesc] = useState<string | null>(content.description);
  const [website, setWebsite] = useState<string | null>(content.website);
  const [github, setGithub] = useState<string | null>(content.github);
  const [showcase, setShowcase] = useState<boolean>(content.showcase);
  const [color, setColor] = useState<string>("#7e22ce");
  const [open, setOpen] = useState(false);

  const EditProject = async () => {
    try {
      await api.updateDocument("63e17a3b092917cea721", content.$id, {
        title: title,
        short_description: shortDesc,
        description: desc,
        github: github,
        website: website,
        tags: tags,
        showcase: showcase,
        accent_color: color,
      });
    } catch (error: any) {
      toast(error.message, {
        type: "error",
      });
      return;
    }

    toast(`${title} updated successfully!`, {
      type: "success",
    });
    setOpen(false);
  };

  return (
    <FormDisplayWrapper
      trigger={
        <button
          type="button"
          className="grid h-full w-full place-items-center overflow-hidden rounded-xl bg-blue-500 text-white"
        >
          <Edit size={20} />
        </button>
      }
      modal={true}
    >
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          EditProject();
        }}
        className="flex h-full w-full flex-col"
      >
        <div className="flex w-full flex-1 flex-col gap-2 overflow-y-auto">
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
        <div className="my-4 flex-none border-t border-slate-200 pt-4 dark:border-slate-700">
          <button
            type="submit"
            className="flex w-full flex-row flex-nowrap items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white"
          >
            Save Edits
            <Save size={20} />
          </button>
        </div>
      </form>
    </FormDisplayWrapper>
  );
}
