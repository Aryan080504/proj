import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const cities = [
  { value: 'beijing', label: 'Beijing', country: 'China' },
  { value: 'shanghai', label: 'Shanghai', country: 'China' },
  { value: 'delhi', label: 'Delhi', country: 'India' },
  { value: 'mumbai', label: 'Mumbai', country: 'India' },
  { value: 'los-angeles', label: 'Los Angeles', country: 'USA' },
  { value: 'new-york', label: 'New York', country: 'USA' },
  { value: 'london', label: 'London', country: 'UK' },
  { value: 'paris', label: 'Paris', country: 'France' },
  { value: 'tokyo', label: 'Tokyo', country: 'Japan' },
  { value: 'seoul', label: 'Seoul', country: 'South Korea' }
];

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  const selectedCityData = cities.find(city => city.value === selectedCity);

  return (
    <div className="relative">
      <select
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        className="appearance-none bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-8 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:bg-white/90 transition-all duration-200"
      >
        {cities.map(city => (
          <option key={city.value} value={city.value}>
            {city.label}, {city.country}
          </option>
        ))}
      </select>
      
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600" />
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
    </div>
  );
};

export default CitySelector;