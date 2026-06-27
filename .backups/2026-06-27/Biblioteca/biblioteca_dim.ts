// src/database/dimensions/bibliografia_dim.ts
// Definición del esquema e interfaces para los metadatos de las obras en la Biblioteca Digital

export interface ObraBiblioteca {
  id: string; // ID único en Firestore
  categoria: string; // Básica, Complementaria, Libro Principal, Documento de Cátedra, etc.
  unidadTematica: string; // Unidad o unidades del programa a las que corresponde
  autores: string; // Apellido y nombre de los creadores
  anioEdicion: string | number; // Año de edición o publicación (ej. 2006, 2021)
  tituloObra: string; // Nombre del libro, apunte o artículo
  capituloSeccion: string; // Capítulo y título de la sección específica
  rangoPaginas: string; // Delimitación de lectura (ej. p. 3-21, Libro Completo)
  editorialLugar: string; // Información editorial física de origen
  vinculoWeb: string; // URL/Hipervínculo externo (o "N/A")
  googleDriveId: string; // ID de Google Drive utilizado para incrustar el PDF en la plataforma
  tags: string[]; // Palabras clave para filtrado rápido (ej. ["Descuento", "TIR"])
  formato: 'PDF' | 'DOCX' | 'HTML'; // Formato original
  tipoRecurso: string; // Libro, Capítulo, Apéndice, Resoluciones, Apunte de Cátedra, etc.
  etiquetaNotebookLM: string; // Etiqueta identificadora en el cuaderno de NotebookLM
  oculta?: boolean; // Si es true, la obra no se muestra a los estudiantes
}
