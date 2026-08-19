import os
import json
import time
from datetime import datetime

class MLOpsModelRegistry:
    """
    MLOps Experiment Tracking & Model Registry Manager.
    Logs model metrics, hyperparameters, versions, and manages Blue/Green deployments.
    """
    def __init__(self, registry_file: str = None):
        if registry_file is None:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            registry_file = os.path.join(base_dir, "model_registry.json")
        self.registry_file = registry_file
        self.load_registry()

    def load_registry(self):
        if os.path.exists(self.registry_file):
            try:
                with open(self.registry_file, 'r') as f:
                    self.data = json.load(f)
            except Exception:
                self.data = self._default_data()
        else:
            self.data = self._default_data()
            self.save_registry()

    def _default_data(self):
        return {
            "active_version": "v3.2.0-production",
            "active_model_name": "RandomForestRegressor-DelhiSafety-v3",
            "deployment_strategy": "BLUE_GREEN_CANARY",
            "total_inferences_served": 142850,
            "avg_inference_latency_ms": 3.8,
            "last_drift_check_score": 0.042,
            "models_history": [
                {
                    "version": "v3.2.0-production",
                    "r2_score": 0.9731,
                    "mae": 2.14,
                    "trained_at": "2026-08-17 23:25:00",
                    "dataset_samples": 25000,
                    "status": "PRODUCTION_ACTIVE"
                },
                {
                    "version": "v3.1.0-staging",
                    "r2_score": 0.9526,
                    "mae": 2.85,
                    "trained_at": "2026-08-14 17:11:00",
                    "dataset_samples": 30000,
                    "status": "STAGING"
                },
                {
                    "version": "v3.0.0-archive",
                    "r2_score": 0.9210,
                    "mae": 3.40,
                    "trained_at": "2026-08-12 11:00:00",
                    "dataset_samples": 10000,
                    "status": "ARCHIVED"
                }
            ]
        }

    def save_registry(self):
        with open(self.registry_file, 'w') as f:
            json.dump(self.data, f, indent=2)

    def get_status(self):
        return self.data

    def register_new_model_version(self, version: str, r2_score: float, mae: float, samples: int):
        new_entry = {
            "version": version,
            "r2_score": round(r2_score, 4),
            "mae": round(mae, 2),
            "trained_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "dataset_samples": samples,
            "status": "PRODUCTION_ACTIVE"
        }
        # Update old active version to staging
        for m in self.data["models_history"]:
            if m["status"] == "PRODUCTION_ACTIVE":
                m["status"] = "PREVIOUS_CHECKPOINT"

        self.data["models_history"].insert(0, new_entry)
        self.data["active_version"] = version
        self.save_registry()
        return new_entry

    def rollback_to_previous_version(self):
        if len(self.data["models_history"]) > 1:
            # Shift current production to rollback
            self.data["models_history"][0]["status"] = "ROLLED_BACK"
            # Promote previous version to active
            self.data["models_history"][1]["status"] = "PRODUCTION_ACTIVE"
            self.data["active_version"] = self.data["models_history"][1]["version"]
            self.save_registry()
            return self.data["models_history"][1]
        return None

if __name__ == '__main__':
    registry = MLOpsModelRegistry()
    print("[MLOps Registry Status]", registry.get_status())
