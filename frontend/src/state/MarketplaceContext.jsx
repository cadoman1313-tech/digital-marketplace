import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { businesses, products } from '../data/mockData.js';
import { getProduct } from '../utils/formatters.js';

const MarketplaceContext = createContext(null);

const CART_STORAGE_KEY = 'marketlane-cart';
const ROLE_STORAGE_KEY = 'marketlane-role';
const SELLER_PROFILE_STORAGE_KEY = 'marketlane-seller-profile';
const SELLER_PRODUCTS_STORAGE_KEY = 'marketlane-seller-products';

const sellerBusiness = businesses.find((business) => business.id === 'golden-hour-bakery');

const defaultSellerProfile = {
  businessName: sellerBusiness.name,
  category: sellerBusiness.category,
  owner: sellerBusiness.owner,
  email: sellerBusiness.email,
  phone: sellerBusiness.phone,
  address: sellerBusiness.address,
  bio: sellerBusiness.description,
  image: '',
};

const defaultSellerProducts = products
  .filter((product) => product.businessId === sellerBusiness.id)
  .map((product) => ({
    ...product,
    availability: product.stock > 0 ? 'Available' : 'Out of stock',
  }));

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
    readStorage(SELLER_PRODUCTS_STORAGE_KEY, defaultSellerProducts),
  );

  useEffect(() => writeStorage(ROLE_STORAGE_KEY, activeRole), [activeRole]);
  useEffect(() => writeStorage(CART_STORAGE_KEY, cart), [cart]);
  useEffect(() => writeStorage(SELLER_PROFILE_STORAGE_KEY, sellerProfile), [sellerProfile]);
  useEffect(() => writeStorage(SELLER_PRODUCTS_STORAGE_KEY, sellerProducts), [sellerProducts]);

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

  const updateSellerProfile = (updates) => {
    setSellerProfile((current) => ({ ...current, ...updates }));
  };

  const saveSellerProduct = (productInput) => {
    setSellerProducts((current) => {
      if (productInput.id) {
        return current.map((product) =>
          product.id === productInput.id ? { ...product, ...productInput } : product,
        );
      }

      const id = `${productInput.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;

      return [
        {
          id,
          businessId: sellerBusiness.id,
          rating: 4.8,
          featured: false,
          tags: ['Seller managed'],
          ...productInput,
        },
        ...current,
      ];
    });
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
      deleteSellerProduct,
      marketplaceProducts,
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
