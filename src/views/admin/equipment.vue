<template>
    <v-container fluid>

        <v-row>
            <v-col cols="12" style="background-color: white;">
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  class="elevation-1"
                  hide-default-footer
                >
                  <template v-slot:top>
                    <v-toolbar
                      flat
                    >
                      <v-toolbar-title>Equipo</v-toolbar-title>
                      <v-spacer></v-spacer>

                      <v-bottom-sheet
                        v-model="dialog"
                        inset
                      >
                        <template v-slot:activator="{ on, attrs }">
                           <v-btn
                            color="primary"
                            dark
                            class="mb-2 mr-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            Nuevo Equipo
                          </v-btn>
                        </template>
                                           <v-sheet height="650px" class="d-flex justify-center align-center">
                            <v-sheet  height="95%" width="98%">
                                <v-form>
                                    <v-container fluid>
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <h2 class="primary--text"> {{ formTitle }} </h2>
                                            </v-col>

                                            <v-col cols="12">
                                                <v-text-field label="Nombre del equipo" required v-model="editedItem.nombre"></v-text-field>
                                            </v-col>
                                            
                                            <v-col cols="4">
                                                      <v-text-field label="Marca" required v-model="editedItem.marca"></v-text-field>
                                            </v-col>

                                            
                                            <v-col cols="4">
                                                      <v-text-field label="Numero de serie" class="ml-5" required v-model="editedItem.no_serie"></v-text-field>
                                            </v-col>

                                            
                                            <v-col cols="4">
                                                      <v-text-field label="Modelo" class="ml-5" required v-model="editedItem.modelo"></v-text-field>
                                            </v-col>

                                            
                                            <v-col cols="6">
                                                  <v-select :items="personal" label="Encargado" required v-model="editedItem.propietario"> </v-select>
                                            </v-col>

                                            
                                            <v-col cols="6">
                                                  <v-select :items="tipo" label="Tipo" required v-model="editedItem.tipo" class="ml-5"> </v-select>
                                            </v-col>

                                            <v-col cols="6">
                                                <v-sheet>


                                                  <v-tabs v-model="tab">
                                                      <v-tab>Seleccionar imagen</v-tab>
                                                      <v-tab>Seleccionar imagen predeterminada</v-tab>
                                                  </v-tabs>

                                                  <v-tabs-items v-model="tab">
                                                      <v-tab-item>
                                                        <v-sheet height="200">
                                                          <v-img height="80%" :src="image" contain class="mt-2">

                                                          </v-img>
                                                          <v-file-input
                                                                accept="image/*"
                                                                prepend-icon="mdi-image"
                                                                @change="loadimage"
                                                                label="seleccionar"
                                                          ></v-file-input>
                                                        </v-sheet>
                                                      </v-tab-item>

                                                      <v-tab-item>
                                                        <v-sheet height="200">
                                                         <v-slide-group
                                                          v-model="model"
                                                          active-class="success"
                                                          show-arrows
                                                        >

                                                            <v-slide-item
                                                              v-for="image in slide"
                                                              :key="image"
                                                              v-slot="{ active, toggle }"
                                                            >
                                                              <v-card
                                                                class="ma-4"
                                                                height="150"
                                                                width="150"
                                                                @click="toggle"
                                                              >
                                                                
                                                                <v-img :src="image">
                                                                
                                                                  <v-fade-transition>
                                                                    <v-sheet color="rgba(0,0,0,0.6)" height="100%" width="100%" v-if="active" class="d-flex justify-center align-center">
                                                                    <v-icon
                                                                      v-if="active"
                                                                      color="white"
                                                                      size="48"
                                                                      v-text="'mdi-check'"
                                                                      large
                                                                    ></v-icon>
                                                                    </v-sheet>
                                                                  </v-fade-transition>
                                                                  
                                                                </v-img>
                                                              
                                                              </v-card>
                                                            </v-slide-item>
                                                          </v-slide-group>
                                                        </v-sheet>
                                                      </v-tab-item>
                                                  </v-tabs-items>

                                              
                                                  </v-sheet>
                                                
                                                <br>
                                            </v-col>

                                            <v-col cols="6">
                                                <v-sheet height="200" class="ml-5">

                                                  <v-row no-gutters>
                                                    <v-col cols="12">
                                                    <p>Propiedades</p>

                                                    </v-col>
                                                    <v-col cols="5">
                                                      <v-text-field label="Propiedad" required dense v-model="item.property"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="5">
                                                      <v-text-field label="Valor" required dense class="ml-5" v-model="item.value"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                      <v-btn class="mx-2 ml-5" fab x-small color="primary" @click="addproperty">
                                                        <v-icon dark>mdi-plus </v-icon>
                                                      </v-btn>
                                                    </v-col>

                                                    <v-col cols="12">
                                                      
                                                        <v-chip color="primary" class="ma-2" v-for="(item, key) in properties" :key="key" close @click:close="eliminar(key)">
                                                            <strong > {{ Object.keys(item)[0] }}</strong>&nbsp;
                                                            <div class="text-body-1">({{ Object.values(item)[0] }})</div>
                                                        </v-chip>

                                                    </v-col>
                                                  </v-row>                                      
                                                </v-sheet>
                                            </v-col>

                                            <v-col cols="12">
                                                  <v-sheet class="d-flex align-center">
                                                    <v-btn color="primary">
                                                      Registrar
                                                    </v-btn>
                                                    <a class="ml-5" @click="dialog = !dialog">Cancelar</a>
                                                  </v-sheet>
                                            </v-col> 



                                        </v-row>
                                    </v-container>
                                </v-form>
                            </v-sheet>
                        
                        
                        
                        </v-sheet>
                      </v-bottom-sheet>
                    </v-toolbar>
                  </template>

                  <template v-slot:item.actions="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      small
                      @click="deleteItem(item)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>

                  <template v-slot:item.etiquetas="{ item }">
                    <v-chip
                      color="primary"
                      v-for="(i,key) in JSON.parse(item.etiquetas)" :key="key"
                    >
                       {{ key }} ({{ i }})

                      
                    </v-chip>
                    
                  </template>

                  <template v-slot:no-data>
                    <v-btn
                      color="primary"
                      @click="initialize"
                    >
                      Reiniciar
                    </v-btn>
                  </template>

                </v-data-table>
            </v-col>
        </v-row>

    </v-container>
