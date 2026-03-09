"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
          <p className="text-[#999999]">Completing sign in...</p>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasHandledRef = useRef(false);
  const [status, setStatus] = useState("Completing sign in...");

  useEffect(() => {
    if (hasHandledRef.current) {
      return;
    }
    hasHandledRef.current = true;

    async function handleCallback() {
      try {
        const nextParam = searchParams.get("next");
        const safeNext =
          nextParam && nextParam.startsWith("/admin")
            ? nextParam
            : "/admin/dashboard";

        const queryType = searchParams.get("type");
        const code = searchParams.get("code");

        const hashParams = new URLSearchParams(
          window.location.hash.replace(/^#/, ""),
        );
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const hashType = hashParams.get("type");

        const authType = hashType || queryType;

        if (accessToken && refreshToken) {
          setStatus("Validating secure link...");
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            router.replace("/admin/login");
            return;
          }

          if (authType === "recovery" || authType === "invite") {
            router.replace("/admin/login?mode=reset");
            return;
          }

          router.replace(safeNext);
          return;
        }

        if (code) {
          setStatus("Finalizing authentication...");
          const { error: codeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (codeError) {
            router.replace("/admin/login");
            return;
          }

          if (authType === "recovery" || authType === "invite") {
            router.replace("/admin/login?mode=reset");
            return;
          }

          router.replace(safeNext);
          return;
        }

        router.replace("/admin/login");
      } catch (err) {
        console.error("Auth callback error:", err);
        router.replace("/admin/login");
      }
    }

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      <p className="text-[#999999]">{status}</p>
    </div>
  );
}
