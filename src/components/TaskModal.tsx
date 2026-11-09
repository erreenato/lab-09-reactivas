// P4: modal con el detalle de la tarea seleccionada.
//
// Lee del store si está abierto y qué tarea muestra; si no hay ninguna
// seleccionada, no renderiza nada. Muestra toda la información de la tarea y
// trae un formulario para cambiarle el estado, que llama a la acción
// correspondiente del store.
//
// Recuerde dejar alguna forma de cerrarlo.
//
// Use las clases .modal-overlay y .modal del CSS.
//
import { useState, useEffect } from "react";
import { useTaskStore } from "../store/taskStore";
import type { TaskStatus } from "../types/task";

export const TaskModal = () => {
  // P4: Leemos el ID seleccionado y la lista de tareas del store
  const selectedTaskId = useTaskStore((state) => state.selectedTaskId);
  const tasks = useTaskStore((state) => state.tasks);
  const closeModal = useTaskStore((state) => state.closeModal);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  // P4: Estado derivado: buscamos la tarea correspondiente al ID
  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  // Estado local para el select del estado en el formulario del modal
  const [status, setStatus] = useState<TaskStatus>("to_do");

  // Sincronizamos el estado local cuando cambia la tarea seleccionada
  useEffect(() => {
    if (selectedTask) {
      setStatus(selectedTask.status);
    }
  }, [selectedTask]);

  // P4: Si el modal está cerrado o no existe la tarea, no se renderiza nada
  if (!selectedTaskId || !selectedTask) {
    return null;
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateTaskStatus(selectedTask.id, status);
    closeModal(); // Opcional: cerrar el modal al actualizar
  };

  return (
    // P4: .modal-overlay se cierra al hacer clic en el fondo
    <div className="modal-overlay" onClick={closeModal}>
      {/* stopPropagation evita que al hacer clic dentro del modal se cierre */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{selectedTask.title}</h2>
        <p>
          <strong>Descripción:</strong> {selectedTask.description}
        </p>

        {/* P4: Formulario / Select para actualizar el estado */}
        <form onSubmit={handleUpdate} className="modal-form">
          <label>
            <strong>Estado:</strong>
          </label>
          <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              <option value="to_do">TODO</option>
              <option value="in_progress">IN PROGRESS</option>
              <option value="done">DONE</option>
            </select>
            <button type="submit">Actualizar</button>
          </div>
        </form>

        <p style={{ marginTop: "12px" }}>
          <strong>Fecha:</strong> {new Date(selectedTask.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TaskModal;
