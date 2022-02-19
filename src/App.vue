<script lang="ts">
    export default {
        name: 'Home',
    }
</script>

<template>
    <div class="font-poppins flex min-h-screen">
        <main class="w-full">
            <router-view :key="$route.path" />
            asd
        </main>
    </div>
</template>
