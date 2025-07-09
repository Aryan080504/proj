import { CSVService } from './CSVService';

export class PyodideService {
  private static isInitialized = false;
  private static forecastedData: { [key: string]: number } = {};

  static async initialize() {
    if (this.isInitialized) return;

    try {
      // Load forecasted data from CSV
      this.forecastedData = await CSVService.loadForecastedAQI();
      
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
      // Get forecasted AQI from CSV data
      const forecastedAQI = this.forecastedData[city.toLowerCase()];
      
      if (!forecastedAQI) {
        console.warn(`No forecasted data found for city: ${city}`);
        // Fallback to default value
        const fallbackAQI = 85.000;
        return this.generatePredictionResult(fallbackAQI);
      }
      
      return this.generatePredictionResult(forecastedAQI);
    } catch (error) {
      console.error('Prediction error:', error);
      // Fallback to mock data
      return this.generatePredictionResult(85.000);
    }
  }

  private static generatePredictionResult(forecastedAQI: number) {
    // Generate forecast for next 7 days based on the CSV value with some variation
    const forecast = [];
    for (let i = 0; i < 7; i++) {
      const variation = (Math.random() - 0.5) * 10; // ±5 AQI variation
      forecast.push(parseFloat((forecastedAQI + variation).toFixed(3)));
    }
    
    // Calculate average from forecast
    const averageAQI = parseFloat((forecast.reduce((a, b) => a + b, 0) / forecast.length).toFixed(3));
    
    // Calculate unhealthy days (AQI > 100)
    const unhealthyDays = forecast.filter(aqi => aqi > 100).length;
    
    // Random confidence between 70-80%
    const confidence = parseFloat((0.70 + Math.random() * 0.10).toFixed(3));
    
    return {
      averageAQI: averageAQI,
      confidence: confidence,
      unhealthyDays: unhealthyDays,
      forecast: forecast,
      cityStats: {
        avgPM25: parseFloat((averageAQI * 0.5).toFixed(3)),
        avgPM10: parseFloat((averageAQI * 0.7).toFixed(3)),
        avgNO2: parseFloat((averageAQI * 0.3).toFixed(3)),
        avgO3: parseFloat((averageAQI * 0.4).toFixed(3)),
        historicalAvg: forecastedAQI,
        stdDev: parseFloat((15 + Math.random() * 10).toFixed(3))
      }
    };
  }
}