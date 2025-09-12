import { createRouter, createWebHistory } from "vue-router";
import Historic from "../pages/historic/Historic.vue";
import Home from "../pages/home/Home.vue";
import Profile from "../pages/profile/Profile.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import Login from "../pages/auth/login/Login.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import UserList from "../pages/admin/user/UserLists.vue";
import Dashboard from "../pages/admin/dashboard/Dashboard.vue";
import BookList from "../pages/admin/book/BooksList.vue";
import Register from "../pages/auth/register/Register.vue";
import CreateBook from "../pages/admin/book/CreateBook.vue";
import MainLayout from "../layouts/MainLayout.vue";
import EditBook from "../pages/admin/book/EditBook.vue";
import CategoriesList from "../pages/admin/category/CategoriesList.vue";
import CreateCategory from "../pages/admin/category/CreateCategory.vue";
import EditCategory from "../pages/admin/category/EditCategory.vue";


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
            },
            
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
            },
            {
                path:'/register',
                name:'register',
                component:Register
            },
            {
                path:'/create-book',
                name:'create-book',
                component:CreateBook
            },
            {
                path:'/create-category',
                name:'create-category',
                component:CreateCategory
            },
            {
                path:'/edit-book/:id',
                name:'edit-book',
                component:EditBook
            },
            {
                path:'/edit-category/:id',
                name:'edit-category',
                component:EditCategory
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
            },
            {
                path:'/categories-list',
                name:'categoriesList',
                component:CategoriesList
            }
        ]
    
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router ;