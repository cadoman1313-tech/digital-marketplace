export const buyerProfiles = [
  {
    id: 'buyer-masego',
    name: 'Masego Kgosi',
    email: 'masego@example.com',
    phone: '+267 72 555 148',
    location: 'Tlokweng, Botswana',
    memberSince: 'March 2026',
    savedProductIds: ['seasonal-market-box', 'weekly-stem-bundle', 'linen-table-runner', 'botanical-face-oil'],
  },
  {
    id: 'buyer-thabo',
    name: 'Thabo Molefe',
    email: 'thabo@example.com',
    phone: '+267 73 555 181',
    location: 'Molepolole, Botswana',
    memberSince: 'January 2026',
    savedProductIds: ['braided-usb-c', 'cotton-market-tote'],
  },
  {
    id: 'buyer-neo',
    name: 'Neo Raditlhokwa',
    email: 'neo@example.com',
    phone: '+267 74 555 174',
    location: 'Francistown, Botswana',
    memberSince: 'April 2026',
    savedProductIds: ['heritage-sourdough', 'hand-poured-candle'],
  },
];

export const buyerById = Object.fromEntries(buyerProfiles.map((buyer) => [buyer.id, buyer]));
