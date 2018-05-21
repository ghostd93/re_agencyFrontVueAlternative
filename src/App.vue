<template>
    <div>
        <div id="loading-mask" v-show="status === 'loading'">
            <img :src="loader" />
        </div>
        <b-navbar toggleable="md" type="light" variant="faded">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand @click="goto('/')">Strona główna</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown right v-if="isAdmin()">
                        <!-- Using button-content slot -->
                        <template slot="button-content">
                            <em>Administracja</em>
                        </template>
                        <b-dropdown-item @click="goto('/users')">Użytkownicy</b-dropdown-item>
                        <b-dropdown-item @click="goto('/advertisements')">Ogłoszenia do akceptacji</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown right v-show="isLoggedIn">
                        <!-- Using button-content slot -->
                        <template slot="button-content">
                            <em v-if="user != null">{{ user.email }}</em>
                        </template>
                        <b-dropdown-item @click="goto('/account')">Profil</b-dropdown-item>
                        <b-dropdown-item @click="logout">Wyloguj</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item @click="loginForm = true" v-show="!isLoggedIn">Zaloguj się</b-nav-item>

                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
        <Login :display="loginForm && !isLoggedIn" v-on:close-click="loginForm=false" />
        <b-container fluid>
            <b-row>
                <router-view></router-view>
            </b-row>
        </b-container>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex'
    import Login from './components/Login'
    import Register from './components/Register'

    export default {
        components: {Login, Register},
        data: () => ({
            loader: require('./assets/loader.gif'),
            query: '',
            drawer: false,
            items: [
                { title: 'Dashboard', icon: 'dashboard', destination: '/dashboard'},
                { title: 'Account', icon: 'account_box', destination: '/account'},
                { title: 'Admin', icon: 'gavel', destination: '/admin'}
            ],
            loginForm: false,
            registerForm: false,
        }),
        computed: {
            ...mapGetters({
                isLoggedIn: 'isAuthenticated',
                user: 'getUser',
                status: 'advertsStatus'
            }),
        },
        methods: {
            search(query, page){
                this.$store.dispatch('searchAdvertisement', query, page);
            },
            goto(dest){
                this.$router.push(dest);
            },
            logout(){
                this.$store.dispatch('logout').then(() => {
                    this.loginForm = false;
                    this.registerForm = false;
                    this.$router.push('/');
                });
            },
            gotoHome(){
              this.$router.push('/');
            },
            isAdmin(){
                return (this.user != null && this.user.roles[0].role_name === 'administrator');
            }
        },
        created() {
            if(this.isLoggedIn){
                this.$store.dispatch('fetchUser').then(()=>{

                })
            }
        }
    }
</script>
<style scoped>
    a {
        color: #FFF
    }

    #loading-mask {
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
</style>