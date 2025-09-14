<template>
    <div class="w-full">
        <div class="mb-1 flex justify-between items-center py-3 md:py-0">
            <p class="table-caption text-sm text-slate-500">Loans List</p>
        </div>

        <div class="overflow-x-auto min-h-[200px] flex justify-center items-center">
            <div v-if="loading" class="flex justify-center items-center py-10">
                <div class="w-8 h-8 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
            </div>

            <table v-else class="w-full table-auto border border-slate-300 text-center">
                <thead class="bg-blue-950 text-white">
                    <tr>
                        <th class="border border-slate-300 p-2">#</th>
                        <th class="border border-slate-300 p-2">User</th>
                        <th class="border border-slate-300 p-2">Email</th>
                        <th class="border border-slate-300 p-2">Book</th>
                        <th class="border border-slate-300 p-2">Author</th>
                        <th class="border border-slate-300 p-2">Borrowed At</th>
                        <th class="border border-slate-300 p-2">Due Date</th>
                        <th class="border border-slate-300 p-2">Returned At</th>
                        <th class="border border-slate-300 p-2">Action</th> <!-- New column -->
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-50" v-for="loan in paginatedLoans" :key="loan.id">
                        <td class="border border-slate-300 p-2">{{ loan.id }}</td>
                        <td class="border border-slate-300 p-2">{{ loan.name }}</td>
                        <td class="border border-slate-300 p-2">{{ loan.email }}</td>
                        <td class="border border-slate-300 p-2">{{ loan.book_title }}</td>
                        <td class="border border-slate-300 p-2">{{ loan.book_author }}</td>
                        <td class="border border-slate-300 p-2">{{ formatDate(loan.borrowed_at) }}</td>
                        <td class="border border-slate-300 p-2">{{ formatDate(loan.due_date) }}</td>
                        <td class="border border-slate-300 p-2">
                            {{ loan.returned_at ? formatDate(loan.returned_at) : '-' }}
                        </td>
                        <td class="border border-slate-300 p-2">
                            <button v-if="!loan.returned_at" @click="returnBook(loan.id)"
                                class="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">
                                Return
                            </button>
                            <span v-else>-</span>
                        </td>
                    </tr>
                    <tr v-if="loans.length === 0 && !loading">
                        <td colspan="9" class="p-4 text-gray-500">No loans found.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="loans.length" class="flex gap-4 p-5 justify-center items-center">
            <button class="bg-slate-900 text-white py-1 px-3 rounded-sm disabled:opacity-50"
                :disabled="currentPage === 1" @click="currentPage--">
                Prev
            </button>
            <span>Page {{ currentPage }} / {{ totalPages }}</span>
            <button class="bg-slate-900 text-white py-1 px-3 rounded-sm disabled:opacity-50"
                :disabled="currentPage === totalPages" @click="currentPage++">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../../../axios';
import Swal from 'sweetalert2';

const loans = ref([]);
const loading = ref(true);

const currentPage = ref(1);
const itemsPerPage = 10;

const fetchLoans = async () => {
    loading.value = true;
    try {
        const token = localStorage.getItem('auth_token');
        const res = await api.get('/admin/loans', {
            headers: { Authorization: `Bearer ${token}` },
        });
        loans.value = res.data.loans || [];
    } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Unable to load loans', 'error');
    } finally {
        loading.value = false;
    }
};

const returnBook = async (loanId) => {
    const confirm = await Swal.fire({
        title: 'Confirm Return',
        text: 'Do you confirm that this book has been returned?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, returned',
        cancelButtonText: 'Cancel',
    });

    if (confirm.isConfirmed) {
        try {
            loading.value = true;
            const token = localStorage.getItem('auth_token');
            await api.put(`/admin/loans/${loanId}/return`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchLoans();
            Swal.fire('Success', 'The book has been marked as returned.', 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Unable to mark the book as returned.', 'error');
        } finally {
            loading.value = false;
        }
    }
};

const totalPages = computed(() =>
    Math.ceil(loans.value.length / itemsPerPage)
);

const paginatedLoans = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return loans.value.slice(start, start + itemsPerPage);
});

const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

onMounted(() => {
    fetchLoans();
});
</script>
