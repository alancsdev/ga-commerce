import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ThemeProvider } from '@material-tailwind/react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store.js';
import HomePage from './pages/HomePage/HomePage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage.jsx';
import CartPage from './pages/CartPage/CartPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import ShippingPage from './pages/ShippingPage/ShippingPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import PaymentPage from './pages/PaymentPage/PaymentPage.jsx';
import PlaceOrderPage from './pages/PlaceOrderPage/PlaceOrderPage.jsx';
import OrderPage from './pages/OrderPage/OrderPage.jsx';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage.jsx';
import AdminPage from './pages/admin/AdminPage/AdminPage.jsx';
import CreateProductPage from './pages/admin/CreateProductPage/CreateProductPage.jsx';
import EditProductPage from './pages/admin/EditProductPage/EditProductPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public routes */}
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      {/* Private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/orders/:id" element={<OrderPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Route>
      {/* Admin routes */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/adminpage" element={<AdminPage />} />
        <Route path="/admin/create-product" element={<CreateProductPage />} />
        <Route path="/admin/product/:id/edit" element={<EditProductPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
