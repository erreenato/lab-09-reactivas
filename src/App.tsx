import { useTaskStore } from "./store/taskStore";
import { TaskForm } from "./components/TaskForm";
import { TaskCard } from "./components/TaskCard";
import { TaskModal } from "./components/TaskModal";
import { CategoryFilter } from "./components/CategoryFilter";
import type { TaskStatus } from "./types/task";

// Definición estática de las 3 columnas del tablero Kanban
const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: "to_do", title: "TODO" },
  { id: "in_progress", title: "IN PROGRESS" },
  { id: "done", title: "DONE" },
];

export const App = () => {
  // P6: Leemos las tareas y la categoría activa del store
  const tasks = useTaskStore((state) => state.tasks);
  const selectedCategory = useTaskStore((state) => state.selectedCategory);

  // P6: Estado derivado 1 - Filtrar tareas por categoría activa (sin modificar el store)
  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  return (
    <div className="container">
      <h1>Gestor de tareas</h1>

      {/* Formulario para agregar nuevas tareas */}
      <TaskForm />

      {/* P6: Filtro de categorías */}
      <CategoryFilter />

      
      {/* P6: Si no hay tareas que coincidan con el filtro actual */}
      {filteredTasks.length === 0 ? (
        <p className="no-tasks-message" style={{ marginTop: "1rem" }}>
          No hay tareas que coincidan con la categoría seleccionada.
        </p>
      ) : (
        /* Tablero Kanban */
        <div className="board">
          {COLUMNS.map((column) => {
            // P6: Estado derivado 2 - Agrupar las tareas filtradas en su correspondiente columna
            const columnTasks = filteredTasks.filter(
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
      )}

      {/* P4: Componente Modal montado en el nivel principal */}
      <TaskModal />
    </div>
  );
};

export default App;