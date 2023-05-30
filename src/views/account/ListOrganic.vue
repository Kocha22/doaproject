<template>
    <div v-if="loading">Loading...</div>
    <div class="content-wrapper">
        <section class="content text-sm table-sm">
            <select id='oblast' name="oblast" class="choice" @change.prevent="onChange($event)" v-model="selectedOption">
                    <option value="0">Выберите адрес</option>
                    <option
                        v-for="(post, i) in posts2"
                        :value="post.id"
                        :key="post.id"  
                        :data-id="post.id"                              
                        >{{ post.name_ru }}</option
                    >
                    </select>
                    <select id="rayon" name="rayon"  class="choice"  @change.prevent="onChange($event)" v-model="selectedRayon">
                    <option value='0'>-- Выберите из списка  --</option>
                    
                    <option v-show="rayons.length"
                        v-for="(post, i) in rayons"
                        :value="post.id"
                        :key="post.id"  
                        :data-id="post.id"                                
                        >{{ post.name_ru }}</option
                    >
                    </select>
                    <select id="village" name="village"  class="choice" v-model="selectedVillage">
                    <option value='0'>-- Выберите из списка  --</option>
                    <option v-show="village.length"
                        v-for="(post, i) in village"
                        :value="post.id"
                        :key="post.id"  
                        :data-id="post.id"                                  
                        >{{ post.name_ru }}</option
                    >
            </select>

            
            <input type="text" v-model="searchQuery" placeholder="Search">
            
            <table id="customers">        
                <thead>
                    <tr>
                        <th rowspan="2">ID</th>
                        <th rowspan="2">ОАЧ менен  иш алып барган тараптар </th>
                        <th colspan="2">Пилоттук чарба</th>
                        <th colspan="2">Органикалык аймак</th>
                        <th rowspan="2">Продукциянын түрү</th>
                        <th rowspan="2">Продукциянын көлөмү тонна</th>
                        <th rowspan="2">Анын ичинен экспорт</th>
                        <th rowspan="2">Действие</th>
                    </tr>
                    <tr>
                        <th>саны</th>
                        <th>Аянты га</th>
                        <th>саны</th>
                        <th>Аянты га</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="post  in filteredData" :key="post.id">
                        <td>{{ post.id }}</td>
                        <td>{{ post.name }}</td>
                        <td>{{ post.pilotfarm_quantity }}</td>
                        <td>{{ post.pilotfarm_square }}</td>
                        <td>{{ post.organicarea_quantity }}</td>
                        <td>{{ post.organicarea_square }}</td>
                        <td>{{ post.list_product }}</td>
                        <td>{{ post.weight }}</td>
                        <td>{{ post.export }}</td>
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
let posts2 = ref(null)
let rayons = ref(null)
let village = ref(null)
let page = ref(1)
let posts = ref(null)
let posts3 = ref(null)
let pageCount = ref(null)
let selectedOption = ref('')
let selectedRayon = ref('')
let selectedVillage = ref('')
let searchQuery = ref('')
let active = ref(false);
let itemsPerPage = ref(10);

onBeforeMount(async () => {
    await getPosts()
})

const getPosts = async () => {
    try {
        const response = await axios.get('api/organicfarms?page=' + page.value)
        const areas = await axios.get('api/area')
        posts2.value = areas.data[0].children
        pageCount.value = response.data.page_count
        posts.value = response.data.paginate.data
        posts3.value = response.data.posts3
        console.log(posts3)
        loading = true
    } catch (err) {
        console.log(err)
    }
}

const getArea = async (id) => {
    try {
        const rayonData = await axios.get(`api/getarea/${id}`)
        rayons.value = rayonData.data.children;
        active = true
    } catch (err) {
        console.log(err)
    }
}

const getVillage = async (id) => {
    try {
        const villageData = await axios.get(`api/getarea/${id}`)
        village.value = villageData.data.children;
    } catch (err) {
        console.log(err)
    }
}

function onChange (event) {
    let area_id = event.target.getAttribute('id');
    console.log(area_id);
    id = event.target.options[event.target.options.selectedIndex].getAttribute('data-id');
    if(area_id === 'oblast') {
        getArea(id)
        selectedRayon.value = '';
        selectedVillage.value = ''
    } else if(area_id === 'rayon') {
        getVillage(id)
        selectedVillage.value = ''
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
      
      // Filter based on selected option
      if (selectedOption.value) {
        filtered = filtered.filter(function(item) {
            if(selectedOption.value == 0) {
                return item;
            } else if (item.oblast == selectedOption.value) {
                return item;
            }                 
        });
         console.log("Filtered by Option:", filtered);
      } 

      if (selectedRayon.value) {
            filtered = filtered.filter(function(item) {
                if(selectedRayon.value == 0) {
                    return item;
                } else if (item.rayon == selectedRayon.value) {
                    return item;
                }   
            });
      }

      if (selectedVillage.value) {
            filtered = filtered.filter(function(item) {
                if(selectedVillage.value == 0) {
                    return item;
                } else if (item.village == selectedVillage.value) {
                    return item;
                }   
            });
      }
      
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