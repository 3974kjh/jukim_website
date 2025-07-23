<script lang="ts">
  import { canGoBack, goBack } from '$lib/stores/navigation.svelte';
  
</script>

<svelte:head>
  <title>회사프로젝트 - JuKim Portfolio</title>
  <meta name="description" content="개발자 JuKim의 회사 및 팀 프로젝트 경험과 성과" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 
           dark:from-surface-950 dark:via-slate-950/20 dark:to-zinc-950/20">
  
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
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 
                   bg-clip-text text-transparent leading-tight">
          회사프로젝트
        </h1>
        <p class="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
          팀과 함께 성장하며 실무에서 경험한 프로젝트들과 성과
        </p>
      </div>
    </div>
  </header>
  
  <!-- 메인 콘텐츠 -->
  <main class="relative z-10 pb-20">
    <div class="max-w-6xl mx-auto px-6">
      
      <!-- 프로젝트 타임라인 -->
      <section class="mb-16 content-section" style="animation-delay: 0.2s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          🏢 프로젝트 경험
        </h2>
        
        <div class="space-y-8">
          <!-- 프로젝트 1 -->
          <div class="card border-l-4 border-blue-500 content-card" style="animation-delay: 0.3s;">
            <div class="flex items-start gap-6">
              <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center 
                         text-white text-2xl flex-shrink-0">
                🌐
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-100">
                      글로벌 이커머스 플랫폼 리뉴얼
                    </h3>
                    <p class="text-surface-600 dark:text-surface-400">
                      2024.03 - 현재 | 프론트엔드 개발자
                    </p>
                  </div>
                  <span class="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 
                             text-sm rounded-full">진행 중</span>
                </div>
                
                <p class="text-surface-600 dark:text-surface-400 mb-6 leading-relaxed">
                  레거시 시스템을 React와 TypeScript로 마이그레이션하며 사용자 경험 개선과 
                  성능 최적화를 통해 전환율 25% 향상을 달성했습니다.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                      📊 주요 성과
                    </h4>
                    <ul class="space-y-2 text-surface-600 dark:text-surface-400">
                      <li>• 페이지 로딩 속도 40% 개선</li>
                      <li>• 전환율 25% 향상</li>
                      <li>• 코드 재사용성 60% 증가</li>
                      <li>• 버그 리포트 50% 감소</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                      🛠️ 기술 스택
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                                 text-sm rounded-full">React</span>
                      <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                                 text-sm rounded-full">TypeScript</span>
                      <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 
                                 text-sm rounded-full">Node.js</span>
                      <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 
                                 text-sm rounded-full">GraphQL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 프로젝트 2 -->
          <div class="card border-l-4 border-green-500 content-card" style="animation-delay: 0.4s;">
            <div class="flex items-start gap-6">
              <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center 
                         text-white text-2xl flex-shrink-0">
                📱
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-100">
                      모바일 앱 웹뷰 개발
                    </h3>
                    <p class="text-surface-600 dark:text-surface-400">
                      2023.09 - 2024.02 | 풀스택 개발자
                    </p>
                  </div>
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 
                             text-sm rounded-full">완료</span>
                </div>
                
                <p class="text-surface-600 dark:text-surface-400 mb-6 leading-relaxed">
                  크로스플랫폼 모바일 앱 내 웹뷰 인터페이스 개발로 네이티브와 동일한 
                  사용자 경험을 제공하며 개발 비용 30% 절감에 기여했습니다.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                      📊 주요 성과
                    </h4>
                    <ul class="space-y-2 text-surface-600 dark:text-surface-400">
                      <li>• 개발 비용 30% 절감</li>
                      <li>• 배포 시간 50% 단축</li>
                      <li>• 앱 스토어 평점 4.5/5.0</li>
                      <li>• 월 활성 사용자 200% 증가</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                      🛠️ 기술 스택
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 
                                 text-sm rounded-full">Vue.js</span>
                      <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 
                                 text-sm rounded-full">Cordova</span>
                      <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                                 text-sm rounded-full">Express</span>
                      <span class="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 
                                 text-sm rounded-full">Redis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 팀워크 및 협업 -->
      <section class="mb-16 content-section" style="animation-delay: 0.5s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          🤝 팀워크 & 협업
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="card text-center content-card" style="animation-delay: 0.6s;">
            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center 
                       text-white text-2xl mx-auto mb-4">
              👥
            </div>
            <h3 class="text-xl font-semibold mb-3 text-surface-900 dark:text-surface-100">
              크로스 팀 협업
            </h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              디자인, 백엔드, QA 팀과의 원활한 소통으로 프로젝트 성공률 향상
            </p>
            <div class="text-sm text-surface-500 dark:text-surface-500">
              15명 규모 프로젝트 참여
            </div>
          </div>
          
          <div class="card text-center content-card" style="animation-delay: 0.7s;">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center 
                       text-white text-2xl mx-auto mb-4">
              📋
            </div>
            <h3 class="text-xl font-semibold mb-3 text-surface-900 dark:text-surface-100">
              애자일 방법론
            </h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              스크럼 마스터 역할을 수행하며 팀 생산성과 커뮤니케이션 개선
            </p>
            <div class="text-sm text-surface-500 dark:text-surface-500">
              6개월 스크럼 마스터 경험
            </div>
          </div>
          
          <div class="card text-center content-card" style="animation-delay: 0.8s;">
            <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center 
                       text-white text-2xl mx-auto mb-4">
              📚
            </div>
            <h3 class="text-xl font-semibold mb-3 text-surface-900 dark:text-surface-100">
              멘토링
            </h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              신입 개발자 온보딩과 코드 리뷰를 통한 팀 전체 기술 역량 향상
            </p>
            <div class="text-sm text-surface-500 dark:text-surface-500">
              3명 주니어 개발자 멘토링
            </div>
          </div>
        </div>
      </section>
      
      <!-- 학습한 점들 -->
      <section class="mb-16 content-section" style="animation-delay: 0.9s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          💡 프로젝트를 통해 배운 점들
        </h2>
        
        <div class="max-w-4xl mx-auto">
          <div class="card content-card" style="animation-delay: 1.0s;">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  🔧 기술적 성장
                </h3>
                <ul class="space-y-3 text-surface-600 dark:text-surface-400">
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>대규모 레거시 코드베이스 마이그레이션 경험</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>성능 최적화 및 모니터링 시스템 구축</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>CI/CD 파이프라인 구성과 자동화</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  🤝 소프트 스킬
                </h3>
                <ul class="space-y-3 text-surface-600 dark:text-surface-400">
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>다양한 이해관계자와의 커뮤니케이션</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>프로젝트 일정 관리와 우선순위 설정</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>위기 상황에서의 빠른 문제 해결</span>
                  </li>
                </ul>
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
               from-slate-400/20 to-gray-400/20 rounded-full blur-3xl animate-float"></div>
    <div class="absolute -bottom-96 -left-96 w-96 h-96 bg-gradient-to-br 
               from-zinc-400/20 to-stone-400/20 rounded-full blur-3xl animate-float" 
               style="animation-delay: 2s; animation-direction: reverse;"></div>
  </div>
</div> 