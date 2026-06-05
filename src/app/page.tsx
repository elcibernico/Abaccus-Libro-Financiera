'use client';
import { useState, useEffect } from 'react';
import { useNavigation } from '@/modules/libro_financiero/components/NavigationProvider';
import { dataRegistry } from '@/modules/libro_financiero/data/dataRegistry';
import Sidebar from '@/modules/libro_financiero/components/Sidebar';
import ContentTabs, { TabType } from '@/modules/libro_financiero/components/ContentTabs';
import LatexRenderer from '@/modules/libro_financiero/components/LatexRenderer';
import QuizSlideshow from '@/modules/libro_financiero/components/QuizSlideshow';
import PracticalCasesSlideshow from '@/modules/libro_financiero/components/PracticalCasesSlideshow';
import InteractiveGraphic from '@/modules/libro_financiero/components/InteractiveGraphic';
import { motion, AnimatePresence } from 'framer-motion';
import bookIndex from '@/modules/libro_financiero/data/bookIndex.json';
import { TopicData, ContentBlock } from '@/types';
import katex from 'katex';

// Helper recursivo para buscar un nodo (topic o unit) por ID o dataFile y retornar sus dataFiles descendientes
function getDescendantDataFiles(activeId: string): string[] {
  const result: string[] = [];

  // Buscar en las unidades
  for (const unit of bookIndex.units) {
    if (unit.id === activeId) {
      // Si el ID activo es la Unidad entera, recolectar recursivamente todos sus topics
      const collectFromTopics = (topicsList: any[]) => {
        for (const t of topicsList) {
          if (t.dataFile) result.push(t.dataFile);
          if (Array.isArray(t.subtopics)) collectFromTopics(t.subtopics);
        }
      };
      collectFromTopics(unit.topics);
      return result;
    }
  }

  // Buscar recursivamente dentro de los temas
  const findNodeAndCollect = (nodes: any[]): boolean => {
    for (const node of nodes) {
      if (node.dataFile === activeId || node.id === activeId) {
        if (node.dataFile) result.push(node.dataFile);
        const collect = (n: any) => {
          if (Array.isArray(n.subtopics)) {
            for (const sub of n.subtopics) {
              if (sub.dataFile) result.push(sub.dataFile);
              collect(sub);
            }
          }
        };
        collect(node);
        return true;
      }
      if (Array.isArray(node.subtopics) && findNodeAndCollect(node.subtopics)) {
        return true;
      }
      if (Array.isArray(node.topics) && findNodeAndCollect(node.topics)) {
        return true;
      }
    }
    return false;
  };

  findNodeAndCollect(bookIndex.units);
  return result;
}

