import { Link } from "react-router-dom";


import { House, X, Shield, User } from "lucide-react";
import "./index.css"


const SideMenu = ({ openMenu, setOpenMenu }) => {
  return (
    <div className={`side-menu ${openMenu ? "show" : ""}`}>
      <h2 className="center">Menu</h2>
      <div className="menu-container">


        <Link to="/tasks" className="link-item">
          <div className="nav-item">
            <House size={24} />
            <h2 className="menu-text">Home</h2>
          </div>
        </Link>
        <Link className="link-item" to="/admin-dashboard">
          <div className="nav-item">
            <Shield size={24} />
            <h2 className="menu-text">Admin Panel</h2>
          </div>
        </Link>
        <Link to="/profile" className="link-item">
          <div className="nav-item">
            <User size={24} />
            <h2 className="menu-text">Profile</h2>
          </div>
        </Link>

        <div className="cross-icon">
          <X color="red" size={40} onClick={() => setOpenMenu(false)} />
        </div>

      </div>


    </div>
  )
}

export default SideMenu