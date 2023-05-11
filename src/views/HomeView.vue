<script setup>
import HeroSection from '@/components/partials/HeroSection.vue'
import HeaderSection from '@/components/partials/HeaderSection.vue';
</script>

<template>
  <main>
    <div>
      <HeaderSection />
      <HeroSection />
      <div class="content-right">
        <router-view/>
      </div>   
    </div>
  </main>
</template>
