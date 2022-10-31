<template>
      <v-bottom-sheet v-model="sheet" inset width="900px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <a class="ml-5" v-bind="attrs" v-on="on" id="sl-4">¿Olvidaste tu contraseña?</a>
          </template>

          <v-sheet height="350px" class="pa-5">
              <v-form ref="formrecoverpass">
                <v-container fluid>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <h2 class="primary--text">Recuperar contraseña</h2>
                      <br>
                    </v-col>

                    <v-col cols="12">
                      <div class="text-body-2">Para poder recuperar tú contraseña, es necesario ingresar el email con el que te registrate en el sistema. Te enviaremos tú contraseña a este email</div>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field v-model="email" label="Ingresa email" required :rules="rules.email"></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-alert type="error" dense v-if="alert">
                          Este email no existe en nuestros registros
                      </v-alert>
                    </v-col>
            
                    <v-col cols="12">
                        <v-sheet class="d-flex align-center">
                            <v-btn color="primary" @click="onsubmit" :loading="loading" :disabled="loading">
                            Enviar
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
import {  mapActions, mapMutations  } from 'vuex'
import api from '@/store/api.js'

export default {
  name: 'recoverpass',
  data: () => ({
    sheet: false,
    alert: false,
    loading: false,

    email: '',
    rules: {
        email: [v => /.+@.+\..+/.test(v) || 'Email invalido']
    }
    
  }),
  methods: {
    ...mapActions(['dorecoverpass']),
    ...mapMutations(['message']),
    async onsubmit(){

      if(this.$refs.formrecoverpass.validate()){
      
          this.loading = true

          let response = await api.recoverpass({
            email: this.email
          });

          if(response.data){
               this.message('La contraseña fue enviada a tu email')
            this.sheet = false
          }else{
            this.alert = true
            setTimeout(() => {
                this.alert = false
            }, 3500);
          }
          
          this.loading = false

    }

  }

  
  },
   watch: {

    }
}
</script>