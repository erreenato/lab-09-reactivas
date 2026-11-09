// P2: store global con Zustand. Es el único lugar donde vive el estado de la
// aplicación.
//
// El estado guarda:
//   - P2: la lista de tareas
//   - P4: si el modal está abierto y cuál es la tarea seleccionada
//   - P5: la categoría por la que se está filtrando
//
// Y expone las acciones para:
//   - P2: agregar una tarea
//   - P4: abrir y cerrar el modal, y cambiar el estado de una tarea
//   - P5: cambiar el filtro
//
// La forma de un store de Zustand es la que vieron en clases: un tipo que
// junta estado y acciones, y `create` recibiendo una función que usa `set`.
//
import { create } from "zustand";
import type { Task } from "../types/task";

// Definimos la interfaz del estado y las acciones del store
interface TaskState {
  // Lista global de tareas
  tasks: Task[];
  
  // Acción para agregar una tarea recibiendo solo título y descripción
  addTask: (title: string, description: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  // P2: El store debe partir con la lista de tareas vacía
  tasks: [],

  // P2: Implementación de addTask
  addTask: (title, description) =>
    set((state) => {
      // Generamos una nueva tarea con id único, fecha ISO y estado inicial "to_do"
      const newTask: Task = {
        id: crypto.randomUUID(),             // Genera un ID único de forma nativa
        title,
        description,
        status: "to_do",                     // El estado inicial siempre es "to_do"
        createdAt: new Date().toISOString(), // Fecha en formato ISO string
      };

      // Retornamos un nuevo objeto de estado con un arreglo totalmente nuevo (inmutable)
      return {
        tasks: [...state.tasks, newTask],
      };
    }),
}));
//
// Cuidado con la acción que cambia el estado de una tarea: no modifique el
// arreglo existente, entregue uno nuevo para que React note el cambio.
