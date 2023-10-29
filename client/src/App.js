import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AboutPage from './components/AboutPage';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';
import ProfilePage from './components/ProfilePage';
import ResetPage from './components/ResetPage';
import ForgotPage from './components/ForgotPage';
import AdminPage from './components/AdminPage';
import RenterDashboard from './components/store/RenterDashboard';
import RenterItemPage from './components/store/RenterItemList';
import SecurityQuestionPage from './components/SecurityQuestionPage';
import OwnerDashBoard from './components/ownerDashboard/ownerDashBoard';
import ProductInput from './components/ownerDashboard/ProductInput';
import ProductPage from './components/ownerDashboard/ProductPage';
import MerchantRoute from './components/common/MerchantRoute';
import CartPage from './components/CartPage';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/reset/:token' element={<ResetPage />} />
        <Route path='/forgot' element={<ForgotPage />} />
        <Route path='/renter' element={<RenterDashboard />} />
        <Route path='/renter/page/:pageNumber' element={<RenterDashboard />} />
        <Route path='/renter/page/:pageNumber/search/:keyword/' element={<RenterDashboard />} />
        <Route path='/renter/page/:pageNumber/tags/:tags/' element={<RenterDashboard />} />
        <Route path='/renter/page/:pageNumber/search/:keyword/tags/:tags/' element={<RenterDashboard />} />
        <Route exact path='/renter/product/:id' element={<RenterItemPage />} />
        <Route path='/cart' element={<CartPage/>} />

        {/* Logged in Routes */}
        <Route path='' element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/reset' element={<ResetPage />} />
          <Route path='/SecurityQuestions' element={<SecurityQuestionPage />} />
        </Route>

        <Route path='' element={<MerchantRoute />}>
          <Route path='/owner' element={<OwnerDashBoard />} />
          <Route path='/robotInput' element={<ProductInput />} />
          <Route path='/productpage/:id' element={<ProductPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path='' element={<AdminRoute />}>
          <Route path='/admin' element={<AdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
