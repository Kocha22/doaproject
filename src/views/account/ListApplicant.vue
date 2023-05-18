<template>
    <div class="content-wrapper">
        <div div class="btn-group" role="group">
            <button class="button_1 btn btn-orange" @click.prevent="setSelectedOption('all')"  name="but1">Поданные заявки</button>
            <button class="button_1 btn btn-blue" name="but1" @click.prevent="setSelectedOption('4')" value="4">На рассмотрений</button>
            <button class="button_1 btn btn-green" name="but2" @click.prevent="setSelectedOption('2')" value="2">Утвержденные</button>
            <button class="button_1 btn btn-red" name="but3" @click.prevent="setSelectedOption('3')" value="3">Отклоненные заявки</button>
        </div>
        <section class="news">
            <h1 class="title">Заявки</h1>
            <div class="form-gr">
                <input type="text" v-model="searchQuery" placeholder="Search">
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
                    <tr v-for="post in filteredData" :key="post.id">
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
                                <div @click.prevent="deleteApplicant(post.id)"><input type="submit" title="Удалить" class="delete-icon"></div>    
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
import Swal from 'sweetalert2'
import axios from 'axios'
import { onBeforeMount, ref, computed } from 'vue';

    let posts = ref(null)
    let posts2= ref(null)
    let page = ref(1)
    let pageCount = ref(null)
    const selectedOption = ref('');
    let searchQuery = ref('')

    onBeforeMount(async () => {
        await getPosts()
    })

    const getPosts = async () => {
        try {
            const response = await axios.get(`api/applicants?page=${page.value}`)
            pageCount.value = response.data.page_count
            posts.value = response.data.posts.data
            posts2.value = response.data.posts2
            console.log(posts2)
        } catch (err) {
            console.log(err)
        }
    }

    const setSelectedOption = (option) => {
      selectedOption.value = option;
    };

    const filteredData = computed(() => {      
      let filtered;
      if(selectedOption.value == 'all') {
        filtered = posts.value;
      } else {
        filtered = posts2.value
      }
      
      // Filter based on selected option
      if (selectedOption.value) {
        console.log(selectedOption.value)
        filtered = filtered.filter(function(item) {
            if(selectedOption.value == 'all') {
                return item;
            } else if (item.appstatus_id == selectedOption.value) {
                return item;
            }                 
        });
         console.log("Filtered by Option:", filtered);
      } 

     
      // Filter based on search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(item => {
          return item.farmer_name.toLowerCase().includes(query);
        });
      }
      
      return filtered;
    });

    const deleteItem = (itemId) => {
      const index = posts.value.findIndex(item => item.id === itemId);
      if (index !== -1) {
        posts.value.splice(index, 1); // Remove the item from the array
      }
    };

    const deleteApplicant = async (post_id) => {
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
                    await axios.delete('api/applicants/' + post_id)
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