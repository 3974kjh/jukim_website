<script lang="ts">
  import { canGoBack, goBack } from '$lib/stores/navigation.svelte';
  
  // 개인 프로젝트 데이터
  const projects = [
    {
      id: 1,
      title: "마인드맵 포트폴리오",
      description: "Svelte 5와 Tailwind CSS로 구축한 인터랙티브 개인 포트폴리오",
      image: "🗺️",
      tech: ["Svelte 5", "Tailwind CSS", "TypeScript", "Cloudflare Pages"],
      status: "현재 개발 중",
      github: "https://github.com/jukim/portfolio",
      demo: "https://jukim.dev",
      features: ["마인드맵 네비게이션", "다크모드 지원", "반응형 디자인", "접근성 최적화"]
    },
    {
      id: 2,
      title: "할 일 관리 앱",
      description: "React와 Firebase를 활용한 실시간 협업 투두 리스트",
      image: "✅",
      tech: ["React", "Firebase", "Material-UI", "PWA"],
      status: "완료",
      github: "https://github.com/jukim/todo-app",
      demo: "https://todo.jukim.dev",
      features: ["실시간 동기화", "오프라인 지원", "팀 협업", "알림 기능"]
    },
    {
      id: 3,
      title: "날씨 대시보드",
      description: "OpenWeather API를 활용한 시각적 날씨 정보 대시보드",
      image: "🌤️",
      tech: ["Vue.js", "Chart.js", "Axios", "Sass"],
      status: "완료",
      github: "https://github.com/jukim/weather-dashboard",
      demo: "https://weather.jukim.dev",
      features: ["실시간 날씨", "주간 예보", "차트 시각화", "위치 기반 서비스"]
    }
  ];
  
</script>

