import { redirect } from 'next/navigation';
import { createClient } from '@/core/security/supabaseServer';
import { verifyUserAndIP, getClientIp } from '@/core/security/securityService';
import { headers } from 'next/headers';
import ChatbotPage from '@/modules/chatbot/views/ChatbotPage';

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
      <ChatbotPage />
    </main>
  );
}
