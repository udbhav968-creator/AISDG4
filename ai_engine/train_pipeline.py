import os
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import mean_squared_error, r2_score, accuracy_score, f1_score

os.makedirs("ai_engine/models", exist_ok=True)

print("[ML Training] Starting Model Training & Fine-Tuning Pipeline...")

# --- 1. Train Model 1: Random Forest Route Risk Regressor ---
df_risk = pd.read_csv("ai_engine/datasets/route_risk_dataset.csv")

X_risk = df_risk[['lighting_percent', 'crowd_level', 'police_proximity_m', 'open_stores_count', 'historical_crime_rate']]
y_risk = df_risk['safety_score']

X_train_risk, X_test_risk, y_train_risk, y_test_risk = train_test_split(X_risk, y_risk, test_size=0.2, random_state=42)

model_risk = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42)
model_risk.fit(X_train_risk, y_train_risk)

y_pred_risk = model_risk.predict(X_test_risk)
r2_risk = r2_score(y_test_risk, y_pred_risk)
mse_risk = mean_squared_error(y_test_risk, y_pred_risk)

joblib.dump(model_risk, "ai_engine/models/route_risk_model.joblib")
print(f"[OK] Model 1 (Route Risk Regressor): R2 Score = {r2_risk:.4f}, MSE = {mse_risk:.4f}")


# --- 2. Train Model 2: Trajectory Anomaly Classifier ---
df_traj = pd.read_csv("ai_engine/datasets/trajectory_anomaly_dataset.csv")

X_traj = df_traj[['latitude', 'longitude', 'speed_kmh', 'off_route_distance_m', 'halt_duration_sec']]
y_traj = df_traj['is_anomaly']

X_train_traj, X_test_traj, y_train_traj, y_test_traj = train_test_split(X_traj, y_traj, test_size=0.2, random_state=42)

model_traj = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
model_traj.fit(X_train_traj, y_train_traj)

y_pred_traj = model_traj.predict(X_test_traj)
acc_traj = accuracy_score(y_test_traj, y_pred_traj)
f1_traj = f1_score(y_test_traj, y_pred_traj)

joblib.dump(model_traj, "ai_engine/models/trajectory_anomaly_model.joblib")
print(f"[OK] Model 2 (Trajectory Anomaly Classifier): Accuracy = {acc_traj * 100:.2f}%, F1 = {f1_traj:.4f}")


# --- 3. Train Model 3: Driver Behavior Safety Evaluator ---
df_driver = pd.read_csv("ai_engine/datasets/driver_behavior_dataset.csv")

X_driver = df_driver[['rapid_accelerations', 'hard_brakes', 'sharp_turns', 'night_hours_driving']]
y_driver = df_driver['driver_safety_rating']

X_train_drv, X_test_drv, y_train_drv, y_test_drv = train_test_split(X_driver, y_driver, test_size=0.2, random_state=42)

model_driver = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
model_driver.fit(X_train_drv, y_train_drv)

y_pred_drv = model_driver.predict(X_test_drv)
r2_drv = r2_score(y_test_drv, y_pred_drv)

joblib.dump(model_driver, "ai_engine/models/driver_behavior_model.joblib")
print(f"[OK] Model 3 (Driver Behavior Evaluator): R2 Score = {r2_drv:.4f}")

print("[SUCCESS] All 3 Machine Learning models fine-tuned and saved to ai_engine/models/")
