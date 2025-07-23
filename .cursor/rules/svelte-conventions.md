# Svelte 5 컨벤션

## 개요
이 문서는 Svelte 5와 Runes를 사용하는 프로젝트의 특별한 컨벤션을 정의합니다. 새로운 Runes API와 기능들을 올바르게 사용하기 위한 가이드라인을 제공합니다.

## Runes 사용 컨벤션

### 1. $state() 사용법

#### 기본 사용
```typescript
// ✅ 좋은 예: 명시적 타입과 초기값
let count = $state(0);
let user = $state<User | null>(null);
let settings = $state({
  theme: 'dark' as const,
  animations: true,
  language: 'ko' as const
});

// ❌ 나쁜 예: 복잡한 객체를 직접 state로 관리
let complexState = $state({
  user: { name: '', email: '', preferences: { ... } },
  ui: { loading: false, error: null, modal: { ... } },
  data: { items: [], filters: { ... } }
});
```

#### 중첩 상태 관리
```typescript
// ✅ 좋은 예: 적절한 분리
let userProfile = $state<UserProfile>({
  name: '',
  email: '',
  avatar: null
});

let userPreferences = $state<UserPreferences>({
  theme: 'auto',
  animations: true,
  language: 'ko'
});

// ✅ 좋은 예: 상태 업데이트
function updateProfile(newProfile: Partial<UserProfile>) {
  userProfile = { ...userProfile, ...newProfile };
}
```

### 2. $derived() 사용법

#### 계산된 값
```typescript
// ✅ 좋은 예: 간단한 계산
let fullName = $derived(() => `${firstName} ${lastName}`);
let isLoggedIn = $derived(() => user !== null);
let totalPrice = $derived(() => 
  cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// ✅ 좋은 예: 조건부 계산
let statusColor = $derived(() => {
  switch (status) {
    case 'success': return 'green';
    case 'error': return 'red';
    case 'warning': return 'orange';
    default: return 'gray';
  }
});

// ❌ 나쁜 예: 복잡한 로직
let complexCalculation = $derived(() => {
  // 100줄 이상의 복잡한 계산 로직
  // 이런 경우 별도 함수로 분리해야 함
});
```

#### 배열과 객체 파생
```typescript
// ✅ 좋은 예: 배열 필터링
let visibleNodes = $derived(() => 
  allNodes.filter(node => node.isVisible && !node.isHidden)
);

let nodesByCategory = $derived(() => 
  nodes.reduce((acc, node) => {
    if (!acc[node.category]) {
      acc[node.category] = [];
    }
    acc[node.category].push(node);
    return acc;
  }, {} as Record<string, Node[]>)
);

// ✅ 좋은 예: 객체 변환
let nodePositions = $derived(() => 
  nodes.map(node => ({
    ...node,
    position: calculatePosition(node.angle, node.radius)
  }))
);
```

### 3. $effect() 사용법

#### 기본 사이드 이펙트
```typescript
// ✅ 좋은 예: DOM 조작
$effect(() => {
  document.title = `${currentPage} - JuKim Portfolio`;
});

// ✅ 좋은 예: 로컬 스토리지 동기화
$effect(() => {
  if (userPreferences) {
    localStorage.setItem('preferences', JSON.stringify(userPreferences));
  }
});

// ✅ 좋은 예: 이벤트 리스너 관리
$effect(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
  
  document.addEventListener('keydown', handleKeydown);
  
  return () => {
    document.removeEventListener('keydown', handleKeydown);
  };
});
```

#### 조건부 이펙트
```typescript
// ✅ 좋은 예: 조건부 실행
$effect(() => {
  if (isModalOpen) {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }
});

// ✅ 좋은 예: 비동기 작업
$effect(() => {
  let cancelled = false;
  
  async function loadData() {
    if (userId) {
      const userData = await fetchUser(userId);
      if (!cancelled) {
        user = userData;
      }
    }
  }
  
  loadData();
  
  return () => {
    cancelled = true;
  };
});
```

## 컴포넌트 구조 컨벤션

