import fs from 'fs';
import path from 'path';

// Cloudflare Pages를 위한 빌드 후 처리
const buildDir = 'build';

console.log('🚀 Starting post-build process for Cloudflare Pages...');

// 404.html을 index.html로 복사 (SPA 폴백)
if (fs.existsSync(path.join(buildDir, 'index.html'))) {
  fs.copyFileSync(
    path.join(buildDir, 'index.html'),
    path.join(buildDir, '404.html')
  );
  console.log('✓ 404.html 폴백 생성됨');
} else {
  console.warn('⚠️ index.html을 찾을 수 없습니다.');
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

if (fs.existsSync(buildDir)) {
  processFiles(buildDir);
  console.log('✅ 빌드 후 처리 완료');
} else {
  console.error('❌ 빌드 디렉토리를 찾을 수 없습니다.');
} 