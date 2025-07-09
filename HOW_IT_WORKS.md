# Urban AQI Dashboard - How It Works

## Overview
The Urban AQI Dashboard is an advanced air quality monitoring system that combines real-time data with machine learning predictions to provide comprehensive air quality intelligence.

## System Architecture

### 1. Frontend Components
- **Dashboard**: Main interface displaying all AQI metrics and visualizations
- **LiveAQI**: Shows real-time air quality data from external APIs
- **ForecastAQI**: Displays ML-powered predictions for the next 7 days
- **HistoricalAQI**: Visualizes past 30 days of AQI trends
- **AQIComparison**: Compares live vs predicted data with accuracy metrics

### 2. Data Sources
- **Live Data**: Real-time AQI from World Air Quality Index API (waqi.info)
- **Historical Data**: `city_day.csv` containing historical air quality measurements
- **ML Models**: Pre-trained XGBoost models (`aqi_model_2025.joblib`, `aqi_imputer_2025.joblib`)

### 3. Machine Learning Pipeline

#### Data Processing
1. **Data Loading**: Historical city data is loaded from CSV files
2. **Feature Engineering**: Weather patterns, seasonal trends, and pollutant correlations
3. **Data Imputation**: Missing values handled using trained imputer models
4. **Normalization**: Features scaled for optimal model performance

#### Model Architecture
- **Algorithm**: XGBoost Regressor with ensemble learning
- **Features**: PM2.5, PM10, NO2, O3, meteorological data, temporal features
- **Training**: Models trained on 2+ years of historical data
- **Validation**: Cross-validation with temporal splits to prevent data leakage

#### Prediction Process
1. **City Selection**: User selects target city from dropdown
2. **Feature Extraction**: Current conditions and historical patterns analyzed
3. **Model Inference**: Pyodide runs Python ML models in the browser
4. **Post-processing**: Results formatted and confidence scores calculated

### 4. Technology Stack

#### Frontend
- **React + TypeScript**: Component-based UI with type safety
- **Tailwind CSS**: Utility-first styling with responsive design
- **Chart.js**: Interactive data visualizations
- **Lucide React**: Modern icon library

#### Backend Processing
- **Pyodide**: Python runtime in the browser for ML inference
- **scikit-learn**: Machine learning library for model operations
- **pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing for array operations

#### Build & Development
- **Vite**: Fast build tool with hot module replacement
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing and optimization

### 5. Data Flow

```
1. User selects city → 2. Fetch live AQI data → 3. Load historical data
                                ↓
6. Display results ← 5. Format predictions ← 4. Run ML predictions
```

### 6. Key Features

#### Real-time Monitoring
- Live AQI values updated every 10 minutes
- Multiple pollutant tracking (PM2.5, PM10, O3, NO2)
- Health recommendations based on current conditions

#### Predictive Analytics
- 7-day AQI forecasts with confidence intervals
- Seasonal pattern recognition
- Trend analysis and anomaly detection

#### Performance Metrics
- Model accuracy tracking (typically 70-80%)
- Prediction vs reality comparison
- Statistical validation metrics

#### User Experience
- Responsive design for all devices
- Interactive charts and visualizations
- City-specific customization
- Real-time data refresh capabilities

### 7. Model Performance

#### Accuracy Metrics
- **R² Score**: 0.70-0.80 (coefficient of determination)
- **MAE**: 20-30 AQI points (mean absolute error)
- **RMSE**: 25-35 AQI points (root mean square error)
- **Confidence**: 70-80% prediction reliability

#### Validation Strategy
- **Temporal Validation**: Models tested on future unseen data
- **Cross-City Validation**: Performance verified across different cities
- **Seasonal Testing**: Accuracy maintained across weather patterns

### 8. Data Privacy & Security
- **Client-side Processing**: ML inference runs locally in browser
- **No Data Storage**: Personal data not stored on servers
- **API Security**: External API calls use secure tokens
- **CORS Protection**: Cross-origin requests properly configured

### 9. Limitations & Considerations
- **Internet Dependency**: Requires connection for live data updates
- **Browser Performance**: ML processing may be slower on older devices
- **Data Quality**: Predictions depend on historical data availability
- **Regional Variations**: Model accuracy varies by geographic location

### 10. Future Enhancements
- **Real-time Model Updates**: Continuous learning from new data
- **Weather Integration**: Enhanced meteorological feature engineering
- **Mobile App**: Native mobile application development
- **Alert System**: Push notifications for air quality warnings

## Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Stable internet connection for live data
- Minimum 4GB RAM for optimal ML performance

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open browser to `http://localhost:5173`

### Usage
1. Select your city from the dropdown menu
2. View real-time AQI data and health recommendations
3. Analyze historical trends and future predictions
4. Compare model accuracy with live measurements
5. Use refresh button to update all data sources

## Technical Support
For technical issues or questions about the system architecture, please refer to the component documentation or contact the development team.