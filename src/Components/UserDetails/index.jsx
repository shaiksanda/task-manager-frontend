import { useParams } from "react-router-dom"
import TodosHeader from "../TodosHeader"
import Sidebar from "../Sidebar"
import Footer from "../Footer"
import {toast} from "react-toastify"
import "./index.css"
import { useDeleteUserProfileMutation, useGetUserDetailsQuery } from "../../services/admin"
import ApiStateHandler from "../ApiStateHandler"

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


const UserDetails = () => {
    const { userId } = useParams()
    const { data, isLoading, isError, isFetching, error } = useGetUserDetailsQuery(userId)
    const { user, tasksSummary } = data ?? {}
    const { bio, username, role, createdAt, updatedAt, email, avatar } = user ?? {}
    const { totalTasks, completedTasks } = tasksSummary ?? {}
    const [deleteUserProfile,{isLoading:deleteLoading}]=useDeleteUserProfileMutation()
    const handleDelete=async()=>{
        try{
            await deleteUserProfile(userId).unwrap()
            toast.success("User Permanently Deleted!")
        }
        catch(error){
            toast.error(error?.data?.message)
        }
    }
    return (
        <div>
            <TodosHeader />
            <Sidebar />
            <main className="code-vault-hero">
                <h1 className="center purple">User Details Page</h1>
                <ApiStateHandler error={error} data={data} isError={isError} isLoading={isLoading} isFetching={isFetching}>
                    <div className="user-details-container">
                        <div className="flex-container">
                            <h2>Username: {username}</h2>
                            <img className="profile" src={avatar} alt="profile" />
                        </div>
                        <h3>Email: {email}</h3>
                        <h3>Role: {role}</h3>
                        <h3>Debut At: {new Date(createdAt).toLocaleString()}</h3>
                        <h3>Last Updated: {new Date(updatedAt).toLocaleString()}</h3>
                        <h3>Total Tasks: {totalTasks}</h3>
                        <h3>Completed Tasks: {completedTasks}</h3>
                        <Popup lockScroll={true} closeOnDocumentClick={false} trigger={<button style={{width:"120px"}} className="button logout-button">Delete User</button>} modal>
                            {(close) => (
                                <div className="popup-container">
                                    <h2 className='center error'>Are you sure you want to delete this User?</h2>
                                    <div className="flex-buttons">
                                        <button disabled={deleteLoading}  onClick={handleDelete} className="button logout-button">
                                            Delete
                                        </button>
                                        <button onClick={close} className='button bg-black'>Close</button>

                                    </div>
                                    <button className='close-popup-icon bg-black' type="button" onClick={close}>❌</button>
                                </div>
                            )}
                        </Popup>

                    </div>
                </ApiStateHandler>
            </main>
            <Footer />
        </div>
    )
}

export default UserDetails
