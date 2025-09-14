<template>
  <section class="book-show p-6 max-w-5xl mx-auto">
    <button class="text-blue-600 hover:underline mb-4" @click="goBack">← Back to Books</button>

    <div class="flex flex-col lg:flex-row gap-8  rounded-lg p-6" v-if="book">
      <div class="flex-shrink-0 w-full lg:w-1/3">
        <picture>
          <source v-if="book.cover_image_webp" :srcset="book.cover_image_webp" type="image/webp" />
          <img :src="book.cover_image" :alt="book.title" class="w-full h-auto rounded-md shadow" />
        </picture>
      </div>

      <div class="flex-1 space-y-4">
        <h1 class="text-3xl font-bold text-gray-800">{{ book.title }}</h1>
        <p class="text-gray-700"><span class="font-semibold">Author:</span> {{ book.author }}</p>
        <p class="text-gray-700"><span class="font-semibold">ISBN:</span> {{ book.isbn }}</p>
        <p class="text-gray-700"><span class="font-semibold">Quantity:</span> {{ book.quantity }}</p>

        <div v-if="book.categories && book.categories.length" class="text-gray-700">
          <span class="font-semibold">Categories:</span>
          <span
            v-for="cat in book.categories"
            :key="cat.id"
            class="inline-block bg-blue-100 text-blue-800 text-xs font-medium mx-2 px-2.5 py-0.5 rounded"
          >
            {{ cat.category_name }}
          </span>
        </div>

        <p class="text-gray-700"><span class="font-semibold">Description:</span> {{ book.description }}</p>

        <button
          class="mt-6 bg-slate-600 cursor-pointer text-white px-5 py-2 rounded hover:bg-slate-700 disabled:opacity-50"
          @click="reserveBook"
          :disabled="book.quantity === 0"
        >
          {{ book.quantity === 0 ? 'Out of Stock' : 'Reserve' }}
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-600 mt-12">
      <p>Loading book details...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import api from '../../../axios';



const route = useRoute();
const router = useRouter();


const book = ref({ categories: [] });
const rating = ref(0);


const fetchBook = async () => {
  try {
    const res = await api.get(`/books/${route.params.id}`);
    book.value = res.data.book || { categories: [] };

    
    if (!book.value.categories) {
      book.value.categories = [];
    }
  } catch (error) {
    console.error('Failed to fetch book details', error);
    Swal.fire('Error', 'Could not load book details', 'error');
  }
};

const goBack = () => {
  router.push('/');
};


const reserveBook = async () => {
  if (book.value.quantity <= 0) return;

  const token = localStorage.getItem('auth_token');
  if (!token) {
    router.push('/login');
    return;
  }

  try {
    await api.post(
      '/reservations',
      {
        book_id: book.value.id,
        reserved_at: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Swal.fire('Reserved!', 'Your reservation has been created.', 'success');
    book.value.quantity -= 1;
    router.push('/historic');
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'Could not create reservation.', 'error');
  }
};


onMounted(fetchBook);
</script>
