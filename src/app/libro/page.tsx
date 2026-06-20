'use client';
import { useEffect } from 'react';
import { useNavigation } from '@/modules/libro_financiero/components/NavigationProvider';
import { dataRegistry } from '@/modules/libro_financiero/data/dataRegistry';
import Sidebar from '@/modules/libro_financiero/components/Sidebar';
import ResizableSidebar from '@/visual/components/layout/ResizableSidebar';
import ContentTabs, { TabType } from '@/modules/libro_financiero/components/ContentTabs';
import LatexRenderer from '@/modules/libro_financiero/components/LatexRenderer';
import QuizSlideshow from '@/modules/libro_financiero/components/QuizSlideshow';
import PracticalCasesSlideshow from '@/modules/libro_financiero/components/PracticalCasesSlideshow';
import InteractiveGraphic from '@/modules/libro_financiero/components/InteractiveGraphic';
import { motion, AnimatePresence } from 'framer-motion';
import bookIndex from '@/modules/libro_financiero/data/bookIndex.json';
import { TopicData } from '@/types';
import katex from 'katex';

// Helper recursivo para buscar un nodo por ID y recolectar dataFiles
function getDescendantDataFiles(activeId: string): string[] {
  const result: string[] = [];

  for (const unit of bookIndex.units) {
    if (unit.id === activeId) {
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

export default function LibroPage() {
  const { 
    activeTopic, 
    activeTab, 
    setActiveTab, 
    setAvailableTabs,
    isSidebarOpen,
    setIsSidebarOpen
  } = useNavigation();

  // Scroll automático al tope de página al cambiar tema
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTopic]);

  const targetDataFiles = getDescendantDataFiles(activeTopic);
  const filesToLoad = targetDataFiles.length > 0 ? targetDataFiles : [activeTopic];

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

  const hasContent = topicData.Desarrollo.length > 0 || 
                     topicData.Glosario.length > 0 || 
                     topicData["Casos Prácticos"].length > 0 || 
                     topicData.Autoevaluación.length > 0 ||
                     topicData["Gráficos"].length > 0;

  const resolvedTopicData = hasContent ? topicData : undefined;

  // Actualizar pestañas del módulo
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

      if (tabs.length > 0 && !tabs.includes(activeTab)) {
        setActiveTab(tabs[0]);
      }
    }
  }, [activeTopic]);

  const renderTextContent = (content: string) => {
    if (!content) return '';

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

    cleanContent = cleanContent
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*(?!\*)([^\*]+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

    cleanContent = cleanContent.replace(/<table[\s\S]*?<\/table>/gi, (match) => {
      return match.replace(/\n/g, '');
    });

    cleanContent = cleanContent.replace(/\n/g, '<br />');

    const spanishStopWords = /\b(de|en|con|para|que|se|del|al|el|la|los|las|un|una|por|su|sus|es|son|si|no|como|donde|cuando|este|esta|dias|meses|anos|años|pesos|dolares|dólares|capital|interes|interés|descuento|valor|tasa|tasas|nominal|efectiva|efectivo|pagará|recibirá|recibe|reciben|coloca|colocan|obtiene|obtener|calcula|calcular|hallar|determine|determinar|vence|vencimiento|cuenta|cuentas|cuota|cuotas|año|años|plazo|plazos|tasa|tasas|intereses|capitalización|capitalizaciones|efectivos|efectivas|vencidos|vencidas|anticipados|anticipadas)\b/i;

    cleanContent = cleanContent.replace(/(\$\$)([\s\S]*?)(\$\$)/g, (match, p1, formula) => {
      if (/^\d+(\.\d+)*$/.test(formula.trim())) {
        return formula;
      }
      try {
        return katex.renderToString(formula.trim(), {
          displayMode: true,
          throwOnError: false,
          trust: true,
          strict: false
        });
      } catch (e) {
        return match;
      }
    });

    const inlineLatexRegex = /(?<!\\)\$((?:[^\\\$]|\\.)+?)(?<!\\)\$/g;
    cleanContent = cleanContent.replace(inlineLatexRegex, (match, formula) => {
      if (/^\d+([.,]\d+)*%?$/.test(formula.trim())) {
        return `$${formula}`;
      }
      
      const inner = formula.trim();
      const isSimpleVariable = /^[a-zA-Z\d\_\^\{\}\-\+]+$/.test(inner);
      const hasMathOperators = /[\+\-\*\/\=\<\>\(\)\_\^\\\{\}\[\]]/.test(inner);
      
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
          return `<span style="display: inline; white-space: nowrap; vertical-align: baseline;">${html}</span>`;
        } catch (e) {
          return match;
        }
      }
      return match.replace(/\\(\$)/g, '$1');
    });

    cleanContent = cleanContent.replace(/\\(\$)/g, '$1');

    if (isH3) {
      return <h3 className="parsed-h3" style={{ fontSize: '1.25rem', color: 'var(--primary-color)', margin: '0 0 0.5rem 0', fontWeight: 700 }} dangerouslySetInnerHTML={{ __html: cleanContent }} />;
    }
    if (isH2) {
      return <h2 className="parsed-h2" style={{ fontSize: '1.45rem', color: 'var(--text-color)', margin: '0 0 0.75rem 0', fontWeight: 700 }} dangerouslySetInnerHTML={{ __html: cleanContent }} />;
    }
    return <span dangerouslySetInnerHTML={{ __html: cleanContent }} />;
  };

  const renderActiveTabContent = () => {
    if (!resolvedTopicData) {
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
            {resolvedTopicData.Desarrollo.map((block: any, idx: number) => {
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
              {resolvedTopicData.Glosario.map((term: any, idx: number) => (
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
            {resolvedTopicData.Gráficos && resolvedTopicData.Gráficos.map((graphic: any, idx: number) => (
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
              cases={resolvedTopicData["Casos Prácticos"]}
              renderContent={renderTextContent}
            />
          </div>
        );

      case 'Autoevaluación':
        return (
          <div className="quiz-content">
            <QuizSlideshow
              questions={resolvedTopicData.Autoevaluación}
              renderContent={renderTextContent}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="libro-layout-wrapper">
      <ResizableSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        title="Matemática Financiera"
      >
        <Sidebar />
      </ResizableSidebar>

      <div className={`main-content-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {resolvedTopicData && (
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
        .libro-layout-wrapper {
          display: flex;
          min-height: calc(100vh - 100px);
          width: 100%;
        }

        .main-content-layout {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          transition: margin-left 0.3s ease;
        }

        .main-content-layout.sidebar-open {
          margin-left: 0;
        }

        .tabs-header-wrapper {
          position: sticky;
          top: 100px;
          z-index: 10;
          background: var(--bg-color);
          border-bottom: 1px solid var(--border-color);
        }

        .page-body {
          flex: 1;
          width: 100%;
          max-width: 100% !important;
          margin: 0;
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
          white-space: pre-wrap;
        }

        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 300px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .libro-layout-wrapper {
            padding-top: 60px;
            min-height: calc(100vh - 60px);
          }
          .main-content-layout.sidebar-open {
            margin-left: 0;
          }
          .tabs-header-wrapper {
            top: 60px;
          }
        }
      `}</style>
    </div>
  );
}
