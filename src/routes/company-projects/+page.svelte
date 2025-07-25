<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { canGoBack, goBack } from '$lib/stores/navigation.svelte';
	import { analytics, visitHistory } from '$lib/utils/storage';

	onMount(() => {
		if (browser) {
			visitHistory.add('company-projects');
			analytics.trackPageView('company-projects');
		}
	});
</script>

<svelte:head>
	<title>기업 우주정거장 - JuKim Portfolio</title>
	<meta name="description" content="JuKim의 회사 프로젝트와 기업에서의 경험들을 우주정거장에서 탐험해보세요" />
</svelte:head>

<!-- 기업 우주정거장 배경 컨테이너 -->
<div class="min-h-screen relative overflow-hidden corporate-cosmic-background">
	<!-- 강화된 우주 배경 효과 -->
	<div class="cosmic-particles">
		<!-- 기업 별들 -->
		{#each Array(220) as _, i}
			<div class="corporate-star" style="
				left: {Math.random() * 100}%;
				top: {Math.random() * 100}%;
				width: {1 + Math.random() * 3}px;
				height: {1 + Math.random() * 3}px;
				animation-delay: {Math.random() * 3}s;
				background: {['#ffd700', '#c0c0c0', '#cd7f32', '#e5e4e2', '#b9f2ff'][Math.floor(Math.random() * 5)]};
			"></div>
		{/each}
		
		<!-- 기업 네트워크 성운 -->
		{#each Array(12) as _, i}
			<div class="corporate-nebula" style="
				left: {10 + Math.random() * 80}%;
				top: {10 + Math.random() * 80}%;
				width: {150 + Math.random() * 300}px;
				height: {150 + Math.random() * 300}px;
				background: {['radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)', 'radial-gradient(circle, rgba(192, 192, 192, 0.15) 0%, transparent 70%)', 'radial-gradient(circle, rgba(205, 127, 50, 0.15) 0%, transparent 70%)', 'radial-gradient(circle, rgba(79, 195, 247, 0.15) 0%, transparent 70%)'][Math.floor(Math.random() * 4)]};
				animation-delay: {Math.random() * 12}s;
			"></div>
		{/each}
	</div>

	<!-- 기업 궤도 중심점 -->
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

		<!-- 중심 기업 정거장 -->
		<div class="cosmic-title-section content-appear" style="animation-delay: 0.2s;">
			<h1 class="cosmic-main-title">기업 우주정거장</h1>
			<p class="cosmic-subtitle">회사 프로젝트와 기업 경험</p>
			<div class="cosmic-central-orb corporate-orb"></div>
		</div>
	</div>

	<!-- 기업 궤도형 콘텐츠 배치 -->
	<div class="orbital-content-system">
		<!-- 첫 번째 궤도 - 현재 회사 프로젝트 -->
		<div class="orbital-ring orbit-1">
			<div class="orbital-content-card orbit-content-1 content-card" style="animation-delay: 0.4s;">
				<div class="cosmic-card-header">
					<div class="cosmic-planet current-projects-planet"></div>
					<h2>🚀 현재 회사 프로젝트</h2>
				</div>
				<div class="cosmic-card-body">
					<div class="company-info">
						<h3>🏢 테크스타트업 A (2021.03 - 현재)</h3>
						<div class="company-role">시니어 풀스택 개발자</div>
					</div>
					
					<div class="projects-showcase">
						<div class="project-item featured">
							<div class="project-icon">🌟</div>
							<div class="project-details">
								<h4>SaaS 플랫폼 개발</h4>
								<p>React + Node.js 기반 B2B SaaS 솔루션</p>
								<div class="project-achievements">
									<div class="achievement-item">• 마이크로서비스 아키텍처 설계 및 구현</div>
									<div class="achievement-item">• 월 활성 사용자 500% 증가</div>
									<div class="achievement-item">• API 응답 시간 60% 개선</div>
								</div>
								<div class="tech-stack">
									<span class="tech-chip react">React</span>
									<span class="tech-chip node">Node.js</span>
									<span class="tech-chip docker">Docker</span>
									<span class="tech-chip aws">AWS</span>
								</div>
							</div>
						</div>

						<div class="project-item">
							<div class="project-icon">📊</div>
							<div class="project-details">
								<h4>데이터 분석 대시보드</h4>
								<p>실시간 비즈니스 인사이트 제공 플랫폼</p>
								<div class="tech-stack">
									<span class="tech-chip vue">Vue.js</span>
									<span class="tech-chip python">Python</span>
									<span class="tech-chip redis">Redis</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 두 번째 궤도 - 이전 회사 프로젝트 -->
		<div class="orbital-ring orbit-2">
			<div class="orbital-content-card orbit-content-2 content-card" style="animation-delay: 0.6s;">
				<div class="cosmic-card-header">
					<div class="cosmic-planet previous-projects-planet"></div>
					<h2>🏛️ 이전 회사 프로젝트</h2>
				</div>
				<div class="cosmic-card-body">
					<div class="company-info">
						<h3>🏛️ IT서비스 회사 B (2019.06 - 2021.02)</h3>
						<div class="company-role">주니어 개발자</div>
					</div>
					
					<div class="projects-showcase">
						<div class="project-item featured">
							<div class="project-icon">🌐</div>
							<div class="project-details">
								<h4>기업 포털 리뉴얼</h4>
								<p>Vue.js 기반 사내 인트라넷 시스템</p>
								<div class="project-achievements">
									<div class="achievement-item">• 레거시 JSP → Vue.js 마이그레이션</div>
									<div class="achievement-item">• 사용자 경험 개선으로 업무 효율 40% 증가</div>
								</div>
								<div class="tech-stack">
									<span class="tech-chip vue">Vue.js</span>
									<span class="tech-chip spring">Spring Boot</span>
									<span class="tech-chip mysql">MySQL</span>
								</div>
							</div>
						</div>

						<div class="project-item">
							<div class="project-icon">📱</div>
							<div class="project-details">
								<h4>모바일 앱 백엔드 API</h4>
								<p>고객 서비스 모바일 앱용 RESTful API</p>
								<div class="tech-stack">
									<span class="tech-chip java">Java</span>
									<span class="tech-chip spring">Spring Boot</span>
									<span class="tech-chip jwt">JWT</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 세 번째 궤도 - 기업 경험 및 성과 -->
		<div class="orbital-ring orbit-3">
			<div class="orbital-content-card orbit-content-3 content-card" style="animation-delay: 0.8s;">
				<div class="cosmic-card-header">
					<div class="cosmic-planet achievements-planet"></div>
					<h2>🎯 기업 경험 및 성과</h2>
				</div>
				<div class="cosmic-card-body">
					<div class="achievement-sections">
						<div class="achievement-section">
							<h3>💼 리더십 경험</h3>
							<div class="experience-items">
								<div class="experience-item">
									<div class="experience-title">기술 리드</div>
									<div class="experience-desc">5명 개발팀 기술 방향성 설정 및 아키텍처 결정</div>
								</div>
								<div class="experience-item">
									<div class="experience-title">멘토링</div>
									<div class="experience-desc">3명의 주니어 개발자 성장 지원 및 코드 리뷰</div>
								</div>
								<div class="experience-item">
									<div class="experience-title">프로젝트 관리</div>
									<div class="experience-desc">애자일 방법론 도입으로 팀 생산성 35% 향상</div>
								</div>
							</div>
						</div>

						<div class="achievement-section">
							<h3>📈 비즈니스 임팩트</h3>
							<div class="impact-metrics">
								<div class="metric-item">
									<div class="metric-number">25%</div>
									<div class="metric-label">연간 매출 증가</div>
								</div>
								<div class="metric-item">
									<div class="metric-number">40%</div>
									<div class="metric-label">월 운영비 절감</div>
								</div>
								<div class="metric-item">
									<div class="metric-number">4.7</div>
									<div class="metric-label">고객 만족도</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 네 번째 궤도 - 기업 문화 및 학습 -->
		<div class="orbital-ring orbit-4">
			<div class="orbital-content-card orbit-content-4 content-card" style="animation-delay: 1.0s;">
				<div class="cosmic-card-header">
					<div class="cosmic-planet culture-planet"></div>
					<h2>🌟 기업 문화 경험</h2>
				</div>
				<div class="cosmic-card-body">
					<div class="culture-experiences">
						<div class="culture-category">
							<h3>🤝 협업 문화</h3>
							<p>다양한 직군과의 협업을 통해 제품 전체 라이프사이클 이해</p>
							<div class="culture-tags">
								<span class="culture-tag">크로스 펑셔널 팀</span>
								<span class="culture-tag">디자인 시스템 구축</span>
								<span class="culture-tag">사용자 피드백 반영</span>
							</div>
						</div>

						<div class="culture-category">
							<h3>📚 지속적 학습</h3>
							<p>빠르게 변화하는 기술 트렌드에 맞춰 지속적인 학습과 적용</p>
							<div class="culture-tags">
								<span class="culture-tag">사내 기술 세미나</span>
								<span class="culture-tag">오픈소스 기여</span>
								<span class="culture-tag">컨퍼런스 참여</span>
							</div>
						</div>

						<div class="culture-category">
							<h3>🚀 성장 마인드셋</h3>
							<p>실패를 두려워하지 않고 도전하며 개선점을 찾아나가는 문화</p>
							<div class="culture-tags">
								<span class="culture-tag">실험적 프로젝트</span>
								<span class="culture-tag">포스트모템 문화</span>
								<span class="culture-tag">지속적 개선</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 다섯 번째 궤도 - CI/CD 및 인프라 -->
		<div class="orbital-ring orbit-5">
			<div class="orbital-content-card orbit-content-5 content-card" style="animation-delay: 1.2s;">
				<div class="cosmic-card-header">
					<div class="cosmic-planet infrastructure-planet"></div>
					<h2>🔧 인프라 및 자동화</h2>
				</div>
				<div class="cosmic-card-body">
					<div class="infrastructure-work">
						<div class="infra-project">
							<div class="project-icon">⚙️</div>
							<div class="project-details">
								<h4>CI/CD 파이프라인 구축</h4>
								<p>개발팀 생산성 향상을 위한 자동화 시스템</p>
								<div class="project-achievements">
									<div class="achievement-item">• 배포 시간 90% 단축</div>
									<div class="achievement-item">• 코드 품질 자동 검증 시스템 구축</div>
									<div class="achievement-item">• 무중단 배포 환경 구성</div>
								</div>
								<div class="tech-stack">
									<span class="tech-chip jenkins">Jenkins</span>
									<span class="tech-chip github">GitHub Actions</span>
									<span class="tech-chip kubernetes">Kubernetes</span>
									<span class="tech-chip docker">Docker</span>
								</div>
							</div>
						</div>
						
						<div class="awards-section">
							<h3>🏆 인정과 보상</h3>
							<div class="awards-list">
								<div class="award-item">
									<div class="award-icon">🥇</div>
									<span>MVP 어워드 수상</span>
								</div>
								<div class="award-item">
									<div class="award-icon">✍️</div>
									<span>기술 블로그 작성</span>
								</div>
								<div class="award-item">
									<div class="award-icon">📖</div>
									<span>교육비 지원</span>
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
	.corporate-cosmic-background {
		background: radial-gradient(ellipse at center, #1a1a3a 0%, #2a2a4a 30%, #0f1521 70%, #000008 100%);
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

	.corporate-star {
		position: absolute;
		border-radius: 50%;
		animation: corporateTwinkle 3s ease-in-out infinite;
	}

	.corporate-nebula {
		position: absolute;
		border-radius: 50%;
		animation: corporateNebulaFloat 35s ease-in-out infinite;
		opacity: 0.3;
	}

	@keyframes corporateTwinkle {
		0%, 100% { opacity: 0.4; transform: scale(1); }
		50% { opacity: 1; transform: scale(1.3); }
	}

	@keyframes corporateNebulaFloat {
		0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
		50% { transform: scale(1.15) rotate(180deg); opacity: 0.5; }
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
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 2rem;
		color: white;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 20;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	}

	.cosmic-back-btn:hover {
		background: rgba(255, 255, 255, 0.25);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
	}

	.cosmic-title-section {
		text-align: center;
		position: relative;
	}

	.cosmic-main-title {
		font-size: 4rem;
		font-weight: bold;
		background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #4fc3f7 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1rem;
		text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
	}

	.cosmic-subtitle {
		font-size: 1.5rem;
		color: rgba(255, 255, 255, 0.95);
		margin-bottom: 2rem;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
		font-weight: 500;
	}

	.corporate-orb {
		width: 120px;
		height: 120px;
		background: radial-gradient(circle, #ffd700 0%, #4fc3f7 50%, transparent 100%);
		border-radius: 50%;
		margin: 0 auto;
		animation: centralPulse 3s ease-in-out infinite;
		position: relative;
		box-shadow: 
			0 0 60px rgba(255, 215, 0, 0.6),
			0 0 120px rgba(255, 215, 0, 0.4);
	}

	.corporate-orb::before {
		content: '';
		position: absolute;
		inset: -20px;
		border: 2px solid rgba(255, 215, 0, 0.3);
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
		max-width: 1600px;
		margin: 0 auto;
		padding: 2rem;
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		justify-content: center;
		align-items: flex-start;
	}

	.orbital-ring {
		position: relative;
		flex: 1;
		min-width: 400px;
		max-width: 500px;
	}

	.orbital-content-card {
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1.5rem;
		padding: 2rem;
		position: relative;
		overflow: hidden;
		box-shadow: 
			0 8px 32px rgba(0, 0, 0, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		height: fit-content;
		transition: all 0.3s ease;
	}

	.orbital-content-card:hover {
		transform: translateY(-5px);
		box-shadow: 
			0 12px 40px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.12);
	}

	.orbit-1 .orbital-content-card {
		border-top: 3px solid rgba(79, 195, 247, 0.8);
	}

	.orbit-2 .orbital-content-card {
		border-top: 3px solid rgba(171, 71, 188, 0.8);
	}

	.orbit-3 .orbital-content-card {
		border-top: 3px solid rgba(102, 187, 106, 0.8);
	}

	.orbit-4 .orbital-content-card {
		border-top: 3px solid rgba(255, 112, 67, 0.8);
	}

	.orbit-5 .orbital-content-card {
		border-top: 3px solid rgba(255, 215, 0, 0.8);
	}

	.cosmic-card-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}

	.cosmic-card-header h2 {
		font-size: 1.5rem;
		font-weight: bold;
		color: white;
		margin: 0;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	}

	.cosmic-planet {
		width: 35px;
		height: 35px;
		border-radius: 50%;
		position: relative;
		animation: planetRotate 20s linear infinite;
		flex-shrink: 0;
	}

	.current-projects-planet {
		background: radial-gradient(circle at 30% 30%, #4fc3f7 0%, #29b6f6 50%, #0277bd 100%);
		box-shadow: 0 0 20px rgba(79, 195, 247, 0.6);
	}

	.previous-projects-planet {
		background: radial-gradient(circle at 30% 30%, #ab47bc 0%, #8e24aa 50%, #4a148c 100%);
		box-shadow: 0 0 20px rgba(171, 71, 188, 0.6);
	}

	.achievements-planet {
		background: radial-gradient(circle at 30% 30%, #66bb6a 0%, #4caf50 50%, #2e7d32 100%);
		box-shadow: 0 0 20px rgba(102, 187, 106, 0.6);
	}

	.culture-planet {
		background: radial-gradient(circle at 30% 30%, #ff7043 0%, #f4511e 50%, #bf360c 100%);
		box-shadow: 0 0 20px rgba(255, 112, 67, 0.6);
	}

	.infrastructure-planet {
		background: radial-gradient(circle at 30% 30%, #ffd700 0%, #ffc107 50%, #f57f17 100%);
		box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
	}

	@keyframes planetRotate {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.cosmic-card-body {
		color: rgba(255, 255, 255, 0.95);
		line-height: 1.6;
	}

	.company-info h3 {
		font-size: 1.2rem;
		font-weight: bold;
		color: #ffd700;
		margin-bottom: 0.5rem;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	}

	.company-role {
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 1.5rem;
		font-weight: 600;
		font-size: 0.9rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.projects-showcase {
		space-y: 1.2rem;
	}

	.project-item {
		display: flex;
		gap: 1rem;
		padding: 1.2rem;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.15);
		margin-bottom: 1.2rem;
		transition: all 0.3s ease;
	}

	.project-item.featured {
		border-color: rgba(255, 215, 0, 0.4);
		box-shadow: 0 4px 20px rgba(255, 215, 0, 0.15);
		background: rgba(255, 215, 0, 0.05);
	}

	.project-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
		background: rgba(255, 255, 255, 0.12);
	}

	.project-icon {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.project-details h4 {
		font-size: 1.1rem;
		font-weight: bold;
		color: white;
		margin-bottom: 0.5rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.project-details p {
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 1rem;
		font-size: 0.9rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	.project-achievements {
		margin-bottom: 1rem;
	}

	.achievement-item {
		color: rgba(255, 255, 255, 0.85);
		font-size: 0.85rem;
		margin-bottom: 0.3rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tech-chip {
		padding: 0.25rem 0.6rem;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		border: 1px solid rgba(255, 255, 255, 0.25);
		color: rgba(255, 255, 255, 0.95);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.achievement-sections {
		space-y: 1.5rem;
	}

	.achievement-section h3 {
		font-size: 1.1rem;
		font-weight: bold;
		color: #66bb6a;
		margin-bottom: 1rem;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	}

	.experience-items {
		space-y: 0.8rem;
	}

	.experience-item {
		padding: 0.8rem;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 0.8rem;
		border-left: 3px solid rgba(102, 187, 106, 0.8);
	}

	.experience-title {
		font-weight: bold;
		color: white;
		margin-bottom: 0.3rem;
		font-size: 0.95rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.experience-desc {
		color: rgba(255, 255, 255, 0.9);
		font-size: 0.85rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	.impact-metrics {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 0.8rem;
	}

	.metric-item {
		text-align: center;
		padding: 0.8rem;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		border: 1px solid rgba(102, 187, 106, 0.4);
	}

	.metric-number {
		font-size: 1.5rem;
		font-weight: bold;
		color: #66bb6a;
		margin-bottom: 0.3rem;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	}

	.metric-label {
		color: rgba(255, 255, 255, 0.9);
		font-size: 0.8rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.culture-experiences {
		space-y: 1.2rem;
	}

	.culture-category h3 {
		font-size: 1.1rem;
		font-weight: bold;
		color: #ff7043;
		margin-bottom: 0.5rem;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	}

	.culture-category p {
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 0.8rem;
		font-size: 0.9rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	.culture-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.culture-tag {
		padding: 0.25rem 0.6rem;
		background: rgba(255, 112, 67, 0.25);
		border: 1px solid rgba(255, 112, 67, 0.4);
		border-radius: 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: #ff7043;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.infrastructure-work {
		space-y: 1.5rem;
	}

	.infra-project {
		margin-bottom: 1.5rem;
	}

	.awards-section h3 {
		font-size: 1.1rem;
		font-weight: bold;
		color: #ffd700;
		margin-bottom: 1rem;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	}

	.awards-list {
		space-y: 0.6rem;
	}

	.award-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 0.8rem;
		border: 1px solid rgba(255, 215, 0, 0.3);
	}

	.award-icon {
		font-size: 1rem;
		width: 25px;
		text-align: center;
		flex-shrink: 0;
	}

	.award-item span {
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	/* 콘텐츠 애니메이션 */
	.content-appear {
		opacity: 1;
		transform: translateY(20px) scale(0.95);
		/* animation: contentAppear 0.8s ease-out forwards; */
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
	@media (max-width: 1200px) {
		.orbital-content-system {
			flex-direction: column;
			align-items: center;
		}

		.orbital-ring {
			max-width: 800px;
			width: 100%;
		}
	}

	@media (max-width: 768px) {
		.cosmic-main-title {
			font-size: 2.5rem;
		}

		.orbital-content-system {
			padding: 1rem;
		}

		.orbital-content-card {
			padding: 1.5rem;
		}

		.orbital-ring {
			min-width: unset;
			max-width: unset;
		}

		.cosmic-back-btn {
			top: 1rem;
			left: 1rem;
			padding: 0.5rem 1rem;
			font-size: 0.9rem;
		}

		.project-item {
			flex-direction: column;
			gap: 1rem;
		}

		.impact-metrics {
			grid-template-columns: 1fr;
		}

		.cosmic-card-header h2 {
			font-size: 1.3rem;
		}
	}
</style> 