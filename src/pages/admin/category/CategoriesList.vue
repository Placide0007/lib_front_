<template>
    <div class="w-full">
        <div class="mb-1 flex justify-between items-center">
            <p class="table-caption text-sm text-slate-500">Categories list</p>
            <router-link class="px-3 py-1  border-slate-700 border  hover:text-white hover:bg-slate-800"
                to="create-category">New Category</router-link>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full table-auto border border-slate-300 text-center">
                <thead class="bg-blue-950  text-white">
                    <tr>
                        <th class="border border-slate-300 p-1">Order</th>
                        <th class="border border-slate-300 p-1">Category name</th>
                        <th class="border border-slate-300 p-1">Created at</th>
                        <th class="border border-slate-300 p-1">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-50" v-for="category in paginatedCategories" :key="category.id">
                        <td class="border border-slate-300 p-1">{{ category.id }}</td>
                        <td class="border border-slate-300 p-1">{{ category.category_name }}</td>
                        <td class="border border-slate-300 p-1">{{ category.created_at }}</td>
                        <td class="border border-slate-300 p-1">
                            <div class="flex flex-wrap gap-1 justify-center">
                                <router-link :to="`/edit-category/${category.id}`" class="bg-green-900 py-2 px-4 rounded-sm text-sm cursor-pointer text-white hover:bg-green-800"> Edit </router-link>
                                <button class="bg-red-800 hover:bg-red-700 py-2 px-4 rounded-sm text-sm cursor-pointer text-white" @click="deleteCategory(category.id)">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="categories.length" class="flex gap-4 p-5 justify-center items-center">
                <button class="bg-slate-900 text-white py-1 px-3 rounded-sm" :disabled="currentPage === 1"
                    @click="currentPage--">Prev</button>
                <span>Page {{ currentPage }} / {{ totalPages }}</span>
                <button class="bg-slate-900 text-white py-1 px-3 rounded-sm" :disabled="currentPage === totalPages"
                    @click="currentPage++">Next</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import api from '../../../axios';
import { ref, computed, onMounted, watch } from 'vue';
import Swal from 'sweetalert2';

const categories = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;

const fetchcategories = async () => {
    try {
        const response = await api.get('/categories');
        categories.value = response.data.categories;
    } catch {
        alert('Error while loading categories');
    }
};

const deleteCategory = async (id) => {
    const result = await Swal.fire({
        title: 'Confirm deletion?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
        await api.delete(`/categories/${id}`);
        categories.value = categories.value.filter(category => category.id !== id);
        if (currentPage.value > totalPages.value) {
            currentPage.value = totalPages.value || 1;
        }
        Swal.fire('Deleted!', 'The category has been deleted.', 'success');
    } catch {
        Swal.fire('Error', 'An error occurred while deleting the category.', 'error');
    }
};

const totalPages = computed(() => Math.ceil(categories.value.length / itemsPerPage));

const paginatedCategories = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return categories.value.slice(start, start + itemsPerPage);
});

watch(categories, () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value || 1;
    }
});

onMounted(() => {
    fetchcategories();
});
</script>