### 1. 컴포넌트 정의 순서
```svelte
<script lang="ts">
  // 1. 타입 임포트
  import type { ComponentType, Props } from '$lib/types.js';
  
  // 2. 값 임포트 (유틸, 스토어 등)
  import { goto } from '$app/navigation';
  import { navigationState } from '$lib/stores/navigation.svelte.js';
  import { calculatePosition } from '$lib/utils/mindmap.js';
  
  // 3. 컴포넌트 임포트
  import Button from './Button.svelte';
  import Modal from './Modal.svelte';
  
  // 4. Props 인터페이스 정의
  interface Props {
    title: string;
    nodes: MindMapNode[];
    onNodeClick?: (node: MindMapNode) => void;
  }
  
  // 5. Props 구조분해
  let { title, nodes, onNodeClick }: Props = $props();
  
  // 6. 로컬 상태
  let selectedNode = $state<MindMapNode | null>(null);
  let isAnimating = $state(false);
  
  // 7. 계산된 값
  let visibleNodes = $derived(() => nodes.filter(n => n.visible));
  let centerPosition = $derived(() => ({ x: 400, y: 300 }));
  
  // 8. 이펙트
  $effect(() => {
    if (selectedNode) {
      console.log('Selected node:', selectedNode.title);
    }
  });
  
  // 9. 함수 정의
  function handleNodeClick(node: MindMapNode) {
    selectedNode = node;
    onNodeClick?.(node);
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      selectedNode = null;
    }
  }
</script>

<!-- 10. HTML 템플릿 -->
<div class="mindmap-container">
  <h1>{title}</h1>
  
  {#each visibleNodes as node (node.id)}
    <button
      class="node"
      onclick={() => handleNodeClick(node)}
      onkeydown={handleKeydown}
    >
      {node.title}
    </button>
  {/each}
</div>

<!-- 11. 스타일 -->
<style>
  .mindmap-container {
    position: relative;
    width: 100%;
    height: 100vh;
  }
  
  .node {
    position: absolute;
    /* ... */
  }
</style>
```

### 2. Props 패턴

#### 필수 vs 선택적 Props
```typescript
// ✅ 좋은 예: 명확한 구분
interface ButtonProps {
  // 필수 props
  label: string;
  
  // 선택적 props (기본값 있음)
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  
  // 선택적 props (기본값 없음)
  icon?: string;
  onClick?: () => void;
}

let { 
  label,
  variant = 'primary',
  size = 'md', 
  disabled = false,
  icon,
  onClick
}: ButtonProps = $props();
```

#### 스프레드 Props
```typescript
// ✅ 좋은 예: 명시적 props + 나머지
interface SpecificProps {
  title: string;
  color: string;
}

let { title, color, ...restProps }: SpecificProps & 
  Omit<HTMLButtonAttributes, keyof SpecificProps> = $props();
```

### 3. 이벤트 처리 패턴

#### 커스텀 이벤트
```svelte
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher<{
    nodeClick: { node: MindMapNode; position: { x: number; y: number } };
    nodeHover: { node: MindMapNode };
    selectionChange: { selectedNodes: MindMapNode[] };
  }>();
  
  function handleClick(node: MindMapNode, event: MouseEvent) {
    dispatch('nodeClick', {
      node,
      position: { x: event.clientX, y: event.clientY }
    });
  }
</script>
```

#### 이벤트 바인딩
```svelte
<!-- ✅ 좋은 예: 적절한 이벤트 바인딩 -->
<button
  onclick={handleClick}
  onkeydown={handleKeydown}
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
>
  Click me
</button>

<!-- ❌ 나쁜 예: 인라인 복잡한 로직 -->
<button
  onclick={() => {
    if (condition1 && condition2) {
      // 복잡한 로직
    } else {
      // 더 복잡한 로직
    }
  }}
>
  Click me
</button>
```

## 반응성 패턴

### 1. 반응형 선언

#### 의존성 관리
```svelte
<script lang="ts">
  // ✅ 좋은 예: 명시적 의존성
  let width = $state(0);
  let height = $state(0);
  let area = $derived(() => width * height);
  let isSquare = $derived(() => width === height);
  
  // ✅ 좋은 예: 체이닝된 반응성
  let user = $state<User | null>(null);
  let isLoggedIn = $derived(() => user !== null);
  let userDisplayName = $derived(() => 
    isLoggedIn ? user!.name : 'Guest'
  );
  
  // ❌ 나쁜 예: 순환 의존성
  let a = $derived(() => b + 1);
  let b = $derived(() => a - 1); // 순환 참조!
</script>
```

### 2. 상태 업데이트 패턴

#### 불변성 유지
```typescript
// ✅ 좋은 예: 불변 업데이트
let items = $state<Item[]>([]);

function addItem(newItem: Item) {
  items = [...items, newItem];
}

function updateItem(id: string, updates: Partial<Item>) {
  items = items.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );
}

function removeItem(id: string) {
  items = items.filter(item => item.id !== id);
}

// ❌ 나쁜 예: 직접 변경
function addItemBad(newItem: Item) {
  items.push(newItem); // 반응성 깨짐
}
```

#### 객체 상태 업데이트
```typescript
// ✅ 좋은 예: 객체 불변 업데이트
let userProfile = $state({
  name: '',
  email: '',
  settings: {
    theme: 'dark',
    notifications: true
  }
});

function updateUserName(name: string) {
  userProfile = { ...userProfile, name };
}

function updateUserSettings(settings: Partial<typeof userProfile.settings>) {
  userProfile = {
    ...userProfile,
    settings: { ...userProfile.settings, ...settings }
  };
}
```

## 템플릿 패턴

