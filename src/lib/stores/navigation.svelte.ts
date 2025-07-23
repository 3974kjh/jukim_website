import type { NavigationState } from '$lib/types';
import { goto } from '$app/navigation';

// 네비게이션 상태 관리
export const navigationState = $state<NavigationState>({
  currentPage: 'home',
  history: ['home'],
  isTransitioning: false
});

// 페이지 이동 함수
export function navigateTo(page: string) {
  if (navigationState.currentPage === page) return;

  // 히스토리에 추가
  navigationState.history.push(page);
  navigationState.currentPage = page;

  // 브라우저 타이틀 업데이트
  updateBrowserTitle();

  // 실제 페이지 이동 - 즉시 실행
  const route = getPageRoute(page);
  goto(route);
}

// 뒤로 가기 함수
export function goBack() {
  if (navigationState.history.length <= 1) return;

  // 현재 페이지를 히스토리에서 제거
  navigationState.history.pop();

  // 이전 페이지로 이동
  const previousPage = navigationState.history[navigationState.history.length - 1];
  navigationState.currentPage = previousPage;

  // 브라우저 타이틀 업데이트
  updateBrowserTitle();

  // 실제 페이지 이동 - 즉시 실행
  const route = getPageRoute(previousPage);
  goto(route);
}

// 홈으로 이동 (히스토리 초기화)
export function goHome() {
  navigationState.currentPage = 'home';
  navigationState.history = ['home'];

  // 브라우저 타이틀 업데이트
  updateBrowserTitle();

  // 실제 페이지 이동 - 즉시 실행
  goto('/');
}

// 계산된 값들을 함수로 export (Svelte 5 Runes 규칙)
export function canGoBack(): boolean {
  return navigationState.history.length > 1;
}

export function isHomePage(): boolean {
  return navigationState.currentPage === 'home';
}

export function getBreadcrumbs() {
  return navigationState.history.map((page, index) => ({
    title: getPageTitle(page),
    route: page,
    isActive: index === navigationState.history.length - 1
  }));
}

export function getCurrentPageTitle(): string {
  return getPageTitle(navigationState.currentPage);
}

// 페이지 타이틀 변환 함수
function getPageTitle(page: string): string {
  const titles: Record<string, string> = {
    'home': '나',
    'introduction': '나의 소개 및 일대기',
    'development': '개발 여정',
    'personal-projects': '개인프로젝트',
    'company-projects': '회사프로젝트',
    'hobbies': '취미',
    'thoughts': '잡소리'
  };

  return titles[page] || page;
}

// 페이지 경로 변환 함수
export function getPageRoute(page: string): string {
  if (page === 'home') return '/';
  return `/${page}`;
}

// 라우트에서 페이지 이름 추출
export function getPageFromRoute(route: string): string {
  if (route === '/') return 'home';
  return route.replace('/', '');
}

// 브라우저 타이틀 업데이트 함수 (컴포넌트에서 호출)
export function updateBrowserTitle(): void {
  if (typeof window !== 'undefined') {
    document.title = `${getCurrentPageTitle()} - JuKim Portfolio`;
  }
}

// 네비게이션 유틸리티
export const navigationUtils = {
  navigateTo,
  goBack,
  goHome,
  getPageTitle,
  getPageRoute,
  getPageFromRoute,
  canGoBack,
  isHomePage,
  getBreadcrumbs,
  getCurrentPageTitle,
  updateBrowserTitle
}; 