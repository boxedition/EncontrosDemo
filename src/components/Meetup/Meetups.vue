<template>
    <v-container>
        <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card class="info">
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-card-media
                                        :src="meetup.imgUrl"
                                        height="100%"
                                ></v-card-media>
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex xs7 sm8 md9>
                                <v-card-title>
                                    <div>
                                        <div class="white--text mb-0 headline" >{{ meetup.title }}</div>
                                        <div class="subheading white--text mb-0">Data evento {{ meetup.date | date }} - {{ meetup.location }}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn flat depressed large :to="'/meetups/' + meetup.id">
                                        <v-icon left light>arrow_forward</v-icon>
                                        Ver Encontro
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    export default {
      computed: {
        meetups () {
          return this.$store.getters.loadedMeetups
        }
      }
    }
</script>
