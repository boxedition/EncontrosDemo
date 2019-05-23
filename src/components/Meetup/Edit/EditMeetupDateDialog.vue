<template>
    <v-dialog width="450px" persistent v-model="editDialog">
        <v-btn primary accent slot="activator">
            Editar Data
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Editar Data do Encontro</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-date-picker  v-model="editableDate"  locale="pt-pt" style="width: 100%" actions>
                            <template>
                                <v-btn class="blue--text darken-1" flat @click.native="editDialog = false">Fechar</v-btn>
                                <v-btn class="blue--text darken-1" flat @click.native="onSaveChanges">Guardar</v-btn>
                            </template>
                        </v-date-picker>
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
                editableDate: null
            }
        },
        methods : {
            onSaveChanges () {
                const newDate = new Date(this.meetup.date)
                const newDay = new Date(this.editableDate).getUTCDate()
                const newMonth = new Date(this.editableDate).getUTCMonth()
                const newYear = new Date(this.editableDate).getUTCFullYear()

                newDate.setUTCDate(newDay)
                newDate.setUTCMonth(newMonth)
                newDate.setUTCFullYear(newYear)

                //console.log(newDate)

                this.$store.dispatch('updateMeetupData', {
                    id: this.meetup.id,
                    date: newDate
                })
            }
        },
        created () {
            /**
             * Due to a problem on vuetify
             * Cant do the following code
             */
            //this.editableDate = new Date(this.meetup.date)
            //console.log(this.editableDate)
            this.editableDate = new Date(this.meetup.date).toISOString().slice(0,10);
        }
    }
</script>