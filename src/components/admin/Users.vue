<template>
    <div class="table-responsive">
        <table class="table table-bordered">
            <th>id</th>
            <th>nazwa</th>
            <th>email</th>
            <th>usuń</th>
            <tr v-for="(item, key) in users" :key="key">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td><b-btn @click.stop="deleteUser(item.id)" variant="danger">Usuń</b-btn></td>
            </tr>
        </table>
    </div>

</template>

<script>

    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Users",
        data: () => ({
            fields: [
                'id',
                'name',
                'email',
                'active',
                'delete'
            ]
        }),
        computed: {
            ...mapGetters({
                users: 'getUsers'
            })
        },
        methods: {
            ...mapActions(['deleteUser'])
        },
        created(){
            this.$store.dispatch('fetchUsers');
        }
    }
</script>

<style scoped>

</style>