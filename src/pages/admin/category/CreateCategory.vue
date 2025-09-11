<template>
    <form action="" method="post" class="w-[400px] flex gap-5 flex-col p-3">
        <p class="text-center text-2xl mb-3">New Category</p>
        <Input placeholder="Category..." class="  w-full  rounded-xs" type="email" name="" />    
        <button type="button" class="bg-slate-700   cursor-pointer hover:bg-slate-600 text-white p-4 rounded-xs">Create</button>
    </form>
</template>
<script setup >
    import Input from '../../../components/common/Input.vue';
</script>