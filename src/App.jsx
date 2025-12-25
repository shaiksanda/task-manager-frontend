import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Components/Home"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Tasks from "./Components/Tasks"
import TaskDetail from './Components/TaskDetail'
import CreateTask from "./Components/CreateTask";
import History from "./Components/History"

import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={<ProtectedRoute element={<Tasks />} />} />
        <Route path="/create-task" element={<ProtectedRoute element={<CreateTask />} />} />
        <Route path="/history" element={<ProtectedRoute element={<History />} />} />
        <Route path="/task/:taskId" element={<ProtectedRoute element={<TaskDetail />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
