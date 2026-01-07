import { Link } from "react-router-dom";


import { House, X,Shield } from "lucide-react";
import "./index.css"
import Modal from "../Modal";

const SideMenu = ({ openMenu, setOpenMenu }) => {
  return (
    <div className={`side-menu ${openMenu ? "show" : ""}`}>
      <h2 className="center">Menu</h2>
      <div>

        <Link to="/tasks" className="link-item">
          <div className="nav-item">
            <House size={24} />
            <h2 className="footer-text">Home</h2>
          </div>
        </Link>
        <Link className="link-item" to="/admin-dashboard">
          <div className="nav-item">
            <Shield size={24} />
            <h2 className="footer-text">Admin Panel</h2>
          </div>
        </Link>
        <Modal  />
        
      </div>

      <div className="cross-icon">
        <X color="red" size={40} onClick={() => setOpenMenu(false)} />
      </div>
    </div>
  )
}

export default SideMenu