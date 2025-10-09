export interface Alumno {
    claveUnica: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    edad: number;
    sexo: string;
    area: string;
    carrera: string;
    psicologoAsociado?: string | null; // nullable and optional field
    semestre: number;
    condicionAcademica: string;
    creditosAprobados: number;
    creditosInscritos: number;
    promedioGral: number;
    asesor: string;
    contrasena?: string | null; // nullable and optional field
    habilitado: boolean;
}
