import { supabase } from '@/core/security/supabaseClient';
import { ObraBiblioteca } from '@/database/dimensions/biblioteca_dim';
import { ValoracionBiblioteca } from '@/database/facts/ratings_fact';

// Mapeos helper para transicionar entre camelCase de TypeScript y snake_case de Postgres
export function mapObraFromDb(dbObra: any): ObraBiblioteca {
  return {
    id: String(dbObra.id),
    categoria: dbObra.categoria || '',
    unidadTematica: dbObra.unidad_tematica || '',
    autores: dbObra.autores || '',
    anioEdicion: dbObra.anio_edicion || '',
    tituloObra: dbObra.titulo_obra || '',
    capituloSeccion: dbObra.capitulo_seccion || '',
    rangoPaginas: dbObra.rango_paginas || '',
    editorialLugar: dbObra.editorial_lugar || '',
    vinculoWeb: dbObra.vinculo_web || '',
    googleDriveId: dbObra.google_drive_id || '',
    tags: dbObra.tags || [],
    formato: dbObra.formato || 'PDF',
    tipoRecurso: dbObra.tipo_recurso || '',
    etiquetaNotebookLM: dbObra.etiqueta_notebooklm || '',
    oculta: dbObra.oculta || false
  };
}

export function mapObraToDb(obra: Partial<ObraBiblioteca>) {
  const dbObra: any = {};
  if (obra.categoria !== undefined) dbObra.categoria = obra.categoria;
  if (obra.unidadTematica !== undefined) dbObra.unidad_tematica = obra.unidadTematica;
  if (obra.autores !== undefined) dbObra.autores = obra.autores;
  if (obra.anioEdicion !== undefined) dbObra.anio_edicion = obra.anioEdicion;
  if (obra.tituloObra !== undefined) dbObra.titulo_obra = obra.tituloObra;
  if (obra.capituloSeccion !== undefined) dbObra.capitulo_seccion = obra.capituloSeccion;
  if (obra.rangoPaginas !== undefined) dbObra.rango_paginas = obra.rangoPaginas;
  if (obra.editorialLugar !== undefined) dbObra.editorial_lugar = obra.editorialLugar;
  if (obra.vinculoWeb !== undefined) dbObra.vinculo_web = obra.vinculoWeb;
  if (obra.googleDriveId !== undefined) dbObra.google_drive_id = obra.googleDriveId;
  if (obra.tags !== undefined) dbObra.tags = obra.tags;
  if (obra.formato !== undefined) dbObra.formato = obra.formato;
  if (obra.tipoRecurso !== undefined) dbObra.tipo_recurso = obra.tipoRecurso;
  if (obra.etiquetaNotebookLM !== undefined) dbObra.etiqueta_notebooklm = obra.etiquetaNotebookLM;
  if (obra.oculta !== undefined) dbObra.oculta = obra.oculta;
  return dbObra;
}

export function mapRatingFromDb(dbRating: any): ValoracionBiblioteca {
  return {
    id: dbRating.id,
    idObra: String(dbRating.id_obra),
    idUsuario: dbRating.id_usuario,
    emailUsuario: dbRating.email_usuario || '',
    estrellas: dbRating.estrellas,
    fecha: dbRating.fecha || dbRating.created_at
  };
}

// 1. Obtener todas las obras
export async function fetchObras(includeHidden: boolean = false): Promise<ObraBiblioteca[]> {
  try {
    let query = supabase
      .from('biblioteca_obras')
      .select('*');

    if (!includeHidden) {
      query = query.neq('oculta', true);
    }

    const { data, error } = await query.order('titulo_obra', { ascending: true });

    if (error) {
      console.error('[SupabaseBibliotecaService] Error completo de Supabase:', JSON.stringify(error, null, 2));
      throw error;
    }
    if (!data) return [];
    return data.map(mapObraFromDb);
  } catch (error: any) {
    console.error('[SupabaseBibliotecaService] Error al obtener obras:', error.message || error);
    return [];
  }
}

// 2. Obtener todas las valoraciones
export async function fetchRatings(): Promise<ValoracionBiblioteca[]> {
  try {
    const { data, error } = await supabase
      .from('biblioteca_ratings')
      .select('*');

    if (error) throw error;
    if (!data) return [];
    return data.map(mapRatingFromDb);
  } catch (error) {
    console.error('[SupabaseBibliotecaService] Error al obtener ratings:', error);
    return [];
  }
}

// 3. Suscribirse a las valoraciones en tiempo real
export function subscribeToRatings(callback: (ratings: ValoracionBiblioteca[]) => void) {
  // Primero hacemos la carga inicial
  fetchRatings().then(callback);

  const channel = supabase
    .channel('realtime:biblioteca_ratings')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'biblioteca_ratings' },
      async () => {
        const updated = await fetchRatings();
        callback(updated);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// 4. Guardar o actualizar la valoración de un usuario
export async function submitRating(idObra: string, estrellas: number): Promise<boolean> {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session || !session.user) {
      console.error('[SupabaseBibliotecaService] Usuario no autenticado para calificar.');
      return false;
    }

    const idUsuario = session.user.id;
    const emailUsuario = session.user.email || '';
    const ratingId = `${idUsuario}_${idObra}`;

    const { error } = await supabase
      .from('biblioteca_ratings')
      .upsert({
        id: ratingId,
        id_obra: idObra,
        id_usuario: idUsuario,
        email_usuario: emailUsuario,
        estrellas: estrellas,
        fecha: new Date().toISOString()
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[SupabaseBibliotecaService] Error al enviar valoración:', error);
    return false;
  }
}

// 5. ABM de Obras (Admin)
export async function createObra(obra: Omit<ObraBiblioteca, 'id'>): Promise<ObraBiblioteca | null> {
  try {
    const dbData = mapObraToDb(obra);
    const { data, error } = await supabase
      .from('biblioteca_obras')
      .insert([dbData])
      .select()
      .single();

    if (error) throw error;
    return mapObraFromDb(data);
  } catch (error) {
    console.error('[SupabaseBibliotecaService] Error al crear obra:', error);
    return null;
  }
}

export async function updateObra(id: string, obra: Partial<ObraBiblioteca>): Promise<boolean> {
  try {
    const dbData = mapObraToDb(obra);
    const { error } = await supabase
      .from('biblioteca_obras')
      .update(dbData)
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[SupabaseBibliotecaService] Error al actualizar obra:', error);
    return false;
  }
}

export async function deleteObra(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('biblioteca_obras')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[SupabaseBibliotecaService] Error al eliminar obra:', error);
    return false;
  }
}


