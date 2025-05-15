
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from './ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, isLoading, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Add debugging toast notifications
    if (requireAdmin && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
    }
  }, [requireAdmin, user, isAdmin]);

  // Show loading indicator while checking auth status
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to auth page if not logged in
  if (!user) {
    console.log("User not authenticated, redirecting to /auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Redirect to home page if not an admin but admin access is required
  if (requireAdmin && !isAdmin) {
    console.log("User is not admin, redirecting to /");
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has necessary permissions
  return <>{children}</>;
};

export default ProtectedRoute;
