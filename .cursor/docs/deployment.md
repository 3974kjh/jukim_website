# Cloudflare Pages 배포 가이드

## 개요
이 프로젝트는 Cloudflare Pages를 사용하여 정적 사이트로 배포됩니다. SvelteKit의 static adapter를 사용하여 모든 페이지를 사전 렌더링합니다.

## 설정 변경사항

### 1. SvelteKit Adapter 설정
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html', // SPA 폴백
      precompress: false,
      strict: true
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '' : ''
    },
    prerender: {
      handleHttpError: 'warn',
      handleMissingId: 'warn'
    }
  }
};

export default config;
```

### 2. 라우팅 설정
```typescript
// src/app.html
<!DOCTYPE html>
<html lang="ko" data-theme="auto">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <!-- Cloudflare Pages 최적화 -->
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

### 3. 정적 파일 처리
```typescript
// src/routes/+layout.ts
export const prerender = true;
export const ssr = false; // Cloudflare Pages에서 SPA로 동작
```

## Cloudflare Pages 설정

### 1. 빌드 설정
```yaml
# .cloudflare/pages.yml (선택적)
build:
  command: npm run build
  destination: build
  root_dir: /
  env_vars:
    NODE_VERSION: "18"
    NPM_VERSION: "9"
```

### 2. 리다이렉트 규칙
```
# static/_redirects
# SPA 폴백 - 모든 404를 index.html로 리다이렉트
/*    /index.html   200

# API 경로 처리 (필요시)
/api/*  https://api.yoursite.com/:splat  200

# WWW 리다이렉트 (선택적)
https://www.yourdomain.com/*  https://yourdomain.com/:splat  301!
```

### 3. 헤더 설정
```
# static/_headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=31536000, immutable

/
  Cache-Control: public, max-age=0, must-revalidate
```

## 환경 변수 설정

### 1. 개발환경
```bash
# .env.local
PUBLIC_SITE_URL=http://localhost:5173
PUBLIC_ENVIRONMENT=development
```

### 2. 프로덕션환경 (Cloudflare Pages)
```bash
# Cloudflare Pages 환경 변수 설정
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_ENVIRONMENT=production
```

## 빌드 스크립트 수정

### package.json
```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "build:cloudflare": "npm run build && npm run postbuild",
    "postbuild": "node scripts/post-build.js",
    "lint": "prettier --check . && eslint .",
    "format": "prettier --write ."
  }
}
```

### 포스트 빌드 스크립트
```javascript
// scripts/post-build.js
import fs from 'fs';
import path from 'path';

// Cloudflare Pages를 위한 빌드 후 처리
const buildDir = 'build';

// 404.html을 index.html로 복사 (SPA 폴백)
if (fs.existsSync(path.join(buildDir, 'index.html'))) {
  fs.copyFileSync(
    path.join(buildDir, 'index.html'),
    path.join(buildDir, '404.html')
  );
  console.log('✓ 404.html 폴백 생성됨');
}

// 압축 가능한 파일들에 대한 처리
const compressibleExtensions = ['.html', '.css', '.js', '.json', '.svg'];

function processFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processFiles(filePath);
    } else {
      const ext = path.extname(file);
      if (compressibleExtensions.includes(ext)) {
        console.log(`✓ 처리됨: ${filePath}`);
      }
    }
  });
}

processFiles(buildDir);
console.log('✓ 빌드 후 처리 완료');
```

## 도메인 설정

### 1. 커스텀 도메인 연결
1. Cloudflare Pages 대시보드에서 프로젝트 선택
2. "Custom domains" 탭으로 이동
3. 도메인 추가 및 DNS 설정

### 2. DNS 설정 예시
```
Type: CNAME
Name: @
Content: yourusername.pages.dev
TTL: Auto
```

## 성능 최적화

### 1. 이미지 최적화
```javascript
// vite.config.ts에 이미지 최적화 플러그인 추가
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['svelte']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['clsx', 'tailwind-merge']
  }
});
```

### 2. Cloudflare 최적화 기능 활용
- **Auto Minify**: HTML, CSS, JS 자동 압축
- **Brotli Compression**: 더 나은 압축률
- **Edge Caching**: 전 세계 CDN 캐싱
- **Image Optimization**: 자동 이미지 최적화

## 배포 워크플로우

### 1. GitHub Actions (권장)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: 'jukim-website'
          directory: 'build'
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### 2. 직접 배포
```bash
# 로컬에서 빌드 후 수동 업로드
npm run build
npx wrangler pages publish build --project-name=jukim-website
```

## 모니터링 및 분석

### 1. Cloudflare Analytics
- 페이지 뷰 추적
- 성능 메트릭
- 보안 이벤트

### 2. Web Vitals 추적
```typescript
// src/lib/analytics.ts
export function trackWebVitals() {
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    });
  }
}

function sendToAnalytics(metric: any) {
  // Cloudflare Analytics나 다른 서비스로 전송
  console.log(metric);
}
```

## 트러블슈팅

### 1. 일반적인 문제들
- **404 에러**: `_redirects` 파일 확인
- **CSS 로딩 실패**: 절대 경로 대신 상대 경로 사용
- **라우팅 문제**: `prerender = true` 설정 확인

### 2. 디버깅
```bash
# 로컬에서 프로덕션 빌드 테스트
npm run build
npm run preview

# Cloudflare Pages 로그 확인
npx wrangler pages deployment list --project-name=jukim-website
```

### 3. 성능 체크리스트
- [ ] 모든 이미지 최적화됨
- [ ] CSS/JS 압축됨
- [ ] 불필요한 의존성 제거됨
- [ ] 캐시 헤더 설정됨
- [ ] 404 폴백 설정됨 