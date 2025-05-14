
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import AboutPage from "./pages/AboutPage";
import WorkshopsPage from "./pages/WorkshopsPage";
import JoinTrainerPage from "./pages/JoinTrainerPage";
import SuccessStoriesPage from "./pages/SuccessStoriesPage";
import ContactPage from "./pages/ContactPage";
import ApplyNowPage from "./pages/ApplyNowPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";

// Admin pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminWorkshopsPage from "./pages/admin/AdminWorkshopsPage";
import AdminCoursesPage from "./pages/admin/AdminCoursesPage";
import AddCoursePage from "./pages/admin/AddCoursePage";
import EditCoursePage from "./pages/admin/EditCoursePage";
import AdminWaitlistPage from "./pages/admin/AdminWaitlistPage";
import AdminSuccessStoriesPage from "./pages/admin/AdminSuccessStoriesPage";
import AddTestimonialPage from "./pages/admin/AddTestimonialPage";
import EditTestimonialPage from "./pages/admin/EditTestimonialPage";
import AdminApplicationsPage from "./pages/admin/AdminApplicationsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="/join-trainer" element={<JoinTrainerPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/apply" element={<ApplyNowPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Admin routes - protected with admin access */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/workshops" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminWorkshopsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminCoursesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses/add" 
              element={
                <ProtectedRoute requireAdmin>
                  <AddCoursePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses/edit/:courseId" 
              element={
                <ProtectedRoute requireAdmin>
                  <EditCoursePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/waitlist" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminWaitlistPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/success-stories" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminSuccessStoriesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/success-stories/add" 
              element={
                <ProtectedRoute requireAdmin>
                  <AddTestimonialPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/success-stories/edit/:testimonialId" 
              element={
                <ProtectedRoute requireAdmin>
                  <EditTestimonialPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/applications" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminApplicationsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminSettingsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
