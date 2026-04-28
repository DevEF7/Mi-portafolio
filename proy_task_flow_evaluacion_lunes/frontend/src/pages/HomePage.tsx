import { useNavigate } from "react-router-dom";
import { Users, FolderKanban, ClipboardList, ArrowRight, CheckCircle2, Layers, Zap } from "lucide-react";

const cards = [
  {
    icon: Users,
    label: "Usuarios",
    description: "Gestiona los miembros del equipo, crea perfiles y administra accesos al sistema.",
    route: "/usuarios",
    accent: "#3b82f6",
    bg: "from-blue-50 to-blue-100/60",
    border: "border-blue-200",
    iconBg: "bg-blue-500",
    stat: "Equipo",
  },
  {
    icon: FolderKanban,
    label: "Proyectos",
    description: "Organiza y supervisa todos tus proyectos activos, asigna responsables y da seguimiento.",
    route: "/proyectos",
    accent: "#8b5cf6",
    bg: "from-violet-50 to-violet-100/60",
    border: "border-violet-200",
    iconBg: "bg-violet-500",
    stat: "Organización",
  },
  {
    icon: ClipboardList,
    label: "Tareas",
    description: "Crea, asigna y monitorea tareas. Controla el estado de avance en tiempo real.",
    route: "/tareas",
    accent: "#10b981",
    bg: "from-emerald-50 to-emerald-100/60",
    border: "border-emerald-200",
    iconBg: "bg-emerald-500",
    stat: "Productividad",
  },
];

const features = [
  { icon: CheckCircle2, text: "Control total de estados" },
  { icon: Layers,       text: "Proyectos organizados"   },
  { icon: Zap,          text: "Gestión ágil de equipos" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-20 text-white">

        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
    
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-4xl">

          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Elmer Franz Nina Guarachi  9169946 LP
          </span>

          <h1 className="mb-4 text-5xl font-black tracking-tight leading-tight">
            ⚡ Task{" "}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Flow
            </span>
          </h1>
        <h2 className="mb-4 text-3xl font-black tracking-tight leading-tight">
            Gestión de{" "}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Proyectos
            </span>
          </h2>

          <p className="mb-10 max-w-xl text-lg text-slate-400 leading-relaxed">
            Sistema que se encarga de centralizar tu equipo, proyectos y tareas en un solo lugar.
            Trabajando de forma organizada y manténiendo el control total.
          </p>

   
          <div className="flex flex-wrap gap-3">
            {features.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
              >
                <Icon size={14} className="text-emerald-400" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="mx-auto max-w-5xl px-8 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-800">¿A dónde quieres ir?</h2>
          <p className="mt-2 text-slate-500">Selecciona una sección para comenzar a trabajar</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map(({ icon: Icon, label, description, route, bg, border, iconBg, stat }) => (
            <button
              key={label}
              onClick={() => navigate(route)}
              className={`group relative flex flex-col rounded-2xl border ${border} bg-gradient-to-br ${bg} p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none`}
            >
   
              <div className="mb-5 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} shadow-lg`}>
                  <Icon size={22} className="text-white" />
                </div>
                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-500 backdrop-blur">
                  {stat}
                </span>
              </div>

       
              <h3 className="mb-2 text-xl font-bold text-slate-800">{label}</h3>
              <p className="flex-1 text-sm leading-relaxed text-slate-500">{description}</p>

      
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-700 transition-gap duration-200 group-hover:gap-3">
                Ir a {label}
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </div>


              <div
                className={`absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl transition-all duration-300 group-hover:w-full`}
                style={{ background: `linear-gradient(90deg, transparent, ${cards.find(c=>c.label===label)?.accent})` }}
              />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
