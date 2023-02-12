import { useLocation, Navigate, Outlet } from "react-router-dom";

const CheckingAuth = (props) => {
  const location = useLocation();

  if (!props.isAuth) {
    return <Navigate to="login" state={{ from: location }} />
  }
  
  return <Outlet />
};

export default CheckingAuth;