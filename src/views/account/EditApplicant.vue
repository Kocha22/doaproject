<template>
    <div class="content-wrapper">
        <section class="content text-sm table-sm">
        <div class="form_table">
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
                                    <input id="applicant_code" class="form__input post__title" type="text" name="applicant_code" v-model="applicant_code">
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
                                    <select id='certification_id' name="certification_id" class="choice" v-model="certification_id">
                                    <option :value="null">Выберите орган сертификации</option>
                                    <option
                                        v-for="(item, i) in postsCertificate"
                                        :value="item.id"
                                        :key="i"
                                        :selected="item.id === post.certification_id"
                                        >{{ item.name }}</option
                                    >

                                    </select>
                                    <span class="text-danger error-text certification_id_error"></span>
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
                                    <span class="text-danger error-text tin_error"></span>
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
                                        {{ errors.nameofdirector }}
                                    </span>
                                    <span class="text-danger error-text nameofdirector_error"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label for="area_id">Адрес регистрации</label></td>
                                    <td class="alert_inner">                            
                                    <select id='oblast' name="oblast" class="choice" @change.prevent="onChange($event)" v-model="oblast">
                                    <option value="0">Выберите адрес</option>
                                    <option
                                        v-for="(item, i) in posts2"
                                        :value="item.id"
                                        :key="item.id"  
                                        :data-id="item.id"   
                                        :selected="item.id === post.oblast"                  
                                        >{{ item.name_ru }}</option>
                                    </select>
                                    <select id="rayon" name="rayon"  class="choice"  @change.prevent="onChange($event)" v-model="rayon">
                                    <option value='0'>-- Выберите из списка  --</option>
                                    
                                    <option v-show="rayons.length"
                                        v-for="(item, i) in rayons"
                                        :value="item.id"
                                        :key="item.id"  
                                        :data-id="item.id"   
                                        :selected="item.id == post.rayon"                                
                                        >{{ item.name_ru }}</option
                                    >
                                    </select>
                                    <select id="village" name="village"  class="choice" v-model="villageAddress">
                                    <option value='0'>-- Выберите из списка  --</option>
                                    <option v-show="village.length"
                                        v-for="(item, i) in village"
                                        :value="item.id"
                                        :key="item.id"  
                                        :data-id="item.id"     
                                        :selected="item.id == post.village"                              
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
                                    <span class="text-danger error-text phone_error"></span>
                                    </td>
                                </tr>  
                                <tr>
                                    <td><label for="email">Адрес электронной почты</label></td>
                                    <td class="alert_inner">                            
                                    <input id="email" class="form__input post__title" type="text" name="email" v-model="email">
                                    <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="loaderIcon" class="spinner-border text-primary" style="display:none" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
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
        </section>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router'
    import DisplayCropperButton from '@/components/global/DisplayCropperButton.vue';
    import CropperModal from '@/components/global/CropperModal.vue';
    import CroppedImage from '@/components/global/CroppedImage.vue';
    import {useFlash} from '@/composables/useFlash.js'
    import swal from 'sweetalert'

    let imageData = null
    let image = ref(null)
    let isLoading = ref(false)
    let showModal = ref(false)
    let date = new Date();
    let day = date.toISOString().split('T')[0];
    let id = ref('')
    let oblasts;
    let result;
    let active = ref(false);
    let selectOption = ref('');
    let selected = ref('');
    let selected2 = ref('');
    let selected3 = ref('');

    
    let certification_id = ref(null)
    let tin = ref('')
    let farmer_name = ref('')
    let nameofdirector = ref('')
    let address = ref(null)
    let oblast = ref(null)
    let rayon = ref(null)
    let villageAddress = ref(null)
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
    let postsCertificate = ref(null)

    const route = useRoute()
    let post = ref(null) 
    let post_id = ref(null)  
    let applicant_code = ref('')

    const getPostById = async () => {
        try {
            let res = await axios.get('api/applicants/' + route.params.id)
            const areas = await axios.get('api/area')
            const response = await axios.get('api/posts')
            postsCertificate.value = response.data[0]
            posts2.value = areas.data[0].children
            post.value = res.data
            certification_id.value = post.value.certification_id
            oblast.value = post.value.oblast
            rayon.value = post.value.rayon
            villageAddress.value = post.value.village
            post_id = post.value.oblast
            applicant_code.value = post.value.applicant_code
            tin.value = post.value.tin
            farmer_name.value = post.value.farmer_name
            nameofdirector.value = post.value.nameofdirector
            phone.value = post.value.phone
            email.value = post.value.email
            console.log(post_id);
            oblasts = areas.data[0].children
            console.log(areas.data[0].children[0].name_ru)
            console.log(posts2)
        } catch (err) {
            console.log(err)
        }
    }

    onMounted(async () => {
        await getPostById();
        await getArea(post.value.oblast);
        await getVillage(post.value.rayon);
    })

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
        data.append('village', villageAddress.value)
        data.append('phone', phone.value)
        data.append('email', email.value)
        
        try {
            await axios.post(`api/updateapplicant/${route.params.id}`, data);   
            swal({title: "Good job", text: "You clicked the button!", type: 
                "success"}).then(function(){ 
                window.location = '/account/list-applicant';
                }
                );      
        } catch (err) {
            errors.value = err.response.data.errors;
            console.log(errors.value);
            isLoading.value = false
        }
    }


</script>
