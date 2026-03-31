"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleLogout} size="sm" variant="outline" disabled={loading}>
      {loading ? "로그아웃 중..." : "로그아웃"}
    </Button>
  );
}
