// P1: estructura de una tarea.
//
// Cada tarea tiene id, título, descripción, estado y fecha de creación. El
// estado es uno de tres: por hacer, en progreso o terminada; conviene
// declararlo como un tipo aparte, porque el tablero y el formulario del modal
// recorren esos tres valores.
//
// El estado inicial de una tarea recién creada siempre es "por hacer".// P1: Definición de valores permitidos para el estado de una tarea
export type TaskStatus = "to_do" | "in_progress" | "done";

// P1: Interfaz principal para una Tarea
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  category?: string; // Lo usaremos más adelante en la P5
}

// P5: agregue después el atributo de categoría.
//
// export type TaskStatus = ...
//
// export interface Task {
//   ...
// }
