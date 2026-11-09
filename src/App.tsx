import { useTaskStore } from "./store/taskStore";
import { TaskForm } from "./components/TaskForm";
import { TaskCard } from "./components/TaskCard";
import { TaskModal } from "./components/TaskModal";
import type { TaskStatus } from "./types/task";

// Definición estática de las 3 columnas del tablero Kanban
const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: "to_do", title: "TODO" },
  { id: "in_progress", title: "IN PROGRESS" },
  { id: "done", title: "DONE" },
];

export const App = () => {
  // P3: Obtenemos la lista global de tareas mediante un selector de Zustand
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="container">
      <h1>Gestor de tareas</h1>

      {/* Formulario para agregar nuevas tareas */}
      <TaskForm />

      {/* Tablero Kanban con las tres columnas */}
      <div className="board">
        {COLUMNS.map((column) => {
          // P3: Estado derivado: Filtramos las tareas por columna sin duplicar arreglos en el store
          const columnTasks = tasks.filter(
            (task) => task.status === column.id
          );

          return (
            <div key={column.id} className="column">
              <h2>{column.title}</h2>
              <div className="task-list">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* P4: Componente Modal montado en el nivel principal */}
      <TaskModal />
    </div>
  );
};

export default App;