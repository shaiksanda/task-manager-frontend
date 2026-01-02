import { stagedTimers } from '../../fetchData';
import { useCreateTaskMutation } from '../../services/tasks';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { tagOptions } from '../../utils/tagOptions';

import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";
import "./index.css"
// import TodosHeader from '../TodosHeader';
// import Sidebar from '../Sidebar';
// import Footer from "../Footer"

const CreateTask = ({onClose}) => {

    const [data, setData] = useState({ todo: "", selectedDate: new Date(), tag: "", priority: '', startTime: "", endTime: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const [createTask, { isLoading, isFetching }] = useCreateTaskMutation()

    useEffect(() => {
        if (isLoading || isFetching) {
            stagedTimers.start()
        }
        else {
            stagedTimers.stop()
        }

        return () => stagedTimers.stop()
    }, [isLoading, isFetching])
    const navigate = useNavigate()


    const handleAddTask = async (event) => {
        event.preventDefault();

        const { todo, tag, priority, selectedDate, startTime, endTime } = data;

        if (!todo || !tag || !priority || !selectedDate) {
            toast.error("Please fill out all required fields!");
            return;
        }

        try {
            const formattedDate = selectedDate.toISOString
                ? selectedDate.toISOString().split("T")[0]
                : selectedDate; // if it's already string

            const newTodo = { todo, tag, priority, selectedDate: formattedDate, startTime, endTime };

            await createTask(newTodo).unwrap();
            toast.success("Task added successfully!");
            setData({ todo: "", tag: "", priority: "", selectedDate: new Date(), startTime: "", endTime: "" });
            navigate(-1)

        } catch (error) {
            toast.error(error?.data?.message || "Failed to Add Task");
        }
    };


    const isValid = data.tag && data.todo && data.priority && data.selectedDate

    return (

        <Popup lockScroll={true} closeOnDocumentClick={false} onClose={onClose} open={true} position="center center" modal trigger={<button className='button'>Create Task</button>}>

            {(close) => (

                <form className='form' onSubmit={handleAddTask}  >
                    <h1 style={{ margin: "0px", color: "white", textAlign: "center" }} className='create-task-heading'>Create Task</h1>

                    <div className='input-wrapper'>
                        <input name="todo" required value={data.todo} onChange={handleChange} id="task" className="input-element" type="text" />
                        <label htmlFor="task" className="label">
                            TASK
                        </label>
                    </div>

                    <input
                        list="tag-list"
                        name="tag"
                        value={data.tag}
                        onChange={handleChange}
                        className="input-element"
                        style={{ color: "magenta" }}
                        placeholder="Select One Tag"
                    />

                    <datalist id="tag-list">
                        {tagOptions.map((tag) => (
                            <option key={tag} value={tag} />
                        ))}
                    </datalist>


                    <select
                        id="priority"
                        name="priority"
                        value={data.priority}
                        onChange={handleChange}
                        className='dropdown edit-mode'
                        style={{ color: 'magenta' }}
                    >
                        <option value="default" hidden>Select PRIORITY</option>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>

                    </select>

                    <div style={{ backgroundColor: "white" }} className='add-date-wrapper edit-mode'>
                        <label className="date-label" htmlFor="date">Pick Date</label>
                        <input name="selectedDate" onChange={handleChange} value={new Date(data.selectedDate).toISOString().split("T")[0]} required className='add-date-element' id="date" type="date" />
                    </div>
                    <div className="input-wrapper">
                        <input
                            name="startTime"
                            value={data.startTime}
                            onChange={handleChange}
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
                            value={data.endTime}
                            onChange={handleChange}
                            id="endTime"
                            className="input-element time"
                            type="time"
                        />
                        <label htmlFor="endTime" className="label">
                            END TIME
                        </label>
                    </div>

                    <button disabled={isLoading || !isValid} type="submit" className="button loading-button ">
                        {isLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                            Processing...
                            <ClipLoader color="#007bff" size={20} />
                        </span>) : ("Add Task")}
                    </button>
                     <button className='close-popup-icon' type="button" onClick={onClose}>❌</button>
                </form>

            )}
        </Popup>

    )
}

export default CreateTask
