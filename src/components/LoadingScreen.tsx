import React from 'react';
import { Cloud, Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping">
            <div className="w-20 h-20 bg-blue-500 rounded-full opacity-20"></div>
          </div>
          <div className="relative bg-white p-4 rounded-full shadow-xl">
            <Cloud className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Initializing AQI Models
        </h2>
        <p className="text-gray-600 mb-6">
          Loading machine learning models and preparing predictions...
        </p>
        
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-blue-600 font-medium">Loading Pyodide & Models</span>
        </div>
        
        <div className="mt-6 w-64 bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;