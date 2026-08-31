"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/upakarma");
  }, [router]);

  return (
    <main className="page">
      <p>
        <a href="/upakarma">Continue to the Yajur Veda Upakarma guide</a>
      </p>
    </main>
  );
}
