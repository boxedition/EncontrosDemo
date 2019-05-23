<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h2 class="primary--text">Crear um Encontro</h2>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                    name="title"
                                    label="Título"
                                    id="title"
                                    v-model="title"
                                    required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                    name="location"
                                    label="Localização"
                                    id="location"
                                    v-model="location"
                                    required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn raised @click="onPickFile" >Upload Imagem</v-btn>
                            <input
                                    type="file"
                                    style="display: none"
                                    ref="fileInput"
                                    accept="image/*"
                                    @change="onFilePicked"/>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="150"/>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                    name="description"
                                    label="Descrição"
                                    id="description"
                                    multi-line
                                    v-model="description"
                                    required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <h3 class="primary--text">Data e hora</h3>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mb-2">
                        <v-flex xs12 sm6 offset-sm3>
                           <v-date-picker v-model="date"
                                          locale="pt-pt"></v-date-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-time-picker v-model="time"
                                           format="24hr"></v-time-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn
                                    class="primary"
                                    :disabled="!formIsValid"
                                    type="submit">Criar Encontro</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                title: '',
                location: '',
                imageUrl: '',
                description: '',
                date: '',
                time: null,
                image : null
            }
        },
        computed: {
            formIsValid () {
                return this.title !== '' &&
                this.location !== '' &&
                this.imageUrl !== '' &&
                this.description !== '' &&
                this.date !== '' &&
                this.time !== null
            },
            subDateTime () {
                if (this.date !== '' && this.time !== null) {
                    const date = new Date(this.date)
                    const hour = this.time.match(/^(\d+)/)[1]
                    const min = this.time.match(/:(\d+)/)[1]
                    date.setHours(hour)
                    date.setMinutes(min)
                    console.log(date)
                    return date
                }
            }
        },
        methods: {
            onPickFile () {
                this.$refs.fileInput.click()
            },
            onFilePicked (event) {
                const files = event.target.files
                let filename = files[0].name
                if (filename.lastIndexOf('.') <=0 ) {
                    return alert('Insira uma imagem válida!')
                }
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () =>{
                    this.imageUrl = fileReader.result
                } )
                fileReader.readAsDataURL(files[0])
                this.image = files[0]

            },
            onCreateMeetup () {
                if (!this.formIsValid) {
                    return
                }
                if (!this.image) {
                    return
                }
                const meetupData = {
                title: this.title,
                location: this.location,
                image: this.image,
                description: this.description,
                date: this.subDateTime
                }
                /**
                * In this particular case
                * Dispatch goes to the "actions" functions on the store.js file
                */
                this.$store.dispatch('createMeetUp', meetupData)
                this.$router.push('/meetups')
            }
        }
    }
</script>
