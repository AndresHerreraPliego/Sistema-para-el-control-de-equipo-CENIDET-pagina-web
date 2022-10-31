<template>
    <v-sheet height="100%">
      <v-app-bar color="white" app>
            <v-tabs align-with-title >
                <v-tab link to="/administrador">Inicio</v-tab>
                <v-tab link to="/administrador/usuarios">Usuarios</v-tab>
                <v-tab link to="/administrador/equipo">Equipo</v-tab>
                <v-tab link to="/administrador/reportes">Reportes</v-tab>
            </v-tabs>

          <!--

          <v-autocomplete
            v-model="value"
            :items="items"
            label="Buscar"
            flat
            hide-details
            solo
            prepend-inner-icon="mdi-magnify"
            dense
            light
            style="width:450px; margin-right:10px;"
            @change="route"
            >
              <template v-slot:no-data>
                <v-sheet class="pa-2 text-body-2">
                Ninguna coincidencia
                </v-sheet>
             </template>
          </v-autocomplete>

          -->
           
            <v-btn icon @click="exit">
                <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
      </v-app-bar>
      <router-view></router-view>
    </v-sheet>
</template>
<script>
import {  mapActions, mapMutations } from 'vuex'


export default {
  name: 'administrador',
  created(){
    
    this.doinit({
      type: 'admin'    
    })

  },
  data: () => ({
    value: null,
    items: ['admin dashboard', 'admin equipo', 'admin reportes','admin usuarios']
   
  }),
  methods: {
    ...mapActions(['dologout','doinit','update']),
    ...mapMutations(['exitsession']),
    async exit(){
      await this.dologout()
      this.exitsession()
      this.$router.push('/')
    },
    route(param){
      
      this.$router.push({
        name: param
      })

    }

  },
  computed: {

  }
}
</script>