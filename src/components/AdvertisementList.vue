<template>
    <v-container fill-height text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                <v-container fill-height>
                    <v-layout row wrap>
                        <v-flex xs12  md2 lg2 v-for="item in items" :key="item.id" class="mx-2">
                            <v-card hover>
                                <v-container>
                                    <v-layout row wrap>
                                        <v-flex xs6 md12 lg12>
                                            <img class="image" :src="item.photos[0].url" />
                                        </v-flex>
                                        <v-flex xs6 md12 lg12>
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
            <v-flex xs12>
                <div class="text-xs-center">
                    <v-pagination :length="pagination.last_page" v-model="pagination.current_page" @input="getAdverts"></v-pagination>
                </div>
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
        clear: both;
        width: 200px;
    }

    .image {
        clear: both;
        width: 200px;
        height: 200px;
    }

</style>

<script>
    export default {
        name: "AdvertisementList",
        data() {
            return{
                items: [],
                pagination: {
                    current_page: String,
                    first_page_url: String,
                    last_page_url: String,
                    next_page_url: String,
                    prev_page_url: String,
                    last_page: String,
                    from: String,
                    to: String
                }
            }
        },
        methods: {
            getAdverts(page) {
                axios('advertisement?page=' + page).then((response) => {
                    this.items = response.data.data;
                    this.pagination.first_page_url = response.data.first_page_url;
                    this.pagination.last_page_url = response.data.last_page_url;
                    this.pagination.next_page_url = response.data.next_page_url;
                    this.pagination.prev_page_url = response.data.prev_page_url;
                    this.pagination.from = response.data.from;
                    this.pagination.to = response.data.to;
                    this.pagination.last_page = response.data.last_page;
                    this.pagination.current_page = response.data.current_page;
                })
            }
        },
        created() {
            this.getAdverts(1);
        }

    }
</script>
