import TodosHeader from "../TodosHeader"
import Sidebar from "../Sidebar"
import { stagedTimers } from "../../fetchData";
import { toast } from 'react-toastify';
import { useGetTasksQuery, useDeleteTaskMutation } from "../../services/tasks"
import ApiStateHandler from "../ApiStateHandler"
import { getStatusColor } from "../../utils/getStatusColor"
import { useNavigate } from "react-router-dom"
import Tooltip from "../Tooltip";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { Filter,X } from "lucide-react";
import { tagOptions } from "../../utils/tagOptions";
import { useEffect, useState } from "react";
import Footer from "../Footer"
import "./index.css"

const History = () => {
  const [filters, setFilters] = useState({ tag: "", status: "", priority: "", selectedDate: '', search: "" })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const { data, isLoading, isError, error, isFetching } = useGetTasksQuery(filters)
  const [deleteTask, { isLoading: deleteLoading }] = useDeleteTaskMutation()
  const navigate = useNavigate()
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

  const removeFilters = () => {
    setFilters({ search: "", tag: "", priority: "", status: "",selectedDate:"" })
  }
  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <main className="code-vault-hero">
        <h2 className="center">Your Task History</h2>
        <div className="filters-container">
          <article className="input-wrapper">
            <input
              id="search"
              className="input-element"
              type="text"
              required
              value={filters.search}
              onChange={handleChange}
              name="search"
            />
            <label htmlFor="search" className="label">
              Search...
            </label>
          </article>

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
          <Tooltip text="Filter By Date">
            <input name="selectedDate" onChange={handleChange} value={filters.selectedDate} className="input-element" type="date" />
          </Tooltip>
          <Tooltip text="Reset Filters">
            <button onClick={removeFilters} className='popup-button bg-black'><X size={20} /></button>
          </Tooltip>
        </div>
        <ApiStateHandler error={error} data={data} isError={isError} isFetching={isFetching} isLoading={isLoading}>
          <div className="grid-data-wrapper">
            {data?.map((each) => (
              <div
                key={each._id}
                onClick={() => navigate(`/task/${each._id}`)}
                className="grid-data"
              >
                <h1 style={{ color: getStatusColor(each.status) }} className='data-heading'>Task: {each.todo}</h1>
                <Popup
                  modal
                  trigger={
                    <button
                      disabled={deleteLoading}
                      className="button logout-button"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Delete
                    </button>
                  }
                  contentStyle={{ border: "none", borderRadius: "12px", width: "90%", maxWidth: "400px" }}
                >
                  {(close) => (
                    <div className="popup-layout">
                      <h2>Are you sure you want to delete this Task?</h2>
                      <div className="flex-buttons">
                        <button
                          className="button logout-button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            await handleDelete(e, each._id);
                            close();
                          }}
                        >
                          Delete
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            close();
                          }}
                          className="button bg-black"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            ))}
          </div>
        </ApiStateHandler>
      </main>
      <Footer />
    </div>
  )
}

export default History
