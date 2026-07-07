import { redirect } from 'next/navigation';
import { createClient } from '@/core/security/supabaseServer';
import { verifyUserAndIP, getClientIp } from '@/core/security/securityService';
import { headers } from 'next/headers';
import PaulitaItsPage from '@/modules/paulita/views/PaulitaItsPage';

export default async function Page() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  // Redirigir si no hay sesión
  if (error || !user || !user.email) {
    redirect('/login');
  }

  // Validar IP e integridad del usuario
  const headerList = await headers();
  const clientIp = getClientIp(headerList);
  const securityCheck = await verifyUserAndIP(user.email, clientIp);

  if (!securityCheck.authorized) {
    redirect(`/login?error=${securityCheck.error || 'unauthorized'}`);
  }

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
      <PaulitaItsPage />
    </main>
  );
}
