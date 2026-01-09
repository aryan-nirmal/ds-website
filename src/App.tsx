import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Courses from "./pages/Courses";
import StudentCorner from "./pages/StudentCorner";
import Results from "./pages/Results";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import StudentLogin from "./pages/auth/StudentLogin";
import StaffLogin from "./pages/auth/StaffLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import LoginSelection from "./pages/LoginSelection";
import AdminDashboard from "./pages/admin/AdminDashboard";
import GalleryManagement from "./pages/admin/GalleryManagement";
import CoursesManagement from "./pages/admin/CoursesManagement";
import MagazineManagement from "./pages/admin/MagazineManagement";

import PermissionsPanel from "./pages/admin/PermissionsPanel";
import { AuthProvider } from "./contexts/AuthProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/student-corner" element={<StudentCorner />} />
            <Route path="/results" element={<Results />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginSelection />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/staff" element={<StaffLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />

            {/* Admin Dashboard */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<div className="text-white">Welcome to Admin Dashboard</div>} />
              <Route path="gallery" element={<GalleryManagement />} />
              <Route path="courses" element={<CoursesManagement />} />
              <Route path="magazines" element={<MagazineManagement />} />
              <Route path="permissions" element={<PermissionsPanel />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
