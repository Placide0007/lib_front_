<template>
    <form action="" method="post" class="w-[400px] flex gap-5 flex-col p-7 md:p-0">
        <p class="text-center text-2xl mb-3">Sign in to <span class="font-bold" >Library</span></p>

        <Input placeholder="Email..." class="  w-full  rounded-xs" type="email" name="" />
        
        <Input placeholder="password..." class="  w-full  rounded-xs" type="password" name="" />
        
        <button type="button" class="bg-slate-700   cursor-pointer hover:bg-slate-600 text-white p-4 rounded-xs">Log in</button>

        <AlternativeLink link="/profile" text="No acount?" linkText="Create one" />
    </form>
</template>

<script setup >
    import Input from '../../../components/common/Input.vue';
    import AlternativeLink from '../../../components/common/AlternativeLink.vue';
</script>