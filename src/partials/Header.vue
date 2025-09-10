<template>

    <!-- Header -->
    <header
        class="md:sticky fixed top-0 left-0 w-full z-20 bg-white border-b-2 border-b-slate-800 py-1 px-6 md:px-10 flex justify-between items-center">
        <p class="font-bold text-2xl">LOGO</p>

        <!-- Hamburger -->
        <button @click="toggleMenu" class="md:hidden text-3xl">
            ☰
        </button>

        <!-- Desktop nav -->
        <nav class="hidden md:flex gap-10 justify-center items-center">
            <router-link exact-active-class="active" class="nav-item" to="/">Home</router-link>
            <router-link exact-active-class="active" class="nav-item" to="/historic">Historic</router-link>
            <router-link exact-active-class="active" class="nav-item" to="/profile">Profile</router-link>
            <router-link exact-active-class="active" class="nav-item" to="/admin">Admin</router-link>
        </nav>

        <!-- Desktop Sign in -->
        <router-link class="hidden md:inline border border-gray-400 py-2 px-5 hover:rounded-sm" to="/login">Sign
            in</router-link>

        <!-- Mobile dropdown -->
        <div v-if="isOpen"
            class="transition-all duration-300 ease-in-out absolute top-full left-0 w-full bg-white border-t border-gray-300 flex flex-col items-center py-4 md:hidden z-10 p-4">
            <router-link @click="closeMenu" exact-active-class="active" class="w-full my-3 py-2  text-center nav-item "
                to="/">Home</router-link>
            <router-link @click="closeMenu" exact-active-class="active" class="nav-item w-full my-3 py-2 text-center"
                to="/historic">Historic</router-link>
            <router-link @click="closeMenu" exact-active-class="active" class="nav-item w-full my-3 py-2 text-center"
                to="/profile">Profile</router-link>
            <router-link @click="closeMenu" exact-active-class="active" class="w-full my-3 py-2 nav-item text-center"
                to="/admin">Admin</router-link>
            <router-link @click="closeMenu"
                class="border w-full text-center border-gray-400 py-2 px-5 hover:rounded-sm mt-2" to="/login">Sign
                in</router-link>
        </div>
    </header>
</template>

<script setup>
    import { ref } from 'vue'

    const isOpen = ref(false)

    const toggleMenu = () => {
        isOpen.value = !isOpen.value
    }

    const closeMenu = () => {
        isOpen.value = false
    }
</script>
