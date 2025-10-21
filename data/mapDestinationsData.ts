
export type TripType = 'beach' | 'mountain' | 'city' | 'cultural' | 'adventure' | 'romantic' | 'luxury';
export type Continent = 'africa' | 'asia' | 'europe' | 'north_america' | 'oceania';
export type BudgetRange = 'budget' | 'moderate' | 'luxury' | 'ultra_luxury';

export interface MapDestination {
  id: string;
  name: string;
  country: string;
  continent: Continent;
  coordinates: [number, number]; // [latitude, longitude]
  tripTypes: TripType[];
  budgetRange: BudgetRange;
  price: number;
  nights: number;
  image: string;
  shortDescription: string;
  highlights: string[];
  slug: string;
}

export const mapDestinations: MapDestination[] = [
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    continent: 'europe',
    coordinates: [52.5200, 13.4050],
    tripTypes: ['city', 'cultural'],
    budgetRange: 'luxury',
    price: 14196,
    nights: 7,
    image: '/Destiantions/berlin.jpg',
    shortDescription: 'Explore the vibrant capital of Germany with its rich history and modern culture',
    highlights: ['Brandenburg Gate', 'Museum Island', 'Berlin Wall Memorial'],
    slug: 'berlin'
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    continent: 'asia',
    coordinates: [-8.3405, 115.0920],
    tripTypes: ['beach', 'cultural', 'romantic', 'luxury'],
    budgetRange: 'luxury',
    price: 13832,
    nights: 9,
    image: '/Destiantions/bali.jpg',
    shortDescription: 'Paradise island with stunning beaches, temples, and lush rice terraces',
    highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Beach Clubs'],
    slug: 'bali'
  },
  {
    id: 'venice',
    name: 'Venice',
    country: 'Italy',
    continent: 'europe',
    coordinates: [45.4408, 12.3155],
    tripTypes: ['city', 'cultural', 'romantic'],
    budgetRange: 'luxury',
    price: 17472,
    nights: 6,
    image: '/Destiantions/venice.jpg',
    shortDescription: 'The floating city of romance, art, and timeless beauty',
    highlights: ['Grand Canal', 'St. Mark\'s Basilica', 'Gondola Rides'],
    slug: 'venice'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    continent: 'asia',
    coordinates: [25.2048, 55.2708],
    tripTypes: ['city', 'luxury', 'beach'],
    budgetRange: 'luxury',
    price: 11648,
    nights: 5,
    image: '/Destiantions/dubai.jpg',
    shortDescription: 'Modern metropolis of luxury, innovation, and Arabian hospitality',
    highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Desert Safari'],
    slug: 'dubai'
  },
  {
    id: 'damascus',
    name: 'Damascus',
    country: 'Syria',
    continent: 'asia',
    coordinates: [33.5138, 36.2765],
    tripTypes: ['cultural', 'city'],
    budgetRange: 'moderate',
    price: 9100,
    nights: 8,
    image: '/Destiantions/damascus.jpg',
    shortDescription: 'One of the oldest continuously inhabited cities in the world',
    highlights: ['Umayyad Mosque', 'Old City', 'Souq al-Hamidiyya'],
    slug: 'damascus'
  },
  {
    id: 'cairo',
    name: 'Cairo',
    country: 'Egypt',
    continent: 'africa',
    coordinates: [30.0444, 31.2357],
    tripTypes: ['cultural', 'city', 'adventure'],
    budgetRange: 'luxury',
    price: 12740,
    nights: 8,
    image: '/Destiantions/cairo.jpg',
    shortDescription: 'Ancient wonders meet modern civilization in Egypt\'s bustling capital',
    highlights: ['Pyramids of Giza', 'Egyptian Museum', 'Nile River Cruise'],
    slug: 'cairo'
  },
  {
    id: 'new_york',
    name: 'New York',
    country: 'USA',
    continent: 'north_america',
    coordinates: [40.7128, -74.0060],
    tripTypes: ['city', 'cultural'],
    budgetRange: 'ultra_luxury',
    price: 21112,
    nights: 8,
    image: '/Destiantions/new_york.jpg',
    shortDescription: 'The city that never sleeps - iconic skyline and endless possibilities',
    highlights: ['Statue of Liberty', 'Central Park', 'Times Square'],
    slug: 'new_york'
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    continent: 'europe',
    coordinates: [51.5074, -0.1278],
    tripTypes: ['city', 'cultural'],
    budgetRange: 'luxury',
    price: 18928,
    nights: 7,
    image: '/Destiantions/london.jpg',
    shortDescription: 'Royal heritage, world-class museums, and vibrant cosmopolitan culture',
    highlights: ['Buckingham Palace', 'Tower of London', 'British Museum'],
    slug: 'london'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    continent: 'asia',
    coordinates: [3.2028, 73.2207],
    tripTypes: ['beach', 'romantic', 'luxury'],
    budgetRange: 'ultra_luxury',
    price: 36036,
    nights: 10,
    image: '/Destiantions/maldives.jpg',
    shortDescription: 'Tropical paradise with crystal-clear waters and overwater bungalows',
    highlights: ['Private Islands', 'Underwater Restaurant', 'Diving & Snorkeling'],
    slug: 'maldives'
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    continent: 'europe',
    coordinates: [36.3932, 25.4615],
    tripTypes: ['beach', 'romantic', 'cultural'],
    budgetRange: 'luxury',
    price: 15288,
    nights: 7,
    image: '/Destiantions/santorini.jpg',
    shortDescription: 'Stunning sunsets, white-washed buildings, and Aegean Sea views',
    highlights: ['Oia Sunset', 'Red Beach', 'Wine Tasting'],
    slug: 'santorini'
  }
];

// Helper functions for filtering
export const getContinents = (): Continent[] => {
  return ['africa', 'asia', 'europe', 'north_america', 'oceania'];
};

export const getTripTypes = (): TripType[] => {
  return ['beach', 'mountain', 'city', 'cultural', 'adventure', 'romantic', 'luxury'];
};

export const getBudgetRanges = (): BudgetRange[] => {
  return ['budget', 'moderate', 'luxury', 'ultra_luxury'];
};

// Color coding for trip types
export const tripTypeColors: Record<TripType, string> = {
  beach: '#00B4D8',      // Cyan
  mountain: '#8B4513',   // Brown
  city: '#6C757D',       // Gray
  cultural: '#9B59B6',   // Purple
  adventure: '#E74C3C',  // Red
  romantic: '#E91E63',   // Pink
  luxury: '#D4AF37'      // Gold
};
