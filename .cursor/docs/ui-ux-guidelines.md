# UI/UX 가이드라인

## 디자인 철학

### 2100년 미래적 스타일
- **컨셉**: 깔끔하고 미니멀한 미래 인터페이스
- **원칙**: "Less is More" - 기능은 복잡하되 인터페이스는 단순하게
- **목표**: 직관적이면서도 혁신적인 사용자 경험

## 컬러 팔레트

### 주요 색상
```css
:root {
  /* Primary Colors */
  --primary-blue: #00d4ff;
  --primary-purple: #8b5cf6;
  --primary-cyan: #06ffa5;
  
  /* Neutral Colors */
  --neutral-900: #0a0a0a;
  --neutral-800: #1a1a1a;
  --neutral-700: #2a2a2a;
  --neutral-600: #404040;
  --neutral-500: #666666;
  --neutral-400: #999999;
  --neutral-300: #cccccc;
  --neutral-200: #e6e6e6;
  --neutral-100: #f5f5f5;
  --neutral-50: #fafafa;
  
  /* Accent Colors */
  --accent-green: #00ff88;
  --accent-orange: #ff6b35;
  --accent-pink: #ff0080;
  --accent-yellow: #ffcc00;
  
  /* Gradient Colors */
  --gradient-primary: linear-gradient(135deg, var(--primary-blue), var(--primary-purple));
  --gradient-accent: linear-gradient(135deg, var(--accent-green), var(--primary-cyan));
  --gradient-warm: linear-gradient(135deg, var(--accent-orange), var(--accent-pink));
}
```

### 브랜치별 색상 매핑
- **소개**: Blue-Purple gradient (#00d4ff → #8b5cf6)
- **개발**: Green-Cyan gradient (#00ff88 → #06ffa5)
- **개인프로젝트**: Orange-Pink gradient (#ff6b35 → #ff0080)
- **회사프로젝트**: Purple-Blue gradient (#8b5cf6 → #00d4ff)
- **취미**: Pink-Yellow gradient (#ff0080 → #ffcc00)
- **잡소리**: Cyan-Green gradient (#06ffa5 → #00ff88)

## 타이포그래피

### 폰트 스택
```css
:root {
  --font-primary: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  --font-display: 'Orbitron', 'Pretendard', sans-serif; /* 미래적 제목용 */
}
```

### 타이포그래피 스케일
```css
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
}
```

### 폰트 사용 규칙
- **헤드라인**: Orbitron (미래적 느낌)
- **본문**: Pretendard (가독성)
- **코드**: JetBrains Mono (개발 관련 섹션)
- **UI 텍스트**: Pretendard

## 스페이싱 시스템

### 간격 단위
```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

## 애니메이션 가이드라인

### 이징 함수
```css
:root {
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### 애니메이션 지속시간
- **빠른 전환**: 150ms (호버, 포커스)
- **보통 전환**: 300ms (모달, 드롭다운)
- **느린 전환**: 500ms (페이지 전환)
- **마인드맵 연결**: 800ms (선 그리기)

### 애니메이션 원칙
1. **성능**: `transform`과 `opacity`만 애니메이션
2. **리듀스 모션**: `prefers-reduced-motion` 존중
3. **의미 있는 동작**: 모든 애니메이션은 목적이 있어야 함
4. **일관성**: 비슷한 요소는 동일한 애니메이션

## 컴포넌트 스타일

### 버튼
```css
.btn {
  /* 기본 미래적 버튼 스타일 */
  background: var(--gradient-primary);
  border: 1px solid transparent;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  padding: var(--space-3) var(--space-6);
  transition: all 0.3s var(--ease-out-quart);
  position: relative;
  overflow: hidden;
}

.btn::before {
  /* 호버 시 글로우 효과 */
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-accent);
  opacity: 0;
  transition: opacity 0.3s var(--ease-out-quart);
}

.btn:hover::before {
  opacity: 0.1;
}
```

### 카드
```css
.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: var(--space-6);
  transition: all 0.3s var(--ease-out-quart);
}

.card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

### 마인드맵 노드
```css
.mindmap-node {
  background: var(--gradient-primary);
  border-radius: 50%;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
  transition: all 0.4s var(--ease-out-expo);
  position: relative;
}

.mindmap-node::before {
  /* 펄스 효과 */
  content: '';
  position: absolute;
  inset: -10px;
  background: inherit;
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.1; }
}
```

## 반응형 디자인

### 브레이크포인트
```css
:root {
  --bp-sm: 640px;   /* 모바일 */
  --bp-md: 768px;   /* 태블릿 */
  --bp-lg: 1024px;  /* 데스크톱 */
  --bp-xl: 1280px;  /* 큰 데스크톱 */
  --bp-2xl: 1536px; /* 매우 큰 화면 */
}
```

### 반응형 규칙
- **모바일 우선**: Mobile-first 설계
- **사이드바**: 모바일에서는 하단 또는 햄버거 메뉴
- **마인드맵**: 작은 화면에서는 세로 스크롤 가능한 목록
- **터치 친화적**: 최소 44px 터치 영역

## 접근성 가이드라인

### 키보드 네비게이션
- **Tab 순서**: 논리적 포커스 순서
- **Skip Links**: 메인 콘텐츠로 바로 가기
- **Focus Visible**: 명확한 포커스 표시

### 색상 접근성
- **대비비**: WCAG AA 기준 4.5:1 이상
- **색각 이상**: 색상만으로 정보 전달 금지
- **다크 모드**: 자동 또는 수동 전환

### 스크린 리더
- **ARIA 레이블**: 적절한 레이블 제공
- **의미론적 HTML**: 올바른 HTML 태그 사용
- **대체 텍스트**: 모든 이미지에 alt 텍스트

## 로딩 및 피드백

### 로딩 상태
```css
.loading-spinner {
  /* 미래적 로딩 스피너 */
  border: 2px solid rgba(0, 212, 255, 0.2);
  border-top: 2px solid var(--primary-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### 에러 상태
- **색상**: 빨간색 대신 주황색 사용 (미래적)
- **아이콘**: 경고 아이콘과 명확한 메시지
- **복구**: 재시도 버튼 제공

### 성공 상태
- **색상**: 그린 계열
- **애니메이션**: 체크마크 그리기 효과
- **지속시간**: 3초 후 자동 사라짐

## 다크 모드

### 다크 모드 팔레트
```css
[data-theme="dark"] {
  --bg-primary: var(--neutral-900);
  --bg-secondary: var(--neutral-800);
  --text-primary: var(--neutral-50);
  --text-secondary: var(--neutral-300);
  --border-primary: var(--neutral-700);
}
```

### 자동 전환
- **시스템 설정**: `prefers-color-scheme` 감지
- **시간대**: 자동 다크/라이트 모드 전환 (선택적)
- **사용자 설정**: 수동 오버라이드 가능 