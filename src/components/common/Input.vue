<template>
    <div>
        <input  v-bind="$attrs" 
            :type="type" 
            :name="name" 
            class="bg-gray-200 outline-slate-800 p-3"
            :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)"
        >
        <div class="text-red-600" v-if="error">
            <p>{{ error }}</p>
        </div>        
    </div>
</template>
<script setup >
    defineProps({
        label: String,
        name: String,
        modelValue: [String, Number],
        error: String,
    })
    defineEmits(['update:modelValue'])
</script>