<svelte:head>
  <title>개인프로젝트 - JuKim Portfolio</title>
  <meta name="description" content="개발자 JuKim의 개인 프로젝트들과 포트폴리오 모음" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 
           dark:from-surface-950 dark:via-purple-950/20 dark:to-pink-950/20">
  
  <!-- 헤더 -->
  <header class="relative z-20 pt-8 pb-12">
    <div class="max-w-6xl mx-auto px-6">
      <!-- 뒤로가기 버튼 -->
      {#if canGoBack()}
        <button 
          class="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-surface-800/80 
                 backdrop-blur-sm rounded-lg border border-surface-200 dark:border-surface-700
                 hover:bg-white dark:hover:bg-surface-800 transition-all duration-200
                 text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400
                 content-appear"
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
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 
                   bg-clip-text text-transparent leading-tight">
          개인프로젝트
        </h1>
        <p class="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
          창의적인 아이디어를 실현하고 새로운 기술을 탐험하는 개인 프로젝트들
        </p>
      </div>
    </div>
  </header>
  
  <!-- 메인 콘텐츠 -->
  <main class="relative z-10 pb-20">
    <div class="max-w-6xl mx-auto px-6">
      
      <!-- 프로젝트 갤러리 -->
      <section class="mb-16 content-section" style="animation-delay: 0.2s;">
        <div class="grid gap-8">
          {#each projects as project, index (project.id)}
            <div class="card hover:shadow-2xl transition-all duration-500 content-card" 
                 style="animation-delay: {0.3 + index * 0.1}s;">
              
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- 프로젝트 이미지/아이콘 -->
                <div class="lg:col-span-1">
                  <div class="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 
                             rounded-2xl flex items-center justify-center text-6xl 
                             hover:scale-105 transition-transform duration-300">
                    {project.image}
                  </div>
                  
                  <!-- 상태 배지 -->
                  <div class="mt-4 text-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                               {project.status === '완료' 
                                 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                 : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}">
                      {project.status === '완료' ? '✅' : '🚧'} {project.status}
                    </span>
                  </div>
                </div>
                
                <!-- 프로젝트 정보 -->
                <div class="lg:col-span-2">
                  <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-3">
                    {project.title}
                  </h3>
                  
                  <p class="text-surface-600 dark:text-surface-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <!-- 기술 스택 -->
                  <div class="mb-6">
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                      🛠️ 사용 기술
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      {#each project.tech as tech}
                        <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 
                                   text-purple-800 dark:text-purple-200 text-sm rounded-full">
                          {tech}
                        </span>
                      {/each}
                    </div>
                  </div>
                  
                  <!-- 주요 기능 -->
                  <div class="mb-6">
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                      ⭐ 주요 기능
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {#each project.features as feature}
                        <div class="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                          <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                          {feature}
                        </div>
                      {/each}
                    </div>
                  </div>
                  
                  <!-- 링크 버튼들 -->
                  <div class="flex flex-wrap gap-4">
                    <a href={project.github} target="_blank" rel="noopener"
                       class="inline-flex items-center gap-2 px-4 py-2 bg-surface-900 dark:bg-surface-100 
                              text-white dark:text-surface-900 rounded-lg hover:bg-surface-800 
                              dark:hover:bg-surface-200 transition-colors duration-200">
                      <span>⚡</span>
                      GitHub
                    </a>
                    
                    <a href={project.demo} target="_blank" rel="noopener"
                       class="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white 
                              rounded-lg hover:bg-purple-600 transition-colors duration-200">
                      <span>🚀</span>
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </section>
      
      <!-- 현재 작업 중인 프로젝트 -->
      <section class="mb-16 content-section" style="animation-delay: 0.6s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          🔄 현재 작업 중
        </h2>
        
        <div class="card border-l-4 border-purple-500 content-card" style="animation-delay: 0.7s;">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center 
                       text-white text-xl flex-shrink-0 animate-pulse">
              🚧
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                E-Commerce Platform
              </h3>
              <p class="text-surface-600 dark:text-surface-400 mb-4">
                Next.js와 Stripe를 활용한 풀스택 이커머스 플랫폼 개발 중. 
                관리자 대시보드, 결제 시스템, 인벤토리 관리 등을 포함한 완전한 솔루션을 목표로 하고 있습니다.
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                    📋 계획된 기능
                  </h4>
                  <ul class="space-y-2 text-surface-600 dark:text-surface-400">
                    <li>• 상품 카탈로그 및 검색</li>
                    <li>• 장바구니 및 위시리스트</li>
                    <li>• 사용자 인증 및 프로필</li>
                    <li>• 주문 관리 시스템</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                    🛠️ 기술 스택
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                               text-sm rounded-full">Next.js</span>
                    <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 
                               text-sm rounded-full">Stripe</span>
                    <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 
                               text-sm rounded-full">Prisma</span>
                    <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 
                               text-sm rounded-full">PostgreSQL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 프로젝트 아이디어 -->
      <section class="mb-16 content-section" style="animation-delay: 0.8s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          💡 향후 프로젝트 아이디어
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="card hover:scale-105 transition-transform duration-300 content-card" 
               style="animation-delay: 0.9s;">
            <div class="text-center">
              <div class="text-4xl mb-4">🎵</div>
              <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                음악 스트리밍 플랫폼
              </h3>
              <p class="text-surface-600 dark:text-surface-400 text-sm">
                Web Audio API를 활용한 음악 플레이어 및 플레이리스트 관리
              </p>
            </div>
          </div>
          
          <div class="card hover:scale-105 transition-transform duration-300 content-card" 
               style="animation-delay: 1.0s;">
            <div class="text-center">
              <div class="text-4xl mb-4">🤖</div>
              <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                AI 챗봇 인터페이스
              </h3>
              <p class="text-surface-600 dark:text-surface-400 text-sm">
                OpenAI API를 활용한 대화형 AI 어시스턴트 웹 앱
              </p>
            </div>
          </div>
          
          <div class="card hover:scale-105 transition-transform duration-300 content-card" 
               style="animation-delay: 1.1s;">
            <div class="text-center">
              <div class="text-4xl mb-4">📱</div>
              <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                모바일 피트니스 트래커
              </h3>
              <p class="text-surface-600 dark:text-surface-400 text-sm">
                React Native로 구축한 운동 기록 및 건강 관리 앱
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  
  <!-- 배경 효과 -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
    <div class="absolute -top-96 -right-96 w-96 h-96 bg-gradient-to-br 
               from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
    <div class="absolute -bottom-96 -left-96 w-96 h-96 bg-gradient-to-br 
               from-rose-400/20 to-orange-400/20 rounded-full blur-3xl animate-float" 
               style="animation-delay: 2s; animation-direction: reverse;"></div>
  </div>
</div> 