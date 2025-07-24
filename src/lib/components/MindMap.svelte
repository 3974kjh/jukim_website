<script lang="ts">
  import type { MindMapNode, MainBranch, MindMapState } from '$lib/types/mindmap';
  import { navigationState, navigateTo } from '$lib/stores/navigation.svelte';
  import { analytics, mindmapState } from '$lib/utils/storage';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  interface Props {
    class?: string;
  }
  
  let { class: className = '' }: Props = $props();
  
  // 마인드맵 상태
  let selectedNode = $state<string | null>(null);
  let hoveredNode = $state<string | null>(null);
  let allNodesHovered = $state<boolean>(false); // 중심 노드 호버 시 모든 노드 호버 상태
  let isAnimating = $state(false);
  let containerRef = $state<HTMLDivElement>();
  let pulsePhase = $state(0);
  
  // 호버 딜레이 관리
  let hoverTimeout = $state<number | null>(null);
  let leaveTimeout = $state<number | null>(null);
  let centerHoverTimeout = $state<number | null>(null);
  let centerLeaveTimeout = $state<number | null>(null);
  
  // SVG 아이콘 컴포넌트들 (Icons8 스타일)
  const IconHand = `<path fill="currentColor" d="M21 7a1 1 0 0 0-1 1v4.1a5 5 0 0 0-1.1-.1 4.988 4.988 0 0 0-3.9 1.9V9a1 1 0 0 0-2 0v7c0 .34-.04.67-.1 1H7a1 1 0 0 1-1-1V8a1 1 0 0 0-2 0v8a3 3 0 0 0 3 3h6.18A5 5 0 0 0 19 22a5 5 0 0 0 5-5v-9a1 1 0 0 0-1-1z M5 6a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm14 0a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm6 11a3 3 0 1 1-3 3 3 3 0 0 1 3-3z"/>`;
  
  const IconComputer = `<path fill="currentColor" d="M20 3H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h5.5l-.5 2h-2a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-2l-.5-2H20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 16V5h16v11z"/>`;
  
  const IconRocket = `<path fill="currentColor" d="M20.92 2.38A1 1 0 0 0 20.48 2L17.09 2A4.4 4.4 0 0 0 14.43 3.18L12 5.64L9.57 3.18A4.4 4.4 0 0 0 6.91 2H3.52a1 1 0 0 0-.44.38 1 1 0 0 0-.08.92L6.74 12 3 20.7a1 1 0 0 0 .08.92 1 1 0 0 0 .44.38L6.91 22a4.4 4.4 0 0 0 2.66-1.18L12 18.36l2.43 2.46A4.4 4.4 0 0 0 17.09 22h3.39a1 1 0 0 0 .44-.38 1 1 0 0 0 .08-.92L17.26 12 21 3.3a1 1 0 0 0-.08-.92zM8.56 19.2a2.4 2.4 0 0 1-1.44.64L4.8 19.2l2.9-7.07L10.34 15zM12 15.86L8.14 12 12 8.14 15.86 12zm7.2 3.34a2.4 2.4 0 0 1-1.44-.64L15.66 15l2.64-2.87z"/>`;
  
  const IconBuilding = `<path fill="currentColor" d="M14 8h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm0 5h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1zM9 8h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm0 5h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1zM6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6z"/>`;
  
  const IconTarget = `<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>`;
  
  const IconThought = `<path fill="currentColor" d="M18 4H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5L12 19.5 15.5 16H18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6 6h12v8H15l-3 3-3-3H6V6zm2 2v2h2V8H8zm3 0v2h2V8h-2zm3 0v2h2V8h-2z"/>`;
  
  const IconStar = `<path fill="currentColor" d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4L12 17l-6.3 4.4L8 14 2 9.4h7.6L12 2z"/>`;
  
  const IconMail = `<path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM4 6h16l-8 6L4 6zm0 12V8.37l7.5 5.63L20 8.37V18H4z"/>`;
  
  const IconGithub = `<path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>`;
  
  const IconLinkedIn = `<path fill="currentColor" d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>`;
  
  const IconCalendar = `<path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>`;
  
  // Icons8 스타일의 추가 아이콘들
  const IconProfile = `<path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>`;
  
  const IconCode = `<path fill="currentColor" d="m8.7 15.9-4.6-4.6c-.4-.4-.4-1 0-1.4l4.6-4.6c.4-.4 1-.4 1.4 0s.4 1 0 1.4L5.8 11l4.3 4.3c.4.4.4 1 0 1.4-.2.2-.5.3-.7.3s-.5-.1-.7-.1zm6.6 0c-.4.4-1 .4-1.4 0s-.4-1 0-1.4L18.2 11l-4.3-4.3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.6 4.6c.4.4.4 1 0 1.4l-4.6 4.6z"/>`;
  
  const IconBrain = `<path fill="currentColor" d="M19.74 15.85c-.13-1.26-.65-2.44-1.48-3.37.47-1.04.74-2.19.74-3.48 0-4.41-3.59-8-8-8s-8 3.59-8 8c0 1.29.27 2.44.74 3.48-.83.93-1.35 2.11-1.48 3.37-.15 1.37.27 2.71 1.18 3.77.92 1.07 2.21 1.66 3.6 1.66.28 0 .56-.03.84-.08.27.05.55.08.84.08h.02c.29 0 .57-.03.84-.08.28.05.56.08.84.08 1.39 0 2.68-.59 3.6-1.66.91-1.06 1.33-2.4 1.18-3.77z"/>`;
  
  const IconLightbulb = `<path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1zM9 21h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1s.45 1 1 1z"/>`;
  
  const IconWorkspace = `<path fill="currentColor" d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5z"/>`;
  
  const IconHeart = `<path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>`;
  
  // 마인드맵 데이터 (크기와 위치 대폭 확장)
  const mindMapData: MindMapState = {
    centerNode: {
      id: 'center',
      title: '나',
      level: 0,
      position: { x: 0, y: 0 },
      angle: 0,
      radius: 0,
      color: 'var(--color-accent-primary)',
      isVisible: true,
      isSelected: false,
      isHovered: false
    },
    mainBranches: [
      {
        id: 'introduction',
        title: '나의 소개 및 일대기',
        description: '개인정보, 학력, 경력',
        level: 1,
        position: { x: -520, y: -380 },
        angle: Math.PI * 1.25,
        radius: 640,
        color: '#FF6B6B',
        category: 'introduction',
        route: '/introduction',
        icon: IconProfile,
        isVisible: true,
        isSelected: false,
        isHovered: false,
        gradient: { from: '#FF6B6B', to: '#FFE66D' },
        children: [
          { 
            id: 'personal-info', 
            title: '개인정보', 
            level: 2, 
            position: { x: -750, y: -520 },
            angle: Math.PI * 1.3,
            radius: 900,
            color: '#FF6B6B',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'introduction'
          },
          { 
            id: 'education', 
            title: '학력', 
            level: 2, 
            position: { x: -680, y: -280 },
            angle: Math.PI * 1.2,
            radius: 820,
            color: '#FF6B6B',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'introduction'
          },
          { 
            id: 'career', 
            title: '경력', 
            level: 2, 
            position: { x: -620, y: -580 },
            angle: Math.PI * 1.35,
            radius: 860,
            color: '#FF6B6B',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'introduction'
          }
        ]
      },
      {
        id: 'development',
        title: '개발 여정',
        description: '언어, 기술스택, 학습과정',
        level: 1,
        position: { x: 520, y: -380 },
        angle: Math.PI * 0.25,
        radius: 640,
        color: '#4ECDC4',
        category: 'development',
        route: '/development',
        icon: IconCode,
        isVisible: true,
        isSelected: false,
        isHovered: false,
        gradient: { from: '#4ECDC4', to: '#44A08D' },
        children: [
          { 
            id: 'languages', 
            title: '언어별 경험', 
            level: 2, 
            position: { x: 750, y: -520 },
            angle: Math.PI * 0.2,
            radius: 900,
            color: '#4ECDC4',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'development'
          },
          { 
            id: 'tech-stack', 
            title: '기술 스택', 
            level: 2, 
            position: { x: 680, y: -280 },
            angle: Math.PI * 0.3,
            radius: 820,
            color: '#4ECDC4',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'development'
          },
          { 
            id: 'learning', 
            title: '학습 과정', 
            level: 2, 
            position: { x: 620, y: -580 },
            angle: Math.PI * 0.15,
            radius: 860,
            color: '#4ECDC4',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'development'
          }
        ]
      },
      {
        id: 'personal-projects',
        title: '개인프로젝트',
        description: '웹, 모바일, 기타 프로젝트',
        level: 1,
        position: { x: -520, y: 380 },
        angle: Math.PI * 0.75,
        radius: 640,
        color: '#A8E6CF',
        category: 'personal-projects',
        route: '/personal-projects',
        icon: IconLightbulb,
        isVisible: true,
        isSelected: false,
        isHovered: false,
        gradient: { from: '#A8E6CF', to: '#88D8A3' },
        children: [
          { 
            id: 'web-projects', 
            title: '웹 프로젝트', 
            level: 2, 
            position: { x: -750, y: 280 },
            angle: Math.PI * 0.8,
            radius: 900,
            color: '#A8E6CF',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'personal-projects'
          },
          { 
            id: 'mobile-apps', 
            title: '모바일 앱', 
            level: 2, 
            position: { x: -680, y: 520 },
            angle: Math.PI * 0.7,
            radius: 820,
            color: '#A8E6CF',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'personal-projects'
          },
          { 
            id: 'other-projects', 
            title: '기타 프로젝트', 
            level: 2, 
            position: { x: -620, y: 580 },
            angle: Math.PI * 0.85,
            radius: 860,
            color: '#A8E6CF',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'personal-projects'
          }
        ]
      },
      {
        id: 'company-projects',
        title: '회사프로젝트',
        description: '현재/이전 회사, 주요 성과',
        level: 1,
        position: { x: 520, y: 380 },
        angle: Math.PI * 1.75,
        radius: 640,
        color: '#FFB6C1',
        category: 'company-projects',
        route: '/company-projects',
        icon: IconWorkspace,
        isVisible: true,
        isSelected: false,
        isHovered: false,
        gradient: { from: '#FFB6C1', to: '#FFA0B9' },
        children: [
          { 
            id: 'current-company', 
            title: '현재 회사', 
            level: 2, 
            position: { x: 750, y: 280 },
            angle: Math.PI * 1.8,
            radius: 900,
            color: '#FFB6C1',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'company-projects'
          },
          { 
            id: 'previous-companies', 
            title: '이전 회사', 
            level: 2, 
            position: { x: 680, y: 520 },
            angle: Math.PI * 1.7,
            radius: 820,
            color: '#FFB6C1',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'company-projects'
          },
          { 
            id: 'achievements', 
            title: '주요 성과', 
            level: 2, 
            position: { x: 620, y: 580 },
            angle: Math.PI * 1.85,
            radius: 860,
            color: '#FFB6C1',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'company-projects'
          }
        ]
      },
      {
        id: 'hobbies',
        title: '취미',
        description: '관심사, 스포츠, 경험',
        level: 1,
        position: { x: 0, y: -580 },
        angle: Math.PI * 1.5,
        radius: 580,
        color: '#DDA0DD',
        category: 'hobbies',
        route: '/hobbies',
        icon: IconHeart,
        isVisible: true,
        isSelected: false,
        isHovered: false,
        gradient: { from: '#DDA0DD', to: '#DA70D6' },
        children: [
          { 
            id: 'interests', 
            title: '개발 외 관심사', 
            level: 2, 
            position: { x: -180, y: -780 },
            angle: Math.PI * 1.45,
            radius: 820,
            color: '#DDA0DD',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'hobbies'
          },
          { 
            id: 'sports', 
            title: '스포츠/활동', 
            level: 2, 
            position: { x: 0, y: -850 },
            angle: Math.PI * 1.5,
            radius: 900,
            color: '#DDA0DD',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'hobbies'
          },
          { 
            id: 'travel', 
            title: '여행/경험', 
            level: 2, 
            position: { x: 180, y: -780 },
            angle: Math.PI * 1.55,
            radius: 820,
            color: '#DDA0DD',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'hobbies'
          }
        ]
      },
      {
        id: 'thoughts',
        title: '잡소리',
        description: '개발철학, 생각정리, 기타',
        level: 1,
        position: { x: 0, y: 580 },
        angle: Math.PI * 0.5,
        radius: 580,
        color: '#87CEEB',
        category: 'thoughts',
        route: '/thoughts',
        icon: IconBrain,
        isVisible: true,
        isSelected: false,
        isHovered: false,
        gradient: { from: '#87CEEB', to: '#4682B4' },
        children: [
          { 
            id: 'philosophy', 
            title: '개발 철학', 
            level: 2, 
            position: { x: -180, y: 780 },
            angle: Math.PI * 0.55,
            radius: 820,
            color: '#87CEEB',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'thoughts'
          },
          { 
            id: 'reflections', 
            title: '생각 정리', 
            level: 2, 
            position: { x: 0, y: 850 },
            angle: Math.PI * 0.5,
            radius: 900,
            color: '#87CEEB',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'thoughts'
          },
          { 
            id: 'misc', 
            title: '기타 이야기', 
            level: 2, 
            position: { x: 180, y: 780 },
            angle: Math.PI * 0.45,
            radius: 820,
            color: '#87CEEB',
            isVisible: false,
            isSelected: false,
            isHovered: false,
            parent: 'thoughts'
          }
        ]
      }
    ],
    allNodes: [],
    connections: [],
    selectedNodeId: null,
    hoveredNodeId: null,
    animationState: 'idle',
    canvasSize: { width: 2400, height: 2400 },
    zoom: 1,
    pan: { x: 0, y: 0 }
  };
  
  // 노드 클릭 핸들러
  function handleNodeClick(node: MainBranch) {
    if (node.route) {
      // 분석 데이터 기록
      analytics.trackPageView(node.id);
      analytics.addClickHeatmap(
        node.position.x + (containerRef?.offsetWidth ?? 0) / 2,
        node.position.y + (containerRef?.offsetHeight ?? 0) / 2
      );
      
      // 마인드맵 상태 저장
      mindmapState.update({
        selectedNode: node.id,
        lastVisited: node.id
      });
      
      // 페이지 네비게이션 - 즉시 실행
      selectedNode = node.id;
      navigateTo(node.id);
    }
  }
  
  // 중심 노드 호버 핸들러
  function handleCenterHover(isEntering: boolean = true) {
    // 이전 타이머들 클리어
    if (centerHoverTimeout) {
      clearTimeout(centerHoverTimeout);
      centerHoverTimeout = null;
    }
    if (centerLeaveTimeout) {
      clearTimeout(centerLeaveTimeout);
      centerLeaveTimeout = null;
    }
    
    if (isEntering) {
      // 호버 진입 시 빠른 반응
      centerHoverTimeout = setTimeout(() => {
        allNodesHovered = true;
        hoveredNode = null; // 개별 노드 호버 상태 초기화
      }, 75);
    } else {
      // 호버 이탈 시 적당한 딜레이 (하이스테리시스)
      centerLeaveTimeout = setTimeout(() => {
        // 현재 다른 노드가 호버 중이면 allNodesHovered를 false로 설정하지 않음
        if (!hoveredNode) {
          allNodesHovered = false;
        }
      }, 200);
    }
  }
  
  // 개선된 노드 호버 핸들러 (진동 방지)
  function handleNodeHover(nodeId: string | null, isEntering: boolean = true) {
    // 이전 타이머들 클리어
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }
    
    if (isEntering && nodeId) {
      // 호버 진입 시 빠른 반응
      hoverTimeout = setTimeout(() => {
        hoveredNode = nodeId;
        // 개별 노드가 호버되면 중심 노드의 전체 호버 상태 해제
        if (allNodesHovered) {
          allNodesHovered = false;
          // 중심 노드의 leave timeout도 클리어
          if (centerLeaveTimeout) {
            clearTimeout(centerLeaveTimeout);
            centerLeaveTimeout = null;
          }
        }
      }, 50);
    } else {
      // 호버 이탈 시 적당한 딜레이 (하이스테리시스)
      leaveTimeout = setTimeout(() => {
        hoveredNode = null;
      }, 150);
    }
  }
  
  // 중심 노드 클릭 핸들러
  function handleCenterClick() {
    selectedNode = selectedNode ? null : 'center';
  }
  
  // 키보드 이벤트 핸들러
  function handleKeydown(event: KeyboardEvent, action: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }
  
  // 연결선 생성
  function getConnectionPath(from: { x: number; y: number }, to: { x: number; y: number }): string {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const offsetX = (to.y - from.y) * 0.2;
    const offsetY = (from.x - to.x) * 0.2;
    
    return `M ${from.x} ${from.y} Q ${midX + offsetX} ${midY + offsetY} ${to.x} ${to.y}`;
  }
  
  // 노드가 활성화되었는지 확인 (중심 노드 호버 시 모든 노드 활성화)
  function isNodeActive(nodeId: string): boolean {
    return allNodesHovered || selectedNode === nodeId || hoveredNode === nodeId;
  }
  
  // 펄스 애니메이션
  function updatePulse() {
    pulsePhase += 0.02;
    if (pulsePhase > Math.PI * 2) pulsePhase = 0;
  }
  
  // 마운트 시 상태 복원
  onMount(() => {
    if (browser) {
      // 저장된 상태 복원 제거 - 항상 기본 상태로 시작
      // const saved = mindmapState.get();
      // if (saved.selectedNode) {
      //   selectedNode = saved.selectedNode;
      // }
      
      // 펄스 애니메이션 시작
      const pulseInterval = setInterval(updatePulse, 16);
      
      return () => {
        clearInterval(pulseInterval);
        if (hoverTimeout) clearTimeout(hoverTimeout);
        if (leaveTimeout) clearTimeout(leaveTimeout);
        if (centerHoverTimeout) clearTimeout(centerHoverTimeout);
        if (centerLeaveTimeout) clearTimeout(centerLeaveTimeout);
      };
    }
  });
