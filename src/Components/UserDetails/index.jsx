import { useParams } from "react-router-dom"
import TodosHeader from "../TodosHeader"
import Sidebar from "../Sidebar"
import "./index.css"
import { useGetUserDetailsQuery } from "../../services/admin"
import ApiStateHandler from "../ApiStateHandler"

const UserDetails = () => {
    const { userId } = useParams()
    const {data,isLoading,isError,isFetching,error}=useGetUserDetailsQuery(userId)
    const {user,tasksSummary}=data ??{}
    const {bio,username,role,createdAt,updatedAt,email,avatar}=user ??{}
    const {totalTasks,completedTasks}=tasksSummary ?? {}
    return (
        <div>
            <TodosHeader />
            <Sidebar />
            <main className="code-vault-hero">
                <h1>User Details Page</h1>
                <ApiStateHandler error={error} data={data} isError={isError} isLoading={isLoading} isFetching={isFetching}>
                    <h1>{username}</h1>
                    <img className="profile" src={avatar} alt="profile" />
                    <h1>{email}</h1>
                    <h1>{role}</h1>
                    <h1>{createdAt}</h1>
                    <h2>{updatedAt}</h2>
                    <h1>{totalTasks}</h1>
                    <h2>{completedTasks}</h2>
                </ApiStateHandler>
            </main>
        </div>
    )
}

export default UserDetails
