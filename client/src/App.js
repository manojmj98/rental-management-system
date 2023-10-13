import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IndexPage from './components/IndexPage'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AboutPage from './components/AboutPage';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';
import ProfilePage from './components/ProfilePage';
import ResetPage from './components/ResetPage';
import ForgotPage from './components/ForgotPage';
import AdminPage from './components/AdminPage'
import RobotListingPage from './components/store/ProductListPage';
import RobotDetailsPage from './components/store/ProductItemPage';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reset/:token" element={<ResetPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/renter" element={<RobotListingPage />} />
        <Route exact path="/renter/:id" element={<RobotDetailsPage />} />

        {/* Logged in Routes */}
        <Route path='' element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reset" element={<ResetPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path='' element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
