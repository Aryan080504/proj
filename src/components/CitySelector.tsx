import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const metroCities = [
  { value: 'delhi', label: 'Delhi', country: 'India' },
  { value: 'mumbai', label: 'Mumbai', country: 'India' },
  { value: 'kolkata', label: 'Kolkata', country: 'India' },
  { value: 'chennai', label: 'Chennai', country: 'India' }
];

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  const selectedCityData = metroCities.find(city => city.value === selectedCity);

  return (
    <div className="relative">
      <select
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        className="appearance-none bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-8 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:bg-white/90 transition-all duration-200"
      >
        {metroCities.map(city => (
          <option key={city.value} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>
      
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600" />
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
    </div>
  );
};

export default CitySelector;