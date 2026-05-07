import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { businesses, demoOrders, products } from '../data/mockData.js';
import { getProduct } from '../utils/formatters.js';

const MarketplaceContext = createContext(null);

const CART_STORAGE_KEY = 'localmart-cart';
const ROLE_STORAGE_KEY = 'localmart-role';
const SELLER_PROFILE_STORAGE_KEY = 'localmart-seller-profile';
const SELLER_PRODUCTS_STORAGE_KEY = 'localmart-seller-products';
const ORDERS_STORAGE_KEY = 'localmart-orders';
const LAST_ORDER_STORAGE_KEY = 'localmart-last-order';
const DELIVERY_FEE = 45;
const CURRENT_SELLER_ID = 'golden-hour-bakery';

const sellerBusiness = businesses.find((business) => business.id === CURRENT_SELLER_ID);

const defaultSellerProfile = {
  businessName: sellerBusiness.name,
  category: sellerBusiness.category,
  owner: sellerBusiness.ownerName,
  email: sellerBusiness.email,
  phone: sellerBusiness.phone,
  address: sellerBusiness.location,
  bio: sellerBusiness.bio,
  image: '',
};

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeSellerProduct(productInput, existingProduct = null) {
  const productName = (productInput.productName || productInput.name || '').trim();
  const stock = Math.max(0, Math.floor(Number(productInput.stock || productInput.quantity || 0)));
  const price = Math.max(0, Number(productInput.price || 0));
  const availabilityStatus = stock > 0 ? 'Available' : 'Out of stock';
  const id = productInput.id || `${slugify(productName || 'seller-product')}-${Date.now()}`;
  const createdAt = productInput.createdAt || existingProduct?.createdAt || new Date().toISOString().slice(0, 10);

  return {
    id,
    sellerId: CURRENT_SELLER_ID,
    businessId: CURRENT_SELLER_ID,
    sellerName: sellerBusiness.name,
    productName,
    name: productName,
    category: productInput.category || 'Food & Snacks',
    price,
    stock,
    description: (productInput.description || '').trim(),
    image: (productInput.image || '').trim(),
    availabilityStatus,
    availability: availabilityStatus,
    createdAt,
    rating: productInput.rating || existingProduct?.rating || 4.8,
    featured: productInput.featured || false,
    tags: [productInput.category || 'Food & Snacks', availabilityStatus, 'Seller managed'],
  };
}

const defaultSellerProducts = products
  .filter((product) => product.businessId === sellerBusiness.id)
  .map((product) => normalizeSellerProduct(product, product));

function readStorage(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The UI still works if storage is unavailable; it just will not persist.
  }
}

function normalizeQuantity(quantity) {
  const numeric = Number(quantity);
  return Number.isFinite(numeric) ? Math.max(0, Math.min(99, Math.floor(numeric))) : 0;
}

