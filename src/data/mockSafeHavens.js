export const mockSafeHavens = [
  {
    id: 'haven-01',
    name: 'Delhi Police Pink Booth #14',
    type: 'POLICE_BOOTH',
    location: [28.6250, 77.2150], // Spaced Lat/Lon
    distance: '350m away',
    open24x7: true,
    address: 'Janpath Crossing, CP Outskirts',
    contact: '011-2334-9421'
  },
  {
    id: 'haven-02',
    name: 'AIIMS Emergency Trauma Care',
    type: 'HOSPITAL',
    location: [28.5672, 77.2100], // Spaced Lat/Lon
    distance: '1.2 km away',
    open24x7: true,
    address: 'Sri Aurobindo Marg, Ansari Nagar',
    contact: '011-2658-8500'
  },
  {
    id: 'haven-03',
    name: '24 Seven All-Night Commercial Store',
    type: 'COMMERCIAL_SANCTUARY',
    location: [28.5980, 77.2280], // Spaced Lat/Lon
    distance: '800m away',
    open24x7: true,
    address: 'South Extension Part 2 Market',
    contact: '011-4164-9911'
  }
];

export const mockIncidents = [
  {
    id: 'inc-01',
    title: 'Unlit Alley Blackout Reported',
    location: [28.5820, 77.1950],
    severity: 'MEDIUM',
    timeAgo: '45 mins ago'
  }
];
