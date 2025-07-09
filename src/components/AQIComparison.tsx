import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface AQIComparisonProps {
  liveAQI: any;
  forecastData: any;
  city: string;
}

const AQIComparison: React.FC<AQIComparisonProps> = ({ liveAQI, forecastData, city }) => {
  const liveValue = liveAQI?.aqi || 0;
  const forecastValue = forecastData?.averageAQI || 0;
  const difference = liveValue - forecastValue;
  const accuracy = Math.max(0, 100 - Math.abs(difference) * 2);

  const getDifferenceColor = (diff: number) => {
    if (Math.abs(diff) <= 10) return 'text-green-600';
    if (Math.abs(diff) <= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyColor = (acc: number) => {
    if (acc >= 90) return 'text-green-600';
    if (acc >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Comparison Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-800">Live AQI</span>
          </div>
          <p className="text-3xl font-bold text-blue-900">{liveValue}</p>
          <p className="text-sm text-blue-700">Real-time data</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-800">Predicted</span>
          </div>
          <p className="text-3xl font-bold text-green-900">{forecastValue}</p>
          <p className="text-sm text-green-700">ML forecast</p>
        </div>
      </div>

      {/* Accuracy Metrics */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-4">Model Performance</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              {Math.abs(difference) <= 15 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              )}
              <span className="text-sm font-medium text-gray-600">Difference</span>
            </div>
            <p className={`text-2xl font-bold ${getDifferenceColor(difference)}`}>
              {difference > 0 ? '+' : ''}{difference.toFixed(1)}
            </p>
            <p className="text-xs text-gray-500">AQI points</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              {difference > 0 ? (
                <TrendingUp className="w-5 h-5 text-red-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-green-500" />
              )}
              <span className="text-sm font-medium text-gray-600">Accuracy</span>
            </div>
            <p className={`text-2xl font-bold ${getAccuracyColor(accuracy)}`}>
              {accuracy.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500">Prediction accuracy</p>
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Analysis</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${accuracy >= 90 ? 'bg-green-500' : accuracy >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {accuracy >= 90 
                ? "Excellent prediction accuracy"
                : accuracy >= 75 
                ? "Good prediction with minor variance"
                : "Significant deviation from prediction"
              }
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${Math.abs(difference) <= 15 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-sm text-gray-600">
              {Math.abs(difference) <= 15
                ? "Model predictions are well-calibrated"
                : "Consider model retraining with recent data"
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQIComparison;