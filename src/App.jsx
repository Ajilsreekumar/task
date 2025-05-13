// src/App.jsx
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, toggleTaskCompletion } from './store/tasksSlice';
import { useState } from 'react';

function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(addTask({ id: Date.now(), title: taskTitle, completed: false }));
      setTaskTitle('');
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleTask = (id) => {
    dispatch(toggleTaskCompletion(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Task Tracker</h1>
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
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-3 rounded-lg ${
                task.completed ? 'bg-green-200' : 'bg-gray-200'
              }`}
            >
              <span
                className={`flex-1 cursor-pointer ${
                  task.completed ? 'line-through' : ''
                }`}
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
      </div>
    </div>
  );
}

export default App;