</template>
<script>
import {  mapMutations, mapGetters  } from 'vuex'

export default {
  name: 'Materia',
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Marca', value: 'marca' },
      { text: 'Serie', value: 'no_serie' },
      { text: 'Modelo', value: 'modelo' },
      { text: 'Caracteristicas', value: 'etiquetas' },
      { text: 'Tipo', value: 'tipo' },
      { text: 'Propietario', value: 'propietario' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      nombre: '',
      marca: '',
      no_serie: '',
      modelo: '',
      etiquetas: '',
      tipo: '',
      propietario: '',
      foto: ''
    },
    defaultItem: {
      nombre: '',
      marca: '',
      no_serie: '',
      modelo: '',
      etiquetas: '',
      tipo: '',
      personal: '',
      foto: ''
    },
    model: null,
    tab: null,
    image: null,
    item: {
          property: '',
          value: ''
    },
    properties: 
          [
            { ram: '6gb' }, { cpu: 'Intel Celeron' }
          ],
    slide: [
          'http://localhost/icons/001-ssd.png',
          'http://localhost/icons/007-ram.png',
          'http://localhost/icons/008-fan.png',
          'http://localhost/icons/009-disk.png',
          'http://localhost/icons/012-harddrive.png',
          'http://localhost/icons/013-controller.png',
          'http://localhost/icons/014-mouse.png',
          'http://localhost/icons/015-keyboard.png',
          'http://localhost/icons/016-pc.png'
        ],
    personal: [],
    tipo: []
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Registrar nuevo equipo' : 'Editar datos del equipo'
    },
    ...mapGetters(['getitems'])

  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.desserts = this.getitems('equipo')
  },
  methods: {
    ...mapMutations(['additemstorage']),
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      this.desserts.splice(index, 1)
      
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        
      }else {
        this.desserts.push(this.editedItem)
        
      }
      this.close()
    },
    addproperty() {
        let property={}
        property[this.item.property]=this.item.value
        this.properties.push(property)

        this.item.property=''
        this.item.value=''
    },
    loadimage(image){

          this.image=URL.createObjectURL(image)

    },
    eliminar(key){

        this.properties.splice(key,1)


      }
  }

}
</script>
