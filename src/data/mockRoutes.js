// Realistic Night Routes with Dynamic Safety Scoring (PS-B07)
export const mockNightRoutes = [
  {
    id: 'route-safest',
    name: 'Safest Route (Main Arterial Corridor)',
    badge: 'RECOMMENDED FOR NIGHT',
    type: 'safest',
    distance: '8.4 km',
    duration: '22 mins',
    safetyScore: 94,
    lightingLevel: '96% Well-Lit (LED Smart Grid)',
    crowdRating: 'High Presence (78% Active)',
    policePoints: 4,
    openBusinesses: 12,
    incidentsLast30Days: 0,
    color: '#10b981', // green
    riskFactors: [
      { factor: 'Street Lighting', score: 98, status: 'Optimal (LED Grid)' },
      { factor: 'Police Help Points', score: 95, status: '4 Active Booths' },
      { factor: 'Foot Traffic & Open Stores', score: 92, status: 'High 24/7 Commerce' },
      { factor: 'Emergency Vehicle Access', score: 96, status: 'Wide 4-Lane Avenue' },
    ],
    explanation: 'Follows major well-lit main boulevards with 4 active Pink Police Booths and 12 open 24/7 pharmacies and cafes. Zero reported safety incidents in the past 30 days.',
    path: [
      [28.6289, 77.2065], // Connaught Place Central
      [28.6212, 77.2140], // Janpath Corridor (Well lit)
      [28.6105, 77.2185], // Rajpath Pink Booth
      [28.5952, 77.2160], // AIIMS Flyover Guard Post
      [28.5801, 77.2110], // South Extension Commercial Hub
      [28.5670, 77.2070], // Green Park Main Road
      [28.5520, 77.2040]  // Hauz Khas Safe Zone Terminal
    ]
  },
  {
    id: 'route-fastest',
    name: 'Fastest Route (Shortcut via Service Lane)',
    badge: 'NOT RECOMMENDED AFTER 10 PM',
    type: 'fastest',
    distance: '6.8 km',
    duration: '16 mins',
    safetyScore: 58,
    lightingLevel: '42% Low / Partial Outage',
    crowdRating: 'Isolated (12% Active)',
    policePoints: 0,
    openBusinesses: 1,
    incidentsLast30Days: 3,
    color: '#ef4444', // red
    riskFactors: [
      { factor: 'Street Lighting', score: 38, status: '3 Blackout Segments' },
      { factor: 'Police Help Points', score: 20, status: 'None on path' },
      { factor: 'Foot Traffic & Open Stores', score: 25, status: 'Empty industrial lane' },
      { factor: 'Emergency Vehicle Access', score: 60, status: 'Narrow single lane' },
    ],
    explanation: 'Saves 6 minutes but traverses poorly-lit secondary alleys behind industrial parks with zero police presence and 3 reported incidents at night.',
    path: [
      [28.6289, 77.2065], // Connaught Place Central
      [28.6240, 77.1980], // Secondary Alley 1
      [28.6080, 77.1950], // Unlit Underpass (Risk Area)
      [28.5910, 77.1960], // Empty Industrial Lane
      [28.5720, 77.1990], // Rear Railway Service Gate
      [28.5520, 77.2040]  // Hauz Khas Safe Zone Terminal
    ]
  },
  {
    id: 'route-balanced',
    name: 'Balanced Route (Metro Ring Road)',
    badge: 'BALANCED ALTERNATIVE',
    type: 'balanced',
    distance: '7.6 km',
    duration: '19 mins',
    safetyScore: 82,
    lightingLevel: '80% Adequate Lighting',
    crowdRating: 'Moderate (45% Active)',
    policePoints: 2,
    openBusinesses: 6,
    incidentsLast30Days: 1,
    color: '#f59e0b', // yellow
    riskFactors: [
      { factor: 'Street Lighting', score: 82, status: 'Mostly Good' },
      { factor: 'Police Help Points', score: 75, status: '2 Patrol Points' },
      { factor: 'Foot Traffic & Open Stores', score: 78, status: 'Metro Stations Open' },
      { factor: 'Emergency Vehicle Access', score: 90, status: 'Main Transit Arterial' },
    ],
    explanation: 'Balanced travel time along the Elevated Metro Line. Good lighting with 2 metro security posts and moderate crowd presence.',
    path: [
      [28.6289, 77.2065], // Connaught Place Central
      [28.6180, 77.2100], // Patel Chowk Metro
      [28.6020, 77.2120], // Race Course Security Post
      [28.5870, 77.2100], // Jor Bagh Transit Hub
      [28.5690, 77.2080], // INA Market Safe Stop
      [28.5520, 77.2040]  // Hauz Khas Safe Zone Terminal
    ]
  }
];
