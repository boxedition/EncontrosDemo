<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-expansion-panel expand>
                    <v-expansion-panel-content v-for="(item,i) in 5" :key="i" :value="item === 2">
                        <div slot="header">Item</div>
                        <v-card>
                            <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    export default {
        computed: {
            user () {
                return this.$store.getters.user
            },
            loading () {
                return this.$store.getters.loading
            }
        }
    }
</script>
