"use client";

import CreateProject from "#/ui/layout/Admin/CreateProject";
import ListProjects from "#/ui/layout/Admin/Project/ListProjects";
import api from "#/utils/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
  const router = useRouter();
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

  if (!logged) return <div>Loading</div>;

  return (
    <>
      <div className="w-full flex-none md:sticky md:top-20 md:h-full md:w-96">
        <CreateProject />
      </div>
      <ListProjects />
    </>
  );
}
