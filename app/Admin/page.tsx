"use client";

import ImageInput from "#/ui/form/Input/Images";
import Input from "#/ui/form/Input/Input";
import TagInput from "#/ui/form/Input/Tags";
import Textarea from "#/ui/form/Input/Textarea";
import api from "#/utils/appwrite";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Projects from "#/ui/layout/Admin/Projects";

export default function Admin() {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [title, setTitle] = useState<string | null>(null);
  const [shortDesc, setShortDesc] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [banner, setBanner] = useState<HTMLInputElement | null>(null);
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!(await api.checkSessionStatus())) {
        router.push("/Login");
        return;
      }
      setLogged(true);
    })();
  });

  useEffect(() => {
    const unsubscribe = api
      .provider()
      .appwrite.subscribe("account", (response) => {
        if (response.events.includes("users.*.sessions.*.delete")) {
          router.push("/");
        }
      });

    return function cleanup() {
      unsubscribe();
    };
  }, []);

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
    const toastId = toast.loading("Adding Project.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
    const submittedImages: any[] = [];

    try {
      for (let i = 0; i < images.length; i++) {
        let imageInfo = await api.createFile(images[i]);
        submittedImages.push(imageInfo);
      }
    } catch (error: any) {
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
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
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
      return;
    }

    clearForm();

    toast.update(toastId, {
      render: `${title} successfully created!`,
      type: "success",
      isLoading: false,
    });
  };

  if (!logged) return <div>Loading</div>;

  return (
    <>
      <div className="w-full md:w-96 md:h-full flex-none md:top-20 md:sticky">
        <article className="flex-none w-96 p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
          <h2 className="display pb-2 border-b border-slate-200 mb-4 font-bold">
            Create Project
          </h2>
          <div className="w-full flex flex-col gap-2">
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
          <div className="pt-4 border-t border-slate-200 my-4">
            <button
              onClick={() => addProject()}
              className="w-full px-4 py-2 rounded-xl bg-blue-600 text-white flex flex-row flex-nowrap gap-2 items-center justify-center"
            >
              Add Project
              <Send size={20} />
            </button>
          </div>
        </article>
      </div>
      <Projects />
    </>
  );
}
