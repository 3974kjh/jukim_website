# 코딩 표준

## 개요
이 문서는 Svelte 5 기반 개인 웹사이트 프로젝트의 코딩 표준을 정의합니다. 일관성 있고 유지보수가 용이한 코드를 작성하기 위한 가이드라인을 제공합니다.

## TypeScript 사용 규칙

### 1. 타입 정의
```typescript
// ✅ 좋은 예: 명시적 인터페이스 정의
interface MindMapNode {
  id: string;
  title: string;
  position: { x: number; y: number };
  children?: MindMapNode[];
  color?: string;
}

// ❌ 나쁜 예: any 타입 사용
const node: any = { id: "1", title: "test" };
```

### 2. 유니온 타입과 리터럴 타입
```typescript
// ✅ 좋은 예: 리터럴 타입으로 제한
type Theme = 'light' | 'dark' | 'auto';
type AnimationState = 'idle' | 'running' | 'paused';

// ✅ 좋은 예: 유니온 타입 활용
type NodeSize = 'small' | 'medium' | 'large' | number;
```

### 3. 제네릭 사용
```typescript
// ✅ 좋은 예: 제네릭으로 재사용 가능한 타입
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// ✅ 좋은 예: 제약 조건이 있는 제네릭
interface Repository<T extends { id: string }> {
  findById(id: string): T | null;
  create(item: Omit<T, 'id'>): T;
}
```

## Svelte 5 Runes 규칙

### 1. $state() 사용
```typescript
// ✅ 좋은 예: 명시적 타입과 초기값
export const navigationState = $state<{
  currentPage: string;
  history: string[];
  isTransitioning: boolean;
}>({
  currentPage: 'home',
  history: ['home'],
  isTransitioning: false
});

// ❌ 나쁜 예: 타입 없는 state
export const state = $state({});
```

### 2. $derived() 사용
```typescript
// ✅ 좋은 예: 계산된 값의 명확한 의존성
export const isHomePage = $derived(() => 
  navigationState.currentPage === 'home'
);

export const breadcrumbs = $derived(() => 
  navigationState.history.map((page, index) => ({
    title: page,
    isLast: index === navigationState.history.length - 1
  }))
);

// ❌ 나쁜 예: 복잡한 로직을 derived에 포함
export const complexCalculation = $derived(() => {
  // 복잡한 계산 로직 (별도 함수로 분리해야 함)
});
```

### 3. $effect() 사용
```typescript
// ✅ 좋은 예: 명확한 사이드 이펙트
$effect(() => {
  // 페이지 변경 시 document title 업데이트
  document.title = `${navigationState.currentPage} - JuKim`;
});

// ✅ 좋은 예: 정리 함수 포함
$effect(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      navigationState.currentPage = 'home';
    }
  };
  
  document.addEventListener('keydown', handleKeydown);
  
  // 정리 함수
  return () => {
    document.removeEventListener('keydown', handleKeydown);
  };
});
```

## 컴포넌트 작성 규칙

### 1. 컴포넌트 구조
```svelte
<!-- ✅ 좋은 예: 명확한 구조 -->
<script lang="ts">
  // 1. 타입 정의
  interface Props {
    title: string;
    color?: string;
    onClick?: () => void;
  }
  
  // 2. Props 정의
  let { title, color = '#00d4ff', onClick }: Props = $props();
  
  // 3. 로컬 상태
  let isHovered = $state(false);
  
  // 4. 계산된 값
  let computedStyle = $derived(`color: ${color}; transform: ${isHovered ? 'scale(1.1)' : 'scale(1)'}`);
  
  // 5. 함수 정의
  function handleClick() {
    onClick?.();
  }
</script>

<!-- 6. 마크업 -->
<button 
  style={computedStyle}
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
  onclick={handleClick}
>
  {title}
</button>

<!-- 7. 스타일 -->
<style>
  button {
    /* 스타일 정의 */
  }
</style>
```

