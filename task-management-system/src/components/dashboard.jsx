import React, { useState, useEffect } from "react";
import { getAllTasks, createTask } from "../hooks/useFetch";
import Swal from "sweetalert2";
import {
  FaPlus,
  FaCheckCircle,
  FaSpinner,
  FaCalendarAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";

const Dashboard = () => {
  const { darkMode } = useDarkMode();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: "",
    status: "To Do",
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdTasks, setCreatedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getAllTasks();
        setTasks(tasksData);
      } catch (err) {
        setError(err.message || "Failed to fetch tasks");
      }
    };
    fetchTasks();
    const savedTasks = localStorage.getItem("createdTasks");
    if (savedTasks) {
      setCreatedTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("createdTasks", JSON.stringify(createdTasks));
  }, [createdTasks]);
  const allTasks = [...tasks, ...createdTasks];
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(
    (task) => task.status === "Done"
  ).length;
  const inProgressTasks = allTasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const overdueTasks = allTasks.filter(
    (task) => task.status === "Overdue"
  ).length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.title.trim() === "") return;

    setIsLoading(true);
    try {
      const createdTask = await createTask(newTask);
      setCreatedTasks((prev) => [
        ...prev,
        {
          ...createdTask,
          createdAt: new Date().toISOString(),
        },
      ]);
      setNewTask({ title: "", dueDate: "", status: "To Do" });
      setShowTaskForm(false);

      Swal.fire({
        title: "Success!",
        text: "Task created successfully",
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (err) {
      setError(err.message || "Failed to create task");
      Swal.fire({
        title: "Error!",
        text: "",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container ml-0 p-5 mt-2"
      style={{
        width: "80%",
        backgroundColor: darkMode ? "#121212" : "transparent",
        color: darkMode ? "#fff" : "inherit",
      }}
    >
      {error && (
        <div
          className={`alert ${darkMode ? "alert-dark" : "alert-danger"}`}
          role="alert"
        >
          {error}
        </div>
      )}
      <div className="row mb-5">
        {[
          {
            title: "Tasks Due",
            value: totalTasks,
            icon: <FaCalendarAlt />,
            color: "success",
          },
          {
            title: "Completed",
            value: completedTasks,
            icon: <FaCheckCircle />,
            color: "success",
          },
          {
            title: "In Progress",
            value: inProgressTasks,
            icon: <FaSpinner />,
            color: "success",
          },
          {
            title: "OverDue",
            value: overdueTasks,
            icon: <FaExclamationTriangle />,
            color: "success",
          },
        ].map((item, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div
              className="card h-100"
              style={{
                backgroundColor: darkMode ? "#1E1E1E" : "var(--white)",
                borderColor: darkMode ? "#333" : "var(--silver)",
              }}
            >
              <div className="card-body">
                <h6 className={`text-${item.color} mb-3`}>{item.title}</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <h3
                    className="mb-0"
                    style={{ color: darkMode ? "#fff" : "inherit" }}
                  >
                    {item.value}
                  </h3>
                  <div
                    className="p-2 rounded"
                    style={{
                      backgroundColor: darkMode ? "#333" : "var(--tint-5)",
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      className: `text-${item.color}`,
                    })}
                  </div>
                </div>
                {item.title === "Completed" && (
                  <small style={{ color: darkMode ? "#aaa" : "var(--grey)" }}>
                    {completionRate}% completion rate
                  </small>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-center mb-4">
                <button
                  className="btn btn-success btn-lg d-flex align-items-center justify-content-center mt-5"
                  style={{
                    width: "220px",
                    padding: "12px 20px",
                    borderRadius: "20px",
                    fontSize: "1.3rem",
                    fontWeight: "500",
                    boxShadow: "0 4px 6px rgba(0, 100, 0, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => setShowTaskForm(!showTaskForm)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <FaSpinner className="me-2 spin" />
                  ) : (
                    <FaPlus className="me-2" />
                  )}
                  <span>Create New Task</span>
                </button>
              </div>

              {showTaskForm && (
                <div className="d-flex justify-content-center mb-4">
                  <div className="p-4 border rounded bg-light w-100">
                    <form onSubmit={handleAddTask}>
                      <div className="row g-5">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-success pt-3">
                            Task Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={newTask.title}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter task title"
                          />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label fw-semibold text-success pt-3">
                            Due Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="dueDate"
                            value={newTask.dueDate}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label fw-semibold text-success mt-3">
                            Status
                          </label>
                          <select
                            className="form-select"
                            name="status"
                            value={newTask.status}
                            onChange={handleInputChange}
                          >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                            <option value="Overdue">Overdue</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <div className="d-flex justify-content-end gap-3 pt-3">
                            <button
                              type="button"
                              className="btn btn-secondary px-4"
                              onClick={() => setShowTaskForm(false)}
                              disabled={isLoading}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-success px-4"
                              disabled={isLoading}
                            >
                              {isLoading ? "Adding..." : "Add Task"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              <div className="mt-5">
                {createdTasks.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th className="text-success">Task Title</th>
                          <th className="text-success">Due Date</th>
                          <th className="text-success">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {createdTasks.map((task, index) => (
                          <tr key={`created-${index}`}>
                            <td className="p-3">{task.title}</td>
                            <td className="p-3">
                              {task.dueDate || "Not specified"}
                            </td>
                            <td className="p-3">
                              <span
                                className={`badge ${
                                  task.status === "Done"
                                    ? "bg-success"
                                    : task.status === "In Progress"
                                    ? "bg-warning text-dark"
                                    : task.status === "Overdue"
                                    ? "bg-danger"
                                    : "bg-secondary"
                                }`}
                              >
                                {task.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
