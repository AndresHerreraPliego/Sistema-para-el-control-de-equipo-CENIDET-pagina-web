<template>

    <v-bottom-sheet v-model="sheet" inset>
                        <template v-slot:activator="{ on, attrs }">
                                <v-sheet class="d-flex justify-center align-center flex-column select" height="100%" v-bind="attrs" v-on="on">
                                    <v-btn class="mx-2" fab dark color="indigo">
                                        <v-icon dark>mdi-office-building-outline</v-icon>
                                    </v-btn>
                                    <br>
                                    <p class="text-center">Departamentos</p>
                                </v-sheet>
                        </template>

                        <v-sheet height="550px" class="d-flex justify-center align-center">
                            <v-sheet  height="95%" width="98%">
                                    <v-container fluid>
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <h2 class="primary--text">Departamentos</h2>
                                                <br>
                                            </v-col>

                                            <v-col cols="12">
                                                <v-sheet class="overflow-y-auto" height="350">
                                                    <v-row no-gutters>
                                                            <v-col cols="6" v-for="(item,key) in getitems('departamento')" :key="key">
                                                                <v-alert
                                                                color="cyan"
                                                                border="left"
                                                                elevation="2"
                                                                colored-border
                                                                class="ma-2">
                                                                {{ item.nombre }}
                                                                </v-alert>
                                                            </v-col>

                                                    </v-row>
                                                </v-sheet> <br>
                                            </v-col>

                                            <v-col cols="12">
                                                <v-btn text @click="sheet=!sheet">Salir</v-btn>

                                            </v-col>

                                        </v-row>
                                    </v-container>
                             </v-sheet>
                        </v-sheet>
    </v-bottom-sheet>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'departamentos',
    data: () => ({
        sheet: false,
    }),
    methods:{
      onsubmit(){

      }
    },
    computed: {
      ...mapGetters(['getitems'])
    }
}
</script>