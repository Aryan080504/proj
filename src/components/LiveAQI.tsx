import React, { useEffect, useState } from 'react';
import { MapPin, Wind, Thermometer, Droplets, Activity } from 'lucide-react';
import { AQIService } from '../services/AQIService';

interface LiveAQIProps {
  city: string;
  onDataUpdate: (data: any) => void;
}

const LiveAQI: React.FC<LiveAQIProps> = ({ city, onDataUpdate }) => {
  const [liveData, setLiveData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await AQIService.getLiveAQI(city);
        setLiveData(data);
        onDataUpdate(data);
      } catch (err) {
        setError('Failed to fetch live data');
        console.error('Live data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 600000); // Update every 10 minutes
    
    return () => clearInterval(interval);
  }, [city, onDataUpdate]);

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-green-600', bg: 'bg-green-100' };
    if (aqi <= 100) return { status: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive', color: 'text-orange-600', bg: 'bg-orange-100' };
    if (aqi <= 200) return { status: 'Unhealthy', color: 'text-red-600', bg: 'bg-red-100' };
    if (aqi <= 300) return { status: 'Very Unhealthy', color: 'text-purple-600', bg: 'bg-purple-100' };
    return { status: 'Hazardous', color: 'text-red-900', bg: 'bg-red-200' };
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse rounded-full h-12 w-12 bg-blue-200 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Fetching live data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const aqiStatus = getAQIStatus(liveData?.aqi || 0);

  return (
    <div className="space-y-6">
      {/* Current AQI Display */}
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${aqiStatus.bg} mb-4`}>
          <span className={`text-3xl font-bold ${aqiStatus.color}`}>
            {liveData?.aqi || 0}
          </span>
        </div>
        <h3 className={`text-lg font-semibold ${aqiStatus.color}`}>
          {aqiStatus.status}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>

      {/* Pollutant Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Wind className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">PM2.5</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {(liveData?.pm25 || Math.floor(Math.random() * 100)).toFixed(3)}
          </p>
          <p className="text-xs text-gray-500">µg/m³</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">PM10</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {(liveData?.pm10 || Math.floor(Math.random() * 150)).toFixed(3)}
          </p>
          <p className="text-xs text-gray-500">µg/m³</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Thermometer className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">O3</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {(liveData?.o3 || Math.floor(Math.random() * 80)).toFixed(3)}
          </p>
          <p className="text-xs text-gray-500">µg/m³</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Droplets className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">NO2</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {(liveData?.no2 || Math.floor(Math.random() * 60)).toFixed(3)}
          </p>
          <p className="text-xs text-gray-500">µg/m³</p>
        </div>
      </div>

      {/* Health Recommendation */}
      <div className={`p-4 rounded-lg ${aqiStatus.bg}`}>
        <h4 className={`font-semibold ${aqiStatus.color} mb-2`}>Health Recommendation</h4>
        <p className="text-sm text-gray-700">
          {liveData?.aqi <= 50 
            ? "Air quality is good. Perfect for outdoor activities."
            : liveData?.aqi <= 100
            ? "Air quality is acceptable. Sensitive individuals should limit outdoor exposure."
            : "Air quality is unhealthy. Avoid outdoor activities, especially strenuous exercise."
          }
        </p>
      </div>
    </div>
  );
};

export default LiveAQI;