### 2. Props 정의 규칙
```typescript
// ✅ 좋은 예: 명시적 타입과 기본값
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: import('svelte').Snippet;
}

let { 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  children 
}: ButtonProps = $props();

// ❌ 나쁜 예: 타입 없는 props
let { variant, size, disabled } = $props();
```

## 함수와 메서드 규칙

### 1. 함수 작성 규칙
```typescript
// ✅ 좋은 예: 순수 함수, 명확한 타입
function calculateNodePosition(
  centerX: number, 
  centerY: number, 
  angle: number, 
  radius: number
): { x: number; y: number } {
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius
  };
}

// ✅ 좋은 예: 비동기 함수
async function saveUserPreferences(
  preferences: UserPreferences
): Promise<void> {
  try {
    await localStorage.setItem('preferences', JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save preferences:', error);
    throw new Error('Unable to save preferences');
  }
}

// ❌ 나쁜 예: 사이드 이펙트가 있는 함수명
function getUserName() {
  // 실제로는 사용자 이름을 가져오면서 로그도 남김
  console.log('Getting user name');
  return localStorage.getItem('userName');
}
```

### 2. 에러 처리
```typescript
// ✅ 좋은 예: 적절한 에러 처리
function parseUserData(jsonString: string): UserData {
  try {
    const data = JSON.parse(jsonString);
    
    if (!isValidUserData(data)) {
      throw new Error('Invalid user data format');
    }
    
    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON format');
    }
    throw error;
  }
}

// ✅ 좋은 예: 비동기 에러 처리
async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}
```

## 스타일링 규칙

### 1. CSS 변수 사용
```css
/* ✅ 좋은 예: CSS 변수 활용 */
.mindmap-node {
  background: var(--node-bg, var(--primary-blue));
  border-radius: var(--node-radius, 50%);
  transition: transform var(--transition-duration, 0.3s) var(--ease-out-quart);
}

/* ❌ 나쁜 예: 하드코딩된 값 */
.mindmap-node {
  background: #00d4ff;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
```

### 2. 반응형 디자인
```css
/* ✅ 좋은 예: 모바일 우선 */
.sidebar {
  width: 100%;
  height: 60px;
  bottom: 0;
  
  @media (min-width: 768px) {
    width: 80px;
    height: 100vh;
    bottom: auto;
    left: 0;
  }
}

/* ❌ 나쁜 예: 데스크톱 우선 */
.sidebar {
  width: 80px;
  height: 100vh;
  
  @media (max-width: 767px) {
    width: 100%;
    height: 60px;
  }
}
```

## 파일 및 폴더 구조

### 1. import/export 규칙
```typescript
// ✅ 좋은 예: 명시적 import
import { navigationState } from '$lib/stores/navigation.svelte.js';
import { calculateNodePosition } from '$lib/utils/mindmap.js';
import type { MindMapNode, UserPreferences } from '$lib/types.js';

// ✅ 좋은 예: 명시적 export
export { default as MindMap } from './MindMap.svelte';
export { default as Sidebar } from './Sidebar.svelte';
export type { MindMapNode, SidebarLink } from './types.js';

// ❌ 나쁜 예: 전체 import
import * as utils from '$lib/utils';
```

### 2. 파일 네이밍
```
// ✅ 좋은 예: PascalCase for components
MindMap.svelte
SidebarIcon.svelte
BackButton.svelte

// ✅ 좋은 예: camelCase for utilities
mindmapUtils.ts
animationHelpers.ts

// ✅ 좋은 예: kebab-case for routes
/introduction/
/personal-projects/
/company-projects/

// ❌ 나쁜 예: 일관성 없는 네이밍
mindMap.svelte
sidebar_icon.svelte
BackBtn.svelte
```

## 성능 최적화 규칙

