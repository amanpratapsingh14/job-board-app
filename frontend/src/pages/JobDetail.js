import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsAPI, applicationsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);
  const [application, setApplication] = useState({
    cover_letter: '',
    resume: null
  });

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getById(id);
      setJob(response.data);
    } catch (err) {
      setError('Failed to fetch job details');
      console.error('Error fetching job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setApplication(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    // Check if resume is selected
    if (!application.resume) {
      alert('Please select a resume file.');
      return;
    }

    try {
      setApplying(true);
      const formData = new FormData();
      formData.append('job_id', id);
      // Extract name from email (username part before @)
      const name = user.email ? user.email.split('@')[0] : '';
      formData.append('name', name);
      formData.append('email', user.email || '');
      formData.append('cover_letter', application.cover_letter);
      formData.append('resume', application.resume);

      // Debug: Log what we're sending
      console.log('Sending application data:');
      console.log('job_id:', id);
      console.log('name:', name);
      console.log('email:', user.email);
      console.log('cover_letter:', application.cover_letter);
      console.log('resume:', application.resume);

      await applicationsAPI.create(formData);
      alert('Application submitted successfully!');
      navigate('/applications');
    } catch (err) {
      alert('Failed to submit application. Please try again.');
      console.error('Error submitting application:', err);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Job not found'}</p>
          <button 
            onClick={() => navigate('/jobs')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{job.company}</p>
              <div className="flex items-center space-x-4 text-gray-500">
                <span>📍 {job.location}</span>
                <span>💰 ${job.salary_range}</span>
                <span>📅 Posted {new Date(job.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {job.category}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="whitespace-pre-wrap">{job.description}</p>
            </div>
          </div>

          {job.requirements && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="whitespace-pre-wrap">{job.requirements}</p>
              </div>
            </div>
          )}
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for this Position</h2>
          
          {!user ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Please log in to apply for this job.</p>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Log In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter *
                </label>
                <textarea
                  id="cover_letter"
                  name="cover_letter"
                  rows={6}
                  required
                  value={application.cover_letter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume (PDF, DOC, DOCX) *
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Maximum file size: 5MB
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/jobs')}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  ← Back to Jobs
                </button>
                <button
                  type="submit"
                  disabled={applying}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail; 