import { useGetUsersQuery } from "../../services/admin"
import ApiStateHandler from "../ApiStateHandler"
import Sidebar from "../Sidebar"
import TodosHeader from "../TodosHeader"
import { useNavigate } from "react-router-dom"
import "./index.css"

const AdminDashboard = () => {
  const navigate=useNavigate()
  const { data, isLoading, isError, isFetching, error } = useGetUsersQuery()
  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <main className="code-vault-hero">
        <h1>Admin Dashboard</h1>
        <ApiStateHandler error={error} data={data} isError={isError} isLoading={isLoading} isFetching={isFetching}>
          <div className="grid-data-wrapper">
            {data?.users?.map((each) => (
              <div onClick={() => navigate(`/user-detail/${each._id}`)} key={each._id} className="grid-data">
                <div className="flex-container">
                  <h2>{(each.username).toUpperCase()}</h2>
                  <img className="profile" src={each.avatar} alt="profile" />
                </div>
                <h2>Debut At: {new Date(each.createdAt).toLocaleString()}</h2>
              </div>
            ))}
          </div>
        </ApiStateHandler>
      </main>
    </div>
  )
}

export default AdminDashboard
