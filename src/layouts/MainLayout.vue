<template>
    <main class="flex flex-col min-h-screen">
        <Header/>
        <section class="grow p-3">
            <router-view/>
        </section>
        <Footer/>
    </main>
</template>
<script setup >
    import Header from '../partials/Header.vue';
    import Footer from '../partials/Footer.vue';
</script>