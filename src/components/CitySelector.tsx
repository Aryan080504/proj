import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const indianStates = [
  { value: 'andhra-pradesh', label: 'Andhra Pradesh', country: 'India' },
  { value: 'arunachal-pradesh', label: 'Arunachal Pradesh', country: 'India' },
  { value: 'assam', label: 'Assam', country: 'India' },
  { value: 'bihar', label: 'Bihar', country: 'India' },
  { value: 'chhattisgarh', label: 'Chhattisgarh', country: 'India' },
  { value: 'goa', label: 'Goa', country: 'India' },
  { value: 'gujarat', label: 'Gujarat', country: 'India' },
  { value: 'haryana', label: 'Haryana', country: 'India' },
  { value: 'himachal-pradesh', label: 'Himachal Pradesh', country: 'India' },
  { value: 'jharkhand', label: 'Jharkhand', country: 'India' },
  { value: 'karnataka', label: 'Karnataka', country: 'India' },
  { value: 'kerala', label: 'Kerala', country: 'India' },
  { value: 'madhya-pradesh', label: 'Madhya Pradesh', country: 'India' },
  { value: 'maharashtra', label: 'Maharashtra', country: 'India' },
  { value: 'manipur', label: 'Manipur', country: 'India' },
  { value: 'meghalaya', label: 'Meghalaya', country: 'India' },
  { value: 'mizoram', label: 'Mizoram', country: 'India' },
  { value: 'nagaland', label: 'Nagaland', country: 'India' },
  { value: 'odisha', label: 'Odisha', country: 'India' },
  { value: 'punjab', label: 'Punjab', country: 'India' },
  { value: 'rajasthan', label: 'Rajasthan', country: 'India' },
  { value: 'sikkim', label: 'Sikkim', country: 'India' },
  { value: 'tamil-nadu', label: 'Tamil Nadu', country: 'India' },
  { value: 'telangana', label: 'Telangana', country: 'India' },
  { value: 'tripura', label: 'Tripura', country: 'India' },
  { value: 'uttar-pradesh', label: 'Uttar Pradesh', country: 'India' },
  { value: 'uttarakhand', label: 'Uttarakhand', country: 'India' },
  { value: 'west-bengal', label: 'West Bengal', country: 'India' },
  // Union Territories
  { value: 'delhi', label: 'Delhi (NCT)', country: 'India' },
  { value: 'chandigarh', label: 'Chandigarh', country: 'India' },
  { value: 'puducherry', label: 'Puducherry', country: 'India' },
  { value: 'jammu-kashmir', label: 'Jammu & Kashmir', country: 'India' },
  { value: 'ladakh', label: 'Ladakh', country: 'India' },
  { value: 'andaman-nicobar', label: 'Andaman & Nicobar Islands', country: 'India' },
  { value: 'lakshadweep', label: 'Lakshadweep', country: 'India' },
  { value: 'dadra-nagar-haveli', label: 'Dadra & Nagar Haveli', country: 'India' }
];

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  const selectedStateData = indianStates.find(state => state.value === selectedCity);

  return (
    <div className="relative">
      <select
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        className="appearance-none bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-8 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:bg-white/90 transition-all duration-200"
      >
        {indianStates.map(state => (
          <option key={state.value} value={state.value}>
            {state.label}
          </option>
        ))}
      </select>
      
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600" />
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
    </div>
  );
};

export default CitySelector;