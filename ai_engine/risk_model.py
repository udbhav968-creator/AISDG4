"""
AI & Machine Learning Risk Prediction & Trajectory Anomaly Model (PS-B06 & PS-B07)
"""
import math

class SafetyRiskModel:
    def __init__(self):
        self.weights = {
            'lighting': 0.35,
            'crowd': 0.25,
            'police': 0.25,
            'stores': 0.15
        }

    def predict_safety_score(self, lighting_pct, crowd_level, police_dist_m, open_stores):
        """
        ML Risk Score Predictor (0 - 100)
        """
        lighting_score = (lighting_pct / 100.0) * 35.0
        
        crowd_map = {'high': 25, 'medium': 18, 'low': 10, 'isolated': 2}
        crowd_score = crowd_map.get(str(crowd_level).lower(), 15)

        police_score = 25 if police_dist_m <= 300 else 18 if police_dist_m <= 800 else 10
        stores_score = min(open_stores * 2.5, 15)

        total_score = lighting_score + crowd_score + police_score + stores_score
        return min(max(round(total_score), 10), 99)

    def detect_trajectory_anomaly(self, current_lat, current_lon, expected_path):
        """
        Geofence Deviation Anomaly Classifier
        """
        min_dist = float('inf')
        for pt in expected_path:
            # Haversine distance math
            lat1, lon1 = current_lat, current_lon
            lat2, lon2 = pt[0], pt[1]
            dlat = math.radians(lat2 - lat1)
            dlon = math.radians(lon2 - lon1)
            a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
            c = 2 * Math.atan2(math.sqrt(a), math.sqrt(1 - a)) if hasattr(math, 'atan2') else 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
            dist_m = 6371000 * c
            if dist_m < min_dist:
                min_dist = dist_m

        is_anomaly = min_dist > 250
        return {
            'is_anomaly': is_anomaly,
            'off_route_distance_m': round(min_dist),
            'anomaly_score': min(round((min_dist / 1000.0) * 100), 99)
        }

model = SafetyRiskModel()
