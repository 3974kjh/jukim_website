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
  <title>생각 성운 - JuKim Portfolio</title>
  <meta name="description" content="개발자 JuKim의 일상적인 생각과 경험들이 떠다니는 우주 공간" />
</svelte:head>

<!-- 생각 우주 배경 컨테이너 -->
<div class="min-h-screen relative overflow-hidden thoughts-cosmic-background">
  <!-- 우주 배경 효과 -->
  <div class="cosmic-particles">
    <!-- 생각 별들 -->
    {#each Array(180) as _, i}
      <div class="thought-star" style="
        left: {Math.random() * 100}%;
        top: {Math.random() * 100}%;
        width: {1 + Math.random() * 2.5}px;
        height: {1 + Math.random() * 2.5}px;
        animation-delay: {Math.random() * 4}s;
      "></div>
    {/each}
    
    <!-- 아이디어 성운 효과 -->
    {#each Array(8) as _, i}
      <div class="idea-nebula" style="
        left: {15 + Math.random() * 70}%;
        top: {15 + Math.random() * 70}%;
        width: {150 + Math.random() * 220}px;
        height: {150 + Math.random() * 220}px;
        background: {['radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)', 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)', 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 70%)', 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)'][Math.floor(Math.random() * 4)]};
        animation-delay: {Math.random() * 10}s;
      "></div>
    {/each}
  </div>

  <!-- 생각 궤도 중심점 -->
  <div class="orbital-center">
    <!-- 뒤로가기 버튼 -->
    {#if canGoBack()}
      <button 
        class="cosmic-back-btn content-appear" 
        onclick={goBack}
        aria-label="뒤로가기"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        우주정거장으로 돌아가기
      </button>
    {/if}

    <!-- 중심 제목 -->
    <div class="cosmic-title-section content-appear" style="animation-delay: 0.2s;">
      <h1 class="cosmic-main-title">생각 성운</h1>
      <p class="cosmic-subtitle">개발과 삶에 대한 일상적인 생각들</p>
      <div class="cosmic-central-orb thoughts-orb"></div>
    </div>
  </div>

  <!-- 생각 궤도형 콘텐츠 배치 -->
  <div class="orbital-content-system">
    <!-- 첫 번째 궤도 - 최근 생각들 -->
    <div class="orbital-ring orbit-1">
      <div class="orbital-content-card orbit-content-1 content-card" style="animation-delay: 0.4s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet recent-thoughts-planet"></div>
          <h2>💭 최근 생각들</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="thoughts-intro">
            <p>기술적인 내용뿐만 아니라 일상에서 느끼는 다양한 생각들을 정리하는 공간입니다. 완벽하지 않더라도 자유롭게 생각을 나누고 싶어요.</p>
          </div>
          <div class="recent-thoughts">
            {#each thoughts.slice(0, 2) as thought}
              <div class="thought-preview">
                <div class="thought-emoji">{thought.emoji}</div>
                <div class="thought-details">
                  <h3>{thought.title}</h3>
                  <p class="thought-excerpt">{thought.content.slice(0, 80)}...</p>
                  <div class="thought-meta">
                    <span class="thought-date">{thought.date}</span>
                    <div class="thought-tags-preview">
                      {#each thought.tags.slice(0, 2) as tag}
                        <span class="tag-preview">#{tag}</span>
                      {/each}
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- 두 번째 궤도 - 개발 관련 생각들 -->
    <div class="orbital-ring orbit-2">
      <div class="orbital-content-card orbit-content-2 content-card" style="animation-delay: 0.6s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet dev-thoughts-planet"></div>
          <h2>🔥 개발 관련 성찰</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="dev-thoughts">
            {#each thoughts.filter(t => t.tags.includes('개발') || t.tags.includes('Svelte') || t.tags.includes('기술')) as thought}
              <div class="thought-item tech-thought">
                <div class="thought-header">
                  <span class="thought-emoji">{thought.emoji}</span>
                  <div class="thought-title-section">
                    <h3>{thought.title}</h3>
                    <span class="thought-date">{thought.date}</span>
                  </div>
                </div>
                <p class="thought-content">{thought.content}</p>
                <div class="thought-tags">
                  {#each thought.tags as tag}
                    <span class="thought-tag tech-tag">#{tag}</span>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- 세 번째 궤도 - 철학적 생각들 -->
    <div class="orbital-ring orbit-3">
      <div class="orbital-content-card orbit-content-3 content-card" style="animation-delay: 0.8s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet philosophy-thoughts-planet"></div>
          <h2>⚖️ 철학과 성장</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="philosophy-thoughts">
            {#each thoughts.filter(t => t.tags.includes('철학') || t.tags.includes('성장') || t.tags.includes('경험')) as thought}
              <div class="thought-item philosophy-thought">
                <div class="thought-header">
                  <span class="thought-emoji">{thought.emoji}</span>
                  <div class="thought-title-section">
                    <h3>{thought.title}</h3>
                    <span class="thought-date">{thought.date}</span>
                  </div>
                </div>
                <p class="thought-content">{thought.content}</p>
                <div class="thought-tags">
                  {#each thought.tags as tag}
                    <span class="thought-tag philosophy-tag">#{tag}</span>
                  {/each}
                </div>
                <div class="reading-time">
                  📖 {Math.floor(thought.content.length / 100)} 분 읽기
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- 네 번째 궤도 - 창의성과 영감 -->
    <div class="orbital-ring orbit-4">
      <div class="orbital-content-card orbit-content-4 content-card" style="animation-delay: 1.0s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet creativity-thoughts-planet"></div>
          <h2>🎸 창의성과 영감</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="creativity-thoughts">
            {#each thoughts.filter(t => t.tags.includes('취미') || t.tags.includes('창의성')) as thought}
              <div class="thought-item creativity-thought">
                <div class="thought-header">
                  <span class="thought-emoji">{thought.emoji}</span>
                  <div class="thought-title-section">
                    <h3>{thought.title}</h3>
                    <span class="thought-date">{thought.date}</span>
                  </div>
                </div>
                <p class="thought-content">{thought.content}</p>
                <div class="thought-tags">
                  {#each thought.tags as tag}
                    <span class="thought-tag creativity-tag">#{tag}</span>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- 다섯 번째 궤도 - 글쓰기 철학과 소통 -->
    <div class="orbital-ring orbit-5">
      <div class="orbital-content-card orbit-content-5 content-card" style="animation-delay: 1.2s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet writing-planet"></div>
          <h2>✍️ 글쓰기 철학</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="writing-philosophy">
            <div class="philosophy-section">
              <h3>"잡소리"라는 제목처럼</h3>
              <p>완벽하지 않더라도 솔직하고 자유로운 생각을 나누고 싶습니다.</p>
              
              <div class="philosophy-principles">
                <div class="principle-item">
                  <div class="principle-icon">🔗</div>
                  <span>기술적인 내용과 일상적인 경험을 자연스럽게 연결</span>
                </div>
                <div class="principle-item">
                  <div class="principle-icon">🌊</div>
                  <span>완성된 결론보다는 과정과 고민을 솔직하게 공유</span>
                </div>
                <div class="principle-item">
                  <div class="principle-icon">👁️</div>
                  <span>다양한 관점에서 바라본 개발과 삶의 이야기</span>
                </div>
              </div>
            </div>
            
            <div class="contact-section">
              <h3>💌 생각 공유하기</h3>
              <p>글을 읽고 나서 드는 생각이나 경험이 있다면 언제든 공유해주세요</p>
              <a href="mailto:contact@jukim.dev" class="contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                이메일 보내기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .thoughts-cosmic-background {
    background: radial-gradient(ellipse at center, #1a1a3a 0%, #2a2a4a 30%, #1a1a2e 70%, #000010 100%);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .cosmic-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }

  .thought-star {
    position: absolute;
    background: #a5b4fc;
    border-radius: 50%;
    animation: thoughtTwinkle 4s ease-in-out infinite;
  }

  .idea-nebula {
    position: absolute;
    border-radius: 50%;
    animation: ideaFloat 30s ease-in-out infinite;
    opacity: 0.6;
  }

  @keyframes thoughtTwinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.4); }
  }

  @keyframes ideaFloat {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
    50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
  }

  .orbital-center {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    min-height: 40vh;
    justify-content: center;
  }

  .cosmic-back-btn {
    position: absolute;
    top: 2rem;
    left: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 2rem;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 20;
  }

  .cosmic-back-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  }

  .cosmic-title-section {
    text-align: center;
    position: relative;
  }

  .cosmic-main-title {
    font-size: 4rem;
    font-weight: bold;
    background: linear-gradient(135deg, #6366f1 0%, #0ea5e9 50%, #14b8a6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
  }

  .cosmic-subtitle {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
  }

  .thoughts-orb {
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, #6366f1 0%, #0ea5e9 50%, transparent 100%);
    border-radius: 50%;
    margin: 0 auto;
    animation: centralPulse 3s ease-in-out infinite;
    position: relative;
  }

  .thoughts-orb::before {
    content: '';
    position: absolute;
    inset: -20px;
    border: 2px solid rgba(99, 102, 241, 0.3);
    border-radius: 50%;
    animation: orbitalRing 8s linear infinite;
  }

  @keyframes centralPulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 1; }
  }

  @keyframes orbitalRing {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .orbital-content-system {
    position: relative;
    z-index: 5;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .orbital-ring {
    position: relative;
    margin: 3rem 0;
  }

  .orbital-content-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    padding: 2rem;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .orbit-1 .orbital-content-card {
    max-width: 600px;
    transform: translateX(-12%);
  }

  .orbit-2 .orbital-content-card {
    max-width: 750px;
    transform: translateX(14%);
  }

  .orbit-3 .orbital-content-card {
    max-width: 700px;
    transform: translateX(-8%);
  }

  .orbit-4 .orbital-content-card {
    max-width: 650px;
    transform: translateX(16%);
  }

  .orbit-5 .orbital-content-card {
    max-width: 800px;
    transform: translateX(0%);
  }

  .cosmic-card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .cosmic-card-header h2 {
    font-size: 1.8rem;
    font-weight: bold;
    color: white;
    margin: 0;
  }

  .cosmic-planet {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
    animation: planetRotate 15s linear infinite;
  }

  .recent-thoughts-planet {
    background: radial-gradient(circle at 30% 30%, #6366f1 0%, #4f46e5 50%, #3730a3 100%);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
  }

  .dev-thoughts-planet {
    background: radial-gradient(circle at 30% 30%, #f59e0b 0%, #d97706 50%, #92400e 100%);
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
  }

  .philosophy-thoughts-planet {
    background: radial-gradient(circle at 30% 30%, #8b5cf6 0%, #7c3aed 50%, #5b21b6 100%);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
  }

  .creativity-thoughts-planet {
    background: radial-gradient(circle at 30% 30%, #14b8a6 0%, #0d9488 50%, #065f46 100%);
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.6);
  }

  .writing-planet {
    background: radial-gradient(circle at 30% 30%, #0ea5e9 0%, #0284c7 50%, #0c4a6e 100%);
    box-shadow: 0 0 20px rgba(14, 165, 233, 0.6);
  }

  @keyframes planetRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .cosmic-card-body {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
  }

  .thoughts-intro p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .recent-thoughts {
    space-y: 1rem;
  }

  .thought-preview {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 1rem;
  }

  .thought-emoji {
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .thought-details h3 {
    font-size: 1rem;
    font-weight: bold;
    color: white;
    margin-bottom: 0.5rem;
  }

  .thought-excerpt {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .thought-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .thought-date {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
  }

  .thought-tags-preview {
    display: flex;
    gap: 0.3rem;
  }

  .tag-preview {
    color: rgba(99, 102, 241, 0.8);
    font-size: 0.7rem;
    background: rgba(99, 102, 241, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
  }

  .thought-item {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }

  .thought-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  .thought-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .thought-title-section h3 {
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    margin-bottom: 0.3rem;
  }

  .thought-content {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .thought-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .thought-tag {
    padding: 0.3rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .tech-tag {
    background: rgba(245, 158, 11, 0.2);
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }

  .philosophy-tag {
    background: rgba(139, 92, 246, 0.2);
    color: #8b5cf6;
    border: 1px solid rgba(139, 92, 246, 0.3);
  }

  .creativity-tag {
    background: rgba(20, 184, 166, 0.2);
    color: #14b8a6;
    border: 1px solid rgba(20, 184, 166, 0.3);
  }

  .reading-time {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }

  .writing-philosophy {
    space-y: 2rem;
  }

  .philosophy-section h3,
  .contact-section h3 {
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
    margin-bottom: 1rem;
  }

  .philosophy-section p,
  .contact-section p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
  }

  .philosophy-principles {
    space-y: 1rem;
  }

  .principle-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .principle-icon {
    width: 35px;
    height: 35px;
    background: rgba(14, 165, 233, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .contact-section {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .contact-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    background: rgba(14, 165, 233, 0.3);
    color: white;
    border-radius: 1rem;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid rgba(14, 165, 233, 0.5);
  }

  .contact-link:hover {
    background: rgba(14, 165, 233, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
  }

  /* 콘텐츠 애니메이션 */
  .content-appear {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    animation: contentAppear 0.8s ease-out forwards;
  }

  .content-card {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
    animation: cardAppear 0.6s ease-out forwards;
  }

  @keyframes contentAppear {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes cardAppear {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* 반응형 */
  @media (max-width: 768px) {
    .cosmic-main-title {
      font-size: 2.5rem;
    }

    .orbital-content-card {
      margin: 0 1rem;
      padding: 1.5rem;
    }

    .orbit-1 .orbital-content-card,
    .orbit-2 .orbital-content-card,
    .orbit-3 .orbital-content-card,
    .orbit-4 .orbital-content-card,
    .orbit-5 .orbital-content-card {
      transform: none;
      max-width: none;
    }

    .cosmic-back-btn {
      top: 1rem;
      left: 1rem;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    .thought-header {
      flex-direction: column;
      gap: 0.5rem;
    }

    .thought-preview {
      flex-direction: column;
      gap: 0.8rem;
    }

    .principle-item {
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }
  }
</style> 