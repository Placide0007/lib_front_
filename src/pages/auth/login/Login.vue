<template>
    <form action="" @submit.prevent="login" method="post" class="w-[400px] flex gap-5 flex-col p-3">
        <p class="text-center text-2xl mb-3">Sign in to <span class="font-bold" >Library</span></p>

        <Input placeholder="Email..." class="  w-full  rounded-xs" type="email" v-model="credentials.email" :error="errors.email" />
        
        <Input placeholder="Password..." class="  w-full  rounded-xs" type="password" v-model="credentials.password" :error="errors.password" />
        
        <button type="submit" class="bg-slate-700   cursor-pointer hover:bg-slate-600 text-white p-4 rounded-xs">Log in</button>

        <AlternativeLink link="/register" text="No acount?" linkText="Create one" />
    </form>
</template>

<script setup >
    import Input from '../../../components/common/Input.vue';
    import AlternativeLink from '../../../components/common/AlternativeLink.vue';
    import { reactive } from 'vue';
    import api from '../../../axios';
    import { useRouter } from 'vue-router';

    const credentials = reactive({email:'',password:''})
    const errors = reactive({email:'',password:''})

    const login = async () => {
        try {
            const response = await api.post('/login', credentials);
            const userData = response.data.user;
            const token = response.data.access_token;

            localStorage.setItem('user_data', JSON.stringify(userData));
            localStorage.setItem('auth_token', token);
            router.push('/');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    const serverErrors = error.response.data.errors;
                    for (const key in errors) {
                        errors[key] = serverErrors[key] ? serverErrors[key][0] : '';
                    }
                } else if (error.response.status === 401) {
                    errors.email = 'Incorrect email or password';
                    errors.password = '';
                }
            }
        }
    };

</script>