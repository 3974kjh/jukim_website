# 네이밍 컨벤션

## 개요
일관성 있는 네이밍 컨벤션은 코드의 가독성과 유지보수성을 크게 향상시킵니다. 이 문서는 Svelte 5 기반 프로젝트에서 사용할 네이밍 규칙을 정의합니다.

## 파일 및 폴더 네이밍

### 1. 컴포넌트 파일
- **PascalCase** 사용
- 명확하고 설명적인 이름
- `.svelte` 확장자

```
✅ 좋은 예:
MindMap.svelte
SidebarIcon.svelte
BackButton.svelte
LoadingSpinner.svelte
UserProfileCard.svelte

❌ 나쁜 예:
mindmap.svelte
sidebar_icon.svelte
btn.svelte
spinner.svelte
profile.svelte
```

### 2. TypeScript/JavaScript 파일
- **camelCase** 사용
- 기능을 명확히 나타내는 이름

```
✅ 좋은 예:
navigationStore.ts
mindmapUtils.ts
animationHelpers.ts
storageManager.ts
userPreferences.ts

❌ 나쁜 예:
nav.ts
mindmap.ts
anim.ts
storage.ts
prefs.ts
```

### 3. 폴더명
- **kebab-case** 사용 (라우트)
- **camelCase** 사용 (lib 하위)

```
✅ 좋은 예:
routes/personal-projects/
routes/company-projects/
lib/components/
lib/mindmapUtils/

❌ 나쁜 예:
routes/personalProjects/
routes/company_projects/
lib/Components/
lib/mindmap_utils/
```

### 4. 스타일 파일
- **kebab-case** 사용
- 용도를 명확히 표현

```
✅ 좋은 예:
global.css
mindmap-theme.css
button-variants.css
layout-grid.css

❌ 나쁜 예:
Global.css
mindmapTheme.css
buttonvariants.css
layout.css
```

## 변수 및 함수 네이밍

### 1. 변수명
- **camelCase** 사용
- 명확하고 의미 있는 이름
- 불린 변수는 `is`, `has`, `can`, `should` 접두사 사용

```typescript
// ✅ 좋은 예: 일반 변수
let userName = 'John Doe';
let selectedNodeId = 'node-123';
let animationDuration = 300;
let mousePosition = { x: 0, y: 0 };

// ✅ 좋은 예: 불린 변수
let isVisible = true;
let hasPermission = false;
let canEdit = true;
let shouldAnimate = false;
let isLoading = false;
let hasError = false;

// ❌ 나쁜 예
let user_name = 'John Doe';
let visible = true;
let loading = false;
let data = null;
let temp = 123;
```

### 2. 함수명
- **camelCase** 사용
- 동사로 시작
- 명확한 동작을 나타냄

```typescript
// ✅ 좋은 예: 액션 함수
function calculateNodePosition() { }
function updateUserProfile() { }
function validateFormData() { }
function renderMindMap() { }
function handleNodeClick() { }

// ✅ 좋은 예: 이벤트 핸들러
function handleButtonClick() { }
function onKeyDown() { }
function onMouseEnter() { }
function handleFormSubmit() { }

// ✅ 좋은 예: 유틸리티 함수
function formatDate() { }
function debounce() { }
function throttle() { }
function parseUserData() { }

// ❌ 나쁜 예
function nodePos() { }
function update() { }
function validate() { }
function click() { }
function data() { }
```

### 3. 상수명
- **SCREAMING_SNAKE_CASE** 사용 (전역 상수)
- **camelCase** 사용 (로컬 상수)

```typescript
// ✅ 좋은 예: 전역 상수
const MAX_NODES = 100;
const DEFAULT_ANIMATION_DURATION = 300;
const API_BASE_URL = 'https://api.example.com';
const MINDMAP_COLORS = {
  PRIMARY: '#00d4ff',
  SECONDARY: '#8b5cf6'
};

// ✅ 좋은 예: 로컬 상수
const defaultUserPreferences = {
  theme: 'auto',
  animations: true
};

const mindmapConfig = {
  centerRadius: 120,
  branchLength: 200
};
```

## Svelte 5 Runes 네이밍

### 1. $state() 변수
- **camelCase** 사용
- 상태임을 명확히 표현

