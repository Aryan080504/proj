export class PyodideService {
  private static isInitialized = false;

  static async initialize() {
    if (this.isInitialized) return;

    try {
      // Simulate initialization delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize service:', error);
      throw error;
    }
  }

  static async predictAQI(city: string) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Generate random forecast between 80-100 as requested
      const predictedAQI = parseFloat((80 + Math.random() * 20).toFixed(3));
      
      // Generate forecast for next 7 days (all random between 80-100)
      const forecast = [];
      for (let i = 0; i < 7; i++) {
        forecast.push(parseFloat((80 + Math.random() * 20).toFixed(3)));
      }
      
      // Calculate unhealthy days (AQI > 100, should be 0 since we're generating 80-100)
      const unhealthyDays = forecast.filter(aqi => aqi > 100).length;
      
      // Random confidence between 70-80%
      const confidence = parseFloat((0.70 + Math.random() * 0.10).toFixed(3));
      
      return {
        averageAQI: predictedAQI,
        confidence: confidence,
        unhealthyDays: unhealthyDays,
        forecast: forecast,
        cityStats: {
          avgPM25: parseFloat((predictedAQI * 0.5).toFixed(3)),
          avgPM10: parseFloat((predictedAQI * 0.7).toFixed(3)),
          avgNO2: parseFloat((predictedAQI * 0.3).toFixed(3)),
          avgO3: parseFloat((predictedAQI * 0.4).toFixed(3)),
          historicalAvg: predictedAQI,
          stdDev: parseFloat((15 + Math.random() * 10).toFixed(3))
        }
      };
    } catch (error) {
      console.error('Prediction error:', error);
      // Fallback to mock data
      return {
        averageAQI: 85.000,
        confidence: 0.750,
        unhealthyDays: 0,
        forecast: [82.500, 87.250, 91.000, 88.750, 85.500, 83.250, 86.000],
        cityStats: {
          avgPM25: 42.500,
          avgPM10: 59.500,
          avgNO2: 25.500,
          avgO3: 34.000,
          historicalAvg: 85.000,
          stdDev: 20.000
        }
      };
    }
  }
}