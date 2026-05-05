// Local demo data powers the prototype until the PHP API is connected.
export const businesses = [
  {
    id: 'green-basket-grocers',
    name: 'Green Basket Grocers',
    category: 'Fresh Produce',
    city: 'Rosebank',
    distance: '1.4 km',
    rating: 4.9,
    verified: true,
    owner: 'Maya Nkosi',
    phone: '+27 11 555 0198',
    email: 'hello@greenbasket.local',
    address: '18 Willow Lane, Rosebank',
    description:
      'A family-run grocer focused on seasonal produce, pantry staples, and same-day local pickup.',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'golden-hour-bakery',
    name: 'Golden Hour Bakery',
    category: 'Bakery',
    city: 'Parkhurst',
    distance: '2.1 km',
    rating: 4.8,
    verified: true,
    owner: 'Theo Jacobs',
    phone: '+27 11 555 0134',
    email: 'orders@goldenhour.local',
    address: '7 Fourth Avenue, Parkhurst',
    description:
      'Slow-fermented breads, pastries, and celebration cakes baked before sunrise every morning.',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'clay-and-grain',
    name: 'Clay & Grain Studio',
    category: 'Homeware',
    city: 'Braamfontein',
    distance: '4.8 km',
    rating: 4.7,
    verified: true,
    owner: 'Lena Mokoena',
    phone: '+27 11 555 0107',
    email: 'studio@clayandgrain.local',
    address: '42 Juta Street, Braamfontein',
    description:
      'Small-batch ceramics, linen, and handcrafted pieces made for warm modern homes.',
    image:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'little-leaf-florals',
    name: 'Little Leaf Florals',
    category: 'Florist',
    city: 'Melville',
    distance: '3.6 km',
    rating: 4.9,
    verified: true,
    owner: 'Aisha Patel',
    phone: '+27 11 555 0172',
    email: 'bloom@littleleaf.local',
    address: '3 7th Street, Melville',
    description:
      'Florist studio creating fresh bouquets, dried arrangements, and weekly stems for local homes.',
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80',
  },
];

export const products = [
  {
    id: 'seasonal-market-box',
    name: 'Seasonal Market Box',
    businessId: 'green-basket-grocers',
    category: 'Fresh Produce',
    price: 389,
    rating: 4.9,
    stock: 18,
    featured: true,
    tags: ['Same-day pickup', 'Seasonal'],
    description:
      'A generous produce box with leafy greens, root vegetables, orchard fruit, fresh herbs, and a rotating pantry surprise from nearby farms.',
    image:
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'heritage-sourdough',
    name: 'Heritage Sourdough Loaf',
    businessId: 'golden-hour-bakery',
    category: 'Bakery',
    price: 74,
    rating: 4.8,
    stock: 32,
    featured: true,
    tags: ['Baked today', 'Pickup ready'],
    description:
      'A naturally leavened sourdough with a deep crust, soft open crumb, and stone-ground flour from a regional mill.',
    image:
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ceramic-breakfast-set',
    name: 'Hand-Thrown Breakfast Set',
    businessId: 'clay-and-grain',
    category: 'Homeware',
    price: 640,
    rating: 4.7,
    stock: 6,
    featured: true,
    tags: ['Handmade', 'Limited run'],
    description:
      'Two speckled clay mugs and two shallow bowls finished in a soft oat glaze. Each piece is handmade and subtly unique.',
    image:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'weekly-stem-bundle',
    name: 'Weekly Stem Bundle',
    businessId: 'little-leaf-florals',
    category: 'Florist',
    price: 215,
    rating: 4.9,
    stock: 12,
    featured: false,
    tags: ['Fresh cut', 'Giftable'],
    description:
      'A florist-selected bundle of fresh seasonal stems wrapped in kraft paper with a simple care card.',
    image:
      'https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'olive-rosemary-focaccia',
    name: 'Olive & Rosemary Focaccia',
    businessId: 'golden-hour-bakery',
    category: 'Bakery',
    price: 96,
    rating: 4.8,
    stock: 14,
    featured: false,
    tags: ['Baked today'],
    description:
      'Golden tray-baked focaccia with brined olives, rosemary, and a crisp olive-oil edge.',
    image:
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'linen-table-runner',
    name: 'Washed Linen Table Runner',
    businessId: 'clay-and-grain',
    category: 'Homeware',
    price: 420,
    rating: 4.6,
    stock: 9,
    featured: false,
    tags: ['Natural linen'],
    description:
      'A warm stone-coloured linen runner made for everyday tables, soft enough for casual meals and refined enough for hosting.',
    image:
      'https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pantry-starter-kit',
    name: 'Local Pantry Starter Kit',
    businessId: 'green-basket-grocers',
    category: 'Pantry',
    price: 525,
    rating: 4.9,
    stock: 10,
    featured: false,
    tags: ['Local makers', 'Best value'],
    description:
      'Olive oil, small-batch jam, roasted nuts, honey, and heirloom grains from trusted regional makers.',
    image:
      'https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'dried-flower-vase',
    name: 'Dried Flower Vase Arrangement',
    businessId: 'little-leaf-florals',
    category: 'Florist',
    price: 355,
    rating: 4.7,
    stock: 5,
    featured: false,
    tags: ['Lasting stems'],
    description:
      'A textured dried arrangement in warm neutrals, arranged by hand and ready to place at home.',
    image:
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=80',
  },
];

