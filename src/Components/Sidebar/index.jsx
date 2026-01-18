import { setSelectedIndex } from "../../features/selectedSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateTask from "../CreateTask";
import { useState } from "react";

import {
  Home,
  Clock,
  PlusSquare,
  LayoutDashboard,
  Shield,

} from "lucide-react";


import { useNavigate } from "react-router-dom";
import Modal from "../Modal"
import "./index.css"

const sidebarItems = [
  { label: "Home", icon: <Home size={30} />, path: "/tasks" },

  { label: "Create Task", icon: <PlusSquare size={28} />, action: "createTask" },
  { label: "Dashboard", icon: <LayoutDashboard size={30} />, path: "/dashboard" },
  { label: "History", icon: <Clock size={26} />, path: "/history" },
  { label: "Admin Panel", icon: <Shield size={26} />, path: "/admin-dashboard", role: true },


  { type: "divider" },
  // { label: "Goals", icon: <Target size={26}/>, path: "/goals" },
  // { label: "Streak", icon: <Zap size={26} color="orangered" />, path: "/streak" },
  // { label: "Theme", icon: <Users size={26} />, path: "/theme" },
  // { label: "About", icon: <Info size={28} />, path: "/about" },
  // { label: "Feedback", icon: <MessageCircle size={28} />, path: "/feedback" },

];

const Sidebar = () => {
  const [openCreateTask, setOpenCreateTask] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.selected.selectedIdx);

  const user = useSelector(state => state.auth.user)
  const userRole = user.role
  const handleClick = (item, idx) => {
    dispatch(setSelectedIndex(idx));
    if (item.action !== undefined) {
      setOpenCreateTask(true);
      return;
    }

    else {
      navigate(item.path);
    }

  };

  const getItemStyle = (idx) => ({
    backgroundColor: selected === idx ? "#000" : "transparent",
    color: selected === idx ? "#fff" : "#000",
  });


  return (
    <>
      <aside>
        {sidebarItems.map((item, idx) => {
          if (item.type === "divider") {
            return <hr key={idx} />;
          }


          if (item.role && userRole !== "admin") return null;

          return (
            <div
              key={idx}
              onClick={() => handleClick(item, idx)}
              className="flex-wrapper"
              style={getItemStyle(idx)}
            >
              {item.icon}
              <h1 className="item-label">{item.label}</h1>
            </div>
          );
        })}
        <div className="modal-outline">
          <Modal />
        </div>
      </aside>

      {openCreateTask && (
        <CreateTask onClose={() => setOpenCreateTask(false)} />
      )}
    </>
  )
}

export default Sidebar