### 1. 렌더링 최적화
```svelte
<!-- ✅ 좋은 예: 조건부 렌더링 -->
{#if isVisible}
  <ExpensiveComponent />
{/if}

<!-- ✅ 좋은 예: 지연 로딩 -->
{#await import('./HeavyComponent.svelte') then HeavyComponent}
  <HeavyComponent.default />
{/await}

<!-- ❌ 나쁜 예: 불필요한 렌더링 -->
<div style="display: {isVisible ? 'block' : 'none'}">
  <ExpensiveComponent />
</div>
```

### 2. 이벤트 최적화
```typescript
// ✅ 좋은 예: 디바운싱
import { debounce } from '$lib/utils/performance.js';

const debouncedSearch = debounce((query: string) => {
  // 검색 로직
}, 300);

// ✅ 좋은 예: 이벤트 위임
function handleCanvasClick(event: MouseEvent) {
  const target = event.target as Element;
  if (target.classList.contains('mindmap-node')) {
    // 노드 클릭 처리
  }
}
```

## 접근성 규칙

### 1. ARIA 속성
```svelte
<!-- ✅ 좋은 예: 적절한 ARIA 사용 -->
<button 
  aria-label="Navigate to {title} section"
  aria-pressed={isActive}
  role="button"
  tabindex="0"
>
  {title}
</button>

<!-- ✅ 좋은 예: 스크린 리더 지원 -->
<div role="region" aria-labelledby="mindmap-title">
  <h2 id="mindmap-title">Interactive Mind Map</h2>
  <!-- 마인드맵 내용 -->
</div>
```

### 2. 키보드 네비게이션
```typescript
// ✅ 좋은 예: 키보드 지원
function handleKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      handleActivate();
      break;
    case 'Escape':
      handleClose();
      break;
    case 'ArrowDown':
      focusNext();
      break;
    case 'ArrowUp':
      focusPrevious();
      break;
  }
}
```

## 테스팅 가이드라인

### 1. 컴포넌트 테스트
```typescript
// ✅ 좋은 예: 컴포넌트 단위 테스트
import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import MindMapNode from './MindMapNode.svelte';

test('renders node with correct title', () => {
  render(MindMapNode, { 
    props: { 
      title: 'Test Node',
      position: { x: 100, y: 100 }
    }
  });
  
  expect(screen.getByText('Test Node')).toBeInTheDocument();
});
```

### 2. 유틸 함수 테스트
```typescript
// ✅ 좋은 예: 순수 함수 테스트
import { expect, test } from 'vitest';
import { calculateNodePosition } from './mindmap.js';

test('calculates correct node position', () => {
  const result = calculateNodePosition(0, 0, 0, 100);
  expect(result).toEqual({ x: 100, y: 0 });
});
```

## 문서화 규칙

### 1. JSDoc 주석
```typescript
/**
 * 마인드맵 노드의 위치를 계산합니다.
 * 
 * @param centerX - 중심점의 X 좌표
 * @param centerY - 중심점의 Y 좌표  
 * @param angle - 각도 (라디안)
 * @param radius - 반지름
 * @returns 계산된 위치 좌표
 * 
 * @example
 * ```typescript
 * const position = calculateNodePosition(0, 0, Math.PI / 2, 100);
 * console.log(position); // { x: 0, y: 100 }
 * ```
 */
function calculateNodePosition(
  centerX: number,
  centerY: number, 
  angle: number,
  radius: number
): { x: number; y: number } {
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius
  };
}
```

### 2. README 및 컴포넌트 문서
```typescript
/**
 * # MindMapNode
 * 
 * 마인드맵의 개별 노드를 렌더링하는 컴포넌트입니다.
 * 
 * ## Props
 * - `title`: 노드에 표시될 텍스트
 * - `position`: 노드의 위치 좌표
 * - `color`: 노드의 배경색 (선택적)
 * - `onClick`: 클릭 이벤트 핸들러 (선택적)
 * 
 * ## 사용 예시
 * ```svelte
 * <MindMapNode 
 *   title="개발 여정"
 *   position={{ x: 200, y: 100 }}
 *   color="#00ff88"
 *   onClick={() => goto('/development')}
 * />
 * ```
 */
``` 