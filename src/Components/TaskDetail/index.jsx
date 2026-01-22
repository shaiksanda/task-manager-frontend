import { useGetTaskQuery } from "../../services/tasks"
import { useParams } from "react-router-dom"
import { getStatusColor } from "../../utils/getStatusColor"


import TodosHeader from "../TodosHeader"
import Sidebar from "../Sidebar"
import Footer from "../Footer"
import ApiStateHandler from "../ApiStateHandler";

import "./index.css"

const TaskDetail = () => {
  const { taskId } = useParams()
  const { data, isLoading, isFetching, isError, error } = useGetTaskQuery(taskId)
  const { todo, selectedDate, priority, status, tag, startTime, endTime, createdAt, updatedAt } = data ?? {}
  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <main className="code-vault-hero">
        <ApiStateHandler
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error}
          data={data}
        >
          <>
            <h1 style={{color:getStatusColor(status)}} className="task-content">Task: {todo}</h1>
            <h2>Date: {new Date(selectedDate).toDateString()}</h2>
            <h2>Priority: {priority}</h2>
            <h2 style={{color:getStatusColor(status)}}>Status: {status}</h2>
            <h2>Tag: {tag}</h2>
            {startTime && <h2>Start Time: {startTime}</h2>}
            {endTime && <h2>End Time: {endTime}</h2>}
            <h2>Last updated: {new Date(updatedAt).toLocaleString()}</h2>
          </>
        </ApiStateHandler>
      </main>
      <Footer />

    </div>
  )
}

export default TaskDetail
