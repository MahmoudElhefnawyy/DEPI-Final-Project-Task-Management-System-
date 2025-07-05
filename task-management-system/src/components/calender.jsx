import NavBar from './navBar'
import SideBar from './sideBar'
import { useState, useEffect } from "react";
import { getAllTasks } from "../hooks/useFetch";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, isBefore, isToday } from "date-fns";
import { FaChevronLeft, FaChevronRight, FaCircle, FaTasks ,FaSpinner} from "react-icons/fa";
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getAllTasks();
        const formattedTasks = tasksData.map(task => ({
          ...task,
          dueDate: new Date(task.dueDate)
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const getDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };
  const getTasksForDate = (date) => {
    return tasks.filter(task => isSameDay(task.dueDate, date));
  };
  const changeMonth = (direction) => {
    setCurrentDate(addMonths(currentDate, direction === 'prev' ? -1 : 1));
  };
  const getStatusColor = (task) => {
    if (task.status === "Done") return "bg-success";
    if (isBefore(task.dueDate, new Date()) && task.status !== "Done") return "bg-danger";
    if (task.status === "In Progress") return "bg-warning";
    return "bg-info";
  };

  const colorClasses = {
    headerBg: "bg-light-green",
    headerText: "text-success",
    buttonPrimary: "btn-success",
    buttonOutline: "btn-outline-success",
    calendarBorder: "border-success",
    todayBg: "bg-light-green-soft",
    selectedBg: "bg-success-light"
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <FaSpinner className="spin" size={32} />
      </div>
    );
  }
  return (
    <div className={`${colorClasses.headerBg} vh-100` } style={{ backgroundColor: '#f8f9fa'}}>
      <NavBar />
      <div className="d-flex">
        <SideBar />
        <div className="flex-grow-1 p-4 mt-3 mx-5">
          <div className={`card border-${colorClasses.calendarBorder} shadow-sm`}>
            <div className="card-body">
              <div className={`d-flex justify-content-between align-items-center mb-4 ${colorClasses.headerText}`}>
                <div>
                  <h3 className="mb-0">{format(currentDate, 'MMMM yyyy')}</h3>
                </div>
                <div className="d-flex align-items-center">
                  <button 
                    className={`btn btn-success me-2`}
                    onClick={() => changeMonth('prev')}
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    className={`btn btn-light me-2`}
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Today
                  </button>
                  <button 
                    className={`btn btn-success me-2`}
                    onClick={() => changeMonth('next')}
                  >
                    <FaChevronRight />
                  </button>
                  <div className="btn-group ms-4 gap-3">
                    <button 
                      className={ `btn btn-light me-2`}
                      onClick={() => setViewMode('month')}
                    >
                      Month
                    </button>
                    <button 
                      className={`btn btn-light me-2`}
                      onClick={() => setViewMode('week')}
                    >
                      Week
                    </button>
                    <button 
                      className={`btn btn-light me-2`}
                      onClick={() => setViewMode('day')}
                    >
                      Day
                    </button>
                  </div>
                </div>
              </div>
              {viewMode === 'month' && (
                <div className="calendar-month-view">
                  <div className="row calendar-header">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="col text-center fw-bold text-success py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="row calendar-days">
                    {getDays().map((day, i) => {
                      const dayTasks = getTasksForDate(day);
                      const isCurrentMonth = isSameMonth(day, currentDate);
                      const isTodayDate = isToday(day);
                      const isSelected = isSameDay(day, selectedDate);
                      return (
                        <div 
                          key={i}
                          className={`col calendar-day ${isCurrentMonth ? '' : 'calendar-day-outside'} 
                            ${isTodayDate ? colorClasses.todayBg : ''} 
                            ${isSelected ? colorClasses.selectedBg : ''}`}
                          onClick={() => setSelectedDate(day)}
                        >
                          <div className="calendar-day-number">
                            {format(day, 'd')}
                          </div>
                          <div className="calendar-day-tasks">
                            {dayTasks.slice(0, 3).map(task => (
                              <div 
                                key={task.id}
                                className={`calendar-task-dot ${getStatusColor(task)}`}
                                title={`${task.title} - ${task.status}`}
                              >
                                <FaCircle className="me-1" />
                                <span className="calendar-task-title">{task.title}</span>
                              </div>
                            ))}
                            {dayTasks.length > 3 && (
                              <div className="calendar-more-tasks text-success">
                                +{dayTasks.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="mt-4">
                <h5 className="d-flex align-items-center text-success">
                  <FaTasks className="me-2" />
                  Tasks for {format(selectedDate, 'MMMM d, yyyy')}
                </h5>
                {getTasksForDate(selectedDate).length > 0 ? (
                  <div className="list-group">
                    {getTasksForDate(selectedDate).map(task => (
                      <div 
                        key={task.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <span className={`badge ${getStatusColor(task)} me-2`}>
                            {task.status}
                          </span>
                          {task.title}
                        </div>
                        <small className="text-muted">
                          Due: {format(task.dueDate, 'MMM d, h:mm a')}
                        </small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-success">
                    No tasks scheduled for this day.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .calendar-day {
          min-height: 100px;
          border: 1px solid #e0f0e0;
          padding: 5px;
          transition: all 0.2s;
        }
        .calendar-day:hover {
          background-color: #f0faf0;
          cursor: pointer;
        }
        .calendar-day-outside {
          background-color: #f8faf8;
          color: #a0b0a0;
        }
        .bg-light-green {
          background-color: #f0f7f0;
        }
        .bg-light-green-soft {
          background-color: #e0f0e0;
        }
        .bg-success-light {
          background-color: #d4edda;
        }
        .calendar-day-number {
          font-weight: bold;
          margin-bottom: 5px;
          color: #28a745;
        }
        .calendar-task-dot {
          font-size: 0.8rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 2px;
          color: #fff;
          padding: 2px 5px;
          border-radius: 3px;
        }
        .calendar-task-title {
          font-size: 0.7rem;
        }
        .calendar-more-tasks {
          font-size: 0.7rem;
        }
      `}</style>
    </div>
  );
};
export default Calendar;