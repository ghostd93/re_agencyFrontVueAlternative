<template>
    <div id="login-mask" v-show="display">
        <b-modal
                v-model="display"
                busy no-close-on-backdrop
                no-close-on-esc hide-footer
                hide-backdrop hide-header
                centered
        >
            <b-container fluid>
                <b-row>
                    <b-col cols="11">
                        <h2>Logowanie</h2>
                    </b-col>
                    <b-col cols="1">
                        <a @click="$emit('close-click')"><i class="fas fa-times"></i></a>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-form @submit="submit">
                            <b-form-group id="email"
                                          label="Email:"
                                          label-for="email"
                            >
                                <b-form-input id="email"
                                              type="email"
                                              v-model="user.email"
                                              required
                                              placeholder="wprowadź email">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group
                                id="password"
                                label="Hasło:"
                                laber-for="password"
                            >
                                <b-form-input
                                    id="password"
                                    type="password"
                                    v-model="user.password"
                                    required
                                    placeholder="podaj hasło"
                                >
                                </b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-btn type="submit">Zaloguj się</b-btn>
                            </b-form-group>
                        </b-form>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                valid: false,
                user:   {
                    password: '',
                    email: ''
                },
            }
        },
        computed: mapGetters({
            status: 'authStatus'
        }),
        methods: {
          submit(evt){
              evt.preventDefault();
              this.$store.dispatch('authenticate', this.user).then(() => {
                  //this.show = false;
              });
              this.$store.dispatch('fetchUser');
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