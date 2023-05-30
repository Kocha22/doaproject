<template>
    <aside class="main-sidebar sidebar-light-primary elevation-1 bg-info">
    <!-- Brand Logo -->
    <a href="../../#" class="brand-link">
        <img src="/img/Logo_DOA1.svg" width="35" height="25">
        <span class="brand-text font-weight-light"> ИС Органика</span>
    </a>
<div class="mt-1">
</div>
    <!-- Sidebar -->
    <div class="sidebar nav-compact text-sm">
        <!-- Sidebar user panel (optional) -->   

        <!-- SidebarSearch Form -->
        <div class="form-inline">
            <div class="input-group" data-widget="sidebar-search">
                <input class="form-control form-control-sidebar" type="search" placeholder="Поиск" aria-label="Search">
                <div class="input-group-append">
                    <button class="btn btn-sidebar">
                        <i class="fas fa-search fa-fw"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Sidebar Menu -->

        <nav class="mt-1   ">


            <ul class="nav nav-pills nav-sidebar flex-column nav-child-indent " data-widget="treeview" role="menu"
                data-accordion="false">
                <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->

            <li class="nav-item ">
                <router-link :to="`/account/admin/${userStore.id}`"
                    class="nav-link">
                 
                    <i class="nav-icon far fa-chart-bar"></i>
                    <p>Главная</p>
                </router-link>
            </li>

            <li class="nav-item">
                <a href="#" class="nav-link">
                    <!-- <i class="nav-icon fas fa-laptop"></i> -->
                    <i class="nav-icon far fa-keyboard"></i>
                    <p>  Справочники
                        <i class="right fas fa-angle-left"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <router-link to="/account/type-reference" class="nav-link">
                            <!-- <i class="fas fa-user-edit nav-icon"></i> -->
                            <i class="nav-icon far fa-user"></i>
                            <p>Типы справочников</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/account/reference-book" class="nav-link">
                        
                            <i class="nav-icon far fa-minus-square"></i>
                            <p>Справочники</p>
                        </router-link>
                    </li>
                </ul>
            </li>
           

            <li class="nav-item ">
                <router-link to="/account/list-applicant"
                    class="nav-link">
                    <i class="nav-icon far fa-address-card"></i>
                    <p>Заявки</p>
                        <span class="right badge badge-success">22</span>
                </router-link>
            </li>

            <li class="nav-item ">
                <a href="#" class="nav-link">
                    <!-- <i class="nav-icon fas fa-laptop"></i> -->
                    <i class="nav-icon far fa-keyboard"></i>
                    <p>  База Данных
                        <i class="right fas fa-angle-left"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <router-link to="/account/list-biofarm" class="nav-link">
                            <!-- <i class="fas fa-user-edit nav-icon"></i> -->
                            <i class="nav-icon far fa-user"></i>
                            <p>БИО-КГ</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/account/list-organic" class="nav-link">
                        
                            <i class="nav-icon far fa-minus-square"></i>
                            <p>Пилотные, ДОСХ</p>
                        </router-link>
                    </li>
                </ul>
            </li>

            <li class="nav-item">
                <a href="#" class="nav-link">
                    <!-- <i class="nav-icon fas fa-laptop"></i> -->
                    <i class="nav-icon far fa-keyboard"></i>
                    <p>  Пользователи
                        <i class="right fas fa-angle-left"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <router-link to="/account/list-user" class="nav-link">
                            <!-- <i class="fas fa-user-edit nav-icon"></i> -->
                            <i class="nav-icon far fa-user"></i>
                            <p>Пользователи</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/account/list-operator" class="nav-link">
                        
                            <i class="nav-icon far fa-minus-square"></i>
                            <p>Операторы</p>
                        </router-link>
                    </li>
                </ul>
            </li>

            <li class="nav-item ">   
                <router-link to="/account/list-land"
                    class="nav-link" >
                    <i class="nav-icon fas fa-grip-horizontal"></i>
                    <p>Земельные участки
                        <i class="right fas fa-angle-left"></i>
                    </p>
                </router-link>
            </li>
            <li class="nav-item ">   
                <router-link to="/account/department-certificate"
                    class="nav-link" >
                    <i class="nav-icon fas fa-grip-horizontal"></i>
                    <p>Органы по сертификации</p>
                </router-link>
            </li>
            <li class="nav-item ">   
                <router-link to="/account/list-certificate"
                    class="nav-link" >
                    <i class="nav-icon fas fa-grip-horizontal"></i>
                    <p>Сертификаты</p>
                    </router-link>
            </li>
            <li class="nav-item ">   
                <router-link to="/account/list-product"
                    class="nav-link" >
                    <i class="nav-icon fas fa-grip-horizontal"></i>
                    <p>Продукция</p>
                </router-link>
            </li>

            <li class="nav-item ">   
                <router-link to="/account/list-report"
                    class="nav-link" >
                    <i class="nav-icon fas fa-grip-horizontal"></i>
                    <p>Отчеты</p>
                </router-link>
            </li>
        </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>

</template>
<script setup>
    import { useUserStore } from '@/stores/user-store.js'
    import { useRouter } from 'vue-router';


    const router = useRouter()
    const userStore = useUserStore()
</script>