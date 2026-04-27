import { useForm } from "react-hook-form";
import type { ActualizarUsuarioPasswordDTO } from "../../interfaces/Usuarios";
import Button from "../ui/Button";

interface FormValues {
  password: string;
  confirmar: string;
}

interface Props {
  onSubmit: (data: ActualizarUsuarioPasswordDTO) => Promise<void>;
  onCancel: () => void;
}

export default function CambiarPasswordForm({ onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const campo =
    "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const errorClass = "border-red-400 bg-red-50";
  const normal = "border-slate-200 bg-white";

  const handleFormSubmit = async (values: FormValues) => {
    await onSubmit({ password: values.password });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Nueva contraseña *
        </label>
        <input
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
          type="password"
          className={`${campo} ${errors.password ? errorClass : normal}`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Confirmar contraseña *
        </label>
        <input
          {...register("confirmar", {
            required: "Confirma la contraseña",
            validate: (val) =>
              val === watch("password") || "Las contraseñas no coinciden",
          })}
          type="password"
          className={`${campo} ${errors.confirmar ? errorClass : normal}`}
          placeholder="••••••••"
        />
        {errors.confirmar && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmar.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Cambiar contraseña"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
