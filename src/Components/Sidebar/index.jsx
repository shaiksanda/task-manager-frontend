import { setSelectedIndex } from "../../features/selectedSlice";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

import {
  Home,             // IoMdHome,
  Clock,
  PlusSquare,
  Layout,           // TbLayoutDashboardFilled
  Info,             // FaInfoCircle
  Clipboard,        // FaTasks
  Zap,              // FaFire
  Users,            // FaAffiliatetheme (closest for "affiliate/team")
  MessageCircle,    // MdFeedback
  Target            // GoGoal
} from "lucide-react";


import { useNavigate } from "react-router-dom";
import "./index.css"

const sidebarItems = [
  { label: "Home", icon: <Home size={30} />, path: "/tasks" },

  { label: "Create Task", icon: <PlusSquare size={28} />, path: "/create-task" },
  { label: "History", icon: <Clock size={26} />, path: "/history" },

  // { label: "Dashboard", icon: <Layout size={30} />, path: "/dashboard" },
  { type: "divider" },
  // { label: "Goals", icon: <Target size={26}/>, path: "/goals" },
  // { label: "Streak", icon: <Zap size={26} color="orangered" />, path: "/streak" },
  // { label: "Theme", icon: <Users size={26} />, path: "/theme" },
  // { label: "About", icon: <Info size={28} />, path: "/about" },
  // { label: "Feedback", icon: <MessageCircle size={28} />, path: "/feedback" },

];

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.selected.selectedIdx);

  const handleClick = (item, idx) => {
    dispatch(setSelectedIndex(idx));
    navigate(item.path);
  };

  const getItemStyle = (idx) => ({
    backgroundColor: selected === idx ? "#000" : "transparent",
    color: selected === idx ? "#fff" : "#000",
  });


  return (
    <aside>
      {sidebarItems.map((item, idx) => {
        if (item.type === "divider") {
          return <hr key={idx} />;
        }

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
    </aside>
  )
}

export default Sidebar
