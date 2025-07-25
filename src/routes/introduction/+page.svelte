<script lang="ts">
  import { canGoBack, goBack } from '$lib/stores/navigation.svelte';
</script>

<svelte:head>
  <title>나의 소개 및 일대기 - JuKim Portfolio</title>
  <meta name="description" content="개발자 JuKim의 개인 정보, 학력, 경력을 담은 소개 페이지입니다." />
</svelte:head>

<!-- 우주 배경 컨테이너 -->
<div class="min-h-screen relative overflow-hidden cosmic-background">
  <!-- 우주 배경 효과 -->
  <div class="cosmic-particles">
    <!-- 별들 -->
    {#each Array(150) as _, i}
      <div class="cosmic-star" style="
        left: {Math.random() * 100}%;
        top: {Math.random() * 100}%;
        width: {1 + Math.random() * 2}px;
        height: {1 + Math.random() * 2}px;
        animation-delay: {Math.random() * 3}s;
      "></div>
    {/each}
    
    <!-- 성운 효과 -->
    {#each Array(8) as _, i}
      <div class="cosmic-nebula" style="
        left: {10 + Math.random() * 80}%;
        top: {10 + Math.random() * 80}%;
        width: {100 + Math.random() * 300}px;
        height: {100 + Math.random() * 300}px;
        background: {['radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)', 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)', 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'][Math.floor(Math.random() * 4)]};
        animation-delay: {Math.random() * 8}s;
      "></div>
    {/each}
  </div>

  <!-- 궤도 중심점 (페이지 제목) -->
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
        태양계로 돌아가기
      </button>
    {/if}

    <!-- 중심 제목 -->
    <div class="cosmic-title-section content-appear" style="animation-delay: 0.2s;">
      <h1 class="cosmic-main-title">지구 탐험</h1>
      <p class="cosmic-subtitle">나의 소개 및 일대기</p>
      <div class="cosmic-central-orb"></div>
    </div>
  </div>

  <!-- 궤도형 콘텐츠 배치 -->
  <div class="orbital-content-system">
    <!-- 첫 번째 궤도 - 개인정보 -->
    <div class="orbital-ring orbit-1">
      <div class="orbital-content-card orbit-content-1 content-card" style="animation-delay: 0.4s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet personal-info-planet"></div>
          <h2>개인 정보</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="info-item">
            <span class="label">이름</span>
            <span class="value">김주현 (JuKim)</span>
          </div>
          <div class="info-item">
            <span class="label">생년월일</span>
            <span class="value">1995년 3월 15일</span>
          </div>
          <div class="info-item">
            <span class="label">거주지</span>
            <span class="value">서울, 대한민국</span>
          </div>
          <div class="info-item">
            <span class="label">연락처</span>
            <span class="value">contact@jukim.dev</span>
          </div>
          <div class="info-item">
            <span class="label">전문분야</span>
            <span class="value">풀스택 웹 개발</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 두 번째 궤도 - 학력 -->
    <div class="orbital-ring orbit-2">
      <div class="orbital-content-card orbit-content-2 content-card" style="animation-delay: 0.6s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet education-planet"></div>
          <h2>학력</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="timeline-item">
            <div class="timeline-year">2013 - 2019</div>
            <div class="timeline-content">
              <h3>컴퓨터공학과 학사</h3>
              <p>서울대학교</p>
              <p class="timeline-desc">소프트웨어 엔지니어링, 알고리즘, 데이터베이스 전공</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2019 - 2021</div>
            <div class="timeline-content">
              <h3>컴퓨터공학과 석사</h3>
              <p>서울대학교</p>
              <p class="timeline-desc">웹 기술 및 분산 시스템 연구</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 세 번째 궤도 - 경력 -->
    <div class="orbital-ring orbit-3">
      <div class="orbital-content-card orbit-content-3 content-card" style="animation-delay: 0.8s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet career-planet"></div>
          <h2>경력</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="career-item">
            <div class="career-period">2021.03 - 현재</div>
            <div class="career-company">테크스타트업 A</div>
            <div class="career-position">시니어 풀스택 개발자</div>
            <ul class="career-responsibilities">
              <li>React/Node.js 기반 웹 애플리케이션 개발</li>
              <li>마이크로서비스 아키텍처 설계 및 구현</li>
              <li>개발팀 기술 리드 및 멘토링</li>
              <li>CI/CD 파이프라인 구축 및 최적화</li>
            </ul>
          </div>
          <div class="career-item">
            <div class="career-period">2019.06 - 2021.02</div>
            <div class="career-company">IT서비스 회사 B</div>
            <div class="career-position">주니어 개발자</div>
            <ul class="career-responsibilities">
              <li>Vue.js 프론트엔드 개발</li>
              <li>Spring Boot API 개발</li>
              <li>레거시 시스템 개선 프로젝트 참여</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 네 번째 궤도 - 철학과 가치관 -->
    <div class="orbital-ring orbit-4">
      <div class="orbital-content-card orbit-content-4 content-card" style="animation-delay: 1.0s;">
        <div class="cosmic-card-header">
          <div class="cosmic-planet philosophy-planet"></div>
          <h2>개발 철학</h2>
        </div>
        <div class="cosmic-card-body">
          <div class="philosophy-item">
            <h3>🚀 끊임없는 성장</h3>
            <p>새로운 기술을 배우고 적용하며, 더 나은 개발자가 되기 위해 노력합니다.</p>
          </div>
          <div class="philosophy-item">
            <h3>🤝 협업과 소통</h3>
            <p>팀워크를 중시하며, 명확한 커뮤니케이션으로 프로젝트 성공을 이끕니다.</p>
          </div>
          <div class="philosophy-item">
            <h3>💡 사용자 중심</h3>
            <p>사용자 경험을 최우선으로 생각하며, 가치 있는 소프트웨어를 만듭니다.</p>
          </div>
          <div class="philosophy-item">
            <h3>🔧 품질과 효율성</h3>
            <p>깔끔한 코드와 효율적인 솔루션으로 지속 가능한 시스템을 구축합니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .cosmic-background {
    background: radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 30%, #0f0f23 70%, #000000 100%);
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

  .cosmic-nebula {
    position: absolute;
    border-radius: 50%;
    animation: nebulaFloat 20s ease-in-out infinite;
    opacity: 0.3;
  }

  @keyframes starTwinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  @keyframes nebulaFloat {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
    50% { transform: scale(1.1) rotate(180deg); opacity: 0.5; }
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
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
  }

  .cosmic-title-section {
    text-align: center;
    position: relative;
  }

  .cosmic-main-title {
    font-size: 4rem;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
  }

  .cosmic-subtitle {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
  }

  .cosmic-central-orb {
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, #667eea 0%, #764ba2 50%, transparent 100%);
    border-radius: 50%;
    margin: 0 auto;
    animation: centralPulse 3s ease-in-out infinite;
    position: relative;
  }

  .cosmic-central-orb::before {
    content: '';
    position: absolute;
    inset: -20px;
    border: 2px solid rgba(102, 126, 234, 0.3);
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
    transform: translateX(-10%);
  }

  .orbit-2 .orbital-content-card {
    max-width: 700px;
    transform: translateX(10%);
  }

  .orbit-3 .orbital-content-card {
    max-width: 800px;
    transform: translateX(-5%);
  }

  .orbit-4 .orbital-content-card {
    max-width: 750px;
    transform: translateX(8%);
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
    animation: planetRotate 10s linear infinite;
  }

  .personal-info-planet {
    background: radial-gradient(circle at 30% 30%, #ff6b6b 0%, #ee5a52 50%, #d63031 100%);
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
  }

  .education-planet {
    background: radial-gradient(circle at 30% 30%, #4ecdc4 0%, #00b894 50%, #00a085 100%);
    box-shadow: 0 0 20px rgba(78, 205, 196, 0.5);
  }

  .career-planet {
    background: radial-gradient(circle at 30% 30%, #a8e6cf 0%, #81c784 50%, #66bb6a 100%);
    box-shadow: 0 0 20px rgba(168, 230, 207, 0.5);
  }

  .philosophy-planet {
    background: radial-gradient(circle at 30% 30%, #dda0dd 0%, #ba68c8 50%, #9c27b0 100%);
    box-shadow: 0 0 20px rgba(221, 160, 221, 0.5);
  }

  @keyframes planetRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .cosmic-card-body {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .info-item:last-child {
    border-bottom: none;
  }

  .label {
    font-weight: 600;
    color: rgba(102, 126, 234, 0.9);
  }

  .value {
    color: rgba(255, 255, 255, 0.9);
  }

  .timeline-item {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .timeline-item:last-child {
    border-bottom: none;
  }

  .timeline-year {
    flex-shrink: 0;
    width: 120px;
    color: rgba(102, 126, 234, 0.9);
    font-weight: bold;
  }

  .timeline-content h3 {
    margin: 0 0 0.5rem 0;
    color: white;
    font-size: 1.2rem;
  }

  .timeline-content p {
    margin: 0.25rem 0;
    color: rgba(255, 255, 255, 0.8);
  }

  .timeline-desc {
    font-style: italic;
    color: rgba(255, 255, 255, 0.6) !important;
  }

  .career-item {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    border-left: 4px solid rgba(102, 126, 234, 0.6);
  }

  .career-period {
    color: rgba(102, 126, 234, 0.9);
    font-weight: bold;
    font-size: 0.9rem;
  }

  .career-company {
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
    margin: 0.5rem 0;
  }

  .career-position {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .career-responsibilities {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .career-responsibilities li {
    padding: 0.25rem 0;
    color: rgba(255, 255, 255, 0.7);
    position: relative;
    padding-left: 1.5rem;
  }

  .career-responsibilities li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: rgba(102, 126, 234, 0.8);
  }

  .philosophy-item {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 0.8rem;
  }

  .philosophy-item h3 {
    margin: 0 0 0.5rem 0;
    color: white;
    font-size: 1.1rem;
  }

  .philosophy-item p {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
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
    .orbit-4 .orbital-content-card {
      transform: none;
      max-width: none;
    }

    .cosmic-back-btn {
      top: 1rem;
      left: 1rem;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    .timeline-item {
      flex-direction: column;
      gap: 0.5rem;
    }

    .timeline-year {
      width: auto;
    }
  }
</style> 