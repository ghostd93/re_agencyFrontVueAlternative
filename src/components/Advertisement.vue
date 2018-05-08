<template>
    <v-container fill-height>
        <v-layout row wrap>
            <v-flex xs6>
                <table class="table">
                    <tr v-for="(item, key) in advertisement" v-if="item !== null"><td>{{ key + ':' }}</td><td>{{ item }}</td></tr>
                </table>
            </v-flex>
            <v-flex xs6>
                <table class="table">
                    <tr v-for="(item, key) in property" v-if="item !== null"><td>{{ key + ':' }}</td><td>{{ item }}</td></tr>
                </table>
            </v-flex>
            <v-flex xs12><h2>Opis</h2></v-flex>
            <v-flex xs12><p>{{ description }}</p></v-flex>
            <hr>
            <Gallery :id="advertisementId" :photos="photos"></Gallery>
        </v-layout>
    </v-container>
</template>

<script>

    import Gallery from './Gallery'

    export default {
        name: "Advertisement",
        components: {
            Gallery
        },
        data()  {
            return {
                showModal: false,
                current: '',
                advertisementId: 0,
                advertisement: {
                    "Typ" : null,
                    "Data ogłoszenia": null,
                    "Cena": null,
                },
                property: {
                  "Typ nieruchomości": null,
                  "Powierzchnia": null,
                    "Data budowy": null,
                    "Ilość pięter": null,
                    "Ilość pokoi": null,
                    "Piętro": null,
                    "Balkon": null,
                    "Garaż": null,
                    "Powierzchnia działki": null,
                    "Adres": null
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

                    this.property['Typ nieruchomości'] = response.data.data.property.property_type;
                    this.property['Powierzchnia'] = response.data.data.property.property_area;
                    this.property['Data budowy'] = response.data.data.property.date_of_construction;
                    this.property['Ilość pięter'] = response.data.data.property.number_of_floors;
                    this.property['Ilość pokoi'] = response.data.data.property.number_of_rooms;
                    this.property['Piętro'] = response.data.data.property.floor;
                    this.property['Balkon'] = response.data.data.property.balcony;
                    this.property['Garaż'] = response.data.data.property.garage;
                    this.property['Powierzchnia działki'] = response.data.data.property.land_area;
                    this.property['Adres'] = response.data.data.property.country + ' ' +
                        response.data.data.property.postal_code + ' ' + response.data.data.property.city + ' ' +
                        response.data.data.property.street + ' ' + response.data.data.property.street_number;
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