<template>
    <div class="container mx-auto">
      <div class="">
        <button
          @click="isOpen = true"
          class="px-6 py-2 text-white bg-blue-600 rounded shadow"
          type="button"
        >
          <slot/>
        </button>
  
        <div
          v-show="isOpen"
          class="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-gray-700 bg-opacity-50
          "
        >
          <div class="max-w-2xl p-6 mx-4 bg-white rounded-md shadow-xl z-1000">
            <div class="flex items-center justify-between">
              <h3 class="text-2xl">Добавить новый справочник</h3>
              <svg
                @click="isOpen = false"
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 text-red-900 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="mt-4">
              <p class="mb-4 text-sm">
                <form id="form_app" @submit.prevent="createPost">
                    <table class="form-table">
                        <tbody>
                            <tr>
                                <td><label for="code">Код</label></td>
                                <td>                           
                                <input class="form__input input__title" type="text" name="code" v-model="code">
                                <span v-if="errors.code" class="text-red-500">
                                        {{ errors.code[0] }}
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="name">Наименование</label></td>
                                <td>                            
                                <input class="form__input input__title" type="text" name="name" v-model="name">
                                <span v-if="errors.name" class="text-red-500">
                                        {{ errors.name[0] }}
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="choice_id">Статус</label></td>
                                <td>                            
                                  <select id='choice_id' name="choice_id" class="choice block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="choice_id">
                                      <option value="">Выберите из списка</option>
                                      <option
                                          v-for="(post, i) in choices"
                                          :value="post.id"
                                          :key="post.id"  
                                          :data-id="post.id"                              
                                          >{{ post.name }}</option
                                      >
                                </select>
                                </td>
                            </tr>
                            <tr>
                              <td><label for="typeofdirector_id">Тип справочника</label></td>
                              <td> 
                              <select id='typeofdirector_id' name="typeofdirector_id" class="choice block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="typeofdirector_id">
                                      <option value="">Выберите из списка</option>
                                      <option
                                          v-for="(post, i) in typeofdirector"
                                          :value="post.id"
                                          :key="post.id"  
                                          :data-id="post.id"                              
                                          >{{ post.name }}</option
                                      >
                              </select>
                              </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
              </p>
              <button
                @click="isOpen = false"
                class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
              >
                Отмена
              </button>
              <button @click="createPost" class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { ref, toRefs } from 'vue';
  import Swal from '../../sweetalert2.js'
  import axios from 'axios';

  export default {
    props: {
      choices: {
        type: Array,
        required: true,
      },
      typeofdirector: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      let isOpen = ref(false);
      let code = ref('')
      let name = ref('')
      let errors = ref([]);
      let posts = ref(null)
      let choice_id = ref('');
      let typeofdirector_id = ref('');

      const { choices, typeofdirector } = toRefs(props);
      console.log(choices);

      const createPost = async () => {
          errors.value = []
          let data = new FormData();
          data.append('code', code.value)
          data.append('name', name.value)
          data.append('choice_id', choice_id.value)
          data.append('typeofdirector_id', typeofdirector_id.value)
          
          try {
              await axios.post('api/storereference', data);   
              Swal.fire("Ваша заявка отправлена!");
              setTimeout(()=> {
                isOpen.value = false
              }, 2000);
          } catch (err) {
            if (err.response) {
                errors.value = err.response.data.errors;
                console.log(errors.value);
            } else {
                console.log(err); 
            }   
          }
      }

      return {
         isOpen,
         code,
         name,
         typeofdirector,
         choice_id,
         typeofdirector_id,
         errors,
         posts,
         createPost,
         choices
      };
    }
  };
  </script>