<template>
    <v-container fill-height>
        <v-layout>
            <v-tabs fixed-tabs class="tabs" d-flex>
                <v-tab ripple>
                Ogłoszenie
                </v-tab>
                <v-tab ripple>
                    Galeria
                </v-tab>
                <v-tab-item>
                    <v-layout row wrap>
                        <v-flex xs6 class="mt-5">
                            <h2 v-for="(item, key) in advertisement" v-if="item !== null">{{ key + ': ' + item }}</h2>
                        </v-flex>
                        <v-flex xs12 class="mt-5"><h2>Opis</h2></v-flex>
                        <v-flex xs12><p>{{ description }}</p></v-flex>
                    </v-layout>
                </v-tab-item>
                <v-tab-item>
                    <v-container fill-height>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <div class="text-xs-center">
                                    <img :src="current" id="big-image" />
                                </div>
                            </v-flex>
                            <v-flex class="mx-1" xs12 lg2 md4 v-for="photo in photos" :key="photo.id" @click="current=photo.url">
                                <img :src="photo.thumb_url" class="small-image" />
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-tab-item>
            </v-tabs>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Advertisement",
        data()  {
            return {
                current: '',
                advertisementId: 0,
                advertisement: {
                    "Typ" : null,
                    "Data ogłoszenia": null,
                    "Cena": null,
                },
                photos: [],
                description: ''
            }
        },
        methods: {
            getAdvert(id) {
                axios('advertisement/' + id).then((response) => {
                    this.advertisement['Typ'] = response.data.data.type;
                    this.advertisement['Data ogłoszenia'] = response.data.data.date_of_announcement;
                    this.description = response.data.data.description;
                    this.advertisement['Cena'] = response.data.data.price + 'zł';
                    this.photos = response.data.data.photos;
                    this.current = response.data.data.photos[0].url;
                })
            }
        },
        created() {
            this.advertisementId = this.$route.params.id;
            this.getAdvert(this.advertisementId);
        }
    }
</script>

<style scoped>
    img{
        border-radius: 2px;
        box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    }

    .small-image{
        width: 100%;
        max-width: 200px;
    }

    #big-image {
        width: 100%;
    }
    .tabs {
        width: 100%;
        top: 0;
    }
</style>