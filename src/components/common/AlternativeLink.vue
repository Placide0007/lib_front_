<template>
    <fieldset class="border-t border-t-gray-200" >
            <legend class="text-center px-3">or</legend>
            <div class="flex justify-center items-center text-sm py-2">
                <p>{{ text }}</p>
                <router-link class="underline" :to="link" >{{ linkText }}</router-link>
            </div>
    </fieldset>
</template>
<script setup >
    defineProps({
        text:String,
        link:String,
        linkText:String
    })
</script>