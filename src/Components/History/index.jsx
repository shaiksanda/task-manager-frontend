
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
import { Filter, Trash2 } from "lucide-react";
import { tagOptions } from "../../utils/tagOptions";
import { useEffect, useState } from "react";
import Footer from "../Footer"
import "./index.css"

const initialFilters = {
  tag: "",
  status: "",
  priority: "",
  selectedDate: ""
}

const History = () => {
  const [openDeletePopup, setOpenDeletePopup] = useState(null)

  // Temporary filter selections
  const [draftFilters, setDraftFilters] = useState(initialFilters)

  // Currently applied filters
  const [appliedFilters, setAppliedFilters] = useState(initialFilters)

  // Independent search state
  const [search, setSearch] = useState("")

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target

    setDraftFilters((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Apply selected filters
  const handleApplyFilters = (close) => {
    setAppliedFilters({ ...draftFilters })
    close()
  }

  // Clear all filters AND search
  const removeFilters = (close) => {
    setDraftFilters({ ...initialFilters })
    setAppliedFilters({ ...initialFilters })
    setSearch("")

    if (close) {
      close()
    }
  }

  // API receives only applied filters
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching
  } = useGetTasksQuery({
    ...appliedFilters,
    search
  })

  const [deleteTask, { isLoading: deleteLoading }] =
    useDeleteTaskMutation()

  const navigate = useNavigate()

  const handleDelete = async (id, close) => {
    try {
      await deleteTask(id).unwrap()
      toast.success("Task Deleted Successfully!")
      setOpenDeletePopup(null)
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

  return (
    <div>
      <TodosHeader />
      <Sidebar />

      <main className="code-vault-hero">

        <h2 className="main-heading center">
          Your Task History
        </h2>

        <div className="filters-container flex-wrap">

          {/* Search */}
          <article className="input-wrapper">
            <input
              id="search"
              className="input-element"
              type="text"
              required
              value={search}
              onChange={handleSearchChange}
              name="search"
            />

            <label htmlFor="search" className="label">
              Search...
            </label>
          </article>

          {/* Filters Popup */}
          <Tooltip text="Filter tasks...">
            <Popup
              contentStyle={{
                border: "none",
                borderRadius: "12px",
                width: "90%",
                maxWidth: "400px"
              }}
              modal
              trigger={
                <button className="popup-button">
                  <Filter size={20} />
                </button>
              }
            >
              {(close) => (
                <div className="dropdown-container history-filters-popup">

                  <h1 className="button-center heading filters-heading">
                    Filters
                  </h1>

                  {/* Filter by Tag */}
                  <input
                    name="tag"
                    list="tagOptions"
                    className="input-element"
                    placeholder="Filter By Tag"
                    value={draftFilters.tag}
                    onChange={handleFilterChange}
                  />

                  <datalist id="tagOptions">
                    {tagOptions.map((tag) => (
                      <option key={tag} value={tag} />
                    ))}
                  </datalist>

                  {/* Filter by Date */}
                  <input
                    name="selectedDate"
                    type="date"
                    className="input-element"
                    value={draftFilters.selectedDate}
                    onChange={handleFilterChange}
                  />

                  {/* Filter by Priority */}
                  <select
                    name="priority"
                    value={draftFilters.priority}
                    onChange={handleFilterChange}
                    className="input-element"
                  >
                    <option value="">Filter By Priority</option>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>

                  {/* Filter by Status */}
                  <select
                    name="status"
                    className="input-element"
                    value={draftFilters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">Filter By Status</option>
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                    <option value="missed">missed</option>
                  </select>

                  {/* Filter Actions */}
                  <div className="flex-buttons">

                    <button
                      type="button"
                      className="button remove-filters-btn"
                      onClick={() => removeFilters(close)}
                    >
                      Clear All
                    </button>

                    <button
                      type="button"
                      className="button apply-filters-btn"
                      onClick={() => handleApplyFilters(close)}
                    >
                      Apply Filters
                    </button>

                  </div>

                </div>
              )}
            </Popup>
          </Tooltip>

        </div>

        {/* Task History */}
        <ApiStateHandler
          error={error}
          data={data}
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
        >
          <div className="grid-data-wrapper">

            {data?.map((each) => (
              <div
                key={each._id}
                onClick={() => {
                  if (openDeletePopup) return
                  navigate(`/task/${each._id}`)
                }}
                className="grid-data flex-data"
              >

                <h1
                  style={{ color: getStatusColor(each.status) }}
                  className="data-heading"
                >
                  Task: {each.todo}
                </h1>

                <button
                  disabled={deleteLoading}
                  className="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDeletePopup(each._id);
                  }}
                >
                  <Trash2 />
                </button>

                {openDeletePopup === each._id && (
                  <Popup
                    open
                    modal
                    closeOnDocumentClick={false}
                    contentStyle={{
                      border: "none",
                      borderRadius: "12px",
                      width: "90%",
                      maxWidth: "400px"
                    }}
                  >
                    {(close) => (
                      <div className="popup-layout">

                        <h2 className="center">
                          Are you sure you want to delete this Task?
                        </h2>

                        <div className="flex-buttons">

                          <button
                            className="button logout-button"
                            onClick={async (e) => {
                              e.stopPropagation();
                              await handleDelete(each._id, close);
                            }}
                          >
                            Delete
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDeletePopup(null);
                              close();
                            }}
                            className="button bg-black"
                          >
                            Cancel
                          </button>

                        </div>

                        <button
                          className="close-popup-icon bg-black"
                          type="button"
                          onClick={() => {
                            setOpenDeletePopup(null);
                            close();
                          }}
                        >
                          ❌
                        </button>

                      </div>
                    )}
                  </Popup>
                )}

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
