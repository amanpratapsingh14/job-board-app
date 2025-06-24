import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import { Briefcase, MapPin, DollarSign, ArrowRight, Search } from 'lucide-react';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getAll({ limit: 6 });
      // Ensure jobs is an array, handle both response.data and response.data.data
      const jobsData = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      setJobs(jobsData);
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error('Error fetching jobs:', err);
      setJobs([]); // Ensure jobs is always an array
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Salary not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Dream Job
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover thousands of job opportunities and connect with top employers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Jobs
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Jobs
          </h2>
          <p className="text-lg text-gray-600">
            Latest opportunities from top companies
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchJobs}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-500">{job.category || 'Full-time'}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {job.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {job.description?.substring(0, 100)}...
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>💰 ${job.salary || 'Salary not specified'}</span>
                  </div>
                </div>
                
                <Link
                  to={`/jobs/${job.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {jobs.length > 0 && (
          <div className="text-center mt-8">
            <Link
              to="/jobs"
              className="inline-flex items-center px-6 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Job Board?
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to find your next career opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Jobs
              </h3>
              <p className="text-gray-600">
                Curated job listings from top companies and startups
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Search
              </h3>
              <p className="text-gray-600">
                Advanced filters to find the perfect job match
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Location Based
              </h3>
              <p className="text-gray-600">
                Find jobs in your preferred location
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 