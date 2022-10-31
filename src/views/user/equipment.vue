<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" style="background-color: white;">
                <v-data-table
                  :headers="headers"
                  :items="equipo_activo"
                  class="elevation-1"
                  hide-default-footer
                >
                  <template v-slot:top>
                    <v-toolbar
                      flat
                    >
                      <v-toolbar-title>Equipo en uso</v-toolbar-title>
                    </v-toolbar>
                  </template>

                  <template v-slot:no-data>
                                    No tienes equipo en uso
                                </template>
                </v-data-table>
            </v-col>
            <v-col cols="12" style="background-color: white;">
                <v-data-table
                  :headers="headers"
                  :items="equipo_prestado"
                  class="elevation-1"
                  hide-default-footer
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Equipo prestado</v-toolbar-title>
                  
                    </v-toolbar>
                  </template>

                  <template v-slot:no-data>
                              No tienes equipo prestado
                  </template>
                </v-data-table>
            </v-col>
        </v-row>

    </v-container>
</template>
<script>
import { mapGetters  } from 'vuex'

export default {
  name: 'Materia',
  created(){

    this.getitems('salidas_activas').forEach( item => {

      if(this.prestamo(item.id_salida)){
        this.equipo_prestado.push(this.equipo(item.id_equipo))

      }else{
        this.equipo_activo.push( this.equipo(item.id_equipo))

      }
      
    });
  

  },
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Marca', value: 'marca' },
      { text: 'Serie', value: 'no_serie' },
      { text: 'Modelo', value: 'modelo' }
    ],
    equipo_activo: [],
    equipo_prestado: []
  }),
  computed: {
    ...mapGetters(['getuser','getitems'])
  },

  watch: {

  },
  methods: {
    prestamo(id){
      let prestamo;
      this.getitems('prestamos').forEach( item => {

        if(item.id == id){
          prestamo = item
        }
        
      });
      return prestamo

    },
    equipo(id){

      let equipo;
      this.getitems('equipo').forEach( item => {

        if(item.id == id){
          equipo = item
        }
        
      });
      return equipo

    }
 
  }

}
</script>