import TodosHeader from "../TodosHeader"
import Sidebar from "../Sidebar"
import Footer from "../Footer"

import "./index.css"

const StreakPage = () => {
  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <main className="code-vault-hero">
        <h1 className="center">Streak Page</h1>
        <h1 className="main-heading center">Stay tuned – streaks launching soon!</h1>
      </main>
      <Footer />

    </div>
  )
}

export default StreakPage
