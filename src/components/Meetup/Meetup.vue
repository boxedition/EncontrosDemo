<template>
    <v-container>
        <v-layout row wrap  v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                        indeterminate
                        color="primary"
                        :width="7"
                        :size="70"></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="!loading">
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h5 class="primary--text headline">{{ meetup.title}}</h5>
                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <app-edit-meetup :meetup="meetup"></app-edit-meetup>
                        </template>
                    </v-card-title>
                    <v-card-media
                            :src="meetup.imgUrl"
                            height="400px">

                    </v-card-media>
                    <v-card-text>
                        <div class="info--text">Data evento {{ meetup.date | date }} - {{ meetup.location }}</div>
                        <div>
                            <app-edit-date-meetup
                                    :meetup="meetup"
                                    v-if="userIsCreator"></app-edit-date-meetup>
                            <app-edit-time-meetup
                                    :meetup="meetup"
                                    v-if="userIsCreator"></app-edit-time-meetup>
                        </div>
                        <div>{{ meetup.description }}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <app-register-meetup :meetupId="meetup.id" v-if="userIsAuthenticated"></app-register-meetup>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: ['id'],
        computed: {
            meetup () {
                return this.$store.getters.loadedMeetup(this.id)
            },
            userIsAuthenticated () {
                return this.$store.getters.user != null && this.$store.getters.user != undefined
            },
            userIsCreator () {
                if (!this.userIsAuthenticated){
                    return false
                }
                return this.$store.getters.user.id === this.meetup.creatorId
            },
            loading () {
                return this.$store.getters.loading
            }
        }
    }
</script>