```typescript
// ✅ 좋은 예
let currentPage = $state('home');
let selectedNodes = $state<Node[]>([]);
let userPreferences = $state({
  theme: 'auto',
  animations: true
});
let isNavigationOpen = $state(false);

// ❌ 나쁜 예
let page = $state('home');
let nodes = $state([]);
let prefs = $state({});
let navOpen = $state(false);
```

### 2. $derived() 변수
- **camelCase** 사용
- 계산된 값임을 나타내는 접두사 사용 가능

```typescript
// ✅ 좋은 예
let totalNodes = $derived(() => nodes.length);
let visibleNodes = $derived(() => nodes.filter(n => n.visible));
let computedPosition = $derived(() => calculatePosition(angle, radius));
let isValidForm = $derived(() => validateForm(formData));

// 또는 computed 접두사 사용
let computedTotalPrice = $derived(() => items.reduce((sum, item) => sum + item.price, 0));
let derivedUserDisplayName = $derived(() => user?.name ?? 'Guest');
```

### 3. 스토어 네이밍
- **camelCase** 사용
- 역할을 명확히 표현
- `State`, `Store` 접미사 사용

```typescript
// ✅ 좋은 예
export const navigationState = $state({
  currentPage: 'home',
  history: []
});

export const userPreferencesState = $state({
  theme: 'auto',
  language: 'ko'
});

export const mindmapStore = $state({
  nodes: [],
  connections: []
});
```

## 컴포넌트 Props 네이밍

### 1. Props 인터페이스
- **PascalCase** 사용 (타입명)
- **camelCase** 사용 (속성명)
- 명확한 타입 표현

```typescript
// ✅ 좋은 예
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

interface MindMapNodeProps {
  nodeData: MindMapNode;
  position: { x: number; y: number };
  isSelected?: boolean;
  onNodeClick?: (node: MindMapNode) => void;
  onNodeHover?: (node: MindMapNode) => void;
}

// ❌ 나쁜 예
interface Props {
  data: any;
  click: Function;
  hover: Function;
}
```

### 2. 이벤트 핸들러 Props
- `on` 접두사 사용
- 명확한 동작 표현

```typescript
// ✅ 좋은 예
interface ComponentProps {
  onClick?: () => void;
  onSubmit?: (data: FormData) => void;
  onValueChange?: (value: string) => void;
  onNodeSelect?: (node: Node) => void;
  onAnimationComplete?: () => void;
}

// ❌ 나쁜 예
interface ComponentProps {
  click?: Function;
  submit?: any;
  change?: () => void;
  select?: Function;
}
```

## CSS 클래스 네이밍

### 1. BEM 방법론 또는 Utility-first
- **kebab-case** 사용
- 명확한 의미 전달

```css
/* ✅ 좋은 예: BEM 스타일 */
.mindmap-container { }
.mindmap-container__node { }
.mindmap-container__node--selected { }
.mindmap-container__node--large { }

.sidebar { }
.sidebar__icon { }
.sidebar__tooltip { }
.sidebar--expanded { }

/* ✅ 좋은 예: Utility 스타일 */
.btn-primary { }
.btn-secondary { }
.text-center { }
.flex-center { }
.mt-4 { }
.p-6 { }

/* ❌ 나쁜 예 */
.mindmapContainer { }
.SidebarIcon { }
.btn_primary { }
.text_center { }
```

### 2. CSS 변수
- **kebab-case** 사용
- 용도를 명확히 표현

```css
/* ✅ 좋은 예 */
:root {
  --primary-color: #00d4ff;
  --secondary-color: #8b5cf6;
  --text-primary: #333333;
  --text-secondary: #666666;
  
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  
  --animation-duration-fast: 150ms;
  --animation-duration-normal: 300ms;
  --animation-duration-slow: 500ms;
  
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
}

/* ❌ 나쁜 예 */
:root {
  --primaryColor: #00d4ff;
  --Primary_Color: #00d4ff;
  --primary: #00d4ff;
  --color1: #00d4ff;
}
```

## 타입 정의 네이밍

### 1. 인터페이스
- **PascalCase** 사용
- 명확한 의미 전달

```typescript
// ✅ 좋은 예
interface User {
  id: string;
  name: string;
  email: string;
}

interface MindMapNode {
  id: string;
  title: string;
  position: Position;
  children?: MindMapNode[];
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// ❌ 나쁜 예
interface user {
  id: string;
  name: string;
}

interface node {
  data: any;
}
```

