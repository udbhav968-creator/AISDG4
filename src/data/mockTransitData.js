// Public Transport Live Data & Anomaly Telemetry (PS-B06)
export const mockTransitVehicles = [
  {
    id: 'bus-512',
    name: 'DTC Electric Bus #512',
    type: 'Bus',
    regNumber: 'DL-01-PC-8842',
    driverName: 'Rajesh Kumar (Verified Pink-Badge)',
    routeId: 'route-512-express',
    routeName: 'Route #512: CP Central → AIIMS → Saket Depot',
    currentLocation: [28.6105, 77.2185],
    targetPath: [
      [28.6289, 77.2065],
      [28.6212, 77.2140],
      [28.6105, 77.2185],
      [28.5952, 77.2160],
      [28.5801, 77.2110],
      [28.5670, 77.2070],
      [28.5520, 77.2040]
    ],
    speed: '38 km/h',
    crowdLevel: 'Medium (62% Capacity)',
    crowdColor: '#f59e0b',
    femalePassengersCount: 14,
    cctvSurveillance: 'ACTIVE (4 HD Cameras Streaming)',
    wearableBridgeActive: true,
    geofenceStatus: 'NORMAL', // 'NORMAL', 'DEVIATED', 'PROLONGED_STOP'
    lastStop: 'Janpath Crossing',
    nextStop: 'AIIMS Flyover Junction (ETA 3 mins)',
    stopSafetyRating: 'High (92/100)',
    cctvFeedUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    stops: [
      { name: 'Connaught Place Hub', time: '21:30', crowd: 'High', lighting: '98%', safeRank: 96 },
      { name: 'Janpath Crossing', time: '21:38', crowd: 'Medium', lighting: '92%', safeRank: 91 },
      { name: 'AIIMS Guard Post', time: '21:45 (Next)', crowd: 'High', lighting: '95%', safeRank: 95 },
      { name: 'South Ext Market', time: '21:52', crowd: 'Medium', lighting: '88%', safeRank: 88 },
      { name: 'Saket Safe Terminal', time: '22:05', crowd: 'Low', lighting: '85%', safeRank: 86 },
    ]
  },
  {
    id: 'cab-shared-942',
    name: 'Pink Auto / Shared Cab #DL-942',
    type: 'Shared Cab',
    regNumber: 'DL-3C-AZ-4921',
    driverName: 'Sunita Sharma (Pink Cab Certified)',
    routeId: 'route-cab-express',
    routeName: 'Shared Express: Janpath → Hauz Khas',
    currentLocation: [28.5910, 77.1960], // Placed off-route for anomaly demo
    targetPath: [
      [28.6289, 77.2065],
      [28.6212, 77.2140],
      [28.6105, 77.2185],
      [28.5520, 77.2040]
    ],
    speed: '0 km/h (Halted for 4m 12s)',
    crowdLevel: 'Low (2 Passengers)',
    crowdColor: '#ef4444',
    femalePassengersCount: 2,
    cctvSurveillance: 'CAB DASHCAM ACTIVE',
    wearableBridgeActive: true,
    geofenceStatus: 'PROLONGED_STOP',
    lastStop: 'patel chowk',
    nextStop: 'UNKNOWN HALT IN UNLIT ALLEY',
    stopSafetyRating: 'CRITICAL LOW (34/100)',
    cctvFeedUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80',
    stops: [
      { name: 'Patel Chowk Pickup', time: '21:25', crowd: 'High', lighting: '95%', safeRank: 94 },
      { name: 'UNSCHEDULED UNLIT HALT', time: '21:40 (ACTIVE)', crowd: 'Isolated', lighting: '15%', safeRank: 28 },
    ]
  },
  {
    id: 'metro-yellow-line',
    name: 'Delhi Metro Yellow Line (Coach #3 - Women Reserved)',
    type: 'Metro',
    regNumber: 'DMRC-Y-204',
    driverName: 'DMRC Automated System + Security Coach Guard',
    routeId: 'route-metro-y',
    routeName: 'Yellow Line Shuttle: Rajiv Chowk → Hauz Khas',
    currentLocation: [28.6020, 77.2120],
    targetPath: [
      [28.6289, 77.2065],
      [28.6180, 77.2100],
      [28.6020, 77.2120],
      [28.5870, 77.2100],
      [28.5690, 77.2080],
      [28.5520, 77.2040]
    ],
    speed: '65 km/h',
    crowdLevel: 'High (88% Occupancy)',
    crowdColor: '#10b981',
    femalePassengersCount: 42,
    cctvSurveillance: 'LIVE AI CCTV (Gender Ratio & Distress Monitored)',
    wearableBridgeActive: true,
    geofenceStatus: 'NORMAL',
    lastStop: 'Patel Chowk Metro',
    nextStop: 'Central Secretariat (ETA 2 mins)',
    stopSafetyRating: 'VERY HIGH (98/100)',
    cctvFeedUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=600&auto=format&fit=crop&q=80',
    stops: [
      { name: 'Rajiv Chowk Metro', time: '21:40', crowd: 'Very High', lighting: '99%', safeRank: 99 },
      { name: 'Patel Chowk', time: '21:43', crowd: 'High', lighting: '98%', safeRank: 98 },
      { name: 'Central Secretariat', time: '21:46 (Next)', crowd: 'High', lighting: '99%', safeRank: 99 },
      { name: 'AIIMS Metro', time: '21:51', crowd: 'Medium', lighting: '96%', safeRank: 96 },
    ]
  }
];
