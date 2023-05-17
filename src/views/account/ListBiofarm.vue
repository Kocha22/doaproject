<template>
    <div v-if="loading">Loading...</div>
    <div class="content-wrapper">
        <table id="customers">        
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Статус фермера</th>
                    <th>Область</th>
                    <th>Район</th>
                    <th>Название села</th>
                    <th>Название малых групп</th>
                    <th>ФИО фермера</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post  in posts" :key="post.id">
                <td>{{ post.id }}</td>
                <td>{{ post.farmer_status }}</td>
                <td>
                    <p v-if="post.oblasts">
                    <span>
                        {{ post.oblasts.name_ru }}
                    </span>
                    </p>
                    <p v-else>{{ post.oblast }} </p>
                </td>
                <td>
                    <p v-if="post.rayons">
                    <span>
                        {{ post.rayons.name_ru }}
                    </span>
                    </p>
                    <p v-else>{{ post.rayon }} </p>
                </td>
                <td>
                    <p v-if="post.villages">
                    <span>
                        {{ post.villages.name_ru }}
                    </span>
                    </p>
                    <p v-else>{{ post.village }} </p>
                </td>
                <td>{{ post.small_groups }}</td>
                <td>{{ post.farmer_name }}</td>
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

        <div class="flex items-center justify-center p-2">
            <v-pagination
                v-model="page"
                :pages="pageCount"
                :range-size="1"
                active-color="#DCEDFF"
                @update:modelValue="getPosts"
            />
        </div>
    </div>
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import axios from 'axios'
import { onBeforeMount, ref } from 'vue';

    let page = ref(1)
    let posts = ref(null)
    let pageCount = ref(null)

    onBeforeMount(async () => {
        await getPosts()
    })

    const getPosts = async () => {
        try {
            const response = await axios.get('api/biofarms?page=' + page.value)
            pageCount.value = response.data.page_count
            posts.value = response.data.paginate.data
            console.log(posts)
        } catch (err) {
            console.log(err)
        }
    }
</script>