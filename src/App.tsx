import React, { useState, useEffect } from 'react';
import { Cloud, TrendingUp, MapPin, RefreshCw, AlertCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import LoadingScreen from './components/LoadingScreen';
import { PyodideService } from './services/PyodideService';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        await PyodideService.initialize();
        setIsLoading(false);
      } catch (err) {
        setError('Failed to initialize AQI prediction models');
        setIsLoading(false);
        console.error('App initialization error:', err);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Initialization Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}

export default App;