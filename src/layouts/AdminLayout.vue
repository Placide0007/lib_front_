<template>
    <main class="flex flex-col min-h-screen">
        <Header/>
        <section class="grow flex flex-wrap">
            <Sidebar/>
            <section class="w-full md:w-[85%] p-3">
                <router-view/>
            </section>
        </section>
        <Footer/>
    </main>
</template>
<script setup >
    import Header from '../partials/Header.vue';
    import Footer from '../partials/Footer.vue';
    import Sidebar from '../partials/Sidebar.vue';
</script>