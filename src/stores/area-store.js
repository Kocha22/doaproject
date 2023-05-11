import axios from 'axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('area', {
    state: () => ({
        id: null,
        name_ru: null,
        last_name: null,
        email: null,
        age: null,
        city: null
    }),
    actions: {
        async fetchUser(id) {
            const rayonData = await axios.get(`api/getarea/${id}`)
            rayons.value = rayonData.data.children;
            active = true
            console.log(rayonData);
            console.log(rayons);
        }
    },
    persist: true
})