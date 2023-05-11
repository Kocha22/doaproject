import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CertificationView from '../views/CertificationView.vue'
import ReestrView from '../views/ReestrView.vue'
import Applicant from '../components/main/Applicant.vue'
import LoginView from '../views/LoginView.vue'
import AccountView from '../views/AccountView.vue'
import Admin from '../components/dashboard/Admin.vue'
import DepartmentCertificate from '../views/account/DepartmentCertificate.vue'
import ListApplicant from '../views/account/ListApplicant.vue'
import ListBiofarm from '../views/account/ListBiofarm.vue'
import ListCertificate from '../views/account/ListCertificate.vue'
import ListLand from '../views/account/ListLand.vue'
import ListOperator from '../views/account/ListOperator.vue'
import ListOrganic from '../views/account/ListOrganic.vue'
import ListProduct from '../views/account/ListProduct.vue'
import ListReport from '../views/account/ListReport.vue'
import ListUser from '../views/account/ListUser.vue'
import ReferenceBook from '../views/account/ReferenceBook.vue'
import TypeReference from '../views/account/TypeReference.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'applicant',
          component: Applicant
        },
        {
          path: '/certification',
          name: 'certification',
          component: CertificationView
        },
        {
          path: '/reestr',
          name: 'reestr',
          component: ReestrView
        },
        {
          path: '/login',
          name: 'login',
          component: LoginView
        },
        {
          path: '/register',
          name: 'register',
          component: RegisterView
        }
      ]
    }, 
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      children: [
        {
          path: 'admin/:id',
          name: 'admin',
          component: Admin
        },
        {
          path: 'type-reference',
          name: 'TypeReference',
          component: TypeReference
        },
        {
          path: 'reference-book',
          name: 'ReferenceBook',
          component: ReferenceBook
        },
        {
          path: 'list-applicant',
          name: 'ListApplicant',
          component: ListApplicant
        },
        {
          path: 'list-biofarm',
          name: 'ListBiofarn',
          component: ListBiofarm
        },
        {
          path: 'list-organic',
          name: 'ListOrganic',
          component: ListOrganic
        },
        {
          path: 'list-user',
          name: 'ListUser',
          component: ListUser
        },
        {
          path: 'list-operator',
          name: 'ListOperator',
          component: ListOperator
        },
        {
          path: 'list-land',
          name: 'ListLand',
          component: ListLand
        },        
        {
          path: 'department-certificate',
          name: 'DepartmentCertificate',
          component: DepartmentCertificate
        },        
        {
          path: 'list-certificate',
          name: 'ListCertificate',
          component: ListCertificate
        },        
        {
          path: 'list-product',
          name: 'ListProduct',
          component: ListProduct
        },        
        {
          path: 'list-report',
          name: 'ListReport',
          component: ListReport
        }
      ]
    }
  ]
})

export default router
