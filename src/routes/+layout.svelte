<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { navigationState, getPageFromRoute, updateBrowserTitle } from '$lib/stores/navigation.svelte';
  import { userPreferences, analytics } from '$lib/utils/storage';
  
  // Import the new Tailwind-based CSS
  import '../app.css';
  
  interface Props {
    children: Snippet;
  }
  
  let { children }: Props = $props();
  
  // 라우트 변경 감지 및 네비게이션 상태 동기화
  let currentRoute = $state('');
  
  $effect(() => {
    if (browser && $page?.route?.id) {
      const newRoute = $page.route.id;
      if (newRoute !== currentRoute) {
        currentRoute = newRoute;
        const pageName = getPageFromRoute(newRoute);
        
        // 네비게이션 상태 업데이트
        if (navigationState.currentPage !== pageName) {
          navigationState.currentPage = pageName;
          if (!navigationState.history.includes(pageName)) {
            navigationState.history.push(pageName);
          }
        }
        
        // 브라우저 타이틀 업데이트
        updateBrowserTitle();
        
        // 방문 기록 저장
        analytics.trackPageView(pageName);
      }
    }
  });
  
  // 네비게이션 상태 변경 감지하여 타이틀 업데이트
  $effect(() => {
    if (browser) {
      updateBrowserTitle();
    }
  });
  
  // 테마 초기화
  onMount(() => {
    if (browser) {
      const prefs = userPreferences.get();
      
      // 테마 적용
      document.body.classList.remove('theme-light', 'theme-dark', 'theme-auto');
      document.body.classList.add(`theme-${prefs.theme}`);
      
      // 접근성 설정 적용
      if (prefs.accessibility.reducedMotion) {
        document.body.classList.add('reduced-motion');
      }
      
      if (prefs.accessibility.highContrast) {
        document.body.classList.add('high-contrast');
      }
      
      // 시스템 테마 변경 감지
      if (prefs.theme === 'auto') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleThemeChange = (e: MediaQueryListEvent) => {
          document.documentElement.setAttribute(
            'data-theme', 
            e.matches ? 'dark' : 'light'
          );
        };
        
        // 초기 테마 설정
        document.documentElement.setAttribute(
          'data-theme', 
          mediaQuery.matches ? 'dark' : 'light'
        );
        
        mediaQuery.addEventListener('change', handleThemeChange);
        
        return () => {
          mediaQuery.removeEventListener('change', handleThemeChange);
        };
      }
      
      // 초기 브라우저 타이틀 설정
      updateBrowserTitle();
    }
  });
  
  // 전역 키보드 이벤트 핸들러
  function handleKeydown(event: KeyboardEvent) {
    // ESC로 홈으로 이동
    if (event.key === 'Escape' && navigationState.currentPage !== 'home') {
      event.preventDefault();
      window.location.href = '/';
    }
    
    // Alt + 좌측 화살표로 뒤로 가기
    if (event.altKey && event.key === 'ArrowLeft' && navigationState.history.length > 1) {
      event.preventDefault();
      window.history.back();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
  <meta name="theme-color" content="var(--color-accent-primary)" />
  <meta name="color-scheme" content="light dark" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/10 to-accent-blue/5 
           dark:from-surface-950 dark:via-surface-900 dark:to-surface-950">
  
  <!-- 사이드바 - 항상 표시 -->
  <Sidebar />
  
  <!-- 메인 콘텐츠 영역 -->
  <main class="ml-20 min-h-screen transition-all duration-300 ease-out">
    <div class="relative z-10">
      {@render children()}
    </div>
  </main>
  
  <!-- 글로벌 백그라운드 효과 -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
    <!-- 그라디언트 오브 -->
    <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl 
               animate-pulse-slow"></div>
    <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl 
               animate-pulse-slow" style="animation-delay: 1s;"></div>
  </div>
</div>
