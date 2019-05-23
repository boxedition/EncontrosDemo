<template>
  <v-app>
          <v-navigation-drawer
                  temporary
                  v-model="sideNav"
                  enable-resize-watcher
                  app
          >
              <v-list dense class="pt-0">
                  <v-list-tile
                          v-for="item in menuItens"
                          :key="item.title"
                          :to="item.link"
                  >
                      <v-list-tile-action>
                          <v-icon>{{ item.icon }}</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile
                          v-if="userIsAuthenticated"
                          @click.prevent="onLogout">
                      <v-list-tile-action>
                          <v-icon>exit_to_app</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>Terminar Sessão</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
              </v-list>
          </v-navigation-drawer>
      <v-toolbar
              dark
              class="primary"
              app
      >
          <v-toolbar-side-icon @click.stop="sideNav = !sideNav"
          class="hidden-sm-and-up"></v-toolbar-side-icon>
          <v-toolbar-title>
              <router-link to="/" tag="span" style="cursor: pointer">Encontros</router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-xs-only">
              <v-btn
                      flat
                      v-for="item in menuItens"
                      :key="item.title"
                      :to="item.link"
              >
                  <v-icon left>{{item.icon}}</v-icon>
                  {{item.title}}
              </v-btn>

              <v-btn
                      flat
                      v-if="userIsAuthenticated"
                      @click.prevent="onLogout">
                  <v-icon left>exit_to_app</v-icon>
                  Terminar Sessão
              </v-btn>
          </v-toolbar-items>
      </v-toolbar>
      <v-content>
          <v-container fluid>
              <router-view></router-view>
          </v-container>
      </v-content>
      <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
    data () {
        return {
            sideNav: false
        }
    },
    computed: {
        menuItens () {
            let menuItens = [
                    { title: 'Iniciar Sessão', icon: 'lock_open', link: '/signin' },
                    { title: 'Registar', icon: 'face', link: '/signup' },
                ]
            if (this.userIsAuthenticated) {
                menuItens = [
                    { title: 'Ver Encontros', icon: 'supervisor_account', link: '/meetups' },
                    { title: 'Organizar Encontro', icon: 'room', link: '/meetups/new' },
                    { title: 'Perfil', icon: 'person', link: '/profile' }
                ]
            }
            return menuItens
        },
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }

    },
    methods :{
        onLogout () {
            this.$store.dispatch('logout')
        }
    }
}
</script>
