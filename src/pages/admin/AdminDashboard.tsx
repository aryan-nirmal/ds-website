import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  BookOpen,
  FileText,
  Shield,
  LogOut,
  Menu,
  X,
  Globe,
  Trophy
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthProvider";

const sidebarItems = [
  { name: "Back to Website", path: "/", icon: Globe },
  { name: "Manage Gallery", path: "/admin/gallery", icon: Image },
  { name: "Manage Courses", path: "/admin/courses", icon: BookOpen },
  { name: "Manage Magazines", path: "/admin/magazines", icon: FileText },
  { name: "Hall of Fame", path: "/admin/hall-of-fame", icon: Trophy },
  { name: "User Permissions", path: "/admin/permissions", icon: Shield },
];

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user, isAdmin, loading } = useAuth();

  useEffect(() => {
    // If not loading and not authenticated as admin, redirect
    if (!loading) {
      if (!user || !isAdmin) {
        navigate("/login");
      }
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) return null; // Or a spinner
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/10 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0
        `}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 flex items-center px-6 border-b border-white/10">
            <span className="font-heading text-lg tracking-wider text-white">ADMIN PANEL</span>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-white/10">
            <div className="bg-white/5 rounded-lg p-3 text-sm">
              <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Logged in as</p>
              <p className="text-white font-medium truncate">{user?.email}</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path !== "/admin" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive
                      ? "bg-red-950/30 text-red-500 border border-red-900/30"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"}
                  `}
                >
                  <item.icon size={20} />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start text-neutral-400 hover:text-red-400 hover:bg-red-950/20"
              onClick={() => signOut()}
            >
              <LogOut size={20} className="mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-black">
        {/* Mobile Header */}
        <header className="h-16 lg:hidden flex items-center px-4 bg-[#0a0a0a] border-b border-white/10">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
          <span className="ml-4 font-heading text-white">ADMIN PANEL</span>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
