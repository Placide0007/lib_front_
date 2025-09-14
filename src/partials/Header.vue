<template>
    
    <header
        class="md:sticky fixed top-0 left-0 w-full z-20 bg-white py-1 px-6 md:px-10 flex justify-between items-center">
        <p class="font-bold text-2xl">Library</p>

        
        <button @click="toggleMenu" class="md:hidden text-3xl">
            ☰
        </button>

        
        <nav class="hidden md:flex gap-10 justify-center items-center">
            <router-link exact-active-class="active" class="nav-item" to="/">Home</router-link>
            <router-link exact-active-class="active" class="nav-item" to="/historic">Historic</router-link>
            <router-link exact-active-class="active" class="nav-item" to="/profile">Profile</router-link>
            <router-link  exact-active-class="active" class="nav-item"
                to="/admin">Admin</router-link>
        </nav>

        
        <router-link v-if="!userData" class="hidden md:inline border border-gray-400 py-2 px-5 hover:rounded-sm"
            to="/login">
            Sign in
        </router-link>
        <div class="hidden md:flex items-center gap-2" v-else>
            <button class="border bg-slate-800 text-white py-2 px-5">{{ userData.name }}</button>
            <button class="border bg-slate-500 text-white py-2 px-5 cursor-pointer" @click="logout">Logout</button>
        </div>

        
        <div v-if="isOpen"
            class="transition-all duration-300 ease-in-out absolute top-full left-0 w-full bg-white border-t border-gray-300 flex flex-col items-center py-4 md:hidden z-10 p-4">

            <router-link @click="closeMenu" exact-active-class="active" class="w-full my-3 py-2 text-center nav-item"
                to="/">
                Home
            </router-link>
            <router-link @click="closeMenu" exact-active-class="active" class="w-full my-3 py-2 text-center nav-item"
                to="/historic">
                Historic
            </router-link>
            <router-link @click="closeMenu" exact-active-class="active" class="w-full my-3 py-2 text-center nav-item"
                to="/profile">
                Profile
            </router-link>
            <router-link v-if="userRole === 'admin'" @click="closeMenu" exact-active-class="active"
                class="w-full my-3 py-2 text-center nav-item" to="/admin">
                Admin
            </router-link>

    
            <router-link v-if="!userData" @click="closeMenu"
                class="w-full my-3 py-2 text-center border border-gray-400 hover:rounded-sm" to="/login">
                Sign in
            </router-link>

            
            <div v-else class="flex flex-col gap-2 w-full items-center">
                <button class="border bg-slate-800 text-white py-2 px-5 w-3/4 text-center">
                    {{ userData.name }}
                </button>
                <button @click="logout" class="border bg-slate-500 text-white py-2 px-5 w-3/4 text-center">
                    Logout
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const isOpen = ref(false);

const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};

const closeMenu = () => {
    isOpen.value = false;
};

const router = useRouter();

const userData = computed(() => {
    const user = localStorage.getItem('user_data');
    return user ? JSON.parse(user) : null;
});

const userRole = computed(() => {
    return userData.value ? userData.value.role : '';
});

const logout = () => {
    localStorage.removeItem('user_data');
    localStorage.removeItem('auth_token');
    router.push('/login');
};
</script>
