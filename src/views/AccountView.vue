
<script setup>
import Sidebar from '@/components/dashboard/Sidebar.vue'
import Navbar from '@/components/dashboard/Navbar.vue'
</script>

<template>  
    <div>
      <Navbar />
      <Sidebar />
      <div>
        <router-view/>
      </div>   
    </div>
</template>

