export const mockNightRoutes = [
  {
    id: 'route-safest',
    name: 'Main Arterial Safe Corridor (Recommended)',
    type: 'SAFEST',
    safetyScore: 94,
    time: '24 mins',
    distance: '11.8 km',
    badge: 'SAFEST NIGHT ROUTE',
    lightingLevel: '94% Smart LED Illuminated',
    policePresence: '4 Pink Police Booths & Active PCR Patrol',
    crowdRating: 'High Commuter Traffic (Well-Lit Commercial Zone)',
    path: [
      [28.6328, 77.2197], // Connaught Place Central Hub
      [28.6180, 77.2150], // Patel Chowk Junction
      [28.6010, 77.2110], // Safdarjung Tomb Arterial
      [28.5830, 77.2060], // AIIMS Flyover Safe Corridor
      [28.5670, 77.2040], // Green Park Main Road
      [28.5450, 77.2060]  // Hauz Khas Safe Zone Terminal
    ],
    explanation: '✓ RECOMMENDED: Continuous 94% LED street lighting, 4 active 24/7 Pink Police Booths, and 18 open commercial sanctuaries along the corridor.'
  },
  {
    id: 'route-fastest',
    name: 'Industrial Park Shortcut Alley',
    type: 'FASTEST',
    safetyScore: 48,
    time: '18 mins',
    distance: '9.2 km',
    badge: 'CAUTION: LOW LIGHTING',
    lightingLevel: '38% Dim/Broken Streetlamps',
    policePresence: '1 Police Booth (2.8 km away)',
    crowdRating: 'Isolated Industrial Rear Area',
    path: [
      [28.6328, 77.2197], // Connaught Place Central Hub
      [28.6110, 77.1950], // Industrial Rear Gate
      [28.5910, 77.1960], // Unlit Alley Segment #03
      [28.5680, 77.1980], // Railway Overpass Shortcut
      [28.5450, 77.2060]  // Hauz Khas Safe Zone Terminal
    ],
    explanation: '⚠️ CAUTION: Unlit 2.4 km stretch near Industrial Rear Gate with broken streetlamps and zero foot traffic past 10 PM.'
  },
  {
    id: 'route-balanced',
    name: 'Ring Road Expressway Option',
    type: 'BALANCED',
    safetyScore: 82,
    time: '21 mins',
    distance: '10.5 km',
    badge: 'BALANCED ALTERNATIVE',
    lightingLevel: '82% Standard Highway Lights',
    policePresence: '2 PCR Patrol Vehicles',
    crowdRating: 'Moderate Vehicle Traffic',
    path: [
      [28.6328, 77.2197], // Connaught Place Central Hub
      [28.6250, 77.2350], // ITO Ring Road Junction
      [28.5980, 77.2380], // Ashram Flyover Expressway
      [28.5690, 77.2280], // South Extension Part 2
      [28.5450, 77.2060]  // Hauz Khas Safe Zone Terminal
    ],
    explanation: '✓ BALANCED: Fast expressway route with steady night traffic and 82% overhead streetlamp coverage.'
  }
];
