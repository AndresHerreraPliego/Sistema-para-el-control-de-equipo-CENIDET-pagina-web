<template>
      <v-bottom-sheet v-model="sheet" inset persistent>
          <template v-slot:activator="{ on, attrs }">
                <v-sheet v-bind="attrs" v-on="on" class="d-flex justify-space-around align-center select" height="100%">
                    <p class="text-center">Localizar equipo</p>
                    <v-btn class="mx-2" fab dark color="indigo">
                        <v-icon dark>mdi-magnify</v-icon>
                    </v-btn>
                </v-sheet>

          </template>

          <v-sheet :height="height" class="pa-5">
            <v-container fluid>
                <v-row no-gutters>
                    <v-col cols="12">
                      <v-form ref="formsearch">
                        <h2 class="primary--text">Localizar equipo</h2>
                        <br>
                        <v-text-field
                                  label="Nombre del equipo o marca"
                                  required
                                  v-model="value"
                                  :rules="rules.requerido"
                        ></v-text-field>
                        <br>
                        <v-btn class="mr-4" color="primary" link @click="onsubmit" :loading="loading" :disabled="loading">
                            Buscar
                        </v-btn>
                        <v-btn text @click="sheet=!sheet; height=300;items={};value=''">Salir</v-btn>

                      </v-form>
                    </v-col>

                    <v-col cols="12">
                      <v-sheet height="400px" class="">
                        <v-row>
                          <v-alert class="ma-4" type="error" dense v-if="alert" width="100%">
                            No se encontro ningun equipo. Busca otra palabra
                          </v-alert>

                          <v-col cols="4" v-for="(item,i) in items.equipos" :key="i">
                              <v-card outlined>
                                  <v-list-item three-line>
                                    <v-list-item-content>
                                      <div class="overline">
                                        {{ items.ocupados.filter( i => i == item.id).length != 0 ? "Ocupado" : "Libre" }}
                                      </div>

                                      <v-list-item-title class="headline mb-1">
                                        {{item.nombre}}
                                      </v-list-item-title>

                                      <v-list-item-subtitle>
                                       Marca: {{item.marca}}
                                      </v-list-item-subtitle>

                                       <v-list-item-subtitle>
                                       Modelo: {{item.modelo}}
                                      </v-list-item-subtitle>

                                       <v-list-item-subtitle>
                                       Propietario: {{item.propietario}}
                                      </v-list-item-subtitle>

                                    </v-list-item-content>

                                    <v-list-item-avatar
                                      tile
                                      size="100"

                                    >
                                    <img :src="item.foto">

                                    </v-list-item-avatar>
                                  </v-list-item>
                              </v-card>
                          </v-col>
  
                        </v-row>
                      </v-sheet>
                    </v-col>

                         
                  </v-row>
            </v-container>
          </v-sheet>
       </v-bottom-sheet>
</template>
<script>
import api from '@/store/api.js'


export default {
  name: 'searchequipment',
  data: () => ({
    alert: false,
    loading: false,
    sheet: false,
    value: '',
    height: 300,
    items: {
      equipos: [],
      ocupados: []
    },
    rules: {
        requerido: [v => !!v || 'Campo obligatorio']
    }
    
  }),
  methods: {
    async onsubmit(){

      if(this.$refs.formsearch.validate()){

        this.loading = true
        let response = await api.search({
          value: this.value
        });
        this.loading = false

        if(response.data.equipos.length != 0){
          this.height = 700
          this.items = response.data
         
        }else{
          this.alert = true
          this.items = {}
          setTimeout(() => {
            this.alert = false
          }, 4000);
        }


      }

    }  
  }
}
</script>