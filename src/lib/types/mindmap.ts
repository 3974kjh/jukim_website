import type { Position, EventHandler } from './index.js';

// 마인드맵 노드 기본 타입
export interface MindMapNode {
  id: string;
  title: string;
  position: Position;
  angle: number; // 라디안 단위
  radius: number; // 중심에서의 거리
  level: number; // 0: 중심, 1: 1차 브랜치, 2: 2차 브랜치, 3: 3차 브랜치
  color: string;
  icon?: string;
  isVisible: boolean;
  isSelected: boolean;
  isHovered: boolean;
  children?: MindMapNode[];
  parent?: string; // 부모 노드 ID
}

// 1차 브랜치 (메인 카테고리)
export interface MainBranch extends MindMapNode {
  level: 1;
  category: MainCategory;
  route: string;
  description: string;
  gradient: {
    from: string;
    to: string;
  };
}

// 메인 카테고리 타입
export type MainCategory = 
  | 'introduction' 
  | 'development' 
  | 'personal-projects' 
  | 'company-projects' 
  | 'hobbies' 
  | 'thoughts';

// 연결선 타입
export interface Connection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  path: string; // SVG path 문자열
  strokeWidth: number;
  color: string;
  isAnimated: boolean;
}

// 마인드맵 전체 상태
export interface MindMapState {
  centerNode: MindMapNode;
  mainBranches: MainBranch[];
  allNodes: MindMapNode[];
  connections: Connection[];
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  animationState: 'idle' | 'expanding' | 'collapsing' | 'transitioning';
  canvasSize: { width: number; height: number };
  zoom: number;
  pan: Position;
}

// 마인드맵 설정
export interface MindMapConfig {
  centerRadius: number;
  branchRadius: number;
  subBranchRadius: number;
  minDistance: number;
  maxDistance: number;
  animationDuration: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

// 노드 이벤트 핸들러 타입
export interface NodeEventHandlers {
  onNodeClick?: EventHandler<{ node: MindMapNode; event: MouseEvent }>;
  onNodeHover?: EventHandler<{ node: MindMapNode; event: MouseEvent }>;
  onNodeLeave?: EventHandler<{ node: MindMapNode; event: MouseEvent }>;
  onNodeDoubleClick?: EventHandler<{ node: MindMapNode; event: MouseEvent }>;
}

// 마인드맵 컴포넌트 Props
export interface MindMapProps {
  nodes: MindMapNode[];
  config?: Partial<MindMapConfig>;
  eventHandlers?: NodeEventHandlers;
  className?: string;
  onNodeNavigate?: (route: string) => void;
}

// 노드 생성을 위한 팩토리 함수 타입
export type NodeFactory = (
  id: string,
  title: string,
  position: Position,
  options?: Partial<MindMapNode>
) => MindMapNode;

// 마인드맵 유틸리티 함수 타입들
export type PositionCalculator = (
  centerX: number,
  centerY: number,
  angle: number,
  radius: number
) => Position;

export type PathGenerator = (
  from: Position,
  to: Position,
  curvature?: number
) => string; 