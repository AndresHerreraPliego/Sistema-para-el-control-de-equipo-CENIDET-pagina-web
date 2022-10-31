<template>
  <v-bottom-sheet v-model="sheet" inset persistent>
      
          <template v-slot:activator="{ on, attrs }">
            <v-sheet class="d-flex justify-space-around align-center select" height="100%" v-bind="attrs" v-on="on">
                <p class="text-center">Gestionar anuncios</p>
                <v-btn class="mx-2" fab dark color="indigo">
                <v-icon dark>mdi-bell-ring</v-icon>
                </v-btn>
            </v-sheet> 
          </template>

          <v-sheet height="500px" class="pa-5">
              <v-form ref="formanuncio">
                    <v-container fluid>
                        <v-row no-gutters>
                            

                                <v-col cols="12">
                                    <v-tabs v-model="tab">
                                        <v-tab>anuncios activos</v-tab>
                                        <v-tab>crear nuevo anuncio</v-tab>
                                    </v-tabs>

                                    <v-tabs-items v-model="tab">
                                        <v-tab-item>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-sheet height="320" class="overflow-y-auto pt-2">
                                                        <v-alert 
                                                        border="left" 
                                                        
                                                        colored-border 
                                                        :color="item.tipo"
                                                        elevation="1" 
                                                        dense v-for="(item,key) in announcements" :key="key">
                                                            
                                                                <v-row >
                                                                    <v-col class="grow">
                                                                        {{item.mensaje}}
                                                                    </v-col>
                                                                    <v-col class="shrink">
                                                                    <v-btn fab color="red" dark small @click="ondelete(item)">                 
                                                                        <v-icon small>
                                                                            mdi-delete
                                                                        </v-icon>
                                                                    </v-btn>
                                                                    </v-col>
                                                                </v-row>
                                                        </v-alert>    
                                                    </v-sheet>  
                                                </v-col>

                                                <v-col cols="12">
                                                    <v-btn  color="primary" text @click="sheet = !sheet">Salir</v-btn>
                                                </v-col>
                                            </v-row> 
                                        </v-tab-item>

                                        <v-tab-item>
                                            <v-form ref="formanuncio">
                                                <v-row>
                                                    
                                                    <v-col cols="12">
                                                        <v-text-field :rules="rules.requerido" label="Mensaje" required v-model="data.mensaje"></v-text-field>
                                                    </v-col>

                                                    <v-col cols="4">
                                                            <v-select
                                                            :items="['Investigador','Personal','Todos']"
                                                            label="Destinatario"
                                                            v-model="data.destinatario"
                                                            :rules="rules.requerido"
                                                            ></v-select>
                                                    </v-col>

                                                    <v-col cols="4">
                                                            <v-select
                                                            :items="['Relevante', 'Importante', 'Advertencia']"
                                                            label="Tipo de anuncio"
                                                            v-model="data.tipo"
                                                            :rules="rules.requerido"
                                                            ></v-select>
                                                    </v-col>

                                                    <v-col cols="4">
                                                        <v-menu
                                                                ref="menu"
                                                                v-model="menu"
                                                                :close-on-content-click="false"
                                                                :return-value.sync="date"
                                                                transition="scale-transition"
                                                                offset-y
                                                                min-width="290px"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field
                                                                    label="Duracion"
                                                                    readonly
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                    v-model="date"
                                                                    :rules="rules.requerido"
                                                                ></v-text-field>
                                                                </template>
                                                                <v-date-picker
                                                                no-title
                                                                scrollable
                                                                range
                                                                v-model="date"
                                                                locale="ES"
                                                                >
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn
                                                                        text
                                                                        color="primary"
                                                                        @click="menu = false"
                                                                    >
                                                                        Cancelar
                                                                    </v-btn>
                                                                    <v-btn
                                                                        text
                                                                        color="primary"
                                                                        @click="$refs.menu.save(date)"
                                                                    >
                                                                        Aceptar
                                                                    </v-btn>
                                                                </v-date-picker>
                                                            </v-menu>
                                                        </v-col>

                                                <v-col cols="12">
                                                    <v-sheet class="d-flex align-center">
                                                        <v-btn color="primary" @click="onsubmit">
                                                        Crear
                                                        </v-btn>
                                                        <v-btn class="ml-2" color="primary" text @click="sheet = !sheet">Salir</v-btn>
                                                    </v-sheet>

                                                </v-col>
                                                        
                                                </v-row>
                                            </v-form>
                                        </v-tab-item>
                                    </v-tabs-items>

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
// Relevante, Importante, Advertencia
export default {
    name: 'anuncios',
    async mounted() {
        let response = await api.getannouncements(); 
      
        if(response.data){
            this.announcements = response.data
        }
    },
    data: () => ({
        sheet: false,
        tab: null,
        date: null,
        menu: false,
        data: {
            mensaje:'',
            destinatario: '',
            inicia: '',
            expira: ''
        },
        rules: {
            requerido: [v => !!v || 'Campo obligatorio'],
            email: [v => /.+@.+\..+/.test(v) || 'Email invalido']
        },
        announcements: []
    }),
    methods: {
        ...mapActions(['doaddannouncement']),
        ...mapMutations(['message']),
        async onsubmit(){
           
            if(this.$refs.formanuncio.validate()){

                this.data.inicia = this.date[0]
                this.data.expira = this.date[1]
                this.data.tipo = this.type_alert(this.data.tipo)
                this.data.destinatario = this.data.destinatario.toLowerCase()
                
                let response  = await api.createannouncement(this.data)
                if(response.data){
                    this.message('Anuncio creado')
                    this.sheet = !this.sheet
                    this.announcements.push(this.data)
                    this.data = {}
                } 

            }

        },
        async ondelete(item){

            let response  = await api.deleteannouncement(item.id)
            if(response.data){
                this.message('Anuncio Eliminado')
                 const index = this.announcements.indexOf(item)
                this.announcements.splice(index, 1)
            }

           

        },
        type_alert(type){

            switch(type){
                case 'Relevante':
                    return 'info'
                case 'Importante':
                    return 'warning'
                case 'Advertencia':
                    return 'error'
            }
            
        }


    },
    computed: {
      ...mapGetters(['getannouncements'])

    }
    
}
</script>