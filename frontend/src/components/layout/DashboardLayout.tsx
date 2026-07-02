import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        {/* LOGO */}
        <div className="p-4 text-lg font-bold border-b border-gray-700">
          AI Resume Analyzer
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-4 space-y-3 text-sm">
          <p className="hover:text-blue-400 cursor-pointer">
            Dashboard
          </p>
          <p className="hover:text-blue-400 cursor-pointer">
            Upload Resume
          </p>
          <p className="hover:text-blue-400 cursor-pointer">
            Analytics
          </p>
        </nav>

        {/* USER SECTION */}
        <div className="p-4 border-t border-gray-700 space-y-3">
          <div className="text-sm text-gray-300">
            Signed in as:
          </div>

          <div className="text-white font-medium truncate">
            {user?.name || "User"}
          </div>

          <Button
            onClick={logout}
            variant="destructive"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP NAVBAR */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-4">
          <h1 className="font-semibold text-gray-700">
            Dashboard
          </h1>

          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <span className="text-sm text-gray-600">
              {user?.name || "User"}
            </span>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}