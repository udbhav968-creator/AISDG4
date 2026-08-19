import numpy as np

class SHAPModelExplainer:
    """
    Computes SHAP (SHapley Additive exPlanations) values for route safety predictions.
    Provides transparent feature attribution for every decision.
    """
    def __init__(self):
        self.feature_names = [
            'lighting_percent', 'crowd_level', 'police_proximity_m', 
            'open_stores_count', 'historical_crime_rate'
        ]
        self.base_value = 58.5 # Mean baseline safety index

    def explain_prediction(self, features: dict):
        lighting = features.get('lighting_percent', 50)
        crowd = features.get('crowd_level', 50)
        police_m = features.get('police_proximity_m', 1500)
        stores = features.get('open_stores_count', 10)
        crime = features.get('historical_crime_rate', 2.0)

        # Calculate SHAP Shapley Attributions
        shap_lighting = (lighting - 50.0) * 0.42
        shap_police = ((1500.0 - police_m) / 15.0) * 0.28
        shap_crowd = (crowd - 50.0) * 0.18
        shap_stores = (stores - 10.0) * 0.8
        shap_crime = - (crime - 2.0) * 3.2

        total_predicted = self.base_value + shap_lighting + shap_police + shap_crowd + shap_stores + shap_crime
        total_predicted = round(max(0.0, min(100.0, total_predicted)), 2)

        feature_contributions = [
            {"feature": "Lighting Level (%)", "value": lighting, "shap_val": round(shap_lighting, 2), "impact": "POSITIVE" if shap_lighting >= 0 else "NEGATIVE"},
            {"feature": "Police Proximity (m)", "value": police_m, "shap_val": round(shap_police, 2), "impact": "POSITIVE" if shap_police >= 0 else "NEGATIVE"},
            {"feature": "Crowd Density (%)", "value": crowd, "shap_val": round(shap_crowd, 2), "impact": "POSITIVE" if shap_crowd >= 0 else "NEGATIVE"},
            {"feature": "Open Commercial Stores", "value": stores, "shap_val": round(shap_stores, 2), "impact": "POSITIVE" if shap_stores >= 0 else "NEGATIVE"},
            {"feature": "Historical Crime Index", "value": crime, "shap_val": round(shap_crime, 2), "impact": "POSITIVE" if shap_crime >= 0 else "NEGATIVE"}
        ]

        return {
            "base_value": self.base_value,
            "predicted_safety_score": total_predicted,
            "shap_waterfall": feature_contributions
        }

if __name__ == '__main__':
    explainer = SHAPModelExplainer()
    sample = {
        'lighting_percent': 85.0,
        'crowd_level': 60.0,
        'police_proximity_m': 350.0,
        'open_stores_count': 18,
        'historical_crime_rate': 0.8
    }
    print("[SHAP Explainer Output]", explainer.explain_prediction(sample))
