import { House, Clock, LayoutDashboard,PlusSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateTask from "../CreateTask"

import "./index.css"

const Footer = () => {
    const [openCreateTask, setOpenCreateTask] = useState(false);
    return (
        <>
            <footer>
                <div className="navigation-container">
                    <Link to="/tasks"><House style={{ color: "white" }} size={25} /></Link>
                    <Link className="remove-styling" to="/tasks"><p style={{ color: "white" }} className="navigation-content">Home</p></Link>
                </div>
                <div
                    className="navigation-container"
                    onClick={() => setOpenCreateTask(true)}
                >
                    <PlusSquare size={25} color="white" />
                    <p className="navigation-content" style={{ color: "white" }}>Create</p>
                </div>

                <div className="navigation-container">
                    <Link className="remove-styling" to="/dashboard"><LayoutDashboard style={{ color: "white" }} size={25} /></Link>
                    <Link className="remove-styling" to="/dashboard"><p style={{ color: "white" }} className="navigation-content">Dashboard</p></Link>
                </div>
                <div className="navigation-container">
                    <Link className="remove-styling" to="/history"><Clock style={{ color: "white" }} size={25} /></Link>
                    <Link className="remove-styling" to="/history"><p style={{ color: "white" }} className="navigation-content">History</p></Link>
                </div>
            </footer>

            {openCreateTask && (
                <CreateTask onClose={() => setOpenCreateTask(false)} />
            )}
        </>
    )
}

export default Footer;