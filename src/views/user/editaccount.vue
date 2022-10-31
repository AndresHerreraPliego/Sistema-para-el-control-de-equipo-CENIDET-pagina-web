<template>
      <v-bottom-sheet v-model="sheet" inset persistent>

          <template v-slot:activator="{ on, attrs }">
            <v-btn color="indigo"  width="45%" dark tile v-bind="attrs" v-on="on">
                Editar datos
                <v-icon right>mdi-pencil</v-icon>
            </v-btn>
          </template>

          <v-sheet class="pa-5" height="600">
              <v-form ref="formeditaccount">
                <v-container fluid>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <h2 class="primary--text">Editar mis datos</h2>
                      <br>
                    </v-col>

                    <v-col cols="3">
                        <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                              <v-avatar color="indigo" size="180">
                                <img
                                  :src="data.foto"
                                  alt="John"
                                  v-if="data.foto"
                                > 
                                <span class="white--text headline" v-else>
                                   {{  getuser.nombre.substring(0,1) +  getuser.apellido_paterno.substring(0,1) }}
                                </span>
                                
                              </v-avatar>
                              <br>
                              
                              <v-file-input
                                accept="image/*"
                                label="Selecciona una imagen"
                                style="width:80%;"
                                show-size
                                @change="selectphoto"
                              ></v-file-input>

                        </v-sheet>

                    </v-col>

                    <v-col cols="9">
                        
                          <v-row no-gutters>
                              <v-col cols="12">
                              <v-text-field v-model="data.nombre" label="Nombre" required :rules="rules.requerido"></v-text-field>
                              </v-col>
                              <v-col cols="6">
                              <v-text-field v-model="data.apellido_paterno" label="Apellido Paterno" class="pr-10" required :rules="rules.requerido"></v-text-field>
                              </v-col>   
                              <v-col cols="6">
                              <v-text-field v-model="data.apellido_materno" label="Apellido Materno" required :rules="rules.requerido"></v-text-field>
                              </v-col>   
                              <v-col cols="6">
                              <v-text-field v-model="data.edad" label="Edad" class="pr-10" required :rules="rules.numerico"></v-text-field>
                              </v-col>   
                              <v-col cols="6">
                              <v-text-field v-model="data.telefono" label="Telefono" required :rules="rules.numerico"></v-text-field>
                              </v-col>   
                              <v-col cols="3">
                              <v-select v-model="data.rol" :items="['Docente','Investigador','Coordinador','Personal']" label="Cargo" required class="pr-10" :rules="rules.requerido"></v-select>
                              </v-col>  
                              <v-col cols="3">
                              <v-select v-model="data.sexo" :items="['Masculino','Femenino']" label="Sexo" required class="pr-10" :rules="rules.requerido"></v-select>
                              </v-col>  
                              <v-col cols="6">
                              <v-text-field v-model="data.id" label="Matricula" required :rules="rules.requerido"></v-text-field>
                              </v-col>  
                          </v-row>
                    </v-col>

                    
                    <v-col cols="12">
                      <v-text-field v-model="data.email" label="Email" required :rules="rules.email"></v-text-field>
                    </v-col>   
                    <v-col cols="12">
                      <v-text-field :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showpassword ? 'text' : 'password'"  @click:append="showpassword = !showpassword" v-model="data.contraseña" label="Contraseña" required :rules="rules.requerido"></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-sheet class="d-flex align-center">
                        <v-btn color="primary" link @click="onsubmit" :loading="loading" :disabled="loading">
                          Actualizar
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
import {  mapGetters, mapActions, mapMutations } from 'vuex'
import api from '@/store/api.js'

export default {
  name: 'editaccount',
  
  created(){
    this.data = this.getuser
  },
  data: () => ({
    loading: false,
    sheet: false,
    showpassword: false,
    data: {},
    rules: {
        requerido: [v => !!v || 'Campo obligatorio'],
        email: [v => /.+@.+\..+/.test(v) || 'Email invalido'],
        numerico: [ v => /[0-9]+/.test(v) || 'Solo numeros']
    }
    
  }),
  methods: {
    ...mapActions(['doupdateitemstorage']),
    ...mapMutations(['message']),
    async onsubmit(){

      if(this.$refs.formeditaccount.validate()){

        this.loading = true
        let response = await this.doupdateitemstorage({
          prop: 'personal',
          value: this.data
        })

        if(response){
          this.sheet = false
          this.message('Datos actualizados')
        }
        this.loading = false


      }




    },
    async selectphoto(photo){

      this.data.foto = URL.createObjectURL(photo)

      let formData = new FormData();
      formData.append("file",photo);
      formData.append("id",this.getuser.id);

      let response = await api.uploadimageuser(formData); 
    
      

    }
  },
  computed: {
    ...mapGetters(['getuser'])
  }
}
</script>