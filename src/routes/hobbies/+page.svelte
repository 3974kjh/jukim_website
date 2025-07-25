<script lang="ts">
  import { canGoBack, goBack } from '$lib/stores/navigation.svelte';
</script>

<svelte:head>
  <title>취미 우주 - JuKim Portfolio</title>
  <meta name="description" content="개발자 JuKim의 취미, 관심사, 일상 활동들을 우주에서 탐험해보세요" />
</svelte:head>

<!-- 취미 우주 배경 컨테이너 -->
<div class="min-h-screen relative overflow-hidden hobby-cosmic-background">
  <!-- 우주 배경 효과 -->
  <div class="cosmic-particles">
    <!-- 별들 -->
    {#each Array(200) as _, i}
      <div class="cosmic-star" style="
        left: {Math.random() * 100}%;
        top: {Math.random() * 100}%;
        width: {1 + Math.random() * 2}px;
        height: {1 + Math.random() * 2}px;
        animation-delay: {Math.random() * 3}s;
      "></div>
    {/each}
    
    <!-- 취미 성운 효과 -->
    {#each Array(10) as _, i}
      <div class="hobby-nebula" style="
        left: {10 + Math.random() * 80}%;
        top: {10 + Math.random() * 80}%;
        width: {120 + Math.random() * 250}px;
        height: {120 + Math.random() * 250}px;
        background: {['radial-gradient(circle, rgba(255, 107, 107, 0.15) 0%, transparent 70%)', 'radial-gradient(circle, rgba(78, 205, 196, 0.15) 0%, transparent 70%)', 'radial-gradient(circle, rgba(168, 230, 207, 0.15) 0%, transparent 70%)', 'radial-gradient(circle, rgba(255, 193, 7, 0.15) 0%, transparent 70%)'][Math.floor(Math.random() * 4)]};
        animation-delay: {Math.random() * 8}s;
      "></div>
    {/each}
  </div>

  <!-- 취미 궤도 중심점 -->
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
      <h1 class="cosmic-main-title">취미 은하계</h1>
      <p class="cosmic-subtitle">개발 외의 다양한 관심사와 활동들</p>
      <div class="cosmic-central-orb hobby-orb"></div>
    </div>
  </div>

  <!-- 취미 궤도형 콘텐츠 배치 -->
  <div class="orbital-content-system">
    <!-- 첫 번째 궤도 - 창작 활동 -->
    <div class="orbital-ring orbit-1">
      <div class="orbital-content-card orbit-content-1 content-card" style="animation-delay: 0.4s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet creative-planet"></div>
          <h2>🎨 창작 활동</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="hobby-group">
            <div class="hobby-item featured">
              <div class="hobby-icon">🎵</div>
              <div class="hobby-details">
                <h3>음악 감상 & 연주</h3>
                <p>다양한 장르를 들으며 영감을 얻고, 최근엔 기타 연주도 배우고 있어요</p>
                <div class="hobby-tags">
                  <span class="hobby-tag music">Jazz</span>
                  <span class="hobby-tag music">Classical</span>
                  <span class="hobby-tag music">기타 연주</span>
                </div>
              </div>
            </div>
            
            <div class="hobby-item">
              <div class="hobby-icon">📷</div>
              <div class="hobby-details">
                <h3>사진 촬영</h3>
                <p>일상의 순간들을 담으며 다른 관점에서 세상을 바라보는 연습</p>
                <div class="hobby-tags">
                  <span class="hobby-tag photo">도시 풍경</span>
                  <span class="hobby-tag photo">카페 분위기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 두 번째 궤도 - 학습 활동 -->
    <div class="orbital-ring orbit-2">
      <div class="orbital-content-card orbit-content-2 content-card" style="animation-delay: 0.6s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet learning-planet"></div>
          <h2>📚 학습과 탐구</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="hobby-group">
            <div class="hobby-item featured">
              <div class="hobby-icon">📖</div>
              <div class="hobby-details">
                <h3>독서</h3>
                <p>기술서적부터 소설까지, 다양한 분야의 책으로 지식과 상상력을 넓혀가기</p>
                <div class="reading-list">
                  <div class="book-item">• 클린 코드 (로버트 마틴)</div>
                  <div class="book-item">• 1984 (조지 오웰)</div>
                  <div class="book-item">• 사피엔스 (유발 하라리)</div>
                </div>
              </div>
            </div>
            
            <div class="hobby-item">
              <div class="hobby-icon">🎮</div>
              <div class="hobby-details">
                <h3>전략 게임</h3>
                <p>논리적 사고를 기르고 스트레스를 해소하는 시간</p>
                <div class="hobby-tags">
                  <span class="hobby-tag game">체스</span>
                  <span class="hobby-tag game">테트리스</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 세 번째 궤도 - 생활 활동 -->
    <div class="orbital-ring orbit-3">
      <div class="orbital-content-card orbit-content-3 content-card" style="animation-delay: 0.8s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet lifestyle-planet"></div>
          <h2>🏠 일상 생활</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="hobby-group">
            <div class="hobby-item featured">
              <div class="hobby-icon">👨‍🍳</div>
              <div class="hobby-details">
                <h3>요리</h3>
                <p>새로운 레시피에 도전하며 창의성을 기르고 맛있는 음식 만들기</p>
                <div class="hobby-tags">
                  <span class="hobby-tag cooking">파스타</span>
                  <span class="hobby-tag cooking">카레</span>
                  <span class="hobby-tag cooking">빵 굽기</span>
                </div>
              </div>
            </div>
            
            <div class="hobby-item">
              <div class="hobby-icon">🌱</div>
              <div class="hobby-details">
                <h3>식물 키우기</h3>
                <p>다육식물부터 몬스테라까지, 식물과 함께하는 일상</p>
                <div class="plant-status">
                  <div class="status-item">현재 키우는 식물: 7개 🪴</div>
                  <div class="status-item">가장 자랑스러운: 몬스테라</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 네 번째 궤도 - 모험과 경험 -->
    <div class="orbital-ring orbit-4">
      <div class="orbital-content-card orbit-content-4 content-card" style="animation-delay: 1.0s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet adventure-planet"></div>
          <h2>✈️ 모험과 경험</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="hobby-group">
            <div class="hobby-item featured">
              <div class="hobby-icon">🗺️</div>
              <div class="hobby-details">
                <h3>여행</h3>
                <p>새로운 문화를 경험하고 다양한 사람들을 만나며 시야 넓히기</p>
                <div class="travel-list">
                  <div class="travel-item">🇯🇵 일본 (도쿄, 오사카)</div>
                  <div class="travel-item">🇹🇭 태국 (방콕, 치앙마이)</div>
                  <div class="travel-item">🇰🇷 제주도</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 다섯 번째 궤도 - 취미와 개발의 연결점 -->
    <div class="orbital-ring orbit-5">
      <div class="orbital-content-card orbit-content-5 content-card" style="animation-delay: 1.2s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet connection-planet"></div>
          <h2>💡 취미가 개발에 미치는 영향</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="connection-insights">
            <div class="insight-item">
              <h3>🎨 창의성과 문제해결</h3>
              <ul class="insight-list">
                <li>음악의 패턴과 조화가 코드 구조 설계에 도움</li>
                <li>사진 촬영을 통해 기른 디테일에 대한 감각</li>
                <li>게임의 전략적 사고가 알고리즘 해결에 기여</li>
              </ul>
            </div>
            
            <div class="insight-item">
              <h3>🧘‍♂️ 균형과 지속가능성</h3>
              <ul class="insight-list">
                <li>취미 활동을 통한 스트레스 해소와 재충전</li>
                <li>다양한 관점에서 문제를 바라보는 능력 향상</li>
                <li>장기적인 학습과 성장에 대한 인사이트</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .hobby-cosmic-background {
    background: radial-gradient(ellipse at center, #2a1810 0%, #1a2c3a 30%, #0f1419 70%, #000000 100%);
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

  .cosmic-star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: starTwinkle 3s ease-in-out infinite;
  }

  .hobby-nebula {
    position: absolute;
    border-radius: 50%;
    animation: nebulaFloat 25s ease-in-out infinite;
    opacity: 0.4;
  }

  @keyframes starTwinkle {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }

  @keyframes nebulaFloat {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
    50% { transform: scale(1.15) rotate(180deg); opacity: 0.6; }
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
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
  }

  .cosmic-title-section {
    text-align: center;
    position: relative;
  }

  .cosmic-main-title {
    font-size: 4rem;
    font-weight: bold;
    background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 50%, #42a5f5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(255, 107, 107, 0.5);
  }

  .cosmic-subtitle {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
  }

  .hobby-orb {
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, #ff6b6b 0%, #ffa726 50%, transparent 100%);
    border-radius: 50%;
    margin: 0 auto;
    animation: centralPulse 3s ease-in-out infinite;
    position: relative;
  }

  .hobby-orb::before {
    content: '';
    position: absolute;
    inset: -20px;
    border: 2px solid rgba(255, 107, 107, 0.3);
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
    max-width: 650px;
    transform: translateX(-15%);
  }

  .orbit-2 .orbital-content-card {
    max-width: 700px;
    transform: translateX(15%);
  }

  .orbit-3 .orbital-content-card {
    max-width: 750px;
    transform: translateX(-10%);
  }

  .orbit-4 .orbital-content-card {
    max-width: 700px;
    transform: translateX(12%);
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
    animation: planetRotate 12s linear infinite;
  }

  .creative-planet {
    background: radial-gradient(circle at 30% 30%, #ff6b6b 0%, #e91e63 50%, #c2185b 100%);
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.6);
  }

  .learning-planet {
    background: radial-gradient(circle at 30% 30%, #4ecdc4 0%, #26a69a 50%, #00695c 100%);
    box-shadow: 0 0 20px rgba(78, 205, 196, 0.6);
  }

  .lifestyle-planet {
    background: radial-gradient(circle at 30% 30%, #ffa726 0%, #ff9800 50%, #f57c00 100%);
    box-shadow: 0 0 20px rgba(255, 167, 38, 0.6);
  }

  .adventure-planet {
    background: radial-gradient(circle at 30% 30%, #42a5f5 0%, #1976d2 50%, #0d47a1 100%);
    box-shadow: 0 0 20px rgba(66, 165, 245, 0.6);
  }

  .connection-planet {
    background: radial-gradient(circle at 30% 30%, #ab47bc 0%, #8e24aa 50%, #4a148c 100%);
    box-shadow: 0 0 20px rgba(171, 71, 188, 0.6);
  }

  @keyframes planetRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .cosmic-card-body {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
  }

  .hobby-group {
    space-y: 1.5rem;
  }

  .hobby-item {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 1rem;
    transition: all 0.3s ease;
  }

  .hobby-item.featured {
    border-color: rgba(255, 107, 107, 0.3);
    box-shadow: 0 4px 20px rgba(255, 107, 107, 0.1);
  }

  .hobby-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  .hobby-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    flex-shrink: 0;
  }

  .hobby-details h3 {
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
    margin-bottom: 0.5rem;
  }

  .hobby-details p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1rem;
  }

  .hobby-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .hobby-tag {
    padding: 0.3rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .hobby-tag.music {
    background: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
    border: 1px solid rgba(255, 107, 107, 0.3);
  }

  .hobby-tag.photo {
    background: rgba(255, 167, 38, 0.2);
    color: #ffa726;
    border: 1px solid rgba(255, 167, 38, 0.3);
  }

  .hobby-tag.game {
    background: rgba(66, 165, 245, 0.2);
    color: #42a5f5;
    border: 1px solid rgba(66, 165, 245, 0.3);
  }

  .hobby-tag.cooking {
    background: rgba(255, 167, 38, 0.2);
    color: #ffa726;
    border: 1px solid rgba(255, 167, 38, 0.3);
  }

  .reading-list, .travel-list, .plant-status {
    margin-top: 1rem;
  }

  .book-item, .travel-item, .status-item {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }

  .connection-insights {
    space-y: 1.5rem;
  }

  .insight-item {
    margin-bottom: 1.5rem;
  }

  .insight-item h3 {
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    margin-bottom: 0.8rem;
  }

  .insight-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .insight-list li {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;
  }

  .insight-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: rgba(171, 71, 188, 0.8);
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

    .hobby-item {
      flex-direction: column;
      gap: 1rem;
    }

    .hobby-icon {
      align-self: flex-start;
    }
  }
</style> 