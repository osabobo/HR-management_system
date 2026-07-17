import pandas as pd
import numpy as np
from model import PerformancePredictionModel

# Sample training data based on your mock data
training_data = {
    'attendance': [96, 80, 55, 98, 74],
    'experience': [88, 65, 60, 95, 45],
    'kpi': [92, 74, 50, 93, 68],
    'training': [85, 55, 35, 92, 42],
    'leave': [5, 12, 30, 2, 18],
    'previousRating': [90, 72, 52, 93, 65],
    'performance': ['High Performer', 'Medium Performer', 'Low Performer', 'High Performer', 'Low Performer']
}

# Generate more training samples by adding noise
def generate_training_data(base_data, n_samples=500):
    """Generate synthetic training data with variations"""
    samples = []
    
    for _ in range(n_samples):
        # Generate random samples biased towards realistic distributions
        attendance = np.random.normal(80, 15)
        experience = np.random.normal(70, 20)
        kpi = np.random.normal(75, 18)
        training = np.random.normal(65, 20)
        leave = np.random.normal(15, 10)
        previous_rating = np.random.normal(72, 15)
        
        # Clamp values to realistic ranges
        attendance = np.clip(attendance, 30, 100)
        experience = np.clip(experience, 10, 100)
        kpi = np.clip(kpi, 20, 100)
        training = np.clip(training, 10, 100)
        leave = np.clip(leave, 0, 50)
        previous_rating = np.clip(previous_rating, 30, 100)
        
        # Determine performance based on weighted score
        weighted_score = (
            attendance * 0.25 +
            experience * 0.15 +
            kpi * 0.30 +
            training * 0.15 +
            (100 - leave) * 0.10 +
            previous_rating * 0.05
        )
        
        if weighted_score >= 80:
            performance = 'High Performer'
        elif weighted_score >= 60:
            performance = 'Medium Performer'
        else:
            performance = 'Low Performer'
        
        samples.append({
            'attendance': attendance,
            'experience': experience,
            'kpi': kpi,
            'training': training,
            'leave': leave,
            'previousRating': previous_rating,
            'performance': performance
        })
    
    return pd.DataFrame(samples)

def train_and_save_model():
    """Train the model and save it"""
    print("Generating training data...")
    df = generate_training_data({}, n_samples=500)
    
    print(f"Dataset shape: {df.shape}")
    print(f"\nPerformance distribution:")
    print(df['performance'].value_counts())
    
    # Prepare features and labels
    X = df[['attendance', 'experience', 'kpi', 'training', 'leave', 'previousRating']].values
    y = df['performance'].values
    
    # Train model
    print("\nTraining Random Forest model...")
    model = PerformancePredictionModel()
    model.train(X, y)
    
    # Save model
    model.save_model()
    
    # Test predictions
    print("\nTesting predictions...")
    test_cases = [
        {'attendance': 95, 'experience': 85, 'kpi': 90, 'training': 85, 'leave': 5, 'previousRating': 88},
        {'attendance': 75, 'experience': 60, 'kpi': 70, 'training': 60, 'leave': 15, 'previousRating': 70},
        {'attendance': 50, 'experience': 45, 'kpi': 50, 'training': 35, 'leave': 35, 'previousRating': 50},
    ]
    
    for i, test in enumerate(test_cases):
        result = model.predict(test)
        print(f"\nTest {i+1}: {result['prediction']} (Confidence: {result['confidence']:.1f}%)")
    
    print("\nModel training complete!")

if __name__ == "__main__":
    train_and_save_model()
