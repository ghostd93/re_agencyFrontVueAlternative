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
                        <v-card color="grey lighten-1" class="mb-5">
                            <v-form ref="form" class="form" v-model="valid2">
                                <v-text-field
                                        v-model="personalData.name"
                                        :rules="firstNameRules"
                                        label="Imię"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="personalData.surname"
                                        :rules="surnameRules"
                                        label="Nazwisko"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="personalData.phone_number"
                                        :rules="phoneNumberRules"
                                        label="Numer telefonu"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="personalData.country"
                                        :rules="countryRules"
                                        label="Kraj"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="personalData.city"
                                        :rules="cityRules"
                                        label="Miasto"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="personalData.street"
                                        :rules="streetRules"
                                        label="Ulica"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="personalData.street_number"
                                        :rules="streetNumberRules"
                                        label="Numer domu/lokalu"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="personalData.postal_code"
                                        :rules="postalCodeRules"
                                        label="Kod pocztowy"
                                        required
                                ></v-text-field>
                            </v-form>
                        </v-card>
                        <v-btn @click.native="step = 3" :disabled="!valid2">Dalej</v-btn>
                        <v-btn flat @click.stop="$emit('close-click')">Anuluj</v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-card color="grey lighten-1" class="mb-5">
                            <table class="table">
                                    <tr><td>Login</td><td>{{user.name}}</td></tr>
                                    <tr><td>E-mail</td><td>{{user.email}}</td></tr>
                                    <tr><td>Imię</td><td>{{personalData.name}}</td></tr>
                                    <tr><td>Nazwisko</td><td>{{personalData.surname}}</td></tr>
                                    <tr><td>Numer telefonu</td><td>{{personalData.phone_number}}</td></tr>
                                    <tr><td>Kraj</td><td>{{personalData.country}}</td></tr>
                                    <tr><td>Miasto</td><td>{{personalData.city}}</td></tr>
                                    <tr><td>Ulica</td><td>{{personalData.street}}</td></tr>
                                    <tr><td>Numer domu/lokalu</td><td>{{personalData.street_number}}</td></tr>
                                    <tr><td>Kod pocztowy</td><td>{{personalData.postal_code}}</td></tr>
                            </table>
                        </v-card>
                        <v-btn @click.native="register()">Zarejestruj</v-btn>
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
            valid2: false,
            user: {
                name: null,
                email: null,
                password: null,
            },
            personalData: {
                name: null,
                surname: null,
                phone_number: null,
                country: null,
                city: null,
                street: null,
                street_number: null,
                postal_code: null
            },
            streetRules: [
                v => !!v || 'Wprowadź ulicę'
            ],
            cityRules: [
                v => !!v || 'Wprowadź miasto'
            ],
            countryRules: [
                v => !!v || 'Wprowadź kraj'
            ],
            surnameRules: [
                v => !!v || 'Wprowadź nazwisko'
            ],
            firstNameRules: [
                v => !!v || 'Wprowadź imię'
            ],
            phoneNumberRules: [
                v => !!v || 'Wprowadź numer telefonu',
                v => v.length <= 12 || 'Numer telefonu jest za długi',
                v => v.length >= 9 || 'Numer telefonu jest za krótki'
            ],
            streetNumberRules: [
                v => !!v || 'Wprowadź numer domu/lokalu',
                v => v.length < 6 || 'Za długi numer domu/lokalu'
            ],
            postalCodeRules: [
                v => !!v || 'Wprowadź kod pocztowy',
                v => /^\d{2}-\d{3}$/.test(v) || 'Wprowadź poprawny kod pocztowy'
            ],
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
        methods: {
            register(){
                this.$store.dispatch('register', this.user, this.personalData).then(() => {
                    console.log('registered');
                })
            }
        }
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

    .stepper-content{
        height: auto;
        overflow: scroll;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>