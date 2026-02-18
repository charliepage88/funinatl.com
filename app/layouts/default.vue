<template>
  <div class="min-h-screen flex flex-col bg-base-100 text-base-content" data-theme="dark">
    <AppHeader />
    <main class="flex-1 container mx-auto px-4 py-6 max-w-7xl">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