</script>

<div 
  class="mindmap-container {className}"
  class:animating={isAnimating}
  bind:this={containerRef}
>
  <!-- 우주 배경 효과들 -->
  <div class="particles-bg">
    <!-- 반짝이는 별들 -->
    {#each Array(100) as _, i}
      <div class="star" style="
        left: {Math.random() * 100}%;
        top: {Math.random() * 100}%;
        width: {1 + Math.random() * 3}px;
        height: {1 + Math.random() * 3}px;
        animation-delay: {Math.random() * 5}s;
        animation-duration: {2 + Math.random() * 4}s;
      "></div>
    {/each}
    
    <!-- 별똥별 효과 -->
    {#each Array(8) as _, i}
      <div class="meteor" style="
        left: {Math.random() * 50}%;
        top: {Math.random() * 50}%;
        animation-delay: {0}s;
        animation-duration: {2 + Math.random() * 3}s;
      "></div>
    {/each}
    
    <!-- 운석 효과 -->
    {#each Array(12) as _, i}
      <div class="asteroid" style="
        left: {80 + Math.random() * 20}%;
        top: {Math.random() * 30}%;
        animation-delay: {0}s;
        animation-duration: {4 + Math.random() * 6}s;
      "></div>
    {/each}
    
    <!-- 성운 효과 -->
    {#each Array(6) as _, i}
      <div class="nebula" style="
        left: {10 + Math.random() * 80}%;
        top: {10 + Math.random() * 80}%;
        width: {150 + Math.random() * 200}px;
        height: {150 + Math.random() * 200}px;
        animation-delay: {0}s;
        animation-duration: {15 + Math.random() * 10}s;
        background: radial-gradient(circle, {['rgba(147, 51, 234, 0.1)', 'rgba(59, 130, 246, 0.1)', 'rgba(236, 72, 153, 0.1)', 'rgba(168, 85, 247, 0.1)', 'rgba(34, 197, 94, 0.1)', 'rgba(251, 146, 60, 0.1)'][Math.floor(Math.random() * 6)]} 0%, transparent 70%);
      "></div>
    {/each}
    
    <!-- 원거리 별 클러스터 -->
    {#each Array(20) as _, i}
      <div class="glow-orb" style="
        left: {10 + Math.random() * 80}%;
        top: {10 + Math.random() * 80}%;
        width: {80 + Math.random() * 120}px;
        height: {80 + Math.random() * 120}px;
        animation-delay: {0}s;
        animation-duration: {20 + Math.random() * 10}s;
        background: radial-gradient(circle, {['rgba(255, 255, 255, 0.05)', 'rgba(79, 195, 247, 0.08)', 'rgba(255, 193, 7, 0.06)', 'rgba(156, 39, 176, 0.07)', 'rgba(244, 67, 54, 0.05)', 'rgba(76, 175, 80, 0.06)'][Math.floor(Math.random() * 6)]} 0%, transparent 70%);
      "></div>
    {/each}
    
    <!-- 우주왕복선들 -->
    {#each Array(2) as _, i}
      <div class="space-shuttle" style="
        left: {20 + i * 60}%;
        top: {30 + i * 40}%;
        animation-delay: {0}s;
        animation-duration: {45 + i * 15}s;
      ">
        <svg width="40" height="20" viewBox="0 0 40 20">
          <!-- 셔틀 본체 -->
          <ellipse cx="25" cy="10" rx="8" ry="3" fill="#E0E0E0"/>
          <!-- 셔틀 날개 -->
          <polygon points="17,7 10,5 10,15 17,13" fill="#B0B0B0"/>
          <!-- 셔틀 꼬리 -->
          <polygon points="10,8 3,6 3,14 10,12" fill="#909090"/>
          <!-- 조종실 (앞쪽) -->
          <ellipse cx="33" cy="10" rx="4" ry="2" fill="#4FC3F7" opacity="0.8"/>
          <!-- 추진기 불꽃 (뒤쪽) -->
          <ellipse cx="3" cy="10" rx="8" ry="2" fill="#FF6B35" opacity="0.7">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="0.5s" repeatCount="indefinite"/>
            <animate attributeName="rx" values="6;10;6" dur="0.8s" repeatCount="indefinite"/>
          </ellipse>
          <!-- 추가 추진기 -->
          <ellipse cx="1" cy="10" rx="4" ry="1" fill="#FFD700" opacity="0.8">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.3s" repeatCount="indefinite"/>
          </ellipse>
        </svg>
      </div>
    {/each}
    
    <!-- UFO들 -->
    {#each Array(3) as _, i}
      <div class="ufo" style="
        left: {10 + i * 30}%;
        top: {20 + i * 25}%;
        animation-delay: {0}s;
        animation-duration: {25 + i * 10}s;
      ">
        <svg width="35" height="15" viewBox="0 0 35 15">
          <!-- UFO 돔 -->
          <ellipse cx="17.5" cy="6" rx="8" ry="4" fill="rgba(200, 200, 255, 0.6)"/>
          <!-- UFO 본체 -->
          <ellipse cx="17.5" cy="9" rx="15" ry="4" fill="#C0C0C0"/>
          <!-- 조명들 -->
          <circle cx="8" cy="9" r="1.5" fill="#FF4081">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="17.5" cy="9" r="1.5" fill="#4CAF50">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="27" cy="9" r="1.5" fill="#2196F3">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite"/>
          </circle>
          <!-- 견인 빔 -->
          <polygon points="12,13 23,13 20,25 15,25" fill="rgba(255, 255, 0, 0.3)" opacity="0.5">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" repeatCount="indefinite"/>
          </polygon>
        </svg>
      </div>
    {/each}
    
    <!-- 우주정거장 -->
    <div class="space-station" style="
      left: 75%;
      top: 15%;
      animation-duration: 120s;
    ">
      <svg width="60" height="40" viewBox="0 0 60 40">
        <!-- 중앙 모듈 -->
        <rect x="25" y="15" width="10" height="10" fill="#E0E0E0" rx="2"/>
        <!-- 태양전지판 좌측 -->
        <rect x="5" y="5" width="15" height="30" fill="#1E3A5F" opacity="0.8"/>
        <g>
          {#each Array(6) as _, i}
            <rect x="6" y="{6 + i * 4.5}" width="13" height="3" fill="#4FC3F7" opacity="0.7"/>
          {/each}
        </g>
        <!-- 태양전지판 우측 -->
        <rect x="40" y="5" width="15" height="30" fill="#1E3A5F" opacity="0.8"/>
        <g>
          {#each Array(6) as _, i}
            <rect x="41" y="{6 + i * 4.5}" width="13" height="3" fill="#4FC3F7" opacity="0.7"/>
          {/each}
        </g>
        <!-- 안테나 -->
        <line x1="30" y1="15" x2="30" y2="8" stroke="#C0C0C0" stroke-width="1"/>
        <circle cx="30" cy="8" r="2" fill="#FF6B35"/>
        <!-- 도킹 포트 -->
        <circle cx="30" cy="25" r="3" fill="#90A4AE"/>
        <!-- 조명 -->
        <circle cx="25" cy="20" r="1" fill="#4CAF50">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="35" cy="20" r="1" fill="#F44336">
          <animate attributeName="opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  </div>

  <svg class="mindmap-canvas" viewBox="-1200 -1000 2400 2000" role="img" aria-label="Interactive mind map">
    <!-- 그라디언트 정의 -->
    <defs>
      <!-- 태양 그라디언트 -->
      <radialGradient id="sun-gradient" cx="0.3" cy="0.3" r="0.8">
        <stop offset="0%" stop-color="#FFF700" stop-opacity="1"/>
        <stop offset="30%" stop-color="#FFAA00" stop-opacity="1"/>
        <stop offset="70%" stop-color="#FF4500" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#CC2200" stop-opacity="0.8"/>
      </radialGradient>
      
      <!-- 태양 코로나 그라디언트 -->
      <radialGradient id="corona-gradient-1" cx="0.5" cy="0.5" r="0.9">
        <stop offset="0%" stop-color="#FFFF00" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="#FFA500" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#FF4500" stop-opacity="0.3"/>
      </radialGradient>
      
      <radialGradient id="corona-gradient-2" cx="0.5" cy="0.5" r="0.7">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
        <stop offset="50%" stop-color="#FFFF00" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#FFA500" stop-opacity="0.4"/>
      </radialGradient>
      
      <!-- 태양 플레어 그라디언트 -->
      <linearGradient id="flare-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
        <stop offset="30%" stop-color="#FFFF00" stop-opacity="0.8"/>
        <stop offset="70%" stop-color="#FFA500" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#FF4500" stop-opacity="0.3"/>
      </linearGradient>
      
      <!-- 중심 노드 그라디언트 -->
      <radialGradient id="center-gradient" cx="0.5" cy="0.4" r="0.7">
        <stop offset="0%" stop-color="#FFD700" stop-opacity="1"/>
        <stop offset="50%" stop-color="#FFA500" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#FF8C00" stop-opacity="0.8"/>
      </radialGradient>
      
      <!-- 장식 링 그라디언트 -->
      <linearGradient id="ring-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFD700" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="#FFA500" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#FFD700" stop-opacity="0.8"/>
      </linearGradient>
      
      <linearGradient id="ring-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.7"/>
        <stop offset="50%" stop-color="#FFD700" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.7"/>
      </linearGradient>
      
      <!-- 다이아몬드 그라디언트 -->
      <radialGradient id="diamond-gradient" cx="0.5" cy="0.5" r="0.6">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
        <stop offset="50%" stop-color="#FFD700" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#FFA500" stop-opacity="0.7"/>
      </radialGradient>
      
      {#each mindMapData.mainBranches as branch (branch.id)}
        <!-- 지구 그라디언트 (introduction) -->
        {#if branch.id === 'introduction'}
          <radialGradient id="gradient-{branch.id}" cx="0.3" cy="0.3" r="0.9">
            <stop offset="0%" stop-color="#87CEEB" stop-opacity="1"/>
            <stop offset="40%" stop-color="#4169E1" stop-opacity="1"/>
            <stop offset="70%" stop-color="#228B22" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#006400" stop-opacity="0.8"/>
          </radialGradient>
          <radialGradient id="earth-atmosphere" cx="0.5" cy="0.5" r="1.1">
            <stop offset="80%" stop-color="transparent" stop-opacity="0"/>
            <stop offset="95%" stop-color="#87CEEB" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#ADD8E6" stop-opacity="0.6"/>
          </radialGradient>
        <!-- 화성 그라디언트 (development) -->
        {:else if branch.id === 'development'}
          <radialGradient id="gradient-{branch.id}" cx="0.4" cy="0.3" r="0.8">
            <stop offset="0%" stop-color="#CD853F" stop-opacity="1"/>
            <stop offset="30%" stop-color="#A0522D" stop-opacity="1"/>
            <stop offset="70%" stop-color="#8B4513" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#800000" stop-opacity="0.8"/>
          </radialGradient>
        <!-- 목성 그라디언트 (personal-projects) -->
        {:else if branch.id === 'personal-projects'}
          <radialGradient id="gradient-{branch.id}" cx="0.5" cy="0.3" r="0.9">
            <stop offset="0%" stop-color="#DEB887" stop-opacity="1"/>
            <stop offset="25%" stop-color="#D2691E" stop-opacity="1"/>
            <stop offset="50%" stop-color="#A0522D" stop-opacity="1"/>
            <stop offset="75%" stop-color="#8B4513" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#654321" stop-opacity="0.8"/>
          </radialGradient>
        <!-- 토성 그라디언트 (company-projects) -->
        {:else if branch.id === 'company-projects'}
          <radialGradient id="gradient-{branch.id}" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stop-color="#FFD700" stop-opacity="1"/>
            <stop offset="40%" stop-color="#DAA520" stop-opacity="1"/>
            <stop offset="70%" stop-color="#B8860B" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#8B7D6B" stop-opacity="0.8"/>
          </radialGradient>
          <linearGradient id="saturn-rings" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stop-color="transparent" stop-opacity="0"/>
            <stop offset="20%" stop-color="#C0C0C0" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#808080" stop-opacity="1"/>
            <stop offset="80%" stop-color="#C0C0C0" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
          </linearGradient>
        <!-- 금성 그라디언트 (hobbies) -->
        {:else if branch.id === 'hobbies'}
          <radialGradient id="gradient-{branch.id}" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stop-color="#FFFACD" stop-opacity="1"/>
            <stop offset="30%" stop-color="#FFFF00" stop-opacity="1"/>
            <stop offset="70%" stop-color="#FFD700" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#FFA500" stop-opacity="0.8"/>
          </radialGradient>
        <!-- 해왕성 그라디언트 (thoughts) -->
        {:else if branch.id === 'thoughts'}
          <radialGradient id="gradient-{branch.id}" cx="0.3" cy="0.3" r="0.9">
            <stop offset="0%" stop-color="#E0FFFF" stop-opacity="1"/>
            <stop offset="30%" stop-color="#00BFFF" stop-opacity="1"/>
            <stop offset="70%" stop-color="#0000CD" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#191970" stop-opacity="0.8"/>
          </radialGradient>
        {/if}
        
        <filter id="glow-{branch.id}">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      {/each}
      
      <filter id="sun-glow">
        <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- 연결선들 -->
    <g class="connections">
      {#each mindMapData.mainBranches as branch, index (branch.id)}
        <path
          class="connection-line"
          class:active={isNodeActive(branch.id)}
          d={getConnectionPath(mindMapData.centerNode.position, branch.position)}
          stroke="url(#gradient-{branch.id})"
          stroke-width={isNodeActive(branch.id) ? "8" : "4"}
        />
        
        {#each branch.children || [] as subnode (subnode.id)}
          <path
            class="sub-connection"
            class:visible={isNodeActive(branch.id)}
            d={getConnectionPath(branch.position, subnode.position)}
            stroke={branch.color}
            stroke-width={isNodeActive(branch.id) ? "4" : "2"}
          />
        {/each}
      {/each}
    </g>
    
    <!-- 노드들 -->
    <g class="nodes">
      <!-- 중심 노드 -->
      <g class="center-node" class:selected={selectedNode === 'center'}>
        <!-- 전체 호버 영역 (투명한 큰 원) -->
        <circle
          cx={mindMapData.centerNode.position.x}
          cy={mindMapData.centerNode.position.y}
          r="200"
          class="center-hover-area"
          fill="transparent"
          role="button"
          tabindex="0"
          aria-label="중심 노드 전체: {mindMapData.centerNode.title}"
          onclick={handleCenterClick}
          onkeydown={(e) => handleKeydown(e, handleCenterClick)}
          onmouseenter={() => handleCenterHover(true)}
          onmouseleave={() => handleCenterHover(false)}
        />
        
        <!-- 태양 코로나와 플레어 (태양계의 중심) -->
        <g class="sun-corona" transform="translate({mindMapData.centerNode.position.x}, {mindMapData.centerNode.position.y})">
          <!-- 외부 코로나 링들 -->
          <circle
            cx="0"
            cy="0"
            r={180 + Math.sin(pulsePhase) * 15}
            class="corona-ring-1"
            fill="none"
            stroke="url(#corona-gradient-1)"
            stroke-width="6"
            stroke-dasharray="30,15,10,15"
            opacity="0.7"
            pointer-events="none"
          />
          
          <circle
            cx="0"
            cy="0"
            r={160 + Math.sin(pulsePhase * 1.3) * 12}
            class="corona-ring-2"
            fill="none"
            stroke="url(#corona-gradient-2)"
            stroke-width="4"
            stroke-dasharray="25,20"
            opacity="0.8"
            pointer-events="none"
          />
          
          <!-- 태양 플레어들 -->
          {#each Array(16) as _, i}
            <g transform="rotate({i * 22.5})" pointer-events="none">
              <!-- 큰 플레어 -->
              <path
                d="M 0,-190 Q 15,-170 0,-150 Q -15,-170 0,-190"
                fill="url(#flare-gradient)"
                stroke="rgba(255, 255, 0, 0.8)"
                stroke-width="2"
                opacity="0.6"
                class="solar-flare large"
              />
              
              <!-- 작은 플레어 -->
              <path
                d="M 0,-170 Q 8,-155 0,-140 Q -8,-155 0,-170"
                fill="rgba(255, 255, 255, 0.4)"
                opacity="0.5"
                class="solar-flare small"
              >
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="{3 + i * 0.2}s" repeatCount="indefinite"/>
              </path>
            </g>
          {/each}
          
          <!-- 태양 표면의 폭발 효과 -->
          {#each Array(8) as _, i}
            <g transform="rotate({i * 45})" pointer-events="none">
              <circle
                cx="0"
                cy="-140"
                r="6"
                fill="rgba(255, 255, 255, 0.9)"
                class="solar-explosion"
              >
                <animate attributeName="r" values="3;12;3" dur="{2 + i * 0.3}s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="{2 + i * 0.3}s" repeatCount="indefinite"/>
              </circle>
            </g>
          {/each}
        </g>
        
        <!-- 태양 본체 -->
        <circle
          cx={mindMapData.centerNode.position.x}
          cy={mindMapData.centerNode.position.y}
          r={130 + Math.sin(pulsePhase * 1.5) * 10}
          class="sun-surface"
          fill="url(#sun-gradient)"
          filter="url(#sun-glow)"
          stroke="rgba(255, 255, 255, 0.9)"
          stroke-width="6"
          pointer-events="none"
        />
        
        <!-- 태양 내부 핵 -->
        <circle
          cx={mindMapData.centerNode.position.x}
          cy={mindMapData.centerNode.position.y}
          r={100 + Math.sin(pulsePhase * 2) * 15}
          class="sun-core"
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          stroke-width="4"
          opacity="0.9"
          pointer-events="none"
        />
        
        <!-- 태양 표면 활동 -->
        <circle
          cx={mindMapData.centerNode.position.x}
          cy={mindMapData.centerNode.position.y}
          r={80 + Math.sin(pulsePhase * 2.5) * 8}
          class="sun-activity"
          fill="none"
          stroke="rgba(255, 255, 0, 0.8)"
          stroke-width="2"
          opacity="0.7"
          pointer-events="none"
        />
        
        <text
          x={mindMapData.centerNode.position.x}
          y={mindMapData.centerNode.position.y}
          class="sun-text"
          text-anchor="middle"
          dominant-baseline="central"
          pointer-events="none"
        >
          {mindMapData.centerNode.title}
        </text>
      </g>
      
      <!-- 브랜치 노드들 -->
      {#each mindMapData.mainBranches as branch, index (branch.id)}
        <g 
          class="branch-node"
          class:active={isNodeActive(branch.id)}
          class:selected={selectedNode === branch.id}
          style="transform-origin: {branch.position.x}px {branch.position.y}px"
        >
          <!-- 호버 영역 (투명한 큰 원) -->
          <circle
            cx={branch.position.x}
            cy={branch.position.y}
            r="130"
            class="hover-area"
            fill="transparent"
            role="button"
            tabindex="0"
            aria-label="브랜치: {branch.title} - {branch.description}. 클릭하여 이동"
            onclick={() => handleNodeClick(branch)}
            onkeydown={(e) => handleKeydown(e, () => handleNodeClick(branch))}
            onmouseenter={() => handleNodeHover(branch.id, true)}
            onmouseleave={() => handleNodeHover(branch.id, false)}
          />
          
          <!-- 외부 펄스 링 -->
          {#if isNodeActive(branch.id)}
            <circle
              cx={branch.position.x}
              cy={branch.position.y}
              r={140 + Math.sin(pulsePhase * 2) * 20}
              class="pulse-ring"
              fill="none"
              stroke={branch.color}
              stroke-width="4"
              opacity="0.4"
            />
          {/if}
          
          <!-- 메인 노드 -->
          <circle
            cx={branch.position.x}
            cy={branch.position.y}
            r={95 + (isNodeActive(branch.id) ? 20 : 0) + Math.sin(pulsePhase + index) * 6}
            class="branch-circle planet-{branch.id}"
            fill="url(#gradient-{branch.id})"
            filter="url(#glow-{branch.id})"
            pointer-events="none"
          />
          
          <!-- 행성별 특수 효과 -->
          {#if branch.id === 'introduction'}
            <!-- 지구 대기층 -->
            <circle
              cx={branch.position.x}
              cy={branch.position.y}
              r={110 + (isNodeActive(branch.id) ? 25 : 0) + Math.sin(pulsePhase + index) * 7}
              class="earth-atmosphere"
              fill="url(#earth-atmosphere)"
              opacity="0.6"
              pointer-events="none"
            />
          {:else if branch.id === 'company-projects'}
            <!-- 토성 고리 (3차원 입체) -->
            <g class="saturn-rings-3d" pointer-events="none">
              <!-- 뒤쪽 고리 (어둡게) -->
              <ellipse
                cx={branch.position.x}
                cy={branch.position.y}
                rx={160 + (isNodeActive(branch.id) ? 35 : 0)}
                ry="12"
                fill="none"
                stroke="rgba(128, 128, 128, 0.3)"
                stroke-width="6"
                opacity="0.4"
                transform="rotate(-15 {branch.position.x} {branch.position.y})"
              />
              <ellipse
                cx={branch.position.x}
                cy={branch.position.y}
                rx={145 + (isNodeActive(branch.id) ? 32 : 0)}
                ry="10"
                fill="none"
                stroke="rgba(96, 96, 96, 0.4)"
                stroke-width="4"
                opacity="0.5"
                transform="rotate(-15 {branch.position.x} {branch.position.y})"
              />
              
              <!-- 중간 고리 -->
              <ellipse
                cx={branch.position.x}
                cy={branch.position.y}
                rx={140 + (isNodeActive(branch.id) ? 30 : 0)}
                ry="15"
                fill="none"
                stroke="url(#saturn-rings)"
                stroke-width="8"
                opacity="0.7"
                transform="rotate(-10 {branch.position.x} {branch.position.y})"
              />
              <ellipse
                cx={branch.position.x}
                cy={branch.position.y}
                rx={125 + (isNodeActive(branch.id) ? 25 : 0)}
                ry="12"
                fill="none"
                stroke="rgba(160, 160, 160, 0.6)"
                stroke-width="5"
                opacity="0.6"
                transform="rotate(-10 {branch.position.x} {branch.position.y})"
              />
              
              <!-- 앞쪽 고리 (밝게) -->
              <ellipse
                cx={branch.position.x}
                cy={branch.position.y}
                rx={155 + (isNodeActive(branch.id) ? 35 : 0)}
                ry="18"
                fill="none"
                stroke="rgba(220, 220, 220, 0.8)"
                stroke-width="4"
                opacity="0.8"
                transform="rotate(-5 {branch.position.x} {branch.position.y})"
              />
              <ellipse
                cx={branch.position.x}
                cy={branch.position.y}
                rx={135 + (isNodeActive(branch.id) ? 28 : 0)}
                ry="14"
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                stroke-width="3"
                opacity="0.9"
                transform="rotate(-5 {branch.position.x} {branch.position.y})"
              />
              
              <!-- 고리 입자 효과 -->
              {#each Array(12) as _, i}
                <circle
                  cx={branch.position.x + (120 + i * 8) * Math.cos(i * 0.52)}
                  cy={branch.position.y + (120 + i * 8) * Math.sin(i * 0.52) * 0.3}
                  r="1.5"
                  fill="rgba(200, 200, 200, 0.6)"
                  opacity="0.7"
                >
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="{3 + i * 0.4}s" repeatCount="indefinite"/>
                </circle>
              {/each}
            </g>
          {/if}
          
          <!-- SVG 아이콘 -->
          <g class="branch-icon-container" pointer-events="none">
            <svg
              x={branch.position.x - 24}
              y={branch.position.y - 24}
              width="48"
              height="48"
              viewBox="0 0 24 24"
              class="branch-icon"
            >
              {@html branch.icon}
            </svg>
          </g>
          
          <!-- 제목 -->
          <text
            x={branch.position.x}
            y={branch.position.y + 160}
            class="branch-title"
            text-anchor="middle"
            dominant-baseline="central"
            pointer-events="none"
          >
            {branch.title}
          </text>
          
          <!-- 설명 -->
          {#if branch.description}
            <text
              x={branch.position.x}
              y={branch.position.y + 185}
              class="branch-description"
              text-anchor="middle"
              dominant-baseline="central"
              pointer-events="none"
            >
              {branch.description}
            </text>
          {/if}
        </g>
        
        <!-- 서브 노드들 -->
        {#each branch.children || [] as subnode (subnode.id)}
          <g 
            class="sub-node satellite"
            class:visible={isNodeActive(branch.id)}
          >
            <!-- 위성 궤도 표시 -->
            <circle
              cx={subnode.position.x}
              cy={subnode.position.y}
              r="70"
              class="satellite-orbit"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              stroke-width="1"
              stroke-dasharray="5,10"
              opacity="0.5"
            />
            
            <circle
              cx={subnode.position.x}
              cy={subnode.position.y}
              r="55"
              class="sub-circle satellite-body"
              fill={branch.color}
              opacity="0.8"
            />
            
            <text
              x={subnode.position.x}
              y={subnode.position.y}
              class="sub-text"
              text-anchor="middle"
              dominant-baseline="central"
            >
              {subnode.title}
            </text>
          </g>
        {/each}
      {/each}
    </g>
  </svg>
  
  <!-- 툴팁 제거됨 -->
  
  <!-- 안내 메시지 제거 -->
</div>

<style>
  .mindmap-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: radial-gradient(ellipse at center, #1e3c72 0%, #0B1426 40%, #000000 100%);
    background-size: 100% 100%;
    /* 우주 배경으로 변경 */
  }
  
  .particles-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }
  
  .particle {
    position: absolute;
    border-radius: 50%;
    animation: particleFloat linear infinite;
  }
  
  /* 별똥별 효과 */
  .meteor {
    position: absolute;
    width: 3px;
    height: 15px;
    background: linear-gradient(135deg, #fff 0%, #4FC3F7 50%, transparent 100%);
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    animation: meteorFall linear infinite;
    box-shadow: 0 0 8px #4FC3F7, 0 0 16px #4FC3F7;
    transform: rotate(45deg);
  }
  
  /* 운석 효과 */
  .asteroid {
    position: absolute;
    width: 6px;
    height: 12px;
    background: linear-gradient(150deg, #8D6E63 0%, #5D4037 50%, #3E2723 100%);
    border-radius: 60% 40% 40% 60%;
    animation: asteroidFall linear infinite;
    box-shadow: 0 0 6px rgba(139, 69, 19, 0.8);
    transform: rotate(30deg);
  }
  
  @keyframes meteorFall {
    0% {
      transform: translateX(-100px) translateY(-100px) rotate(45deg);
      opacity: 1;
    }
    100% {
      transform: translateX(100vw) translateY(100vh) rotate(45deg);
      opacity: 0;
    }
  }
  
  @keyframes asteroidFall {
    0% {
      transform: translateX(100px) translateY(-50px) rotate(30deg);
      opacity: 1;
    }
    100% {
      transform: translateX(-100px) translateY(100vh) rotate(30deg);
      opacity: 0;
    }
  }
  
  /* 별 반짝임 */
  .star {
    position: absolute;
    background: #fff;
    border-radius: 50%;
    animation: starTwinkle infinite ease-in-out;
  }
  
  .star::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 1px;
    background: inherit;
    transform: translate(-50%, -50%);
  }
  
  .star::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1px;
    height: 100%;
    background: inherit;
    transform: translate(-50%, -50%);
  }
  
  /* 성운 효과 */
  .nebula {
    position: absolute;
    border-radius: 50%;
    opacity: 0.1;
    animation: nebulaGlow infinite ease-in-out alternate;
    pointer-events: none;
  }
  
  @keyframes particleFloat {
    0% {
      transform: translateY(100vh) scale(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) scale(1);
      opacity: 0;
    }
  }
  
  @keyframes meteorFall {
    0% {
      transform: translateY(-100px) translateX(-100px) rotate(-45deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) translateX(100vh) rotate(-45deg);
      opacity: 0;
    }
  }
/*   
  @keyframes asteroidFall {
    0% {
      transform: translateY(-50px) translateX(100px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) translateX(-100px) rotate(360deg);
      opacity: 0;
    }
  } */
  
  @keyframes starTwinkle {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
  
  @keyframes nebulaGlow {
    0% {
      opacity: 0.05;
      transform: scale(1);
    }
    100% {
      opacity: 0.15;
      transform: scale(1.1);
    }
  }
  
  .glow-orb {
    position: absolute;
    border-radius: 50%;
    opacity: 0.2;
    animation: glowOrbPulse 8s infinite ease-in-out;
    pointer-events: none;
  }
  
  @keyframes glowOrbPulse {
    0%, 100% {
      transform: scale(0.8);
      opacity: 0.1;
    }
    50% {
      transform: scale(1.3);
      opacity: 0.3;
    }
  }
  
  .mindmap-container.animating {
    pointer-events: none;
  }
  
  .mindmap-canvas {
    width: 100%;
    height: 100%;
    cursor: grab;
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
    outline: none; /* 포커스 아웃라인 제거 */
  }
  
  .mindmap-canvas:active {
    cursor: grabbing;
  }
  
  /* SVG 요소들의 포커스 아웃라인 제거 */
  .mindmap-canvas * {
    outline: none !important;
  }
  
  /* 클릭 가능한 요소들의 포커스 스타일 제거 */
  .center-hover-area,
  .hover-area,
  circle[role="button"],
  text[role="button"] {
    outline: none !important;
    -webkit-tap-highlight-color: transparent;
  }
  
  .center-hover-area:focus,
  .hover-area:focus {
    outline: none !important;
  }
  
  /* 연결선 스타일 (궤도선) */
  .connection-line {
    fill: none;
    stroke-opacity: 0.4;
    transition: all 0.2s ease-out;
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3));
    stroke-dasharray: 10,5;
  }
  
  .connection-line.active {
    stroke-opacity: 0.8;
    filter: drop-shadow(0 0 12px currentColor);
    animation: orbitFlow 3s ease-in-out infinite;
    stroke-dasharray: 15,8;
  }
  
  @keyframes orbitFlow {
    0%, 100% { stroke-width: 4; stroke-dashoffset: 0; }
    50% { stroke-width: 6; stroke-dashoffset: 20; }
  }
  
  .sub-connection {
    fill: none;
    stroke-opacity: 0;
    transition: all 0.25s ease-out;
    pointer-events: none;
    stroke-dasharray: 5,8;
  }
  
  .sub-connection.visible {
    stroke-opacity: 0.5;
    filter: drop-shadow(0 0 8px currentColor);
    animation: satelliteOrbit 4s linear infinite;
  }
  
  @keyframes satelliteOrbit {
    from { stroke-dashoffset: 0; }
    to { stroke-dashoffset: 26; }
  }
  
  .center-node {
    cursor: pointer;
    transition: all 0.25s ease-out;
  }
  
  .center-hover-area {
    cursor: pointer;
    transition: all 0.2s ease-out;
  }
  
  .center-hover-area:hover {
    stroke: rgba(255, 255, 255, 0.1);
    stroke-width: 2;
  }
  
  .decorative-border {
    transition: all 0.25s ease-out;
  }
  
  .center-node:hover .decorative-border,
  .center-node.selected .decorative-border {
    animation: decorativeSpin 20s linear infinite;
  }
  
  @keyframes decorativeSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .outer-ring-1,
  .outer-ring-2 {
    transition: all 0.2s ease-out;
  }
  
  .center-node:hover .outer-ring-1 {
    opacity: 1;
    stroke-width: 4;
    animation: ringPulse1 3s ease-in-out infinite;
  }
  
  .center-node:hover .outer-ring-2 {
    opacity: 1;
    stroke-width: 3;
    animation: ringPulse2 2.5s ease-in-out infinite;
  }
  
  @keyframes ringPulse1 {
    0%, 100% { stroke-dasharray: 20,8,5,8; }
    50% { stroke-dasharray: 30,12,8,12; }
  }
  
  @keyframes ringPulse2 {
    0%, 100% { stroke-dasharray: 15,10; }
    50% { stroke-dasharray: 25,15; }
  }
  
  .diamond-decoration {
    transition: all 0.2s ease-out;
    transform-origin: center center;
  }
  
  .center-node:hover .diamond-decoration {
    animation: diamondGlow 2s ease-in-out infinite;
  }
  
  @keyframes diamondGlow {
    0%, 100% { 
      opacity: 0.8; 
      transform: scale(1);
    }
    50% { 
      opacity: 1; 
      transform: scale(1.2);
    }
  }
  
  .small-decoration {
    transition: all 0.2s ease-out;
  }
  
  .center-node:hover .small-decoration {
    r: 4;
    fill: rgba(255, 255, 255, 1);
  }
  
  .cross-decoration {
    transition: all 0.2s ease-out;
  }
  
  .center-node:hover .cross-decoration {
    fill: rgba(255, 255, 255, 0.9);
    animation: crossTwinkle 1.5s ease-in-out infinite;
  }
  
  @keyframes crossTwinkle {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  
  .center-circle {
    transition: all 0.25s ease-out;
  }
  
  .center-node:hover .center-circle,
  .center-node.selected .center-circle {
    stroke-width: 6;
    filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.9));
    animation: centerBounce 1.5s ease-in-out infinite;
  }
  
  @keyframes centerBounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .inner-pulse {
    transition: all 0.2s ease-out;
  }
  
  .center-node:hover .inner-pulse {
    opacity: 1;
    stroke: rgba(255, 255, 255, 0.7);
    stroke-width: 3;
    animation: innerPulseGlow 2s ease-in-out infinite;
  }
  
  @keyframes innerPulseGlow {
    0%, 100% { r: 75px; opacity: 0.8; }
    50% { r: 85px; opacity: 1; }
  }
  
  .center-text {
    fill: #ffffff;
    font-size: 4rem;
    font-weight: bold;
    pointer-events: none;
    text-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
    transition: all 0.2s ease-out;
  }
  
  .center-node:hover .center-text {
    font-size: 4.5rem;
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.9));
  }
  
  /* 브랜치 노드 */
  .branch-node {
    cursor: pointer;
    transition: all 0.2s ease-out;
  }
  
  .hover-area {
    cursor: pointer;
  }
  
  .branch-circle {
    transition: all 0.2s ease-out;
    stroke: rgba(255, 255, 255, 0.4);
    stroke-width: 3;
  }
  
  .branch-node:hover {
    animation: orbitWobble 0.6s ease-out;
  }
  
  @keyframes orbitWobble {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.08) rotate(2deg); }
    100% { transform: scale(1.05) rotate(0deg); }
  }
  
  .branch-node.active .branch-circle {
    stroke: rgba(255, 255, 255, 0.9);
    stroke-width: 6;
    filter: drop-shadow(0 0 25px currentColor);
  }
  
  .pulse-ring {
    animation: cosmicPulse 1.5s ease-out infinite;
  }
  
  @keyframes cosmicPulse {
    0% {
      r: 95px;
      opacity: 0.8;
    }
    100% {
      r: 180px;
      opacity: 0;
    }
  }
  
  .branch-icon {
    fill: #ffffff;
    transition: all 0.2s ease-out;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
    transform-origin: 24px 24px;
  }
  
  .branch-node:hover .branch-icon {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 1));
  }
  
  .branch-icon-container {
    transition: all 0.2s ease-out;
  }
  
  .branch-node:hover .branch-icon-container {
    animation: antiGravity 0.8s ease-out infinite;
  }
  
  @keyframes antiGravity {
    0%, 100% { 
      transform: translateY(0px) scale(1); 
    }
    50% { 
      transform: translateY(-10px) scale(1.05); 
    }
  }
  
  .branch-title {
    fill: #ffffff;
    font-size: 1.6rem;
    font-weight: 600;
    pointer-events: none;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.3);
    transition: all 0.2s ease-out;
  }
  
  .branch-node:hover .branch-title {
    font-size: 1.8rem;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.9));
  }
  
  .branch-description {
    fill: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    pointer-events: none;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    opacity: 0;
    transition: all 0.2s ease-out;
  }
  
  .branch-node:hover .branch-description {
    opacity: 1;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
  }
  
  /* 서브 노드 (위성) */
  .sub-node {
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.25s ease-out;
    pointer-events: none;
  }
  
  .sub-node.visible {
    opacity: 1;
    transform: scale(1);
  }
  
  .sub-circle {
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.4));
    stroke: rgba(255, 255, 255, 0.6);
    stroke-width: 2;
    transition: all 0.3s ease-out;
  }
  
  .sub-text {
    fill: #ffffff;
    font-size: 1rem;
    font-weight: 500;
    pointer-events: none;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.9), 0 0 15px rgba(255, 255, 255, 0.4);
  }
  
  /* 툴팁 스타일 제거됨 */
  
  /* 반응형 */
  @media (max-width: 768px) {
    .branch-title {
      font-size: 1.3rem;
    }
    
    .branch-node:hover .branch-title {
      font-size: 1.5rem;
    }
    
    .branch-description {
      font-size: 0.95rem;
    }
    
    .branch-icon {
      width: 40px;
      height: 40px;
    }
    
    .branch-icon-container svg {
      width: 40px;
      height: 40px;
    }
    
    .center-text {
      font-size: 3.2rem;
    }
    
    .center-node:hover .center-text {
      font-size: 3.6rem;
    }
    
    .center-hover-area {
      r: 160px;
    }
    
    .outer-ring-1 {
      r: 130px;
      stroke-width: 3;
    }
    
    .outer-ring-2 {
      r: 110px;
      stroke-width: 2;
    }
    
    .center-circle {
      r: 100px;
      stroke-width: 4;
    }
    
    .inner-pulse {
      r: 80px;
    }
    
    .diamond-decoration {
      transform: scale(0.8);
    }
    
    .small-decoration {
      r: 3;
    }
    
    .branch-circle {
      r: 80px;
    }
    
    .hover-area {
      r: 110px;
    }
    
    .sub-circle {
      r: 45px;
    }
    
    .sub-text {
      font-size: 0.9rem;
    }
  }
  
  /* 접근성 */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
  
  /* 태양 스타일 */
  .sun-text {
    fill: #ffffff;
    font-size: 4rem;
    font-weight: bold;
    pointer-events: none;
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.9), 0 0 40px rgba(255, 140, 0, 0.7);
    transition: all 0.2s ease-out;
  }
  
  .center-node:hover .sun-text {
    font-size: 4.5rem;
    filter: drop-shadow(0 0 30px rgba(255, 255, 255, 1));
  }
  
  .sun-surface {
    transition: all 0.2s ease-out;
  }
  
  .center-node:hover .sun-surface {
    stroke-width: 8;
    filter: drop-shadow(0 0 40px rgba(255, 215, 0, 1));
  }
  
  .sun-corona {
    transition: all 0.25s ease-out;
  }
  
  .center-node:hover .sun-corona {
    animation: solarFlare 8s linear infinite;
  }
  
  @keyframes solarFlare {
    0%, 100% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .corona-ring-1,
  .corona-ring-2 {
    transition: all 0.2s ease-out;
  }
  
  .center-node:hover .corona-ring-1 {
    opacity: 1;
    stroke-width: 8;
    animation: coronaPulse1 4s ease-in-out infinite;
  }
  
  .center-node:hover .corona-ring-2 {
    opacity: 1;
    stroke-width: 6;
    animation: coronaPulse2 3s ease-in-out infinite;
  }
  
  @keyframes coronaPulse1 {
    0%, 100% { stroke-dasharray: 30,15,10,15; }
    50% { stroke-dasharray: 45,20,15,20; }
  }
  
  @keyframes coronaPulse2 {
    0%, 100% { stroke-dasharray: 25,20; }
    50% { stroke-dasharray: 35,30; }
  }
  
  .solar-flare {
    transition: all 0.2s ease-out;
  }
  
  .center-node:hover .solar-flare.large {
    opacity: 0.9;
    stroke-width: 3;
  }
  
  .center-node:hover .solar-flare.small {
    opacity: 0.8;
  }
  
  /* 행성별 특수 효과 */
  .earth-atmosphere {
    transition: all 0.3s ease-out;
  }
  
  .branch-node:hover .earth-atmosphere {
    opacity: 0.9;
    stroke: rgba(135, 206, 235, 0.6);
    stroke-width: 2;
  }
  
  .cloud-pattern {
    animation: cloudDrift 15s ease-in-out infinite;
  }
  
  @keyframes cloudDrift {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
  
  .dust-storm {
    animation: martianWind 8s ease-in-out infinite;
  }
  
  @keyframes martianWind {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  .jupiter-bands {
    transition: all 0.3s ease-out;
  }
  
  .branch-node:hover .jupiter-bands {
    opacity: 0.8;
  }
  
  .great-red-spot {
    filter: drop-shadow(0 0 8px rgba(178, 34, 34, 0.8));
  }
  
  .saturn-rings {
    transition: all 0.3s ease-out;
  }
  
  .saturn-rings-3d {
    transition: all 0.3s ease-out;
  }
  
  .branch-node:hover .saturn-rings,
  .branch-node:hover .saturn-rings-3d {
    opacity: 1;
  }
  
  /* 우주 객체들 애니메이션 */
  .space-shuttle {
    position: absolute;
    z-index: 1;
    animation: shuttleOrbit linear infinite;
    opacity: 0.8;
  }
  
  @keyframes shuttleOrbit {
    0% {
      transform: translateX(-50px) translateY(20px) rotate(0deg);
    }
    25% {
      transform: translateX(30vw) translateY(-10px) rotate(15deg);
    }
    50% {
      transform: translateX(70vw) translateY(25px) rotate(30deg);
    }
    75% {
      transform: translateX(30vw) translateY(60px) rotate(-15deg);
    }
    100% {
      transform: translateX(-50px) translateY(20px) rotate(0deg);
    }
  }
  
  .ufo {
    position: absolute;
    z-index: 1;
    animation: ufoFlight ease-in-out infinite;
    opacity: 0.9;
  }
  
  @keyframes ufoFlight {
    0%, 100% {
      transform: translateX(0px) translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateX(30px) translateY(-15px) rotate(5deg);
    }
    50% {
      transform: translateX(-10px) translateY(-25px) rotate(-3deg);
    }
    75% {
      transform: translateX(25px) translateY(-10px) rotate(8deg);
    }
  }
  
  .space-station {
    position: absolute;
    z-index: 1;
    animation: stationFloat linear infinite;
    opacity: 0.85;
  }
  
  @keyframes stationFloat {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
    100% {
      transform: translateY(0px) rotate(360deg);
    }
  }
  
  .venus-atmosphere {
    animation: venusGlow 6s ease-in-out infinite;
  }
  
  @keyframes venusGlow {
    0%, 100% { opacity: 0.7; stroke-width: 3; }
    50% { opacity: 1; stroke-width: 5; }
  }
  
  .ice-crystals {
    filter: drop-shadow(0 0 4px rgba(224, 255, 255, 0.8));
  }
  
  /* 위성 스타일 */
  .satellite-orbit {
    transition: all 0.25s ease-out;
    animation: orbitPulse 8s ease-in-out infinite;
  }
  
  @keyframes orbitPulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
  
  .satellite-body {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
    transition: all 0.25s ease-out;
  }
  
  .sub-node.visible .satellite-body {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
  }
</style> 