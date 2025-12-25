import { House, Clock,PlusSquare, } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate, } from 'react-router-dom';
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import "./index.css"

const Footer = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('jwt_token')
        navigate('/')
    }
    return (
        <footer>
            <div className="navigation-container">
                <Link to="/tasks"><House style={{ color: "white" }} size={25} /></Link>
                <Link className="remove-styling" to="/tasks"><p style={{ color: "white" }} className="navigation-content">Home</p></Link>
            </div>
            <div className="navigation-container">
                <Link className="remove-styling" to="/create-task"><PlusSquare style={{ color: "white" }} size={25} /></Link>
                <Link className="remove-styling" to="/create-task"><p style={{ color: "white" }} className="navigation-content">Create Task</p></Link>
            </div>
            <div className="navigation-container">
                <Link className="remove-styling" to="/history"><Clock style={{ color: "white" }} size={25} /></Link>
                <Link className="remove-styling" to="/history"><p style={{ color: "white" }} className="navigation-content">History</p></Link>
            </div>
            {/* <div className="navigation-container">
                <Popup contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    width: '90%', // Full width for small devices
                    maxWidth: '400px', // Optional: Limit max width for larger devices


                }}
                    position="right center" modal trigger={
                        <div>
                            <div className="navigation-container">
                                <LogOut
                                    size={25}
                                    color="white"
                                />
                                <p style={{color:"white"}} className="navigation-content">Logout</p>
                            </div>
                        </div>
                    }>
                    {close => (
                        <div className="logout-container">
                            <div>
                                <h1 className='popup-heading'>Are you sure you want to logout?</h1>
                                <div className='popup-buttons'>
                                    <button className='close-button' onClick={close}>Close</button>
                                    <button className='confirm-button' onClick={() => handleLogout(close)}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Popup>
            </div> */}
        </footer>
    )
}

export default Footer;