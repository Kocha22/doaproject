<template>
<div class="application_wrapper">
<div class="applicant_wrapper-inner">
        <h5 class="applicant_title">Электронная форма заявления</h5>
        <div class="personal_inner">
            <div class="personal">
            </div>
            <p class="personal_title">Личные данные</p>
        </div>
        <div id="res" ></div>
        <form id="form_app" @submit.prevent="createPost">
            <CropperModal
            v-if="showModal"
                :minAspectRatioProp="{width: 8, height: 4}"
                :maxAspectRatioProp="{width: 8, height: 4}"
                @croppedImageData="setCroppedImageData"
                @showModal="showModal = false"
            />
            <table class="form-table">
                        <tbody>
                            <tr>
                                <td><label for="applicant_code">Номер заявки</label></td>
                                <td class="alert_inner">                           
                                <input id="applicant_code" class="form__input post__title" type="text" name="applicant_code" v-model="applicant_code" >
                                <span class="text-danger error-text applicant_code_error"></span>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="date_id">Дата заявки</label></td>
                                <td class="alert_inner">                           
                                <input id="date_id" class="form__input post__title" type="text" name="date_id" :value="day" disabled>                            
                                </td>
                            </tr>
                            <tr>
                                <td><label for="certification">Орган сертификации</label></td>
                                <td class="alert_inner">                           
                                <select id='' name="certification_id" class="choice" v-model="certification_id">
                                <option value="">Выберите орган сертификации</option>
                                <option
                                    v-for="(item, i) in posts"
                                    :value="item.id"
                                    :key="i"
                                    >{{ item.name }}</option
                                >

                                </select>
                                <span v-if="errors.certification_id" class="text-red-500">
                                        {{ errors.certification_id[0] }}
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="date_id"></label></td>
                                <td class="alert_inner2">  
                                <input id="company" type="checkbox" name="company" value="1">     <span class="company_title">Юридическое лицо </span>
                                </td>
                            </tr>       
                            <tr>
                                <td><label for="tin">ИНН</label></td>
                                <td class="alert_inner">                           
                                <input id="tin" class="form__input post__title" type="text" name="tin" v-model="tin">
                                <span v-if="errors.tin" class="text-red-500">
                                        {{ errors.tin[0] }}
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="farmer_name">ФИО оператора</label></td>
                                <td class="alert_inner">                            
                                <input id="farmer_name" class="form__input post__title" type="text" name="farmer_name" v-model="farmer_name">
                                <span v-if="errors.farmer_name" class="text-red-500">
                                        {{ errors.farmer_name[0] }}
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="nameofdirector">ФИО Руководителя</label></td>
                                <td class="alert_inner">                            
                                <input id="nameofdirector" class="form__input post__title" type="text" name="nameofdirector" v-model="nameofdirector">
                                <span v-if="errors.nameofdirector" class="text-red-500">
                                        {{ errors.nameofdirector[0] }}
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="area_id">Адрес регистрации</label></td>
                                <td class="alert_inner">                            
                                <select id='oblast' name="oblast" class="choice" @change.prevent="onChange($event)" v-model="oblast">
                                <option value="">-- Выберите из списка --</option>
                                <option
                                    v-for="(post, i) in posts2"
                                    :value="post.id"
                                    :key="post.id"  
                                    :data-id="post.id"                             
                                    >{{ post.name_ru }}</option
                                >
                                </select>
                                <span v-if="errors.oblast" class="text-red-500">
                                        {{ errors.oblast[0] }}
                                </span>
                                <select id="rayon" name="rayon"  class="choice"  @change.prevent="onChange($event)" v-model="rayon">
                                <option value="">-- Выберите из списка  --</option>
                                
                                <option v-show="rayons.length"
                                    v-for="(item, i) in rayons"
                                    :value="item.id"
                                    :key="item.id"  
                                    :data-id="item.id"                                  
                                    >{{ item.name_ru }}</option
                                >
                                </select>
                                <span v-if="errors.rayon" class="text-red-500">
                                        {{ errors.rayon[0] }}
                                </span>
                                <select id="village" name="village"  class="choice"  v-model="villageAddress">
                                <option value="">-- Выберите из списка  --</option>
                                <option v-show="village.length"
                                    v-for="(item, i) in village"
                                    :value="item.id"
                                    :key="item.id"  
                                    :data-id="item.id"                                 
                                    >{{ item.name_ru }}</option
                                >
                                </select>
                                <span class="text-danger error-text area_id_error"></span>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="adress">Улица, дом, квартира</label></td>
                                <td class="alert_inner">                            
                                <input id="adress" class="form__input post__title" type="text" name="adress" v-model="address">
                                <span class="text-danger error-text adress_error"></span>
                                </td>
                            </tr> 
                            <tr>
                                <td><label for="phone">Контактные даннные</label></td>
                                <td class="alert_inner">                            
                                <input id="phone" class="form__input post__title" type="text" name="phone" v-model="phone">
                                <span v-if="errors.phone" class="text-red-500">
                                        {{ errors.phone[0] }}
                                </span>
                                </td>
                            </tr>  
                            <tr>
                                <td><label for="email">Адрес электронной почты</label></td>
                                <td class="alert_inner">                            
                                <input id="email" class="form__input post__title" type="text" name="email" v-model="email">
                                <span v-if="errors.email" class="text-red-500">
                                        {{ errors.email[0] }}
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="file">Файл</label></td>
                                <td class="alert_inner">                            
                                <input id="file" class="form__input post__title" type="file" name="file" v-on:change="handleFileUpload">
                                <span class="text-danger error-text file_error"></span>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>                    
                    <div class="button-submit">                
                    <button id="btn" class="button light-blue" type="submit" @submit.prevent="createPost">
                            <div v-if="isLoading" class="place-content-center text-center items-center pl-4 pr-3">
                                <svg class="animate-spin -ml-1 mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <span v-else>
                            Отправить 
                            </span>                                           
                    </button>
                    </div>
        </form>
        </div>
        <div class="logo">
                <img src="img/logo1.png" class="logo_img" alt="клик для увеличения" />
        </div>
           
