'use client';

import AuditoriaBiblioteca from '../AuditoriaBiblioteca';
import Link from 'next/link';

export default function AdminAuditoriaPage() {
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
        
        <AuditoriaBiblioteca />
      </div>
    </div>
  );
}
