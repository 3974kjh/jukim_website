# 아키텍처 설계

## 전체 시스템 구조

```
┌─────────────────────────────────────────┐
│                Frontend                 │
│  ┌─────────────┐  ┌─────────────────┐   │
│  │   Sidebar   │  │   Main Content   │   │
│  │  (Global)   │  │   (Routable)     │   │
│  └─────────────┘  └─────────────────┘   │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│            Browser Storage              │
│        (localStorage only)              │
└─────────────────────────────────────────┘
```

## 파일 구조

```
src/
├── routes/
│   ├── +layout.svelte           # 전역 레이아웃 (사이드바 포함)
│   ├── +page.svelte             # 메인 마인드맵 페이지
│   ├── introduction/
│   │   └── +page.svelte         # 소개 페이지
│   ├── development/
│   │   └── +page.svelte         # 개발 여정 페이지
│   ├── personal-projects/
│   │   └── +page.svelte         # 개인 프로젝트 페이지
│   ├── company-projects/
│   │   └── +page.svelte         # 회사 프로젝트 페이지
│   ├── hobbies/
│   │   └── +page.svelte         # 취미 페이지
│   └── thoughts/
│       └── +page.svelte         # 잡소리 페이지
├── lib/
│   ├── components/
│   │   ├── Sidebar.svelte       # 사이드바 컴포넌트
│   │   ├── MindMap.svelte       # 마인드맵 컴포넌트
│   │   ├── Node.svelte          # 마인드맵 노드
│   │   └── BackButton.svelte    # 뒤로가기 버튼
│   ├── stores/
│   │   ├── navigation.svelte.ts # 네비게이션 상태
│   │   └── storage.ts           # localStorage 유틸
│   ├── utils/
│   │   ├── animations.ts        # 애니메이션 헬퍼
│   │   └── mindmap.ts           # 마인드맵 로직
│   └── styles/
│       ├── global.css           # 전역 스타일
│       ├── mindmap.css          # 마인드맵 스타일
│       └── future-theme.css     # 미래적 테마
├── app.html                     # HTML 템플릿
└── app.css                      # 앱 기본 스타일
```

## 컴포넌트 계층 구조

```
+layout.svelte
├── Sidebar.svelte
│   ├── SidebarIcon.svelte
│   └── SidebarTooltip.svelte
└── slot (page content)
    ├── MindMap.svelte (메인 페이지)
    │   ├── CenterNode.svelte
    │   ├── BranchNode.svelte
    │   └── ConnectionLine.svelte
    └── ContentPage.svelte (서브 페이지들)
        ├── BackButton.svelte
        └── PageContent.svelte
```

## 상태 관리

### Svelte 5 Runes 사용
- `$state()`: 컴포넌트 로컬 상태
- `$derived()`: 계산된 값
- `$effect()`: 사이드 이펙트

### 전역 상태
```typescript
// navigation.svelte.ts
export const currentPage = $state({ 
  value: 'home',
  history: ['home'] 
});

export const sidebarState = $state({
  isHovered: false,
  activeTooltip: null
});
```

## 라우팅 전략

SvelteKit의 파일 기반 라우팅을 활용:
- `/` - 메인 마인드맵
- `/introduction` - 소개 페이지
- `/development` - 개발 여정
- `/personal-projects` - 개인 프로젝트
- `/company-projects` - 회사 프로젝트
- `/hobbies` - 취미
- `/thoughts` - 잡소리

## 데이터 저장 방식

Backend가 없으므로 모든 사용자 데이터는 localStorage에 저장:
```typescript
interface UserData {
  visitCount: number;
  lastVisit: string;
  preferences: {
    theme: 'auto' | 'light' | 'dark';
    animations: boolean;
  };
  interactions: {
    clickedNodes: string[];
    timeSpent: Record<string, number>;
  };
}
```

## 성능 최적화

1. **코드 스플리팅**: 각 페이지별 lazy loading
2. **이미지 최적화**: WebP 포맷 활용
3. **애니메이션 최적화**: CSS transforms 활용
4. **번들 최적화**: Tree shaking, 미사용 코드 제거 