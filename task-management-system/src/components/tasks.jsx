import NavBar from "./navBar";
import SideBar from "./sideBar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNotification } from "../context/notificationContext";
import { useState, useEffect } from "react";
import { getAllTasks, updateTask, deleteTask } from "../hooks/useFetch";
import { FaSpinner, FaEdit, FaTrash, FaTimes, FaSave,FaArrowUp } from "react-icons/fa";
import Swal from "sweetalert2";

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const { addNotification } = useNotification();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    dueDate: "",
    status: "To Do",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const tasksData = await getAllTasks();
      setTasks(tasksData);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchQuery === '' || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCompletion = !showCompletedOnly || task.status === "Done";
      return matchesSearch && matchesCompletion;
  });

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setUpdatedTask({
      title: task.title,
      dueDate: task.dueDate,
      status: task.status,
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (taskId) => {
    try {
      const originalTask = tasks.find((task) => task.id === taskId);
      const wasCompleted = originalTask.status === "Done";
      const isNowCompleted = updatedTask.status === "Done";

      await updateTask(taskId, updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      );

      setTasks(updatedTasks);
      setEditingTask(null);

      Swal.fire({
        title: "Success!",
        text: "Task updated successfully",
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
      });

      if (!wasCompleted && isNowCompleted) {
        addNotification(
          `Congratulations! You completed task: ${updatedTask.title}`
        );
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message || "Failed to update task",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDelete = async (taskId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteTask(taskId);
        setTasks(tasks.filter((task) => task.id !== taskId));
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message || "Failed to delete task",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <FaSpinner className="spin" size={32} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Error loading tasks: {error}</div>
      </div>
    );
  }
const handleExportPDF = () => {
  const input = document.querySelector(".table-responsive");
  Swal.fire({
    title: 'Generating PDF...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('tasks.pdf');
    Swal.close();
    Swal.fire({
      title: 'Exported Successfully!',
      text: 'Your tasks have been exported as PDF',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 6000
    });
    
  }).catch((error) => {
    Swal.fire({
      title: 'Error!',
      text: 'Failed to generate PDF',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    console.error('PDF generation error:', error);
  });
};
  return (
    <div
      className="bg-light-green"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <NavBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
      />
      <div className="d-flex ">
        <SideBar />
        <div className="flex-grow-1 p-4 mt-3 mx-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-end mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="showCompleted"
                    checked={showCompletedOnly}
                    onChange={(e) => setShowCompletedOnly(e.target.checked)}
                  />
                  <label
                    className="form-check-label mx-2 text-success fw-bold"
                    htmlFor="showCompleted"
                  >
                    Show Completed Tasks
                  </label>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="text-success">Task</th>
                      <th className="text-success">Due Date</th>
                      <th className="text-success">Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id}>
                        <td className="p-3">
                          {editingTask === task.id ? (
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              value={updatedTask.title}
                              onChange={handleUpdateChange}
                            />
                          ) : (
                            task.title
                          )}
                        </td>
                        <td className="p-3">
                          {editingTask === task.id ? (
                            <input
                              type="date"
                              className="form-control"
                              name="dueDate"
                              value={updatedTask.dueDate}
                              onChange={handleUpdateChange}
                            />
                          ) : (
                            task.dueDate
                          )}
                        </td>
                        <td className="p-3">
                          {editingTask === task.id ? (
                            <select
                              className="form-select"
                              name="status"
                              value={updatedTask.status}
                              onChange={handleUpdateChange}
                            >
                              <option value="To Do">To Do</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Done">Done</option>
                              <option value="Overdue">Overdue</option>
                            </select>
                          ) : (
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
                          )}
                        </td>
                        <td className="p-3">
                          {editingTask === task.id ? (
                            <>
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() => handleUpdate(task.id)}
                              >
                                <FaSave className="me-2" />
                                <span className="px-1 mr-2">Save</span>
                              </button>
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={handleCancelEdit}
                                style={{backgroundColor:'gray'}}
                              >
                                <FaTimes className="me-2" />
                                <span className="px-1 mr-2">Cancel</span>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleEdit(task)}
                                style={{backgroundColor:'orange'}}
                              >
                                <FaEdit className="me-1" /> <span>Update</span>
                              </button>
                              <button
                                className="btn btn-sm btn-danger me-2"
                                onClick={() => handleDelete(task.id)}
                                style={{backgroundColor:'#F32013'}}
                              >
                                <FaTrash className="me-1" /> <span>Delete</span>
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex justify-content-center mb-4">
              <button
                className="btn btn-success btn-lg d-flex align-items-center justify-content-center mt-3 mb-3"
                style={{
                  width: "180px",
                  padding: "12px 10px",
                  borderRadius: "20px",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  boxShadow: "0 4px 6px rgba(0, 100, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
                onClick={handleExportPDF}
              >
                <FaArrowUp className="me-2"/> <span>Export Tasks</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
