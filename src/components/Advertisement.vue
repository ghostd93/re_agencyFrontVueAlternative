<template>
    <v-container fill-height>
        <v-layout>
            <v-flex>
                <v-container fill-height fluid grid-list-xl>
                    <v-layout row wrap>
                        <v-flex xs12 lg2 md4 v-for="photo in advertisement.photos" :key="photo.id" @click.stop="dialog = true; current=photo.url">
                            <img :src="photo.thumb_url" />
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" class="modal" max-width="1280px">
            <v-card>
                <img class="modal-image" :src="current" @click.stop="dialog=false" />
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        name: "Advertisement",
        data()  {
            return {
                dialog: false,
                current: '',
                advertisementId: 0,
                advertisement: {}
            }
        },
        methods: {
            getAdvert(id) {
                axios('advertisement/' + id).then((response) => {
                    this.advertisement = response.data.data;
                    console.log(this.advertisement)
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
        cursor: pointer;
    }
    .modal-image {
        max-width: 1280px;
        max-height: 720px;
        width: 600px;
    }
    .modal {
        padding: 0;
        margin: 0;
    }
</style>