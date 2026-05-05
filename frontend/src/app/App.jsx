import { Navigate, Route, Routes } from 'react-router-dom';
import { SiteHeader } from '../components/layout/SiteHeader.jsx';
import { CheckoutPage } from '../pages/checkout/CheckoutPage.jsx';
import { OrderSuccessPage } from '../pages/checkout/OrderSuccessPage.jsx';
import { LandingPage } from '../pages/landing/LandingPage.jsx';
import { BuyerDashboardPage } from '../pages/buyer/dashboard/BuyerDashboardPage.jsx';
import { BuyerLoginPage } from '../pages/buyer/login/BuyerLoginPage.jsx';
import { BuyerRegisterPage } from '../pages/buyer/register/BuyerRegisterPage.jsx';
import { SellerDashboardPage } from '../pages/seller/dashboard/SellerDashboardPage.jsx';
import { SellerLoginPage } from '../pages/seller/login/SellerLoginPage.jsx';
import { SellerProfilePage } from '../pages/seller/profile/SellerProfilePage.jsx';
import { SellerRegisterPage } from '../pages/seller/register/SellerRegisterPage.jsx';
import { SellersPage } from '../pages/seller/list/SellersPage.jsx';
import { MarketplacePage } from '../pages/customer/marketplace/MarketplacePage.jsx';
import { ProductDetailsPage } from '../pages/customer/product-details/ProductDetailsPage.jsx';
import { CartPage } from '../pages/customer/cart/CartPage.jsx';
import { CustomerOrdersPage } from '../pages/customer/orders/CustomerOrdersPage.jsx';
import { BusinessProfilePage } from '../pages/business/profile/BusinessProfilePage.jsx';
import { ProductManagementPage } from '../pages/business/products/ProductManagementPage.jsx';
import { BusinessOrderManagementPage } from '../pages/business/orders/BusinessOrderManagementPage.jsx';
import { AdminDashboardPage } from '../pages/admin/dashboard/AdminDashboardPage.jsx';

export default function App() {
  return (
    <div className="app">
      <SiteHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Navigate to="/buyer/login" replace />} />
        <Route path="/register" element={<Navigate to="/buyer/register" replace />} />
        <Route path="/buyer/login" element={<BuyerLoginPage />} />
        <Route path="/buyer/register" element={<BuyerRegisterPage />} />
        <Route path="/buyer/dashboard" element={<BuyerDashboardPage />} />
        <Route path="/seller/login" element={<SellerLoginPage />} />
        <Route path="/seller/register" element={<SellerRegisterPage />} />
        <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
        <Route path="/seller/:sellerId" element={<SellerProfilePage />} />
        <Route path="/sellers" element={<SellersPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/orders" element={<CustomerOrdersPage />} />
        <Route path="/business" element={<SellerDashboardPage />} />
        <Route path="/business/profile" element={<BusinessProfilePage />} />
        <Route path="/business/products" element={<ProductManagementPage />} />
        <Route path="/business/orders" element={<BusinessOrderManagementPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
