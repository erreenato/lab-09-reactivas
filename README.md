# Laboratorio 9: manejo avanzado del estado

Punto de partida para el gestor de tareas tipo kanban, con todo el estado global
en un store de Zustand.

## Cómo correrlo

```sh
npm install
npm run dev
```

Abra `http://localhost:5173`.

`zustand` ya está en las dependencias, así que `npm install` la trae junto al
resto: no hace falta instalarla aparte.

## Qué hay que escribir

Cada archivo trae comentarios con lo que le corresponde. La numeración sigue las
preguntas del enunciado.

| Archivo | Pregunta |
|---|---|
| `src/types/task.ts` | P1, y después P5 |
| `src/store/taskStore.ts` | P2, y después P4 y P5 |
| `src/components/TaskCard.tsx` | P2, y después P4 y P5 |
| `src/components/TaskForm.tsx` | P3, y después P5 |
| `src/App.tsx` | P3, y después P4 y P6 |
| `src/components/TaskModal.tsx` | P4 |
| `src/components/CategoryFilter.tsx` | P6 |

La P1 es conceptual y define los tipos en `src/types/task.ts`.

## Estilos

`src/index.css` ya trae las clases del tablero, las tarjetas y el modal, con la
lista completa comentada al principio del archivo. Las clases ya están listas: basta usarlas.

## Pregunta 1: Manejo del Estado en la Aplicación

### a) ¿Qué problema resuelve un store global como Zustand frente a mantener el estado con `useState` en cada componente? Relación con el tablero y el modal.
Resuelve el problema del **prop drilling** y la falta de una **única fuente de la verdad**. Si usáramos `useState` en componentes locales, tendríamos que elevar el estado (*lifting state up*) hasta la raíz `App` y pasar datos o callbacks a través de múltiples niveles de componentes. 

En esta aplicación:
* `TaskForm` crea una tarea sin necesidad de pasarle callbacks desde `App` ni comunicarse directamente con las columnas del tablero.
* Al hacer clic en una `TaskCard`, se abre el `TaskModal` y se actualiza el estado de esa tarea sin tener que transmitir eventos o estados manuales de padre a hijo a lo largo del árbol de componentes.

---

### b) ¿Por qué una acción del store debe entregar un arreglo nuevo en vez de modificar el existente? ¿Qué consecuencia tiene para la vista?
React y Zustand detectan cuándo re-renderizar los componentes comparando la **referencia en memoria** del estado (`===`). 

Si mutamos el arreglo existente (por ejemplo, con `.push()`), la referencia al arreglo sigue siendo la misma. Como consecuencia, **React asume que el estado no ha cambiado y la vista no se actualiza (no se re-renderiza)**. Retornar un arreglo nuevo (usando spread `[...state.tasks, nuevaTarea]` o `.map()`) crea una nueva referencia en memoria, forzando a React a volver a dibujar la interfaz con los datos actualizados.

---

### c) ¿Por qué conviene guardar en el store solo el `id` de la tarea seleccionada y no una copia completa de la tarea?
Para mantener el principio de **única fuente de la verdad** y evitar inconsistencias de datos (*stale state*). 

Si guardamos una copia completa de la tarea en el modal y luego editamos su estado o categoría en el store, la copia del modal se quedaría desactualizada. Al guardar solo el `id` (por ejemplo, `selectedTaskId: string | null`), el modal busca la tarea en tiempo real dentro del arreglo global `tasks`. Así, cualquier cambio en la tarea se refleja inmediatamente en el modal.