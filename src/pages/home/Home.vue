<template>
    <!-- Hero Section -->
    <section v-if="!userData" id="hero" class="grid sm:grid-cols-1 md:grid-cols-2 bg-gray-50 px-5 py-10 md:py-5">

        <div class="flex justify-center items-center flex-col gap-6 md:gap-8 text-center px-4">
            <p class="text-6xl hero-text  md:text-8xl  font-extrabold leading-tight text-slate-800">
                Manage your library Effortlessly
            </p>
            <p class="text-base sm:text-xm text-slate-500 max-w-xl ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptatem quaerat quidem,
                delectus amet tenetur saepe.
            </p>
        </div>


        <div class="flex justify-center items-center px-4">
            <img src="../../assets/biblio.svg" alt="Library Illustration"
                class="w-full max-w-md md:max-w-lg lg:max-w-xl">
        </div>
    </section>

    <!-- Jumbotron Section -->
    <section id="jumbotron" class="p-4">
        <div class="p-10 gap-2 flex flex-col">
            <p class="text-center font-bold text-2xl">Lorem ipsum dolor sit amet.</p>
            <p class="text-center text-sm">Lorem ipsum dolor sit amet.</p>
        </div>

        <!-- categories container  -->
        <div class="categories-list flex gap-5  py-4 px-2 overflow-x-auto scrollbar">
            <button class="cursor-pointer category-btn hover:bg-gray-200 rounded py-1 px-2" :class="{ active: selectedCategoryId === null }" @click="selectCategory(null)">All</button>
            <button  v-for="category in categories" :key="category.id" class="cursor-pointer category-btn hover:bg-gray-200 rounded py-1 px-2"
                :class="{ active: selectedCategoryId === category.id }"   @click="selectCategory(category.id)">
                {{ category.category_name }}
            </button>
        </div>

        <!-- card container -->
        <div class="grid grid-cols-2 md:grid-cols-7 gap-5 p-2">
            <div v-for="book in paginatedBooks" :key="book.id" class="card" @click="goToBook(book.id)">
                <div class="grayscale-0 hover:grayscale-75 hover:-translate-y-2 duration-300">
                    <router-link :to="`/show-books/${book.id}`">
                        <picture>
                            <source :srcset="book.cover_image_webp" type="image/webp" />
                            <img :src="book.cover_image" :alt="book.title" loading="lazy" :width="book.image_width"
                                :height="book.image_height" />
                        </picture>
                    </router-link>
                </div>
                <h3 class="text-center text-sm p-2 text-slate-800">{{ book.title }}</h3>
            </div>

            <div class="nobookFound" v-if="filteredBooks.length === 0">
                <p>No books found</p>
            </div>
        </div>
        <div  v-if="filteredBooks.length > perPage" class="flex gap-4 p-5 justify-center items-center">
            <button class="bg-slate-900 text-white py-1 px-3 rounded-sm" :disabled="currentPage === 1" @click="currentPage--">Previous</button>
            <span>Page {{ currentPage }}</span>
            <button class="bg-slate-900 text-white py-1 px-3 rounded-sm" :disabled="currentPage >= Math.ceil(filteredBooks.length / perPage)"
                @click="currentPage++">Next</button>
        </div>
    </section>
</template>
<script setup>
    import { ref, computed, onMounted } from 'vue';
    import api from '../../axios';
    import { useRouter } from 'vue-router';

    const categories = ref([]);
    const books = ref([]);
    const selectedCategoryId = ref(null);
    const currentPage = ref(1);
    const perPage = 12;
    const router = useRouter();

    const userData = computed(() => {
        const user = localStorage.getItem("user_data");
        return user ? JSON.parse(user) : null;
    });

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            categories.value = res.data.categories;
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    };

    const fetchBooks = async () => {
        try {
            const res = await api.get('/books');
            books.value = res.data.books;
        } catch (error) {
            console.error('Failed to fetch books', error);
        }
    };

    onMounted(() => {
        fetchCategories();
        fetchBooks();
    });


    const selectCategory = (id) => {
        selectedCategoryId.value = id;
        currentPage.value = 1;
    };

    const filteredBooks = computed(() => {
        if (selectedCategoryId.value === null) return books.value;
        return books.value.filter(book => {
            if (Array.isArray(book.categories)) {
                return book.categories.some(cat => cat.id === selectedCategoryId.value);
            }
            return book.category_id === selectedCategoryId.value;
        });
    });


    const paginatedBooks = computed(() => {
        const start = (currentPage.value - 1) * perPage;
        return filteredBooks.value.slice(start, start + perPage);
    });

    const goToBook = (id) => {
        router.push(`/show-books/${id}`);
    };
</script>
