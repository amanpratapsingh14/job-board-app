import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { applicationsAPI } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationsAPI.getAll();
      setApplications(response.data);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.first_name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {user?.first_name} {user?.last_name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                </div>
                {user?.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member since</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(user?.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  to="/jobs"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center block"
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
                <span className="text-sm text-gray-500">
                  {applications.length} application{applications.length !== 1 ? 's' : ''}
                </span>
              </div>

              {error ? (
                <div className="text-center py-8">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button 
                    onClick={fetchApplications}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                  <p className="text-gray-500 mb-6">Start your job search by browsing available positions.</p>
                  <Link
                    to="/jobs"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Browse Jobs
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            <Link to={`/jobs/${application.job_id}`} className="hover:text-blue-600">
                              {application.job_title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-2">{application.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span>📍 {application.location}</span>
                            <span>💰 ${application.job.salary}</span>
                            <span>📅 Applied {new Date(application.created_at).toLocaleDateString()}</span>
                          </div>
                          {application.cover_letter && (
                            <p className="text-gray-700 text-sm line-clamp-2">
                              {application.cover_letter.substring(0, 150)}...
                            </p>
                          )}
                        </div>
                        <div className="ml-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            {application.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Link
                            to={`/jobs/${application.job_id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Job
                          </Link>
                          {application.resume_url && (
                            <a
                              href={application.resume_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View Resume
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 