import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex);

    export const store = new Vuex.Store({
    state: {
        loadedMeetups: [],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        registerUserForMeetup (state, payload) {
            const id = payload.id
            if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >=0) {
                return
            }
            state.user.registeredMeetups.push(id)
            state.user.fbKeys[id] = payload.fbKey
        },
        unregisterUserForMeetup (state, payload) {
            const registeredMeetups = state.user.registeredMeetups
            registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
            Reflect.deleteProperty(state.user.fbKeys, payload)
        },
        setLoadedMeetups (state, payload) {
            state.loadedMeetups = payload
        },
        createMeetUp (state, payload) {
            state.loadedMeetups.push(payload)
        },
        updateMeetup (state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if (payload.title){
                meetup.title = payload.title
            }
            if (payload.description){
                meetup.description = payload.description
            }
            if (payload.date){
                meetup.date = payload.date
            }
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error =  null
        }

    },
    actions: {
        registerUserForMeetup ({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/registrations/').push(payload)
                .then(data =>{
                    commit('setLoading', false)
                    commit('registerUserForMeetup', {id: payload, fbKey: data.key})
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        unregisterUserForMeetup ({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            if (!user.fbKeys){
                return
            }
            const fbkey = user.fbKeys[payload]
            firebase.database().ref('/users/' + user.id + '/registrations/').child(fbkey).remove()
                .then(() => {
                    commit('setLoading', false)
                    commit('unregisterUserForMeetup', payload)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        loadMeetups ({commit}){
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then((data) => {
                    const meetups = [];
                    const obj = data.val();
                    for (let key in obj){
                        meetups.push({
                            id:key,
                            title : obj[key].title,
                            location : obj[key].location,
                            imgUrl : obj[key].imgUrl,
                            description : obj[key].description,
                            date : obj[key].date,
                            creatorId : obj[key].creatorId
                        })
                    }
                    commit('setLoadedMeetups', meetups);
                    commit('setLoading', false)
                })
                .catch(
                    (error) => {
                        console.log(error);
                        commit('setLoading', false)
                    }
                )
        },
        createMeetUp ({commit, getters}, payload) {
        const meetup = {
            title: payload.title,
            location: payload.location,
            description: payload.description,
            date: payload.date.toISOString(),
            creatorId: getters.user.id
        }
            let imageUrl
            let key
        firebase.database().ref('meetups').push(meetup)
            .then((data) => {
                console.log(data);
                key = data.key;

                return key
            })
            .then( key => {
                /**
                 * Upload da imagem para "FireBase Storage"
                 */

                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))

                return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
            })
            .then( fileData => {
                /**
                 * @type {string}
                 * Actualizar a Base de dados com o URL da imagem
                 * que está hospedada no "FireBase Storage"
                 */

                imageUrl = fileData.metadata.downloadURLs[0]
                return firebase.database().ref('meetups').child(key).update({imgUrl : imageUrl})
            })
            .then(() => {
                /**
                 * Actualizar variáveis locais,
                 * Adicionar a propriedade "imgUrl"
                 */

                commit('createMeetUp', {
                    ...meetup,
                    imgUrl : imageUrl,
                    id: key
                })
            })
            .catch((error) => {
                console.log(error)
            })

        },
        updateMeetupData ({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title){
                updateObj.title = payload.title
            }
            if (payload.description){
                updateObj.description = payload.description
            }
            if (payload.date){
                updateObj.date = payload.date
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
                .then(()=>{
                    commit('setLoading', false)
                    commit('updateMeetup', payload)

                })
                .catch(
                    error => {
                        commit('setLoading', false)
                        console.log(error)
                    }
                )
        },
        signUpUser ({commit}, payload) {
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false);
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: [],
                            fbKeys: {}
                        };
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setError', error)
                        commit('setLoading', false)
                        console.log(error)
                    }
                )
        },
        signUserIn ({commit}, payload) {
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false);
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: [],
                            fbKeys: {}
                        };
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error =>{
                        commit('setLoading', false);
                        commit('setError', error);
                        console.log(error)
                    }
                )
        },
        autoSignIn ({commit}, payload){
            commit('setUser', {
                id : payload.uid,
                registeredMeetups: [],
                fbKeys: {}
            })
        },
        fetchUserData ({commit, getters}){
            commit('setLoading', true);
            firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
                .then(data => {
                    const dataPairs = data.val()
                    let registeredMeetups = []
                    let swappedPairs = {}

                    for (let key in dataPairs){
                        registeredMeetups.push(dataPairs[key])
                        swappedPairs[dataPairs[key]] = key
                    }

                    const updateUser = {
                        id: getters.user.id,
                        registeredMeetups: registeredMeetups,
                        fbKeys: swappedPairs
                    }

                    commit('setUser', updateUser)
                    commit('setLoading', false)
                })
                .catch(error =>{
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        logout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError ({commit}) {
            commit('clearError')
        }
    },
    getters: {
        loadedMeetups (state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date < meetupB.date
            })
        },
        featuredMeetups (state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        loadedMeetup (state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        },
        user (state) {
            return state.user
        },
        loading (state){
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
});
