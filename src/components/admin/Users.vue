<template>
    <b-table striped hover :items="users" :fields="fields">
        <template slot="delete" slot-scope="data">
            <b-btn variant="danger" @click.stop="log('dupa')">Usuń</b-btn>
        </template>
    </b-table>
</template>

<script>

    import { mapGetters } from 'vuex'

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
          log(str){
              console.log(str)
          },
        },
        created(){
            this.$store.dispatch('fetchUsers');
        }
    }
</script>

<style scoped>

</style>