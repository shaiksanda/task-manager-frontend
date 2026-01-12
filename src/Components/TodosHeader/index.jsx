import Cookies from "js-cookie"
import { setSelectedIndex } from "../../features/selectedSlice";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "lucide-react"
import SideMenu from "../SideMenu"
import {Link} from "react-router-dom"

import { useState } from 'react';
import { toast } from "react-toastify"

import { useMediaQuery } from "react-responsive";
import { useNavigate, } from 'react-router-dom';

import "./index.css"
import Modal from "../Modal";
const TodosHeader = () => {

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    const token = Cookies.get("jwt_token")

    try {
      const res = await fetch("http://localhost:6002/users/upload-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      if (data.profileImageUrl) {
        toast.success("Profile Uploaded Successfully!")
      }
    } catch (err) {
      toast.error(err.message)
    }
  };
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const user = useSelector(state => state.auth.user)

  const { username,avatar } = user



  const dispatch = useDispatch();

  const handleClick = (path, idx) => {
    dispatch(setSelectedIndex(idx));
    navigate(path);
  };


  return (
    <header>
      <div>
        <img  onClick={() => handleClick("/tasks", 0)} className="todo-logo-1" alt="logo" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1753526930/Screenshot_2025-07-26_161649_cq1yfv.webp" />
      </div>
      {/* <div>
        <input className="input-element" name="avatar" type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div> */}

      <div>
        <h1 className='username-heading'>Welcome {(username ?? "User").toUpperCase()}</h1>
      </div>
      {isDesktop && <Link to="/profile"><img id="avatar" className="profile" src={user.avatar} /></Link>}
      <img src={avatar} onClick={() => setOpenMenu(true)} className="menu-item profile" />
      <SideMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />

    </header>
  )
}


export default TodosHeader;