import { useLocation, Navigate, Outlet } from "react-router-dom";

const CheckingNotAuth = (props) => {
  const location = useLocation();

  if (props.isAuth) {
    return <Navigate to="/" state={{ from: location }} />
  }
  
  return <Outlet />
};

export default CheckingNotAuth;