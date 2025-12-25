import Cookies from 'js-cookie'
import { setSelectedIndex } from "../../features/selectedSlice";
import { useDispatch} from "react-redux";


import { useNavigate, } from 'react-router-dom';
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import "./index.css"
const TodosHeader = () => {
  const navigate = useNavigate();
  
  

  const dispatch = useDispatch();
   
    const handleClick = (path, idx) => {
      dispatch(setSelectedIndex(idx));
      navigate(path);
    };
  
  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/')
  }

  return (
    <header>
      <div>
        <img onClick={()=>handleClick("/history",1)} className="todo-logo-1" alt="logo" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1753526930/Screenshot_2025-07-26_161649_cq1yfv.webp" />
      </div>
      <div>
        <h1 className='username-heading'>Welcome User</h1>
      </div>
      
      <div>
        <Popup contentStyle={{
          backgroundColor: 'white',
          border: 'none',
          borderRadius: '12px',
          width: '90%', // Full width for small devices
          maxWidth: '400px', // Optional: Limit max width for larger devices


        }}
          position="right center" modal trigger={
            <div>
              <button className='button logout-button'>Logout</button>
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
      </div>
    </header>
  )
}


export default TodosHeader;