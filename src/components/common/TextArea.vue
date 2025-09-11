<template>
    <div>
        <textarea 
        :name="name" 
        v-bind="$attrs"  
        cols="30" 
        class="p-3 bg-gray-200 outline-slate-800 resize-none"
        rows="1" 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"></textarea>
        <div  v-if="error" class="text-red-600 text-xs">
            <p>{{ error }}</p>
        </div>
    </div>
</template>
<script setup>

defineProps({
    name: String,
    modelValue: String,
    error: String,
})

defineEmits(['update:modelValue'])

</script>