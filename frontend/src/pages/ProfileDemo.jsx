import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import ProfileSidebar from '../components/ProfileSidebar';

function ProfileDemo() {
  const [showSidebar, setShowSidebar] = useState(false);

  // Sample user data
  const userData = {
    name: 'Rajesh Kumar',
    studentId: 'CS21B1001',
    college: 'MVGR College of Engineering',
    year: '3rd Year, Computer Science',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@mvgr.ac.in',
    avatar: null
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Demo Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setShowSidebar(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Profile Sidebar Demo</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Profile Sidebar Component
          </h2>
          <p className="text-gray-600 mb-6">
            Click the hamburger menu icon in the top-left corner to open the profile sidebar.
          </p>

          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <h3 className="font-bold text-blue-900 mb-2">Features:</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-1">
                <li>Smooth slide-in animation from left</li>
                <li>Backdrop overlay with click-to-close</li>
                <li>Profile card with user information</li>
                <li>Navigation menu items</li>
                <li>Logout option</li>
                <li>Responsive design (280-320px width)</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
              <h3 className="font-bold text-green-900 mb-2">Technologies:</h3>
              <ul className="list-disc list-inside text-green-800 space-y-1">
                <li>React with hooks (useState)</li>
                <li>Tailwind CSS for styling</li>
                <li>Framer Motion for animations</li>
                <li>Lucide React for icons</li>
              </ul>
            </div>

            <button
              onClick={() => setShowSidebar(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              Open Profile Sidebar
            </button>
          </div>
        </div>

        {/* User Data Display */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Current User Data</h3>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            <pre className="text-gray-700">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            This data is displayed in the profile sidebar. You can replace it with actual user data from your authentication system.
          </p>
        </div>
      </div>

      {/* Profile Sidebar */}
      <ProfileSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        user={userData}
      />
    </div>
  );
}

export default ProfileDemo;
