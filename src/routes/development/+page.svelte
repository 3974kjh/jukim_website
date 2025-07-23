<script lang="ts">
  import { canGoBack, goBack } from '$lib/stores/navigation.svelte';
  
  // 기술 스택 데이터
  const techStack = [
    { name: 'JavaScript', level: 90, color: 'bg-yellow-500', icon: '⚡' },
    { name: 'TypeScript', level: 85, color: 'bg-blue-500', icon: '🔷' },
    { name: 'React', level: 80, color: 'bg-cyan-500', icon: '⚛️' },
    { name: 'Svelte', level: 75, color: 'bg-orange-500', icon: '🔥' },
    { name: 'Vue.js', level: 70, color: 'bg-green-500', icon: '💚' },
    { name: 'Node.js', level: 75, color: 'bg-green-600', icon: '🟢' },
    { name: 'Python', level: 65, color: 'bg-blue-600', icon: '🐍' },
    { name: 'CSS/Tailwind', level: 88, color: 'bg-purple-500', icon: '🎨' }
  ];
  
</script>

<svelte:head>
  <title>개발 여정 - JuKim Portfolio</title>
  <meta name="description" content="개발자 JuKim의 기술 스택, 언어별 경험, 학습 과정에 대한 상세한 정보" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 
           dark:from-surface-950 dark:via-green-950/20 dark:to-teal-950/20">
  
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
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 
                   bg-clip-text text-transparent leading-tight">
          개발 여정
        </h1>
        <p class="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
          기술 스택, 언어별 경험, 그리고 계속되는 학습 과정에 대한 이야기
        </p>
      </div>
    </div>
  </header>
  
  <!-- 메인 콘텐츠 -->
  <main class="relative z-10 pb-20">
    <div class="max-w-6xl mx-auto px-6">
      
      <!-- 기술 스택 섹션 -->
      <section class="mb-16 content-section" style="animation-delay: 0.2s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          🛠️ 기술 스택 & 숙련도
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {#each techStack as tech, index (tech.name)}
            <div class="card content-card" style="animation-delay: {0.3 + index * 0.05}s;">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">{tech.icon}</span>
                  <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-100">
                    {tech.name}
                  </h3>
                </div>
                <span class="text-sm font-medium text-surface-600 dark:text-surface-400">
                  {tech.level}%
                </span>
              </div>
              
              <!-- 진행률 바 -->
              <div class="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-3 overflow-hidden">
                <div class="h-3 {tech.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                     style="width: {tech.level}%">
                  <!-- 빛나는 효과 -->
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                             animate-pulse"></div>
                </div>
              </div>
            </div>
          {/each}
        </div>
        
        <!-- 기술 카테고리 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card text-center content-card" style="animation-delay: 0.7s;">
            <div class="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center 
                       text-white text-2xl mx-auto mb-4">
              🎯
            </div>
            <h3 class="text-xl font-semibold mb-3 text-surface-900 dark:text-surface-100">
              Frontend
            </h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              사용자 인터페이스와 경험에 집중
            </p>
            <div class="flex flex-wrap gap-2 justify-center">
              <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 
                         text-sm rounded-full">React</span>
              <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 
                         text-sm rounded-full">Svelte</span>
              <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 
                         text-sm rounded-full">Vue.js</span>
            </div>
          </div>
          
          <div class="card text-center content-card" style="animation-delay: 0.8s;">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center 
                       text-white text-2xl mx-auto mb-4">
              ⚙️
            </div>
            <h3 class="text-xl font-semibold mb-3 text-surface-900 dark:text-surface-100">
              Backend
            </h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              서버 사이드 로직과 API 개발
            </p>
            <div class="flex flex-wrap gap-2 justify-center">
              <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 
                         text-sm rounded-full">Node.js</span>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                         text-sm rounded-full">Python</span>
              <span class="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 
                         text-sm rounded-full">Express</span>
            </div>
          </div>
          
          <div class="card text-center content-card" style="animation-delay: 0.9s;">
            <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center 
                       text-white text-2xl mx-auto mb-4">
              🎨
            </div>
            <h3 class="text-xl font-semibold mb-3 text-surface-900 dark:text-surface-100">
              Styling
            </h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              모던하고 반응형인 디자인 구현
            </p>
            <div class="flex flex-wrap gap-2 justify-center">
              <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 
                         text-sm rounded-full">Tailwind</span>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                         text-sm rounded-full">CSS3</span>
              <span class="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 
                         text-sm rounded-full">Sass</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 학습 과정 섹션 -->
      <section class="mb-16 content-section" style="animation-delay: 1.0s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          📚 학습 과정
        </h2>
        
        <div class="space-y-8">
          <!-- 현재 학습 중 -->
          <div class="card border-l-4 border-green-500 content-card" style="animation-delay: 1.1s;">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center 
                         text-white text-xl flex-shrink-0">
                🚀
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  현재 학습 중
                </h3>
                <p class="text-surface-600 dark:text-surface-400 mb-4">
                  최신 기술 트렌드를 따라가며 지속적으로 학습하고 있는 분야들
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-2">
                      🔥 Svelte 5 (Runes)
                    </h4>
                    <p class="text-sm text-surface-600 dark:text-surface-400">
                      새로운 반응성 모델과 최적화된 성능
                    </p>
                  </div>
                  <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-2">
                      ☁️ Cloudflare Pages
                    </h4>
                    <p class="text-sm text-surface-600 dark:text-surface-400">
                      엣지 컴퓨팅과 정적 사이트 배포
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 관심 분야 -->
          <div class="card border-l-4 border-blue-500 content-card" style="animation-delay: 1.2s;">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center 
                         text-white text-xl flex-shrink-0">
                💡
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  관심 분야
                </h3>
                <p class="text-surface-600 dark:text-surface-400 mb-4">
                  앞으로 깊이 있게 학습하고 싶은 기술들
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg text-center">
                    <div class="text-2xl mb-2">🤖</div>
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100">
                      AI/ML
                    </h4>
                    <p class="text-xs text-surface-600 dark:text-surface-400">
                      Machine Learning & AI Integration
                    </p>
                  </div>
                  <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg text-center">
                    <div class="text-2xl mb-2">📱</div>
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100">
                      Mobile Dev
                    </h4>
                    <p class="text-xs text-surface-600 dark:text-surface-400">
                      React Native & Flutter
                    </p>
                  </div>
                  <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg text-center">
                    <div class="text-2xl mb-2">🔐</div>
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100">
                      Web3
                    </h4>
                    <p class="text-xs text-surface-600 dark:text-surface-400">
                      Blockchain & DApps
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 학습 원칙 -->
          <div class="card border-l-4 border-purple-500 content-card" style="animation-delay: 1.3s;">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center 
                         text-white text-xl flex-shrink-0">
                🎯
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  학습 원칙
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                      📖 이론과 실습의 균형
                    </h4>
                    <ul class="space-y-2 text-surface-600 dark:text-surface-400">
                      <li>• 공식 문서 먼저 읽기</li>
                      <li>• 작은 프로젝트로 실습</li>
                      <li>• 코드 리뷰와 피드백</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                      🤝 커뮤니티 참여
                    </h4>
                    <ul class="space-y-2 text-surface-600 dark:text-surface-400">
                      <li>• 오픈소스 기여</li>
                      <li>• 개발 블로그 작성</li>
                      <li>• 기술 컨퍼런스 참석</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 개발 철학 섹션 -->
      <section class="mb-16 content-section" style="animation-delay: 1.4s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          💭 개발 철학
        </h2>
        
        <div class="max-w-4xl mx-auto">
          <div class="card text-center content-card" style="animation-delay: 1.5s;">
            <div class="text-6xl mb-6">🌱</div>
            <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-6">
              "지속 가능한 성장과 협업"
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 class="font-semibold text-green-600 dark:text-green-400 mb-3">
                  🌟 사용자 중심
                </h4>
                <p class="text-surface-600 dark:text-surface-400 text-sm">
                  사용자의 니즈를 이해하고, 직관적이고 접근성 있는 인터페이스를 만드는 것을 우선시합니다.
                </p>
              </div>
              <div>
                <h4 class="font-semibold text-blue-600 dark:text-blue-400 mb-3">
                  🔧 깔끔한 코드
                </h4>
                <p class="text-surface-600 dark:text-surface-400 text-sm">
                  읽기 쉽고 유지보수 가능한 코드를 작성하며, 일관된 컨벤션을 지키려고 노력합니다.
                </p>
              </div>
              <div>
                <h4 class="font-semibold text-purple-600 dark:text-purple-400 mb-3">
                  🤝 팀워크
                </h4>
                <p class="text-surface-600 dark:text-surface-400 text-sm">
                  지식을 공유하고, 서로 배우며 성장할 수 있는 개발 문화를 만들어가는 것을 중요하게 생각합니다.
                </p>
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
               from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-float"></div>
    <div class="absolute -bottom-96 -left-96 w-96 h-96 bg-gradient-to-br 
               from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float" 
               style="animation-delay: 2s; animation-direction: reverse;"></div>
  </div>
</div> 