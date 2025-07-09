import React, { useState, useEffect } from 'react';
import { Cloud, TrendingUp, MapPin, RefreshCw, Zap, Eye, BarChart3 } from 'lucide-react';
import HistoricalAQI from './HistoricalAQI';
import ForecastAQI from './ForecastAQI';
import LiveAQI from './LiveAQI';
import AQIComparison from './AQIComparison';
import CitySelector from './CitySelector';
import { AQIService } from '../services/AQIService';

const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('beijing');
  const [liveAQI, setLiveAQI] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      const [live, forecast] = await Promise.all([
        AQIService.getLiveAQI(selectedCity),
        AQIService.getForecastAQI(selectedCity)
      ]);
      setLiveAQI(live);
      setForecastData(forecast);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Urban AQI Dashboard
                </h1>
                <p className="text-sm text-gray-600">Real-time Air Quality Intelligence</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <CitySelector 
                selectedCity={selectedCity} 
                onCityChange={setSelectedCity} 
              />
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current AQI</p>
                <p className="text-3xl font-bold text-gray-900">
                  {liveAQI?.aqi ? liveAQI.aqi.toFixed(3) : '--'}
                </p>
                <p className="text-sm text-gray-500">
                  {liveAQI?.status || 'Loading...'}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Forecast AQI</p>
                <p className="text-3xl font-bold text-gray-900">
                  {forecastData?.averageAQI ? forecastData.averageAQI.toFixed(3) : '--'}
                </p>
                <p className="text-sm text-gray-500">
                  Next 7 days avg
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Model Accuracy</p>
                <p className="text-3xl font-bold text-gray-900">75.000%</p>
                <p className="text-sm text-gray-500">
                  Average Model Accuracy
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Historical AQI Trends</span>
            </h3>
            <HistoricalAQI city={selectedCity} />
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>AQI Forecast</span>
            </h3>
            <ForecastAQI city={selectedCity} onForecastUpdate={setForecastData} />
          </div>
        </div>

        {/* Live Data and Comparison */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-red-600" />
              <span>Live AQI Data</span>
            </h3>
            <LiveAQI city={selectedCity} onDataUpdate={setLiveAQI} />
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span>Prediction vs Reality</span>
            </h3>
            <AQIComparison 
              liveAQI={liveAQI} 
              forecastData={forecastData} 
              city={selectedCity} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;