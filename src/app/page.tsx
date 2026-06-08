import { redirect } from 'next/navigation';
import { createClient } from '@/core/security/supabaseServer';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';
import { getModulesList } from '@/database/dimensions/modules';
import DashboardClient from './DashboardClient';
import versions from '../versions.json';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  // Redirigir si no hay sesión o si el correo no está definido
  if (error || !user || !user.email) {
    redirect('/login');
  }

  const DB_PROVIDER = process.env.NEXT_PUBLIC_DATABASE_PROVIDER || 'spreadsheet';
  const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

  // Obtener rol y datos extendidos del usuario
  const authorizedUser = await getAuthorizedUserByEmail(user.email, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });


  // Si no está registrado en la whitelist, redirigir al login con error
  if (!authorizedUser) {
    redirect('/login?error=unauthorized');
  }

  // Mapear el usuario autorizado de forma segura para satisfacer los tipos de TypeScript
  const userProps = {
    email: (authorizedUser as any).email || user.email,
    name: (authorizedUser as any).name || '',
    role: (authorizedUser as any).role || 'guest',
    celular: (authorizedUser as any).celular || '',
  };

  // Cargar módulos gobernados por RBAC
  const modules = await getModulesList(DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });

  return (
    <DashboardClient 
      user={userProps} 
      modules={modules}
      versions={versions}
    />
  );

}
