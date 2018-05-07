<template>
    <v-container fill-height text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                <v-container fill-height>
                    <v-layout row wrap>
                        <v-flex xs12  md3 lg3 v-for="item in items" :key="item.id" class="mx-2 mb-5">
                            <v-card hover @click.native="showAdvert(item.id)">
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
            <v-flex xs12>
                <div class="text-xs-center">
                    <v-pagination
                            color="blue"
                            :length="pagination.last_page"
                            v-model="pagination.current_page"
                            @input="getAdverts"
                    ></v-pagination>
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
        width: 100%;
        font-size: 13px;
    }

    .image {
        width: 100%;
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
            },
            showAdvert(id){
                this.$router.push({
                    'name': 'Advertisement',
                    'params': { id: id }
                });
            }
        },
        created() {
            this.getAdverts(1);
        }

    }
</script>
