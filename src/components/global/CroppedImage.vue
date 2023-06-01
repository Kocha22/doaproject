<template>
    <div>
        <img
            class="
                rounded
                w-full
                border-solid
                border-4
                border-blue-500
            "
            :src="image"
        >
    </div>
                    
</template>

<script setup>
    import { toRefs } from 'vue'
    const props = defineProps({ image: String })
    const { image } = toRefs(props)
</script>