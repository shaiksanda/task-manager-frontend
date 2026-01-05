import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";
import {toast} from "react-toastify"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { useLogoutUserMutation } from "../../services/auth"
import { LogOut } from "lucide-react";
import "./index.css"
const Modal = () => {

  const [logoutUser] = useLogoutUserMutation()
  const navigate = useNavigate()
  const handleLogout = async (close) => {
    try {
      await logoutUser()
      toast.success("Logged Out Successfully!")
      Cookies.remove("jwt_token")
      navigate("/");
    }
    catch (error) {
      toast.error(error?.data?.message)
    }
    finally {
      close()
    }
  }
  return (
    <div>
      <Popup position="center center" lockScroll closeOnDocumentClick={false} modal trigger={<button style={{width:"120px"}} className="button logout-button flex-btn"><LogOut size={24} /> Logout </button>}>
        {(close) => (
          <div className='popup'>
            <h3 className='center'>Are You Sure You Want to Logout.</h3>
            <div className='btns'>
              <button style={{width:"120px"}} onClick={()=>handleLogout(close)} className='button logout-button flex-btn'> <LogOut size={24} /> Logout</button>
              
            </div>
            <button className='close-popup-icon bg-black' type="button" onClick={close}>❌</button>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default Modal