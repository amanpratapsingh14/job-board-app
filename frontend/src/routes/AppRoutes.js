import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import JobApplicationPage from '../pages/JobApplicationPage';
import UserApplicationsPage from '../pages/UserApplicationsPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import ApplicantsPage from '../pages/admin/ApplicantsPage';
import CompanyProfilePage from '../pages/CompanyProfilePage';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* User Private Routes */}
        <Route path="/apply/:jobId" element={<PrivateRoute><JobApplicationPage /></PrivateRoute>} />
        <Route path="/my-applications" element={<PrivateRoute><UserApplicationsPage /></PrivateRoute>} />
        <Route path="/company/profile" element={<PrivateRoute><CompanyProfilePage /></PrivateRoute>} />

        {/* Admin Private Routes */}
        <Route path="/admin/dashboard" element={<PrivateRoute adminOnly={true}><AdminDashboardPage /></PrivateRoute>} />
        <Route path="/admin/applicants" element={<PrivateRoute adminOnly={true}><ApplicantsPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes; 