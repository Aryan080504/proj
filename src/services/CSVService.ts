export class CSVService {
  static async loadForecastedAQI(): Promise<{ [key: string]: number }> {
    try {
      const response = await fetch('/forecasted_aqi.csv');
      const csvText = await response.text();
      
      const lines = csvText.trim().split('\n');
      const data: { [key: string]: number } = {};
      
      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        const [city, aqi] = lines[i].split(',');
        if (city && aqi) {
          data[city.toLowerCase().trim()] = parseFloat(aqi.trim());
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error loading forecasted AQI data:', error);
      // Fallback data
      return {
        'delhi': 122.32,
        'mumbai': 50.2,
        'chennai': 114.04,
        'kolkata': 41.0
      };
    }
  }

  static async loadHistoricalAQI(city: string): Promise<{ labels: string[], data: number[] }> {
    try {
      const response = await fetch('/city_day.csv');
      const csvText = await response.text();
      
      const lines = csvText.trim().split('\n');
      const headers = lines[0].split(',');
      
      // Find relevant column indices
      const cityIndex = headers.findIndex(h => h.toLowerCase().includes('city'));
      const dateIndex = headers.findIndex(h => h.toLowerCase().includes('date'));
      const aqiIndex = headers.findIndex(h => h.toLowerCase().includes('aqi'));
      
      const cityData: { date: string, aqi: number }[] = [];
      
      // Process data rows
      for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(',');
        const rowCity = columns[cityIndex]?.toLowerCase().trim();
        const date = columns[dateIndex]?.trim();
        const aqi = parseFloat(columns[aqiIndex]?.trim());
        
        if (rowCity === city.toLowerCase() && date && !isNaN(aqi)) {
          cityData.push({ date, aqi });
        }
      }
      
      // Sort by date and take last 30 entries
      cityData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const last30Days = cityData.slice(-30);
      
      const labels = last30Days.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });
      
      const data = last30Days.map(item => item.aqi);
      
      return { labels, data };
    } catch (error) {
      console.error('Error loading historical AQI data:', error);
      
      // Fallback to generated data
      return this.generateFallbackHistoricalData(city);
    }
  }

  private static generateFallbackHistoricalData(city: string): { labels: string[], data: number[] } {
    const days = 30;
    const data = [];
    const labels = [];
    
    const cityMultipliers: { [key: string]: number } = {
      'delhi': 1.8,
      'mumbai': 1.2,
      'kolkata': 1.4,
      'chennai': 1.0
    };
    
    const multiplier = cityMultipliers[city] || 1.0;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      const baseAQI = 60 + Math.random() * 40;
      const variation = Math.random() * 40 - 20;
      data.push(Math.max(0, Math.min(300, (baseAQI + variation) * multiplier)));
    }
    
    return { labels, data };
  }
}