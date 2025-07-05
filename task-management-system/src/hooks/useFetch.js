const BASE_URL = "http://localhost:3000/tasks";

const fetchData = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const createTask = (taskData) => fetchData("", 'POST', taskData);
export const getAllTasks = () => fetchData("");
export const getTaskById = (id) => fetchData(`/${id}`);
export const updateTask = (id, taskData) => fetchData(`/${id}`, 'PUT', taskData);
export const deleteTask = (id) => fetchData(`/${id}`, 'DELETE');