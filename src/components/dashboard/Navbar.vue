<template>
   <!-- Navbar -->
 <nav class="main-header navbar navbar-expand navbar-light ">
     <!-- Left navbar links -->
     <ul class="navbar-nav">
         <li class="nav-item">
             <a class="nav-link" data-widget="pushmenu" href="#" role="button"  data-enable-remember="true"><font-awesome-icon :icon="['fa', 'bars']" size="xl" /></a>
         </li>
         <li class="nav-item d-none d-sm-inline-block">
             <a href="#" class="nav-link">
                {{ userStore.first_name }}
            </a>
         </li>         
     </ul>

     <!-- Right navbar links -->
     <ul class="navbar-nav ml-auto">
         <!-- Messages Dropdown Menu -->
         <li class="nav-item">
             <img src="/img/almaz2.jpg" width="40" height="40"
                 class="img-circle elevation-1" alt="User Image">
         </li>
         <li class="nav-item">
             <!-- @if (Auth::check())
             <a class="nav-link" href="#" class="d-block">{{ $user->last_nae ?? "" }} {{ $user->first_name ?? "" }}</a>         
             
             @else

             @endif -->
         </li>
         
         <li class="nav-item">
             <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                <font-awesome-icon :icon="['fa', 'maximize']" size="xl" />
             </a>
         </li>
         <li class="nav-item">
             <!-- @if (Auth::check())
             <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                 @csrf
             </form> -->
             <button class="nav-link" @click="logout">Выход</button>
             <!-- @else
             <a href="{{ route('auth.get.login') }}" class="nav-link">Войти</a>
             @endif</a> -->
         </li>
     </ul>
 </nav>
 <!-- /.navbar -->
  </template>
  
  <script setup>
   import { ref } from 'vue' 
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/user-store'
    
    const router = useRouter()
    const userStore = useUserStore()

    let open = ref(false)
    const logout = async () => {
        try {
            let res = await axios.post('api/logout', {
                user_id: userStore.id
            })
            console.log(res.data)
            userStore.clearUser()
            router.push('/')
        } catch (err) {
            console.log(err)
        }
    }
  </script>
  
  <style>
  
  </style>