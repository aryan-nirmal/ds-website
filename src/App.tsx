import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { setCircularFavicon } from "./lib/faviconUtils";
import { AuthProvider } from "./contexts/AuthProvider";

// Layouts and Components (Keep critical ones eager if small, or lazy load all)
import PublicLayout from "./components/Layout/PublicLayout";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

// Lazy Load Pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Courses = lazy(() => import("./pages/Courses"));
const StudentCorner = lazy(() => import("./pages/StudentCorner"));
const GalleryManagement = lazy(() => import("./pages/admin/GalleryManagement")); // Note: Public route uses this too? Double check original
const Results = lazy(() => import("./pages/Results"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminWelcome = lazy(() => import("./pages/admin/AdminWelcome"));
const CoursesManagement = lazy(() => import("./pages/admin/CoursesManagement"));
const MagazineManagement = lazy(() => import("./pages/admin/MagazineManagement"));
const HallOfFameManagement = lazy(() => import("./pages/admin/HallOfFameManagement"));
const PermissionsPanel = lazy(() => import("./pages/admin/PermissionsPanel"));

const queryClient = new QueryClient();

// Loading Fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <Loader2 className="w-10 h-10 animate-spin text-accent" />
  </div>
);

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
          <SpeedInsights />
          <Analytics />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes with Navbar & Footer */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/student-corner" element={<StudentCorner />} />
                  <Route path="/gallery" element={<GalleryManagement />} /> {/* Verified this matched original import */}
                  <Route path="/results" element={<Results />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  } />
                </Route>

                {/* Admin Dashboard - No Public Navbar */}
                {/* Common Admin/Staff Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute allowedRoles={['admin', 'staff']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminWelcome />} />
                  <Route path="gallery" element={<GalleryManagement />} />
                  <Route path="courses" element={<CoursesManagement />} />
                  <Route path="magazines" element={<MagazineManagement />} />
                  <Route path="hall-of-fame" element={<HallOfFameManagement />} />

                  {/* Admin Only Routes */}
                  <Route path="permissions" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <PermissionsPanel />
                    </ProtectedRoute>
                  } />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
