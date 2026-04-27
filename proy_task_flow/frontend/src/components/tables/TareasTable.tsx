import { Pencil, Trash2, Users } from "lucide-react";
import type { Tarea } from "../../interfaces/Tareas";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

interface Props {
  tareas: Tarea[];
  loading: boolean;
  onEliminar: (id: number) => void;
  onEditar: (tarea: Tarea) => void;
}

const estadoBadge: Record<string, string> = {
  PENDIENTE:    "bg-amber-100 text-amber-700 border border-amber-200",
  EN_PROGRESO:  "bg-blue-100 text-blue-700 border border-blue-200",
  COMPLETADA:   "bg-green-100 text-green-700 border border-green-200",
};

const estadoLabel: Record<string, string> = {
  PENDIENTE:   "Pendiente",
  EN_PROGRESO: "En Progreso",
  COMPLETADA:  "Completada",
};

function EstadoBadge({ estado }: { estado: string }) {
  const key = estado?.toUpperCase().replace(" ", "_");
  const clases = estadoBadge[key] ?? "bg-slate-100 text-slate-600 border border-slate-200";
  const label  = estadoLabel[key] ?? estado;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${clases}`}>
      {label}
    </span>
  );
}

export default function TareasTable({ tareas, loading, onEditar, onEliminar }: Props) {
  if (loading) return <div className="text-center py-12 text-slate-400 animate-pulse">Cargando tareas...</div>;
  if (!tareas.length) return <EmptyState icon={Users} title="Sin tareas" description="Crea la primera tarea para comenzar." />;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600 font-semibold">
          <tr>
            <th className="text-left px-5 py-3">#</th>
            <th className="text-left px-5 py-3">Título</th>
            <th className="text-left px-5 py-3">Descripción</th>
            <th className="text-left px-5 py-3">Estado</th>
            <th className="text-left px-5 py-3">ProyectoId</th>
            <th className="text-left px-5 py-3">UsuarioId</th>
            <th className="text-left px-5 py-3">Registrado</th>
            <th className="text-left px-5 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((u) => (
            <tr key={u.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="px-5 py-3 text-slate-400">{u.id}</td>
              <td className="px-5 py-3 font-medium text-slate-800">{u.titulo}</td>
              <td className="px-5 py-3 text-slate-600">{u.descripcion}</td>
              <td className="px-5 py-3">
                <EstadoBadge estado={u.estado} />
              </td>
              <td className="px-5 py-3 text-slate-400">{u.proyectoId}</td>
              <td className="px-5 py-3 text-slate-400">{u.usuarioId}</td>
              <td className="px-5 py-3 text-slate-400">{new Date(u.creadoEn).toLocaleDateString("es-BO")}</td>
              <td className="px-5 py-3">
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => onEditar(u)} icon={<Pencil size={14} />}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => onEliminar(u.id)} icon={<Trash2 size={14} />}>
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
