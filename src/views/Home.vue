<style>
  .v-step[x-placement^=left] .v-step__arrow {
    right: 100% !important;
    transform: rotate(180deg);
  }
</style>
<template>
    <v-row style="height:100%;">
        <v-col cols="7" style="height:100%;">
              <v-sheet class="ml-sm-10 mr-sm-10" height="100%">
                
                 <v-sheet height="7%" width="100%" class="d-flex">
                            <img src="@/assets/pleca-gob1.png" height="100%">
                            <img src="@/assets/pleca-gob2.png" height="100%">
                            <img src="@/assets/pleca_tecnm.jpg" height="100%">
                            <img src="@/assets/pleca_cenidet.jpg" height="100%">
                  </v-sheet>

                  <v-sheet height="30%" class="d-flex align-center justify-center">
                            <v-sheet width="96%" height="80%" class="d-flex align-center justify-start">
                              <h2 class="cenidet--text">Sistema para el control de entrada y salida de bienes del <br> Tecnológico Nacional de México campus CENIDET</h2>
                            </v-sheet>
                  </v-sheet>

                  <v-sheet height="60%" class="pa-6" elevation="2" >
                      <v-sheet class="text-body-1 font-weight-bold" height="10%">Anuncios</v-sheet>
                      <v-sheet height="90%" class="overflow-y-auto" id="step-3">

                        <v-sheet v-if="announcements.length == 0">
                          No hay anuncios publicados
                        </v-sheet>


                        <v-alert :type="item.tipo" border="left" colored-border elevation="2" v-for="(item,key) in announcements" :key="key">
                          {{item.mensaje}}
                        </v-alert>  


                      </v-sheet>   
                  </v-sheet>
                    
              </v-sheet>
        </v-col>

        <v-col cols="5" style="height:100%;">
              <v-sheet class="d-flex justify-end" height="100%">
                      <img src="@/assets/escudo.png" height="100%" style="transform: scaleX(-1);">
              </v-sheet>
        </v-col>
        
      <v-tour name="home" :steps="tour.steps" :options="tour.options"></v-tour>
    </v-row>
</template>

<script>
import api from '@/store/api.js'


export default {
  name: 'Home',
  async mounted (){ 

      let response = await api.getannouncements();   
      if(response.data){
        this.announcements = response.data
      }


  },
  data: () => ({

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
          {
            target: '#step-0',
            content: `Boton de inicio del sistema`,
            params: {
              placement: 'right-start'
            }
          },
          {
            target: '#step-1',  // We're using document.querySelector() under the hood
            content: `Boton para iniciar sesión`,
            params: {
              placement: 'right-start'
            }
            
          },
          {
            target: '#step-3', 
            content: `Banner de anuncios`
          }
        ]
      },
      announcements: []
      
  }),
  methods: {
  
    
  },
  computed: {
  

  }
}
</script>