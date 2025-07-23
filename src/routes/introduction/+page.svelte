<script lang="ts">
  import { canGoBack, goBack } from '$lib/stores/navigation.svelte';
  
</script>

<svelte:head>
  <title>나의 소개 및 일대기 - JuKim Portfolio</title>
  <meta name="description" content="개발자 JuKim의 개인정보, 학력, 경력에 대한 상세한 소개" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 
           dark:from-surface-950 dark:via-blue-950/20 dark:to-purple-950/20">
  
  <!-- 헤더 -->
  <header class="relative z-20 pt-8 pb-12">
    <div class="max-w-6xl mx-auto px-6">
      <!-- 뒤로가기 버튼 -->
      {#if canGoBack()}
        <button 
          class="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-surface-800/80 
                 backdrop-blur-sm rounded-lg border border-surface-200 dark:border-surface-700
                 hover:bg-white dark:hover:bg-surface-800 transition-all duration-200
                 text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400"
          onclick={goBack}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          마인드맵으로 돌아가기
        </button>
      {/if}
      
      <!-- 페이지 제목 -->
      <div class="text-center mb-12 content-appear" style="animation-delay: 0.1s;">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                   bg-clip-text text-transparent leading-tight">
          나의 소개 및 일대기
        </h1>
        <p class="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
          개발자로서의 여정과 개인적인 이야기를 담은 자기소개입니다
        </p>
      </div>
    </div>
  </header>
  
  <!-- 메인 콘텐츠 -->
  <main class="relative z-10 pb-20">
    <div class="max-w-6xl mx-auto px-6">
      
      <!-- 프로필 섹션 -->
      <section class="mb-16 content-section" style="animation-delay: 0.2s;">
        <div class="card max-w-4xl mx-auto content-card" style="animation-delay: 0.3s;">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <!-- 프로필 이미지 -->
            <div class="flex-shrink-0">
              <div class="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full 
                         flex items-center justify-center text-white text-5xl font-bold
                         shadow-lg hover:shadow-xl transition-all duration-300">
                👋
              </div>
            </div>
            
            <!-- 기본 정보 -->
            <div class="flex-1 text-center md:text-left">
              <h2 class="text-3xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                김주현 (JuKim)
              </h2>
              <p class="text-lg text-surface-600 dark:text-surface-400 mb-6 leading-relaxed">
                안녕하세요! 사용자 경험을 중시하고 깔끔한 코드를 작성하는 것을 좋아하는 개발자입니다. 
                새로운 기술을 배우고 적용하는 것에 관심이 많으며, 팀과 함께 성장하는 것을 중요하게 생각합니다.
              </p>
              
              <!-- 연락처 정보 -->
              <div class="flex flex-wrap justify-center md:justify-start gap-4">
                <a href="mailto:contact@jukim.dev" 
                   class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg
                          hover:bg-blue-600 transition-colors duration-200">
                  <span>✉️</span>
                  contact@jukim.dev
                </a>
                <a href="https://github.com/jukim" target="_blank" rel="noopener"
                   class="inline-flex items-center gap-2 px-4 py-2 bg-surface-100 dark:bg-surface-800 
                          text-surface-700 dark:text-surface-300 rounded-lg
                          hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors duration-200">
                  <span>⚡</span>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 타임라인 섹션 -->
      <section class="mb-16 content-section" style="animation-delay: 0.4s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          개발자 여정 타임라인
        </h2>
        
        <div class="relative">
          <!-- 타임라인 선 -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b 
                     from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
          
          <!-- 타임라인 아이템들 -->
          <div class="space-y-12">
            <!-- 2024년 -->
            <div class="relative flex items-center content-card" style="animation-delay: 0.5s;">
              <div class="flex-1 pr-8 text-right">
                <div class="card">
                  <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                    개인 포트폴리오 웹사이트 구축
                  </h3>
                  <p class="text-surface-600 dark:text-surface-400 mb-3">
                    Svelte 5와 Tailwind CSS를 활용한 인터랙티브 마인드맵 포트폴리오
                  </p>
                  <div class="flex flex-wrap gap-2 justify-end">
                    <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                               text-sm rounded-full">Svelte 5</span>
                    <span class="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 
                               text-sm rounded-full">Tailwind CSS</span>
                  </div>
                </div>
              </div>
              
              <!-- 중앙 점 -->
              <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 
                         rounded-full border-4 border-white dark:border-surface-900 z-10
                         shadow-lg"></div>
              
              <!-- 연도 -->
              <div class="flex-1 pl-8">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  2024
                </div>
              </div>
            </div>
            
            <!-- 2023년 -->
            <div class="relative flex items-center content-card" style="animation-delay: 0.6s;">
              <!-- 연도 -->
              <div class="flex-1 pr-8 text-right">
                <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  2023
                </div>
              </div>
              
              <!-- 중앙 점 -->
              <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-indigo-500 
                         rounded-full border-4 border-white dark:border-surface-900 z-10
                         shadow-lg"></div>
              
              <div class="flex-1 pl-8">
                <div class="card">
                  <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                    프론트엔드 개발 심화 학습
                  </h3>
                  <p class="text-surface-600 dark:text-surface-400 mb-3">
                    React, Vue.js 등 모던 프론트엔드 프레임워크와 TypeScript 숙련도 향상
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 
                               text-sm rounded-full">React</span>
                    <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 
                               text-sm rounded-full">Vue.js</span>
                    <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                               text-sm rounded-full">TypeScript</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 2022년 -->
            <div class="relative flex items-center content-card" style="animation-delay: 0.7s;">
              <div class="flex-1 pr-8 text-right">
                <div class="card">
                  <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                    개발 입문 및 기초 학습
                  </h3>
                  <p class="text-surface-600 dark:text-surface-400 mb-3">
                    HTML, CSS, JavaScript 기초부터 시작하여 웹 개발의 전반적인 이해 구축
                  </p>
                  <div class="flex flex-wrap gap-2 justify-end">
                    <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 
                               text-sm rounded-full">HTML/CSS</span>
                    <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 
                               text-sm rounded-full">JavaScript</span>
                  </div>
                </div>
              </div>
              
              <!-- 중앙 점 -->
              <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-500 
                         rounded-full border-4 border-white dark:border-surface-900 z-10
                         shadow-lg"></div>
              
              <!-- 연도 -->
              <div class="flex-1 pl-8">
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  2022
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 개인정보 섹션 -->
      <section class="mb-16 content-section" style="animation-delay: 0.8s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          개인 정보
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- 기본 정보 -->
          <div class="card content-card" style="animation-delay: 0.9s;">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center 
                         text-white text-2xl mx-auto mb-4">
                👤
              </div>
              <h3 class="text-xl font-semibold mb-3 text-surface-900 dark:text-surface-100">
                기본 정보
              </h3>
              <div class="space-y-2 text-surface-600 dark:text-surface-400">
                <p><strong>이름:</strong> 김주현</p>
                <p><strong>거주지:</strong> 서울, 대한민국</p>
                <p><strong>언어:</strong> 한국어, 영어</p>
              </div>
            </div>
          </div>
          
          <!-- 학력 -->
          <div class="card content-card" style="animation-delay: 1.0s;">
            <div class="text-center">
              <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center 
                         text-white text-2xl mx-auto mb-4">
                🎓
              </div>
              <h3 class="text-xl font-semibold mb-3 text-surface-900 dark:text-surface-100">
                학력
              </h3>
              <div class="space-y-2 text-surface-600 dark:text-surface-400">
                <p><strong>대학교:</strong> 컴퓨터공학과</p>
                <p><strong>졸업:</strong> 2022년</p>
                <p><strong>주요과목:</strong> 알고리즘, 데이터구조</p>
              </div>
            </div>
          </div>
          
          <!-- 관심사 -->
          <div class="card content-card" style="animation-delay: 1.1s;">
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center 
                         text-white text-2xl mx-auto mb-4">
                ❤️
              </div>
              <h3 class="text-xl font-semibold mb-3 text-surface-900 dark:text-surface-100">
                관심사
              </h3>
              <div class="space-y-2 text-surface-600 dark:text-surface-400">
                <p>🎵 음악 감상</p>
                <p>📚 독서</p>
                <p>🎮 게임</p>
                <p>✈️ 여행</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  
  <!-- 배경 효과 -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
    <div class="absolute -top-96 -right-96 w-96 h-96 bg-gradient-to-br 
               from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float"></div>
    <div class="absolute -bottom-96 -left-96 w-96 h-96 bg-gradient-to-br 
               from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" 
               style="animation-delay: 2s; animation-direction: reverse;"></div>
  </div>
</div> 