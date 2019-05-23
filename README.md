# devmeetup

A simple organizer meetup project using: <br />
 - [Vue](https://vuejs.org/v2/guide/) 
 - [Firebase](https://firebase.google.com/docs)
 - [Vuetify](https://vuetifyjs.com/en/getting-started/quick-start)
 
## Config the DB
 - [Main.js](src/main.js) <br />

 Edit with your credentials
 ```
 firebase.initializeApp({
         apiKey: "<API_KEY>",
         authDomain: "<PROJECT_ID>.firebaseapp.com",
         databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
         projectId: "<PROJECT_ID>",
         storageBucket: "<BUCKET>.appspot.com",
         messagingSenderId: "<SENDER_ID>",
     })
 ``` 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
