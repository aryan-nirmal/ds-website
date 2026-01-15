import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { Loader2 } from "lucide-react";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (user) {
    // If user is already logged in, redirect them
    if (isAdmin) {
      return <Navigate to="/admin" replace />;
    } else {
      // Default to student/home for non-admins
      // You can expand this logic if 'staff' has a specific dashboard
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default PublicRoute;
