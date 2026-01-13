import { useRef, useState } from "react"
import Cookies from "js-cookie"
import TodosHeader from "../TodosHeader"
import Sidebar from "../Sidebar"
import Footer from "../Footer"
import "./index.css"
import { useGetProfileQuery } from "../../services/auth"
import ApiStateHandler from "../ApiStateHandler"
import { toast } from "react-toastify"
import { RingLoader } from "react-spinners"

import { useDispatch } from 'react-redux';
import { setUser } from "../../features/authSlice"
import Modal from "../Modal"

const Profile = () => {
  const { data, isLoading, isError, isFetching, error, refetch } = useGetProfileQuery()
  const { avatar, bio, createdAt, updatedAt, email, role, username } = data ?? {}
  const dispatch = useDispatch()
  const [isUploading, setIsUploading] = useState(false)

  const fileInputRef = useRef(null)
  const [file, setFile] = useState(null)

  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {

    const selectedFile = e.target.files[0]
    if (!selectedFile) return
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      e.target.value = "";
      return;
    }
    if (selectedFile.size > 3 * 1024 * 1024) {
      toast.error("File size must be less than 3MB");
      e.target.value = "";
      return;
    }
    setFile(selectedFile)
    handleUpload(selectedFile)
  }

  const handleUpload = async (selectedFile) => {
    const formData = new FormData()
    formData.append("avatar", selectedFile)
    setIsUploading(true)

    const token = Cookies.get("jwt_token")

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/upload-profile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      )

      const data = await res.json()

      if (data.profileImageUrl) {
        toast.success("Profile Uploaded Successfully!")
        dispatch(setUser({ avatar: data.profileImageUrl }))

        refetch()
        setIsUploading(false)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div>
      <TodosHeader />
      <Sidebar />

      <main className="code-vault-hero">
        <h1 className="center">Profile Page</h1>

        {isUploading ? (
          <div className="flex-layout">
            <h1 className="flex-layout-error">
              We’re updating your profile picture. Please wait while we finish things up.
            </h1>
            <RingLoader color="red" size={60} />
          </div>
        ) : (
          <ApiStateHandler
            error={error}
            data={data}
            isError={isError}
            isLoading={isLoading}
            isFetching={isFetching}
          >
            <div className="user-details-container">
              <div className="flex-container">
                <img
                  src={avatar}
                  alt="profile"
                  onClick={handleAvatarClick}
                  style={{ cursor: "pointer" }}
                  className="profile-lg"
                />

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <h3>Username: {username}</h3>
                {bio && <h2>Bio: {bio}</h2>}
              </div>
              <h3>Email: {email}</h3>
              <h3>Role: {role}</h3>
              <h3>Debut At: {new Date(createdAt).toLocaleString()}</h3>
              <h4>Last Updated At: {new Date(updatedAt).toLocaleString()}</h4>
              <Modal />
            </div>
          </ApiStateHandler>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Profile
