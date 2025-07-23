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
  
  // 마인드맵 데이터 (크기와 위치 증가)
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
        position: { x: -400, y: -280 },
        angle: Math.PI * 1.25,
        radius: 480,
        color: '#FF6B6B',
        category: 'introduction',
        route: '/introduction',
        icon: IconProfile, // 프로필 아이콘으로 변경
        isVisible: true,
        isSelected: false,
        isHovered: false,
        gradient: { from: '#FF6B6B', to: '#FFE66D' },
        children: [
          { 
            id: 'personal-info', 
            title: '개인정보', 
            level: 2, 
            position: { x: -600, y: -380 },
            angle: Math.PI * 1.3,
            radius: 700,
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
            position: { x: -550, y: -200 },
            angle: Math.PI * 1.2,
            radius: 650,
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
            position: { x: -480, y: -450 },
            angle: Math.PI * 1.35,
            radius: 680,
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
        position: { x: 400, y: -280 },
        angle: Math.PI * 0.25,
        radius: 480,
        color: '#4ECDC4',
        category: 'development',
        route: '/development',
        icon: IconCode, // 코드 아이콘으로 변경
        isVisible: true,
        isSelected: false,
        isHovered: false,
        gradient: { from: '#4ECDC4', to: '#44A08D' },
        children: [
          { 
            id: 'languages', 
            title: '언어별 경험', 
            level: 2, 
            position: { x: 600, y: -380 },
            angle: Math.PI * 0.2,
            radius: 700,
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
            position: { x: 550, y: -200 },
            angle: Math.PI * 0.3,
            radius: 650,
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
            position: { x: 480, y: -450 },
            angle: Math.PI * 0.15,
            radius: 680,
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
        position: { x: -400, y: 280 },
        angle: Math.PI * 0.75,
        radius: 480,
        color: '#A8E6CF',
        category: 'personal-projects',
        route: '/personal-projects',
        icon: IconLightbulb, // 전구 아이콘으로 변경
        isVisible: true,
        isSelected: false,
        isHovered: false,
        gradient: { from: '#A8E6CF', to: '#88D8A3' },
        children: [
          { 
            id: 'web-projects', 
            title: '웹 프로젝트', 
            level: 2, 
            position: { x: -600, y: 200 },
            angle: Math.PI * 0.8,
            radius: 700,
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
            position: { x: -550, y: 380 },
            angle: Math.PI * 0.7,
            radius: 650,
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
            position: { x: -480, y: 450 },
            angle: Math.PI * 0.85,
            radius: 680,
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
        position: { x: 400, y: 280 },
        angle: Math.PI * 1.75,
        radius: 480,
        color: '#FFB6C1',
        category: 'company-projects',
        route: '/company-projects',
        icon: IconWorkspace, // 작업공간 아이콘으로 변경
        isVisible: true,
        isSelected: false,
        isHovered: false,
        gradient: { from: '#FFB6C1', to: '#FFA0B9' },
        children: [
          { 
            id: 'current-company', 
            title: '현재 회사', 
            level: 2, 
            position: { x: 600, y: 200 },
            angle: Math.PI * 1.8,
            radius: 700,
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
            position: { x: 550, y: 380 },
            angle: Math.PI * 1.7,
            radius: 650,
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
            position: { x: 480, y: 450 },
            angle: Math.PI * 1.85,
            radius: 680,
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
        position: { x: 0, y: -450 },
        angle: Math.PI * 1.5,
        radius: 450,
        color: '#DDA0DD',
        category: 'hobbies',
        route: '/hobbies',
        icon: IconHeart, // 하트 아이콘으로 변경
        isVisible: true,
        isSelected: false,
        isHovered: false,
        gradient: { from: '#DDA0DD', to: '#DA70D6' },
        children: [
          { 
            id: 'interests', 
            title: '개발 외 관심사', 
            level: 2, 
            position: { x: -140, y: -600 },
            angle: Math.PI * 1.45,
            radius: 650,
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
            position: { x: 0, y: -650 },
            angle: Math.PI * 1.5,
            radius: 700,
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
            position: { x: 140, y: -600 },
            angle: Math.PI * 1.55,
            radius: 650,
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
        position: { x: 0, y: 450 },
        angle: Math.PI * 0.5,
        radius: 450,
        color: '#87CEEB',
        category: 'thoughts',
        route: '/thoughts',
        icon: IconBrain, // 뇌 아이콘으로 변경
        isVisible: true,
        isSelected: false,
        isHovered: false,
        gradient: { from: '#87CEEB', to: '#4682B4' },
        children: [
          { 
            id: 'philosophy', 
            title: '개발 철학', 
            level: 2, 
            position: { x: -140, y: 600 },
            angle: Math.PI * 0.55,
            radius: 650,
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
            position: { x: 0, y: 650 },
            angle: Math.PI * 0.5,
            radius: 700,
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
            position: { x: 140, y: 600 },
            angle: Math.PI * 0.45,
            radius: 650,
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
    canvasSize: { width: 1600, height: 1600 },
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
  <!-- 파티클 배경 -->
  <div class="particles-bg">
    {#each Array(25) as _, i}
      <div class="particle" style="
        left: {Math.random() * 100}%;
        top: {Math.random() * 100}%;
        animation-delay: {Math.random() * 5}s;
        animation-duration: {3 + Math.random() * 4}s;
      "></div>
    {/each}
  </div>

  <svg class="mindmap-canvas" viewBox="-800 -800 1600 1600" role="img" aria-label="Interactive mind map">
    <!-- 그라디언트 정의 -->
    <defs>
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
        <radialGradient id="gradient-{branch.id}" cx="0.5" cy="0.3" r="0.8">
          <stop offset="0%" stop-color="{branch.gradient?.from || branch.color}" stop-opacity="1"/>
          <stop offset="100%" stop-color="{branch.gradient?.to || branch.color}" stop-opacity="0.8"/>
        </radialGradient>
        
        <filter id="glow-{branch.id}">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      {/each}
      
      <filter id="center-glow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
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
          r="160"
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
        
        <!-- 장식적 외부 링 패턴 -->
        <g class="decorative-border" transform="translate({mindMapData.centerNode.position.x}, {mindMapData.centerNode.position.y})">
          <!-- 외부 장식 링 1 -->
          <circle
            cx="0"
            cy="0"
            r={130 + Math.sin(pulsePhase) * 8}
            class="outer-ring-1"
            fill="none"
            stroke="url(#ring-gradient-1)"
            stroke-width="3"
            stroke-dasharray="20,8,5,8"
            opacity="0.6"
            pointer-events="none"
          />
          
          <!-- 외부 장식 링 2 -->
          <circle
            cx="0"
            cy="0"
            r={115 + Math.sin(pulsePhase * 1.3) * 6}
            class="outer-ring-2"
            fill="none"
            stroke="url(#ring-gradient-2)"
            stroke-width="2"
            stroke-dasharray="15,10"
            opacity="0.7"
            pointer-events="none"
          />
          
          <!-- 기하학적 장식 요소들 -->
          {#each Array(8) as _, i}
            <g transform="rotate({i * 45})" pointer-events="none">
              <!-- 다이아몬드 장식 -->
              <path
                d="M 0,-140 L 8,-132 L 0,-124 L -8,-132 Z"
                fill="url(#diamond-gradient)"
                stroke="rgba(255, 255, 255, 0.8)"
                stroke-width="1"
                opacity="0.8"
                class="diamond-decoration"
              />
              
              <!-- 작은 원형 장식 -->
              <circle
                cx="0"
                cy="-120"
                r="3"
                fill="rgba(255, 215, 0, 0.9)"
                class="small-decoration"
              >
                <animate attributeName="opacity" values="0.6;1;0.6" dur="{2 + i * 0.2}s" repeatCount="indefinite"/>
              </circle>
            </g>
          {/each}
          
          <!-- 십자 장식 -->
          {#each Array(4) as _, i}
            <g transform="rotate({i * 90})" pointer-events="none">
              <path
                d="M 0,-110 L 3,-107 L 0,-104 L -3,-107 Z"
                fill="rgba(255, 255, 255, 0.6)"
                class="cross-decoration"
              />
            </g>
          {/each}
        </g>
        
        <!-- 메인 중심 원 -->
        <circle
          cx={mindMapData.centerNode.position.x}
          cy={mindMapData.centerNode.position.y}
          r={95 + Math.sin(pulsePhase * 1.5) * 5}
          class="center-circle"
          fill="url(#center-gradient)"
          filter="url(#center-glow)"
          stroke="rgba(255, 255, 255, 0.9)"
          stroke-width="4"
          pointer-events="none"
        />
        
        <!-- 내부 펄스 링 -->
        <circle
          cx={mindMapData.centerNode.position.x}
          cy={mindMapData.centerNode.position.y}
          r={75 + Math.sin(pulsePhase * 2) * 8}
          class="inner-pulse"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          stroke-width="2"
          opacity="0.8"
          pointer-events="none"
        />
        
        <text
          x={mindMapData.centerNode.position.x}
          y={mindMapData.centerNode.position.y}
          class="center-text"
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
            r="100"
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
              r={110 + Math.sin(pulsePhase * 2) * 15}
              class="pulse-ring"
              fill="none"
              stroke={branch.color}
              stroke-width="3"
              opacity="0.4"
            />
          {/if}
          
          <!-- 메인 노드 -->
          <circle
            cx={branch.position.x}
            cy={branch.position.y}
            r={75 + (isNodeActive(branch.id) ? 15 : 0) + Math.sin(pulsePhase + index) * 4}
            class="branch-circle"
            fill="url(#gradient-{branch.id})"
            filter="url(#glow-{branch.id})"
            pointer-events="none"
          />
          
          <!-- SVG 아이콘 -->
          <g class="branch-icon-container" pointer-events="none">
            <svg
              x={branch.position.x - 18}
              y={branch.position.y - 18}
              width="36"
              height="36"
              viewBox="0 0 24 24"
              class="branch-icon"
            >
              {@html branch.icon}
            </svg>
          </g>
          
          <!-- 제목 -->
          <text
            x={branch.position.x}
            y={branch.position.y + 130}
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
              y={branch.position.y + 155}
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
            class="sub-node"
            class:visible={isNodeActive(branch.id)}
          >
            <circle
              cx={subnode.position.x}
              cy={subnode.position.y}
              r="45"
              class="sub-circle"
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* 배경 애니메이션 제거 */
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
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: particleFloat linear infinite;
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
  
  /* 연결선 스타일 */
  .connection-line {
    fill: none;
    stroke-opacity: 0.6;
    transition: all 0.2s ease-out;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  }
  
  .connection-line.active {
    stroke-opacity: 1;
    filter: drop-shadow(0 0 15px currentColor);
    animation: connectionPulse 2s ease-in-out infinite;
  }
  
  @keyframes connectionPulse {
    0%, 100% { stroke-width: 8; }
    50% { stroke-width: 10; }
  }
  
  .sub-connection {
    fill: none;
    stroke-opacity: 0;
    transition: all 0.25s ease-out;
    pointer-events: none;
  }
  
  .sub-connection.visible {
    stroke-opacity: 0.7;
    filter: drop-shadow(0 0 8px currentColor);
  }
  
  /* 중심 노드 - 장식적 원형 */
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
    font-size: 3.2rem;
    font-weight: bold;
    pointer-events: none;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: all 0.2s ease-out;
  }
  
  .center-node:hover .center-text {
    font-size: 3.6rem;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
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
    stroke: rgba(255, 255, 255, 0.3);
    stroke-width: 4;
  }
  
  .branch-node:hover {
    animation: nodeBounce 0.4s ease-out;
  }
  
  @keyframes nodeBounce {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.08) rotate(2deg); }
    100% { transform: scale(1.05) rotate(0deg); }
  }
  
  .branch-node.active .branch-circle {
    stroke: rgba(255, 255, 255, 0.8);
    stroke-width: 6;
    filter: drop-shadow(0 0 30px currentColor);
  }
  
  .pulse-ring {
    animation: pulseRingExpand 1.2s ease-out infinite;
  }
  
  @keyframes pulseRingExpand {
    0% {
      r: 75px;
      opacity: 0.8;
    }
    100% {
      r: 120px;
      opacity: 0;
    }
  }
  
  .branch-icon {
    fill: #ffffff;
    transition: all 0.2s ease-out;
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.5));
    transform-origin: 18px 18px;
  }
  
  .branch-node:hover .branch-icon {
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.9));
  }
  
  .branch-icon-container {
    transition: all 0.2s ease-out;
  }
  
  .branch-node:hover .branch-icon-container {
    animation: iconBounce 0.6s ease-out infinite;
  }
  
  @keyframes iconBounce {
    0%, 100% { 
      transform: translateY(0px); 
    }
    50% { 
      transform: translateY(-8px); 
    }
  }
  
  .branch-title {
    fill: #ffffff;
    font-size: 1.3rem;
    font-weight: 600;
    pointer-events: none;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
    transition: all 0.2s ease-out;
  }
  
  .branch-node:hover .branch-title {
    font-size: 1.4rem;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
  }
  
  .branch-description {
    fill: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    pointer-events: none;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: all 0.2s ease-out;
  }
  
  .branch-node:hover .branch-description {
    opacity: 1;
  }
  
  /* 서브 노드 */
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
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
    stroke: rgba(255, 255, 255, 0.4);
    stroke-width: 2;
  }
  
  .sub-text {
    fill: #ffffff;
    font-size: 0.8rem;
    font-weight: 500;
    pointer-events: none;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
  }
  
  /* 툴팁 스타일 제거됨 */
  
  /* 반응형 */
  @media (max-width: 768px) {
    .branch-title {
      font-size: 1.1rem;
    }
    
    .branch-icon {
      width: 28px;
      height: 28px;
    }
    
    .branch-icon-container {
      /* 기본 스케일 제거 */
    }
    
    .branch-node:hover .branch-icon-container {
      animation: iconBounce 0.8s ease-in-out infinite;
    }
    
    @keyframes iconBounce {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    
    .center-text {
      font-size: 2.6rem;
    }
    
    .center-hover-area {
      r: 140px;
    }
    
    .outer-ring-1 {
      r: 110px;
      stroke-width: 2;
    }
    
    .outer-ring-2 {
      r: 95px;
      stroke-width: 1.5;
    }
    
    .center-circle {
      r: 80px;
      stroke-width: 3;
    }
    
    .inner-pulse {
      r: 60px;
    }
    
    .diamond-decoration {
      transform: scale(0.8);
    }
    
    .small-decoration {
      r: 2.5;
    }
  }
  
  /* 접근성 */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
</style> 