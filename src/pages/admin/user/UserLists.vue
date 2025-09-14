<template>
    <div class="w-full">
        <div class="mb-1 flex justify-between items-center py-3 md:py-0">
            <p class="table-caption text-sm text-slate-500">Users list</p>
        </div>
        <div class="overflow-x-auto min-h-[200px] flex justify-center items-center">
            <div v-if="loading" class="flex justify-center items-center py-10">
                <div class="w-8 h-8 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
            </div>
            <table v-else class="w-full table-auto border border-slate-300 text-center">
                <thead class="bg-blue-950 text-white">
                    <tr>
                        <th class="border border-slate-300 p-2">Order</th>
                        <th class="border border-slate-300 p-2">First Name</th>
                        <th class="border border-slate-300 p-2">Last Name</th>
                        <th class="border border-slate-300 p-2">Email Address</th>
                        <th class="border border-slate-300 p-2">Role</th>
                        <th class="border border-slate-300 p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-50" v-for="user in paginatedUsers" :key="user.id">
                        <td class="border border-slate-300 p-2">{{ user.id }}</td>
                        <td class="border border-slate-300 p-2">{{ user.name }}</td>
                        <td class="border border-slate-300 p-2">{{ user.first_name }}</td>
                        <td class="border border-slate-300 p-2">{{ user.email }}</td>
                        <td class="border border-slate-300 p-2">{{ user.role }}</td>
                        <td class="border border-slate-300 p-2">
                            <div class="flex flex-wrap gap-2 justify-center">
                                <button
                                    class="bg-green-900 py-2 px-4 rounded-sm text-sm cursor-pointer text-white hover:bg-green-800">Edit</button>
                                <button
                                    class="bg-red-800 hover:bg-red-700 py-2 px-4 rounded-sm text-sm cursor-pointer text-white"
                                    @click="deleteUser(user.id)">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="users.length === 0 && !loading">
                        <td colspan="6" class="p-4 text-gray-500">No users found.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="users.length" class="flex gap-4 p-5 justify-center items-center">
            <button class="bg-slate-900 text-white py-1 px-3 rounded-sm" :disabled="currentPage === 1"
                @click="currentPage--">
                Prev
            </button>
            <span>Page {{ currentPage }} / {{ totalPages }}</span>
            <button class="bg-slate-900 text-white py-1 px-3 rounded-sm" :disabled="currentPage === totalPages"
                @click="currentPage++">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import api from '../../../axios';
import { onMounted, ref, computed, watch } from 'vue';
import Swal from 'sweetalert2';

const users = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const itemsPerPage = 15;

const fetchUsers = async () => {
    loading.value = true;
    try {
        const response = await api.get('/users');
        users.value = response.data.users;
    } catch (error) {
        if (error.response) {
            alert('Error loading data');
        }
    } finally {
        loading.value = false;
    }
};

const deleteUser = async (id) => {
    const result = await Swal.fire({
        title: 'Confirm deletion?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
        await api.delete(`/users/${id}`);
        users.value = users.value.filter(user => user.id !== id);
        if (currentPage.value > totalPages.value) {
            currentPage.value = totalPages.value || 1;
        }
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
    } catch {
        Swal.fire('Error', 'An error occurred while deleting the user.', 'error');
    }
};

const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage));

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return users.value.slice(start, start + itemsPerPage);
});

watch(users, () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value || 1;
    }
});

onMounted(() => {
    fetchUsers();
});
</script>
