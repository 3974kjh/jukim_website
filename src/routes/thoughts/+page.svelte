<script lang="ts">
  import { canGoBack, goBack } from '$lib/stores/navigation.svelte';
  
  // 생각 정리 데이터
  const thoughts = [
    {
      id: 1,
      date: "2024.12.15",
      title: "개발자가 되기까지의 여정",
      content: "처음 코딩을 시작했을 때는 정말 막막했습니다. 'Hello, World!'를 출력하는 것도 신기했는데, 이제는 복잡한 웹 애플리케이션을 만들고 있네요. 돌이켜보니 가장 중요한 건 꾸준함이었던 것 같아요.",
      tags: ["개발", "회고", "성장"],
      emoji: "🌱"
    },
    {
      id: 2,
      date: "2024.12.10",
      title: "Svelte 5를 사용해본 소감",
      content: "Runes 시스템이 정말 혁신적이네요! React의 useState나 useEffect에 비해 훨씬 직관적이고 깔끔합니다. 특히 $state와 $derived의 조합이 강력해요. 아직 생태계가 작다는 단점이 있지만, 앞으로가 기대됩니다.",
      tags: ["Svelte", "기술", "리뷰"],
      emoji: "🔥"
    },
    {
      id: 3,
      date: "2024.12.05",
      title: "코드 리뷰의 중요성",
      content: "팀에서 코드 리뷰를 도입한 지 6개월이 되었는데, 정말 많은 변화가 있었어요. 버그가 줄어들었을 뿐만 아니라 팀원들 간의 지식 공유도 활발해졌습니다. 처음엔 부담스럽기도 했지만 이제는 없으면 안 될 프로세스가 되었네요.",
      tags: ["팀워크", "프로세스", "품질"],
      emoji: "👥"
    },
    {
      id: 4,
      date: "2024.11.28",
      title: "완벽한 코드는 없다",
      content: "예전에는 완벽한 코드를 작성하려고 너무 집착했던 것 같아요. 하지만 경험이 쌓이면서 '충분히 좋은' 코드가 때로는 더 가치 있다는 걸 깨달았습니다. 과도한 최적화보다는 가독성과 유지보수성이 더 중요하다는 생각이 들어요.",
      tags: ["철학", "경험", "균형"],
      emoji: "⚖️"
    },
    {
      id: 5,
      date: "2024.11.20",
      title: "취미가 개발에 미치는 영향",
      content: "기타를 배우면서 느낀 건데, 음악의 패턴과 리듬이 코딩의 구조와 비슷한 면이 있어요. 반복되는 코드 패턴이나 함수의 흐름을 이해하는 데 도움이 되는 것 같습니다. 다양한 경험이 개발자로서의 사고를 더 풍부하게 만드는 것 같아요.",
      tags: ["취미", "창의성", "학습"],
      emoji: "🎸"
    }
  ];
  
</script>

