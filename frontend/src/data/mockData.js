export { buyerProfiles, buyerById } from './mockBuyers.js';
export { demoOrders, demoOrders as businessOrders, demoOrders as customerOrders } from './mockOrders.js';
export { categories, products } from './mockProducts.js';
export { sellers as businesses, sellers, sellerById } from './mockSellers.js';

export const sellerAccounts = [
  {
    id: 'seller-golden-hour',
    name: 'Theo Jacobs',
    email: 'theo@goldenhour.local',
    businessId: 'golden-hour-bakery',
    role: 'Owner',
  },
];

export const adminApprovals = [
  {
    id: 'BA-219',
    business: 'Northside Coffee Co.',
    owner: 'Sipho Khumalo',
    category: 'Food & Snacks',
    submitted: '2 hours ago',
    status: 'pending',
  },
  {
    id: 'BA-216',
    business: 'The Soap Room',
    owner: 'Priya Singh',
    category: 'Beauty & Skincare',
    submitted: 'Yesterday',
    status: 'pending',
  },
  {
    id: 'BA-214',
    business: 'Urban Seedlings',
    owner: 'Kate Botha',
    category: 'Fresh Produce',
    submitted: 'May 1',
    status: 'reviewing',
  },
];
