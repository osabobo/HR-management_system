# ML Prediction Backend

A Python Flask backend with a trained Random Forest machine learning model for HR performance predictions.

## Setup Instructions

### 1. Install Python Requirements

```bash
cd backend
pip install -r requirements.txt
```

### 2. Train the Model

Before starting the Flask server, train and save the ML model:

```bash
python train_model.py
```

This will:
- Generate synthetic training data (500 samples)
- Train a Random Forest classifier
- Save the trained model as `trained_model.pkl`
- Test the model with sample predictions

Output should show:
```
Generating training data...
Dataset shape: (500, 7)

Performance distribution:
High Performer       180
Medium Performer     180
Low Performer        140

Training Random Forest model...
Model saved to [path]/trained_model.pkl

Testing predictions...
Test 1: High Performer (Confidence: 94.5%)
Test 2: Medium Performer (Confidence: 78.2%)
Test 3: Low Performer (Confidence: 89.1%)

Model training complete!
```

### 3. Start the Flask Server

```bash
python app.py
```

The server will start at `http://localhost:5678`

## API Endpoints

### `POST /api/predictions`

Make a performance prediction for an employee.

**Request Body:**
```json
{
  "attendance": 85,
  "experience": 75,
  "kpi": 80,
  "training": 70,
  "leave": 10,
  "previousRating": 75
}
```

**Response:**
```json
{
  "success": true,
  "prediction": "High Performer",
  "confidence": 92.3,
  "featureImportance": [
    {"feature": "KPI Score", "impact": 28.5, "direction": "positive"},
    {"feature": "Attendance Score", "impact": 24.2, "direction": "positive"},
    ...
  ],
  "confidenceScores": {
    "High Performer": 92.3,
    "Medium Performer": 7.1,
    "Low Performer": 0.6
  }
}
```

### `GET /api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "model_loaded": true
}
```

### `GET /api/model-info`

Get information about the trained model.

**Response:**
```json
{
  "model_type": "Random Forest Classifier",
  "n_estimators": 100,
  "features": ["attendance_score", "experience_score", "kpi_score", "training_score", "leave_impact", "previous_rating"],
  "classes": ["High Performer", "Medium Performer", "Low Performer"]
}
```

## Machine Learning Model Details

### Algorithm: Random Forest Classifier

- **n_estimators**: 100 decision trees
- **max_depth**: 10 levels
- **min_samples_split**: 5
- **min_samples_leaf**: 2
- **random_state**: 42 (for reproducibility)

### Input Features (Normalized 0-100)

1. **Attendance Score** - Employee attendance percentage
2. **Experience Score** - Years of relevant experience
3. **KPI Score** - Key Performance Indicator achievement
4. **Training Score** - Training hours/completion percentage
5. **Leave Impact** - Number of leave days taken
6. **Previous Rating** - Previous performance rating

### Output Classes

1. **High Performer** - Predicted excellent performance
2. **Medium Performer** - Predicted average performance
3. **Low Performer** - Predicted below-average performance

### Feature Importance

The model calculates which input features are most influential in making predictions. These are returned in the API response and displayed in the frontend.

## Frontend Integration

The frontend automatically detects if the ML backend is available:
- ✅ If available: Uses real ML predictions
- ⚠️ If unavailable: Falls back to mock predictions

Update the API URL in [src/services/predictions.ts](../src/services/predictions.ts) if running on a different host/port.

## Troubleshooting

**Error: "Model not found"**
- Run `python train_model.py` first to train and save the model

**Error: Connection refused on localhost:5678**
- Ensure Flask server is running: `python app.py`
- Check if port 5678 is already in use

**CORS errors in frontend**
- Flask-CORS is enabled by default in `app.py`
- If issues persist, check your frontend URL in the CORS settings

## Model Performance

The trained model is tested on three scenarios:

| Input Profile | Prediction | Confidence |
|---------------|-----------|-----------|
| High attendance (95), high KPI (90), good training | High Performer | ~94% |
| Average metrics (75 avg) | Medium Performer | ~78% |
| Low attendance (50), low KPI (50) | Low Performer | ~89% |

## Notes

- Training data is synthetically generated based on realistic HR patterns
- For production use, replace with actual employee performance history
- Model is saved as binary pickle file for fast loading
- Predictions are made in real-time (<100ms typical)
