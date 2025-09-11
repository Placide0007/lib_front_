<template>
    <form action="" @submit.prevent="updateBook" method="post" class="md:w-[600px] w-full flex gap-5 p-3 flex-col">
        <p class="text-center text-2xl mb-3">Update Book</p>

        <div class="flex flex-col md:flex-row gap-3">
            <Input placeholder="Title" class="w-full  rounded-xs" v-model="book.title" :error="errors.title" />
            <Input placeholder="Author" class="w-full  rounded-xs" v-model="book.author" :error="errors.author" />
        </div>

        <div class="flex flex-col md:flex-row gap-3">
            <Input placeholder="Quantity" class="  w-full  rounded-xs" type="number" v-model="book.quantity" :error="errors.quantity" />
            <Input placeholder="Isbn" class="  w-full  rounded-xs" v-model="book.isbn" :error="errors.isbn" />
        </div>

        <div class="flex flex-col md:flex-row gap-3">
            <Input placeholder="Cover Image" class="w-full  rounded-xs"  :error="errors.cover_image" type="file" @change="handleImageUpload"/>
            <TextArea placeholder="Description" class="w-full  rounded-xs" v-model="book.description" :error="errors.description" />
        </div>

        <div class="w-full" > 
            <select id="category_ids" class="h-20 p-3 bg-gray-200 outline-slate-800 w-full" v-model="book.category_ids" multiple size="2">
            <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.category_name }}
            </option>
            </select>
            <p v-if="errors.category_ids" class="text-red-600 text-xs">{{ errors.category_ids }}</p>
      </div>

    <button type="submit" class="bg-slate-700 cursor-pointer hover:bg-slate-600 text-white p-4 rounded-xs">Update</button>

    </form>
</template>
<script setup>
import Input from '../../../components/common/Input.vue';
import TextArea from '../../../components/common/TextArea.vue';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import api from '../../../axios';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();
const bookId = route.params.id;
const book = reactive({title:'',description:'',quantity:'',author:'',isbn:'',cover_image: null,category_ids: []});
const errors = reactive({title:'',description:'',quantity:'',author:'',isbn:'',cover_image:'',category_ids: '',});

const categories = ref([]);

const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    categories.value = response.data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const fetchBook = async () => {
  try {
    const response = await api.get(`/books/${bookId}`);
    const data = response.data.book;

    Object.assign(book, {
      title: data.title,
      description: data.description,
      quantity: data.quantity,
      author: data.author,
      isbn: data.isbn,
      category_ids: data.category_ids || [],
    });

  } catch (error) {
    console.error('Error loading book:', error);
    Swal.fire('Error', 'Failed to load book details.', 'error');
    router.push('/books-list');
  }
};

const handleImageUpload = (event) => {
  book.cover_image = event.target.files[0];
};


const updateBook = async () => {

  const formData = new FormData();

  for (const key in book) {
    const value = book[key];
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item));
    } else if (value !== null && value !== '') {
      formData.append(key, value);
    }
  }

  try {
    await api.post(`/books/${bookId}?_method=PUT`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    Swal.fire('Updated!', 'Book updated successfully.', 'success');

    router.push('/books-list');
    
  } catch (error) {
    if (error.response?.data?.errors) {
      const validationErrors = error.response.data.errors;
      for (const key in errors) {
        errors[key] = validationErrors[key]?.[0] || '';
      }
    } else {
      Swal.fire('Error', 'An error occurred while updating the book.', 'error');
    }
  }
};

onMounted(() => {
  fetchCategories();
  fetchBook();
});
</script>