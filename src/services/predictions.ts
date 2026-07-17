import axios from 'axios';

const API_BASE_URL = 'http://localhost:5678/api';

export interface PredictionInput {
  attendance: number;
  experience: number;
  kpi: number;
  training: number;
  leave: number;
  previousRating: number;
}

export interface PredictionResult {
  success: boolean;
  prediction: 'High Performer' | 'Medium Performer' | 'Low Performer';
  confidence: number;
  featureImportance: {
    feature: string;
    impact: number;
    direction: 'positive' | 'negative';
  }[];
  confidenceScores: {
    'High Performer': number;
    'Medium Performer': number;
    'Low Performer': number;
  };
}

export const predictPerformance = async (input: PredictionInput): Promise<PredictionResult> => {
  try {
    const response = await axios.post<PredictionResult>(`${API_BASE_URL}/predictions`, {
      attendance: input.attendance,
      experience: input.experience,
      kpi: input.kpi,
      training: input.training,
      leave: input.leave,
      previousRating: input.previousRating,
    });
    return response.data;
  } catch (error) {
    console.error('Prediction API error:', error);
    throw error;
  }
};

export const getModelInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/model-info`);
    return response.data;
  } catch (error) {
    console.error('Model info API error:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};
