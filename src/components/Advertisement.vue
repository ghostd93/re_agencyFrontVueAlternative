<template>
    <v-container fill-height>
        <v-layout row wrap>
            <v-flex xs12 lg6 md6>
                <table class="table">
                    <tr v-for="value in Array.from(advertisement)" v-if="value[1] !== null"><td>{{ value[0] + ':' }}</td><td>{{ value[1] }}</td></tr>
                </table>
            </v-flex>
            <v-flex xs12 lg6 md6>
                <table class="table">
                    <tr v-for="value in Array.from(property)" v-if="value[1] !== null"><td>{{ value[0] + ':' }}</td><td>{{ value[1] }}</td></tr>
                </table>
            </v-flex>
            <v-flex xs12><h2>Opis</h2></v-flex>
            <v-flex xs12><p>{{ description }}</p></v-flex>
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
                advertisement: new Map(),
                property: new Map(),
                photos: [],
                description: ''
            }
        },
        methods: {
            getAdvert(id) {
                axios('advertisement/' + id).then((response) => {
                    this.advertisement.set('Typ', response.data.data.type);
                    this.advertisement.set('Data ogłoszenia', response.data.data.date_of_announcement);
                    this.description = response.data.data.description;
                    this.advertisement.set('Cena', response.data.data.price + 'zł');
                    this.photos = response.data.data.photos;
                    this.current = response.data.data.photos[0].url;

                    this.property.set('Powierzchnia', response.data.data.property.property_area);
                    this.property.set('Data budowy', response.data.data.property.date_of_construction);
                    this.property.set('Ilość pięter', response.data.data.property.number_of_floors);
                    this.property.set('Ilość pokoi', response.data.data.property.number_of_rooms);
                    this.property.set('Piętro', response.data.data.property.floor);
                    this.property.set('Balkon', response.data.data.property.balcony);
                    this.property.set('Garaż', response.data.data.property.garage);
                    this.property.set('Powierzchnia działki', response.data.data.property.land_area);
                    this.property.set('Adres', response.data.data.property.country + ' ' +
                        response.data.data.property.postal_code + ' ' + response.data.data.property.city + ' ' +
                        response.data.data.property.street + ' ' + response.data.data.property.street_number);
                    this.property.set('Typ nieruchomości', response.data.data.property.property_type);
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

</style>