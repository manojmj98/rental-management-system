import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivateRoute from './components/common/PrivateRoute';
import ProfilePage from './components/ProfilePage';
import ResetPage from './components/ResetPage';
import ForgotPage from './components/ForgotPage';
import AdminPage from './components/AdminPage';
import RenterDashboard from './components/store/RenterDashboard';
import RenterItemPage from './components/store/RenterItemPage';
import SecurityQuestionPage from './components/SecurityQuestionPage';
import OwnerDashBoard from './components/ownerDashboard/ownerDashBoard';
import ProductInput from './components/ownerDashboard/ProductInput';
import ProductPage from './components/ownerDashboard/ProductPage';
import MerchantRoute from './components/common/MerchantRoute';
import CartPage from './components/CartPage';
import ProductListScreen from './components/adminDashboard/products';
import OrderListScreen from './components/adminDashboard/orders';
import SuccessPage from './components/SuccessPage';
import CreditCardForm from './components/CreditCard';import BookingsPage from './components/ownerDashboard/bookingsPage';
import MessagesPage from './components/message/MessagesPage';
import EditProduct from './components/adminDashboard/editProduct';
import EditComplaint from './components/adminDashboard/editComplaint';
import RenterComplaintsList from './components/renter/complaints';
import ViewOwnerComplaint from './components/ownerDashboard/viewComplaint';
import UpdateRenterComplaint from './components/renter/updateComplaint';
import RenterPage from './components/renterComplaints';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/reset/:token' element={<ResetPage />} />
        <Route path='/forgot' element={<ForgotPage />} />
        <Route path='/renter' element={<RenterDashboard />} />
        <Route path='/renter/page/:pageNumber' element={<RenterDashboard />} />
        <Route
          path='/renter/page/:pageNumber/search/:keyword/'
          element={<RenterDashboard />}
        />
        <Route
          path='/renter/page/:pageNumber/tags/:tags/'
          element={<RenterDashboard />}
        />
        <Route
          path='/renter/page/:pageNumber/search/:keyword/tags/:tags/'
          element={<RenterDashboard />}
        />
        <Route exact path='/renter/product/:id' element={<RenterItemPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/success' element={<SuccessPage/>} />
        <Route path='/pay' element={<CreditCardForm/>} />



        {/* Logged in Routes */}
        <Route path='' element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/reset' element={<ResetPage />} />
          <Route path='/SecurityQuestions' element={<SecurityQuestionPage />} />
          <Route path='/messages' element={<MessagesPage />} />
        </Route>

        <Route path='' element={<MerchantRoute />}>
          <Route path='/owner' element={<OwnerDashBoard />} />
          <Route path='/booking' element={<BookingsPage />} />
          <Route path='/robotInput' element={<ProductInput />} />
          <Route path='/owner/complaint/:id/view' element={<ViewOwnerComplaint />} />
          <Route path='/productpage/:id' element={<ProductPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/product/:id/edit' element= {<EditProduct/>}/>
        <Route path='/admin/complaint/:id/edit' element={<EditComplaint/>} />

        {/*Renter Routes*/}
        <Route path='/renter/Dashboard' element={<RenterPage/>}/>
        <Route path='/renter/complaints' element={<RenterComplaintsList/>}/>
        <Route path='/renter/complaint/:id' element={<UpdateRenterComplaint/>}/>
      </Routes>
    </Router>
  );
}

export default App;