### 2. 타입 별칭
- **PascalCase** 사용
- 유니온 타입은 명확한 의미

```typescript
// ✅ 좋은 예
type Theme = 'light' | 'dark' | 'auto';
type AnimationState = 'idle' | 'running' | 'paused';
type ButtonVariant = 'primary' | 'secondary' | 'outline';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type EventHandler<T = void> = (event: T) => void;
type AsyncFunction<T, R> = (input: T) => Promise<R>;

// ❌ 나쁜 예
type theme = string;
type state = any;
type handler = Function;
```

### 3. 제네릭 타입 파라미터
- **PascalCase** 사용
- 의미 있는 이름

```typescript
// ✅ 좋은 예
interface Repository<TEntity, TKey> {
  findById(id: TKey): TEntity | null;
  save(entity: TEntity): TEntity;
}

interface ApiClient<TRequest, TResponse> {
  request(data: TRequest): Promise<TResponse>;
}

// 간단한 경우
interface Container<T> {
  value: T;
}

// ❌ 나쁜 예
interface Repository<T, U> { }
interface ApiClient<A, B> { }
```

## 라우트 및 URL 네이밍

### 1. 페이지 라우트
- **kebab-case** 사용
- 명확하고 SEO 친화적

```
✅ 좋은 예:
/introduction
/development
/personal-projects
/company-projects
/hobbies
/thoughts

/personal-projects/portfolio-website
/personal-projects/mobile-app

❌ 나쁜 예:
/intro
/dev
/projects
/personalProjects
/company_projects
```

### 2. API 엔드포인트 (참고용)
- **kebab-case** 사용
- RESTful 네이밍

```
✅ 좋은 예:
/api/user-profile
/api/mind-map/nodes
/api/projects/personal
/api/user-preferences

❌ 나쁜 예:
/api/userProfile
/api/mindMapNodes
/api/getProjects
```

## 미디어 파일 네이밍

### 1. 이미지 파일
- **kebab-case** 사용
- 명확한 설명

```
✅ 좋은 예:
profile-photo.jpg
project-screenshot-1.png
mindmap-background.svg
icon-github.svg
logo-company-name.png

❌ 나쁜 예:
IMG_1234.jpg
screenshot.png
bg.svg
icon1.svg
logo.png
```

### 2. 아이콘 파일
- **kebab-case** 사용
- `icon-` 접두사 사용

```
✅ 좋은 예:
icon-home.svg
icon-user.svg
icon-settings.svg
icon-github.svg
icon-linkedin.svg

❌ 나쁜 예:
home.svg
user-icon.svg
settings_icon.svg
github.svg
```

## 환경 변수 네이밍

### 1. 환경 변수
- **SCREAMING_SNAKE_CASE** 사용
- 접두사로 용도 구분

```bash
# ✅ 좋은 예
PUBLIC_SITE_URL=https://example.com
PUBLIC_ENVIRONMENT=production
PRIVATE_API_KEY=secret123
DATABASE_URL=postgres://...
CLOUDFLARE_API_TOKEN=token123

# ❌ 나쁜 예
siteUrl=https://example.com
apiKey=secret123
dbUrl=postgres://...
```

## Git 브랜치 및 커밋 네이밍

### 1. 브랜치명
- **kebab-case** 사용
- 타입/설명 형식

```
✅ 좋은 예:
feature/mindmap-component
bugfix/sidebar-hover-issue
hotfix/critical-loading-bug
chore/update-dependencies
docs/api-documentation

❌ 나쁜 예:
Feature_mindmap
mindmapComponent
fix
update
```

### 2. 커밋 메시지
- 동사원형으로 시작
- 간결하고 명확한 설명

```
✅ 좋은 예:
feat: add mindmap component with interactive nodes
fix: resolve sidebar hover animation glitch
docs: update component documentation
chore: upgrade to Svelte 5 stable
style: apply consistent spacing in mindmap layout

❌ 나쁜 예:
added mindmap
fixed bug
update
changes
wip
```

이러한 네이밍 컨벤션을 일관성 있게 적용하면 코드의 가독성과 유지보수성이 크게 향상됩니다. 