<template>
    <transition name="fade">
        <v-content  v-show="display" id="register-mask">
            <v-stepper id="stepper" v-model="step">
                <v-stepper-header>
                    <v-stepper-step color="blue" :complete="step > 1" step="1" editable></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="step > 2" step="2" editable></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="3">Podsumowanie</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card color="grey lighten-1" class="mb-5" height="200px">
                            <v-form ref="form" class="form" v-model="valid">
                                <v-text-field
                                        v-model="user.name"
                                        :rules="nameRules"
                                        label="Nazwa użytkownika"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="user.email"
                                        :rules="emailRules"
                                        label="Email"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="user.password"
                                        :rules="passwordRules"
                                        label="Hasło"
                                        type="password"
                                        required
                                ></v-text-field>
                            </v-form>
                        </v-card>
                        <v-btn @click.native="step = 2" :disabled="!valid">Dalej</v-btn>
                        <v-btn flat @click.stop="$emit('close-click')">Anuluj</v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <v-card color="grey lighten-1" class="mb-5" height="200px">
                            <v-card color="grey lighten-1" class="mb-5" height="200px">
                                <v-form ref="form" class="form" v-model="valid">
                                    <v-text-field
                                            v-model="user.name"
                                            :rules="nameRules"
                                            label="Nazwa użytkownika"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="user.email"
                                            :rules="emailRules"
                                            label="Email"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="user.password"
                                            :rules="passwordRules"
                                            label="Hasło"
                                            type="password"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="user.name"
                                            :rules="nameRules"
                                            label="Nazwa użytkownika"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="user.name"
                                            :rules="nameRules"
                                            label="Nazwa użytkownika"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="user.name"
                                            :rules="nameRules"
                                            label="Nazwa użytkownika"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="user.name"
                                            :rules="nameRules"
                                            label="Nazwa użytkownika"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="user.name"
                                            :rules="nameRules"
                                            label="Nazwa użytkownika"
                                            required
                                    ></v-text-field>
                                </v-form>
                            </v-card>
                        </v-card>
                        <v-btn @click.native="step = 3" :disabled="!valid">Dalej</v-btn>
                        <v-btn flat @click.stop="$emit('close-click')">Anuluj</v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-card color="grey lighten-1" class="mb-5"></v-card>
                        <v-btn @click.native="">Zarejestruj</v-btn>
                        <v-btn flat @click.stop="$emit('close-click')">Anuluj</v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-content>
    </transition>
</template>

<script>
    export default {
        name: "Register",
        props: ['display'],
        data: () => ({
            step: 1,
            valid: false,
            user: {
                name: null,
                email: null,
                password: null,
            },
            nameRules: [
                v => !!v || 'Wprowadź nazwę użytkownika',
                v => v.length > 4 && v.length <= 15 || 'Dopuszczalna ilość znaków - od 5 do 15'
            ],
            passwordRules: [
                v => !!v || 'Wprowadź hasło',
                v => v.length >= 6 || 'Minimalna długość hasła to 6 znaków'
            ],
            emailRules: [
                v => !!v || 'Email jest wymagany',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Wprowadź poprawny email'
            ]
        }),
    }
</script>

<style scoped>
    .form{
        background: #FFF;
    }

    #stepper{
        width: 80%;
        margin: 0 auto;
    }

    #register-mask {
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