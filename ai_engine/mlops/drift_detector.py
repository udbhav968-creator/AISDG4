import numpy as np
import pandas as pd
from scipy.stats import ks_2samp

class DataDriftDetector:
    """
    MLOps Data & Concept Drift Detector using Kolmogorov-Smirnov (KS) statistical tests.
    Monitors live incoming feature distributions vs. baseline training data.
    """
    def __init__(self, baseline_data: pd.DataFrame):
        self.baseline_data = baseline_data
        self.feature_columns = [
            'lighting_percent', 'crowd_level', 'police_proximity_m', 
            'open_stores_count', 'historical_crime_rate'
        ]

    def calculate_ks_drift(self, live_data: pd.DataFrame):
        drift_results = {}
        overall_drift_score = 0.0

        for col in self.feature_columns:
            if col in live_data.columns and col in self.baseline_data.columns:
                stat, p_value = ks_2samp(self.baseline_data[col], live_data[col])
                is_drifted = p_value < 0.05
                drift_results[col] = {
                    "ks_statistic": round(float(stat), 4),
                    "p_value": round(float(p_value), 4),
                    "drift_detected": bool(is_drifted)
                }
                overall_drift_score += float(stat)

        overall_drift_score = round(overall_drift_score / len(self.feature_columns), 4)
        needs_retraining = overall_drift_score > 0.20

        return {
            "overall_drift_score": overall_drift_score,
            "needs_retraining": needs_retraining,
            "status": "DRIFT_ALERT" if needs_retraining else "HEALTHY_STABLE",
            "feature_drifts": drift_results
        }

if __name__ == '__main__':
    # Test Drift Detector
    np.random.seed(42)
    baseline_df = pd.DataFrame({
        'lighting_percent': np.random.uniform(0, 100, 1000),
        'crowd_level': np.random.uniform(0, 100, 1000),
        'police_proximity_m': np.random.uniform(10, 3000, 1000),
        'open_stores_count': np.random.randint(0, 30, 1000),
        'historical_crime_rate': np.random.exponential(2.0, 1000)
    })

    detector = DataDriftDetector(baseline_df)
    results = detector.calculate_ks_drift(baseline_df)
    print("[MLOps Drift Detector Test]", results)
