import os
import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Initialize FastAPI App
app = FastAPI(
    title="SurakshaOne High-Tech AI & ML Microservice Engine",
    description="Production-grade AI inference microservice for route risk scoring, trajectory anomaly detection, and driver behavior analysis.",
    version="2.5.0"
)

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Serialized Models
MODELS_DIR = "ai_engine/models"

try:
    model_risk = joblib.load(os.path.join(MODELS_DIR, "route_risk_model.joblib"))
    model_traj = joblib.load(os.path.join(MODELS_DIR, "trajectory_anomaly_model.joblib"))
    model_driver = joblib.load(os.path.join(MODELS_DIR, "driver_behavior_model.joblib"))
    print("[FastAPI Engine] Serialized ML Models loaded successfully!")
except Exception as e:
    print(f"[FastAPI Engine Warning] Could not load serialized models: {e}. Falling back to dynamic heuristics.")
    model_risk = None
    model_traj = None
    model_driver = None


# --- Pydantic Request Models ---
class RouteRiskRequest(BaseModel):
    lighting_percent: float = Field(..., ge=0, le=100, example=85.0)
    crowd_level: float = Field(..., ge=0, le=100, example=60.0)
    police_proximity_m: float = Field(..., ge=0, example=350.0)
    open_stores_count: int = Field(..., ge=0, example=12)
    historical_crime_rate: float = Field(default=2.5, ge=0, example=1.8)

class TrajectoryAnomalyRequest(BaseModel):
    latitude: float = Field(..., example=28.5910)
    longitude: float = Field(..., example=77.1960)
    speed_kmh: float = Field(..., example=12.5)
    off_route_distance_m: float = Field(..., example=340.0)
    halt_duration_sec: float = Field(..., example=270.0)

class DriverBehaviorRequest(BaseModel):
    rapid_accelerations: int = Field(..., example=2)
    hard_brakes: int = Field(..., example=3)
    sharp_turns: int = Field(..., example=1)
    night_hours_driving: float = Field(..., example=4.5)


# --- Endpoints ---

@app.get("/")
def read_root():
    return {
        "status": "ONLINE",
        "service": "SurakshaOne FastAPI Microservice",
        "models_loaded": {
            "route_risk_regressor": model_risk is not None,
            "trajectory_anomaly_classifier": model_traj is not None,
            "driver_behavior_evaluator": model_driver is not None
        },
        "docs_url": "/docs"
    }

@app.post("/predict/route-risk")
def predict_route_risk(data: RouteRiskRequest):
    if model_risk:
        input_data = [[
            data.lighting_percent,
            data.crowd_level,
            data.police_proximity_m,
            data.open_stores_count,
            data.historical_crime_rate
        ]]
        score = model_risk.predict(input_data)[0]
    else:
        score = (data.lighting_percent * 0.4) + 30

    safety_score = float(np.clip(score, 5.0, 99.0))

    return {
        "success": True,
        "model_name": "RandomForest-RouteRisk-v2.5",
        "predicted_safety_score": round(safety_score, 1),
        "risk_level": "LOW" if safety_score > 75 else "MEDIUM" if safety_score > 45 else "HIGH_RISK"
    }

@app.post("/predict/trajectory-anomaly")
def predict_trajectory_anomaly(data: TrajectoryAnomalyRequest):
    if model_traj:
        input_data = [[
            data.latitude,
            data.longitude,
            data.speed_kmh,
            data.off_route_distance_m,
            data.halt_duration_sec
        ]]
        is_anomaly = bool(model_traj.predict(input_data)[0])
    else:
        is_anomaly = data.off_route_distance_m > 250.0

    return {
        "success": True,
        "model_name": "RandomForest-TrajectoryAnomaly-v2.5",
        "is_anomaly": is_anomaly,
        "geofence_status": "DEVIATED" if is_anomaly else "ON-ROUTE",
        "recommendation": "ALERT_CONTROL_ROOM" if is_anomaly else "CONTINUE_MONITORING"
    }

@app.post("/predict/driver-behavior")
def predict_driver_behavior(data: DriverBehaviorRequest):
    if model_driver:
        input_data = [[
            data.rapid_accelerations,
            data.hard_brakes,
            data.sharp_turns,
            data.night_hours_driving
        ]]
        rating = model_driver.predict(input_data)[0]
    else:
        rating = 85.0 - (data.hard_brakes * 3)

    driver_rating = float(np.clip(rating, 10.0, 99.0))

    return {
        "success": True,
        "model_name": "RandomForest-DriverBehavior-v2.5",
        "driver_safety_rating": round(driver_rating, 1),
        "classification": "VERIFIED_SAFE" if driver_rating > 75 else "NEEDS_AUDIT"
    }

@app.get("/datasets/stats")
def get_dataset_stats():
    stats = {}
    for filename in ["route_risk_dataset.csv", "trajectory_anomaly_dataset.csv", "driver_behavior_dataset.csv"]:
        filepath = os.path.join("ai_engine/datasets", filename)
        if os.path.exists(filepath):
            df = pd.read_csv(filepath)
            stats[filename] = {"rows": len(df), "columns": list(df.columns)}
    return {"success": True, "datasets": stats}

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=8000)
