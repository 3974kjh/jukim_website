<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  import MindMap from '$lib/components/MindMap.svelte';
  import { analytics, visitHistory } from '$lib/utils/storage';
  import { navigationState } from '$lib/stores/navigation.svelte';
  
  // 방문 통계
  let visitCount = $state(0);
  let lastVisit = $state<string | null>(null);
  
  onMount(() => {
    console.log('Homepage mounted, browser:', browser);
    
    // 브라우저에서만 실행되는 로직
    if (browser) {
      try {
        console.log('Starting browser-specific initialization...');
        
        // 방문 기록 업데이트
        visitHistory.add('home');
        console.log('Visit history updated');
        
        // 방문 통계 가져오기
        const history = visitHistory.get();
        visitCount = history.filter(page => page === 'home').length;
        console.log('Visit count:', visitCount);
        
        // 분석 데이터 가져오기
        const analyticsData = analytics.get();
        const homeViews = analyticsData.pageViews['home'] || 0;
        console.log('Analytics data loaded, home views:', homeViews);
        
        // 마지막 방문 시간
        lastVisit = new Date().toLocaleDateString('ko-KR');
        console.log('Last visit set:', lastVisit);
        
        console.log('Loading completed immediately');
        
      } catch (error) {
        console.error('Failed to load homepage data:', error);
      }
    } else {
      // SSR 환경에서는 기본값으로 설정
      console.log('SSR environment detected');
      visitCount = 1;
      lastVisit = new Date().toLocaleDateString('ko-KR');
      
      console.log('SSR loading completed immediately');
    }
  });
</script>

<svelte:head>
  <title>나 - JuKim Portfolio</title>
  <meta name="description" content="개발자 JuKim의 포트폴리오입니다. 마인드맵을 통해 개발 여정과 프로젝트들을 탐험해보세요." />
  <meta property="og:title" content="JuKim Portfolio - 개발자의 마인드맵" />
  <meta property="og:description" content="개발 여정과 프로젝트들을 마인드맵 형태로 탐험해보세요" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="relative min-h-screen overflow-hidden">
  <!-- 메인 콘텐츠 - 마인드맵만 표시 -->
  <div class="relative min-h-screen">
    <!-- 마인드맵 섹션 - 전체 화면 -->
    <section class="relative z-10 min-h-screen">
      <MindMap />
    </section>
    
    <!-- 간소화된 푸터 -->
    <footer class="absolute bottom-0 left-20 right-0 z-20 py-4 bg-transparent">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex justify-end items-center">
          <!-- 소셜 링크들만 유지 -->
          <div class="flex space-x-3">
            <a href="mailto:contact@jukim.dev" 
               class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full 
                      flex items-center justify-center hover:bg-white/30 
                      transition-all duration-200 hover:scale-110"
               title="이메일" aria-label="이메일 보내기">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-white">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            
            <a href="https://github.com/jukim" target="_blank" rel="noopener"
               class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full 
                      flex items-center justify-center hover:bg-white/30 
                      transition-all duration-200 hover:scale-110"
               title="GitHub" aria-label="GitHub 프로필">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-white">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
            </a>
            
            <a href="https://linkedin.com/in/jukim" target="_blank" rel="noopener"
               class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full 
                      flex items-center justify-center hover:bg-white/30 
                      transition-all duration-200 hover:scale-110"
               title="LinkedIn" aria-label="LinkedIn 프로필">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-white">
                <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
  
  <!-- 배경 효과 -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
    <!-- 움직이는 그라디언트 -->
    <div class="absolute -top-96 -right-96 w-96 h-96 bg-gradient-to-br 
               from-primary-400/20 to-accent-cyan/20 rounded-full blur-3xl
               animate-float"></div>
    <div class="absolute -bottom-96 -left-96 w-96 h-96 bg-gradient-to-br 
               from-accent-purple/20 to-primary-400/20 rounded-full blur-3xl
               animate-float" style="animation-delay: 2s; animation-direction: reverse;"></div>
  </div>
</div>
