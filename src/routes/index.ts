import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Historic from "../pages/historic/Historic.vue";
import Home from "../pages/home/Home.vue";
import Profile from "../pages/profile/Profile.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import Login from "../pages/auth/login/Login.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import UserList from "../pages/admin/user/UserList.vue";
import Dashboard from "../pages/admin/dashboard/Dashboard.vue";
import BookList from "../pages/admin/book/BookList.vue";


const routes = [

    // layouts principale

    {
        path:'/',
        component: MainLayout,
        children: [
            {
                path:'',
                name:'home',
                component:Home
            },
            {
                path:'/historic',
                name:'historic',
                component:Historic
            },
            {
                path:'/profile',
                name:'profile',
                component:Profile
            }
        ]
    },

    // layout pour l' authentification

    {
        path:'/auth',
        component:AuthLayout,
        children:[
            {
                path:'/login',
                name:'login',
                component:Login
            }
        ]
    
    },

    // admin layout

    {
        path:'/admin',
        component:AdminLayout,
        children:[
            {
                path:'',
                name:'dashboard',
                component:Dashboard
            },
            {
                path:'/users-list',
                name:'usersList',
                component:UserList
            },
            {
                path:'/books-list',
                name:'booksList',
                component:BookList
            }
        ]
    
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router ;