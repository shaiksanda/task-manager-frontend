import TodosHeader from "../TodosHeader"
import Sidebar from "../Sidebar"
import { stagedTimers } from "../../fetchData";
import { toast } from 'react-toastify';
import { useGetTasksQuery, useDeleteTaskMutation } from "../../services/tasks"
import ApiStateHandler from "../ApiStateHandler"
import { getStatusColor } from "../../utils/getStatusColor"
import { useNavigate } from "react-router-dom"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { useEffect,useState } from "react";
import Footer from "../Footer"
import "./index.css"

const History = () => {
  const [filters,setFilters]=useState({tag:"",status:"",priority:"",selectedDate:''})
  const handleChange=(e)=>{
    const {name,value}=e.target
    setFilters((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  const { data, isLoading, isError, error, isFetching } = useGetTasksQuery()
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
  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <main className="code-vault-hero">
        <h2>History</h2>
        <div>
          <h1>Filters Here</h1>
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
