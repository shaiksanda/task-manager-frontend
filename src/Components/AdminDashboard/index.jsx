import { useGetUsersQuery } from "../../services/admin"
import ApiStateHandler from "../ApiStateHandler"
import Sidebar from "../Sidebar"
import Footer from "../Footer"
import TodosHeader from "../TodosHeader"
import { useNavigate } from "react-router-dom"
import "./index.css"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError, isFetching, error } = useGetUsersQuery()
  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <main className="code-vault-hero">
        <h1 className="center">Admin Dashboard</h1>
        <ApiStateHandler error={error} data={data} isError={isError} isLoading={isLoading} isFetching={isFetching}>
          <div className="grid-stats-wrapper">
            <h3>Total Users: {data?.totalUsers ?? 0}</h3>
            <h3>Total Tasks: {data?.totalTasks ?? 0}</h3>
            <h3>Completed Tasks: {data?.completedTasks ?? 0}</h3>
            <h3>Pending Tasks: {data?.pendingTasks ?? 0}</h3>

          </div>
          <div className="grid-admin-wrapper">
            {data?.users?.map((each) => (
              <div onClick={() => navigate(`/user-detail/${each._id}`)} key={each._id} className="user-grid">
                <img className="profile" src={each.avatar} alt="profile" />
                <div className="user-data-container">
                  <h3>Username: {(each.username).toUpperCase()}</h3>
                  <h3>Debut At: {new Date(each.createdAt).toLocaleString()}</h3>
                </div>

              </div>
            ))}
          </div>
        </ApiStateHandler>
      </main>
      <Footer />
    </div>
  )
}

export default AdminDashboard
