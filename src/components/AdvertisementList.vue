<template>
    <v-container fill-height text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                <v-container fill-height>
                    <v-layout row wrap>
                        <v-flex xs12  md3 lg3 v-for="item in items" :key="item.id" class="mx-2 mb-5">
                            <v-card>
                                <v-container>
                                    <v-layout row wrap>
                                        <v-flex xs12 md12 lg12>
                                            <img class="image" :src="item.photos[0].thumb_url" />
                                        </v-flex>
                                        <v-flex xs12 md12 lg12>
                                            <p class="desc">
                                                {{ item.type }} - {{ item.property.property_type }} - {{ item.property.city }}
                                            </p>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>

        </v-layout>
    </v-container>
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
        name: "AdvertisementList",
        computed: mapGetters({
            items: 'advertisementsByPage'
        }),

        created(){
            this.$store.dispatch('getAdvertisementsByPage', 0)
        }

    }
</script>
