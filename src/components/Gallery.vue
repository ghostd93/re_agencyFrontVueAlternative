<template>
    <v-container fill-height>
        <v-layout row wrap>
            <v-flex xs6 lg2 mg2 v-for="photo in photos" :key="photo.id" class="thumb-flex px-1">
                <a>
                    <img :src="photo.thumb_url" class="thumb" @click.stop="showModal = true; current = photo.url"
                        alt="photo.url"
                    />
                </a>
            </v-flex>
        </v-layout>
        <a id="close" @click="showModal=false" v-show="showModal"><v-icon color="white" large>close</v-icon></a>
        <Modal :src="current" :display="showModal"></Modal>
    </v-container>
</template>

<script>
    import Modal from './Modal'

    export default {
        name: "Gallery",
        props: ['id', 'photos'],
        components: {
            Modal
        },
        data(){
            return {
                current: '',
                showModal: false
            }
        },
    }
</script>

<style scoped>
    .thumb{
        width: 100%;
        max-width: 200px;
        border: 2px solid honeydew;
        border-radius: 3px;
        box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    }

    .thumb-flex{
        box-sizing: border-box;
    }

    #close {
        position: fixed;
        z-index: 9999;
        top: 0;
        right: 0;
        margin-top: 30px;
        margin-right: 50px;
    }
</style>