import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { ActualizarTareaDTO, Tarea } from "../../interfaces/Tareas";
import { useUsuarios } from "../../hooks/useUsuarios";
import { useProyectos } from "../../hooks/useProyectos";
import Button from "../ui/Button";

interface Props {
  tarea: Tarea;
  onSubmit: (data: ActualizarTareaDTO) => Promise<void>;
  onCancel: () => void;
}

export default function EditarTareaForm({ tarea, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ActualizarTareaDTO>({
    defaultValues: {
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      estado: tarea.estado,
      proyectoId: tarea.proyectoId,
      usuarioId: tarea.usuarioId,
    },
  });

  const { usuarios, loading: loadingUsuarios } = useUsuarios();
  const { proyectos, loading: loadingProyectos } = useProyectos();

  // Una vez que los datos cargan, re-aplicamos los valores para que el select quede pre-seleccionado
  useEffect(() => {
    if (!loadingUsuarios && !loadingProyectos) {
      reset({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        estado: tarea.estado,
        proyectoId: tarea.proyectoId,
        usuarioId: tarea.usuarioId,
      });
    }
  }, [loadingUsuarios, loadingProyectos, reset, tarea]);

  const campo =
    "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const error = "border-red-400 bg-red-50";
  const normal = "border-slate-200 bg-white";

  const estadoOpciones = [
    { value: "PENDIENTE",   label: "PENDIENTE"   },
    { value: "EN_PROGRESO", label: "EN_PROGRESO" },
    { value: "COMPLETADA",  label: "COMPLETADA"  },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Título *</label>
        <input
          {...register("titulo", {
            required: "El título es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
          className={`${campo} ${errors.titulo ? error : normal}`}
        />
        {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Descripción *</label>
        <input
          {...register("descripcion", {
            required: "La descripción es obligatoria",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
          className={`${campo} ${errors.descripcion ? error : normal}`}
        />
        {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Estado *</label>
        <select
          {...register("estado", { required: "El estado es obligatorio" })}
          className={`${campo} ${errors.estado ? error : normal}`}
        >
          {estadoOpciones.map((e) => (
            <option key={e.value} value={e.value}>
              {e.label}
            </option>
          ))}
        </select>
        {errors.estado && <p className="text-red-500 text-xs mt-1">{errors.estado.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Proyecto *</label>
        <select
          {...register("proyectoId", {
            required: "El proyecto es obligatorio",
            valueAsNumber: true,
          })}
          className={`${campo} ${errors.proyectoId ? error : normal}`}
          disabled={loadingProyectos}
        >
          <option value="">
            {loadingProyectos ? "Cargando proyectos..." : "Selecciona un proyecto"}
          </option>
          {proyectos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
        {errors.proyectoId && <p className="text-red-500 text-xs mt-1">{errors.proyectoId.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Responsable *</label>
        <select
          {...register("usuarioId", {
            required: "El responsable es obligatorio",
            valueAsNumber: true,
          })}
          className={`${campo} ${errors.usuarioId ? error : normal}`}
          disabled={loadingUsuarios}
        >
          <option value="">
            {loadingUsuarios ? "Cargando usuarios..." : "Selecciona un usuario"}
          </option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre} — {u.email}
            </option>
          ))}
        </select>
        {errors.usuarioId && <p className="text-red-500 text-xs mt-1">{errors.usuarioId.message}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
