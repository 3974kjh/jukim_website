// 기본 테마 관련 타입
export type Theme = 'light' | 'dark' | 'auto';

// 사용자 설정 타입
export interface UserPreferences {
  theme: Theme;
  animations: boolean;
  language: 'ko' | 'en';
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
  };
}

// 네비게이션 관련 타입
export interface NavigationState {
  currentPage: string;
  history: string[];
}

// 사이드바 링크 타입
export interface SidebarLink {
  id: string;
  icon: string;
  title: string;
  url: string;
  description: string;
  category: 'social' | 'project' | 'blog' | 'other';
}

// 브레드크럼 타입
export interface Breadcrumb {
  title: string;
  route: string;
  isActive: boolean;
}

// 분석 데이터 타입
export interface AnalyticsData {
  pageViews: Record<string, number>;
  sessionDuration: number;
  clickHeatmap: { x: number; y: number; count: number }[];
  popularSections: string[];
}

// localStorage 키 타입
export type StorageKey = 
  | 'userPreferences'
  | 'analytics'
  | 'visitHistory'
  | 'mindmapState';

// 유틸리티 타입
export type EventHandler<T = void> = (event: T) => void;
export type AsyncFunction<T, R> = (input: T) => Promise<R>;
export type Position = { x: number; y: number };
export type Size = { width: number; height: number };

// 컴포넌트 Props 기본 타입
export interface BaseComponentProps {
  class?: string;
  id?: string;
}

// 애니메이션 상태
export type AnimationState = 'idle' | 'running' | 'paused' | 'completed';

// 공통 컴포넌트 타입들을 재수출
export type { ComponentType, ComponentProps } from 'svelte';
export type { HTMLAttributes, HTMLButtonAttributes, HTMLInputAttributes } from 'svelte/elements'; 