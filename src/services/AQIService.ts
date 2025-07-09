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
    const stateMultipliers: { [key: string]: number } = {
      'delhi': 1.8,
      'uttar-pradesh': 1.6,
      'bihar': 1.7,
      'haryana': 1.5,
      'punjab': 1.4,
      'rajasthan': 1.3,
      'madhya-pradesh': 1.2,
      'maharashtra': 1.1,
      'gujarat': 1.0,
      'west-bengal': 1.3,
      'jharkhand': 1.4,
      'chhattisgarh': 1.2,
      'odisha': 1.1,
      'andhra-pradesh': 1.0,
      'telangana': 1.1,
      'karnataka': 0.9,
      'tamil-nadu': 1.0,
      'kerala': 0.8,
      'goa': 0.7,
      'assam': 1.0,
      'arunachal-pradesh': 0.6,
      'nagaland': 0.7,
      'manipur': 0.8,
      'mizoram': 0.7,
      'tripura': 0.9,
      'meghalaya': 0.8,
      'sikkim': 0.6,
      'himachal-pradesh': 0.7,
      'uttarakhand': 0.8,
      'jammu-kashmir': 0.9,
      'ladakh': 0.5,
      'chandigarh': 1.2,
      'puducherry': 0.9,
      'andaman-nicobar': 0.5,
      'lakshadweep': 0.4,
      'dadra-nagar-haveli': 0.8
    };

    const multiplier = stateMultipliers[city] || 1.0;
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