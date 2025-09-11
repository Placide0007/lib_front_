<template>
    <main class="flex flex-col min-h-screen">
        <section class="flex justify-center grow items-center min-h-screen">
            <router-view/>
        </section>
        <Footer/>
    </main>
</template>
<script setup >
    import Footer from '../partials/Footer.vue';
</script>