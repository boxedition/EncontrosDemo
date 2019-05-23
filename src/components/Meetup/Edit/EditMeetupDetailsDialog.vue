<template>
    <v-dialog width="450px" persistent v-model="editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Editar Encontro</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                    name="title"
                                    label="Título"
                                    id="title"
                                    v-model="editedTitle"
                                    required></v-text-field>

                            <v-text-field
                                    name="description"
                                    label="Descrição"
                                    id="description"
                                    multi-line
                                    v-model="editedDescription"
                                    required></v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat color="blue--text darken-1" @click="editDialog = false">Fechar</v-btn>
                            <v-btn flat color="blue--text darken-1" @click="onSaveChanges">Guardar</v-btn>
                        </v-card-actions>
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
                 editDialog : false,
                 editedTitle : this.meetup.title,
                 editedDescription : this.meetup.description
             }
        },
        methods : {
            onSaveChanges () {
                if (this.editedTitle.trim() === '' || this.editedDescription.trim() === ''){
                    return
                }
                this.$store.dispatch('updateMeetupData',{
                    id: this.meetup.id,
                    title : this.editedTitle,
                    description : this.editedDescription
                })
                this.editDialog = false
            }
        }
    }
</script>

<style scoped>

</style>