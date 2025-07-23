# 파일 구조 및 조직

## 프로젝트 전체 구조

```
jukim_website/
├── .cursor/                    # 개발 환경 설정
│   ├── docs/                   # 프로젝트 문서
│   └── rules/                  # 개발 규칙
├── src/                        # 소스 코드
│   ├── app.html               # HTML 템플릿
│   ├── app.css                # 전역 스타일
│   ├── routes/                # 페이지 라우트
│   └── lib/                   # 라이브러리 코드
├── static/                     # 정적 파일
├── build/                      # 빌드 결과 (gitignore)
├── node_modules/              # 의존성 (gitignore)
├── .svelte-kit/              # SvelteKit 캐시 (gitignore)
├── package.json              # 프로젝트 메타데이터
├── svelte.config.js          # SvelteKit 설정
├── vite.config.ts           # Vite 설정
├── tsconfig.json            # TypeScript 설정
├── .gitignore               # Git 무시 파일
└── README.md                # 프로젝트 설명
```

## src/routes 구조

```
src/routes/
├── +layout.svelte             # 전역 레이아웃 (사이드바 포함)
├── +layout.ts                 # 전역 레이아웃 설정
├── +page.svelte              # 메인 페이지 (마인드맵)
├── +page.ts                  # 메인 페이지 설정
├── introduction/             # 소개 페이지
│   ├── +page.svelte
│   └── +page.ts
├── development/              # 개발 여정 페이지
│   ├── +page.svelte
│   ├── +page.ts
│   └── components/           # 페이지별 컴포넌트
│       ├── SkillChart.svelte
│       └── TechTimeline.svelte
├── personal-projects/        # 개인 프로젝트 페이지
│   ├── +page.svelte
│   ├── +page.ts
│   └── [slug]/              # 동적 라우트
│       ├── +page.svelte
│       └── +page.ts
├── company-projects/         # 회사 프로젝트 페이지
│   ├── +page.svelte
│   └── +page.ts
├── hobbies/                  # 취미 페이지
│   ├── +page.svelte
│   └── +page.ts
└── thoughts/                 # 잡소리 페이지
    ├── +page.svelte
    └── +page.ts
```

## src/lib 구조

```
src/lib/
├── components/               # 재사용 가능한 컴포넌트
│   ├── ui/                  # 기본 UI 컴포넌트
│   │   ├── Button.svelte
│   │   ├── Modal.svelte
│   │   ├── Card.svelte
│   │   └── LoadingSpinner.svelte
│   ├── layout/              # 레이아웃 컴포넌트
│   │   ├── Sidebar.svelte
│   │   ├── BackButton.svelte
│   │   └── Navigation.svelte
│   ├── mindmap/             # 마인드맵 관련 컴포넌트
│   │   ├── MindMap.svelte
│   │   ├── CenterNode.svelte
│   │   ├── BranchNode.svelte
│   │   ├── ConnectionLine.svelte
│   │   └── NodeTooltip.svelte
│   └── forms/               # 폼 관련 컴포넌트
│       ├── Input.svelte
│       ├── Select.svelte
│       └── Textarea.svelte
├── stores/                  # 전역 상태 관리
│   ├── navigation.svelte.ts
│   ├── theme.svelte.ts
│   ├── user.svelte.ts
│   └── mindmap.svelte.ts
├── utils/                   # 유틸리티 함수
│   ├── animations.ts
│   ├── mindmap.ts
│   ├── storage.ts
│   ├── date.ts
│   └── performance.ts
├── types/                   # TypeScript 타입 정의
│   ├── index.ts
│   ├── mindmap.ts
│   ├── user.ts
│   └── api.ts
├── data/                    # 정적 데이터
│   ├── content/
│   │   ├── introduction.json
│   │   ├── projects.json
│   │   └── skills.json
│   └── config/
│       ├── site.json
│       └── navigation.json
├── styles/                  # 공용 스타일
│   ├── global.css
│   ├── variables.css
│   ├── components.css
│   ├── mindmap.css
│   └── themes/
│       ├── light.css
│       └── dark.css
└── assets/                  # 에셋 파일들
    ├── icons/
    ├── images/
    └── fonts/
```

## static 폴더 구조

```
static/
├── favicon.ico              # 파비콘
├── favicon.png             # PNG 파비콘
├── robots.txt              # 로봇 크롤링 설정
├── sitemap.xml             # 사이트맵
├── _redirects              # Cloudflare 리다이렉트 규칙
├── _headers                # Cloudflare 헤더 설정
├── images/                 # 이미지 파일
│   ├── profile/
│   ├── projects/
│   └── icons/
├── documents/              # 다운로드 가능한 문서
│   └── resume.pdf
└── manifest.json           # PWA 매니페스트
```

## 파일 네이밍 컨벤션

### 1. 컴포넌트 파일
- **PascalCase**: `MindMap.svelte`, `SidebarIcon.svelte`
- **명확한 이름**: `BackButton.svelte` (❌ `Btn.svelte`)
- **컴포넌트 폴더**: 복잡한 컴포넌트는 폴더로 분리

```
components/
├── MindMap/
│   ├── MindMap.svelte       # 메인 컴포넌트
│   ├── Node.svelte          # 서브 컴포넌트
│   ├── Connection.svelte    # 서브 컴포넌트
│   └── index.ts            # 재수출
```

### 2. 유틸리티 파일
- **camelCase**: `animationHelpers.ts`, `storageUtils.ts`
- **기능별 분류**: `mindmap.ts`, `date.ts`, `api.ts`

### 3. 라우트 파일
- **kebab-case**: `personal-projects/`, `company-projects/`
- **SvelteKit 컨벤션**: `+page.svelte`, `+layout.svelte`

