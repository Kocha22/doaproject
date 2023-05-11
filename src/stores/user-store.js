import axios from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        token: null,
        first_name: null,
        last_name: null,
        email: null,
        age: null,
        city: null
    }),
    actions: {
        setUserDetails(res) {
            console.log('setUserDetails', res.data)
            this.$state.id = res.data.user.id,
            this.$state.token = res.data.token,
            this.$state.first_name = res.data.user.first_name,
            this.$state.last_name = res.data.user.last_name,
            this.$state.email = res.data.user.email,
            this.$state.age = res.data.user.age,
            this.$state.city = res.data.user.city
            
        },
        clearUser() {
            this.$state.id = null,
            this.$state.token = null,
            this.$state.first_name = null,
            this.$state.last_name = null,
            this.$state.email = null,
            this.$state.age = null,
            this.$state.city = null
        }
    },
    persist: true
})