export const buyerProfiles = [
  {
    id: 'buyer-nomsa',
    name: 'Nomsa Dlamini',
    email: 'nomsa@example.com',
    location: 'Rosebank, Johannesburg',
    memberSince: 'March 2026',
    savedProductIds: ['seasonal-market-box', 'weekly-stem-bundle', 'linen-table-runner'],
  },
];

export const sellerAccounts = [
  {
    id: 'seller-golden-hour',
    name: 'Theo Jacobs',
    email: 'theo@goldenhour.local',
    businessId: 'golden-hour-bakery',
    role: 'Owner',
  },
];

export const customerOrders = [
  {
    id: 'ML-1048',
    businessId: 'golden-hour-bakery',
    status: 'ready',
    placedAt: 'Today, 09:15',
    fulfillment: 'Pickup',
    total: 244,
    items: ['Heritage Sourdough Loaf', 'Olive & Rosemary Focaccia'],
  },
  {
    id: 'ML-1039',
    businessId: 'green-basket-grocers',
    status: 'processing',
    placedAt: 'Yesterday, 16:42',
    fulfillment: 'Delivery',
    total: 389,
    items: ['Seasonal Market Box'],
  },
  {
    id: 'ML-1021',
    businessId: 'clay-and-grain',
    status: 'completed',
    placedAt: 'Apr 28, 14:10',
    fulfillment: 'Delivery',
    total: 640,
    items: ['Hand-Thrown Breakfast Set'],
  },
];

export const businessOrders = [
  {
    id: 'ML-1048',
    customer: 'Nomsa Dlamini',
    status: 'ready',
    placedAt: 'Today, 09:15',
    fulfillment: 'Pickup',
    total: 244,
    items: 3,
  },
  {
    id: 'ML-1045',
    customer: 'Daniel Naidoo',
    status: 'new',
    placedAt: 'Today, 08:24',
    fulfillment: 'Delivery',
    total: 368,
    items: 4,
  },
  {
    id: 'ML-1042',
    customer: 'Grace Maseko',
    status: 'processing',
    placedAt: 'Yesterday, 17:05',
    fulfillment: 'Pickup',
    total: 148,
    items: 2,
  },
  {
    id: 'ML-1034',
    customer: 'Jules Meyer',
    status: 'completed',
    placedAt: 'Apr 29, 12:31',
    fulfillment: 'Delivery',
    total: 520,
    items: 5,
  },
];

export const adminApprovals = [
  {
    id: 'BA-219',
    business: 'Northside Coffee Co.',
    owner: 'Sipho Khumalo',
    category: 'Cafe',
    submitted: '2 hours ago',
    status: 'pending',
  },
  {
    id: 'BA-216',
    business: 'The Soap Room',
    owner: 'Priya Singh',
    category: 'Self Care',
    submitted: 'Yesterday',
    status: 'pending',
  },
  {
    id: 'BA-214',
    business: 'Urban Seedlings',
    owner: 'Kate Botha',
    category: 'Garden',
    submitted: 'May 1',
    status: 'reviewing',
  },
];

export const categories = ['All', 'Fresh Produce', 'Bakery', 'Homeware', 'Florist', 'Pantry'];
