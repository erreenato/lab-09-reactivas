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
import { useTaskStore } from "../store/taskStore";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  // P4: Obtenemos la acción openModal del store
  const openModal = useTaskStore((state) => state.openModal);

  return (
    // P4: Al hacer clic en la tarjeta se abre el modal para esta tarea
    <div className="task-card" onClick={() => openModal(task.id)}>
      <h3>{task.title}</h3>
      <p className="task-date">{task.createdAt}</p>
      {/* P5: Muestra la categoría debajo de la fecha */}
      <p className="task-category">{task.category}</p>
    </div>
  );
};

export default TaskCard;
