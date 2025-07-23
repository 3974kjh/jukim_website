# 기능 명세서

## 1. 사이드바 (Sidebar)

### 1.1 기본 기능
- **위치**: 화면 좌측 고정
- **크기**: 기본 너비 80px
- **표시**: 항상 visible (모든 페이지에서)
- **구현**: `+layout.svelte`에서 전역 컴포넌트로 구현

### 1.2 아이콘 링크
```typescript
interface SidebarLink {
  id: string;
  icon: string; // SVG 또는 이모지
  title: string;
  url: string;
  description: string;
  category: 'social' | 'project' | 'blog' | 'other';
}
```

기본 링크 예시:
- GitHub (개발 프로젝트)
- LinkedIn (프로페셔널)
- 개인 블로그
- 이메일
- 기타 개인 사이트

### 1.3 호버 인터랙션
- **트리거**: 마우스 호버
- **효과**: 
  - 사이드바 너비 확장 (80px → 320px)
  - 오른쪽으로 슬라이드 애니메이션
  - 상세 정보 표시 (제목, 설명, 미리보기)
- **애니메이션**: 0.3초 ease-out transition
- **z-index**: 높은 값으로 메인 콘텐츠 위에 표시

## 2. 마인드맵 메인 화면

### 2.1 중심 노드
- **위치**: 화면 중앙
- **내용**: "나" 또는 개인 아바타
- **크기**: 120px 원형
- **효과**: 펄스 애니메이션, 호버 시 확대

### 2.2 1차 브랜치 (6개)
```typescript
interface MainBranch {
  id: string;
  title: string;
  icon: string;
  color: string;
  angle: number; // 0-360도
  route: string;
  subBranches: SubBranch[];
}
```

분야별 브랜치:
1. **나의 소개 및 일대기** (12시 방향, 0도)
2. **개발 여정** (2시 방향, 60도)
3. **개인프로젝트** (4시 방향, 120도)
4. **회사프로젝트** (6시 방향, 180도)
5. **취미** (8시 방향, 240도)
6. **잡소리** (10시 방향, 300도)

### 2.3 2차 브랜치 (각 1차마다 3-5개)
- **연결**: 1차 브랜치에서 방사형으로 확장
- **크기**: 1차보다 작음 (80px)
- **인터랙션**: 호버 시 상세 정보 툴팁

### 2.4 3차 브랜치 (선택적)
- **연결**: 2차 브랜치에서 추가 확장
- **크기**: 60px
- **용도**: 세부 카테고리나 태그

### 2.5 연결선 (Connection Lines)
- **스타일**: SVG path로 곡선 연결
- **애니메이션**: 그려지는 효과 (draw animation)
- **색상**: 각 브랜치별 고유 색상
- **두께**: 브랜치 레벨에 따라 차등 적용

## 3. 페이지 네비게이션

### 3.1 라우팅 동작
- **트리거**: 1차 브랜치 클릭
- **URL 변경**: `/브랜치명`으로 라우팅
- **애니메이션**: 페이드 아웃 → 페이드 인
- **히스토리**: 브라우저 히스토리 스택 관리

### 3.2 뒤로가기 기능
- **위치**: 상단 좌측 (사이드바 제외 영역)
- **디자인**: 미래적 스타일의 뒤로가기 버튼
- **동작**: 
  - 이전 페이지로 복귀
  - 메인 화면으로 돌아가기
  - 브라우저 뒤로가기 버튼과 연동

### 3.3 브레드크럼
```typescript
interface Breadcrumb {
  title: string;
  route: string;
  isActive: boolean;
}
```

## 4. 개별 콘텐츠 페이지

### 4.1 공통 레이아웃
- **헤더**: 페이지 제목, 뒤로가기 버튼
- **내비게이션**: 해당 섹션 내 서브 페이지들
- **콘텐츠**: 스크롤 가능한 메인 영역
- **사이드바**: 계속 표시

### 4.2 콘텐츠 구조
각 페이지별 고유 레이아웃:

#### 나의 소개 및 일대기
- 타임라인 형태
- 프로필 사진 및 기본 정보
- 경력/학력 연대기

#### 개발 여정
- 기술 스택 시각화
- 언어별 숙련도 차트
- 학습 히스토리

#### 개인/회사 프로젝트
- 카드 그리드 레이아웃
- 프로젝트별 상세 모달
- 기술 스택 태그

#### 취미/잡소리
- 블로그 포스트 형태
- 갤러리 뷰 (이미지 있는 경우)
- 카테고리별 필터링

## 5. 인터랙티브 요소

### 5.1 마우스 상호작용
- **호버 효과**: 모든 클릭 가능 요소
- **클릭 피드백**: 리플 효과 또는 펄스
- **드래그**: 마인드맵 캔버스 이동 (선택적)

### 5.2 키보드 네비게이션
- **Tab**: 포커스 이동
- **Enter/Space**: 활성화
- **Escape**: 뒤로가기
- **화살표**: 마인드맵 노드 간 이동

### 5.3 터치 지원
- **탭**: 클릭과 동일
- **핀치**: 줌 인/아웃 (마인드맵)
- **스와이프**: 페이지 전환

## 6. 데이터 관리

### 6.1 사용자 설정
```typescript
interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  animations: boolean;
  language: 'ko' | 'en';
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
  };
}
```

### 6.2 분석 데이터
```typescript
interface AnalyticsData {
  pageViews: Record<string, number>;
  sessionDuration: number;
  clickHeatmap: { x: number; y: number; count: number }[];
  popularSections: string[];
}
```

### 6.3 콘텐츠 데이터
- JSON 파일로 관리
- 타입 안전성을 위한 TypeScript 인터페이스
- 다국어 지원 구조 (i18n) 