</div>
</template>
<script setup>
    import axios from 'axios';
    import { ref, onBeforeMount } from 'vue';
    import DisplayCropperButton from '@/components/global/DisplayCropperButton.vue';
    import {useFlash} from '@/composables/useFlash.js'
    import swal from 'sweetalert'

    let { flash } = useFlash();

    let isLoading = ref(false)
    let imageData = null
    let image = ref(null)
    let showModal = ref(false)
    let date = new Date();
    let day = date.toISOString().split('T')[0];
    let id = ref('')
    let file = ref(null)  
    let oblasts;
    let result;
    let active = ref(false);
    let selected = ref('');
    let selected2 = ref('');
    let selected3 = ref('');

    let applicant_code = ref(null)
    let certification_id = ref('')
    let tin = ref('')
    let farmer_name = ref('')
    let nameofdirector = ref('')
    let address = ref(null)
    let oblast = ref('');
    let rayon = ref('')
    let villageAddress = ref('')
    let phone = ref('')
    let email = ref('')

    let errors = ref([])

    const setCroppedImageData = (data) => {
        imageData = data
        image.value = data.imageUrl
    }
    
    console.log(day)

    let posts = ref(null)
    let posts2 = ref(null)
    let rayons = ref(null)
    let village = ref(null)

    onBeforeMount(async () => {
        await getPosts()
    })

    const getPosts = async () => {
        try {
            const response = await axios.get('api/posts')
            const areas = await axios.get('api/area')
            posts2.value = areas.data[0].children
            posts.value = response.data[0]
            applicant_code.value = `${day}-${response.data[1]}`;            
            oblasts = areas.data[0].children
            console.log(areas.data[0].children[0].name_ru)
            console.log(response.data[1])
        } catch (err) {
            console.log(err)
        }
    }

    const getArea = async (id) => {
        try {
            const rayonData = await axios.get(`api/getarea/${id}`)
            rayons.value = rayonData.data.children;
            active = true
            console.log(rayonData);
            console.log(rayons);
        } catch (err) {
            console.log(err)
        }
    }

    const getVillage = async (id) => {
        try {
            const villageData = await axios.get(`api/getarea/${id}`)
            village.value = villageData.data.children;
            console.log(villageData);
            console.log(village);
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
        } else if(area_id === 'rayon') {
            getVillage(id)
        }
        
    }

    function handleFileUpload(event) {
      file.value = event.target.files[0];
    }

    const createPost = async () => {
        isLoading.value = true
        errors.value = []
        let data = new FormData();
        data.append('applicant_code', applicant_code.value)
        data.append('certification_id', certification_id.value)
        data.append('tin', tin.value)
        data.append('farmer_name', farmer_name.value)
        data.append('nameofdirector', nameofdirector.value)
        data.append('address', address.value)
        data.append('oblast', oblast.value)
        data.append('rayon', rayon.value)
        data.append('villageAddress', villageAddress.value)
        data.append('phone', phone.value)
        data.append('email', email.value)
        data.append('file', file.value)
        
        try {
            await axios.post('api/storeapplicant', data);   
            swal({text: "Ваша заявка отправлена!", type: 
                "success"}).then(function(){ 
                location.reload();
                }
                );      
        } catch (err) {
            errors.value = err.response.data.errors;
            console.log(errors.value);
            isLoading.value =false
        }
    }

</script>