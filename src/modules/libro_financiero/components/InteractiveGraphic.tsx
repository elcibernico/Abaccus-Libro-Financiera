"use client";

import { useState, useRef, useEffect } from "react";
import { Maximize2, Minimize2, ExternalLink, X, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import InteractiveChart from "./InteractiveChart";

interface InteractiveGraphicProps {
  src: string;
  title: string;
  displayMode?: "inline" | "modal" | "new_window";
  height?: string;
}

export default function InteractiveGraphic({
  src,
  title,
  displayMode = "inline",
  height = "550px",
}: InteractiveGraphicProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle native fullscreen changes (e.g. user presses ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const openInNewWindow = () => {
    window.open(src, "_blank");
  };

  // --- Render Mode: NEW WINDOW ---
  if (displayMode === "new_window") {
    return (
      <div style={{ margin: "1.5rem 0", display: "flex", justifyContent: "center" }}>
        <button className="btn-secondary" onClick={openInNewWindow}>
          <BarChart2 size={18} />
          Ver Simulación: {title}
          <ExternalLink size={16} style={{ marginLeft: "0.25rem", opacity: 0.7 }} />
        </button>
      </div>
    );
  }

  // --- Render Mode: MODAL ---
  if (displayMode === "modal") {
    return (
      <div style={{ margin: "1.5rem 0", display: "flex", justifyContent: "center" }}>
        <button className="btn-secondary" onClick={() => setIsModalOpen(true)}>
          <BarChart2 size={18} />
          Abrir Gráfico: {title}
        </button>

        <AnimatePresence>
          {isModalOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(4px)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "90vw",
                  maxWidth: "1200px",
                  height: "85vh",
                  backgroundColor: "var(--card-bg)",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div
                  style={{
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid var(--border-color)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "var(--bg-color)",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <BarChart2 size={18} className="text-primary" style={{ color: "var(--primary-color)" }} />
                    {title}
                  </h3>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={openInNewWindow}
                      title="Abrir en pestaña aparte"
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-color)", opacity: 0.7 }}
                    >
                      <ExternalLink size={20} />
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      title="Cerrar"
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-color)", opacity: 0.7, marginLeft: "0.5rem" }}
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
                  {src === "simple-vs-compuesto" ? (
                    <InteractiveChart />
                  ) : (
                    <iframe
                      src={src}
                      style={{ width: "100%", height: "100%", border: "none", backgroundColor: "var(--card-bg)" }}
                      title={title}
                    />
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- Render Mode: INLINE (Default) ---
  return (
    <div
      ref={containerRef}
      style={{
        margin: isFullscreen ? "0" : "2rem 0",
        borderRadius: isFullscreen ? "0" : "0.75rem",
        overflow: "hidden",
        border: isFullscreen ? "none" : "1px solid var(--border-color)",
        backgroundColor: "var(--card-bg)",
        boxShadow: isFullscreen ? "none" : "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        height: isFullscreen ? "100%" : "auto",
        width: isFullscreen ? "100%" : "auto",
      }}
    >
      <div
        style={{
          padding: "0.75rem 1rem",
          backgroundColor: "var(--bg-color)",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-color)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <BarChart2 size={16} style={{ color: "var(--primary-color)" }} />
          {title}
        </span>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={openInNewWindow}
            title="Abrir en pestaña aparte"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-color)",
              opacity: 0.6,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ExternalLink size={16} />
          </button>
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-color)",
              opacity: 0.6,
              display: "flex",
              alignItems: "center",
            }}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>
      <div
        style={{
          padding: src === "simple-vs-compuesto" ? "1.5rem" : "0",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {src === "simple-vs-compuesto" ? (
          <InteractiveChart />
        ) : (
          <iframe
            src={src}
            style={{
              width: "100%",
              height: isFullscreen ? "100%" : height,
              flex: isFullscreen ? 1 : undefined,
              border: "none",
              backgroundColor: "var(--card-bg)",
            }}
            title={title}
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