### 4. 스타일 파일
- **kebab-case**: `mindmap.css`, `future-theme.css`
- **용도별 분류**: `variables.css`, `components.css`

## 임포트 경로 규칙

### 1. 절대 경로 사용
```typescript
// ✅ 좋은 예: $lib alias 사용
import { MindMap } from '$lib/components/mindmap';
import { navigationState } from '$lib/stores/navigation.svelte.js';
import type { User } from '$lib/types';

// ❌ 나쁜 예: 상대 경로
import { MindMap } from '../../../lib/components/mindmap';
```

### 2. 임포트 순서
```typescript
// 1. 외부 라이브러리
import { goto } from '$app/navigation';
import { onMount } from 'svelte';

// 2. 타입 임포트
import type { MindMapNode, User } from '$lib/types';

// 3. 유틸리티 및 스토어
import { navigationState } from '$lib/stores/navigation.svelte.js';
import { calculatePosition } from '$lib/utils/mindmap.js';

// 4. 컴포넌트
import Button from '$lib/components/ui/Button.svelte';
import MindMap from '$lib/components/mindmap/MindMap.svelte';
```

### 3. 재수출 파일 활용
```typescript
// lib/components/index.ts
export { default as Button } from './ui/Button.svelte';
export { default as Modal } from './ui/Modal.svelte';
export { default as MindMap } from './mindmap/MindMap.svelte';

// 사용하는 곳에서
import { Button, Modal, MindMap } from '$lib/components';
```

## 코드 분할 전략

### 1. 페이지별 분할
```typescript
// 각 라우트는 자동으로 코드 스플리팅됨
// +page.svelte 파일들은 별도 청크로 분할

// 동적 임포트 사용
const HeavyComponent = await import('./HeavyComponent.svelte');
```

### 2. 컴포넌트 레이지 로딩
```svelte
<script>
  import { onMount } from 'svelte';
  
  let ComponentToLoad: any = null;
  
  onMount(async () => {
    const module = await import('./ExpensiveComponent.svelte');
    ComponentToLoad = module.default;
  });
</script>

{#if ComponentToLoad}
  <svelte:component this={ComponentToLoad} />
{/if}
```

### 3. 라이브러리 청크 분할
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 벤더 라이브러리 분리
          vendor: ['svelte'],
          // 유틸리티 분리
          utils: ['$lib/utils/animations', '$lib/utils/mindmap'],
          // UI 컴포넌트 분리
          ui: ['$lib/components/ui/Button.svelte', '$lib/components/ui/Modal.svelte']
        }
      }
    }
  }
});
```

## 환경별 설정 파일

### 1. 개발/프로덕션 분리
```
src/lib/config/
├── index.ts                 # 공통 설정
├── development.ts           # 개발 환경
├── production.ts            # 프로덕션 환경
└── types.ts                # 설정 타입
```

### 2. 환경 설정 예시
```typescript
// lib/config/index.ts
import type { Config } from './types.js';

const isDev = import.meta.env.DEV;

export const config: Config = {
  siteUrl: import.meta.env.PUBLIC_SITE_URL || 'http://localhost:5173',
  environment: import.meta.env.PUBLIC_ENVIRONMENT || 'development',
  features: {
    analytics: !isDev,
    debugMode: isDev,
    animations: true
  }
};
```

## 테스트 파일 구조

```
src/
├── lib/
│   ├── components/
│   │   ├── Button.svelte
│   │   └── Button.test.ts      # 컴포넌트 테스트
│   ├── utils/
│   │   ├── mindmap.ts
│   │   └── mindmap.test.ts     # 유틸 함수 테스트
│   └── stores/
│       ├── navigation.svelte.ts
│       └── navigation.test.ts  # 스토어 테스트
└── tests/                      # 통합 테스트
    ├── e2e/                   # E2E 테스트
    └── integration/           # 통합 테스트
```

## 문서 파일 구조

```
.cursor/
├── docs/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── feature-specifications.md
│   ├── ui-ux-guidelines.md
│   └── deployment.md
├── rules/
│   ├── coding-standards.md
│   ├── svelte-conventions.md
│   ├── file-organization.md    # 이 파일
│   └── naming-conventions.md
└── README.md                   # 프로젝트 루트 설명
```

## 빌드 및 배포 파일

```
/
├── .github/                   # GitHub Actions
│   └── workflows/
│       └── deploy.yml
├── scripts/                   # 빌드 스크립트
│   ├── post-build.js
│   └── pre-deploy.js
├── .env.example              # 환경 변수 예시
├── .env.local               # 로컬 환경 변수 (gitignore)
└── .cloudflare/             # Cloudflare 설정
    └── pages.yml
```

## 폴더별 용도 요약

| 폴더 | 용도 | 파일 예시 |
|------|------|----------|
| `src/routes/` | 페이지 라우팅 | `+page.svelte`, `+layout.svelte` |
| `src/lib/components/` | 재사용 컴포넌트 | `Button.svelte`, `Modal.svelte` |
| `src/lib/stores/` | 전역 상태 | `navigation.svelte.ts` |
| `src/lib/utils/` | 유틸리티 함수 | `animations.ts`, `storage.ts` |
| `src/lib/types/` | TypeScript 타입 | `index.ts`, `api.ts` |
| `src/lib/data/` | 정적 데이터 | `content.json`, `config.json` |
| `src/lib/styles/` | 공용 스타일 | `global.css`, `variables.css` |
| `static/` | 정적 에셋 | 이미지, 폰트, 아이콘 |
| `.cursor/` | 개발 문서 | 프로젝트 문서, 규칙 | 