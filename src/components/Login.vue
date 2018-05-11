<template>
    <transition name="fade">
        <v-content v-show="display" id="login-mask">
            <div v-show="status == 'error'">
                <p>Niepoprawny login lub hasło</p>
            </div>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="info">
                                <v-toolbar-title>Logowanie</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <a id="close" @click="$emit('close-click')"><v-icon color="white">close</v-icon></a>
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field
                                            v-model="user.email"
                                            :rules="emailRules"
                                            label="Email"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="user.password"
                                            :rules="passwordRules"
                                            label="Password"
                                            type="password"
                                            required
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        :disabled="!valid"
                                        @click="submit"
                                        color="info"
                                >
                                    zaloguj
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </transition>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                show: this.$props.display,
                valid: false,
                user:   {
                    password: '',
                    email: ''
                },
                passwordRules: [
                    v => !!v || 'Wprowadź hasło',
                ],
                emailRules: [
                    v => !!v || 'Email jest wymagany',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Wprowadź poprawny email'
                ]
            }
        },
        computed: mapGetters({
            status: 'authStatus'
        }),
        methods: {
          submit(){
              this.$store.dispatch('authenticate', this.user).then(() => {
                  //this.show = false;
              });
          },
          close(){

          }
        },
        props: ['display']
    }
</script>

<style scoped>
    #login-mask {
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