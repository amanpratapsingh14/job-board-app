#!/usr/bin/env python3
"""
Comprehensive API Testing Script for Job Board Application
Tests all endpoints, adds sample data, and uses PDF files
"""

import requests
import json
import time
import os
from typing import Dict, Any

# API Base URL
BASE_URL = "http://localhost:8080"

class APITester:
    def __init__(self):
        self.session = requests.Session()
        self.admin_token = None
        self.user_token = None
        self.sample_data = {}
        
    def log(self, message: str, status: str = "INFO"):
        """Log messages with timestamp"""
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] {status}: {message}")
    
    def test_health_check(self) -> bool:
        """Test health check endpoint"""
        try:
            response = self.session.get(f"{BASE_URL}/health")
            if response.status_code == 200:
                self.log("✅ Health check passed", "SUCCESS")
                return True
            else:
                self.log(f"❌ Health check failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ Health check error: {str(e)}", "ERROR")
            return False
    
    def test_admin_registration(self) -> bool:
        """Test admin registration"""
        try:
            data = {
                "email": "admin@jobboard.com",
                "password": "admin123"
            }
            response = self.session.post(f"{BASE_URL}/admin/register", json=data)
            if response.status_code in [200, 400]:  # 400 if admin already exists
                self.log("✅ Admin registration test completed", "SUCCESS")
                return True
            else:
                self.log(f"❌ Admin registration failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ Admin registration error: {str(e)}", "ERROR")
            return False
    
    def test_admin_login(self) -> bool:
        """Test admin login and get token"""
        try:
            data = {
                "email": "admin@jobboard.com",
                "password": "admin123"
            }
            response = self.session.post(f"{BASE_URL}/admin/login", json=data)
            if response.status_code == 200:
                result = response.json()
                self.admin_token = result["access_token"]
                self.log("✅ Admin login successful", "SUCCESS")
                return True
            else:
                self.log(f"❌ Admin login failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ Admin login error: {str(e)}", "ERROR")
            return False
    
    def test_user_registration(self) -> bool:
        """Test user registration"""
        try:
            data = {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "password": "password123"
            }
            response = self.session.post(f"{BASE_URL}/api/auth/register", json=data)
            if response.status_code in [200, 400]:  # 400 if user already exists
                self.log("✅ User registration test completed", "SUCCESS")
                return True
            else:
                self.log(f"❌ User registration failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ User registration error: {str(e)}", "ERROR")
            return False
    
    def test_user_login(self) -> bool:
        """Test user login and get token"""
        try:
            data = {
                "email": "john.doe@example.com",
                "password": "password123"
            }
            response = self.session.post(f"{BASE_URL}/api/auth/login", json=data)
            if response.status_code == 200:
                result = response.json()
                self.user_token = result["access_token"]
                self.log("✅ User login successful", "SUCCESS")
                return True
            else:
                self.log(f"❌ User login failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ User login error: {str(e)}", "ERROR")
            return False
    
    def test_create_company(self) -> bool:
        """Test company creation"""
        try:
            data = {
                "companyName": "TechCorp Solutions",
                "description": "Leading technology solutions provider",
                "website": "https://techcorp.com",
                "location": "San Francisco, CA",
                "industry": "Technology",
                "size": "500-1000 employees",
                "logoUrl": "https://techcorp.com/logo.png"
            }
            response = self.session.post(f"{BASE_URL}/api/company/profile", json=data)
            if response.status_code == 200:
                result = response.json()
                self.sample_data["company_id"] = result["_id"]
                self.log("✅ Company creation successful", "SUCCESS")
                return True
            else:
                self.log(f"❌ Company creation failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ Company creation error: {str(e)}", "ERROR")
            return False
    
    def test_create_job(self) -> bool:
        """Test job creation (admin only)"""
        try:
            if not self.admin_token:
                self.log("❌ Admin token required for job creation", "ERROR")
                return False
            
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            data = {
                "title": "Senior Python Developer",
                "companyName": "TechCorp Solutions",
                "description": "We are looking for an experienced Python developer to join our team. The ideal candidate should have strong experience with FastAPI, React, and MongoDB.",
                "location": "San Francisco, CA",
                "salary": 120000,
                "status": "open"
            }
            response = self.session.post(f"{BASE_URL}/admin/jobs", json=data, headers=headers)
            if response.status_code == 200:
                result = response.json()
                self.sample_data["job_id"] = result["_id"]
                self.log("✅ Job creation successful", "SUCCESS")
                return True
            else:
                self.log(f"❌ Job creation failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ Job creation error: {str(e)}", "ERROR")
            return False
    
    def test_get_jobs(self) -> bool:
        """Test getting all jobs"""
        try:
            response = self.session.get(f"{BASE_URL}/api/jobs")
            if response.status_code == 200:
                jobs = response.json()
                self.log(f"✅ Retrieved {len(jobs)} jobs", "SUCCESS")
                return True
            else:
                self.log(f"❌ Get jobs failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ Get jobs error: {str(e)}", "ERROR")
            return False
    
    def test_get_job_by_id(self) -> bool:
        """Test getting a specific job"""
        try:
            if not self.sample_data.get("job_id"):
                self.log("❌ No job ID available", "ERROR")
                return False
            
            response = self.session.get(f"{BASE_URL}/api/jobs/{self.sample_data['job_id']}")
            if response.status_code == 200:
                job = response.json()
                self.log(f"✅ Retrieved job: {job['title']}", "SUCCESS")
                return True
            else:
                self.log(f"❌ Get job by ID failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ Get job by ID error: {str(e)}", "ERROR")
            return False
    
    def test_create_application(self) -> bool:
        """Test job application with PDF file"""
        try:
            # Use the PDF file from frontend/public
            pdf_path = "../frontend/public/AmanPratapSingh_PythonDeveloper_3Years.pdf"
            if not os.path.exists(pdf_path):
                self.log(f"❌ PDF file not found: {pdf_path}", "ERROR")
                return False
            
            if not self.sample_data.get("job_id"):
                self.log("❌ No job ID available", "ERROR")
                return False
            
            # Prepare form data
            data = {
                "jobId": self.sample_data["job_id"],
                "jobTitle": "Senior Python Developer",
                "companyName": "TechCorp Solutions",
                "name": "Aman Pratap Singh",
                "email": "aman@example.com",
                "experience": "3 years",
                "currentCTC": "80000",
                "expectedCTC": "120000",
                "noticePeriod": "30 days",
                "portfolioURL": "https://github.com/amanpratap"
            }
            
            # Prepare files
            files = {
                "file": ("AmanPratapSingh_PythonDeveloper_3Years.pdf", open(pdf_path, "rb"), "application/pdf")
            }
            
            response = self.session.post(f"{BASE_URL}/api/applications", data=data, files=files)
            if response.status_code == 200:
                result = response.json()
                self.sample_data["application_id"] = result["_id"]
                self.log("✅ Job application created successfully", "SUCCESS")
                return True
            else:
                self.log(f"❌ Job application failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ Job application error: {str(e)}", "ERROR")
            return False
    
    def test_get_applications_admin(self) -> bool:
        """Test getting all applications (admin only)"""
        try:
            if not self.admin_token:
                self.log("❌ Admin token required", "ERROR")
                return False
            
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            response = self.session.get(f"{BASE_URL}/admin/applications", headers=headers)
            if response.status_code == 200:
                applications = response.json()
                self.log(f"✅ Retrieved {len(applications)} applications (admin)", "SUCCESS")
                return True
            else:
                self.log(f"❌ Get applications (admin) failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ Get applications (admin) error: {str(e)}", "ERROR")
            return False
    
    def test_get_user_applications(self) -> bool:
        """Test getting user applications"""
        try:
            response = self.session.get(f"{BASE_URL}/api/applications/user/aman@example.com")
            if response.status_code == 200:
                applications = response.json()
                self.log(f"✅ Retrieved {len(applications)} applications for user", "SUCCESS")
                return True
            else:
                self.log(f"❌ Get user applications failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ Get user applications error: {str(e)}", "ERROR")
            return False
    
    def test_get_companies(self) -> bool:
        """Test getting all companies"""
        try:
            response = self.session.get(f"{BASE_URL}/api/company/profile")
            if response.status_code == 200:
                companies = response.json()
                self.log(f"✅ Retrieved {len(companies)} companies", "SUCCESS")
                return True
            else:
                self.log(f"❌ Get companies failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ Get companies error: {str(e)}", "ERROR")
            return False
    
    def test_get_company_by_id(self) -> bool:
        """Test getting a specific company"""
        try:
            if not self.sample_data.get("company_id"):
                self.log("❌ No company ID available", "ERROR")
                return False
            
            response = self.session.get(f"{BASE_URL}/api/company/profile/{self.sample_data['company_id']}")
            if response.status_code == 200:
                company = response.json()
                self.log(f"✅ Retrieved company: {company['companyName']}", "SUCCESS")
                return True
            else:
                self.log(f"❌ Get company by ID failed: {response.status_code}", "ERROR")
                return False
        except Exception as e:
            self.log(f"❌ Get company by ID error: {str(e)}", "ERROR")
            return False
    
    def run_all_tests(self):
        """Run all API tests"""
        self.log("🚀 Starting comprehensive API testing...", "INFO")
        
        tests = [
            ("Health Check", self.test_health_check),
            ("Admin Registration", self.test_admin_registration),
            ("Admin Login", self.test_admin_login),
            ("User Registration", self.test_user_registration),
            ("User Login", self.test_user_login),
            ("Create Company", self.test_create_company),
            ("Create Job", self.test_create_job),
            ("Get All Jobs", self.test_get_jobs),
            ("Get Job by ID", self.test_get_job_by_id),
            ("Create Application", self.test_create_application),
            ("Get Applications (Admin)", self.test_get_applications_admin),
            ("Get User Applications", self.test_get_user_applications),
            ("Get All Companies", self.test_get_companies),
            ("Get Company by ID", self.test_get_company_by_id),
        ]
        
        passed = 0
        total = len(tests)
        
        for test_name, test_func in tests:
            self.log(f"Testing: {test_name}", "INFO")
            if test_func():
                passed += 1
            time.sleep(1)  # Small delay between tests
        
        self.log(f"🎯 Test Results: {passed}/{total} tests passed", "INFO")
        
        if passed == total:
            self.log("🎉 All tests passed! API is working correctly.", "SUCCESS")
        else:
            self.log("⚠️ Some tests failed. Check the logs above.", "WARNING")

if __name__ == "__main__":
    tester = APITester()
    tester.run_all_tests() 