import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'
import * as firebase from 'firebase'
import {store} from './store/'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'


Vue.use(Vuetify, {
  theme: {
    primary: '#f44336',
    secondary: '#e57372',
    accent: '#9c27b0',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
})

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup', EditMeetupDetailsDialog)
Vue.component('app-edit-date-meetup', EditMeetupDateDialog)
Vue.component('app-edit-time-meetup', EditMeetupTimeDialog)
Vue.component('app-register-meetup', RegisterDialog)

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
        apiKey: "<API_KEY>",
        authDomain: "<PROJECT_ID>.firebaseapp.com",
        databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
        projectId: "<PROJECT_ID>",
        storageBucket: "<BUCKET>.appspot.com",
        messagingSenderId: "<SENDER_ID>",
    })
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              /**
               * Case i have a valid token stored on the Local Storage
               * we can use it back on the FireBase
               */
              this.$store.dispatch('autoSignIn', user)
              this.$store.dispatch('fetchUserData')
          }
      })

      this.$store.dispatch('loadMeetups')
  }
})
