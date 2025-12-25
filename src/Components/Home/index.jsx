import { Link, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken) {
    return <Navigate to="/tasks" />
  }

  return (
    <div className="app-container">
      <Header />

      <main className="hero">
        <div>
          <img
            className="hero-image"
            src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1749118861/todo-images_ehns3k.webp"
            alt="todo"
          />
        </div>
        <div className="hero-content">
          <h1 className="heading">Focus On What Matters.</h1>

          <p className="content">
            Life is full of noise, but your goals deserve clarity. With our app,
            organize your tasks, prioritize what’s important, and achieve more
            with ease. Simplify your day and make every moment count.
          </p>

          <div className="button-center">
            <Link to="/login"><button className="button hero-button">Go!</button></Link>
          </div>
        </div>


      </main>
    </div>
  )
}

export default Home
