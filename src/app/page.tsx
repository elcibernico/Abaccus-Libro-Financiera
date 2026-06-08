import { redirect } from 'next/navigation';
import { createClient } from '@/core/security/supabaseServer';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';
import { getModulesList } from '@/database/dimensions/modules';
import DashboardClient from './DashboardClient';
import versions from '../versions.json';
import { headers } from 'next/headers';
import { verifyUserAndIP, getClientIp } from '@/core/security/securityService';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  // Redirigir si no hay sesión o si el correo no está definido
  if (error || !user || !user.email) {
    redirect('/login');
  }

  const DB_PROVIDER = 'supabase';
  const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

  // Validar IP e integridad del usuario contra el Firewall de IPs
  const headerList = await headers();
  const clientIp = getClientIp(headerList);
  const securityCheck = await verifyUserAndIP(user.email, clientIp);

  if (!securityCheck.authorized) {
    redirect(`/login?error=${securityCheck.error || 'unauthorized'}`);
  }

  const authorizedUser = securityCheck.user;

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
