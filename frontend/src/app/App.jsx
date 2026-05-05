import { Navigate, Route, Routes } from 'react-router-dom';
import { SiteHeader } from '../components/layout/SiteHeader.jsx';
import { LandingPage } from '../pages/landing/LandingPage.jsx';
import { LoginPage } from '../pages/auth/login/LoginPage.jsx';
import { RegisterPage } from '../pages/auth/register/RegisterPage.jsx';
import { MarketplacePage } from '../pages/customer/marketplace/MarketplacePage.jsx';
import { ProductDetailsPage } from '../pages/customer/product-details/ProductDetailsPage.jsx';
import { CartPage } from '../pages/customer/cart/CartPage.jsx';
import { CustomerOrdersPage } from '../pages/customer/orders/CustomerOrdersPage.jsx';
import { BusinessDashboardPage } from '../pages/business/dashboard/BusinessDashboardPage.jsx';
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<CustomerOrdersPage />} />
        <Route path="/business" element={<BusinessDashboardPage />} />
        <Route path="/business/profile" element={<BusinessProfilePage />} />
        <Route path="/business/products" element={<ProductManagementPage />} />
        <Route path="/business/orders" element={<BusinessOrderManagementPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