### 1. 조건부 렌더링
```svelte
<!-- ✅ 좋은 예: 명확한 조건 -->
{#if user}
  <UserProfile {user} />
{:else}
  <LoginForm />
{/if}

<!-- ✅ 좋은 예: 다중 조건 -->
{#if loading}
  <LoadingSpinner />
{:else if error}
  <ErrorMessage {error} />
{:else if data.length === 0}
  <EmptyState />
{:else}
  <DataList {data} />
{/if}

<!-- ❌ 나쁜 예: 복잡한 인라인 조건 -->
{#if user && user.isActive && !user.isBlocked && user.permissions.includes('read')}
  <!-- 복잡한 조건을 derived로 추출해야 함 -->
{/if}
```

### 2. 반복 렌더링
```svelte
<!-- ✅ 좋은 예: 키 사용 -->
{#each items as item (item.id)}
  <ItemComponent {item} />
{/each}

<!-- ✅ 좋은 예: 인덱스와 함께 -->
{#each items as item, index (item.id)}
  <div class="item-{index}">
    <ItemComponent {item} />
  </div>
{/each}

<!-- ✅ 좋은 예: 빈 상태 처리 -->
{#each items as item (item.id)}
  <ItemComponent {item} />
{:else}
  <p>No items found</p>
{/each}
```

### 3. 슬롯 패턴
```svelte
<!-- ✅ 좋은 예: 네임드 슬롯 -->
<Modal>
  <svelte:fragment slot="header">
    <h2>Modal Title</h2>
  </svelte:fragment>
  
  <p>Modal content goes here</p>
  
  <svelte:fragment slot="footer">
    <Button onclick={handleSave}>Save</Button>
    <Button onclick={handleCancel}>Cancel</Button>
  </svelte:fragment>
</Modal>

<!-- ✅ 좋은 예: 스크립트 슬롯 -->
<DataProvider>
  {#snippet children({ data, loading, error })}
    {#if loading}
      <LoadingSpinner />
    {:else if error}
      <ErrorMessage {error} />
    {:else}
      <DataList {data} />
    {/if}
  {/snippet}
</DataProvider>
```

## 애니메이션 컨벤션

### 1. 트랜지션 사용
```svelte
<script>
  import { fade, slide, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
</script>

<!-- ✅ 좋은 예: 적절한 트랜지션 -->
{#if visible}
  <div 
    in:fade={{ duration: 300, easing: quintOut }}
    out:fade={{ duration: 200 }}
  >
    Content
  </div>
{/if}

<!-- ✅ 좋은 예: 커스텀 트랜지션 -->
{#if showModal}
  <div 
    in:scale={{ start: 0.8, duration: 300 }}
    out:scale={{ start: 0.8, duration: 200 }}
    class="modal"
  >
    Modal content
  </div>
{/if}
```

### 2. 애니메이션 함수
```typescript
// ✅ 좋은 예: 재사용 가능한 애니메이션
import type { TransitionConfig } from 'svelte/transition';

export function slideIn(
  node: Element,
  { duration = 300, direction = 'left' }: { duration?: number; direction?: 'left' | 'right' | 'up' | 'down' } = {}
): TransitionConfig {
  const transforms = {
    left: 'translateX(-100%)',
    right: 'translateX(100%)',
    up: 'translateY(-100%)',
    down: 'translateY(100%)'
  };
  
  return {
    duration,
    css: (t) => `
      transform: ${transforms[direction]};
      opacity: ${t};
    `
  };
}
```

## 스토어 패턴

### 1. Runes 기반 스토어
```typescript
// ✅ 좋은 예: navigation.svelte.ts
export const navigationState = $state({
  currentPage: 'home',
  history: ['home'],
  isTransitioning: false
});

export const navigationMethods = {
  goTo(page: string) {
    navigationState.history.push(page);
    navigationState.currentPage = page;
  },
  
  goBack() {
    if (navigationState.history.length > 1) {
      navigationState.history.pop();
      navigationState.currentPage = navigationState.history[navigationState.history.length - 1];
    }
  }
};

// 계산된 값들
export const canGoBack = $derived(() => navigationState.history.length > 1);
export const breadcrumbs = $derived(() => navigationState.history.map(page => ({ page, title: getPageTitle(page) })));
```

### 2. 로컬 스토리지 동기화
```typescript
// ✅ 좋은 예: storage.svelte.ts
function createStorageState<T>(key: string, defaultValue: T) {
  let value = $state<T>(defaultValue);
  
  // 초기화
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        value = JSON.parse(stored);
      } catch {
        value = defaultValue;
      }
    }
  }
  
  // 자동 저장
  $effect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });
  
  return {
    get value() { return value; },
    set value(newValue: T) { value = newValue; }
  };
}

export const userPreferences = createStorageState('userPreferences', {
  theme: 'auto' as const,
  animations: true,
  language: 'ko' as const
});
``` 