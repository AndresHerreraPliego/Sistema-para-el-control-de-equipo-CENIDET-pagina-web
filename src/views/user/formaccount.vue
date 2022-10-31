<template>
      <v-bottom-sheet v-model="sheet" inset width="900px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind="attrs" v-on="on" id="sl-5">Crear nueva cuenta</a>
          </template>

          <v-sheet height="650px" class="pa-5">
              <v-form ref="formcreateaccount">
                <v-container fluid>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <h2 class="primary--text">Crear nueva cuenta</h2>
                      <br>
                    </v-col>
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
                    </v-col>   
                    <v-col cols="12">
                      <v-text-field :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showpassword ? 'text' : 'password'" 
                      v-model="data.contraseña" label="Contraseña" 
                      required :rules="rules.requerido"
                      @click:append="showpassword = !showpassword"
                      ></v-text-field>
                    <br>
                    </v-col> 
                    <v-col cols="12">
                      <v-sheet class="d-flex align-center">
                        <v-btn color="primary" link @click="onsubmit" :loading="loading" :disabled="loading">
                          Crear
                        </v-btn>
                        <a class="ml-5" @click="sheet=!sheet">Cancelar</a>
                      </v-sheet>
                    </v-col>      
                  </v-row>
                </v-container>
                </v-form>
    
          </v-sheet>
       </v-bottom-sheet>
</template>

<script>
import {  mapActions  } from 'vuex'

export default {
  name: 'login',
  data: () => ({
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
      contraseña: '',
      rol: '',
      id: '',
      sexo: '',
      departamentos: []
    },
    rules: {
        requerido: [v => !!v || 'Campo obligatorio'],
        email: [v => /.+@.+\..+/.test(v) || 'Email invalido'],
        numerico: [ v => /[0-9]+/.test(v) || 'Solo numeros', v => v.length <= 10 || 'Max 10 digitos']
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
    ]
  }),
  methods: {
    ...mapActions(['docreateaccount']),
    async onsubmit(){

      if(this.$refs.formcreateaccount.validate()){

        this.loading = true
        let response = await this.docreateaccount(this.data)
        this.loading = false
        if(response){
          this.$router.push('/usuario')
           
        }

      }
    }
  
  }
}
</script>