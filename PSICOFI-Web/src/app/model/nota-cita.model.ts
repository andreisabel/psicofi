export interface NotaCita {
    idNotaCita: number;
    tipoIntervencion: number;
    notas: string;
    departamento?: number | null;
    detalleCanalizacion?: string | null;
    idCita: number;
    foraneo?: boolean | null; // Añadir el campo foraneo como boolean y nullable
  }
  