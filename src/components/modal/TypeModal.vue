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
                @click="close"
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
                <form id="form_app" @submit.prevent="save">
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
                                <td><label for="short_name">Наименование</label></td>
                                <td>                            
                                <input class="form__input input__title" type="text" name="short_name" v-model="short_name">
                                <span v-if="errors.name" class="text-red-500">
                                        {{ errors.name[0] }}
                                </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
              </p>
              <button
                @click="close"
                class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
              >
                Отмена
              </button>
              <button @click="saveAndClose" class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
<script setup>
import { ref } from 'vue';

const emit = defineEmits(['save', 'close'])

let code = ref('')
let name = ref('')
let errors = ref([]);
let posts = ref(null)
let short_name = ref('')
let isOpen = ref(false)

const save = () => {
    const formData = {
    name: name.value,
    code: code.value,
    short_name: short_name.value
    }
    
    emit('save', formData);
}

const close = () => {
  isOpen.value = false
  emit('close', isOpen);
};

const saveAndClose = () => {
  save();
  setTimeout(()=> {
    close()
  }, 3000);  
};
</script>