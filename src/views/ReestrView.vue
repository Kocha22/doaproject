<template>
    <div v-if="loading">Loading...</div>
    <div class="application_wrapper">
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
                <td></td>
                <td>

                </td>
            </tr>
            </tbody>
        </table>
        <div class="logo">
            <img src="img/logo1.png" class="logo_img" alt="клик для увеличения" />
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { onBeforeMount, ref } from 'vue';

    let posts = ref(null)

    onBeforeMount(async () => {
        await getPosts()
    })

    const getPosts = async () => {
        try {
            const response = await axios.get('api/certificate')
            posts.value = response.data
            console.log(posts)
        } catch (err) {
            console.log(err)
        }
    }
</script>