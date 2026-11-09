// P3: formulario para crear tareas.
//
// Pide título y descripción, y al enviarlo llama a la acción del store que
// agrega la tarea. La tarea nueva debe aparecer sola en la columna "Por hacer",
// sin que este componente tenga que avisarle a nadie: basta que el tablero lea
// las tareas del store.
//
// P5: agregue el campo de categoría y envíelo a la acción.
//
// La barra que lo contiene usa la clase .toolbar del CSS.
//
import { useState } from "react";
import { useTaskStore } from "../store/taskStore";

export const TaskForm = () => {
  // Estado local para controlar los inputs del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // P5: Estado local para el nuevo input de categoría
  const [category, setCategory] = useState("");

  // Obtenemos la acción addTask desde el store global de Zustand
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Evitamos agregar tareas vacías
    if (!title.trim() || !description.trim()) return;

    // P5: Pasamos la categoría opcional al dispatch de addTask
    addTask(title, description, category);
    setTitle("");
    setDescription("");
    setCategory(""); // P5: Limpiamos también el input de categoría
  };

  return (
    // Usa las clases CSS de la plantilla para el formulario
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* P5: Input adicional para pedir la categoría */}
      <input
        type="text"
        placeholder="Categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Agregar tarea</button>
    </form>
  );
};

export default TaskForm;
