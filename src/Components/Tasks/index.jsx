import { useState, useEffect, } from 'react';
import Tooltip from '../Tooltip';
import Sidebar from '../Sidebar';
import TodosHeader from '../TodosHeader';
import Footer from '../Footer';
import Confetti from 'react-confetti';
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';

import { Filter, X, Trash2, Pencil } from "lucide-react";

import { stagedTimers } from "../../fetchData";
import { toast } from 'react-toastify';
import { getStatusColor } from '../../utils/getStatusColor';

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import "./index.css"
import { useGetTodayTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation } from '../../services/tasks';
//import { useSelector } from 'react-redux';
import { tagOptions } from '../../utils/tagOptions';
import ApiStateHandler from '../ApiStateHandler';
const Tasks = () => {
  const [edit, setEdit] = useState({ tag: "", priority: "", startTime: "", endTime: "", todo: "" })
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEdit((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const [filters, setFilters] = useState({ search: "", tag: "", priority: "", status: "" })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const removeFilters = () => {
    setFilters({ search: "", tag: "", priority: "", status: "" })
  }
  const { data, isLoading, isFetching, isError, error } = useGetTodayTasksQuery(filters)
  
  const [deleteTask, { isLoading: deleteLoading }] = useDeleteTaskMutation()

  const navigate = useNavigate();

  const handleDelete = async (id, close) => {
    try {
      await deleteTask(id).unwrap()
      toast.success("Task Deleted Successfully!")
      close()
    }
    catch (error) {
      toast.error(error?.data?.message)
    }
  }


  useEffect(() => {
    if (isLoading || isFetching) stagedTimers.start();
    else stagedTimers.stop();

    return () => {
      stagedTimers.stop();
    };
  }, [isLoading, isFetching]);

  const [showConfetti, setShowConfetti] = useState(false);
  

  useEffect(() => {
    if (data && data.length > 0) {
      const allCompleted = data.every(todo => todo.status === 'completed');

      if (allCompleted) {
        setShowConfetti(true);

        const timer = setTimeout(() => {
          setShowConfetti(false);
        }, 6000);

        return () => clearTimeout(timer);
      } else {
        setShowConfetti(false);
      }
    }
    else {
      setShowConfetti(false);
    }
  }, [data]);

  const isLocked = (selectedDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Convert selectedDate from UTC → IST
    const sel = new Date(new Date(selectedDate).getTime() + 5.5 * 60 * 60 * 1000);
    sel.setHours(0, 0, 0, 0);

    return today > sel;
  };

  const [updateTask, { isLoading: updateLoading }] = useUpdateTaskMutation()
  const handleTaskComplete = async (id, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    try {
      await updateTask({
        id,
        update: {
          status: newStatus,
        },
      }).unwrap();
      toast.success("Task Updated Successfully!");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleUpdate = async (e, id, close) => {
    e.preventDefault()
    try {
      await updateTask({
        id, update: {
          todo: edit.todo,
          tag: edit.tag,
          startTime: edit.startTime,
          endTime: edit.endTime
        }
      }).unwrap()
      close()
      toast.success("Task Updated Successfully!")
    }
    catch (error) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <div>
      <TodosHeader />
      <div className='confetti-container'>
        {showConfetti && <Confetti />}
      </div>
      <Sidebar />
      <main className='code-vault-hero'>
        <h2 className='main-heading center'>Your Focus for Today</h2>

        <div className='filters-container'>
          <div className='input-wrapper'>
            <input name="search" value={filters.search} onChange={handleChange} required id="search" type="search" className='input-element' />
            <label htmlFor='search' className='label'>Search...</label>
          </div>
          <Tooltip text="Filter tasks...">
            <Popup contentStyle={{ border: "none", borderRadius: "12px", width: "90%", maxWidth: "400px" }} modal trigger={<button className='popup-button'><Filter size={20} /></button>}>
              {(close) => (
                <div className='dropdown-container'>
                  <h1 className='button-center heading'>Use Filters</h1>
                  <input
                    name="tag"
                    list="tagOptions"
                    className="input-element"
                    placeholder="Filter By Tag"
                    value={filters.tag}
                    onChange={handleChange}
                  />

                  <datalist className='input-element' id="tagOptions">
                    {tagOptions.map((tag) => (
                      <option className='input-element' key={tag} value={tag} />
                    ))}
                  </datalist>


                  <select
                    name="priority"
                    value={filters.priority}
                    onChange={handleChange}
                    className='input-element'
                  >
                    <option value="" hidden>Filter By Priority</option>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>

                  <select
                    name="status"
                    className='input-element'
                    value={filters.status}
                    onChange={handleChange}
                  >
                    <option value="" hidden>Filter By Status</option>
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                    <option value="missed">missed</option>

                  </select>
                </div>
              )}
            </Popup>
          </Tooltip>

          <Tooltip text="Reset Filters">
            <button onClick={removeFilters} className='popup-button bg-black'><X size={20} /></button>
          </Tooltip>
        </div>

        <ApiStateHandler error={error} data={data} isError={isError} isLoading={isLoading} isFetching={isFetching}>
          <div className="grid-data-wrapper">
            {data?.map((each) => (
              <div
                key={each._id}
                onClick={() => navigate(`/task/${each._id}`)}
                className="grid-data"
              >
                <h1 style={{ color: getStatusColor(each.status), }} className='data-heading'>Task: {each.todo}</h1>
                <div className='flex-checkbox'>
                  <Tooltip text={isLocked(each.selectedDate) ? "You can only complete tasks for the selected day" : "Update Task Status"}>
                    <input className='checkbox' onClick={(e) => e.stopPropagation()} onChange={() => handleTaskComplete(each._id, each.status)} disabled={isLocked(each.selectedDate)} checked={each.status === "completed"} name="status" id="status" type="checkbox" />
                  </Tooltip>
                  <Popup
                    modal
                    trigger={<button className="icon del-icon"><Trash2 size={24} color='red' /></button>}
                    contentStyle={{ border: "none", borderRadius: "12px", width: "90%", maxWidth: "400px" }}
                  >
                    {(close) => (
                      <div className="popup-layout">
                        <h2 className='center'>Are you sure you want to delete this Task?</h2>
                        <div className="flex-buttons">
                          <button
                            disabled={deleteLoading}
                            className="button logout-button"
                            onClick={async () => {
                              await handleDelete(each._id, close);
                            }}
                          >
                            Delete
                          </button>
                          <button onClick={close} className='button bg-black'>Close</button>

                        </div>
                        <button className='close-popup-icon bg-black' type="button" onClick={close}>❌</button>
                      </div>
                    )}
                  </Popup>
                  <Popup onOpen={() => setEdit({
                    todo: each.todo,
                    tag: each.tag,
                    startTime: each.startTime,
                    endTime: each.endTime

                  })} contentStyle={{ border: "none", borderRadius: "12px", width: "90%", maxWidth: "400px" }} modal trigger={<button className='icon'><Pencil /></button>}>
                    {(close) => (
                      <div>
                        <h1 className='center'>Update Task</h1>
                        <form onSubmit={(e) => handleUpdate(e, each._id, close)}>
                          <div className='input-wrapper'>
                            <input name="todo" required value={edit.todo} onChange={handleEditChange} id="task" className="input-element" type="text" />
                            <label htmlFor="task" className="label">
                              TASK
                            </label>
                          </div>
                          <input
                            list="tag-list"
                            name="tag"
                            value={edit.tag}
                            onChange={handleEditChange}
                            className="input-element"
                            style={{ color: "magenta" }}
                            placeholder="Select One Tag"
                          />

                          <datalist id="tag-list">
                            {tagOptions.map((tag) => (
                              <option key={tag} value={tag} />
                            ))}
                          </datalist>


                          <div className="input-wrapper">
                            <input
                              name="startTime"
                              value={edit.startTime}
                              onChange={handleEditChange}
                              id="startTime"
                              className="input-element time"
                              type="time"
                            />
                            <label htmlFor="startTime" className="label">
                              START TIME
                            </label>
                          </div>

                          <div className="input-wrapper">
                            <input
                              name="endTime"
                              value={edit.endTime}
                              onChange={handleEditChange}
                              id="endTime"
                              className="input-element time"
                              type="time"
                            />
                            <label htmlFor="endTime" className="label">
                              END TIME
                            </label>
                          </div>

                          <button style={{ width: "100%" }} disabled={updateLoading} type="submit" className="button bg-orange">
                            {updateLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                              Processing...
                              <ClipLoader color="#007bff" size={20} />
                            </span>) : ("Update Task")}
                          </button>
                        </form>
                        <button className='close-popup-icon bg-black' type="button" onClick={close}>❌</button>
                      </div>
                    )}
                  </Popup>
                </div>

              </div>
            ))}
          </div>
        </ApiStateHandler >


      </main >
      <Footer />
    </div >
  );
};

export default Tasks;
