<template>
    <v-dialog width="450px" persistent v-model="registerDialog">
        <v-btn accent slot="activator">
            {{ userIsRegistered ? 'Cancelar Registo' : 'Registar' }}
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title v-if="userIsRegistered">Cancelar Registo ?</v-card-title>
                        <v-card-title v-else>Registar ?</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>Podes sempre alterar a tua decisão mais tarde.</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn class="red--text darken-1" flat @click="registerDialog = false">Cancelar</v-btn>
                            <v-btn class="green--text darken-1" flat @click="onAgree">Confirmar</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['meetupId'],
        data () {
            return {
                registerDialog: false
            }
        },
        computed: {
            userIsRegistered () {
                return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                    return meetupId === this.meetupId
                }) >= 0
            }
        },
        methods: {
            onAgree () {
                if (this.userIsRegistered) {
                    this.$store.dispatch('unregisterUserForMeetup', this.meetupId)
                }else{
                    this.$store.dispatch('registerUserForMeetup', this.meetupId)
                }

            }
        }

    }
</script>