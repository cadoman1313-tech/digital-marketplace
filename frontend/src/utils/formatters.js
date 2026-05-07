export function formatCurrency(amount) {
  const numericAmount = Number(amount) || 0;

  return `P${new Intl.NumberFormat('en-BW', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount)}`;
}

export function getBusiness(businesses, businessId) {
  return businesses.find((business) => business.id === businessId);
}

export function getProduct(products, productId) {
  return products.find((product) => product.id === productId);
}
