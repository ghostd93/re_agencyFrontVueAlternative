<template>
    <transition name="fade">
    <div id="modal-mask" v-show="display">
        <img :src="src" />
    </div>
    </transition>
</template>

<script>
    export default {
        name: "Modal",
        props: ['src', 'display'],
        methods: {
            close(){
                this.display = false;
            }
        }
    }
</script>

<style scoped>
    img {
        max-height: 90vh;
        border: 2px solid #FFF;
        border-radius: 3px;
        margin: 0 auto;
    }

    #modal-mask {
        display: flex;
        position: fixed;
        z-index: 9998;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
        align-items: center;
        justify-content: center;
    }



    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>