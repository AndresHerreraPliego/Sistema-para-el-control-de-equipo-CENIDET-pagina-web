<template>
      <v-bottom-sheet v-model="sheet" inset>
          <template v-slot:activator="{ on, attrs }">
               <v-sheet v-bind="attrs" v-on="on" class="select d-flex justify-space-around align-center" height="100%">
                                <p class="text-center">Prestar equipo a terceros</p>
                                <v-btn class="mx-2" fab dark color="indigo">
                                    <v-icon dark>mdi-laptop</v-icon>
                                </v-btn>
                </v-sheet>

          </template>

          <v-sheet height="650px" class="pa-5">
            <v-container fluid>
                <v-row no-gutters>
                    <v-col cols="12">
                      <h2 class="primary--text">Prestar equipo</h2>
                      <br>
                    </v-col>

                    <v-col cols="12">
                      <v-row>
                        <v-col cols="5">

                          <v-form ref="formlendequipment">
                          
                          <v-select :rules="rules.requerido" v-model="data.selected" dense :items="departamentos" label="Selecciona un departamento"></v-select>

                          <v-text-field
                                label="Nombre de quien extraerá equipo"
                                required
                                v-model="data.nombre"
                                :rules="rules.requerido"
                          ></v-text-field>

                          <v-text-field
                                label="Email de quien extraera equipo"
                                required
                                v-model="data.email"
                                :rules="rules.requerido"
                          ></v-text-field>
                          
                          <v-select :items="['Investigador','Personal de apoyo','Estudiante']"
                          label="Cargo" required class="pr-10"
                          v-model="data.rol"
                          :rules="rules.requerido"
                          ></v-select> <br>

                              <v-dialog
                                  v-model="dialog"
                                  persistent
                                  max-width="500"
                                
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn text @click="sheet=!sheet">Salir</v-btn>
                                    <v-btn class="mr-4" color="primary" @click="onsubmit" :loading="loading" :disabled="loading">Generar nuevo código</v-btn>
                                  
                                  </template>
                                  <v-card>
                                    <v-card-title class="headline">
                                      Tú nuevo código: {{ codigo.id }}
                                    </v-card-title>
                                    <v-card-text>
                                      Este código sera utilizado para prestar equipo a {{ data.nombre }} en el departamentos de recursos.
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
                            <div class="pl-3 text-body-1 font-weight-bold">Mis prestamos</div>
                             <v-data-table
                              :headers="headers"
                              :items="getitems('prestamos')"
                              :items-per-page="5"
                              >
                                <template v-slot:no-data>
                                    No tienes ningun prestamo
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
  name: 'lendequipment',
  created(){

    this.getuser.departamentos.forEach(element => {
      this.departamentos.push(element.nombre)
    });

  },
  data: () => ({
    loading: false,
    sheet: false,
    dialog: false,
    data: {
      selected: '',
      nombre: '',
      rol: '',
      email: ''
    },
    salidas: [],
    departamentos: [],
    codigo: {},
    headers: [
          { text: 'codigo',value: 'id'},
          { text: 'fecha',value: 'fecha'},
          { text: 'hora',value: 'hora'},
          { text: 'estatus',value: 'estatus'},
          { text: 'responsable',value: 'responsable'},
          { text: 'cargo',value: 'cargo'}
    ],
    rules: {
        requerido: [v => !!v || 'Campo obligatorio']
    }
    
  }),
  methods: {
    ...mapActions(['storage','update']),
    async onsubmit() {

      if(this.$refs.formlendequipment.validate()){

        this.loading = true

        let id_departamento = this.getuser.departamentos.filter( item => item.nombre == this.data.selected )[0].id;
        let id = this.getuser.id

        let response = await this.storage({
          prop: 'prestamo',
          value: {
            id: id,
            departamento: id_departamento,
            nombre: this.data.nombre,
            rol: this.data.rol,
            email: this.data.email

          }
        }) 

        if(response){    
            this.dialog = true 
            this.sheet = false 
            this.codigo = response
            this.update()
            this.data = {}
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