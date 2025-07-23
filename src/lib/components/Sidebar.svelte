<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  interface Props {
    class?: string;
  }
  
  let { class: className = '' }: Props = $props();
  
  // 사이드바 상태
  let isExpanded = $state(false);
  let hoverTimeout = $state<number | null>(null);
  
  // SVG 아이콘들
  const IconGithub = `<path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>`;
  
  const IconLinkedIn = `<path fill="currentColor" d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>`;
  
  const IconMail = `<path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>`;
  
  // 네비게이션 항목들
  const navItems = [
    {
      href: 'https://github.com/jukim',
      title: 'GitHub',
      icon: IconGithub,
      external: true
    },
    {
      href: 'https://linkedin.com/in/jukim',
      title: 'LinkedIn',
      icon: IconLinkedIn,
      external: true
    },
    {
      href: 'mailto:contact@jukim.dev',
      title: 'Email',
      icon: IconMail,
      external: true
    }
  ];
  
  // 호버 핸들러
  function handleMouseEnter() {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    isExpanded = true;
  }
  
  function handleMouseLeave() {
    hoverTimeout = setTimeout(() => {
      isExpanded = false;
    }, 300);
  }
  
  onMount(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  });
</script>

<aside
  class="fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-out overflow-hidden
         {isExpanded ? 'w-80' : 'w-20'} {className}"
  role="navigation"
  aria-label="사이드바 네비게이션"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  <!-- 배경 -->
  <div class="absolute inset-0 glass-strong border-r border-surface-200 dark:border-surface-800"></div>
  
  <!-- 네비게이션 콘텐츠 -->
  <div class="relative h-full flex flex-col">
    <!-- 로고/홈 링크 -->
    <div class="flex items-center h-16 px-4 border-b border-surface-200 dark:border-surface-800">
      <a href="/" class="flex items-center space-x-3 group">
        <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-purple rounded-lg 
                   flex items-center justify-center text-white font-bold text-sm
                   group-hover:scale-110 transition-transform duration-200">
          JK
        </div>
        {#if isExpanded}
          <span class="font-bold text-surface-900 dark:text-surface-100 text-lg">
            JuKim
          </span>
        {/if}
      </a>
    </div>
    
    <!-- 네비게이션 메뉴 -->
    <nav class="flex-1 py-6">
      <ul class="space-y-3 px-4">
        {#each navItems as item}
          <li>
            <a
              href={item.href}
              title={item.title}
              class="flex items-center space-x-3 px-3 py-2 rounded-lg text-surface-700 dark:text-surface-300
                     hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-primary-600 dark:hover:text-primary-400
                     transition-all duration-200 group"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              <div class="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  {@html item.icon}
                </svg>
              </div>
              {#if isExpanded}
                <span class="font-medium">{item.title}</span>
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
    
    <!-- 하단 정보 -->
    <div class="p-4 border-t border-surface-200 dark:border-surface-800">
      {#if isExpanded}
        <div class="text-xs text-surface-500 dark:text-surface-400 text-center">
          <p class="mb-1">© 2024 JuKim</p>
          <p class="flex items-center justify-center gap-1">
            Made with 
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="text-red-500">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </p>
        </div>
      {:else}
        <div class="w-8 h-8 mx-auto">
          <div class="w-2 h-2 bg-green-400 rounded-full mx-auto animate-pulse" title="온라인"></div>
        </div>
      {/if}
    </div>
  </div>
</aside> 