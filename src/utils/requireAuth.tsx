import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectLogin } from "../store/userSlice";

export default function RequireAuth({ children }: any) {
  const login = useSelector(selectLogin);
  const location = useLocation();
  if (!login) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
      />
    );
  }
  return children;
}