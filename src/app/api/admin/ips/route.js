// route.js - API endpoint for administrator to view, add and remove whitelisted IPs
import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';
import { getWhitelistIps, addWhitelistIp, removeWhitelistIp, updateWhitelistIp } from '@/database/dimensions/whitelistIps';
import { headers } from 'next/headers';

const DB_PROVIDER = 'supabase';
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

async function verifyAdmin() {
  const user = await requireAuth();
  if (!user) return { authorized: false, status: 401, error: 'No autenticado' };
  
  const authorizedUser = await getAuthorizedUserByEmail(user.email, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });
  if (!authorizedUser || (authorizedUser.role !== 'admin' && authorizedUser.role !== 'root')) {
    return { authorized: false, status: 403, error: 'No autorizado. Se requiere rol de administrador' };
  }
  return { authorized: true, user: authorizedUser };
}

// Obtener la IP real del cliente para responder al botón "Mi IP actual"
function getClientIp(headerList) {
  const trustedIp = headerList.get('x-vercel-forwarded-for') || 
                    headerList.get('cf-connecting-ip') || 
                    headerList.get('x-real-ip');

  if (trustedIp) {
    return trustedIp.split(',')[0].trim();
  }
  
  const forwardedFor = headerList.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    return ips[ips.length - 1];
  }
  
  return '127.0.0.1';
}

export async function GET() {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const headerList = await headers();
  const currentIp = getClientIp(headerList);

  const ips = await getWhitelistIps(DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });
  
  return NextResponse.json({ ips, currentIp });
}

export async function POST(request) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { ip_address, description } = body;
    if (!ip_address) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos (ip_address)' }, { status: 400 });
    }

    const createdBy = auth.user.email;
    const result = await addWhitelistIp(ip_address, description || 'Agregada desde Panel Admin', createdBy, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });
    
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Error al agregar IP a la lista blanca' }, { status: 500 });
    }

    return NextResponse.json({ success: true, ip: result.ip });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const ipIdOrAddress = searchParams.get('id') || searchParams.get('ip_address');
    
    if (!ipIdOrAddress) {
      return NextResponse.json({ error: 'Falta parámetro requerido (id o ip_address)' }, { status: 400 });
    }

    const result = await removeWhitelistIp(ipIdOrAddress, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Error al eliminar IP de la lista blanca' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { id, ip_address, description } = body;
    if (!id) {
      return NextResponse.json({ error: 'Falta parámetro requerido (id)' }, { status: 400 });
    }

    const result = await updateWhitelistIp(id, { ip_address, description }, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Error al actualizar IP en la lista blanca' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

