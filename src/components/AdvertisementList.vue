<template>
    <b-container fluid>
        <b-row>
            <b-col cols="2" v-for="(item, key) in items" :key="key">
                <p>{{ item.date_of_announcement }}</p>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-pagination
                    size="md"
                    :total-rows="100"
                    :limit="pagination.last_page"
                    v-model="pagination.current_page"
                    :per-page="10"
                    v-on:input="getAdvertisementsByPage(pagination.current_page)"
            >
            </b-pagination>
        </b-row>
    </b-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
    button {
        height: 300px;
        width: 300px;
    }
    img {
        display: block;
        clear: both;
        float: left;
    }

    .desc {
        width: 100%;
        font-size: 13px;
    }

    .image {
        width: 100%;
    }

</style>

<script>

    import { mapGetters, mapActions } from 'vuex'

    export default {
        data: () => ({

        }),
        name: "AdvertisementList",
        computed: mapGetters({
            items: 'advertisementsByPage',
            pagination: 'pagination'
        }),
        watch: {

        },
        methods: {
            ...mapActions([
            'getAdvertisementsByPage'
        ]),
            gotoAdvert(id){
                this.$router.push('/advertisement/' + id);
            }
        },
        created(){
            this.$store.dispatch('getAdvertisementsByPage', 1)
        }

    }
</script>
