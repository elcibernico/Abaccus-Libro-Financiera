import { redirect } from 'next/navigation';
import { createClient } from '@/core/security/supabaseServer';
import { verifyUserAndIP, getClientIp } from '@/core/security/securityService';
import { headers } from 'next/headers';
import FullscreenPDFReader from '@/modules/biblioteca/components/FullscreenPDFReader';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LeerPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  // Redirigir si no hay sesión o si el correo no está definido
  if (error || !user || !user.email) {
    redirect('/login');
  }

  // Validar IP e integridad del usuario contra el Firewall de IPs
  const headerList = await headers();
  const clientIp = getClientIp(headerList);
  const securityCheck = await verifyUserAndIP(user.email, clientIp);

  if (!securityCheck.authorized) {
    redirect(`/login?error=${securityCheck.error || 'unauthorized'}`);
  }

  return <FullscreenPDFReader id={id} />;
}
