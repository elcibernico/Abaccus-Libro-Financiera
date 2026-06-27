// src/database/facts/ratings_fact.ts
// Definición del esquema e interfaces para las valoraciones de los alumnos (hechos)

export interface ValoracionBiblioteca {
  id: string; // ID único en Firestore (ej: `${idUsuario}_${idObra}`)
  idObra: string; // Referencia a la obra valorada
  idUsuario: string; // Referencia al alumno que votó
  emailUsuario: string; // Email del alumno (facilitador de auditoría administrativa)
  estrellas: number; // Puntuación de 1 a 5
  fecha: string; // Timestamp ISO 8601 de la votación
}
