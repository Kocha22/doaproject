<template>
    <div class="content-wrapper">
        <div div class="btn-group" role="group">
            <button class="button_1 btn btn-orange" name="but1">Поданные заявки</button>
            <button class="button_1 btn btn-blue" name="but1" value="4">На рассмотрений</button>
            <button class="button_1 btn btn-green" name="but2" value="2">Утвержденные</button>
            <button class="button_1 btn btn-red" name="but3" value="3">Отклоненные заявки</button>
        </div>
        <section class="news">
            <h1 class="title">Заявки</h1>
            <div class="form-gr">
                <input type="text" id="searchApp" name="search" class="form-control"  placeholder="Поиск..." />
            </div>
            <table id="customers">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Номер заявки</th>
                        <th>ФИО</th>
                        <th>Имя руководителя</th>
                        <th>Адрес</th>
                        <th>Телефон</th>
                        <th>Email</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in posts" :key="post.id">
                        <td>{{ post.id }}</td>
                        <td>{{ post.applicant_code }}</td>
                        <td>{{ post.farmer_name }}</td>
                        <td>{{ post.nameofdirector }}</td>
                        <td>{{ post.adress }}</td>
                        <td>{{ post.phone }}</td>
                        <td>{{ post.email }}</td>
                        <td>
                            <div class="action_icons">
                                <router-link :to="'/account/list-applicant/' + post.id">
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
        </section>
    </div>
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import axios from 'axios'
import { onBeforeMount, ref } from 'vue';

    let posts = ref(null)
    let page = ref(1)
    let pageCount = ref(null)

    onBeforeMount(async () => {
        await getPosts()
    })

    const getPosts = async () => {
        try {
            const response = await axios.get('api/applicants?page=' + page.value)
            pageCount.value = response.data.page_count
            posts.value = response.data.posts.data
            console.log(posts)
        } catch (err) {
            console.log(err)
        }
    }
</script>