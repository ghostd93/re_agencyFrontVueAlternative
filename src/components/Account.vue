<template>
    <div>{{ user }}</div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "Account",
        data: () => ({
        }),
        computed: mapGetters({
            user: 'getUser',
        })
    }
</script>

<style scoped>

</style>