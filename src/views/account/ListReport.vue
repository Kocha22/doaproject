<template>
    <div v-if="loading">Loading...</div>
    <div class="content-wrapper">
        <section class="content text-sm table-sm">
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
      pageCount: 0
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
        this.pageCount = response.data.page_count
        this.posts = response.data.posts.data
        this.users = response.data.data; // Store the users data
        this.currentPage = response.data.currentPage;
        this.lastPage = response.data.lastPage;
        this.total = response.data.total;
        this.updateDisplayedPages();
      } catch (error) {
        console.error(error);
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
  },
};
</script>

<style>
.page-list {
    display: flex;
}
</style>
