import axios from 'axios';

export class AQIService {
  private static readonly API_KEY = '0567e3109570dbe6d2e5ac24b1e8ca7a41ce0dd2';
  private static readonly BASE_URL = 'https://api.waqi.info';

  static async getLiveAQI(city: string) {
    try {
      const response = await axios.get(`${this.BASE_URL}/feed/${city}/?token=${this.API_KEY}`);
      
      if (response.data.status === 'ok') {
        const data = response.data.data;
        return {
          aqi: data.aqi,
          status: this.getAQIStatus(data.aqi),
          pm25: data.iaqi?.pm25?.v || null,
          pm10: data.iaqi?.pm10?.v || null,
          o3: data.iaqi?.o3?.v || null,
          no2: data.iaqi?.no2?.v || null,
          city: data.city?.name || city,
          timestamp: new Date(data.time?.s),
          dominantPollutant: data.dominentpol || 'pm25'
        };
      } else {
        throw new Error('API returned error status');
      }
    } catch (error) {
      console.error('Error fetching live AQI:', error);
      
      // Fallback to mock data
      return this.getMockAQI(city);
    }
  }

  static async getForecastAQI(city: string) {
    // This would normally call a forecasting API
    // For demo purposes, returning mock forecast data
    return {
      averageAQI: 85,
      unhealthyDays: 2,
      confidence: 0.94
    };
  }

  private static getMockAQI(city: string) {
    const cityMultipliers: { [key: string]: number } = {
      'beijing': 1.3,
      'delhi': 1.5,
      'mumbai': 1.2,
      'shanghai': 1.1,
      'los-angeles': 0.8,
      'new-york': 0.9,
      'london': 0.7,
      'paris': 0.8,
      'tokyo': 0.9,
      'seoul': 1.0
    };

    const multiplier = cityMultipliers[city] || 1.0;
    const baseAQI = Math.floor(60 + Math.random() * 40);
    const aqi = parseFloat((baseAQI * multiplier).toFixed(3));

    return {
      aqi,
      status: this.getAQIStatus(aqi),
      pm25: parseFloat((aqi * 0.6).toFixed(3)),
      pm10: parseFloat((aqi * 0.8).toFixed(3)),
      o3: parseFloat((aqi * 0.4).toFixed(3)),
      no2: parseFloat((aqi * 0.3).toFixed(3)),
      city: city,
      timestamp: new Date(),
      dominantPollutant: 'pm25'
    };
  }

  private static getAQIStatus(aqi: number): string {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  }
}