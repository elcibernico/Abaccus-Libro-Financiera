export interface BaseContentBlock {
  type: string;
  content?: string;
  highlights?: string;
}

export interface ChartContentBlock extends BaseContentBlock {
  type: string;
  metadata: {
    chartType: string;
  };
}

export interface CaseItem {
  type: string;
  title?: string;
  enunciado?: string;
  planteo_solucion?: string;
  content?: string;
  highlights?: string;
}

export interface QuizItem {
  type: string;
  question: string;
  options: string[];
  feedback: string;
  correctIndex: number;
  content?: string;
}

export interface InteractiveGraphicBlock extends BaseContentBlock {
  type: 'interactive_graphic';
  src: string;
  title: string;
  displayMode?: 'inline' | 'modal' | 'new_window';
  height?: number | string;
}

export interface ImageContentBlock extends BaseContentBlock {
  type: 'image';
  src: string;
  alt?: string;
}

export type ContentBlock = BaseContentBlock | ChartContentBlock | QuizItem | InteractiveGraphicBlock | ImageContentBlock;

export interface TopicData {
  id: string;
  title: string;
  Desarrollo: ContentBlock[];
  Glosario: ContentBlock[];
  "Casos Prácticos": CaseItem[];
  Autoevaluación: QuizItem[];
  "Gráficos": any[];
  [key: string]: any;
}
