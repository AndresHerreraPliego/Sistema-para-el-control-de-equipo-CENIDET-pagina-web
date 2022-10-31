<template>
      <v-bottom-sheet v-model="sheet" inset>
          <template v-slot:activator="{ on, attrs }">
                <v-sheet v-bind="attrs" v-on="on" class="select d-flex justify-space-around align-center" height="100%">
                                <p class="text-center">Solicitar equipo</p>
                                <v-btn class="mx-2" fab dark color="indigo">
                                    <v-icon dark>mdi-card-text</v-icon>
                                </v-btn>
                </v-sheet>
          </template>

          <v-sheet height="500px" class="pa-5">
            <v-container fluid>
                <v-row no-gutters>
                    <v-col cols="12">
                      <h2 class="primary--text">Solicitar extraccion de equipo</h2>
                      <br>
                    </v-col>

                    <v-col cols="12">
                      <v-row>
                        <v-col cols="5">
                          <v-form ref="formrequestequipment">

                            <v-select :rules="rules.requerido" v-model="selected" dense :items="departamentos" label="Selecciona un departamento"></v-select>

                               <v-dialog
                                  v-model="dialog"
                                  persistent
                                  max-width="500"
                                
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn text @click="sheet=!sheet">Salir</v-btn>

                                    <v-btn class="mr-4" color="primary" :loading="loading" :disabled="loading" @click="onsubmit">Generar nuevo código</v-btn>
                                  <br>
                                  </template>
                                  <v-card>
                                    <v-card-title class="headline">
                                      Tú nuevo código: {{ codigo.id }}
                                    </v-card-title>
                                    <v-card-text>
                                      Presenta este código con la persona que autoriza la extraccion de equipo que esta bajo
                                      tu resguardo
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                
                                            <v-btn
                                              color="green darken-1"
                                              text
                                              @click="dialog = false"
                                            >
                                              Aceptar
                                            </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>

                          </v-form>
                        </v-col>

                        <v-col cols="7">
                            <div class="pl-3 text-body-1 font-weight-bold">Mis códigos</div>
                          
                              <v-data-table
                              :headers="headers"
                              :items="getitems('salidas')"
                              :items-per-page="5"
                              >

                                <template v-slot:no-data>
                                    No tienes códigos generados
                                </template>
                              
                              </v-data-table>

                        </v-col>
                      </v-row>
                    </v-col>    

                         
                  </v-row>
            </v-container>
          </v-sheet>
       </v-bottom-sheet>
</template>

<script>
import { mapGetters, mapActions  } from 'vuex'

export default {
  name: 'requestequipment',
  created (){

    this.salidas = this.getitems('salidas')

    this.getuser.departamentos.forEach(element => {

      this.departamentos.push(element.nombre)
      
    });


  },
  data: () => ({
    loading: false,
    sheet: false,
    dialog: false,
    selected: '',
    salidas: [],
    departamentos: [],
    codigo: {},
    headers: [
          { text: 'codigo',value: 'id'},
          { text: 'fecha',value: 'fecha'},
          { text: 'hora',value: 'hora'},
          { text: 'estatus',value: 'estatus'}
   ],
    rules: {
        requerido: [v => !!v || 'Campo obligatorio']
    }
    
  }),
  methods: {
    ...mapActions(['dostorage','update']),
    async onsubmit(){

      if(this.$refs.formrequestequipment.validate()){
         this.loading = true

         
          

          let id_departamento = this.getuser.departamentos.filter( item => item.nombre == this.selected )[0].id;
          let id = this.getuser.id

          
          let response = await this.dostorage({
            prop: 'salida',
            value: {
              id: id,
              departamento: id_departamento
            }
          })

          if(response){
              this.dialog = true
              this.sheet = false
              this.codigo = response
              this.update()
          }else{
            console.log('error')

          }

          this.loading = false
      }

    }  
  },
  computed: {
    ...mapGetters(['getitems','getuser']) 
  }
}
</script>