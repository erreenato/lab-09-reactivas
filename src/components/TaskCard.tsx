// P2: tarjeta de una tarea dentro de una columna. Muestra el título y la fecha
// de creación.
//
// P4: al hacer clic, llama a la acción del store que abre el modal, pasándole
// el id de la tarea.
//
// P5: muestre también la categoría.
//
// Use las clases .card, .card-title y .card-meta del CSS.
//
import type { Task } from "../types/task";

// Definimos las props que recibe el componente TaskCard
interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    // La clase "task-card" viene resuelta en src/index.css
    <div className="task-card">
      {/* Título de la tarea */}
      <h3>{task.title}</h3>
      
      {/* Fecha de creación de la tarea */}
      <p className="task-date">{task.createdAt}</p>
    </div>
  );
};

export default TaskCard;
