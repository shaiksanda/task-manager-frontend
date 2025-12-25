import { Link } from "react-router-dom"
import "./index.css"

const Header = () => {

    return (
        <header className="flex-header-wrapper">
            <div>
                <img className="logo-header" alt="logo" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1753526930/Screenshot_2025-07-26_161649_cq1yfv.webp" />
            </div>
            <Link to="/login"><button className="button login-button">Login</button></Link>
            <Link to="/signup"><button className="button signup-button">Singup</button></Link>
        </header>
    )
}

export default Header;