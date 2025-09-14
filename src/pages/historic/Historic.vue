<template>
    <div class="w-full">
        <div class="mb-1 flex justify-between items-center py-3 md:py-0">
            <p class="table-caption text-sm text-slate-500">Reservations List</p>
        </div>

        <div class="overflow-x-auto min-h-[200px] flex justify-center items-center">
            <div v-if="loading" class="flex justify-center items-center py-10">
                <div class="w-8 h-8 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
            </div>

            <table v-else class="w-full table-auto border border-slate-300 text-center">
                <thead class="bg-blue-950 text-white">
                    <tr>
                        <th class="border border-slate-300 p-2">Order</th>
                        <th class="border border-slate-300 p-2">Title</th>
                        <th class="border border-slate-300 p-2">Author</th>
                        <th class="border border-slate-300 p-2">Reserved At</th>
                        <th class="border border-slate-300 p-2">Status</th>
                        <th class="border border-slate-300 p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="res in paginatedReservations" :key="res.id" class="hover:bg-gray-50">
                        <td class="border border-slate-300 p-2">{{ res.id }}</td>
                        <td class="border border-slate-300 p-2">{{ res.book.title }}</td>
                        <td class="border border-slate-300 p-2">{{ res.book.author }}</td>
                        <td class="border border-slate-300 p-2">{{ formatDate(res.reserved_at) }}</td>
                        <td class="border border-slate-300 p-2">
                            <span :class="statusClass(res.status)" class="px-2 py-1 rounded text-xs capitalize">
                                {{ res.status }}
                            </span>
                        </td>
                        <td class="border border-slate-300 p-2">
                            <div class="flex flex-row items-center justify-center gap-2 flex-wrap">
                                <input type="number" min="1" v-model.number="borrowDurations[res.id]"
                                    class="w-16 p-1 text-center border border-gray-300 rounded" placeholder="Jours"
                                    :disabled="res.status === 'approved'" />

                                <button
                                    class="bg-green-900 py-2 px-4 rounded-sm text-sm text-white hover:bg-green-800 disabled:opacity-50"
                                    @click="borrowBook(res.id)" :disabled="res.status === 'approved'">
                                    Borrowed
                                </button>

                                <button
                                    class="bg-red-800 hover:bg-red-700 py-2 px-4 rounded-sm text-sm text-white disabled:opacity-50"
                                    @click="deleteReservation(res.id)" :disabled="res.status === 'approved'">
                                    Delete
                                </button>

                            </div>
                        </td>
                    </tr>
                    <tr v-if="reservations.length === 0 && !loading">
                        <td colspan="6" class="p-4 text-gray-500">No reservations found.</td>
                    </tr>
                </tbody>
            </table>
        </div>


        <div v-if="reservations.length > itemsPerPage" class="flex gap-4 p-5 justify-center items-center">
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
import { ref, onMounted, computed, watch } from 'vue';
import api from '../../axios';
import Swal from 'sweetalert2';

const reservations = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const itemsPerPage = 10;
const borrowDurations = ref({});


const fetchReservations = async () => {
    loading.value = true;
    try {
        const token = localStorage.getItem('auth_token');
        if (!token) return;

        const res = await api.get('/reservations', {
            headers: { Authorization: `Bearer ${token}` },
        });

        reservations.value = res.data.reservations || [];


        reservations.value.forEach((r) => {
            borrowDurations.value[r.id] = 14;
        });
    } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Error fetching reservations', 'error');
    } finally {
        loading.value = false;
    }
};


const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};


const statusClass = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'borrowed':
            return 'bg-green-100 text-green-800';
        case 'approved':
            return 'bg-blue-100 text-blue-800';
        case 'rejected':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};


const borrowBook = async (reservationId) => {
    try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            Swal.fire('Error', 'You must be logged in.', 'error');
            return;
        }

        const duration = borrowDurations.value[reservationId] || 14;

        await api.put(
            `/reservations/${reservationId}/borrow`,
            { duration_days: duration },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        Swal.fire('Success', `Book borrowed for ${duration} days!`, 'success');


        reservations.value = reservations.value.map((r) =>
            r.id === reservationId ? { ...r, status: 'borrowed' } : r
        );
    } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Error borrowing the book', 'error');
    }
};


const deleteReservation = async (reservationId) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This reservation will be permanently deleted.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
        const token = localStorage.getItem('auth_token');
        if (!token) return;

        await api.delete(`/reservations/${reservationId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire('Deleted!', 'The reservation has been deleted.', 'success');
        reservations.value = reservations.value.filter((r) => r.id !== reservationId);

        if (currentPage.value > totalPages.value) {
            currentPage.value = totalPages.value || 1;
        }
    } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Could not delete the reservation', 'error');
    }
};


const totalPages = computed(() => Math.ceil(reservations.value.length / itemsPerPage));
const paginatedReservations = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return reservations.value.slice(start, start + itemsPerPage);
});

watch(reservations, () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value || 1;
    }
});

onMounted(fetchReservations);
</script>
