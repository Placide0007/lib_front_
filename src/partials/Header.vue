<template>
    <header
        class="flex justify-between items-center py-1 px-10 border-b-2 border-b-slate-800 md:sticky md:top-0 bg-white">
        <p class="font-bold text-2xl">LOGO</p>
        <nav class="flex gap-10 justify-center items-center">
            <router-link exact-active-class="active" class="nav-item" to="/">Home</router-link>
            <router-link exact-active-class="active" class="nav-item" to="/historic">Historic</router-link>
            <router-link exact-active-class="active" class="nav-item" to="/profile">Profile</router-link>
            <router-link exact-active-class="active" class="nav-item" to="/admin">Admin</router-link>
        </nav>
        <router-link class="border-1 border-gray-400 py-2 px-5 hover:rounded-sm" to="/login">Sign in</router-link>
    </header>
</template>
