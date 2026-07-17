import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

class PerformancePredictionModel:
    def __init__(self):
        self.model = None
        self.scaler_params = None
        self.label_encoder = LabelEncoder()
        self.feature_names = [
            'attendance_score', 'experience_score', 'kpi_score', 
            'training_score', 'leave_impact', 'previous_rating'
        ]
        self.model_path = os.path.join(os.path.dirname(__file__), 'trained_model.pkl')
    
    def train(self, X, y):
        """Train the Random Forest model"""
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42,
            n_jobs=-1
        )
        self.model.fit(X, y)
        
        # Encode labels
        self.label_encoder.fit(y)
        
        # Store feature importance
        self.feature_importance = dict(zip(
            self.feature_names,
            self.model.feature_importances_
        ))
        
    def predict(self, features_dict):
        """Make prediction for a single instance"""
        if self.model is None:
            self.load_model()
        
        # Extract features in correct order
        X = np.array([[
            features_dict.get('attendance', 80),
            features_dict.get('experience', 70),
            features_dict.get('kpi', 75),
            features_dict.get('training', 65),
            features_dict.get('leave', 15),
            features_dict.get('previousRating', 70)
        ]])
        
        # Get prediction and confidence
        prediction = self.model.predict(X)[0]
        confidence_scores = self.model.predict_proba(X)[0]
        confidence = float(np.max(confidence_scores) * 100)
        
        # Get feature importance for this prediction
        feature_importance = self._get_feature_importance(X)
        
        return {
            'prediction': prediction,
            'confidence': confidence,
            'featureImportance': feature_importance,
            'confidenceScores': {
                'High Performer': float(confidence_scores[np.where(self.label_encoder.classes_ == 'High Performer')[0][0]] * 100),
                'Medium Performer': float(confidence_scores[np.where(self.label_encoder.classes_ == 'Medium Performer')[0][0]] * 100),
                'Low Performer': float(confidence_scores[np.where(self.label_encoder.classes_ == 'Low Performer')[0][0]] * 100),
            }
        }
    
    def _get_feature_importance(self, X):
        """Calculate feature importance for visualization"""
        importances = self.model.feature_importances_
        
        # Normalize to percentages
        total = sum(importances)
        normalized = [(imp / total * 100) for imp in importances]
        
        # Map to features with directions
        feature_data = []
        for name, importance in zip(self.feature_names, normalized):
            feature_data.append({
                'feature': self._format_feature_name(name),
                'impact': round(importance, 1),
                'direction': 'positive' if importance > 0 else 'negative'
            })
        
        # Sort by impact descending and return top 5
        feature_data.sort(key=lambda x: x['impact'], reverse=True)
        return feature_data[:5]
    
    def _format_feature_name(self, name):
        """Format feature name for display"""
        mapping = {
            'attendance_score': 'Attendance Score',
            'experience_score': 'Experience',
            'kpi_score': 'KPI Score',
            'training_score': 'Training Completed',
            'leave_impact': 'Leave Days',
            'previous_rating': 'Previous Rating'
        }
        return mapping.get(name, name)
    
    def save_model(self):
        """Save trained model to disk"""
        joblib.dump({
            'model': self.model,
            'label_encoder': self.label_encoder,
            'feature_names': self.feature_names
        }, self.model_path)
        print(f"Model saved to {self.model_path}")
    
    def load_model(self):
        """Load trained model from disk"""
        if os.path.exists(self.model_path):
            data = joblib.load(self.model_path)
            self.model = data['model']
            self.label_encoder = data['label_encoder']
            self.feature_names = data['feature_names']
            print(f"Model loaded from {self.model_path}")
        else:
            raise FileNotFoundError(f"Model not found at {self.model_path}")
