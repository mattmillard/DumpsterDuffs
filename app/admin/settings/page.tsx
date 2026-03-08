"use client";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="text-[#999999] mt-2">Manage your admin preferences.</p>
      </div>

      <section className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-3">General</h2>
        <p className="text-[#999999] text-sm">
          Settings controls can be expanded here as your admin workflow grows.
        </p>
      </section>

      <section
        id="account"
        className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-6 scroll-mt-24"
      >
        <h2 className="text-xl font-bold text-white mb-3">Account</h2>
        <div className="space-y-2 text-sm text-[#999999]">
          <p>This demo admin uses local auth state.</p>
          <p>Use Sign Out from the menu to end your session.</p>
        </div>
      </section>
    </div>
  );
}
