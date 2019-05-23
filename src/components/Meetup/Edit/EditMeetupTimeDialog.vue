<template>
    <v-dialog width="450px" persistent v-model="editDialog">
        <v-btn  accent slot="activator">
            Editar Hora
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Editar Hora do Encontro</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-time-picker  v-model="editableTime" style="width: 100%" actions format="24hr">
                            <template>
                                <v-btn class="blue--text darken-1" flat @click.native="editDialog = false">Fechar</v-btn>
                                <v-btn class="blue--text darken-1" flat @click.native="onSaveChanges">Guardar</v-btn>
                            </template>
                        </v-time-picker>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['meetup'],
        data () {
            return {
                editDialog: false,
                editableTime: null
            }
        },
        methods : {
            onSaveChanges () {
                const newDate = new Date(this.meetup.date)
                const hour = this.editableTime.match(/^(\d+)/)[1]
                const min = this.editableTime.match(/:(\d+)/)[1]

                newDate.setHours(hour)
                newDate.setMinutes(min)


                //console.log(newDate)

                this.$store.dispatch('updateMeetupData', {
                    id: this.meetup.id,
                    date: newDate
                })
            }
        },
        created () {
            this.editableTime= new Date(this.meetup.date).toTimeString().split(' ')[0];
            //console.log(this.editableTime)
        }
    }
</script>