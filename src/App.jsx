import React from 'react';
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useLocation,
} from 'react-router-dom';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import Header from '@/components/Header';

// Public Pages
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ProfilePage from '@/pages/ProfilePage';

// Feature Pages
import AdmissionsFeaturePage from '@/pages/features/AdmissionsFeaturePage';
import AcademicsFeaturePage from '@/pages/features/AcademicsFeaturePage';
import EngagementFeaturePage from '@/pages/features/EngagementFeaturePage';
import FeePaymentsFeaturePage from '@/pages/features/FeePaymentsFeaturePage';
import ExaminationsFeaturePage from '@/pages/features/ExaminationsFeaturePage';
import HRFeaturePage from '@/pages/features/HRFeaturePage';
import TransportFeaturePage from '@/pages/features/TransportFeaturePage';
import HousingFeaturePage from '@/pages/features/HousingFeaturePage';

// Dashboard Pages
import StudentDashboard from '@/pages/StudentDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import AdmissionsPage from '@/pages/AdmissionsPage';
import AdmissionFormPage from '@/pages/AdmissionFormPage';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import FeesPage from '@/pages/FeesPage';
import NotificationsPage from '@/pages/NotificationsPage';

// Admin Pages
import AdminAdmissionsPage from '@/pages/AdminAdmissionsPage';
import AdminCoursesPage from '@/pages/AdminCoursesPage';
import AdminFeesPage from '@/pages/AdminFeesPage';

// Auth Pages
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import VerifyEmailPage from '@/pages/VerifyEmailPage';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Pages where header should be hidden
  const hideHeaderRoutes = [
    '/student-dashboard',
    '/admin-dashboard',
    '/faculty-dashboard',
    '/admissions',
    '/admissions/apply',
    '/academics',
    '/fees',
    '/AdminAdmissionsPage',
    '/AdminCoursesPage',
    '/AdminFeesPage',
    '/profile',
    '/notifications'
  ];

  const shouldHideHeader =
    isAuthenticated &&
    hideHeaderRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

  return (
    <>
      <ScrollToTop />

      {/* Header */}
      {!shouldHideHeader && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* Feature Routes */}
        <Route
          path="/features/admissions"
          element={<AdmissionsFeaturePage />}
        />
        <Route
          path="/features/academics"
          element={<AcademicsFeaturePage />}
        />
        <Route
          path="/features/engagement"
          element={<EngagementFeaturePage />}
        />
        <Route
          path="/features/fee-payments"
          element={<FeePaymentsFeaturePage />}
        />
        <Route
          path="/features/examinations"
          element={<ExaminationsFeaturePage />}
        />
        <Route
          path="/features/hr"
          element={<HRFeaturePage />}
        />
        <Route
          path="/features/transport"
          element={<TransportFeaturePage />}
        />
        <Route
          path="/features/housing"
          element={<HousingFeaturePage />}
        />

        {/* Protected Student Routes */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute
              allowedRoles={[
                'student',
                'admin',
                'faculty',
              ]}
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute
              allowedRoles={[
                'student',
                'admin',
                'faculty',
              ]}
            >
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admissions"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <AdmissionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admissions/apply"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <AdmissionFormPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/academics"
          element={
            <ProtectedRoute allowedRoles={['student', 'faculty']}>
              <CoursesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/academics/course/:id"
          element={
            <ProtectedRoute allowedRoles={['student', 'faculty']}>
              <CourseDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fees"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <FeesPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AdminAdmissionsPage"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminAdmissionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AdminCoursesPage"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminCoursesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AdminFeesPage"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminFeesPage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster theme="dark" />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">
          404
        </h1>

        <p className="text-xl text-muted-foreground mb-8">
          Page not found
        </p>

        <a
          href="/"
          className="text-primary hover:underline font-medium"
        >
          Back to home
        </a>
      </div>
    </div>
  );
};

export default App;