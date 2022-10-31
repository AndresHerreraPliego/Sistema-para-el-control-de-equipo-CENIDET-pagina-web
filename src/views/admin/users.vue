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
                      <v-toolbar-title>Usuarios</v-toolbar-title>
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
                            Nuevo usuario
                          </v-btn>
                        </template>

                                                <v-sheet height="500px">
                                        <v-sheet height="100%" class="d-flex justify-center align-center">

                                            <v-sheet  height="95%" width="95%">
                                              <v-form ref="personal">
                                                <v-container fluid>
                                                  <v-row no-gutters>
                                                    <v-col cols="12">
                                                      <h2 class="primary--text"> {{ formTitle }}</h2>
                                                      <br>
                                                    </v-col>
                                                    <v-col cols="12">
                                                      <v-text-field label="Nombre" required v-model="editedItem.nombre"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="6">
                                                      <v-text-field label="Apellido Paterno" required v-model="editedItem.apellido_paterno"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="6">
                                                      <v-text-field label="Apellido Materno" class="pl-10" required v-model="editedItem.apellido_materno"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="3">
                                                      <v-text-field label="Edad" required v-model="editedItem.edad"></v-text-field>
                                                    </v-col>

                                                    <v-col cols="3">
                                                      <v-select :items="roles" label="Rol" class="pl-10" required v-model="editedItem.rol"> </v-select>
                                                    </v-col>

                                                    <v-col cols="6">
                                                      <v-text-field label="Telefono" class="pl-10" required v-model="editedItem.telefono"></v-text-field>
                                                      <br>
                                                    </v-col>

                                                    <v-col cols="6">
                                                      <v-text-field label="Email" required v-model="editedItem.email"></v-text-field>
                                                      <br>
                                                    </v-col>

                                                    <v-col cols="6">
                                                      <v-text-field label="Contraseña" class="pl-10" required v-model="editedItem.contraseña"></v-text-field>
                                                      <br>
                                                    </v-col>

                                                    <v-col cols="12">
                                                  <v-sheet class="d-flex align-center">
                                                    <v-btn color="primary" @click="save">
                                                      Guardar
                                                    </v-btn>
                                                    <a class="ml-5" @click="sheet = !sheet">Cancelar</a>
                                                  </v-sheet>
                                                    </v-col>      
                                                  </v-row>
                                                </v-container>
                                                </v-form>
                                          
                                            </v-sheet>

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
  name: 'personal',
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Apellido paterno', value: 'apellido_paterno' },
      { text: 'Apellido materno', value: 'apellido_materno' },
      { text: 'Rol', value: 'rol' },
      { text: 'Edad', value: 'edad' },
      { text: 'Telefono', value: 'telefono' },
      { text: 'Email', value: 'email' },
      { text: 'Contraseña', value: 'contraseña' },
      { text: 'Acciones', value: 'actions', sortable: true }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      rol: '',
      edad: '',
      telefono: '',
      email: '',
      contraseña: ''
    },
    defaultItem: {
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      rol: '',
      edad: '',
      telefono: '',
      email: '',
      contraseña: ''
    },
    roles: ['Docente','Personal']
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Registrar nuevo personal' : 'Editar datos del personal'
    },
    ...mapGetters(['getitems'])
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.desserts = this.getitems('personal')
  },
  methods: {
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
      } else {
        //this.desserts.push(this.editedItem)

        this.additemstorage({
            prop: 'personal',
            value: this.editedItem
        })

      }
      this.close()
    },
    ...mapMutations(['additemstorage'])
  }

}
</script>
