<template>
          <v-sheet height="100%">
            <v-row style="height:50%;">
                <v-col cols="3">
                    <v-card height="80%" class="pa-5">
                      <v-row style="height:100%;" id="ud-1">
                          <v-col cols="6">
                            <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                              <v-avatar color="indigo" size="140">
                                 <img
                                  :src="getuser.foto"
                                 
                                  v-if="getuser.foto"
                                  
                                > 
                                <span class="white--text headline" v-else>
                                   {{  getuser.nombre.substring(0,1) +  getuser.apellido_paterno.substring(0,1) }}
                                </span>
                              </v-avatar>
                            </v-sheet>
                          </v-col>
                          <v-col cols="6">
                            <v-sheet height="100%" class="pt-10">
                              <div class="text-h5 mb-2">{{ getuser.nombre +' ' + getuser.apellido_paterno + ' ' + getuser.apellido_materno }}</div>
                              <v-chip class="mb-1"  color="indigo" dark small v-for="(item,k) in getuser.departamentos" :key="k"> {{item.nombre}} </v-chip>
                              <v-divider></v-divider>
                              <v-chip color="blue" small dark>{{ getuser.rol }} </v-chip>
                              <div class="text-body-2">Ultimo acceso:</div>
                              <div class="font-weight-bold">
                               {{ getlastaccess }} 
                              </div>
                            </v-sheet>
                          </v-col>
                      </v-row>
                    </v-card>

                    <v-sheet height="20%" class="d-flex align-center justify-space-between">
                      <v-btn color="red" width="45%" dark tile @click="exit">
                          Cerrar sesion
                          <v-icon right>mdi-exit-to-app</v-icon>
                      </v-btn>
                      <editaccount></editaccount>
                     
                    </v-sheet>

                </v-col>
                <v-col cols="5" style="height:100%;">
                    <v-card height="100%" id="ud-2" >
                        <v-sheet class="text-h6 pa-5" height="20%">Actividad reciente</v-sheet>
                        <v-sheet height="75%" class="overflow-y-auto overflow-x-hidden">
                            <v-timeline dense>
                                <v-timeline-item v-for="(item,i) in getitems('actividad')" :key="i"> 
                                    <v-row>
                                      <v-col cols="4" class="text-subtitle-2">
                                        <strong>{{ item.fecha }}</strong>
                                        <br>
                                        <strong>{{ item.hora }}</strong>

                                      </v-col>
                                      <v-col>
                                        <strong>{{ item.tipo }}</strong>
                                        <div class="caption">
                                          {{ item.descripcion }}
                                        </div>
                                      </v-col>
                                    </v-row>
                                </v-timeline-item>
                            </v-timeline>
                        </v-sheet>
                    
                    </v-card>
                </v-col>
                <v-col cols="2">
                    <v-row style="height:100%;">
                     
                      <v-col cols="12">
                          <v-card height="100%" id="ud-4" link to="/usuario/equipo">
                            <v-sheet class="select d-flex justify-space-around align-center" height="100%">
                                <p class="text-center">Administrar equipo</p>
                                <v-btn class="mx-2" fab dark color="indigo">
                                    <v-icon dark>mdi-wrench</v-icon>
                                </v-btn>
                            </v-sheet>
                          </v-card>
                      </v-col>
                      <v-col cols="12">
                          <v-card height="100%" id="ud-5" link to="/usuario/reportes">
                            <v-sheet class="select d-flex justify-space-around align-center" height="100%">
                                <p class="text-center">Generar reportes</p>
                                <v-btn class="mx-2" fab dark color="indigo">
                                    <v-icon dark>mdi-file-document-outline</v-icon>
                                </v-btn>
                            </v-sheet>                           
                          </v-card>
                      </v-col>
                    </v-row>
                </v-col>
                <v-col cols="2">
                    <v-row style="height:100%;">
                      <v-col cols="12">
                          <v-card height="100%" id="ud-6">
                            <lendequipment></lendequipment>
                          </v-card>
                      </v-col>
                      <v-col cols="12">
                          <v-card height="100%" id="ud-7">
                           <requestequipment></requestequipment>
                          </v-card>
                      </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row style="height:50%;">
                <v-col cols="3">
                    <v-row style="height:100%;" id="ud-8">
                        <v-col cols="6">
                            <v-card height="100%" >
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ getitems('equipo').length }} </h1>
                                    <br>
                                    <p class="text-center">Equipo bajo resguardo</p>
                                </v-sheet>
                            </v-card>
                        </v-col>

                         <v-col cols="6">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ getitems('prestamos').length }} </h1>
                                    <br>
                                    <p class="text-center">Equipo prestado</p>
                                </v-sheet>
                            </v-card>
                        </v-col>

                         <v-col cols="6">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ getitems('salidas').filter( salida => salida.estatus == 'recolectado').length }} </h1>
                                    <br>
                                    <p class="text-center">Equipo en uso</p>
                                </v-sheet>
                            </v-card>
                        </v-col>

                         <v-col cols="6">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1>{{ getitems('salidas').filter( salida => salida.estatus == 'activo').length }}</h1>
                                    <br>
                                    <p class="text-center">
                                      Códigos activos 
                                    </p>
                                </v-sheet>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="9">
                    <v-card height="100%" id="ud-9">
                        <v-card-title>Equipo usado por mes</v-card-title>
                        <apexchart height="80%" type="bar" :options="options" :series="series"></apexchart>
                    </v-card>
                </v-col>
            </v-row>
          <v-tour name="dashboard" :steps="tour.steps" :options="tour.options"></v-tour>
          </v-sheet>
