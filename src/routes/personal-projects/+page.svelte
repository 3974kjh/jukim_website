<script lang="ts">
  import { canGoBack, goBack } from '$lib/stores/navigation.svelte';
</script>

<svelte:head>
  <title>개인 프로젝트 - JuKim Portfolio</title>
  <meta name="description" content="개발자 JuKim의 개인 프로젝트들을 별자리 형태로 탐험해보세요." />
</svelte:head>

<!-- 프로젝트 별자리 우주 -->
<div class="min-h-screen relative overflow-hidden project-cosmos">
  <!-- 별자리 배경 -->
  <div class="constellation-bg">
    <!-- 프로젝트 별들 -->
    {#each Array(180) as _, i}
      <div class="project-star" style="
        left: {Math.random() * 100}%;
        top: {Math.random() * 100}%;
        width: {1 + Math.random() * 4}px;
        height: {1 + Math.random() * 4}px;
        animation-delay: {Math.random() * 5}s;
        background: {['#ffd700', '#ff69b4', '#00ffff', '#ff4500', '#9370db', '#32cd32'][Math.floor(Math.random() * 6)]};
      "></div>
    {/each}
    
    <!-- 코딩 혜성 -->
    {#each Array(4) as _, i}
      <div class="coding-comet" style="
        left: {Math.random() * 30}%;
        top: {Math.random() * 40}%;
        animation-delay: {Math.random() * 20}s;
      "></div>
    {/each}
    
    <!-- 프로젝트 성운 -->
    {#each Array(5) as _, i}
      <div class="project-nebula" style="
        left: {20 + Math.random() * 60}%;
        top: {20 + Math.random() * 60}%;
        width: {200 + Math.random() * 300}px;
        height: {200 + Math.random() * 300}px;
        background: {['radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)', 'radial-gradient(circle, rgba(255, 105, 180, 0.1) 0%, transparent 70%)', 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)'][Math.floor(Math.random() * 3)]};
        animation-delay: {Math.random() * 15}s;
      "></div>
    {/each}
  </div>

  <!-- 별자리 중심부 -->
  <div class="constellation-center">
    <!-- 뒤로가기 -->
    {#if canGoBack()}
      <button class="cosmic-back-btn content-appear" onclick={goBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        목성 궤도로 돌아가기
      </button>
    {/if}

    <!-- 중심 별자리 -->
    <div class="constellation-title content-appear" style="animation-delay: 0.2s;">
      <h1 class="project-main-title">목성 창작 궤도</h1>
      <p class="project-subtitle">개인 프로젝트 별자리</p>
      <div class="project-central-star"></div>
    </div>
  </div>

  <!-- 프로젝트 별자리들 -->
  <div class="constellation-system">
    <!-- 웹 프로젝트 별자리 -->
    <div class="constellation-group web-constellation">
      <div class="project-constellation-card web-projects content-card" style="animation-delay: 0.4s;">
        <div class="constellation-header">
          <div class="constellation-star web-star"></div>
          <h2>웹 프로젝트 별자리</h2>
        </div>
        <div class="constellation-body">
          <div class="project-cluster">
            <div class="project-item featured">
              <div class="project-icon">🌐</div>
              <div class="project-info">
                <h3>포트폴리오 웹사이트</h3>
                <p>Svelte 5 + Tailwind CSS로 구현한 인터랙티브 마인드맵 포트폴리오</p>
                <div class="project-tech">
                  <span class="tech-tag svelte">Svelte 5</span>
                  <span class="tech-tag tailwind">Tailwind</span>
                  <span class="tech-tag cloudflare">Cloudflare</span>
                </div>
                <div class="project-links">
                  <a href="#" class="project-link">🔗 Live Demo</a>
                  <a href="#" class="project-link">📂 GitHub</a>
                </div>
              </div>
            </div>
            <div class="project-item">
              <div class="project-icon">📝</div>
              <div class="project-info">
                <h3>블로그 플랫폼</h3>
                <p>Next.js와 MDX로 구현한 개발 블로그</p>
                <div class="project-tech">
                  <span class="tech-tag react">Next.js</span>
                  <span class="tech-tag markdown">MDX</span>
                </div>
              </div>
            </div>
            <div class="project-item">
              <div class="project-icon">🎨</div>
              <div class="project-info">
                <h3>UI 컴포넌트 라이브러리</h3>
                <p>재사용 가능한 React 컴포넌트 모음</p>
                <div class="project-tech">
                  <span class="tech-tag react">React</span>
                  <span class="tech-tag storybook">Storybook</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 모바일 앱 별자리 -->
    <div class="constellation-group mobile-constellation">
      <div class="project-constellation-card mobile-projects content-card" style="animation-delay: 0.6s;">
        <div class="constellation-header">
          <div class="constellation-star mobile-star"></div>
          <h2>모바일 앱 별자리</h2>
        </div>
        <div class="constellation-body">
          <div class="project-cluster">
            <div class="project-item featured">
              <div class="project-icon">📱</div>
              <div class="project-info">
                <h3>할일 관리 앱</h3>
                <p>React Native로 개발한 크로스플랫폼 할일 관리 애플리케이션</p>
                <div class="project-tech">
                  <span class="tech-tag react">React Native</span>
                  <span class="tech-tag expo">Expo</span>
                  <span class="tech-tag firebase">Firebase</span>
                </div>
                <div class="project-links">
                  <a href="#" class="project-link">📱 App Store</a>
                  <a href="#" class="project-link">📂 GitHub</a>
                </div>
              </div>
            </div>
            <div class="project-item">
              <div class="project-icon">📊</div>
              <div class="project-info">
                <h3>운동 기록 앱</h3>
                <p>Flutter로 구현한 운동 추적 앱</p>
                <div class="project-tech">
                  <span class="tech-tag flutter">Flutter</span>
                  <span class="tech-tag dart">Dart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 도구 및 유틸리티 별자리 -->
    <div class="constellation-group tools-constellation">
      <div class="project-constellation-card tools-projects content-card" style="animation-delay: 0.8s;">
        <div class="constellation-header">
          <div class="constellation-star tools-star"></div>
          <h2>도구 별자리</h2>
        </div>
        <div class="constellation-body">
          <div class="project-cluster">
            <div class="project-item featured">
              <div class="project-icon">🛠️</div>
              <div class="project-info">
                <h3>개발 도구 모음</h3>
                <p>일상 개발에 도움이 되는 CLI 도구들</p>
                <div class="project-tech">
                  <span class="tech-tag node">Node.js</span>
                  <span class="tech-tag typescript">TypeScript</span>
                  <span class="tech-tag cli">CLI</span>
                </div>
                <div class="project-links">
                  <a href="#" class="project-link">📦 NPM</a>
                  <a href="#" class="project-link">📂 GitHub</a>
                </div>
              </div>
            </div>
            <div class="project-item">
              <div class="project-icon">🎨</div>
              <div class="project-info">
                <h3>CSS 애니메이션 생성기</h3>
                <p>인터랙티브한 CSS 애니메이션 생성 도구</p>
                <div class="project-tech">
                  <span class="tech-tag vanilla">Vanilla JS</span>
                  <span class="tech-tag css">CSS3</span>
                </div>
              </div>
            </div>
            <div class="project-item">
              <div class="project-icon">🔧</div>
              <div class="project-info">
                <h3>API 테스트 도구</h3>
                <p>RESTful API 테스트를 위한 웹 도구</p>
                <div class="project-tech">
                  <span class="tech-tag vue">Vue.js</span>
                  <span class="tech-tag axios">Axios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 실험적 프로젝트 별자리 -->
    <div class="constellation-group experimental-constellation">
      <div class="project-constellation-card experimental-projects content-card" style="animation-delay: 1.0s;">
        <div class="constellation-header">
          <div class="constellation-star experimental-star"></div>
          <h2>실험 별자리</h2>
        </div>
        <div class="constellation-body">
          <div class="project-cluster">
            <div class="project-item featured">
              <div class="project-icon">🔬</div>
              <div class="project-info">
                <h3>WebGL 인터랙티브 아트</h3>
                <p>Three.js를 활용한 3D 웹 경험</p>
                <div class="project-tech">
                  <span class="tech-tag threejs">Three.js</span>
                  <span class="tech-tag webgl">WebGL</span>
                  <span class="tech-tag glsl">GLSL</span>
                </div>
                <div class="project-links">
                  <a href="#" class="project-link">🎨 Demo</a>
                  <a href="#" class="project-link">📂 GitHub</a>
                </div>
              </div>
            </div>
            <div class="project-item">
              <div class="project-icon">🤖</div>
              <div class="project-info">
                <h3>AI 챗봇 실험</h3>
                <p>OpenAI API를 활용한 대화형 AI</p>
                <div class="project-tech">
                  <span class="tech-tag openai">OpenAI</span>
                  <span class="tech-tag python">Python</span>
                </div>
              </div>
            </div>
            <div class="project-item">
              <div class="project-icon">🎮</div>
              <div class="project-info">
                <h3>브라우저 게임</h3>
                <p>HTML5 Canvas로 제작한 2D 게임</p>
                <div class="project-tech">
                  <span class="tech-tag canvas">Canvas</span>
                  <span class="tech-tag javascript">JavaScript</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .project-cosmos {
    background: radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 30%, #0f0f23 70%, #000011 100%);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .constellation-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }

  .project-star {
    position: absolute;
    border-radius: 50%;
    animation: starTwinkle 5s ease-in-out infinite;
    box-shadow: 0 0 8px currentColor;
  }

  .coding-comet {
    position: absolute;
    width: 4px;
    height: 80px;
    background: linear-gradient(180deg, #ffd700 0%, #ff69b4 50%, transparent 100%);
    border-radius: 50%;
    animation: cometFall 15s linear infinite;
    transform: rotate(25deg);
  }

  .coding-comet::before {
    content: '';
    position: absolute;
    top: 0;
    left: -30px;
    width: 60px;
    height: 2px;
    background: linear-gradient(to right, transparent, #ffd700, transparent);
    animation: cometTail 15s linear infinite;
  }

  .project-nebula {
    position: absolute;
    border-radius: 50%;
    animation: nebulaGlow 30s ease-in-out infinite;
    opacity: 0.3;
  }

  @keyframes starTwinkle {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.4); }
  }

  @keyframes cometFall {
    0% { transform: translateY(-100px) translateX(-50px) rotate(25deg); opacity: 1; }
    100% { transform: translateY(100vh) translateX(100px) rotate(25deg); opacity: 0; }
  }

  @keyframes cometTail {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.3; }
  }

  @keyframes nebulaGlow {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
    50% { transform: scale(1.1) rotate(180deg); opacity: 0.5; }
  }

  .constellation-center {
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
    background: rgba(26, 26, 46, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 2rem;
    color: #ffd700;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 20;
  }

  .cosmic-back-btn:hover {
    background: rgba(255, 215, 0, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
  }

  .constellation-title {
    text-align: center;
    position: relative;
  }

  .project-main-title {
    font-size: 4rem;
    font-weight: bold;
    background: linear-gradient(135deg, #ffd700 0%, #ff69b4 50%, #00ffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
  }

  .project-subtitle {
    font-size: 1.5rem;
    color: rgba(255, 215, 0, 0.9);
    margin-bottom: 2rem;
  }

  .project-central-star {
    width: 120px;
    height: 120px;
    background: conic-gradient(#ffd700, #ff69b4, #00ffff, #ff4500, #ffd700);
    border-radius: 50%;
    margin: 0 auto;
    animation: centralStarRotate 10s linear infinite;
    position: relative;
    box-shadow: 0 0 50px rgba(255, 215, 0, 0.6);
  }

  .project-central-star::before {
    content: '';
    position: absolute;
    inset: -25px;
    border: 2px solid rgba(255, 215, 0, 0.4);
    border-radius: 50%;
    animation: starOrbit 15s linear infinite reverse;
  }

  @keyframes centralStarRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes starOrbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .constellation-system {
    position: relative;
    z-index: 5;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .constellation-group {
    position: relative;
  }

  .project-constellation-card {
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 215, 0, 0.2);
    border-radius: 2rem;
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .project-constellation-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(255, 215, 0, 0.2);
    border-color: rgba(255, 215, 0, 0.4);
  }

  .web-projects {
    border-color: rgba(255, 215, 0, 0.3);
  }

  .mobile-projects {
    border-color: rgba(255, 105, 180, 0.3);
  }

  .tools-projects {
    border-color: rgba(0, 255, 255, 0.3);
  }

  .experimental-projects {
    border-color: rgba(255, 69, 0, 0.3);
  }

  .constellation-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .constellation-header h2 {
    font-size: 2rem;
    font-weight: bold;
    color: white;
    margin: 0;
  }

  .constellation-star {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: relative;
    animation: constellationRotate 20s linear infinite;
  }

  .web-star {
    background: conic-gradient(#ffd700, #ffeb3b, #ffc107, #ffd700);
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.7);
  }

  .mobile-star {
    background: conic-gradient(#ff69b4, #e91e63, #ad1457, #ff69b4);
    box-shadow: 0 0 30px rgba(255, 105, 180, 0.7);
  }

  .tools-star {
    background: conic-gradient(#00ffff, #00bcd4, #0097a7, #00ffff);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.7);
  }

  .experimental-star {
    background: conic-gradient(#ff4500, #ff5722, #d84315, #ff4500);
    box-shadow: 0 0 30px rgba(255, 69, 0, 0.7);
  }

  @keyframes constellationRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .constellation-body {
    color: rgba(255, 255, 255, 0.9);
  }

  .project-cluster {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .project-item {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .project-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(8px);
  }

  .project-item.featured {
    border-color: rgba(255, 215, 0, 0.3);
    background: rgba(255, 215, 0, 0.05);
  }

  .project-icon {
    font-size: 2rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    flex-shrink: 0;
  }

  .project-info {
    flex: 1;
  }

  .project-info h3 {
    margin: 0 0 0.5rem 0;
    color: white;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .project-info p {
    margin: 0 0 1rem 0;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.5;
  }

  .project-tech {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .tech-tag {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid;
  }

  .tech-tag.svelte {
    background: rgba(255, 62, 0, 0.2);
    border-color: rgba(255, 62, 0, 0.4);
    color: #ff6231;
  }

  .tech-tag.react {
    background: rgba(97, 218, 251, 0.2);
    border-color: rgba(97, 218, 251, 0.4);
    color: #61dafb;
  }

  .tech-tag.vue {
    background: rgba(65, 184, 131, 0.2);
    border-color: rgba(65, 184, 131, 0.4);
    color: #4fc08d;
  }

  .tech-tag.node {
    background: rgba(104, 160, 99, 0.2);
    border-color: rgba(104, 160, 99, 0.4);
    color: #68a063;
  }

  .tech-tag.typescript {
    background: rgba(49, 120, 198, 0.2);
    border-color: rgba(49, 120, 198, 0.4);
    color: #3178c6;
  }

  .project-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 215, 0, 0.1);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 0.5rem;
    color: #ffd700;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }

  .project-link:hover {
    background: rgba(255, 215, 0, 0.2);
    transform: translateY(-2px);
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
    .project-main-title {
      font-size: 2.5rem;
    }

    .constellation-system {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 1rem;
    }

    .project-constellation-card {
      padding: 1.5rem;
    }

    .cosmic-back-btn {
      top: 1rem;
      left: 1rem;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    .project-item {
      flex-direction: column;
      text-align: center;
    }

    .project-links {
      justify-content: center;
    }
  }
</style> 