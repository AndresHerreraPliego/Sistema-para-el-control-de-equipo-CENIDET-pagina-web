<template>

    <v-bottom-sheet v-model="sheet" inset persistent>
        <template v-slot:activator="{ on, attrs }">
                                <v-sheet class="d-flex justify-center align-center flex-column select" height="100%" v-bind="attrs" v-on="on">
                                    <v-btn class="mx-2" fab dark color="red">
                                        <v-icon dark>mdi-plus</v-icon>
                                    </v-btn>
                                    <br>
                                    <p class="text-center">Nuevo usuario</p>
                                </v-sheet>
        </template>

          <v-sheet height="650px" class="pa-5">
              <v-form ref="formcreateaccount">
                <v-container fluid>
                  <v-row no-gutters>
                      <v-col cols="8">
                                                   <h2 class="primary--text">Registrar nuevo usuario</h2>
                      </v-col>
                      <v-col cols="4">
                                                      <v-file-input
                                                          label="Registrar desde documento excel"
                                                          filled
                                                         @change="loaddata"
                                                         @click:clear="cleardata"

                                                        ></v-file-input>
                      </v-col>                                             
                  </v-row>

                  <v-row no-gutters v-if="view">
                    <v-col cols="12">
                      <v-text-field v-model="data.nombre" label="Nombre" required :rules="rules.requerido"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="data.apellido_paterno" label="Apellido Paterno" class="pr-10" required :rules="rules.requerido"></v-text-field>
                    </v-col>   
                    <v-col cols="6">
                      <v-text-field v-model="data.apellido_materno" label="Apellido Materno" required :rules="rules.requerido"></v-text-field>
                    </v-col>   

                    <v-col cols="3">
                      <v-text-field v-model="data.edad" label="Edad" class="pr-10" required :rules="rules.numerico"></v-text-field>
                    </v-col>   
                    <v-col cols="3">
                      <v-text-field v-model="data.telefono" label="Telefono" class="pr-10" required :rules="rules.numerico" counter="10"></v-text-field>
                    </v-col>

                    <v-col cols="6">
                              <v-select
                                v-model="data.departamentos"
                                :items="departamentos"
                                attach
                                chips
                                label="Departamentos"
                                multiple
                                required :rules="rules.requerido"
                              ></v-select>
                    </v-col>


               
                    <v-col cols="3">
                            <v-select dense v-model="data.rol" :items="['Investigador','Personal']" label="Cargo" required class="pr-10" :rules="rules.requerido"></v-select>

                    </v-col>

                    <v-col cols="3">
                            <v-select dense v-model="data.sexo" :items="['Masculino','Femenino']" label="Sexo" required class="pr-10" :rules="rules.requerido"></v-select>

                    </v-col>
                      
                 

                    <v-col cols="6">
                      <v-text-field v-model="data.id" label="Matricula" required :rules="rules.requerido"></v-text-field>
                    </v-col>  
                    <v-col cols="12">
                      <v-text-field v-model="data.email" label="Email" required :rules="rules.email"></v-text-field>
                      <br>
                    </v-col>   
                    
                    <v-col cols="12">
                      <v-sheet class="d-flex align-center">
                        <v-btn color="primary" link @click="onsubmit" :loading="loading" :disabled="loading">
                          Registrar
                        </v-btn>
                        <a class="ml-5" @click="sheet=!sheet">Cancelar</a>
                      </v-sheet>
                    </v-col> 

                  </v-row>
                  <v-row v-else>
                                            <v-col cols="12">
 
                                                <v-data-table
                                                  :headers="headers"
                                                  :items="doc"
                                                  :items-per-page="7"
                                                  class="elevation-1"                            
                                                ></v-data-table>
                                            </v-col>
                                            <v-col cols="12">
                                                  <v-sheet class="d-flex align-center">
                                                    <v-btn color="primary" @click="onsubmitdoc">
                                                      Registrar
                                                    </v-btn>
                                                    <a class="ml-5" @click="sheet = !sheet">Cancelar</a>
                                                  </v-sheet>
                                            </v-col> 

                  </v-row>

                </v-container>
                </v-form>
    
          </v-sheet>

    </v-bottom-sheet>
</template>
<script>
import {  mapActions, mapMutations  } from 'vuex'
import XLSX from 'xlsx'

export default {
    name: 'registrarpersonal',
    data: () => ({
    view: true,
    doc: [],
    loading: false,
    sheet: false,
    showpassword: false,
    data: {
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      edad: '',
      telefono: '',
      email: '',
      rol: '',
      id: '',
      sexo: '',
      departamentos: []
    },
    rules: {
        requerido: [v => !!v || 'Campo obligatorio'],
        email: [v => /.+@.+\..+/.test(v) || 'Email invalido'],
        numerico: [ v => /[0-9]+/.test(v) || 'Solo numeros']
    },
    departamentos: [
      'Ciencias Computacionales',
      'Ingeniería Electronica',
      'Ingeniería Mecánica',
      'Desarrollo Académico',
      'Seguimiento de Estudios',
      'Planeación',
      'Gestión Tecnológica',
      'Comunicación y Eventos',
      'Centro de Información',
      'Recursos Materiales',
      'Recursos Humanos',
      'Recursos Financieros',
      'Servicios Escolares'
    ],
    headers: [
          { text: 'Nombre', value: 'nombre'},
          { text: 'Apellido Paterno', value: 'apellido_paterno' },
          { text: 'Apellido Materno', value: 'apellido_materno' },
          { text: 'Edad', value: 'edad' },
          { text: 'Matricula', value: 'matricula' },
          { text: 'Telefono', value: 'telefono' },
          { text: 'Email', value: 'email' },
          { text: 'Cargo', value: 'rol' },
          { text: 'SEXO', value: 'sexo' }
        ]

    }),
    methods:{
      ...mapActions(['docreateaccount','doadditemstorage','update']),
       ...mapMutations(['message']),
      async onsubmit(){

      if(this.$refs.formcreateaccount.validate()){

        this.loading = true
        this.data.contraseña = ""
        let response = await this.docreateaccount(this.data)
        this.loading = false
        if(response){
          
          this.sheet = false
          this.message('Usuario registrado')
          this.message = false
          this.data={}
          this.update()
         
        }

      }
     },
      cleardata(){
        this.doc = []
        this.view = true
      },
      async onsubmitdoc(){

        let response = await this.doadditemstorage({
          value: this.doc,
          prop: 'usuarios'
        }) 

        if(response){
          this.sheet = false
          this.message('Usuarios registrado exitosamente')
          this.doc = []
          this.view = true

        }
        
      },
      loaddata(file){

        if(file){
            this.view = false
              let reader = new FileReader();
              reader.onload = async function (e) {

                  let data = new Uint8Array(e.target.result);
                  let workbook = XLSX.read(data, { type: "array" });
                  let worksheet = workbook.Sheets[workbook.SheetNames[0]];
                  let sheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                  let control = true

                  sheet.forEach( item => {
                      if(control){
                          control = false
                          return
                        }
                      if(item.length > 0) {

                          this.doc.push( {
                            'nombre': item[0], 
                            'apellido_paterno': item[1],
                            'apellido_materno': item[2], 
                            'edad': item[3], 
                            'telefono' : item[4], 
                            'rol' : item[5], 
                            'sexo': item[6],
                            'matricula': item[7], 
                            'email': item[8]
                          })
                  
                        }

                        
                        
                      });
              }.bind(this);
              reader.readAsArrayBuffer(file);
        }

      }

    }
}
</script>