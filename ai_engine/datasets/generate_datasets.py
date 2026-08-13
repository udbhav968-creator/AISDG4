import os
import pandas as pd
import numpy as np

# Ensure dataset directory exists
os.makedirs("ai_engine/datasets", exist_ok=True)

print("[Dataset Pipeline] Generating Multi-Dimensional Safety Datasets (10,000 Records)...")

# --- 1. Dataset 1: Route Risk Regression Dataset ---
np.random.seed(42)
n_samples = 10000

lighting_percent = np.random.uniform(10, 100, n_samples)
crowd_level = np.random.uniform(5, 95, n_samples)
police_proximity_m = np.random.uniform(100, 5000, n_samples)
open_stores_count = np.random.randint(0, 25, n_samples)
historical_crime_rate = np.random.uniform(0.1, 8.5, n_samples)

safety_score = (
    (lighting_percent * 0.35) +
    (crowd_level * 0.25) +
    (np.maximum(0, 100 - (police_proximity_m / 50)) * 0.20) +
    (np.minimum(open_stores_count * 2.5, 20)) -
    (historical_crime_rate * 3.5) +
    np.random.normal(0, 3, n_samples)
)
safety_score = np.clip(safety_score, 5, 99)

df_route_risk = pd.DataFrame({
    'lighting_percent': np.round(lighting_percent, 2),
    'crowd_level': np.round(crowd_level, 2),
    'police_proximity_m': np.round(police_proximity_m, 1),
    'open_stores_count': open_stores_count,
    'historical_crime_rate': np.round(historical_crime_rate, 2),
    'safety_score': np.round(safety_score, 1)
})

df_route_risk.to_csv("ai_engine/datasets/route_risk_dataset.csv", index=False)
print(f"[OK] Saved route_risk_dataset.csv ({len(df_route_risk)} rows)")


# --- 2. Dataset 2: Trajectory Geofence Anomaly Dataset ---
lat_base = 28.6105
lon_base = 77.2185

latitudes = lat_base + np.random.normal(0, 0.05, n_samples)
longitudes = lon_base + np.random.normal(0, 0.05, n_samples)
speed_kmh = np.random.uniform(0, 80, n_samples)
off_route_distance_m = np.random.exponential(scale=80, size=n_samples)
halt_duration_sec = np.random.exponential(scale=60, size=n_samples)

is_anomaly = (off_route_distance_m > 250) | ((speed_kmh < 3) & (halt_duration_sec > 240))
is_anomaly = is_anomaly.astype(int)

df_trajectory = pd.DataFrame({
    'latitude': np.round(latitudes, 6),
    'longitude': np.round(longitudes, 6),
    'speed_kmh': np.round(speed_kmh, 1),
    'off_route_distance_m': np.round(off_route_distance_m, 1),
    'halt_duration_sec': np.round(halt_duration_sec, 0),
    'is_anomaly': is_anomaly
})

df_trajectory.to_csv("ai_engine/datasets/trajectory_anomaly_dataset.csv", index=False)
print(f"[OK] Saved trajectory_anomaly_dataset.csv ({len(df_trajectory)} rows)")


# --- 3. Dataset 3: Driver Behavior Analytics Dataset ---
rapid_accelerations = np.random.randint(0, 12, n_samples)
hard_brakes = np.random.randint(0, 15, n_samples)
sharp_turns = np.random.randint(0, 10, n_samples)
night_hours_driving = np.random.uniform(0, 8, n_samples)

driver_safety_rating = 100 - (
    (rapid_accelerations * 3.5) +
    (hard_brakes * 4.0) +
    (sharp_turns * 3.0) +
    (night_hours_driving * 2.5) +
    np.random.normal(0, 2, n_samples)
)
driver_safety_rating = np.clip(driver_safety_rating, 10, 99)

df_driver = pd.DataFrame({
    'rapid_accelerations': rapid_accelerations,
    'hard_brakes': hard_brakes,
    'sharp_turns': sharp_turns,
    'night_hours_driving': np.round(night_hours_driving, 1),
    'driver_safety_rating': np.round(driver_safety_rating, 1)
})

df_driver.to_csv("ai_engine/datasets/driver_behavior_dataset.csv", index=False)
print(f"[OK] Saved driver_behavior_dataset.csv ({len(df_driver)} rows)")

print("[SUCCESS] All 3 datasets generated successfully!")
