<script lang="ts">
  import { canGoBack, goBack } from '$lib/stores/navigation.svelte';
  
</script>

<svelte:head>
  <title>취미 - JuKim Portfolio</title>
  <meta name="description" content="개발자 JuKim의 취미, 관심사, 일상 활동들" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 
           dark:from-surface-950 dark:via-amber-950/20 dark:to-orange-950/20">
  
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
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 
                   bg-clip-text text-transparent leading-tight">
          취미
        </h1>
        <p class="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
          개발 외의 다양한 관심사와 취미 활동들
        </p>
      </div>
    </div>
  </header>
  
  <!-- 메인 콘텐츠 -->
  <main class="relative z-10 pb-20">
    <div class="max-w-6xl mx-auto px-6">
      
      <!-- 현재 취미들 -->
      <section class="mb-16 content-section" style="animation-delay: 0.2s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          🎯 현재 즐기고 있는 것들
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <!-- 음악 -->
          <div class="card hover:scale-105 transition-all duration-300 content-card" style="animation-delay: 0.3s;">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full 
                         flex items-center justify-center text-3xl mx-auto mb-6">
                🎵
              </div>
              <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                음악 감상
              </h3>
              <p class="text-surface-600 dark:text-surface-400 mb-6 leading-relaxed">
                다양한 장르의 음악을 들으며 영감을 얻습니다. 특히 재즈와 클래식을 좋아해요.
              </p>
              
              <div class="space-y-3 text-left">
                <h4 class="font-semibold text-surface-900 dark:text-surface-100">좋아하는 아티스트</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 
                             text-sm rounded-full">Miles Davis</span>
                  <span class="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 
                             text-sm rounded-full">Chopin</span>
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                             text-sm rounded-full">Radiohead</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 독서 -->
          <div class="card hover:scale-105 transition-all duration-300 content-card" style="animation-delay: 0.4s;">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full 
                         flex items-center justify-center text-3xl mx-auto mb-6">
                📚
              </div>
              <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                독서
              </h3>
              <p class="text-surface-600 dark:text-surface-400 mb-6 leading-relaxed">
                기술서적부터 소설까지, 다양한 분야의 책을 통해 지식과 상상력을 넓혀가고 있습니다.
              </p>
              
              <div class="space-y-3 text-left">
                <h4 class="font-semibold text-surface-900 dark:text-surface-100">올해 읽은 책</h4>
                <ul class="text-sm text-surface-600 dark:text-surface-400 space-y-1">
                  <li>• 클린 코드 (로버트 마틴)</li>
                  <li>• 1984 (조지 오웰)</li>
                  <li>• 사피엔스 (유발 하라리)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- 게임 -->
          <div class="card hover:scale-105 transition-all duration-300 content-card" style="animation-delay: 0.5s;">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full 
                         flex items-center justify-center text-3xl mx-auto mb-6">
                🎮
              </div>
              <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                게임
              </h3>
              <p class="text-surface-600 dark:text-surface-400 mb-6 leading-relaxed">
                전략 게임과 퍼즐 게임을 통해 논리적 사고를 기르고 스트레스를 해소합니다.
              </p>
              
              <div class="space-y-3 text-left">
                <h4 class="font-semibold text-surface-900 dark:text-surface-100">즐겨하는 게임</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                             text-sm rounded-full">체스</span>
                  <span class="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 
                             text-sm rounded-full">테트리스</span>
                  <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 
                             text-sm rounded-full">리그 오브 레전드</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 사진 -->
          <div class="card hover:scale-105 transition-all duration-300 content-card" style="animation-delay: 0.6s;">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full 
                         flex items-center justify-center text-3xl mx-auto mb-6">
                📷
              </div>
              <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                사진 촬영
              </h3>
              <p class="text-surface-600 dark:text-surface-400 mb-6 leading-relaxed">
                일상의 순간들을 담으며 다른 관점에서 세상을 바라보는 연습을 하고 있어요.
              </p>
              
              <div class="space-y-3 text-left">
                <h4 class="font-semibold text-surface-900 dark:text-surface-100">좋아하는 피사체</h4>
                <ul class="text-sm text-surface-600 dark:text-surface-400 space-y-1">
                  <li>• 도시 풍경</li>
                  <li>• 카페 분위기</li>
                  <li>• 자연 속 순간들</li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- 요리 -->
          <div class="card hover:scale-105 transition-all duration-300 content-card" style="animation-delay: 0.7s;">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full 
                         flex items-center justify-center text-3xl mx-auto mb-6">
                👨‍🍳
              </div>
              <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                요리
              </h3>
              <p class="text-surface-600 dark:text-surface-400 mb-6 leading-relaxed">
                새로운 레시피에 도전하며 창의성을 기르고, 맛있는 음식으로 사람들과 즐거움을 나눕니다.
              </p>
              
              <div class="space-y-3 text-left">
                <h4 class="font-semibold text-surface-900 dark:text-surface-100">특기 요리</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 
                             text-sm rounded-full">파스타</span>
                  <span class="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 
                             text-sm rounded-full">카레</span>
                  <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 
                             text-sm rounded-full">빵 굽기</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 여행 -->
          <div class="card hover:scale-105 transition-all duration-300 content-card" style="animation-delay: 0.8s;">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-teal-500 to-green-500 rounded-full 
                         flex items-center justify-center text-3xl mx-auto mb-6">
                ✈️
              </div>
              <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                여행
              </h3>
              <p class="text-surface-600 dark:text-surface-400 mb-6 leading-relaxed">
                새로운 문화를 경험하고 다양한 사람들을 만나며 시야를 넓혀가고 있습니다.
              </p>
              
              <div class="space-y-3 text-left">
                <h4 class="font-semibold text-surface-900 dark:text-surface-100">가본 곳들</h4>
                <ul class="text-sm text-surface-600 dark:text-surface-400 space-y-1">
                  <li>• 🇯🇵 일본 (도쿄, 오사카)</li>
                  <li>• 🇹🇭 태국 (방콕, 치앙마이)</li>
                  <li>• 🇰🇷 제주도</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 현재 관심사 -->
      <section class="mb-16 content-section" style="animation-delay: 0.9s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          🔥 현재 빠져있는 것들
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="card border-l-4 border-amber-500 content-card" style="animation-delay: 1.0s;">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center 
                         text-white text-xl flex-shrink-0">
                🎸
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  기타 연주
                </h3>
                <p class="text-surface-600 dark:text-surface-400 mb-4">
                  최근에 어쿠스틱 기타를 배우기 시작했어요. 간단한 코드 진행은 할 수 있게 되었습니다!
                </p>
                <div class="text-sm text-surface-500 dark:text-surface-500">
                  현재 레벨: 초보자 🌱 | 연습 중인 곡: "Stand by Me"
                </div>
              </div>
            </div>
          </div>
          
          <div class="card border-l-4 border-green-500 content-card" style="animation-delay: 1.1s;">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center 
                         text-white text-xl flex-shrink-0">
                🌱
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  식물 키우기
                </h3>
                <p class="text-surface-600 dark:text-surface-400 mb-4">
                  작은 다육식물부터 시작해서 이제는 몬스테라까지! 식물과 함께하는 일상이 좋아요.
                </p>
                <div class="text-sm text-surface-500 dark:text-surface-500">
                  현재 키우는 식물: 7개 🪴 | 가장 자랑스러운: 몬스테라
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 취미와 개발의 연결점 -->
      <section class="mb-16 content-section" style="animation-delay: 1.2s;">
        <h2 class="text-3xl font-bold text-center mb-12 text-surface-900 dark:text-surface-100">
          💡 취미가 개발에 미치는 영향
        </h2>
        
        <div class="max-w-4xl mx-auto">
          <div class="card content-card" style="animation-delay: 1.3s;">
            <div class="text-center mb-8">
              <div class="text-6xl mb-4">🌈</div>
              <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
                "다양한 경험이 더 나은 개발자를 만든다"
              </h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  🎨 창의성과 문제해결
                </h4>
                <ul class="space-y-3 text-surface-600 dark:text-surface-400">
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>음악에서 배운 패턴과 조화가 코드 구조 설계에 도움</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>사진 촬영을 통해 기른 디테일에 대한 감각</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>게임의 전략적 사고가 알고리즘 해결에 기여</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 class="font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  🧘‍♂️ 균형과 지속가능성
                </h4>
                <ul class="space-y-3 text-surface-600 dark:text-surface-400">
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>취미 활동을 통한 스트레스 해소와 재충전</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>다양한 관점에서 문제를 바라보는 능력 향상</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>장기적인 학습과 성장에 대한 인사이트</span>
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
               from-amber-400/20 to-yellow-400/20 rounded-full blur-3xl animate-float"></div>
    <div class="absolute -bottom-96 -left-96 w-96 h-96 bg-gradient-to-br 
               from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-float" 
               style="animation-delay: 2s; animation-direction: reverse;"></div>
  </div>
</div> 