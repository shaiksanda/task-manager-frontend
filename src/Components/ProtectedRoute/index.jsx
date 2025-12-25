import Cookies  from "js-cookie"
import { Navigate} from "react-router-dom"

const ProtectedRoute = ({ element }) => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      return <Navigate to="/" />;
    }
    return element;
  };
  
  export default ProtectedRoute;