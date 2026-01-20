import TodosHeader from "../TodosHeader"
import Sidebar from "../Sidebar"
import Footer from "../Footer"

import Tooltip from '../Tooltip';

import "./index.css"
import { useState } from "react"
import { useGetStreakDataQuery } from "../../services/getStreak"
import ApiStateHandler from "../ApiStateHandler"

const currentYear = new Date().getFullYear();
const years = [];
for (let i = 0; i < 3; i++) {
  years.push({ year: currentYear - i });
}

const StreakPage = () => {
  const [year, setYear] = useState(currentYear)
  const handleYear = (e) => {
    setYear(e.target.value)
  }
  const { data, isLoading, isFetching, isError, error } = useGetStreakDataQuery({ year })

  const createDataMap = (data) => {
    const map = {}
    data.forEach((each) => {
      map[each.date] = each.count
    })
    return map
  }
  const getDaysInMonth = (year, monthIdx) => {
    return new Date(year, monthIdx + 1, 0).getDate()
  }

  function createYearData(year, data) {

    const dataMap = createDataMap(data);
    const result = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let month = 0; month < 12; month++) {
      const daysInMonth = getDaysInMonth(year, month);
      const monthData = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        monthData.push({
          date: dateStr,
          count: dataMap[dateStr] || 0,
        });
      }

      result.push({ data: monthData, month: monthNames[month] });
    }

    return result;
  }


  const getDateSuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // special case for 11th to 13th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const getBackgroundColor = (count) => {
    if (count === 0) {
      return "white"; 
    } else if (count <= 2) {
      return '#c8e6c9';
    } else if (count <= 4) {
      return '#a5d6a7'; 
    } else if (count <= 6) {
      return '#66bb6a'; 
    } else if (count <= 8) {
      return '#43a047'; 
    } else {
      return '#2e7d32'; 
    }
  };

  const yearData = !isLoading && !isFetching ? createYearData(year, data ?? []) : [];

  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <main className="streak-container">
        <h1 className="center main-heading">Streak Page</h1>
        <select onChange={handleYear} value={year} className="input-element">
          {years.map((each, idx) => (
            <option key={idx}>{each.year}</option>
          ))}
        </select>
        <ApiStateHandler error={error} data={data} isError={isError} isLoading={isLoading} isFetching={isFetching}>
          <div className="grid-container">
            {yearData.map((monthData, index) => (
              <div className="grid-item" key={index}>
                <h2>{monthData.month}</h2>

                <div className="boxes">
                  {monthData.data.map((day, idx) => {
                    const dayNumber = parseInt(day.date.split('-')[2]);
                    const suffix = getDateSuffix(dayNumber);
                    const tooltipText = `${day.count} task${day.count !== 1 ? 's' : ''} completed on ${dayNumber}${suffix}`;

                    return (
                      <Tooltip text={tooltipText} key={day.date}>
                        <div style={{backgroundColor:getBackgroundColor(day.count)}} className="box" >
                          {idx + 1}
                        </div>
                      </Tooltip>
                    );
                  })}

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

export default StreakPage
