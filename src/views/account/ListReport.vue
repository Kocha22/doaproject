<template>
    <div v-if="loading">Loading...</div>
    <div class="content-wrapper">
        <section class="content text-sm table-sm">
          <div class="flex">
                <select id='oblast' name="oblast" class="choice block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="filterValue">
                        <option value="">Выберите область</option>
                        <option
                            v-for="(post, i) in posts2"
                            :value="post.id"
                            :key="post.id"  
                            :data-id="post.id"                              
                            >{{ post.name_ru }}</option
                        >
                </select>
                <select id="rayon" name="rayon"  class="choice block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  @change.prevent="onChange($event)" v-model="selectedRayon">
                <option value="">Выберите район</option>
                
                <option 
                    v-for="(post, i) in getArea"
                    :value="post.id"
                    :key="post.id"  
                    :data-id="post.id"                                
                    >{{ post.name_ru }}</option
                >
                </select>
                <select id="village" name="village"  class="choice block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="selectedVillage">
                <option value=''>Выберите город или село</option>
                <option 
                    v-for="(post, i) in getVillage"
                    :value="post.id"
                    :key="post.id"  
                    :data-id="post.id"                                  
                    >{{ post.name_ru }}</option
                >
                </select>
            </div>

            <input type="text" v-model="searchQuery" placeholder="Поиск" class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

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
                  <tr v-for="post  in filteredData" :key="post.id">
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

          <div id="paginationLinks">
            <ul class="page-list">
              <li v-if="currentPage > 1" class="page-item">
                <a class="page-link" href="#" @click="goToPage(currentPage - 1)">&laquo;</a>
              </li>
              <li v-else class="page-item disabled">
                <span class="page-link">&laquo;</span>
              </li>

              <li v-for="page in displayedPages" :key="page" :class="{ active: page === currentPage }" class="page-item">
                <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
              </li>

              <li v-if="currentPage < lastPage" class="page-item">
                <a class="page-link" href="#" @click="goToPage(currentPage + 1)">&raquo;</a>
              </li>
              <li v-else class="page-item disabled">
                <span class="page-link">&raquo;</span>
              </li>
            </ul>
          </div>
        </section>
        <button class="ml-2 my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="exportExcel">Экспортировать в эксел</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [], // Data property to store the users data
      currentPage: 1,
      lastPage: 0,
      displayedPages: [],
      filterValue: '',
      total: 0,
      posts: {},
      posts2: {},
      pageCount: 0,
      searchQuery: '',
      selectedRayon: '',
      selectedVillage: '',
      postArea: {},
      type: '',
      date: '',
      day: '',
      url: '',
      link: '',
      uniqueNumber: ''
    };
  },
  mounted() {
    this.getUsers(); // Call the method to fetch users data
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get('api/getreport?page='+this.currentPage);
        const areas = await axios.get('api/area')
        this.posts2 = areas.data[0].children
        this.postArea = areas.data
        this.pageCount = response.data.page_count
        this.posts = response.data.posts.data
        this.users = response.data.data; // Store the users data
        this.currentPage = response.data.currentPage;
        this.lastPage = response.data.lastPage;
        this.total = response.data.total;
        this.updateDisplayedPages();
      } catch (error) {
        console.log(error);
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.getUsers();
    },
    updateDisplayedPages() {
      const limit = 5; // Change this to set the number of visible pages
      const start = Math.max(1, this.currentPage - Math.floor(limit / 2));
      const end = Math.min(this.lastPage, start + limit - 1);
      this.displayedPages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    getUserUrl(userId) {
      return '{{ route("showbio", ":user_id") }}'.replace(':user_id', userId);
    },
    editUserUrl(userId) {
      return '{{ route("updatebio", ":user_id") }}'.replace(':user_id', userId);
    },
    deleteUserUrl(userId) {
      return '{{ route("deletebio", ":user_id") }}'.replace(':user_id', userId);
    },
    exportExcel() {
      if(this.filterValue === '') {
        this.type = 'All';
      } else {
        this.type = this.filterValue
      }
      try {
        axios.get(`api/export/${this.type}`, {responseType: 'arraybuffer'})
        .then(response => {          
          this.url = window.URL.createObjectURL(new Blob([response.data]));
          this.link = document.createElement('a');
          this.link.href = this.url;
          this.date = new Date()
          this.day = this.date.toISOString().split('T')[0];

          const digits = '0123456789';
          const numDigits = 6;
          
          for (let i = 0; i < numDigits; i++) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            const digit = digits.charAt(randomIndex);
            this.uniqueNumber += digit;
          }

          this.link.setAttribute('download', `users-${this.uniqueNumber}.xlsx`);
          document.body.appendChild(this.link);
          this.link.click();        
          const data = response.data;
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });        
      }
      catch(err) {
        console.log(err);
      }
    }
  },
  computed: {
      filteredData() {
          let filtered = this.posts;
          console.log(filtered);
        
          // Filter based on selected option
          if (this.filterValue) {
            console.log(this.filterValue);
            filtered = filtered.filter(item => {
                if(this.filterValue == '') {
                    console.log(this.filterValue);
                    return item;
                } else if (item.oblast == this.filterValue) {
                    console.log(this.filterValue);
                    return item;
                } else {
                  console.log(this.filterValue);
                }                    
            });

            if (this.selectedRayon) {
                  filtered = filtered.filter(item => {
                      if(this.selectedRayon == 0) {
                          return item;
                      } else if (item.rayon == this.selectedRayon) {
                          return item;
                      }   
                  });
            }    
            
            if (this.selectedVillage) {
                  filtered = filtered.filter(item => {
                      if(this.selectedVillage == 0) {
                          return item;
                      } else if (item.village == this.selectedVillage) {
                          return item;
                      }   
                  });
            }
            console.log("Filtered by Option:", filtered);
          } 

      
          // Filter based on search query
          if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(item => {
              return item.farmer_name.toLowerCase().includes(query);
            });
          }
          console.log(filtered);
          return filtered;
      },
      getArea() {        
        if (this.filterValue) {
          let filtered = this.postArea;
          console.log(filtered);
            filtered = filtered.filter(item => {
                if(item.parent == this.filterValue) {
                    return item;
                } 
            });
            console.log(filtered);
            return filtered;
        } else {
          this.selectedRayon = ''
        }
        
      },
      getVillage() {        
        if (this.selectedRayon) {
            let filtered = this.postArea;
            console.log(filtered);
            filtered = filtered.filter(item => {
                if(item.parent == this.selectedRayon) {
                    return item;
                } 
            });
            console.log(filtered);
            return filtered;
        } else {
          this.selectedVillage = ''
        }    
      }
    }  
};
</script>

<style>
.page-list {
    display: flex;
}
</style>
