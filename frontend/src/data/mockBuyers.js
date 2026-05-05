export const buyerProfiles = [
  {
    id: 'buyer-nomsa',
    name: 'Nomsa Dlamini',
    email: 'nomsa@example.com',
    phone: '+27 72 555 0148',
    location: 'Rosebank, Johannesburg',
    memberSince: 'March 2026',
    savedProductIds: ['seasonal-market-box', 'weekly-stem-bundle', 'linen-table-runner', 'botanical-face-oil'],
  },
  {
    id: 'buyer-daniel',
    name: 'Daniel Naidoo',
    email: 'daniel@example.com',
    phone: '+27 73 555 0181',
    location: 'Randburg, Johannesburg',
    memberSince: 'January 2026',
    savedProductIds: ['braided-usb-c', 'cotton-market-tote'],
  },
  {
    id: 'buyer-grace',
    name: 'Grace Maseko',
    email: 'grace@example.com',
    phone: '+27 74 555 0174',
    location: 'Melville, Johannesburg',
    memberSince: 'April 2026',
    savedProductIds: ['heritage-sourdough', 'hand-poured-candle'],
  },
];

export const buyerById = Object.fromEntries(buyerProfiles.map((buyer) => [buyer.id, buyer]));
