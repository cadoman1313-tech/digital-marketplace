export { buyerProfiles, buyerById } from './mockBuyers.js';
export { demoOrders, demoOrders as businessOrders, demoOrders as customerOrders } from './mockOrders.js';
export { categories, products } from './mockProducts.js';
export { sellers as businesses, sellers, sellerById } from './mockSellers.js';

export const sellerAccounts = [
  {
    id: 'seller-golden-hour',
    name: 'Thato Motsumi',
    email: 'thato@goldenkalahari.local',
    businessId: 'golden-hour-bakery',
    role: 'Owner',
  },
];

export const botswanaAreas = [
  'Gaborone',
  'Francistown',
  'Maun',
  'Kasane',
  'Palapye',
  'Lobatse',
  'Molepolole',
  'Serowe',
  'Selebi-Phikwe',
  'Kanye',
  'Mochudi',
  'Jwaneng',
  'Tlokweng',
];

export const adminApprovals = [
  {
    id: 'BA-219',
    business: 'Mochudi Coffee Cart',
    owner: 'Gaone Mosinyi',
    category: 'Food & Snacks',
    submitted: '2 hours ago',
    status: 'pending',
  },
  {
    id: 'BA-216',
    business: 'Kalahari Soap Room',
    owner: 'Tebogo Phiri',
    category: 'Beauty & Skincare',
    submitted: 'Yesterday',
    status: 'pending',
  },
  {
    id: 'BA-214',
    business: 'Palapye Seedlings',
    owner: 'Keabetswe Mmereki',
    category: 'Fresh Produce',
    submitted: 'May 1',
    status: 'reviewing',
  },
];
