"use client";
import { useState, useEffect } from "react";
import bookIndex from "../data/bookIndex.json";
import { availableTopics } from "../data/dataRegistry";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigation } from "./NavigationProvider";

// ── Helpers ──────────────────────────────────────────────────────────────────
function nodeHasContent(node: any): boolean {
  if (node.dataFile && availableTopics.has(node.dataFile)) return true;
  for (const key of ['subtopics', 'topics'] as const) {
    if (Array.isArray(node[key]) && node[key].some((c: any) => nodeHasContent(c))) return true;
  }
  return false;
}

// ── Sub-components ────────────────────────────────────────────────────────────
function TopicItem({
  topic,
  unitId,
  depth = 1,
}: {
  topic: any;
  unitId: string;
  depth?: number;
}) {
  const { activeTopic, setActiveTopic, setActiveUnit, setIsSidebarOpen } = useNavigation();
  const [open, setOpen] = useState(false);

  const isClickable = !!topic.dataFile;
  const hasChildren = Array.isArray(topic.subtopics) && topic.subtopics.length > 0;
  const isVisible = nodeHasContent(topic);
  const isActive = activeTopic === topic.dataFile;

  useEffect(() => {
    if (hasChildren && topic.subtopics?.some((s: any) => s.dataFile === activeTopic || nodeHasContent(s))) {
      setOpen(true);
    }
  }, [activeTopic]);

  if (!isVisible) return null;

  const paddingLeft = `${depth * 1.1 + 0.5}rem`;

  const handleClick = () => {
    if (hasChildren) {
      setOpen((o) => !o);
    }
    if (isClickable) {
      setActiveUnit(unitId);
      setActiveTopic(topic.dataFile);
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    }
  };

  return (
    <li>
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `0.45rem 1rem 0.45rem ${paddingLeft}`,
          borderRadius: "0.5rem",
          cursor: isClickable || hasChildren ? "pointer" : "default",
          transition: "background 0.15s, color 0.15s",
          background: isActive
            ? "rgba(150, 150, 150, 0.15)"
            : "transparent",
          borderLeft: isActive ? "3px solid var(--primary-color)" : "3px solid transparent",
          color: isActive
            ? "var(--primary-color)"
            : "var(--text-color)",
          fontWeight: isActive ? 600 : 400,
          fontSize: depth === 1 ? "0.9rem" : "0.84rem",
        }}
        className="sidebar-topic-item"
      >
        <span style={{ flex: 1, lineHeight: 1.4 }}>
          <span style={{ fontVariantNumeric: "tabular-nums", marginRight: "0.4rem", opacity: 0.65, fontSize: "0.8em" }}>
            {topic.number}
          </span>
          {topic.title}
        </span>
        {hasChildren && (
          <span style={{ flexShrink: 0, opacity: 0.6 }}>
            {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </span>
        )}
      </div>
 
      {hasChildren && open && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {topic.subtopics.map((sub: any) => (
            <TopicItem key={sub.id} topic={sub} unitId={unitId} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}
 
// ── Main Sidebar (Modulo Content) ──────────────────────────────────────────────
export default function Sidebar() {
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({ U02: true });
  const { activeTopic, setActiveTopic, setActiveUnit, setIsSidebarOpen } = useNavigation();
 
  const toggleUnit = (id: string) => {
    setExpandedUnits((prev) => ({ ...prev, [id]: !prev[id] }));
  };
 
  return (
    <nav className="sidebar-nav-inner" style={{ width: "100%" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {bookIndex.units.map((unit: any) => {
          const unitVisible = nodeHasContent(unit);
          if (!unitVisible) return null;
 
          const isUnitActive = activeTopic === unit.id;
 
          const handleUnitClick = () => {
            toggleUnit(unit.id);
            setActiveUnit(unit.id);
            setActiveTopic(unit.id);
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              setIsSidebarOpen(false);
            }
          };
 
          return (
            <li key={unit.id} className="chapter-item" style={{ marginBottom: "0.75rem" }}>
              <div
                className="chapter-title"
                onClick={handleUnitClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  background: isUnitActive
                    ? "rgba(150, 150, 150, 0.2)"
                    : "transparent",
                  borderLeft: isUnitActive ? "3px solid var(--primary-color)" : "3px solid transparent",
                  color: isUnitActive ? "var(--primary-color)" : "var(--text-color)",
                  fontWeight: 600,
                  fontSize: "0.95rem"
                }}
              >
                <span className="chapter-name" style={{ lineHeight: 1.4 }}>
                  Unidad {unit.number}: {unit.title}
                </span>
                <span className="chapter-icon" style={{ flexShrink: 0 }}>
                  {expandedUnits[unit.id] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </span>
              </div>

              {expandedUnits[unit.id] && Array.isArray(unit.topics) && (
                <ul style={{ listStyle: "none", padding: 0, margin: "0.25rem 0 0 0" }}>
                  {unit.topics.map((topic: any) => (
                    <TopicItem key={topic.id} topic={topic} unitId={unit.id} depth={1} />
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
