<template>
    <form @submit.prevent="CreateCategory" action="" method="post" class="w-[400px] flex gap-5 flex-col p-3">
        <p class="text-center text-2xl mb-3">New Category</p>
        <Input placeholder="Category..." class="  w-full  rounded-xs"  v-model="category.category_name" :error="errors.category_name" />    
        <button type="submit" class="bg-slate-700   cursor-pointer hover:bg-slate-600 text-white p-4 rounded-xs">Create</button>
    </form>
</template>
<script setup >
    import Input from '../../../components/common/Input.vue';
    import { useRouter } from 'vue-router';
    import { reactive } from 'vue';
    import Swal from 'sweetalert2';
    import api from '../../../axios';

    const router = useRouter();
    const category = reactive({category_name:''});
    const errors = reactive({category_name:''});

    const CreateCategory = async () => {
        try {
            await api.post('/categories',category);
            Swal.fire('Category Created successfully')
            router.push('/categories-list')
        } catch (error) {
            if(error.response && error.response.data.errors){
                const errorsValidation = error.response.data.errors
                for (const key in errors) {
                    errors[key] = errorsValidation[key] ? errorsValidation[key][0] : ''
                }
            }
        }
    }
</script>