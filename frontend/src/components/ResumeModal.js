import React, { useState, useEffect } from 'react';
import { applicationsAPI } from '../services/api';
import { toast } from 'react-hot-toast';

const ResumeModal = ({ isOpen, onClose, applicationId, applicantName, jobTitle }) => {
  const [loading, setLoading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    if (isOpen && applicationId) {
      loadResume();
    }
  }, [isOpen, applicationId]);

  const loadResume = async () => {
    try {
      setLoading(true);
      const response = await applicationsAPI.viewResume(applicationId);
      
      if (!response.ok) {
        throw new Error('Failed to load resume');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setResumeUrl(url);
    } catch (err) {
      console.error('Error loading resume:', err);
      toast.error('Failed to load resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await applicationsAPI.downloadResume(applicationId);
      
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume_${applicantName}_${jobTitle}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Resume downloaded successfully!');
    } catch (err) {
      console.error('Error downloading resume:', err);
      toast.error('Failed to download resume. Please try again.');
    }
  };

  const handleClose = () => {
    if (resumeUrl) {
      window.URL.revokeObjectURL(resumeUrl);
      setResumeUrl(null);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[95vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Resume - {applicantName}
            </h2>
            <p className="text-sm text-gray-500">{jobTitle}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Download
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-6 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading resume...</span>
            </div>
          ) : resumeUrl ? (
            <iframe
              src={resumeUrl}
              className="w-full h-full border border-gray-200 rounded-lg"
              title="Resume Preview"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Failed to load resume</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeModal; 