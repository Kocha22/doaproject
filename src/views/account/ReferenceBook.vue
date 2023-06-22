<template>
    <div class="content-wrapper">
        <section class="content text-sm table-sm">
            <div class="flex space-between items-center my-2">
                <input type="text" v-model="searchQuery" placeholder="Поиск" class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <ReferenceModal :choices="choices" :typeofdirector = "typeofdirector">Добавить</ReferenceModal>
            </div>            
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
                        <a href="#" @click="deleteDirector(post.id)"><input type="submit" title="Удалить" class="delete-icon"></a>
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
import ReferenceModal from "../../components/modal/ReferenceModal.vue";
import Swal from '../../sweetalert2.js'

let loading = ref(false)
let id = ref(null)
let page = ref(1)
let posts = ref(null)
let posts3 = ref(null)
let pageCount = ref(null)
let searchQuery = ref('')
let active = ref(false);
let itemsPerPage = ref(10);
let choices = ref([]);
let typeofdirector = ref(null);
let isDelete = ref(false)

onBeforeMount(async () => {
    await getPosts()
})

const getPosts = async () => {
    try {
        const response = await axios.get('api/directors?page=' + page.value)
        pageCount.value = response.data.page_count
        posts.value = response.data.posts.data
        choices.value = response.data.choices
        typeofdirector.value = response.data.typeofdirector
        console.log(typeofdirector.value)
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
   
    return filtered;
});

const deleteItem = (itemId) => {
    const index = posts.value.findIndex(item => item.id === itemId);
    if (index !== -1) {
    posts.value.splice(index, 1); // Remove the item from the array
    isDelete = true;
    console.log('deleted');
    filteredData
    }
};

const deleteDirector = async (post_id) => {
    Swal.fire({
        title: 'Are you sure you want to delete this?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axios.delete('api/deletedirector/' + post_id)
                deleteItem(post_id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } catch (err) {
                console.log(err)
            }
        }
    })
}
</script>