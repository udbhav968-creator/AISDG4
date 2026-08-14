import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'suraksha_database.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Users Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone TEXT NOT NULL,
            emergency_contacts TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Transit Vehicles Table (PS-B06)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transit_vehicles (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            current_location TEXT NOT NULL,
            speed TEXT NOT NULL,
            geofence_status TEXT DEFAULT 'NORMAL',
            stop_safety_rating TEXT,
            next_stop TEXT,
            cctv_stream_url TEXT
        )
    ''')

    # Safe Havens Table (PS-B07)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS safe_havens (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            distance TEXT NOT NULL,
            location TEXT NOT NULL,
            address TEXT NOT NULL,
            is_open_247 INTEGER DEFAULT 1
        )
    ''')

    # Emergency SOS Alerts Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sos_alerts (
            id TEXT PRIMARY KEY,
            user_name TEXT NOT NULL,
            vehicle_id TEXT,
            trigger_type TEXT NOT NULL,
            location TEXT NOT NULL,
            status TEXT DEFAULT 'DISPATCHED',
            unit_assigned TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Seed Initial Data if empty
    cursor.execute('SELECT COUNT(*) FROM transit_vehicles')
    if cursor.fetchone()[0] == 0:
        cursor.executemany('''
            INSERT INTO transit_vehicles (id, name, type, current_location, speed, geofence_status, stop_safety_rating, next_stop)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', [
          ('bus-512', 'DTC Electric Bus #512', 'BUS', '[28.6105, 77.2185]', '38 km/h', 'NORMAL', 'HIGH (92/100)', 'AIIMS Metro Exit 2'),
          ('cab-shared-942', 'Pink Auto / Shared Cab #DL-942', 'CAB', '[28.5910, 77.1960]', '14 km/h', 'PROLONGED_STOP', 'UNSAFE HALT (32/100)', 'Unlit Rear Alley Segment #03'),
          ('metro-yellow-3', 'Delhi Metro Yellow Line #3', 'METRO', '[28.6289, 77.2065]', '65 km/h', 'NORMAL', 'OPTIMAL (98/100)', 'Rajiv Chowk Interchange')
        ])

    cursor.execute('SELECT COUNT(*) FROM safe_havens')
    if cursor.fetchone()[0] == 0:
        cursor.executemany('''
            INSERT INTO safe_havens (id, name, type, distance, location, address)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', [
          ('sh-1', 'Janpath Pink Police Booth #04', 'POLICE_BOOTH', '350 m', '[28.6210, 77.2195]', 'Janpath Circle, Near Metro Exit 2'),
          ('sh-2', 'Pink Patrol Mobile Unit #12', 'POLICE_BOOTH', '600 m', '[28.5980, 77.2050]', 'Patrolling Rajpath - AIIMS Flyover'),
          ('sh-3', 'AIIMS Emergency Hospital 24/7', 'HOSPITAL', '850 m', '[28.5672, 77.2100]', 'Sri Aurobindo Marg, Ansari Nagar')
        ])

    conn.commit()
    conn.close()

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# Database Helper Functions
def fetch_all_vehicles():
    conn = get_db()
    rows = conn.execute('SELECT * FROM transit_vehicles').fetchall()
    vehicles = []
    for r in rows:
        vehicles.append({
            "id": r["id"],
            "name": r["name"],
            "type": r["type"],
            "currentLocation": json.loads(r["current_location"]),
            "speed": r["speed"],
            "geofenceStatus": r["geofence_status"],
            "stopSafetyRating": r["stop_safety_rating"],
            "nextStop": r["next_stop"]
        })
    conn.close()
    return vehicles

def fetch_all_safe_havens():
    conn = get_db()
    rows = conn.execute('SELECT * FROM safe_havens').fetchall()
    havens = []
    for r in rows:
        havens.append({
            "id": r["id"],
            "name": r["name"],
            "type": r["type"],
            "distance": r["distance"],
            "location": json.loads(r["location"]),
            "address": r["address"]
        })
    conn.close()
    return havens

def save_sos_alert(alert_data):
    conn = get_db()
    conn.execute('''
        INSERT INTO sos_alerts (id, user_name, vehicle_id, trigger_type, location, status, unit_assigned)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        alert_data.get('id'),
        alert_data.get('user', 'Ananya Verma'),
        alert_data.get('vehicle', 'Cab DL-942'),
        alert_data.get('trigger', 'Wearable Double-Tap'),
        json.dumps(alert_data.get('location', [28.5910, 77.1960])),
        alert_data.get('status', 'DISPATCHED'),
        alert_data.get('unitAssigned', 'Pink Patrol Mobile Unit #12')
    ))
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("SQLite Database Initialized & Seeded Successfully!")
