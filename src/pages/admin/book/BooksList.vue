<template>
  <div class="w-full">
    <div class="mb-1 flex justify-between items-center">
      <p class="table-caption text-sm text-slate-500">Books list</p>
      <router-link
        class="px-3 py-1 border-slate-700 border hover:text-white hover:bg-slate-800"
        to="create-book"
      >
        New Book
      </router-link>
    </div>
    <div class="overflow-x-auto min-h-[200px] flex justify-center items-center">
      <div v-if="loading" class="flex justify-center items-center py-10">
        <div class="w-8 h-8 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
      </div>
      <table v-else class="w-full table-auto border border-slate-300 text-center">
        <thead class="bg-blue-950 text-white">
          <tr>
            <th class="border border-slate-300 p-1">Order</th>
            <th class="border border-slate-300 p-1">Title</th>
            <th class="border border-slate-300 p-1">Author</th>
            <th class="border border-slate-300 p-1">Description</th>
            <th class="border border-slate-300 p-1">Cover Image</th>
            <th class="border border-slate-300 p-1">Isbn</th>
            <th class="border border-slate-300 p-1">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-50" v-for="book in paginatedBooks" :key="book.id">
            <td class="border border-slate-300 p-1">{{ book.id }}</td>
            <td class="border border-slate-300 p-1">{{ book.title }}</td>
            <td class="border border-slate-300 p-1">{{ book.author }}</td>
            <td class="border border-slate-300 p-1">
              <p class="line-clamp-2 overflow-hidden text-ellipsis break-words max-w-xs text-justify px-5">
                {{ book.description }}
              </p>
            </td>
            <td class="border border-slate-300 p-1">
              <a class="underline" :href="book.cover_image" target="_blank" rel="noopener noreferrer">View</a>
            </td>
            <td class="border border-slate-300 p-1">{{ book.isbn }}</td>
            <td class="border border-slate-300 p-1">
              <div class="flex flex-wrap gap-1 justify-center">
                <router-link
                  class="bg-green-900 py-2 px-4 rounded-sm text-sm cursor-pointer text-white hover:bg-green-800"
                  :to="`/edit-book/${book.id}`"
                >
                  Edit
                </router-link>
                <button
                  class="bg-red-800 hover:bg-red-700 py-2 px-4 rounded-sm text-sm cursor-pointer text-white"
                  @click="deleteBook(book.id)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="books.length === 0 && !loading">
            <td colspan="7" class="p-4 text-gray-500">No books found.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="books.length" class="flex gap-4 p-5 justify-center items-center">
      <button
        class="bg-slate-900 text-white py-1 px-3 rounded-sm"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Prev
      </button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        class="bg-slate-900 text-white py-1 px-3 rounded-sm"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import api from '../../../axios';
import { onMounted, ref, computed, watch } from 'vue';
import Swal from 'sweetalert2';

const books = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const itemsPerPage = 15;

const fetchBooks = async () => {
  loading.value = true;
  try {
    const response = await api.get('/books');
    books.value = response.data.books || [];
  } catch (error) {
    console.error(error);
    alert('Error while loading books');
  } finally {
    loading.value = false;
  }
};

const deleteBook = async (id) => {
  const result = await Swal.fire({
    title: 'Confirm deletion?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  });

  if (!result.isConfirmed) return;

  try {
    await api.delete(`/books/${id}`);
    books.value = books.value.filter(book => book.id !== id);

    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value || 1;
    }

    Swal.fire('Deleted!', 'The book has been deleted.', 'success');
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'An error occurred while deleting the book.', 'error');
  }
};

const totalPages = computed(() => Math.ceil(books.value.length / itemsPerPage));

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return books.value.slice(start, start + itemsPerPage);
});

watch(books, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1;
  }
});

watch(currentPage, (newPage) => {
  if (newPage < 1) currentPage.value = 1;
  else if (newPage > totalPages.value) currentPage.value = totalPages.value;
});

onMounted(() => {
  fetchBooks();
});
</script>
