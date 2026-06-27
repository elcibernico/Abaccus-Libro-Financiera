import AdministradorBiblioteca from '@/modules/admin/views/AdministradorBiblioteca';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Biblioteca | Admin',
};

export default function AdminBibliotecaPage() {
  return (
    <div style={{ padding: '24px', backgroundColor: 'var(--bg-color)', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link 
            href="/admin" 
            style={{ 
              color: 'var(--text-color)', 
              textDecoration: 'none', 
              display: 'inline-block', 
              padding: '6px 12px', 
              border: '1px solid var(--border-color)', 
              borderRadius: '4px',
              fontSize: '13px',
              backgroundColor: 'var(--card-bg)'
            }}
          >
            ← Volver al Dashboard
          </Link>
        </div>
        
        <AdministradorBiblioteca />
      </div>
    </div>
  );
}
