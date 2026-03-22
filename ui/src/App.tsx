import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
const Help = lazy(() => import('./pages/Help'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const HelpCategory = lazy(() => import('./pages/HelpCategory'));
const HelpArticle = lazy(() => import('./pages/HelpArticle'));

// Public pages
import Storefront from './pages/Storefront';
const Product = lazy(() => import('./pages/Product'));
const Category = lazy(() => import('./pages/Category'));
const Discover = lazy(() => import('./pages/Discover'));
const StoreProfile = lazy(() => import('./pages/StoreProfile'));
const FindMyMatch = lazy(() => import('./pages/FindMyMatch'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const ShoppingCart = lazy(() => import('./pages/ShoppingCart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderDetail = lazy(() => import('./pages/OrderDetail'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const About = lazy(() => import('./pages/About'));

// Auth pages
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));
const VendorRegister = lazy(() => import('./pages/Auth/VendorRegister'));
const VerifyEmail = lazy(() => import('./pages/Auth/VerifyEmail'));

// Legal pages
const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/Legal/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/Legal/CookiePolicy'));

// Customer pages
const CustomerLayout = lazy(() => import('./components/CustomerLayout'));
const Reservations = lazy(() => import('./pages/Customer/Reservations'));
const ReservationDetail = lazy(() => import('./pages/Customer/ReservationDetail'));
const Wishlist = lazy(() => import('./pages/Customer/Wishlist'));
const Profile = lazy(() => import('./pages/Customer/Profile'));
const Notifications = lazy(() => import('./pages/Customer/Notifications'));
const CustomerReviews = lazy(() => import('./pages/Customer/Reviews'));
const CustomerSettings = lazy(() => import('./pages/Customer/Settings'));

// Vendor pages
const VendorLayout = lazy(() => import('./components/VendorLayout'));
const VendorDashboard = lazy(() => import('./pages/Vendor/Dashboard'));
const VendorStatus = lazy(() => import('./pages/Vendor/Status'));
const VendorReservations = lazy(() => import('./pages/Vendor/Reservations'));
const VendorReservationDetail = lazy(() => import('./pages/Vendor/ReservationDetail'));
const VendorProducts = lazy(() => import('./pages/Vendor/Products'));
const ProductCreate = lazy(() => import('./pages/Vendor/ProductCreate'));
const ProductEdit = lazy(() => import('./pages/Vendor/ProductEdit'));
const StoreEditor = lazy(() => import('./pages/Vendor/StoreEditor'));
const VendorAnalytics = lazy(() => import('./pages/Vendor/Analytics'));
const VendorReviews = lazy(() => import('./pages/Vendor/Reviews'));
const VendorNotifications = lazy(() => import('./pages/Vendor/Notifications'));
const VendorSettings = lazy(() => import('./pages/Vendor/Settings'));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-2 border-gray-700 border-t-primary-600" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes — GuestLayout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Storefront />} />
            <Route path="product" element={<Product />} />
            <Route path="products/:slug" element={<Product />} />
            <Route path="category" element={<Category />} />
            <Route path="discover" element={<Discover />} />
            <Route path="stores/:slug" element={<StoreProfile />} />
            <Route path="find-my-match" element={<FindMyMatch />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="cart" element={<ShoppingCart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-detail" element={<OrderDetail />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="cookies" element={<CookiePolicy />} />
            <Route path="about" element={<About />} />
            <Route path="help" element={<Help />} />
            <Route path="help/category/:slug" element={<HelpCategory />} />
            <Route path="help/articles/:slug" element={<HelpArticle />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />

            {/* Auth routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="vendor/register" element={<VendorRegister />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="verify-email" element={<VerifyEmail />} />

            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Customer routes — CustomerLayout */}
          <Route path="/" element={<CustomerLayout />}>
            <Route path="reservations" element={<Reservations />} />
            <Route path="reservations/:code" element={<ReservationDetail />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reviews" element={<CustomerReviews />} />
            <Route path="settings" element={<CustomerSettings />} />
          </Route>

          {/* Vendor routes — VendorLayout */}
          <Route path="/vendor" element={<VendorLayout />}>
            <Route index element={<VendorDashboard />} />
            <Route path="dashboard" element={<VendorDashboard />} />
            <Route path="status" element={<VendorStatus />} />
            <Route path="products" element={<VendorProducts />} />
            <Route path="products/create" element={<ProductCreate />} />
            <Route path="products/:id/edit" element={<ProductEdit />} />
            <Route path="reservations" element={<VendorReservations />} />
            <Route path="reservations/:code" element={<VendorReservationDetail />} />
            <Route path="store" element={<StoreEditor />} />
            <Route path="analytics" element={<VendorAnalytics />} />
            <Route path="reviews" element={<VendorReviews />} />
            <Route path="notifications" element={<VendorNotifications />} />
            <Route path="settings" element={<VendorSettings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
