import { useState, useEffect } from "react";
import { getAllTasks } from "../hooks/useFetch";
import { FaCheckCircle, FaSpinner, FaCalendarAlt, FaExclamationTriangle, FaChartLine, FaTasks } from "react-icons/fa";
import NavBar from "./navBar";
import SideBar from "./sideBar";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getAllTasks();
        setTasks(tasksData);
      } catch (err) {
        setError(err.message || "Failed to fetch analytics data");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "Done").length;
  const inProgressTasks = tasks.filter(task => task.status === "In Progress").length;
  const overdueTasks = tasks.filter(task => 
    new Date(task.dueDate) < new Date() && task.status !== "Done"
  ).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const statusData = {
    labels: ["Completed", "In Progress", "Overdue", "To Do"],
    datasets: [{
      data: [
        completedTasks,
        inProgressTasks,
        overdueTasks,
        totalTasks - completedTasks - inProgressTasks - overdueTasks
      ],
      backgroundColor: [
        "#28a745", // Green
        "#ffc107", // Yellow
        "#dc3545", // Red
        "#6c757d"  // Gray
      ],
      borderWidth: 0,
      hoverOffset: 10
    }]
  };
  const getWeeklyTrendData = () => {
    const now = new Date();
    const weeks = [];
    const completedCounts = [];
    
    for (let i = 3; i >= 0; i--) {
      const startDate = new Date(now);
      startDate.setDate(now.getDate() - (i * 7));
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      
      const weekTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate >= startDate && taskDate <= endDate;
      });
      
      weeks.push(`Week ${i+1}`);
      completedCounts.push(weekTasks.filter(task => task.status === "Done").length);
    }
    
    return {
      labels: weeks,
      datasets: [{
        label: 'Tasks Completed',
        data: completedCounts,
        backgroundColor: 'rgba(40, 167, 69, 0.7)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 1,
        borderRadius: 4
      }]
    };
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light-green">
        <FaSpinner className="spin text-success" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light-green" style={{ minHeight: '100vh',backgroundColor: '#f8f9fa'}}>
      <NavBar />
      <div className="d-flex">
        <SideBar />
        <div className="flex-grow-1 p-4 mt-3 mx-5">
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card border-success h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-success mb-3">Total Tasks</h6>
                      <h3 className="mb-0">{totalTasks}</h3>
                    </div>
                    <div className="bg-light-green p-3 rounded">
                      <FaTasks className="text-success" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-success h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-success mb-3">Completed</h6>
                      <h3 className="mb-0">{completedTasks}</h3>
                      <small className="text-muted">{completionRate}% completion rate</small>
                    </div>
                    <div className="bg-light-green p-3 rounded">
                      <FaCheckCircle className="text-success" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-success h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-success mb-3">In Progress</h6>
                      <h3 className="mb-0">{inProgressTasks}</h3>
                    </div>
                    <div className="bg-light-green p-3 rounded">
                      <FaSpinner className="text-warning" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card border-success h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-success mb-3">Overdue</h6>
                      <h3 className="mb-0">{overdueTasks}</h3>
                    </div>
                    <div className="bg-light-green p-3 rounded">
                      <FaExclamationTriangle className="text-danger" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card border-success h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="text-success mb-3">Task Status Distribution</h5>
                  <div style={{ height: '300px' }}>
                    <Pie 
                      data={statusData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                            labels: {
                              color: '#28a745',
                              font: {
                                size: 12
                              }
                            }
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                return `${context.label}: ${context.raw} (${Math.round(context.percent)}%)`;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card border-success h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="text-success mb-3">Weekly Completion Trend</h5>
                  <div style={{ height: '300px' }}>
                    <Bar 
                      data={getWeeklyTrendData()}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              color: '#28a745'
                            },
                            grid: {
                              color: 'rgba(40, 167, 69, 0.1)'
                            }
                          },
                          x: {
                            ticks: {
                              color: '#28a745'
                            },
                            grid: {
                              color: 'rgba(40, 167, 69, 0.1)'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card border-success shadow-sm">
                <div className="card-body">
                  <h5 className="text-success mb-3">Performance Metrics</h5>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="p-3 bg-light-green rounded mb-3">
                        <h6 className="text-success">Avg Completion Time</h6>
                        <h4 className="text-success">3.2 days</h4>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 bg-light-green rounded mb-3">
                        <h6 className="text-success">On-Time Rate</h6>
                        <h4 className="text-success">78%</h4>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 bg-light-green rounded mb-3">
                        <h6 className="text-success">Busiest Day</h6>
                        <h4 className="text-success">Wednesday</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .bg-light-green {
          background-color: #f0f7f0;
        }
        .card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0, 100, 0, 0.1) !important;
        }
        .border-success {
          border-color: #28a745 !important;
        }
        .text-success {
          color: #28a745 !important;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Analytics;