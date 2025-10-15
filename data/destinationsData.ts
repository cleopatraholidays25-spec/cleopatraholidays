
export type Category = 'relaxation' | 'adventure' | 'cultural';

export interface Destination {
  slug: string;
  image: string;
  categories: Category[];
  galleryImages: string[];
  price: number;
  nights: number;
  included: string[];
}

export const destinationsData: Destination[] = [
  {
    slug: 'berlin',
    image: '/Destiantions/berlin.jpg',
    categories: ['cultural'],
    galleryImages: [
      'https://images.unsplash.com/photo-1602617385826-3678795603e3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618749651770-a2613f10d391?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1614673643604-80f75a27de57?w=800&h=600&fit=crop',
    ],
    price: 14196,
    nights: 7,
    included: ['flights', 'hotel_5_star', 'private_tours', 'transfers', 'daily_breakfast']
  },

  {
    slug: 'bali',
    image: '/Destiantions/bali.jpg',
    categories: ['relaxation', 'cultural'],
    galleryImages: [
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    ],
    price: 13832,
    nights: 9,
    included: ['flights', 'hotel_5_star', 'transfers', 'daily_breakfast']
  },
  {
    slug: 'venice',
    image: '/Destiantions/venice.jpg',
    categories: ['cultural', 'relaxation'],
    galleryImages: [
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=800&h=600&fit=crop',
    ],
    price: 17472,
    nights: 6,
    included: ['flights', 'hotel_5_star', 'private_tours', 'transfers', 'daily_breakfast']
  },
  {
    slug: 'dubai',
    image: '/Destiantions/dubai.jpg',
    categories: ['cultural', 'relaxation'],
    galleryImages: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    ],
    price: 11648,
    nights: 5,
    included: ['flights', 'hotel_5_star', 'transfers', 'daily_breakfast']
  },

  {
    slug: 'damascus',
    image: '/Destiantions/damascus.jpg',
    categories: ['cultural'],
    galleryImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
    ],
    price: 9100,
    nights: 8,
    included: ['hotel_5_star', 'private_tours', 'transfers', 'daily_breakfast', 'exclusive_access']
  },
  {
    slug: 'cairo',
    image: '/Destiantions/cairo.jpg',
    categories: ['cultural'],
    galleryImages: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73fb6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    ],
    price: 12740,
    nights: 8,
    included: ['flights', 'hotel_5_star', 'private_tours', 'transfers', 'daily_breakfast', 'exclusive_access']
  },
  {
    slug: 'new_york',
    image: '/Destiantions/new_york.jpg',
    categories: ['cultural'],
    galleryImages: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    ],
    price: 21112,
    nights: 8,
    included: ['flights', 'hotel_5_star', 'private_tours', 'transfers', 'daily_breakfast']
  },
  {
    slug: 'london',
    image: '/Destiantions/london.jpg',
    categories: ['cultural'],
    galleryImages: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    ],
    price: 18928,
    nights: 7,
    included: ['flights', 'hotel_5_star', 'private_tours', 'transfers', 'daily_breakfast', 'exclusive_access']
  },
  {
    slug: 'maldives',
    image: '/Destiantions/maldives.jpg',
    categories: ['relaxation'],
    galleryImages: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    ],
    price: 36036,
    nights: 10,
    included: ['flights', 'hotel_5_star', 'transfers', 'daily_breakfast']
  },
  {
    slug: 'santorini',
    image: '/Destiantions/santorini.jpg',
    categories: ['relaxation', 'cultural'],
    galleryImages: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    ],
    price: 15288,
    nights: 7,
    included: ['flights', 'hotel_5_star', 'private_tours', 'transfers', 'daily_breakfast']
  }
];