</template>
<script>
import editaccount from '@/views/user/editaccount.vue'
import lendequipment from '@/views/user/lendequipment.vue'
import requestequipment from '@/views/user/requestequipment.vue'
import {  mapMutations, mapActions, mapGetters  } from 'vuex'


export default {
  name: 'dashboard',
  components: {
    editaccount,
    lendequipment,
    requestequipment
  },
  created () {
    
    this.activities = this.getitems('actividad').reverse()
    let salidas = this.getitems('salidas')

    let frecc = [0,0,0,0,0,0,0,0,0,0,0,0]

    salidas.forEach( item => {

          let mes = parseInt( item.fecha.substring(5,7) )
          frecc[mes - 1] += 1
          
        });

    this.series[0].data = frecc
        
  },
  data: () => ({
    sheet: false,
    activities: {},
    options: {
        chart: {
          id: 'frecuencia-uso'
        },
        xaxis: {
          categories: ['ene', 'feb', 'mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
        }
      },
    series: [{
        name: 'Equipo usado',
        data: []
      }],
    tour: {
        options: {
          labels: {
            buttonSkip: 'Salir',
            buttonPrevious: 'Regresar',
            buttonNext: 'Siguiente',
            buttonStop: 'Terminar'
          }
        },
        steps: [
          { target: '#ud-1', content: 'Datos del usuario', params: {   placement: 'bottom' } },
          { target: '#ud-2',content: 'Actividad reciente del usuario' },
          { target: '#ud-3',content: 'Busca disponibilidad de equipo' },
          { target: '#ud-4',content: 'Redirige a la ventana para administrar equipo' },
          { target: '#ud-5',content: 'Redirige a la ventana para generar reportes' },
          { target: '#ud-6',content: 'Genera un nuevo codigo para prestar equipo' },
          { target: '#ud-7',content: 'Generar un nuevo cofigo para solicitar equipo' },
          { target: '#ud-8',content: 'Datos relacionados al usuario' },
          { target: '#ud-9',content: 'Grafica que muestra la frecuencia de uso por mes' }

         
        ]
      }
     

  }),
  methods: {
    ...mapActions(['dologout']),
    ...mapMutations(['exitsession']),
    async exit(){
      await this.dologout()
      this.exitsession()
      this.$router.push('/')

    }

  },
  computed: {
    ...mapGetters(['getuser','getitems','getlastaccess'])
    
  }
  
}
</script>