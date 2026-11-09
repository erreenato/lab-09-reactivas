// P6: filtro por categoría.
//
// Lee la categoría seleccionada desde el store y la actualiza con la acción que
// definieron en P5. Las categorías disponibles se derivan de las tareas.
//
// El tablero usará esta categoría para mostrar solo las tareas que calzan, o
// todas si no hay ninguna seleccionada.
//
import { useTaskStore } from "../store/taskStore";

export const CategoryFilter = () => {
  // P6: Leemos las tareas, la categoría seleccionada y la función para actualizarla desde Zustand
  const tasks = useTaskStore((state) => state.tasks);
  const selectedCategory = useTaskStore((state) => state.selectedCategory);
  const setSelectedCategory = useTaskStore((state) => state.setSelectedCategory);

  // P6: Estado derivado: calculamos dinámicamente las categorías únicas de las tareas actuales
  const categories = Array.from(new Set(tasks.map((task) => task.category)));

  return (
    <div className="category-filter" style={{ marginBottom: "1rem" }}>
      <select
        value={selectedCategory === null ? "" : selectedCategory}
        onChange={(e) => {
          const val = e.target.value;
          // Si elige string vacío, interpretamos que seleccionó "Todas" (null)
          setSelectedCategory(val === "" ? null : val);
        }}
      >
        {/* P6: Opción por defecto para mostrar todas las tareas */}
        <option value="">Todas</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
