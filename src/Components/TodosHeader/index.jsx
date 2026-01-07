
import { setSelectedIndex } from "../../features/selectedSlice";
import { useDispatch,useSelector } from "react-redux";
import { Menu } from "lucide-react"
import SideMenu from "../SideMenu"

import { useState } from 'react';

import { useMediaQuery } from "react-responsive";
import { useNavigate, } from 'react-router-dom';

import "./index.css"
import Modal from "../Modal";
const TodosHeader = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const user=useSelector(state=>state.auth.user)
  
  const {username}=user



  const dispatch = useDispatch();

  const handleClick = (path, idx) => {
    dispatch(setSelectedIndex(idx));
    navigate(path);
  };


  return (
    <header>
      <div>
        <img onClick={() => handleClick("/tasks", 0)} className="todo-logo-1" alt="logo" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1753526930/Screenshot_2025-07-26_161649_cq1yfv.webp" />
      </div>
      <div>
        <h1 className='username-heading'>Welcome {(username ?? "User").toUpperCase()}</h1>
      </div>
      {isDesktop && <Modal />}
      <Menu onClick={() => setOpenMenu(true)} className="menu-item" />
      <SideMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />

    </header>
  )
}


export default TodosHeader;