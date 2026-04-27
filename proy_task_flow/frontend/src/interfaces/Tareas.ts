export interface Tarea{
    id: number;
    titulo: string;
    descripcion: string;
    estado: string;
    proyectoId: number;
    usuarioId: number;
    creadoEn:string;
}
 
export interface CrearTareaDTO {
    titulo: string;
    descripcion: string;
    proyectoId: number;
    usuarioId: number;
}
 
export interface ActualizarTareaDTO {
    titulo?: string;
    descripcion?: string;
    estado?: string;
    proyectoId?: number;
    usuarioId?: number;  
}