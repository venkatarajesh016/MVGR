import React from 'react';

function DebugPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ✅ React is Working!
        </h1>
        <p className="text-gray-600 mb-4">
          If you can see this page, React and Vite are working correctly.
        </p>
        <div className="bg-green-100 border border-green-400 rounded p-4">
          <p className="text-green-800 font-semibold">System Status:</p>
          <ul className="mt-2 space-y-1 text-sm text-green-700">
            <li>✓ React loaded</li>
            <li>✓ Vite dev server running</li>
            <li>✓ Tailwind CSS working</li>
            <li>✓ Component rendering</li>
          </ul>
        </div>
        <button
          onClick={() => window.location.href = '/auth'}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Go to Auth Page
        </button>
      </div>
    </div>
  );
}

export default DebugPage;
