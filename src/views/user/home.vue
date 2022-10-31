<template>
    <v-sheet height="100%">
      
      <v-app-bar app color="white">
            <v-tabs align-with-title >
                <v-tab link to="/usuario">Inicio</v-tab>
                <v-tab link to="/usuario/equipo">Equipo</v-tab>
                <v-tab link to="/usuario/reportes">Reportes</v-tab>
            </v-tabs>

            <v-menu offset-y left offset-overflow>
                <template v-slot:activator="{ on, attrs }">
                   <v-btn icon v-bind="attrs" v-on="on">

                    <v-icon>mdi-bell</v-icon>

                  </v-btn>
                </template>
                <v-sheet height="400" width="400" class="d-flex justify-center align-center">
                  <v-sheet height="90%" width="95%">
                    
                    <v-sheet height="10%" class="mb-2">
                      <div class="text-body-1 font-weight-bold">Anuncios</div>
                    </v-sheet>
                    <v-sheet height="90%" class="overflow-y-auto">
                        <v-sheet v-if="anuncios.length == 0">
                          No tienes anuncios
                        </v-sheet>

                        <v-alert
                          class="text-body-2"
                          elevation="2"
                          v-for="(item, i) in anuncios" :key="i"
                          :type="item.tipo"
                          >
                          {{item.mensaje}}
                        </v-alert> 
                    </v-sheet>
                    
   
                  </v-sheet>
                </v-sheet>
               
              </v-menu>
            <v-btn icon @click="exit">
                <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
      </v-app-bar>
      <router-view></router-view>

    </v-sheet>
</template>
<script>
import {  mapActions, mapMutations,mapGetters  } from 'vuex'

export default {
  name: 'home',
  async mounted () {

    await this.doinit({
      type: 'user',
      id: this.getuser.id
    })
    this.anuncios = this.getannouncements
    
  },
  data: () => ({
    anuncios: [],
    items: ['dashboard', 'equipo', 'reportes'],
    value: null
  }),
  methods: {
    ...mapActions(['dologout','doinit']),
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
    ...mapGetters(['getuser','getannouncements'])
    
  }
}
</script>