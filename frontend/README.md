# 🎨 Job Board Frontend

A modern, responsive React frontend for the Job Board Application with beautiful UI and excellent user experience.

## ✨ Features

### 🎯 User Interface
- **Modern Design** - Clean, professional UI with Tailwind CSS
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode** - Toggle between themes (coming soon)
- **Smooth Animations** - Engaging micro-interactions and transitions

### 🔐 Authentication
- **User Registration** - Easy sign-up process
- **Secure Login** - JWT-based authentication
- **Role-Based Access** - Different interfaces for admin and regular users
- **Protected Routes** - Secure access to user-specific features

### 💼 Job Management
- **Job Browsing** - Browse all available jobs with search and filters
- **Job Details** - Comprehensive job information and application form
- **Advanced Search** - Filter by location, salary, and job status
- **Job Applications** - Easy application process with resume upload

### 👥 User Dashboard
- **Personal Dashboard** - Overview of user's applications and profile
- **Application Tracking** - Monitor application status and updates
- **Profile Management** - Update personal information and preferences

### 🔧 Admin Panel
- **Job Management** - Create, edit, and delete job postings
- **Application Review** - View and manage all job applications
- **User Management** - Monitor user activity and applications
- **Analytics Dashboard** - Insights and statistics

## 🛠 Tech Stack

### Frontend Framework
- **React 18** - Modern React with hooks and functional components
- **React Router 6** - Client-side routing and navigation
- **React Query** - Server state management and caching
- **React Hook Form** - Form handling and validation

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **React Hot Toast** - Elegant toast notifications
- **Custom Components** - Reusable UI components

### Development Tools
- **Create React App** - Zero-configuration build tool
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefixing

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html              # Main HTML template
│   ├── manifest.json           # PWA manifest
│   └── favicon.ico            # App icon
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Layout.js          # Main layout with navigation
│   │   ├── ProtectedRoute.js  # Route protection for auth
│   │   └── AdminRoute.js      # Route protection for admin
│   ├── pages/                 # Page components
│   │   ├── Home.js            # Landing page
│   │   ├── Jobs.js            # Job listings
│   │   ├── JobDetail.js       # Individual job view
│   │   ├── Login.js           # Login page
│   │   ├── Register.js        # Registration page
│   │   ├── Dashboard.js       # User dashboard
│   │   ├── AdminDashboard.js  # Admin panel
│   │   └── Applications.js    # Application management
│   ├── contexts/              # React contexts
│   │   └── AuthContext.js     # Authentication state
│   ├── services/              # API services
│   │   └── api.js             # API client and endpoints
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Utility functions
│   ├── App.js                 # Main app component
│   ├── index.js               # App entry point
│   └── index.css              # Global styles
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Backend API running on http://localhost:8000

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to http://localhost:3000

### Build for Production

```bash
npm run build
```

The build files will be created in the `build/` directory.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENVIRONMENT=development
```

### API Configuration

The frontend is configured to communicate with the backend API. Make sure:

1. **Backend is running** on http://localhost:8000
2. **CORS is enabled** on the backend
3. **API endpoints** are accessible

## 🎨 Customization

### Styling

The app uses Tailwind CSS with a custom color scheme:

```javascript
// tailwind.config.js
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    // ... more shades
  }
}
```

### Components

All components are built with reusability in mind. Key components:

- **Layout** - Main navigation and structure
- **ProtectedRoute** - Authentication guard
- **AdminRoute** - Admin-only access guard

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔐 Authentication Flow

1. **Registration** - User creates account
2. **Login** - User authenticates with email/password
3. **Token Storage** - JWT token stored in localStorage
4. **Protected Routes** - Routes check authentication status
5. **Auto Logout** - Token expiration handling

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📦 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🚀 Deployment

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow React best practices
- Use functional components with hooks
- Maintain consistent code style
- Add proper TypeScript types (if using TS)
- Write meaningful commit messages

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**
   - Check if backend is running
   - Verify API URL in environment variables
   - Check CORS configuration

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check for dependency conflicts
   - Verify Node.js version

3. **Authentication Issues**
   - Clear localStorage
   - Check token expiration
   - Verify API endpoints

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://react-query.tanstack.com/)
- [React Router](https://reactrouter.com/)

---

**Built with ❤️ using React and modern web technologies** 