<template>
    <div v-if="loading">Loading...</div>
    <div class="content-wrapper">
        <section class="content text-sm table-sm">
            <input type="text" v-model="searchQuery" placeholder="Поиск" class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            
            <table id="customers">        
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Наименование</th>
                        <th>Тип справочника</th>
                        <th>Статус</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post  in filteredData" :key="post.id">
                    <td>{{ post.id }}</td>
                    <td>{{ post.name }}</td>
                    <td>
                        <p v-if="post.typeofdirector">
                        <span>
                            {{ post.typeofdirector.name }}
                        </span>
                        </p>
                        <p v-else></p>
                    </td>
                    <td>
                        <p v-if="post.choice">
                        <span>
                            {{ post.choice.name }}
                        </span>
                        </p>
                        <p v-else> </p>
                    </td>                   
                    <td>
                        <div class="action_icons">
                        <router-link :to="'/account/list-biofarm/' + post.id"><input type="submit" title="Редактировать" class="draw-icon"></router-link>
                        <router-link :to="'/account/list-biofarm/' + post.id"><input type="submit" title="Удалить" class="delete-icon"></router-link>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="flex items-center justify-center p-2">
                <v-pagination
                    v-model="page"
                    :pages="pageCount"
                    :range-size="1"
                    active-color="#DCEDFF"
                    @update:modelValue="getPosts"
                />
            </div>
        </section>
    </div>
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import axios from 'axios'
import { onBeforeMount, ref, computed } from 'vue';

let loading = ref(false)
let id = ref(null)
let page = ref(1)
let posts = ref(null)
let posts3 = ref(null)
let pageCount = ref(null)
let searchQuery = ref('')
let active = ref(false);
let itemsPerPage = ref(10);

onBeforeMount(async () => {
    await getPosts()
})

const getPosts = async () => {
    try {
        const response = await axios.get('api/directors?page=' + page.value)
        pageCount.value = response.data.page_count
        posts.value = response.data.posts.data
        console.log(posts3)
        loading = true
    } catch (err) {
        console.log(err)
    }
}

const paginatedData = computed(() => {
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return posts3.slice(startIndex, endIndex);
})

const filteredData = computed(() => {
      let filtered = posts.value;
      console.log(filtered);
      
    
      // Filter based on search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(item => {
          return item.name.toLowerCase().includes(query);
        });
      }
      
      return filtered;
    });
</script>