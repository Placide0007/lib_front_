<template>
    <form @submit.prevent="updateCategory" action="" method="post" class="w-[400px] flex gap-5 flex-col p-3">
        <p class="text-center text-2xl mb-3">Edit Category</p>
        <Input placeholder="Category..." class="  w-full  rounded-xs"  v-model="category.category_name" :error="errors.category_name" />    
        <button type="submit" class="bg-slate-700   cursor-pointer hover:bg-slate-600 text-white p-4 rounded-xs">Edit</button>
    </form>
</template>
<script setup>
    import Input from '../../../components/common/Input.vue';
    import { useRouter, useRoute } from 'vue-router';
    import { reactive, onMounted } from 'vue';
    import api from '../../../axios';
    import Swal from 'sweetalert2';
import EditBook from '../book/EditBook.vue';

    const router = useRouter();
    const route = useRoute();

    const category = reactive({
    category_name: '',
    });
    const errors = reactive({
    category_name: '',
    });

    const fetchCategory = async () => {
    try {
        const response = await api.get(`/categories/${route.params.id}`);
        category.category_name = response.data.category.category_name;
    } catch (error) {
        Swal.fire('Error', 'Failed to load category', 'error');
        router.push('/categoriesList');
    }
    };

    const updateCategory = async () => {
    try {
        await api.put(`/categories/${route.params.id}`, category);
        Swal.fire('Updated!', 'Category updated successfully.', 'success');
        router.push('/categories-list');
    } catch (error) {
        if (error.response && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        for (const key in errors) {
            errors[key] = validationErrors[key] ? validationErrors[key][0] : '';
        }
        }
    }
    };

    onMounted(() => {
    fetchCategory();
    });
</script>