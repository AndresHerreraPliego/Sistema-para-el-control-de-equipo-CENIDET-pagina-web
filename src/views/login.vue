<template>
      <v-row style="height:100%;">
          <v-col cols="7" style="height:100%;">
              <v-card height="100%" width="70%"  flat class="ml-sm-10 mr-sm-10">

                 <v-sheet height="7%" width="100%" class="d-flex">
                            <img src="@/assets/pleca-gob1.png" height="100%">
                            <img src="@/assets/pleca-gob2.png" height="100%">
                            <img src="@/assets/pleca_tecnm.jpg" height="100%">
                            <img src="@/assets/pleca_cenidet.jpg" height="100%">
                  </v-sheet>

                  <v-sheet height="15%" width="100%" class="d-flex align-center">
                      <h2 class="cenidet--text">Iniciar sesión    </h2>
                  </v-sheet>

                  <v-sheet height="75%" width="80%" class="d-flex justify-center align-center" elevation="3">

                    <v-sheet height="80%" width="85%">
                        <v-sheet height="90%" width="100%" >

                            <v-form
                              height="10%"
                              width="100%"
                              ref="formloginpersonal"
                              id="sl-1"
                              >
                              <v-text-field
                                label="Email"
                                required
                                v-model="data.email"
                                :rules="rules.email"
                              ></v-text-field>
                                                      <br>

                              <v-text-field
                                label="Contraseña"
                                required
                                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showpassword ? 'text' : 'password'" 
                               @click:append="showpassword = !showpassword"
                                v-model="data.password"
                                :rules="rules.requerido"
                              ></v-text-field>

                              <v-checkbox
                                v-model="data.checkbox"
                                label="Mantener iniciada la sesión"
                                dense
                                hide-details
                                class="mt-0"
                                 id="sl-2"
                              ></v-checkbox>

                              <v-alert type="error" dense v-if="alert">
                                Datos incorrectos
                              </v-alert>

                              <br>

                             

                              <v-sheet class="d-flex align-center">
                                <v-btn color="primary"  id="sl-3" @click="onsubmit" :loading="loading" :disabled="loading">
                                  Ingresar
                                </v-btn>
                                <recoverpass></recoverpass>
                              </v-sheet>

                            </v-form>
                        </v-sheet>

                        <v-sheet height="10%" width="100%">
                          <formaccount> </formaccount>
                            
                        </v-sheet>

                    </v-sheet>

                  </v-sheet>

              </v-card>
          </v-col>

          <v-col cols="5" style="height:100%;">
              <v-sheet height="100%" class="d-flex justify-end">
                      <img src="@/assets/escudo.png" height="100%" style="transform: scaleX(-1);">
              </v-sheet>
          </v-col>

          <v-tour name="login" :steps="tour.steps" :options="tour.options"></v-tour>

      </v-row>
      
</template>
<script>
import formaccount from '@/views/user/formaccount.vue'
import recoverpass from '@/views/user/recoverpass.vue'
import api from '@/store/api.js'

import {  mapActions,  mapMutations, mapGetters } from 'vuex'


export default {
  name: 'login',
  components: {
    formaccount,
    recoverpass
  },
  data: () => ({
    loading: false,
    alert: false,
    showpassword: false,
    data: {
      email: '',
      password: '',
      checkbox: false
    },
    rules: {
        requerido: [v => !!v || 'Campo obligatorio'],
        email: [v => /.+@.+\..+/.test(v) || 'Email invalido'],
    },
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
            target: '#sl-1', 
            content: `Formulario de inicio de sesión`
          },
          {
            target: '#sl-2', 
            content: `Casilla para mantener la sesión iniciada`
          },
          {
            target: '#sl-3', 
            content: `Boton para iniciar la sesión`
          },
                    {
            target: '#sl-4', 
            content: `Boton para recuperar contraseña`
          },
                    {
            target: '#sl-5', 
            content: `Boton para crear una nueva cuenta`
          }
        ]
      }

  }),
  methods: {
    ...mapActions(['dologin']),
    ...mapMutations(['savesession']),
    async onsubmit(){

      if(this.$refs.formloginpersonal.validate()){

        this.loading = true
        let response = await api.login(this.data);

        if(response.data){

          if(this.data.checkbox){
            this.savesession()
          }
          
          this.dologin(response.data)
          if(response.data.rol == "admin"){
              this.$router.push('/administrador')
            }else{
              this.$router.push('/usuario')
            }

        }else{
          this.alert = true
          setTimeout(() => {
            this.alert = false
          }, 2000);
        }
        this.loading = false

      }

    }

  }
}
</script>