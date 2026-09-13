# Task Tracker

A tiny, beginner-friendly React app built to demonstrate the core concepts
you need for almost any React project. It's a single-file to-do list —
add tasks, mark them done, delete them.

## What it teaches

| Concept | Where to look in the code |
|---|---|
| `useState` | `tasks` and `input` state at the top of `TaskTracker` |
| Handling events | `handleAddTask`, `onChange` on the input |
| Rendering lists with `.map()` | `tasks.map(...)` inside the `<ul>` |
| Conditional rendering | The empty-state message vs. the task list |
| Props / component composition | `TaskItem` receives `task`, `onToggle`, `onDelete` from its parent |
| Immutable state updates | `setTasks([...tasks, newTask])`, `.map()` / `.filter()` instead of mutating |

## Project structure

```
task-tracker.jsx   # the whole app — one component tree, one file
README.md          # this file
```

## Running it locally

This file is written as a standard React component (`export default function TaskTracker()`), so you can drop it into any React setup. The quickest way:

1. Create a new project:
   ```bash
   npx create-react-app task-tracker
   cd task-tracker
   ```
2. Install the one icon library it uses:
   ```bash
   npm install lucide-react
   ```
3. Replace the contents of `src/App.js` with `task-tracker.jsx`, and import it in `src/index.js`:
   ```jsx
   import TaskTracker from "./App";
   ```
4. Start the dev server:
   ```bash
   npm start
   ```

(If you're using Vite instead of Create React App, the same file works — just place it in `src/App.jsx`.)

## Suggested next steps

Once this makes sense, try extending it yourself — each of these reuses a concept already in the file:

- **Filter tabs** (All / Active / Done) — another `useState` variable plus conditional rendering.
- **Persist tasks** — save `tasks` to `localStorage` so they survive a page refresh (use `useEffect`).
- **Edit a task's text** — click a task to turn it into an editable input.
- **Due dates** — add a `dueDate` field to each task object and sort by it.

## Why it's built this way

The app avoids extra libraries (no routing, no state management tool) on
purpose — everything happens with `useState` and plain arrays, which is
the right toolset for a project this size and the best starting point for
learning React before reaching for anything heavier.