export function MarketplaceProvider({ children }) {
  const [activeRole, setActiveRole] = useState(() => readStorage(ROLE_STORAGE_KEY, 'guest'));
  const [cart, setCart] = useState(() => readStorage(CART_STORAGE_KEY, []));
  const [sellerProfile, setSellerProfile] = useState(() =>
    readStorage(SELLER_PROFILE_STORAGE_KEY, defaultSellerProfile),
  );
  const [sellerProducts, setSellerProducts] = useState(() =>
    readStorage(SELLER_PRODUCTS_STORAGE_KEY, defaultSellerProducts).map((product) =>
      normalizeSellerProduct(product, product),
    ),
  );
  const [orders, setOrders] = useState(() => readStorage(ORDERS_STORAGE_KEY, demoOrders));
  const [lastOrder, setLastOrder] = useState(() => readStorage(LAST_ORDER_STORAGE_KEY, null));

  useEffect(() => writeStorage(ROLE_STORAGE_KEY, activeRole), [activeRole]);
  useEffect(() => writeStorage(CART_STORAGE_KEY, cart), [cart]);
  useEffect(() => writeStorage(SELLER_PROFILE_STORAGE_KEY, sellerProfile), [sellerProfile]);
  useEffect(() => writeStorage(SELLER_PRODUCTS_STORAGE_KEY, sellerProducts), [sellerProducts]);
  useEffect(() => writeStorage(ORDERS_STORAGE_KEY, orders), [orders]);
  useEffect(() => writeStorage(LAST_ORDER_STORAGE_KEY, lastOrder), [lastOrder]);

  const marketplaceProducts = useMemo(
    () => [
      ...products.filter((product) => product.businessId !== sellerBusiness.id),
      ...sellerProducts,
    ],
    [sellerProducts],
  );

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => ({
          ...item,
          product: getProduct(marketplaceProducts, item.productId),
        }))
        .filter((item) => item.product),
    [cart, marketplaceProducts],
  );

  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [cartItems],
  );

  const addToCart = (productId, quantity = 1) => {
    const increment = normalizeQuantity(quantity) || 1;
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);

      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: normalizeQuantity(item.quantity + increment) }
            : item,
        );
      }

      return [...current, { productId, quantity: increment }];
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    const nextQuantity = normalizeQuantity(quantity);
    setCart((current) => {
      if (nextQuantity === 0) {
        return current.filter((item) => item.productId !== productId);
      }

      return current.map((item) =>
        item.productId === productId ? { ...item, quantity: nextQuantity } : item,
      );
    });
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.productId !== productId));
  };

  const clearCart = () => setCart([]);

  const createMockOrder = ({ buyer, fulfillment, paymentMethod }) => {
    const orderNumber = `ML-${Date.now().toString().slice(-6)}`;
    const today = new Date().toISOString().slice(0, 10);
    const sellerGroups = cartItems.reduce((groups, item) => {
      const sellerId = item.product.sellerId || item.product.businessId;
      const seller = businesses.find((business) => business.id === sellerId);
      const existing = groups[sellerId] || {
        sellerId,
        sellerName: seller?.name || item.product.sellerName || 'Local seller',
        items: [],
        total: 0,
      };

      existing.items.push({
        productId: item.productId,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
      });
      existing.total += item.product.price * item.quantity;
      groups[sellerId] = existing;
      return groups;
    }, {});

    const order = {
      id: orderNumber,
      buyerId: 'buyer-local-demo',
      buyerName: buyer.name,
      buyerEmail: buyer.email,
      buyerPhone: buyer.phone,
      status: 'new',
      orderDate: today,
      placedAt: 'Just now',
      fulfillment,
      paymentMethod,
      total: cartSubtotal + (fulfillment === 'Delivery' ? DELIVERY_FEE : 0),
      items: cartItems.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
      })),
      sellerGroups: Object.values(sellerGroups),
    };

    setOrders((current) => [order, ...current]);
    setLastOrder(order);
    clearCart();
    return order;
  };

  const updateSellerProfile = (updates) => {
    setSellerProfile((current) => ({ ...current, ...updates }));
  };

  const saveSellerProduct = (productInput) => {
    const savedProduct = normalizeSellerProduct(productInput);

    setSellerProducts((current) => {
      if (productInput.id) {
        return current.map((product) => {
          if (product.id !== productInput.id) return product;

          return normalizeSellerProduct({ ...product, ...productInput }, product);
        });
      }

      return [savedProduct, ...current];
    });

    return savedProduct;
  };

  const deleteSellerProduct = (productId) => {
    setSellerProducts((current) => current.filter((product) => product.id !== productId));
  };

  const value = useMemo(
    () => ({
      activeRole,
      addToCart,
      cartItemCount,
      cartItems,
      cartSubtotal,
      clearCart,
      createMockOrder,
      deleteSellerProduct,
      lastOrder,
      marketplaceProducts,
      orders,
      removeFromCart,
      saveSellerProduct,
      sellerProducts,
      sellerProfile,
      setActiveRole,
      updateCartQuantity,
      updateSellerProfile,
    }),
    [
      activeRole,
      cartItemCount,
      cartItems,
      cartSubtotal,
      marketplaceProducts,
      orders,
      lastOrder,
      sellerProducts,
      sellerProfile,
    ],
  );

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);

  if (!context) {
    throw new Error('useMarketplace must be used inside MarketplaceProvider');
  }

  return context;
}
