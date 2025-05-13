import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  deleteTask,
  toggleTaskCompletion,
  editTask,
  setTaskPriority,
  deleteMultipleTasks,
} from './store/tasksSlice';
import { useState } from 'react';

function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(addTask({ id: Date.now(), title: taskTitle, completed: false, priority: 'Medium' }));
      setTaskTitle('');
    }
  };

  const handleDeleteTask = (id) => dispatch(deleteTask(id));

  const handleToggleTask = (id) => dispatch(toggleTaskCompletion(id));

  const handleEditTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setEditMode(id);
      setEditTitle(task.title);
    }
  };

  const handleSaveEdit = (id) => {
    if (editTitle.trim()) {
      dispatch(editTask({ id, newTitle: editTitle }));
      setEditMode(null);
      setEditTitle('');
    }
  };

  const handlePriorityChange = (id, priority) => {
    dispatch(setTaskPriority({ id, priority }));
  };

  const handleDeleteMultipleTasks = () => {
    if (selectedTasks.length > 0) {
      dispatch(deleteMultipleTasks(selectedTasks));
      setSelectedTasks([]);
    }
  };

  const handleTaskSelection = (id) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Task Tracker</h1>
          <nav>
            <ul className="flex space-x-4">
              <li className="hover:underline cursor-pointer">Home</li>
              <li className="hover:underline cursor-pointer">About</li>
              <li className="hover:underline cursor-pointer">Contact</li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center bg-gray-100 py-10">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Your Tasks</h2>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Add a new task"
          />
          <button
            onClick={handleAddTask}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Task
          </button>

          <ul className="mt-4 space-y-3">
            {incompleteTasks.map((task) => (
              <li
                key={task.id}
                className={`flex flex-wrap justify-between items-center p-3 rounded-lg ${
                  task.completed ? 'bg-green-200' : 'bg-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleTaskSelection(task.id)}
                  className="mr-2"
                />
                {editMode === task.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 p-1 border border-gray-300 rounded mr-2"
                  />
                ) : (
                  <span
                    className={`flex-1 cursor-pointer ${
                      task.completed ? 'line-through' : ''
                    }`}
                    onClick={() => handleToggleTask(task.id)}
                  >
                    {task.title}
                  </span>
                )}

                {editMode === task.id ? (
                  <button
                    onClick={() => handleSaveEdit(task.id)}
                    className="ml-2 text-green-500 hover:text-green-700"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditTask(task.id)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                    <select
                      value={task.priority}
                      onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                      className="ml-2 bg-white border border-gray-300 rounded p-1"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </>
                )}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-4">Completed Tasks</h3>
          <ul className="space-y-3">
            {completedTasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-200 opacity-60"
              >
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleTaskSelection(task.id)}
                  className="mr-2"
                />
                <span
                  className="flex-1 cursor-pointer line-through"
                  onClick={() => handleToggleTask(task.id)}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {selectedTasks.length > 0 && (
            <button
              onClick={handleDeleteMultipleTasks}
              className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
            >
              Delete Selected Tasks
            </button>
          )}
        </div>
      </main>

      <footer className="bg-blue-600 text-white text-center p-4"></footer>
    </div>
  );
}

export default App;