import { useGetTaskQuery } from "../../services/tasks"
import { useParams } from "react-router-dom"



import TodosHeader from "../TodosHeader"
import Sidebar from "../Sidebar"
import ApiStateHandler from "../ApiStateHandler";

import "./index.css"

const TaskDetail = () => {
  const { taskId } = useParams()
  const { data, isLoading, isFetching,isError, error } = useGetTaskQuery(taskId)
  const { todo, selectedDate, priority, status, tag, startTime, endTime } = data ?? {}
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
        {/* this is your existing UI for success */}
        <>
          <h1>{todo}</h1>
          <h2>{new Date(selectedDate).toDateString()}</h2>
          <h2>{priority}</h2>
          <h2>{status}</h2>
          <h2>{tag}</h2>
          <h2>{startTime}</h2>
          <h2>{endTime}</h2>
        </>
      </ApiStateHandler>
    </main>

    </div>
  )
}

export default TaskDetail
