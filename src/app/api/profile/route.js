import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { queryDatabase } from '@/database/connection';
import { updateUserProfile, softDeleteUser } from '@/modules/auth/controllers/permissionsController';
import { MEGA_ADMINS } from '@/database/dimensions/users';

// GET: Obtener el perfil completo del usuario autenticado
export async function GET() {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
    }

    const supabase = await queryDatabase({ provider: 'supabase' });
    const { data: dbUser, error } = await supabase
      .from('whitelist_users')
      .select('*')
      .eq('email', user.email.toLowerCase().trim())
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!dbUser) {
      const isMega = MEGA_ADMINS.includes(user.email.toLowerCase().trim());
      if (isMega) {
        return NextResponse.json({
          success: true,
          profile: {
            email: user.email.toLowerCase().trim(),
            nombre: 'Mega',
            apellido: 'Admin',
            name: 'Mega Admin',
            dni: '',
            fecha_nacimiento: '',
            legajo: '',
            celular: 'System',
            role: 'root',
            is_active: true,
            created_at: new Date().toISOString()
          }
        });
      }
      return NextResponse.json({ error: 'Usuario no encontrado en la whitelist.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      profile: {
        email: dbUser.email,
        nombre: dbUser.nombre || '',
        apellido: dbUser.apellido || '',
        name: dbUser.name || '',
        dni: dbUser.dni || '',
        fecha_nacimiento: dbUser.fecha_nacimiento || '',
        legajo: dbUser.legajo || '',
        celular: dbUser.celular || '',
        role: dbUser.role || 'guest',
        is_active: dbUser.is_active !== false,
        created_at: dbUser.created_at
      }
    });
  } catch (err) {
    console.error('[API Profile GET Error]:', err);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}

// PUT: Actualizar datos de perfil
export async function PUT(request) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
    }

    const { nombre, apellido, dni, fecha_nacimiento, legajo, celular } = await request.json();

    if (!nombre || !nombre.trim()) {
      return NextResponse.json({ error: 'El nombre es obligatorio.' }, { status: 400 });
    }
    if (!apellido || !apellido.trim()) {
      return NextResponse.json({ error: 'El apellido es obligatorio.' }, { status: 400 });
    }
    if (!dni || !dni.trim()) {
      return NextResponse.json({ error: 'El DNI es obligatorio.' }, { status: 400 });
    }

    const result = await updateUserProfile(user.email, {
      nombre,
      apellido,
      dni,
      fecha_nacimiento: fecha_nacimiento || null,
      legajo: legajo || null,
      celular: celular || null
    });

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Perfil actualizado con éxito.' });
    } else {
      return NextResponse.json({ error: result.error || 'No se pudo actualizar el perfil.' }, { status: 500 });
    }
  } catch (err) {
    console.error('[API Profile PUT Error]:', err);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}

// DELETE: Desuscribirse (Soft Delete)
export async function DELETE() {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
    }

    const result = await softDeleteUser(user.email);

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Cuenta desuscripta con éxito.' });
    } else {
      return NextResponse.json({ error: result.error || 'No se pudo procesar la desuscripción.' }, { status: 500 });
    }
  } catch (err) {
    console.error('[API Profile DELETE Error]:', err);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
