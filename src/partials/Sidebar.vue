<template>
    <aside class="md:w-[15%] hidden md:block bg-slate-800 text-white" >
        <ul class="flex flex-col justify-center pt-20 items-center gap-6">
            <router-link exact-active-class="active" class="p-2" to="/admin">Dashboard</router-link>
            <router-link exact-active-class="active" class="p-2" to="/users-list">Users</router-link>
            <router-link exact-active-class="active" class="p-2" to="/books-list">Books</router-link>
            <router-link exact-active-class="active" class="p-2" to="/categories-list">Categories</router-link>
        </ul>
    </aside>
</template>