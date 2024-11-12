export interface ExcelData {
    content: {
      nombre: string;
      rut: string;
      fechaNacimiento: string;
      sueldo: number;
    }[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  }