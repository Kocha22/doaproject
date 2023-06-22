<template>
    <div class="content-wrapper">
        <section class="content text-sm table-sm">
            <input type="text" v-model="searchQuery" placeholder="Поиск" class="block w-full p-2 my-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            
            <table id="customers">        
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Наименование</th>
                        <th>Тип справочника</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post  in posts" :key="post.id">
                        <td>{{ post.id }}</td>
                        <td>{{ post.name }}</td>
                        <td>{{ post.certification_id }}</td>
                        <td>
                            <div class="action_icons">
                            <router-link :to="'/account/list-biofarm/' + post.id">
                            <input type="submit" title="Показать" class="eye-icon" />
                            </router-link>
                            <router-link :to="'/account/list-biofarm/' + post.id"><input type="submit" title="Редактировать" class="draw-icon"></router-link>
                            <router-link :to="'/account/list-biofarm/' + post.id"><input type="submit" title="Удалить" class="delete-icon"></router-link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script setup>
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import axios from 'axios'
import { onBeforeMount, ref, computed } from 'vue';

let loading = ref(false)
let id = ref(null)
let page = ref(1)
let posts = ref(null)
let searchQuery = ref('')
let active = ref(false);
let itemsPerPage = ref(10);
let errors = ref([])

onBeforeMount(async () => {
    await getPosts()
})

const getPosts = async () => {
    try {
        const response = await axios.get('api/certificateinner')
        posts.value = response.data[0]
        console.log(response.data);
        loading = true
    } catch (err) {
        if (err.response) {
            errors.value = err.response.data.errors;
            console.log(errors.value);
        } else {
            console.log(err); 
        }
    }
}


const filteredData = computed(() => {
    let filtered = posts.value;
    console.log(filtered);

    
    // Filter based on search query
    if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(item => {
        return item.farmer_name.toLowerCase().includes(query);
    });
    }
    
    return filtered;
});
</script>