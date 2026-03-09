"use client";

import { Suspense } from "react";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { adminLogin } from "@/lib/auth/admin";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0F0F0F]" aria-hidden="true" />
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const submittedEmail = (
      formData.get("email")?.toString().trim() || email.trim()
    ).toLowerCase();
    const submittedPassword = formData.get("password")?.toString() || password;

    if (!submittedEmail || !submittedPassword) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const result = await adminLogin(submittedEmail, submittedPassword);

      if (!result.success) {
        setError(result.error || "Invalid credentials.");
        return;
      }

      // Clear any old demo auth
      localStorage.removeItem("admin_demo_auth");

      const redirectTarget = searchParams.get("redirect");
      const safeRedirect =
        redirectTarget && redirectTarget.startsWith("/admin")
          ? redirectTarget
          : "/admin/dashboard";

      router.push(safeRedirect);
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <img
              src="/logo.png"
              alt="Dumpster Duff's"
              className="w-12 h-12 mx-auto"
            />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-[#999999]">
            Secure access to your operations dashboard
          </p>
        </div>

        {/* Form Card */}
        <div className="card p-8 bg-[#1A1A1A]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dumpsterduffs.com"
                className="input-field w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-white mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field w-full"
                required
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="btn-primary w-full font-semibold text-base"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
