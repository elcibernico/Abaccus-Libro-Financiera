import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import config from '../../../data_content/locales/config.json';
import { usePreferences } from '@/modules/libro_financiero/components/UserPreferencesProvider';

export default function Footer() {
  const { theme } = usePreferences();
  const [isAdmin, setIsAdmin] = useState(false);
  const whatsappUrl = `https://wa.me/${config.footer.whatsappPhone}`;
  const extraLogo = theme === 'dark' 
    ? config.footer.extraReferenceLogoDarkUrl 
    : config.footer.extraReferenceLogoLightUrl;

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const role = user.app_metadata?.role;
        setIsAdmin(role === 'admin' || role === 'admin_suplente');
      }
    };
    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const role = session.user.app_metadata?.role;
        setIsAdmin(role === 'admin' || role === 'admin_suplente');
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <footer className="footer-container">
      <div className="footer-left">
        {isAdmin && (
          <Link href="/admin/users" className="admin-pi-link" title="Administrar Roles y Usuarios">
            π
          </Link>
        )}
      </div>

      <div className="footer-center">
        <span className="author-name">
          {config.footer.authorName}
        </span>
        
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="whatsapp-link"
          title="WhatsApp"
        >
          <svg 
            viewBox="0 0 24 24" 
            width="28" 
            height="28" 
            fill="#25D366"
            className="whatsapp-icon"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
 
        {config.footer.showExtraReference && (
          <>
            <span className="divider">|</span>
            <span className="extra-ref-text">{config.footer.extraReferenceText}</span>
            <div className="extra-ref-logo">
              <Image 
                src={extraLogo} 
                alt="Extra Reference Logo" 
                width={18} 
                height={18}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </>
        )}
      </div>

      <div className="footer-spacer"></div>

      <style jsx>{`
        .footer-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          background-color: var(--card-bg);
          border-top: 1px solid var(--border-color);
          padding: 0.8rem 2rem;
          transition: var(--transition);
          font-size: 0.9rem;
          z-index: 10;
        }
        .footer-left {
          flex: 1;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .admin-pi-link {
          font-family: 'Cambria', 'Georgia', serif;
          font-size: 1.6rem;
          color: var(--text-color);
          opacity: 0.3;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          line-height: 1;
        }
        .admin-pi-link:hover {
          opacity: 1;
          color: #3b82f6;
          transform: scale(1.15);
        }
        .footer-center {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          flex: 2;
          color: var(--text-color);
          font-weight: 500;
        }
        .author-name {
          font-size: 0.9rem;
          font-weight: 600;
        }
        .divider {
          color: var(--text-color);
          opacity: 0.35;
          font-weight: 300;
        }
        .extra-ref-text {
          font-size: 0.9rem;
          font-weight: 600;
        }
        .whatsapp-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s ease;
        }
        .whatsapp-link:hover {
          transform: scale(1.15);
        }
        .whatsapp-icon {
          fill: #25D366;
        }
        .extra-ref-logo {
          display: flex;
          align-items: center;
          opacity: 0.95;
        }
          flex: 1;
        }
        @media (max-width: 640px) {
          .footer-container {
            flex-direction: column;
            gap: 0.5rem;
            padding: 1rem;
          }
          .footer-spacer {
            display: none;
          }
          .footer-center {
            flex-direction: row;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </footer>
  );
}
