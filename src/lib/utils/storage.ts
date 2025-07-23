import type { StorageKey, UserPreferences, AnalyticsData } from '$lib/types';

// 마인드맵 상태 타입
interface MindMapState {
  zoom?: number;
  centerPosition?: { x: number; y: number };
  selectedNode?: string;
  expandedNodes?: string[];
  lastVisited?: string;
}

// 기본 사용자 설정
const defaultPreferences: UserPreferences = {
  theme: 'auto',
  animations: true,
  language: 'ko',
  accessibility: {
    reducedMotion: false,
    highContrast: false
  }
};

// 기본 분석 데이터
const defaultAnalytics: AnalyticsData = {
  pageViews: {},
  sessionDuration: 0,
  clickHeatmap: [],
  popularSections: []
};

// localStorage 안전하게 접근하는 헬퍼
function isStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const test = '__storage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

// 데이터 저장
export function setStorageItem<T>(key: StorageKey, value: T): boolean {
  if (!isStorageAvailable()) return false;
  
  try {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.warn(`Failed to save to localStorage: ${key}`, error);
    return false;
  }
}

// 데이터 불러오기
export function getStorageItem<T>(key: StorageKey, defaultValue: T): T {
  if (!isStorageAvailable()) return defaultValue;
  
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) return defaultValue;
    
    const parsed = JSON.parse(item);
    return parsed as T;
  } catch (error) {
    console.warn(`Failed to load from localStorage: ${key}`, error);
    return defaultValue;
  }
}

// 데이터 제거
export function removeStorageItem(key: StorageKey): boolean {
  if (!isStorageAvailable()) return false;
  
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove from localStorage: ${key}`, error);
    return false;
  }
}

// 모든 앱 데이터 제거
export function clearAppData(): boolean {
  if (!isStorageAvailable()) return false;
  
  const appKeys: StorageKey[] = ['userPreferences', 'analytics', 'visitHistory', 'mindmapState'];
  
  try {
    appKeys.forEach(key => window.localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.warn('Failed to clear app data', error);
    return false;
  }
}

// 사용자 설정 관련
export const userPreferences = {
  get: () => getStorageItem('userPreferences', defaultPreferences),
  set: (preferences: UserPreferences) => setStorageItem('userPreferences', preferences),
  update: (updates: Partial<UserPreferences>) => {
    const current = userPreferences.get();
    const updated = { ...current, ...updates };
    return userPreferences.set(updated);
  }
};

// 분석 데이터 관련
export const analytics = {
  get: () => getStorageItem('analytics', defaultAnalytics),
  set: (data: AnalyticsData) => setStorageItem('analytics', data),
  trackPageView: (page: string) => {
    const data = analytics.get();
    data.pageViews[page] = (data.pageViews[page] || 0) + 1;
    analytics.set(data);
  },
  addClickHeatmap: (x: number, y: number) => {
    const data = analytics.get();
    const existing = data.clickHeatmap.find(point => 
      Math.abs(point.x - x) < 20 && Math.abs(point.y - y) < 20
    );
    
    if (existing) {
      existing.count++;
    } else {
      data.clickHeatmap.push({ x, y, count: 1 });
    }
    
    analytics.set(data);
  }
};

// 방문 기록 관리
export const visitHistory = {
  get: () => getStorageItem('visitHistory', [] as string[]),
  add: (page: string) => {
    const history = visitHistory.get();
    const filtered = history.filter(p => p !== page);
    filtered.unshift(page);
    setStorageItem('visitHistory', filtered.slice(0, 50)); // 최대 50개 보관
  }
};

// 마인드맵 상태 관리
export const mindmapState = {
  get: () => getStorageItem('mindmapState', {} as MindMapState),
  set: (state: MindMapState) => setStorageItem('mindmapState', state),
  update: (updates: Partial<MindMapState>) => {
    const current = mindmapState.get();
    const updated = { ...current, ...updates };
    return mindmapState.set(updated);
  }
};

// 스토리지 이벤트 리스너
export function onStorageChange(callback: (key: string, newValue: unknown) => void) {
  if (!isStorageAvailable()) return () => {};
  
  const handler = (event: StorageEvent) => {
    if (event.key && event.newValue) {
      try {
        const parsed = JSON.parse(event.newValue);
        callback(event.key, parsed);
      } catch {
        callback(event.key, event.newValue);
      }
    }
  };
  
  window.addEventListener('storage', handler);
  
  return () => window.removeEventListener('storage', handler);
}

// 저장 공간 사용량 확인 (개발용)
export function getStorageUsage(): { used: number; quota: number } {
  if (!isStorageAvailable()) return { used: 0, quota: 0 };
  
  let used = 0;
  for (const key in window.localStorage) {
    if (Object.prototype.hasOwnProperty.call(window.localStorage, key)) {
      used += window.localStorage[key].length;
    }
  }
  
  // 대략적인 할당량 (브라우저마다 다름)
  const quota = 5 * 1024 * 1024; // 5MB
  
  return { used, quota };
} 