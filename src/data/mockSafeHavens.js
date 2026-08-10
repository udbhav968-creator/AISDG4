// Safe Locations & Emergency Sanctuaries Radar Data
export const mockSafeHavens = [
  {
    id: 'haven-pink-1',
    name: 'Janpath Pink Police Booth #04',
    type: 'Pink Police Booth',
    category: 'police',
    address: 'Janpath Circle, Near Metro Exit 2',
    distance: '350 m',
    contact: '+91 11-2334-8901 / 112',
    open24_7: true,
    womenStaff: true,
    coordinates: [28.6212, 77.2140],
    rating: 4.9,
    features: ['Female Officers On Duty', 'Direct PCR Radio', 'Emergency First Aid', 'CCTV Station']
  },
  {
    id: 'haven-pcr-van-2',
    name: 'Pink Patrol Mobile Unit #12',
    type: 'Mobile Police Unit',
    category: 'police',
    address: 'Patrolling Rajpath - AIIMS Flyover',
    distance: '600 m',
    contact: 'Direct 112 Dispatch',
    open24_7: true,
    womenStaff: true,
    coordinates: [28.6105, 77.2185],
    rating: 5.0,
    features: ['GPS Live Tracking', '2 Female Officers', 'Rapid Response Siren', 'Dashcam Sync']
  },
  {
    id: 'haven-hospital-1',
    name: 'AIIMS Emergency Trauma Care',
    type: '24/7 Hospital & Trauma Center',
    category: 'medical',
    address: 'Sri Aurobindo Marg, AIIMS',
    distance: '1.2 km',
    contact: '+91 11-2658-8500',
    open24_7: true,
    womenStaff: true,
    coordinates: [28.5952, 77.2160],
    rating: 4.8,
    features: ['24/7 Trauma Desk', 'Security Guarded Entry', 'Safe Waiting Lounge', 'Ambulance Standby']
  },
  {
    id: 'haven-store-1',
    name: '24 Seven All-Night Superstore & Pharmacy',
    type: '24/7 Commercial Sanctuary',
    category: 'safe_zone',
    address: 'South Extension Part 2 Main Market',
    distance: '1.8 km',
    contact: '+91 11-4164-9900',
    open24_7: true,
    womenStaff: true,
    coordinates: [28.5801, 77.2110],
    rating: 4.7,
    features: ['Well-Lit Parking', 'Security Guards', 'Public Telephone', 'Active CCTV']
  },
  {
    id: 'haven-metro-control',
    name: 'Rajiv Chowk Metro Station Security Command',
    type: 'Transit Police Post',
    category: 'police',
    address: 'Connaught Place Outer Circle',
    distance: '450 m',
    contact: '+91 11-2341-7910',
    open24_7: true,
    womenStaff: true,
    coordinates: [28.6289, 77.2065],
    rating: 4.9,
    features: ['CISF Armed Guard', 'Holding Room', 'Panic Button Alarm Network', 'Female Constables']
  }
];

export const mockIncidents = [
  {
    id: 'inc-101',
    title: 'Streetlight Power Outage Reported',
    severity: 'MEDIUM',
    category: 'lighting',
    location: 'Rear Service Alley near Railway Gate',
    coordinates: [28.6080, 77.1950],
    timeAgo: '45 mins ago',
    verifiedBy: 'Municipal Smart Grid Monitoring',
    description: '3 street lamps are unpowered due to localized transformer fault. Maintenance crew dispatched.'
  },
  {
    id: 'inc-102',
    title: 'Suspicious Activity / Stalking Flagged',
    severity: 'HIGH',
    category: 'harassment',
    location: 'Unlit Lane behind Industrial Park',
    coordinates: [28.5910, 77.1960],
    timeAgo: '15 mins ago',
    verifiedBy: 'Community Safety Network Alert',
    description: 'Female commuter reported being followed by unidentified auto-rickshaw. Pink Patrol Unit notified.'
  },
  {
    id: 'inc-103',
    title: 'Safe Zone Active: Pink Booth Patrol',
    severity: 'SAFE',
    category: 'police_presence',
    location: 'Rajpath Flyover Exit',
    coordinates: [28.6105, 77.2185],
    timeAgo: 'Live Now',
    verifiedBy: 'Delhi Police Control Room',
    description: 'Pink Patrol vehicle standing by with active emergency beacon lights.'
  }
];
