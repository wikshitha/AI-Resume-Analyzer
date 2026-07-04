import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { FiFileText } from "react-icons/fi";


function SidebarContent({ user, logout }: { user: { name?: string } | null; logout: () => void }) {
  return (
    <>
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        AI Resume Analyzer
      </div>

     <nav className="flex-1 p-4 space-y-2">

  <NavLink
    to="/"
    className={({ isActive }) =>
      `flex items-center gap-2 p-2 rounded ${
        isActive ? "bg-blue-600" : "hover:bg-gray-800"
      }`
    }
  >
    <Icons.home />
    Dashboard
  </NavLink>

  <NavLink
    to="/upload"
    className={({ isActive }) =>
      `flex items-center gap-2 p-2 rounded ${
        isActive ? "bg-blue-600" : "hover:bg-gray-800"
      }`
    }
  >
    <Icons.upload />
    Upload Resume
  </NavLink>

  <NavLink
    to="/analytics"
    className={({ isActive }) =>
      `flex items-center gap-2 p-2 rounded ${
        isActive ? "bg-blue-600" : "hover:bg-gray-800"
      }`
    }
  >
    <Icons.analytics />
    Analytics
  </NavLink>

  <NavLink
  to="/history"
  className={({ isActive }) =>
    `flex items-center gap-2 p-2 rounded ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800"
    }`
  }
>
  <FiFileText size={18} />
  Resume History
</NavLink>

</nav>

      <div className="space-y-3 border-t border-gray-700 p-4">
        <div className="text-xs text-gray-400">Signed in as</div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <Icons.user />
          {user?.name || "User"}
        </div>

        <Button
          onClick={logout}
          variant="destructive"
          className="flex w-full items-center gap-2"
        >
          <Icons.logout />
          Logout
        </Button>
      </div>
    </>
  );
}

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="fixed left-3 top-3 z-[70] inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg md:hidden"
      >
        {open ? <Icons.x /> : <Icons.menu />}
        <span>{open ? "Close" : "Menu"}</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col bg-gray-900 text-white transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-16">
          <SidebarContent user={user} logout={logout} />
        </div>
      </aside>

      <aside className="sticky top-0 hidden h-screen w-64 flex-col bg-gray-900 text-white md:flex">
        <SidebarContent user={user} logout={logout} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-white px-4 dark:bg-gray-800">
          <h1 className="font-semibold text-gray-700 dark:text-white">
            Dashboard
          </h1>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Icons.user />
            <span className="text-sm">{user?.name || "User"}</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}