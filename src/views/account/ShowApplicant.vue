<template>
 <div class="content-wrapper">
    <section class="news">
       <div class="form_table" v-if="post">
                <form id="frm" action="" method="post">
                    <input type="hidden" id="token" value="">
                    <table class="form-table">
                    <tbody>
                        <tr>
                            <td><label for="applicant_id">Номер заявки</label></td>
                            <td>                           
                            <div id="applicant_id">{{ post.applicant_code || '' }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="tin">ИНН</label></td>
                            <td><div id="tin">{{ post.tin || '' }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="name">Наименование</label></td>
                            <td><div id="name">{{ post.farmer_name || '' }}</div>
                             </td>
                        </tr>
                        <tr>
                            <td><label for="nameofdirector">ФИО Руководителя</label></td>
                            <td>{{ post.nameofdirector || '' }}
                             </td>
                        </tr>
                        <tr>
                            <td><label for="adress">Адрес заявителя</label></td>
                            <td>{{ post.address || '' }}
                             </td>
                        </tr>
                        <tr>
                            <td><label for="phone">Контактные даннные</label></td>
                            <td>{{ post.phone || '' }}
                             </td>
                        </tr>  
                        <tr>
                            <td><label for="email">Адрес электронной почты</label></td>
                            <td>{{ post.email || '' }}
                             </td>
                        </tr> 
                         <tr>
                            <td><label for="file">Файлы</label></td>
                            <td>{{ post.file  || ''}}
                             <a href="">Скачать</a>
                             </td>
                        </tr>    
                    </tbody>
                </table>
                <div id="loaderIcon2" class="spinner-border text-primary" style="display:none" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div id="res" ></div>
                <div class="btn_inner">
                    <button class="button_1 btn btn-info" @click.prevent="sendEmail('consider', post.id)" name="but1">На рассмотрений</button>
                    <button class="button_1 btn btn-success" @click.prevent="sendEmail('approve', post.id)" name="but2">Одобрено</button>
                    <button class="button_1 btn btn-danger" @click.prevent="sendEmail('cancel', post.id)" name="but3">Отказано</button>
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

    const route = useRoute()
    let post = ref(null)
    onMounted(async () => {
        await getPostById()
    })
    const getPostById = async () => {
        try {
            let res = await axios.get('api/applicants/' + route.params.id)
            post.value = res.data
            console.log(post);
        } catch (err) {
            console.log(err)
        }
    }

    const clickedButton = ref('');

    const sendEmail = async (buttonName, post_id) => {
        event.preventDefault()
        console.log(buttonName)
        if (!clickedButton.value) {
            // Only execute if no button was previously clicked
            clickedButton.value = buttonName;
            
            try {
            const response = await axios.post(`api/sendemail/${buttonName}/${post_id}`);
            clickedButton.value = ''
            console.log(response.data); // Response from the backend
            } catch (error) {
            console.error(error);
            clickedButton.value = ''
            }
        }
    };

</script>
