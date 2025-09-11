<template>
    <form @submit.prevent="register" action="" method="post" class="w-[400px] flex gap-5 flex-col p-3">
        <p class="text-center text-2xl mb-3">Sign up to <span class="font-bold">Library</span></p>

        <Input placeholder="FirstName..." class="  w-full  rounded-xs" type="text"  v-model="users.name" :error="errors.name" />

        <Input placeholder="LastName..." class="  w-full  rounded-xs" type="text" v-model="users.first_name" :error="errors.first_name"/>

        <Input placeholder="Email..." class="  w-full  rounded-xs" type="email" v-model="users.email" :error="errors.email"/>

        <Input placeholder="Password..." class="  w-full  rounded-xs" type="password" v-model="users.password" :error="errors.password"/>

        <button type="submit" class="bg-slate-700   cursor-pointer hover:bg-slate-600 text-white p-4 rounded-xs">Sign
            up</button>

        <AlternativeLink link="/login" text="Already have an account?" linkText="Sign in" />
    </form>
</template>

<script setup>
import Input from '../../../components/common/Input.vue';
import AlternativeLink from '../../../components/common/AlternativeLink.vue';
import api from '../../../axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const users = reactive({ name: '', first_name: '', email: '', password: '' })

const errors = reactive({ name: '', first_name: '', email: '', password: '' })

const register = async () => {
    try {
        const response = await api.post('/register', users)
        const userData = response.data.user
        const token = response.data.access_token
        localStorage.setItem('user_data', JSON.stringify(userData))
        localStorage.setItem('auth_token', token)
        router.push('/')
    } catch (error) {
        if (error.response && error.response.data.errors) {
            const validationErrors = error.response.data.errors
            for (const key in errors) {
                errors[key] = validationErrors[key] ? validationErrors[key][0] : ''
            }
        }
    }
}


</script>