import TodosHeader from "../TodosHeader"
import Sidebar from "../Sidebar"
import Footer from "../Footer"
import ApiStateHandler from "../ApiStateHandler"
import { useDashboardDataQuery } from "../../services/getDashboard"
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import "./index.css"
import { useState } from "react"

const Dashboard = () => {
  const [days, setDays] = useState("7")
  const { data, isLoading, isError, error, isFetching } = useDashboardDataQuery({ days: days })
  console.log(data)

  const { statusBreakdown, priorityBreakdown, completionBreakdown, pendingBreakdown, tagBreakdown, totalTasks } = data ?? {};
  

  // Safe access for statusBreakdown
  const statusData = {
    labels: ['Total Tasks', 'Pending Tasks', "Completed Tasks"],
    datasets: [{
      data: [statusBreakdown?.totalTasks ?? 0, statusBreakdown?.pending ?? 0, statusBreakdown?.completed ?? 0],
      backgroundColor: ['#60a5fa', '#f87171', "#34d399"]
    }],
  };

  // Safe access for priorityBreakdown
  const priorityData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [{
      label: 'Priority',
      data: [
        priorityBreakdown?.low ?? 0,
        priorityBreakdown?.medium ?? 0,
        priorityBreakdown?.high ?? 0
      ],
      backgroundColor: ['#60a5fa', '#fbbf24', '#f87171']
    }],
  };

  // Safe access for completionBreakdown
  const completionData = {
    labels: completionBreakdown?.map(d => d.date) ?? [],
    datasets: [{
      label: 'Completed Tasks',
      data: completionBreakdown?.map(d => d.count) ?? [],
      borderColor: '#34d399',
      backgroundColor: 'rgba(52,211,153,0.2)',
      tension: 0.4,
      fill: true
    }],
  };

  // Safe access for missedBreakdown
  const missedData = {
    labels: pendingBreakdown?.map(d => d.date) ?? [],
    datasets: [{
      label: 'Pending Tasks',
      data: pendingBreakdown?.map(d => d.count) ?? [],
      borderColor: '#f87171',
      backgroundColor: 'rgba(248,113,113,0.2)',
      tension: 0.4,
      fill: true
    }],
  };

  // Safe access for tagBreakdown
  const tagData = {
    labels: tagBreakdown?.map(d => d.tag) ?? [],
    datasets: [{
      label:"Tag",
      data: tagBreakdown?.map(d => d.count) ?? [],
      backgroundColor: ['#60a5fa', '#fbbf24', '#34d399', '#f472b6', '#f87171', '#a78bfa', '#fcd34d']
    }],
  };

  const commonOptions = (titleText) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: titleText,
        align: 'center',
        font: {
          size: 18,
          weight: '600',
        },
        padding: {
          bottom: 10,
        },
      },
    },
  });

  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <main className="code-vault-hero">
        <h1 className="center">Dashboard</h1>
       
        
        {(totalTasks <= 4) ? (<div className="flex-layout">
          <img
            src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1754304003/Screenshot_2025-08-04_160928_tkliwk.webp"
            alt="no data"
          />
          <h1 className="error">You don’t have enough data to show the dashboard</h1>
        </div>) :
          (<>
            <select className="days-filter"
              value={days}
              onChange={(e) => setDays(e.target.value)}>
              <option value="">Select Days</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="180">Last 180 days</option>
              <option value="365">Last 365 days</option>
            </select>
            <ApiStateHandler error={error} data={data} isError={isError} isFetching={isFetching} isLoading={isLoading}>
              <div className="dashboard-grid">
                <div className="chart-box"><Pie data={statusData} options={commonOptions("Tasks by status")} /></div>
                <div className="chart-box"><Doughnut data={priorityData} options={commonOptions("Tasks by priority")} /></div>
                <div className="chart-box"><Line data={completionData} options={commonOptions("Completed tasks trend")} /></div>
                <div className="chart-box"><Line data={missedData} options={commonOptions("Missed tasks trend")} /></div>
                <div className="chart-box"><Bar data={tagData} options={commonOptions("Tasks by Tag")} /></div>
              </div>


            </ApiStateHandler>
          </>)}

      </main>
      <Footer />
    </div>
  )
}

export default Dashboard
