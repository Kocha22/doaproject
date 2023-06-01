<template>
    <aside class="main-sidebar sidebar-light-primary elevation-1 bg-info">
    <!-- Brand Logo -->
    <a href="#" class="flex p-2 items-center">
        <img src="/img/Logo_DOA1.svg" width="35" height="25">
        <span class="brand-text font-weight-regular pl-2"> ИС Органика</span>
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
                        <font-awesome-icon :icon="['fa', 'search']" />
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
                 
                    <font-awesome-icon :icon="['fas', 'chart-bar']" size="xl" />
                    <p class="pl-2">Главная</p>
                </router-link>
            </li>

            <li class="nav-item">
                <a href="#" class="nav-link">
                    <!-- <i class="nav-icon fas fa-laptop"></i> -->
                    <font-awesome-icon :icon="['far', 'keyboard']" size="xl" />
                    <p class="pl-2">Справочники</p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <router-link to="/account/type-reference" class="nav-link">
                            <!-- <i class="fas fa-user-edit nav-icon"></i> -->
                            <font-awesome-icon :icon="['far', 'user']" size="xl" />
                            <p class="pl-2">Типы справочников</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/account/reference-book" class="nav-link">
                        
                            <font-awesome-icon :icon="['far', 'minus-square']" size="xl" />
                            <p class="pl-2">Справочники</p>
                        </router-link>
                    </li>
                </ul>
            </li>
           

            <li class="nav-item ">
                <router-link to="/account/list-applicant"
                    class="nav-link">
                    <font-awesome-icon :icon="['far', 'address-card']" size="xl" />
                    <p class="pl-2">Заявки</p>
                </router-link>
            </li>

            <li class="nav-item ">
                <a href="#" class="nav-link">
                    <!-- <i class="nav-icon fas fa-laptop"></i> -->
                    <font-awesome-icon :icon="['far', 'keyboard']" size="xl" />
                    <p class="pl-2">База Данных</p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <router-link to="/account/list-biofarm" class="nav-link">
                            <font-awesome-icon :icon="['far', 'keyboard']" size="xl" />
                            <p class="pl-2">БИО-КГ</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/account/list-organic" class="nav-link">                        
                            <font-awesome-icon :icon="['far', 'minus-square']" size="xl" />
                            <p class="pl-2">Пилотные, ДОСХ</p>
                        </router-link>
                    </li>
                </ul>
            </li>

            <li class="nav-item">
                <a href="#" class="nav-link">
                    <!-- <i class="nav-icon fas fa-laptop"></i> -->
                    <font-awesome-icon :icon="['far', 'keyboard']" size="xl" />
                    <p class="pl-2">Пользователи</p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <router-link to="/account/list-user" class="nav-link">
                            <font-awesome-icon :icon="['far', 'user']" size="xl" />
                            <p class="pl-2">Пользователи</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/account/list-operator" class="nav-link">
                        
                            <font-awesome-icon :icon="['far', 'minus-square']" size="xl" />
                            <p class="pl-2">Операторы</p>
                        </router-link>
                    </li>
                </ul>
            </li>

            <li class="nav-item ">   
                <router-link to="/account/list-land"
                    class="nav-link" >
                    <font-awesome-icon icon="fa-solid fa-grip-horizontal" size="xl" />
                    <p class="pl-2">Земельные участки</p>
                </router-link>
            </li>
            <li class="nav-item ">   
                <router-link to="/account/department-certificate"
                    class="nav-link" >
                    <font-awesome-icon icon="fa-solid fa-grip-horizontal" size="xl" />
                    <p class="pl-2">Органы по сертификации</p>
                </router-link>
            </li>
            <li class="nav-item ">   
                <router-link to="/account/list-certificate"
                    class="nav-link" >
                    <font-awesome-icon :icon="['fas', 'grip-horizontal']" size="xl" />
                    <p class="pl-2">Сертификаты</p>
                    </router-link>
            </li>
            <li class="nav-item ">   
                <router-link to="/account/list-product"
                    class="nav-link" >
                    <font-awesome-icon icon="fa-solid fa-grip-horizontal" size="xl" />
                    <p class="pl-2">Продукция</p>
                </router-link>
            </li>

            <li class="nav-item ">   
                <router-link to="/account/list-report"
                    class="nav-link" >
                    <font-awesome-icon icon="fa-solid fa-grip-horizontal" size="xl" />
                    <p class="pl-2">Отчеты</p>
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