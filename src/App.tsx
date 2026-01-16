import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/Layout/PublicLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Courses from "./pages/Courses";
import StudentCorner from "./pages/StudentCorner";
import Gallery from "./pages/Gallery";
import Results from "./pages/Results";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import GalleryManagement from "./pages/admin/GalleryManagement";
import CoursesManagement from "./pages/admin/CoursesManagement";
import MagazineManagement from "./pages/admin/MagazineManagement";
import HallOfFameManagement from "./pages/admin/HallOfFameManagement";

import PermissionsPanel from "./pages/admin/PermissionsPanel";

import AdminWelcome from "./pages/admin/AdminWelcome";
import ScrollToTop from "./components/ScrollToTop";

import { AuthProvider } from "./contexts/AuthProvider";
import { useEffect } from "react";
import { setCircularFavicon } from "./lib/faviconUtils";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    setCircularFavicon('/logo.jpg');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes with Navbar & Footer */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/student-corner" element={<StudentCorner />} />
                <Route path="/gallery" element={<GalleryManagement />} />
                <Route path="/results" element={<Results />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                } />
              </Route>

              {/* Admin Dashboard - No Public Navbar */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }>
                <Route index element={<AdminWelcome />} />
                <Route path="gallery" element={<GalleryManagement />} />
                <Route path="courses" element={<CoursesManagement />} />
                <Route path="magazines" element={<MagazineManagement />} />
                <Route path="hall-of-fame" element={<HallOfFameManagement />} />
                <Route path="permissions" element={<PermissionsPanel />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