export default function Home() {
  const { 
    activeTopic, 
    activeTab, 
    setActiveTab, 
    setAvailableTabs,
    isSidebarOpen,
    setIsSidebarOpen
  } = useNavigation();

  // Redimensionamiento de barra lateral
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      // Limitar el ancho entre 240px y 480px
      const newWidth = Math.max(240, Math.min(480, e.clientX));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Scroll al tope de la página automáticamente al cambiar el tema/sección activa
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTopic]);

  // Recopilar de forma jerárquica y recursiva los dataFiles de todos los subtemas hijos
  const targetDataFiles = getDescendantDataFiles(activeTopic);

  // Si no se encuentra jerarquía (o es un nodo hoja), usar el activeTopic directo como fallback
  const filesToLoad = targetDataFiles.length > 0 ? targetDataFiles : [activeTopic];

  // Construir el topicData consolidado combinando todos los archivos correspondientes
  const topicData: TopicData = {
    id: activeTopic,
    title: '',
    Desarrollo: [],
    Glosario: [],
    "Casos Prácticos": [],
    Autoevaluación: [],
    "Gráficos": []
  };

  filesToLoad.forEach((fileKey) => {
    const data = dataRegistry[fileKey];
    if (data) {
      if (!topicData.title && data.title) {
        topicData.title = data.title;
      }
      if (Array.isArray(data.Desarrollo)) {
        // Inyectamos un subtítulo del punto del programa antes del contenido de ese subtema si estamos consolidando más de un archivo
        if (filesToLoad.length > 1 && data.title) {
          topicData.Desarrollo.push({
            type: 'text',
            content: `### ${data.title}`
          });
        }
        topicData.Desarrollo.push(...data.Desarrollo);
      }
      if (Array.isArray(data.Glosario)) {
        topicData.Glosario.push(...data.Glosario);
      }
      if (Array.isArray(data["Casos Prácticos"])) {
        topicData["Casos Prácticos"].push(...data["Casos Prácticos"]);
      }
      if (Array.isArray(data.Autoevaluación)) {
        topicData.Autoevaluación.push(...data.Autoevaluación);
      }
      if (Array.isArray(data["Gráficos"])) {
        topicData["Gráficos"].push(...data["Gráficos"]);
      }
    }
  });

  // Si no se cargó ningún contenido, setear a undefined para mostrar el empty state
  const hasContent = topicData.Desarrollo.length > 0 || 
                     topicData.Glosario.length > 0 || 
                     topicData["Casos Prácticos"].length > 0 || 
                     topicData.Autoevaluación.length > 0 ||
                     topicData["Gráficos"].length > 0;

  const resolvedTopicData = hasContent ? topicData : undefined;

  // Actualizar las pestañas disponibles cuando cambia el tema activo
  useEffect(() => {
    if (resolvedTopicData) {
      const tabs: TabType[] = [];
      
      if (resolvedTopicData.Desarrollo && resolvedTopicData.Desarrollo.length > 0) {
        tabs.push('Desarrollo');
      }
      if (resolvedTopicData.Glosario && resolvedTopicData.Glosario.length > 0) {
        tabs.push('Glosario');
      }
      if (resolvedTopicData.Gráficos && resolvedTopicData.Gráficos.length > 0) {
        tabs.push('Gráficos');
      }
      if (resolvedTopicData["Casos Prácticos"] && resolvedTopicData["Casos Prácticos"].length > 0) {
        tabs.push('Casos Prácticos');
      }
      if (resolvedTopicData.Autoevaluación && resolvedTopicData.Autoevaluación.length > 0) {
        tabs.push('Autoevaluación');
      }

      setAvailableTabs(tabs);

      // Si la pestaña activa actual no está disponible en este tema, restablecer a la primera
      if (tabs.length > 0 && !tabs.includes(activeTab)) {
        setActiveTab(tabs[0]);
      }
    }
  }, [activeTopic]);

  // Renderizador seguro de fórmulas LaTeX matemáticas y texto, ahora con soporte para Markdown básico (negritas, cursivas y encabezados)
  const renderTextContent = (content: string) => {
    if (!content) return '';

    // Detectar si el bloque completo empieza como un encabezado Markdown
    let isH3 = false;
    let isH2 = false;
    let cleanContent = content;

    if (content.startsWith('### ')) {
      isH3 = true;
      cleanContent = content.slice(4);
    } else if (content.startsWith('## ')) {
      isH2 = true;
      cleanContent = content.slice(3);
    }

    // Preprocesar Markdown heredado a HTML de forma segura
    cleanContent = cleanContent
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*(?!\*)([^\*]+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

    // Remover saltos de línea dentro de tablas para que no se conviertan en <br /> molestos
    cleanContent = cleanContent.replace(/<table[\s\S]*?<\/table>/gi, (match) => {
      return match.replace(/\n/g, '');
    });

    cleanContent = cleanContent.replace(/\n/g, '<br />');

    const spanishStopWords = /\b(de|en|con|para|que|se|del|al|el|la|los|las|un|una|por|su|sus|es|son|si|no|como|donde|cuando|este|esta|dias|meses|anos|años|pesos|dolares|dólares|capital|interes|interés|descuento|valor|tasa|tasas|nominal|efectiva|efectivo|pagará|recibirá|recibe|reciben|coloca|colocan|obtiene|obtener|calcula|calcular|hallar|determine|determinar|vence|vencimiento|cuenta|cuentas|cuota|cuotas|año|años|plazo|plazos|tasa|tasas|intereses|capitalización|capitalizaciones|efectivos|efectivas|vencidos|vencidas|anticipados|anticipadas)\b/i;

    // 1. Reemplazar fórmulas de bloque $$...$$
    cleanContent = cleanContent.replace(/(\$\$)([\s\S]*?)(\$\$)/g, (match, p1, formula) => {
      if (/^\d+(\.\d+)*$/.test(formula.trim())) {
        return formula;
      }
      try {
        const html = katex.renderToString(formula.trim(), {
          displayMode: true,
          throwOnError: false,
          trust: true,
          strict: false
        });
        return html;
      } catch (e) {
        console.error("Error renderizando LaTeX block:", e);
        return match;
      }
    });

    // 2. Reemplazar fórmulas inline $...$
    // Regex para buscar $...$ que no estén escapados
    const inlineLatexRegex = /(?<!\\)\$((?:[^\\\$]|\\.)+?)(?<!\\)\$/g;
    cleanContent = cleanContent.replace(inlineLatexRegex, (match, formula) => {
      // Evitar procesar si es un importe de dinero simple con formato (ej. $1.000.000 o $100 o 10%)
      if (/^\d+([.,]\d+)*%?$/.test(formula.trim())) {
        return `$${formula}`;
      }
      
      const inner = formula.trim();
      const isSimpleVariable = /^[a-zA-Z\d\_\^\{\}\-\+]+$/.test(inner);
      const hasMathOperators = /[\+\-\*\/\=\<\>\(\)\_\^\\\{\}\[\]]/.test(inner);
      
      // Evitar interpretar texto en español o descripciones largas sin operadores como fórmulas LaTeX
      const containsSpanishWords = spanishStopWords.test(inner);
      const isLongTextWithoutOperators = inner.length > 30 && !hasMathOperators;
      
      if (containsSpanishWords || isLongTextWithoutOperators) {
        return match.replace(/\\(\$)/g, '$1');
      }

      if (isSimpleVariable || hasMathOperators) {
        try {
          const html = katex.renderToString(inner, {
            displayMode: false,
            throwOnError: false,
            trust: true,
            strict: false
          });
          // Forzar que la fórmula no se corte
          return `<span style="display: inline; white-space: nowrap; vertical-align: baseline;">${html}</span>`;
        } catch (e) {
          console.error("Error renderizando LaTeX inline:", e);
          return match;
        }
      }
      return match.replace(/\\(\$)/g, '$1');
    });

    // Desescapar signos de pesos residuales
    cleanContent = cleanContent.replace(/\\(\$)/g, '$1');

    if (isH3) {
      return <h3 className="parsed-h3" style={{ fontSize: '1.25rem', color: 'var(--primary-color)', margin: '0 0 0.5rem 0', fontWeight: 700 }} dangerouslySetInnerHTML={{ __html: cleanContent }} />;
    }
    if (isH2) {
      return <h2 className="parsed-h2" style={{ fontSize: '1.45rem', color: 'var(--text-color)', margin: '0 0 0.75rem 0', fontWeight: 700 }} dangerouslySetInnerHTML={{ __html: cleanContent }} />;
    }
    return <span dangerouslySetInnerHTML={{ __html: cleanContent }} />;
  };

  // Renderizar la pestaña activa actual
  const renderActiveTabContent = () => {
    if (!topicData) {
      return (
        <div className="empty-state">
          <p>Seleccione un tema del menú lateral para ver su contenido interactivo.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'Desarrollo':
        return (
          <div className="development-content">
            {topicData.Desarrollo.map((block: any, idx: number) => {
              if (block.type === 'interactive_graphic') {
                return (
                  <InteractiveGraphic
                    key={idx}
                    src={block.src}
                    title={block.title}
                    displayMode={block.displayMode || 'inline'}
                    height={block.height}
                  />
                );
              }
              if (block.type === 'image') {
                return (
                  <div key={idx} className="development-image-container glass-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.25rem' }}>
                    <img
                      src={block.src}
                      alt={block.alt || 'Imagen de apoyo'}
                      style={{ maxWidth: '100%', height: 'auto', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                    />
                  </div>
                );
              }
              // Bloque normal
              return (
                <div key={idx} className="development-block glass-card">
                  {renderTextContent(block.content)}
                </div>
              );
            })}
          </div>
        );

      case 'Glosario':
        return (
          <div className="glossary-content">
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Glosario del Tema</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {topicData.Glosario.map((term: any, idx: number) => (
                <div key={idx} className="glossary-card glass-card">
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-color)', fontWeight: 600 }}>
                    {term.title || term.term}
                  </h4>
                  <p style={{ margin: 0, opacity: 0.85, fontSize: '0.94rem', lineHeight: 1.6 }}>
                    {renderTextContent(term.content || term.definition)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Gráficos':
        return (
          <div className="graphics-content">
            {topicData.Gráficos && topicData.Gráficos.map((graphic: any, idx: number) => (
              <InteractiveGraphic
                key={idx}
                src={graphic.src}
                title={graphic.title}
                displayMode={graphic.displayMode || 'inline'}
                height={graphic.height}
              />
            ))}
          </div>
        );

      case 'Casos Prácticos':
        return (
          <div className="cases-content">
            <PracticalCasesSlideshow
              cases={topicData["Casos Prácticos"]}
              renderContent={renderTextContent}
            />
          </div>
        );

      case 'Autoevaluación':
        return (
          <div className="quiz-content">
            <QuizSlideshow
              questions={topicData.Autoevaluación}
              renderContent={renderTextContent}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`app-container ${isResizing ? 'resizing' : ''}`}
      style={{ '--sidebar-width': `${sidebarWidth}px` } as React.CSSProperties}
    >
      <Sidebar />
      {isSidebarOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}
      {isSidebarOpen && (
        <div 
          className={`sidebar-resizer ${isResizing ? 'active' : ''}`} 
          onMouseDown={startResizing} 
        />
      )}
      <div className={`main-content-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {topicData && (
          <div className="tabs-header-wrapper">
            <ContentTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              availableTabs={useNavigation().availableTabs}
            />
          </div>
        )}

        <main className="page-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTopic}_${activeTab}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="tab-content-animator"
            >
              {renderActiveTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <style jsx global>{`
        .app-container {
          display: flex;
          min-height: calc(100vh - 60px);
          width: 100%;
        }

        .main-content-layout {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          transition: margin-left 0.3s ease;
        }

        .tabs-header-wrapper {
          position: sticky;
          top: 80px;
          z-index: 10;
          background: var(--bg-color);
          border-bottom: 1px solid var(--border-color);
        }

        @media (max-width: 768px) {
          .tabs-header-wrapper {
            top: 60px;
          }
        }

        .topic-title-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem 2rem 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .topic-id-badge {
          background: rgba(129, 140, 248, 0.15);
          color: var(--primary-color);
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 0.375rem;
          font-size: 0.85rem;
        }

        .topic-main-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-color);
        }

        .page-body {
          flex: 1;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem;
        }

        .development-content, .glossary-content, .graphics-content, .cases-content, .quiz-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .development-block {
          line-height: 1.8;
          font-size: 1.05rem;
        }

        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 300px;
          color: var(--text-muted);
        }

        .sidebar-backdrop {
          position: fixed;
          top: 60px;
          left: 0;
          width: 100vw;
          height: calc(100vh - 60px);
          background: rgba(0, 0, 0, 0.4);
          z-index: 90;
          backdrop-filter: blur(2px);
          display: none;
        }

        @media (max-width: 768px) {
          .sidebar-backdrop {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
