import React, { useState } from "react";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";

/*
  TASK TRACKER — a beginner-friendly React project
  ---------------------------------------------------
  This one file demonstrates the core ideas you need for almost
  any React app:

  1. useState        -> storing data that can change ("state")
  2. Handling events  -> reacting to typing, clicking, submitting
  3. Rendering lists  -> turning an array of data into UI elements
  4. Conditional UI   -> showing different things based on state
  5. Props            -> passing data from a parent to a child component

  Read the comments as you go — they explain the "why", not just the "what".
*/

// ---------- Small reusable component (this is what "props" means) ----------
// TaskItem doesn't know anything about the rest of the app.
// It just receives data (a task) and functions (onToggle, onDelete) as props,
// and displays itself. This separation is a core React habit.
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <button
        className="icon-btn"
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? "Mark as not done" : "Mark as done"}
      >
        {task.done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
      </button>

      <span className={task.done ? "task-text done" : "task-text"}>
        {task.text}
      </span>

      <button
        className="icon-btn delete"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}

// ---------- Main component ----------
export default function TaskTracker() {
  // "tasks" is our state: an array of task objects.
  // Whenever we call setTasks(...), React re-renders the UI automatically.
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn useState and useEffect", done: true },
    { id: 2, text: "Build a small project like this one", done: false },
    { id: 3, text: "Push it to GitHub", done: false },
  ]);

  // "input" holds whatever the user is currently typing in the text box.
  const [input, setInput] = useState("");

  // Called when the form is submitted (Enter key or button click)
  function handleAddTask(e) {
    e.preventDefault(); // stops the page from refreshing on submit

    const trimmed = input.trim();
    if (trimmed === "") return; // ignore empty input

    const newTask = {
      id: Date.now(), // a quick way to get a unique id
      text: trimmed,
      done: false,
    };

    // Never mutate state directly (no tasks.push(...)).
    // Instead, create a NEW array that includes the old tasks plus the new one.
    setTasks([...tasks, newTask]);
    setInput(""); // clear the input box
  }

  // Flips a task's "done" status by id
  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  // Removes a task by id
  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="app">
      <div className="card">
        <h1>Task Tracker</h1>
        <p className="subtitle">
          {tasks.length === 0
            ? "No tasks yet — add one below."
            : `${doneCount} of ${tasks.length} done`}
        </p>

        {/* Form for adding a new task */}
        <form className="add-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="add-btn">
            <Plus size={18} />
            Add
          </button>
        </form>

        {/* Conditional rendering: show a message if the list is empty */}
        {tasks.length === 0 ? (
          <p className="empty">Nothing here. Enjoy the silence. 🎉</p>
        ) : (
          <ul className="task-list">
            {/* Rendering a list: map() turns each task into a TaskItem.
                The "key" prop helps React track items efficiently. */}
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        .app {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f6f8;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          padding: 24px;
        }
        .card {
          background: #ffffff;
          width: 100%;
          max-width: 420px;
          border-radius: 12px;
          padding: 28px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        h1 {
          margin: 0 0 4px;
          font-size: 22px;
          color: #1a1a1a;
        }
        .subtitle {
          margin: 0 0 20px;
          color: #6b7280;
          font-size: 14px;
        }
        .add-form {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .add-form input {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }
        .add-form input:focus {
          border-color: #4f46e5;
        }
        .add-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0 14px;
          font-size: 14px;
          cursor: pointer;
        }
        .add-btn:hover { background: #4338ca; }
        .task-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .task-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 8px;
          border-radius: 8px;
        }
        .task-item:hover { background: #f9fafb; }
        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          color: #6b7280;
          padding: 2px;
        }
        .icon-btn:hover { color: #4f46e5; }
        .icon-btn.delete:hover { color: #dc2626; }
        .task-text {
          flex: 1;
          font-size: 14px;
          color: #1f2937;
        }
        .task-text.done {
          text-decoration: line-through;
          color: #9ca3af;
        }
        .empty {
          text-align: center;
          color: #9ca3af;
          font-size: 14px;
          padding: 20px 0;
        }
      `}</style>
    </div>
  );
}
