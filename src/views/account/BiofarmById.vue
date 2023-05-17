<template>
<div class="content-wrapper">
<section class="news">
       <div class="form_table" v-if="post">
                <form id="frm" method="post">
                    <input type="hidden" id="token" value="">
                    <table class="form-table">
                    <tbody>
                    <tr>
                            <td><label for="farmer_code">Код фермера</label></td>
                            <td>                           
                            <div id="farmer_code">{{ post.farmer_code || '' }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="farmer_status">Статус фермера</label></td>
                            <td>                            
                            <div id="farmer_status">{{ post.farmer_status || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="date_conversion">Дата начала конверсии</label></td>
                            <td>                            
                            <div id="date_conversion">{{ post.date_conversion || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="GL">ЛГ</label></td>
                            <td>                            
                            <div id="GL">{{ post.GL || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="Inspector">РИ</label></td>
                            <td>                            
                            <div id="Inspector">{{ post.Inspector || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="oblast">Область</label></td>
                            <td>                            
                            <div id="oblast" v-if="post.oblasts">{{ post.oblasts.name_ru || '' }}</div>
                            <div id="oblast" v-else>{{ post.oblast || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="rayon">Район</label></td>
                            <td>                            
                            <div id="rayon" v-if="post.rayons">{{ post.rayons.name_ru || '' }}</div>
                            <div id="rayon" v-else>{{ post.rayon || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="village">Название села</label></td>
                            <td>                            
                            <div id="village" v-if="post.villages">{{ post.villages.name_ru || '' }}</div>
                            <div id="village" v-else>{{ post.village || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="small_groups">Название малых групп</label></td>
                            <td>                            
                            <div id="small_groups">{{ post.small_groups || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="farmer_name">ФИО фермера</label></td>
                            <td>                            
                            <div id="farmer_name">{{ post.farmer_name || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="gender">пол</label></td>
                            <td>                            
                            <div id="gender">{{ post.gender || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="date_birth">Год рождения</label></td>
                            <td>                            
                            <div id="date_birth">{{ post.date_birth || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="total_organic_area_ha">Всего органическая площадь(га)</label></td>
                            <td>                            
                            <div id="total_organic_area_ha">{{ post.total_organic_area_ha || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="irrigated_land">из них орг.орошаемая пашня(га)</label></td>
                            <td>                            
                            <div id="irrigated_land">{{ post.irrigated_land || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="rainfed_land">из них орг.богарная пашня(га)</label></td>
                            <td>                            
                            <div id="rainfed_land">{{ post.rainfed_land || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="garden">из них органический сад/лес(га)</label></td>
                            <td>                            
                            <div id="garden">{{ post.garden || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="convent">Трад. С-0(га)</label></td>
                            <td>                            
                            <div id="convent">{{ post.convent || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="in_conversion">Переходный С-1(га)</label></td>
                            <td>                            
                            <div id="in_conversion">{{ post.in_conversion || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="organic">Органический по стандарту EC 834/07, 889/08(га)</label></td>
                            <td>                            
                            <div id="organic">{{ post.organic || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="cotton">Хлопок(га)</label></td>
                            <td>                            
                            <div id="cotton">{{ post.cotton || '' }}</div>
                             </td>
                        </tr>                                                     
                    </tbody>
                    </table>
                <label for="certificate">Сертификаты</label>
                <div class="image_wrapper-inner">
                        <div class="image__wrapper">
                            <img src="" class="minimized" alt="клик для увеличения" />
                        </div>
                        <div class="image__wrapper">
                            <img src="" class="minimized" alt="клик для увеличения" />
                        </div>
                        <div class="image__wrapper">
                            <img src="" class="minimized" alt="клик для увеличения" />
                        </div>
                        <div class="image__wrapper">
                            <img src="" class="minimized" alt="клик для увеличения" />
                        </div>
                        <div class="image__wrapper">
                            <img src="" class="minimized" alt="клик для увеличения" />
                        </div>
                </div>
                <label for="certificate">Локация на карте</label>
                <div class="image__wrapper">
                  <img src="" class="minimized" alt="клик для увеличения" />
                </div>
                </form>
                <div class="button-submit">                
                <router-link class="button red" to="/account/list-biofarm">Назад</router-link>
                </div>

        </div>
</section>
</div>
</template>

<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router'

    const route = useRoute()
    let post = ref(null)
    onMounted(async () => {
        await getPostById()
    })
    const getPostById = async () => {
        try {
            let res = await axios.get('api/biofarm/' + route.params.id)
            post.value = res.data
            console.log(post);
        } catch (err) {
            console.log(err)
        }
    }
</script>