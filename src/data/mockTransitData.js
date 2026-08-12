export const mockTransitVehicles = [
  {
    id: 'bus-512',
    name: 'DTC Electric Bus #512',
    type: 'BUS',
    route: 'Connaught Place ➔ Nehru Place',
    currentLocation: [28.6180, 77.2150], // Patel Chowk Junction
    speed: '34 km/h',
    geofenceStatus: 'ON-ROUTE',
    passengerCount: 28,
    femaleCommuters: 14,
    cctvActive: true,
    stopSafetyRating: 'HIGH (92/100)',
    nextStop: 'Patel Chowk Metro Station'
  },
  {
    id: 'cab-shared-942',
    name: 'Shared Cab #DL-3C-AZ-4921',
    type: 'CAB',
    route: 'Saket ➔ Hauz Khas',
    currentLocation: [28.5670, 77.2040], // Green Park Main Road
    speed: '42 km/h',
    geofenceStatus: 'SAFE',
    passengerCount: 3,
    femaleCommuters: 2,
    cctvActive: true,
    stopSafetyRating: 'SAFE (88/100)',
    nextStop: 'Green Park Main Market'
  },
  {
    id: 'metro-yellow-12',
    name: 'Delhi Metro Yellow Line (Coach 4 - Ladies Special)',
    type: 'METRO',
    route: 'Samaypur Badli ➔ Millennium City Centre',
    currentLocation: [28.6328, 77.2197], // Rajiv Chowk Hub
    speed: '65 km/h',
    geofenceStatus: 'ON-ROUTE',
    passengerCount: 140,
    femaleCommuters: 140,
    cctvActive: true,
    stopSafetyRating: 'MAXIMUM (98/100)',
    nextStop: 'Rajiv Chowk Interchange'
  }
];
