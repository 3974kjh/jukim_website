<script lang="ts">
  import { canGoBack, goBack } from '$lib/stores/navigation.svelte';
</script>

<svelte:head>
  <title>개발 여정 - JuKim Portfolio</title>
  <meta name="description" content="개발자 JuKim의 기술 스택과 학습 여정을 담은 페이지입니다." />
</svelte:head>

<!-- 우주 기술 궤도 시스템 -->
<div class="min-h-screen relative overflow-hidden tech-cosmos">
  <!-- 우주 배경 -->
  <div class="cosmic-particles">
    <!-- 코딩 별들 -->
    {#each Array(200) as _, i}
      <div class="tech-star" style="
        left: {Math.random() * 100}%;
        top: {Math.random() * 100}%;
        width: {1 + Math.random() * 3}px;
        height: {1 + Math.random() * 3}px;
        animation-delay: {Math.random() * 4}s;
        background: {['#61dafb', '#f7df1e', '#e34c26', '#1572b6', '#68217a', '#ff6b6b'][Math.floor(Math.random() * 6)]};
      "></div>
    {/each}
    
    <!-- 데이터 성운 -->
    {#each Array(6) as _, i}
      <div class="data-nebula" style="
        left: {15 + Math.random() * 70}%;
        top: {15 + Math.random() * 70}%;
        width: {150 + Math.random() * 250}px;
        height: {150 + Math.random() * 250}px;
        background: {['radial-gradient(circle, rgba(97, 218, 251, 0.1) 0%, transparent 70%)', 'radial-gradient(circle, rgba(247, 223, 30, 0.1) 0%, transparent 70%)', 'radial-gradient(circle, rgba(227, 76, 38, 0.1) 0%, transparent 70%)'][Math.floor(Math.random() * 3)]};
        animation-delay: {Math.random() * 10}s;
      "></div>
    {/each}
  </div>

  <!-- 기술 중심핵 -->
  <div class="tech-orbital-center">
    <!-- 뒤로가기 -->
    {#if canGoBack()}
      <button class="cosmic-back-btn content-appear" onclick={goBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        화성 기지로 돌아가기
      </button>
    {/if}

    <!-- 중심 기술 코어 -->
    <div class="tech-core-section content-appear" style="animation-delay: 0.2s;">
      <h1 class="tech-main-title">화성 기술 기지</h1>
      <p class="tech-subtitle">개발 여정과 기술 진화</p>
      <div class="tech-central-core"></div>
    </div>
  </div>

  <!-- 기술 궤도 시스템 -->
  <div class="tech-orbital-system">
    <!-- 첫 번째 궤도 - 프론트엔드 기술 -->
    <div class="tech-ring orbit-frontend">
      <div class="tech-content-card frontend-orbit content-card" style="animation-delay: 0.4s;">
        <div class="tech-card-header">
          <div class="tech-planet frontend-planet"></div>
          <h2>프론트엔드 은하</h2>
        </div>
        <div class="tech-card-body">
          <div class="tech-category">
            <h3>🎨 UI 프레임워크</h3>
            <div class="tech-skills">
              <div class="skill-item react">
                <span class="skill-name">React</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 90%"></div>
                </div>
                <span class="skill-years">3년</span>
              </div>
              <div class="skill-item vue">
                <span class="skill-name">Vue.js</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 85%"></div>
                </div>
                <span class="skill-years">2년</span>
              </div>
              <div class="skill-item svelte">
                <span class="skill-name">Svelte</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 75%"></div>
                </div>
                <span class="skill-years">1년</span>
              </div>
            </div>
          </div>
          <div class="tech-category">
            <h3>🎯 핵심 기술</h3>
            <div class="tech-skills">
              <div class="skill-item js">
                <span class="skill-name">JavaScript</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 95%"></div>
                </div>
                <span class="skill-years">4년</span>
              </div>
              <div class="skill-item ts">
                <span class="skill-name">TypeScript</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 88%"></div>
                </div>
                <span class="skill-years">2.5년</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 두 번째 궤도 - 백엔드 기술 -->
    <div class="tech-ring orbit-backend">
      <div class="tech-content-card backend-orbit content-card" style="animation-delay: 0.6s;">
        <div class="tech-card-header">
          <div class="tech-planet backend-planet"></div>
          <h2>백엔드 성단</h2>
        </div>
        <div class="tech-card-body">
          <div class="tech-category">
            <h3>⚡ 서버 기술</h3>
            <div class="tech-skills">
              <div class="skill-item node">
                <span class="skill-name">Node.js</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 85%"></div>
                </div>
                <span class="skill-years">3년</span>
              </div>
              <div class="skill-item express">
                <span class="skill-name">Express.js</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 90%"></div>
                </div>
                <span class="skill-years">3년</span>
              </div>
              <div class="skill-item spring">
                <span class="skill-name">Spring Boot</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 75%"></div>
                </div>
                <span class="skill-years">1.5년</span>
              </div>
            </div>
          </div>
          <div class="tech-category">
            <h3>🗄️ 데이터베이스</h3>
            <div class="tech-skills">
              <div class="skill-item mongodb">
                <span class="skill-name">MongoDB</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 80%"></div>
                </div>
                <span class="skill-years">2.5년</span>
              </div>
              <div class="skill-item postgresql">
                <span class="skill-name">PostgreSQL</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 70%"></div>
                </div>
                <span class="skill-years">2년</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 세 번째 궤도 - 도구 및 환경 -->
    <div class="tech-ring orbit-tools">
      <div class="tech-content-card tools-orbit content-card" style="animation-delay: 0.8s;">
        <div class="tech-card-header">
          <div class="tech-planet tools-planet"></div>
          <h2>도구 우주정거장</h2>
        </div>
        <div class="tech-card-body">
          <div class="tech-category">
            <h3>🔧 개발 도구</h3>
            <div class="tech-skills">
              <div class="skill-item vscode">
                <span class="skill-name">VS Code</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 95%"></div>
                </div>
                <span class="skill-years">4년</span>
              </div>
              <div class="skill-item git">
                <span class="skill-name">Git</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 90%"></div>
                </div>
                <span class="skill-years">4년</span>
              </div>
              <div class="skill-item docker">
                <span class="skill-name">Docker</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 75%"></div>
                </div>
                <span class="skill-years">2년</span>
              </div>
            </div>
          </div>
          <div class="tech-category">
            <h3>☁️ 클라우드</h3>
            <div class="tech-skills">
              <div class="skill-item aws">
                <span class="skill-name">AWS</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 70%"></div>
                </div>
                <span class="skill-years">1.5년</span>
              </div>
              <div class="skill-item vercel">
                <span class="skill-name">Vercel</span>
                <div class="skill-level">
                  <div class="skill-progress" style="width: 85%"></div>
                </div>
                <span class="skill-years">2년</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 네 번째 궤도 - 학습 여정 -->
    <div class="tech-ring orbit-journey">
      <div class="tech-content-card journey-orbit content-card" style="animation-delay: 1.0s;">
        <div class="tech-card-header">
          <div class="tech-planet journey-planet"></div>
          <h2>학습 시간선</h2>
        </div>
        <div class="tech-card-body">
          <div class="journey-timeline">
            <div class="timeline-item">
              <div class="timeline-date">2024</div>
              <div class="timeline-content">
                <h3>고급 프론트엔드 아키텍처</h3>
                <p>Svelte 5, 마이크로프론트엔드, 성능 최적화</p>
                <div class="timeline-tags">
                  <span class="tag">Svelte 5</span>
                  <span class="tag">Performance</span>
                </div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">2023</div>
              <div class="timeline-content">
                <h3>풀스택 개발 역량 강화</h3>
                <p>TypeScript, Node.js 고급, 클라우드 인프라</p>
                <div class="timeline-tags">
                  <span class="tag">TypeScript</span>
                  <span class="tag">AWS</span>
                </div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">2022</div>
              <div class="timeline-content">
                <h3>모던 웹 프레임워크 습득</h3>
                <p>React, Vue.js 심화 학습과 상태관리</p>
                <div class="timeline-tags">
                  <span class="tag">React</span>
                  <span class="tag">Vue.js</span>
                </div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">2021</div>
              <div class="timeline-content">
                <h3>웹 개발 기초 완성</h3>
                <p>JavaScript ES6+, CSS 고급, 반응형 디자인</p>
                <div class="timeline-tags">
                  <span class="tag">JavaScript</span>
                  <span class="tag">CSS</span>
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
  .tech-cosmos {
    background: radial-gradient(ellipse at center, #2d1b69 0%, #0f0f23 40%, #000000 100%);
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

  .tech-star {
    position: absolute;
    border-radius: 50%;
    animation: techStarPulse 4s ease-in-out infinite;
    box-shadow: 0 0 6px currentColor;
  }

  .data-nebula {
    position: absolute;
    border-radius: 50%;
    animation: dataFlow 25s ease-in-out infinite;
    opacity: 0.4;
  }

  @keyframes techStarPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }

  @keyframes dataFlow {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
    50% { transform: scale(1.2) rotate(180deg); opacity: 0.6; }
  }

  .tech-orbital-center {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    min-height: 35vh;
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
    background: rgba(45, 27, 105, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(97, 218, 251, 0.3);
    border-radius: 2rem;
    color: #61dafb;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 20;
  }

  .cosmic-back-btn:hover {
    background: rgba(97, 218, 251, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(97, 218, 251, 0.3);
  }

  .tech-core-section {
    text-align: center;
    position: relative;
  }

  .tech-main-title {
    font-size: 4rem;
    font-weight: bold;
    background: linear-gradient(135deg, #61dafb 0%, #f7df1e 50%, #e34c26 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(97, 218, 251, 0.5);
  }

  .tech-subtitle {
    font-size: 1.5rem;
    color: rgba(97, 218, 251, 0.9);
    margin-bottom: 2rem;
  }

  .tech-central-core {
    width: 100px;
    height: 100px;
    background: conic-gradient(#61dafb, #f7df1e, #e34c26, #1572b6, #61dafb);
    border-radius: 50%;
    margin: 0 auto;
    animation: techCoreSpin 8s linear infinite;
    position: relative;
    box-shadow: 0 0 40px rgba(97, 218, 251, 0.5);
  }

  .tech-central-core::before {
    content: '';
    position: absolute;
    inset: -30px;
    border: 2px solid rgba(97, 218, 251, 0.3);
    border-radius: 50%;
    animation: coreOrbit 12s linear infinite reverse;
  }

  @keyframes techCoreSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes coreOrbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .tech-orbital-system {
    position: relative;
    z-index: 5;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .tech-ring {
    position: relative;
    margin: 4rem 0;
  }

  .tech-content-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(97, 218, 251, 0.2);
    border-radius: 1.5rem;
    padding: 2.5rem;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .frontend-orbit {
    max-width: 650px;
    transform: translateX(-12%);
    border-color: rgba(97, 218, 251, 0.3);
  }

  .backend-orbit {
    max-width: 700px;
    transform: translateX(12%);
    border-color: rgba(104, 33, 122, 0.3);
  }

  .tools-orbit {
    max-width: 750px;
    transform: translateX(-8%);
    border-color: rgba(247, 223, 30, 0.3);
  }

  .journey-orbit {
    max-width: 800px;
    transform: translateX(8%);
    border-color: rgba(227, 76, 38, 0.3);
  }

  .tech-card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .tech-card-header h2 {
    font-size: 2rem;
    font-weight: bold;
    color: white;
    margin: 0;
  }

  .tech-planet {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
    animation: techPlanetRotate 15s linear infinite;
  }

  .frontend-planet {
    background: conic-gradient(#61dafb, #1572b6, #e34c26, #61dafb);
    box-shadow: 0 0 25px rgba(97, 218, 251, 0.6);
  }

  .backend-planet {
    background: conic-gradient(#68217a, #47a248, #f7df1e, #68217a);
    box-shadow: 0 0 25px rgba(104, 33, 122, 0.6);
  }

  .tools-planet {
    background: conic-gradient(#f7df1e, #ff9500, #007acc, #f7df1e);
    box-shadow: 0 0 25px rgba(247, 223, 30, 0.6);
  }

  .journey-planet {
    background: conic-gradient(#e34c26, #ff6b6b, #764ba2, #e34c26);
    box-shadow: 0 0 25px rgba(227, 76, 38, 0.6);
  }

  @keyframes techPlanetRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .tech-card-body {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
  }

  .tech-category {
    margin-bottom: 2rem;
  }

  .tech-category h3 {
    font-size: 1.3rem;
    color: rgba(97, 218, 251, 0.9);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .tech-skills {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .skill-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.75rem;
    transition: all 0.3s ease;
  }

  .skill-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }

  .skill-name {
    font-weight: 600;
    min-width: 120px;
    color: white;
  }

  .skill-level {
    flex: 1;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .skill-progress {
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, #61dafb, #f7df1e);
    transition: width 1s ease-out;
    position: relative;
  }

  .skill-progress::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: skillShine 2s ease-in-out infinite;
  }

  @keyframes skillShine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .skill-years {
    font-size: 0.9rem;
    color: rgba(97, 218, 251, 0.8);
    min-width: 50px;
    text-align: right;
  }

  .journey-timeline {
    position: relative;
  }

  .journey-timeline::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #61dafb, #e34c26);
  }

  .timeline-item {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    position: relative;
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: 11px;
    top: 8px;
    width: 20px;
    height: 20px;
    background: conic-gradient(#61dafb, #f7df1e, #e34c26, #61dafb);
    border-radius: 50%;
    border: 3px solid rgba(45, 27, 105, 1);
  }

  .timeline-date {
    font-size: 1.1rem;
    font-weight: bold;
    color: #61dafb;
    min-width: 60px;
    margin-left: 50px;
  }

  .timeline-content h3 {
    margin: 0 0 0.5rem 0;
    color: white;
    font-size: 1.2rem;
  }

  .timeline-content p {
    margin: 0 0 0.75rem 0;
    color: rgba(255, 255, 255, 0.8);
  }

  .timeline-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tag {
    padding: 0.25rem 0.75rem;
    background: rgba(97, 218, 251, 0.2);
    border: 1px solid rgba(97, 218, 251, 0.3);
    border-radius: 1rem;
    font-size: 0.8rem;
    color: #61dafb;
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
    .tech-main-title {
      font-size: 2.5rem;
    }

    .tech-content-card {
      margin: 0 1rem;
      padding: 1.5rem;
    }

    .frontend-orbit,
    .backend-orbit,
    .tools-orbit,
    .journey-orbit {
      transform: none;
      max-width: none;
    }

    .cosmic-back-btn {
      top: 1rem;
      left: 1rem;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    .skill-item {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }

    .skill-name {
      min-width: auto;
    }

    .skill-years {
      min-width: auto;
      text-align: left;
    }

    .timeline-item {
      flex-direction: column;
      gap: 0.5rem;
    }

    .timeline-date {
      margin-left: 50px;
    }
  }
</style> 