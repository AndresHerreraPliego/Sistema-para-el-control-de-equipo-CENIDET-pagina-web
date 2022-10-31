<template>
    <v-sheet height="100%">
        
            <v-row style="height:50%;">
                <v-col cols="3">
                    <v-card height="100%" class="v-step-0" id="v-step-0">
                       <v-card-title>Total de equipo inventariado</v-card-title>
                        <apexchart type="donut" :options="charts.donutoptions" :series="charts.donutseries"></apexchart>
                    </v-card>
                </v-col>

                <v-col cols="3">
                    <v-card height="100%">
                        <v-card-title height="20%">Equipo más utilizado </v-card-title>
                        <apexchart height="80%" type="area" :options="charts.lineoptions" :series="charts.lineseries"></apexchart>
                    </v-card>
                </v-col>

                <v-col cols="3">
                    <v-row style="height:100%;">

                        <v-col cols="12">
                            <v-card id="sd-1" height="100%" link to="/administrador/usuarios">
                                <v-sheet class="d-flex justify-space-around align-center select" height="100%">
                                    <p class="text-center">Administrar Usuarios</p>
                                    <v-btn class="mx-2" fab dark color="indigo">
                                        <v-icon dark>mdi-account-group</v-icon>
                                    </v-btn>
                                </v-sheet>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-card id="sd-2" height="100%" link to="/administrador/equipo">
                                <v-sheet class="d-flex justify-space-around align-center select" height="100%">
                                    <p class="text-center">Administrar Equipo</p>
                                    <v-btn class="mx-2" fab dark color="indigo">
                                        <v-icon dark>mdi-laptop</v-icon>
                                    </v-btn>
                                </v-sheet>
                            </v-card>
                        </v-col>

                        <v-col cols="12">
                            <v-card id="sd-4" height="100%"> 
                                <announcement/>                   
                            </v-card>
                        </v-col>                      
                    </v-row>
                </v-col>
                
                <v-col cols="3">
                    <v-row style="height:100%;">
                        <v-col cols="6">
                            <v-card id="sd-5" height="100%">
                                <registerequipment/>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card id="sd-6" height="100%">
                                <registeruser/>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card id="sd-7" height="100%"> 
                                <qrcode/>                       
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card id="sd-8" height="100%">  
                                <departments/>                               
                            </v-card>
                        </v-col>                       
                    </v-row>
                </v-col>
            </v-row>

        <v-row style="height:50%;">
                <v-col cols="3">
                    <v-row style="height:100%;">
                        <v-col cols="6">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ counter.equipo }} </h1>
                                    <br>
                                    <p class="text-center">Equipo Registrado</p>
                                </v-sheet>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ counter.personal }} </h1>
                                    <br>
                                    <p class="text-center">Usuarios registrados</p>
                                </v-sheet>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card height="100%">   
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ counter.dentro }} </h1>
                                    <br>
                                    Equipo
                                    <p class="text-center">dentro de almacen</p>
                                </v-sheet>                                                     
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card height="100%">   
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ counter.fuera }} </h1>
                                    <br>
                                    Equipo
                                    <p class="text-center">fuera de almacen</p>
                                </v-sheet>                      
                            </v-card>
                        </v-col>                       
                    </v-row>
                </v-col>

                <v-col cols="9">
                    <v-card height="100%">
                        <v-card-title>Equipo usado por mes</v-card-title>
                        <apexchart height="80%" type="bar" :options="charts.options" :series="charts.series" ref="grafica"></apexchart>
                    </v-card>
                </v-col>
        </v-row>

        
    </v-sheet>
</template>
<script>
import registeruser from '@/views/admin/registeruser.vue'
import registerequipment from '@/views/admin/registerequipment.vue'
import qrcode from '@/views/admin/qrcode.vue'
import departments from '@/views/admin/departments.vue'
import announcement from '@/views/admin/announcement.vue'
import searchequipment from '@/views/admin/searchequipment.vue'

import {  mapGetters  } from 'vuex'

export default {
  name: 'dashboard',
  components: {
      registeruser,
      registerequipment,
     qrcode,
      departments,
      announcement,
      searchequipment
  },
  async created () {

    this.initcounters()
      
  },
  data: () => ({
    counter: {
        equipo: 0,
        personal: 0,
        dentro: 0,
        fuera: 0
    },
    charts: {
        donutoptions:{
            legend:{
                show: false
            },
            labels: ['Dentro de almacen', 'Fuera de almacen']
        },
        donutseries: [],
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
        lineoptions: {
            chart: {
                id: 'frecuencia-uso',
                toolbar: {
                    show: false
                    }
            },
            xaxis: {
                categories: ['laptop', 'monitor', 'mouse']
            }
        },
        lineseries: [{
            name: 'Equipo usado',
            data: [30, 40, 45]
        }]

    }

  }),
  methods: {
    initcounters() {

        let salidas = this.getitems('salidas')
        let frecc = [0,0,0,0,0,0,0,0,0,0,0,0]

        salidas.forEach( item => {
            let mes = parseInt( item.fecha.substring(5,7) )
            frecc[mes - 1] += 1
            });
        this.charts.series[0].data = frecc

        this.counter.equipo =  this.getitems('equipo').length 
        this.counter.personal =  this.getitems('personal').length 
        this.counter.fuera =  this.getitems('salida_equipo').length 
        this.counter.dentro =  this.counter.equipo - this.counter.fuera
        this.charts.donutseries.push(this.counter.dentro)
        this.charts.donutseries.push(this.counter.fuera)
        
    }
  },
  computed: {
    ...mapGetters(['getitems'])
    
  }
}
</script>