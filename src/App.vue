<template>
    <v-app id="inspire">
        <v-navigation-drawer
                clipped
                v-model="drawer"
                fixed
                app
                disable-resize-watcher
        >
            <v-list>
                <v-list-tile v-for="item in items" :key="item.title" @click="goto(item.destination)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                color="blue darken-3"
                dark
                app
                fixed
        >
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <a @click="gotoHome">ReAgency</a>
            </v-toolbar-title>
            <v-text-field
                    flat
                    solo-inverted
                    prepend-icon="search"
                    label="Search"
                    class="hidden-sm-and-down"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="info" v-show="!isLoggedIn" @click="() => {registerForm=true;drawer=false}">
                Rejestracja
            </v-btn>
            <v-btn color="info" v-show="!isLoggedIn" @click="() => {loginForm=true;drawer=false}">
                Logowanie
            </v-btn>
            <v-btn color="info" v-show="isLoggedIn" @click="logout">
                Wyloguj
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <router-view></router-view>
                </v-layout>
            </v-container>
        </v-content>
        <Login :display="loginForm && !isLoggedIn" v-on:close-click="loginForm=false"></Login>
        <Register :display="registerForm && !isLoggedIn" v-on:close-click="registerForm=false"></Register>
    </v-app>
</template>

<script>

    import { mapGetters } from 'vuex'
    import Login from './components/Login'
    import Register from './components/Register'

    export default {
        components: {Login, Register},
        data: () => ({
            drawer: false,
            items: [
                { title: 'Dashboard', icon: 'dashboard', destination: '/dashboard'},
                { title: 'Account', icon: 'account_box', destination: '/account'},
                { title: 'Admin', icon: 'gavel', destination: '/admin'}
            ],
            loginForm: false,
            registerForm: false
        }),
        computed: mapGetters({
            isLoggedIn: 'isAuthenticated',
        }),
        methods: {
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
            }
        },
        created() {
            axios.interceptors.response.use(undefined, (err) => {
                return new Promise(function (resolve, reject) {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        this.$store.dispatch("AUTH_LOGOUT");
                    }
                    throw err;
                });
            });
        }
    }
</script>
<style scoped>
    a {
        color: #FFF
    }
</style>