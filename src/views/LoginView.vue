<template>
<div class="form-wrap">
    <div class="form-home">
        <!-- @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
        @endif -->
        <div id="login-form">

            <div>
            <input type="email" name="email" placeholder="Email" v-model="email">
            </div>
            <div>
            <input type="password" name="password" placeholder="Password" v-model="password">
            </div>
            <div>
            <button class="button" type="submit" @click="login">Войти</button>
            </div>
        </div>

        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { useUserStore } from '@/stores/user-store.js'
    import { useRouter } from 'vue-router';


    const router = useRouter()
    const userStore = useUserStore()

    let errors = ref([])
    let email = ref(null)
    let password = ref(null)

    
    const login = async () => {
        errors.value = []
        try {
            let res = await axios.post('api/login', {
                email: email.value,
                password: password.value,
            })
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
            userStore.setUserDetails(res)            
            router.push('/account/admin/' + userStore.id)        
        } catch (err) {
            errors.value = err.response.data.errors
        }
    }
</script>