<svelte:head>
  <title>잡소리 - JuKim Portfolio</title>
  <meta name="description" content="개발자 JuKim의 일상적인 생각과 경험들을 담은 개인적인 이야기" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-cyan-50 to-teal-50 
           dark:from-surface-950 dark:via-indigo-950/20 dark:to-cyan-950/20">
  
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
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-cyan-600 to-teal-600 
                   bg-clip-text text-transparent leading-tight">
          잡소리
        </h1>
        <p class="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto leading-relaxed">
          개발과 삶에 대한 일상적인 생각들을 자유롭게 풀어낸 공간
        </p>
      </div>
    </div>
  </header>
  
  <!-- 메인 콘텐츠 -->
  <main class="relative z-10 pb-20">
    <div class="max-w-4xl mx-auto px-6">
      
      <!-- 인트로 섹션 -->
      <section class="mb-16 content-section" style="animation-delay: 0.2s;">
        <div class="card text-center content-card" style="animation-delay: 0.3s;">
          <div class="text-4xl mb-4">💭</div>
          <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
            개발자의 일상 생각들
          </h2>
          <p class="text-surface-600 dark:text-surface-400 leading-relaxed">
            기술적인 내용뿐만 아니라 일상에서 느끼는 다양한 생각들을 정리하는 공간입니다. 
            완벽하지 않더라도 자유롭게 생각을 나누고 싶어요.
          </p>
        </div>
      </section>
      
      <!-- 생각 정리 아티클들 -->
      <section class="space-y-8 content-section" style="animation-delay: 0.4s;">
        {#each thoughts as thought, index (thought.id)}
          <article class="card hover:shadow-xl transition-all duration-300 content-card" 
                   style="animation-delay: {0.5 + index * 0.1}s;">
            
            <!-- 글 헤더 -->
            <header class="mb-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <span class="text-3xl">{thought.emoji}</span>
                  <div>
                    <h3 class="text-xl font-bold text-surface-900 dark:text-surface-100">
                      {thought.title}
                    </h3>
                    <time class="text-sm text-surface-500 dark:text-surface-500">
                      {thought.date}
                    </time>
                  </div>
                </div>
              </div>
              
              <!-- 태그들 -->
              <div class="flex flex-wrap gap-2">
                {#each thought.tags as tag}
                  <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 
                             text-indigo-800 dark:text-indigo-200 text-sm rounded-full">
                    #{tag}
                  </span>
                {/each}
              </div>
            </header>
            
            <!-- 글 내용 -->
            <div class="prose prose-surface dark:prose-invert max-w-none">
              <p class="text-surface-700 dark:text-surface-300 leading-relaxed">
                {thought.content}
              </p>
            </div>
            
            <!-- 글 푸터 -->
            <footer class="mt-6 pt-4 border-t border-surface-200 dark:border-surface-700">
              <div class="flex items-center justify-between text-sm text-surface-500 dark:text-surface-500">
                <span>#{thought.id}</span>
                <div class="flex items-center gap-4">
                  <span>📖 {Math.floor(thought.content.length / 100)} 분 읽기</span>
                  <span>💬 생각나누기</span>
                </div>
              </div>
            </footer>
            
          </article>
        {/each}
      </section>
      
      <!-- 글쓰기 철학 -->
      <section class="mt-16 content-section" style="animation-delay: 1.0s;">
        <div class="card border-l-4 border-indigo-500 content-card" style="animation-delay: 1.1s;">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center 
                       text-white text-xl flex-shrink-0">
              ✍️
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                글쓰기 철학
              </h3>
              <p class="text-surface-600 dark:text-surface-400 mb-4">
                "잡소리"라는 제목처럼, 완벽하지 않더라도 솔직하고 자유로운 생각을 나누고 싶습니다.
              </p>
              <ul class="text-surface-600 dark:text-surface-400 space-y-2">
                <li>• 기술적인 내용과 일상적인 경험을 자연스럽게 연결</li>
                <li>• 완성된 결론보다는 과정과 고민을 솔직하게 공유</li>
                <li>• 다양한 관점에서 바라본 개발과 삶의 이야기</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 피드백 섹션 -->
      <section class="mt-16 content-section" style="animation-delay: 1.2s;">
        <div class="card text-center content-card" style="animation-delay: 1.3s;">
          <h3 class="text-xl font-bold text-surface-900 dark:text-surface-100 mb-4">
            💌 생각 공유하기
          </h3>
          <p class="text-surface-600 dark:text-surface-400 mb-6">
            글을 읽고 나서 드는 생각이나 경험이 있다면 언제든 공유해주세요
          </p>
          <a href="mailto:contact@jukim.dev" 
             class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white 
                    rounded-lg hover:bg-indigo-600 transition-colors duration-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            이메일 보내기
          </a>
        </div>
      </section>
    </div>
  </main>
  
  <!-- 배경 효과 -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
    <div class="absolute -top-96 -right-96 w-96 h-96 bg-gradient-to-br 
               from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float"></div>
    <div class="absolute -bottom-96 -left-96 w-96 h-96 bg-gradient-to-br 
               from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-float" 
               style="animation-delay: 2s; animation-direction: reverse;"></div>
  </div>
</div> 