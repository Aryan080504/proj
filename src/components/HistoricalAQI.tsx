import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { format, subDays } from 'date-fns';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HistoricalAQIProps {
  city: string;
}

const HistoricalAQI: React.FC<HistoricalAQIProps> = ({ city }) => {
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateHistoricalData = () => {
      const days = 30;
      const data = [];
      const labels = [];
      
      for (let i = days; i >= 0; i--) {
        const date = subDays(new Date(), i);
        labels.push(format(date, 'MMM dd'));
        
        // Generate realistic AQI data with some variation
        const baseAQI = city === 'beijing' ? 85 : city === 'delhi' ? 120 : 65;
        const variation = Math.random() * 40 - 20;
        data.push(Math.max(0, Math.min(300, baseAQI + variation)));
      }
      
      return { labels, data };
    };

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setHistoricalData(generateHistoricalData());
      setLoading(false);
    }, 1000);
  }, [city]);

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'rgb(34, 197, 94)';
    if (aqi <= 100) return 'rgb(234, 179, 8)';
    if (aqi <= 150) return 'rgb(249, 115, 22)';
    if (aqi <= 200) return 'rgb(239, 68, 68)';
    if (aqi <= 300) return 'rgb(147, 51, 234)';
    return 'rgb(127, 29, 29)';
  };

  const chartData = historicalData ? {
    labels: historicalData.labels,
    datasets: [
      {
        label: 'AQI',
        data: historicalData.data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: historicalData.data.map((aqi: number) => getAQIColor(aqi)),
        pointBorderColor: 'white',
        pointBorderWidth: 2
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const aqi = context.parsed.y;
            let status = '';
            if (aqi <= 50) status = 'Good';
            else if (aqi <= 100) status = 'Moderate';
            else if (aqi <= 150) status = 'Unhealthy for Sensitive';
            else if (aqi <= 200) status = 'Unhealthy';
            else if (aqi <= 300) status = 'Very Unhealthy';
            else status = 'Hazardous';
            
            return `AQI: ${aqi} (${status})`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgb(107, 114, 128)'
        }
      },
      y: {
        beginAtZero: true,
        max: 300,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)'
        },
        ticks: {
          color: 'rgb(107, 114, 128)'
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentAQI = historicalData?.data[historicalData.data.length - 1] || 0;
  const previousAQI = historicalData?.data[historicalData.data.length - 2] || 0;
  const trend = currentAQI - previousAQI;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-600">30-Day Trend</span>
        </div>
        <div className="flex items-center space-x-2">
          {trend > 0 ? (
            <TrendingUp className="w-4 h-4 text-red-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-green-500" />
          )}
          <span className={`text-sm font-medium ${trend > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {Math.abs(trend).toFixed(1)} AQI
          </span>
        </div>
      </div>
      
      <div className="h-64">
        {chartData && <Line data={chartData} options={chartOptions} />}
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Average</p>
          <p className="text-lg font-semibold text-gray-800">
            {historicalData?.data.reduce((a: number, b: number) => a + b, 0) / historicalData?.data.length || 0}
          </p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Best Day</p>
          <p className="text-lg font-semibold text-green-600">
            {Math.min(...(historicalData?.data || [0]))}
          </p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Worst Day</p>
          <p className="text-lg font-semibold text-red-600">
            {Math.max(...(historicalData?.data || [0]))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoricalAQI;