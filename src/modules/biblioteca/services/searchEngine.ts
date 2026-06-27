import { ObraBiblioteca } from '@/database/dimensions/biblioteca_dim';
import { ValoracionBiblioteca } from '@/database/facts/ratings_fact';

// Elimina acentos, diacríticos y convierte a minúsculas
export function normalizeString(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// Lógica de cálculo de similitud básica (Levenshtein) para tolerancia a errores ortográficos
function calculateLevenshteinDistance(a: string, b: string): number {
  const tmp = [];
  let i, j, val;
  for (i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      val = a[i - 1] === b[j - 1] ? 0 : 1;
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1, // Borrado
        tmp[i][j - 1] + 1, // Inserción
        tmp[i - 1][j - 1] + val // Sustitución
      );
    }
  }
  return tmp[a.length][b.length];
}

// Verifica si un término de búsqueda coincide parcialmente o de manera aproximada con un texto objetivo
function termMatches(term: string, target: string): boolean {
  const normTerm = normalizeString(term);
  const normTarget = normalizeString(target);

  if (normTarget.includes(normTerm)) {
    return true;
  }

  // Si el término tiene longitud suficiente, permitir tolerancia a fallos mediante distancia Levenshtein
  if (normTerm.length > 3) {
    const words = normTarget.split(/\s+/);
    for (const word of words) {
      if (word.length >= normTerm.length - 1 && word.length <= normTerm.length + 1) {
        const distance = calculateLevenshteinDistance(normTerm, word);
        if (distance <= 1) return true; // Permite un carácter de diferencia
      }
    }
  }

  return false;
}

export interface SearchFilters {
  autores: boolean;
  unidadTematica: boolean;
  tituloObra: boolean;
  editorialLugar: boolean;
  tags: boolean;
}

export function searchAndFilterObras(
  obras: ObraBiblioteca[],
  ratings: ValoracionBiblioteca[],
  queryText: string,
  filters: SearchFilters,
  sortBy: string
): ObraBiblioteca[] {
  let results = [...obras];

  // 1. Filtrado por término de búsqueda
  if (queryText.trim() !== '') {
    const terms = queryText.split(/\s+/).filter(t => t.length > 0);
    
    // Verificar si hay filtros específicos activos
    const activeFilterKeys = Object.keys(filters).filter(
      (key) => filters[key as keyof SearchFilters]
    ) as (keyof SearchFilters)[];

    results = results.filter((obra) => {
      // Si no hay filtros específicos activos, buscar en todos los campos (búsqueda general)
      if (activeFilterKeys.length === 0) {
        return terms.every((term) => 
          termMatches(term, obra.tituloObra) ||
          termMatches(term, obra.autores) ||
          termMatches(term, obra.unidadTematica) ||
          termMatches(term, obra.editorialLugar) ||
          termMatches(term, obra.categoria) ||
          obra.tags.some(tag => termMatches(term, tag))
        );
      }

      // Si hay filtros específicos activos, verificar que coincida en alguno de los campos seleccionados
      return terms.every((term) => {
        return activeFilterKeys.some((filterKey) => {
          if (filterKey === 'tags') {
            return obra.tags.some(tag => termMatches(term, tag));
          }
          const val = obra[filterKey as keyof ObraBiblioteca];
          return typeof val === 'string' && termMatches(term, val);
        });
      });
    });
  }

  // 2. Auxiliar de Cálculo de Promedio de Estrellas para ordenamiento
  const getAverageRating = (obraId: string): number => {
    const obraRatings = ratings.filter(r => r.idObra === obraId);
    if (obraRatings.length === 0) return 0;
    const sum = obraRatings.reduce((acc, curr) => acc + curr.estrellas, 0);
    return sum / obraRatings.length;
  };

  // 3. Ordenamiento
  results.sort((a, b) => {
    switch (sortBy) {
      case 'titulo':
        return a.tituloObra.localeCompare(b.tituloObra);
      
      case 'autor':
        return a.autores.localeCompare(b.autores);
      
      case 'tema':
        return a.unidadTematica.localeCompare(b.unidadTematica);
      
      case 'valoracion': {
        const ratingA = getAverageRating(a.id);
        const ratingB = getAverageRating(b.id);
        // De mayor a menor valoración
        if (ratingB !== ratingA) {
          return ratingB - ratingA;
        }
        // Desempate por título
        return a.tituloObra.localeCompare(b.tituloObra);
      }
      
      case 'anio': {
        const anioA = parseInt(String(a.anioEdicion).replace(/\D/g, '')) || 0;
        const anioB = parseInt(String(b.anioEdicion).replace(/\D/g, '')) || 0;
        // Más recientes primero (descendente)
        return anioB - anioA;
      }
      
      default:
        return 0;
    }
  });

  return results;
}
