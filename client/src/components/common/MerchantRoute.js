import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { ROLE } = require('../../constants/constants');

function MerchantRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to='/login' replace />;
  }

  return userInfo.role === ROLE.Merchant ? (
    <Outlet />
  ) : (
    <Navigate to='/' replace />
  );
}

export default MerchantRoute;
