export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getBusiness(businesses, businessId) {
  return businesses.find((business) => business.id === businessId);
}

export function getProduct(products, productId) {
  return products.find((product) => product.id === productId);
}
