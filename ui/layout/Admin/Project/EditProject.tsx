"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Save, Trash, XIcon } from "lucide-react";
import { ProjectProps } from "#/ui/layout/Admin/Project/Project";
import Input from "#/ui/form/Input/Input";
import Textarea from "#/ui/form/Input/Textarea";
import TagInput from "#/ui/form/Input/Tags";
import Checkbox from "#/ui/form/Input/Checkbox";
import { useState } from "react";
import api from "#/utils/appwrite";
import { toast } from "react-toastify";

export default function EditProject({ project }: ProjectProps) {
  const [tags, setTags] = useState<string[]>(project.tags);
  const [tag, setTag] = useState<string>("");
  const [title, setTitle] = useState<string | null>(project.title);
  const [shortDesc, setShortDesc] = useState<string | null>(
    project.short_description
  );
  const [desc, setDesc] = useState<string | null>(project.description);
  const [website, setWebsite] = useState<string | null>(project.website);
  const [github, setGithub] = useState<string | null>(project.github);
  const [showcase, setShowcase] = useState<boolean>(project.showcase);
  const [open, setOpen] = useState(false);

  const EditProject = async () => {
    try {
      await api.updateDocument(
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID,
        project.$id,
        {
          title: title,
          short_description: shortDesc,
          description: desc,
          github: github,
          website: website,
          tags: tags,
          showcase: showcase,
        }
      );
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
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="grid h-full w-full place-items-center overflow-hidden rounded-xl bg-blue-500 text-white"
          //   onClick={() => deleteProject()}
        >
          <Trash size={20} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-900/10" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 h-3/5 max-h-full w-[30rem] max-w-full -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-white p-6 dark:bg-slate-900">
          <form
            onSubmit={(event: any) => {
              event.preventDefault();
              EditProject();
            }}
            className="flex h-full w-full flex-col"
          >
            <Dialog.Title className="display flex-none px-2 pb-4 text-2xl font-bold text-slate-900 dark:text-white">
              Edit {project.title}
            </Dialog.Title>
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
              <TagInput
                setTag={setTag}
                tag={tag}
                setTags={setTags}
                tags={tags}
              />
              <Checkbox
                label="Showcase"
                value={showcase}
                onChange={(e) => setShowcase(e.target.checked)}
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
          <Dialog.Close asChild>
            <button
              className="absolute top-6 right-6 hover:text-rose-600"
              aria-label="Close"
            >
              <XIcon size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
