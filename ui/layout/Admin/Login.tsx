"use client";

import api from "#/utils/appwrite";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckLoginStatus({
  children,
}: {
  children: React.ReactNode;
}) {
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

  if (!logged)
    return (
      <div className="grid w-full place-items-center">
        <Loader2 className="animate-spin" size={26} />
      </div>
    );

  return <>{children}</>;
}
