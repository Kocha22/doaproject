<template>
    <div id="Register">
        <div class="w-full p-6 flex justify-center items-center">
            <div class="w-full max-w-xs">
                <div class="bg-black p-8 shadow rounded mb-6">
                    <div class="mb-4">
                        <label>Имя</label>
                        <input type="text" name="first_name" v-model="first_name">

                    </div>

                    <div class="mb-4">
                        <label>Фамилия</label>
                        <input type="text" name="last_name" v-model="last_name">

                    </div>

                    <div class="mb-4">
                        <label>Email</label>
                        <input type="email" name="email" v-model="email" />

                    </div>

                    <div class="mb-4">
                        <label>Пароль</label>
                        <input type="password" name="password" v-model="password">

                    </div>

                    <div class="mb-4">
                        <label>Повторите пароль</label>
                        <input type="password" v-model="confirmPassword">

                    </div>

                    <div class="mb-4">
                        <label>Город</label>
                        <input type="text" name="city" v-model="city">
              
                    </div>

                    <div class="mb-4">
                        <label>Возраст</label>
                        <input type="text" name="age" v-model="age">
       
                    </div>

                    <button
                        class="
                            block
                            w-full
                            bg-green-500
                            text-white
                            rounded-sm
                            py-3
                            text-sm
                            tracking-wide
                            "
                        type="submit"
                        @click="register"
                    >
                        Register
                    </button>

                </div>
                {{ first_name }}
                <p class="text-center text-md text-gray-900">
                    Already have an account?
                    <router-link to="login" class="text-blue-500 no-underline hover:underline">
                        Login
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    import { useUserStore } from '@/stores/user-store.js';


    const userStore = useUserStore()

    let errors = ref([])
    let first_name = ref(null)
    let last_name = ref(null)
    let email = ref(null)
    let age = ref(null)
    let city = ref(null)
    let password = ref(null)
    let confirmPassword = ref(null)
    const register = async () => {
        errors.value = []
        try {
            let res = await axios.post('api/register', {
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                age: age.value,
                city: city.value,
                password: password.value,
                password_confirmation: confirmPassword.value,
            })
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
            userStore.setUserDetails(res)
        } catch (e) {
            console.log(errors.value)
        }
    }
</script>