<template>

    <v-bottom-sheet v-model="sheet" inset>
                        <template v-slot:activator="{ on, attrs }">
                                <v-sheet class="d-flex justify-center align-center flex-column select" height="100%" v-bind="attrs" v-on="on">
                                    <v-btn class="mx-2" fab dark color="red">
                                        <v-icon dark>mdi-plus</v-icon>
                                    </v-btn>
                                    <br>
                                    <p class="text-center">Nuevo equipo</p>
                                </v-sheet>
                        </template>
                        <v-sheet height="750px" class="d-flex justify-center align-center">
                            <v-sheet  height="95%" width="98%">
                                <v-form ref="formequipo">
                                    <v-container fluid>
                                      <v-row no-gutters>
                                                <v-col cols="8">
                                                   <h2 class="primary--text">Registrar nuevo equipo</h2>
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
                                          
                                            <v-col cols="4">
                                                <v-text-field  :rules="rules.requerido" label="Nombre del equipo" required v-model="data.nombre"></v-text-field>
                                            </v-col>
                                            
                                            <v-col cols="4">
                                                      <v-text-field class="ml-5" :rules="rules.requerido" label="Marca" required v-model="data.marca"></v-text-field>
                                            </v-col>

                                            <v-col cols="4">
                                                      <v-text-field :rules="rules.requerido" label="Modelo" class="ml-5" required v-model="data.modelo"></v-text-field>
                                            </v-col>

                                            
                                            <v-col cols="4">
                                                      <v-text-field :rules="rules.requerido" label="Numero de serie" required v-model="data.no_serie"></v-text-field>
                                            </v-col>

                          
                                                                                        
                                            <v-col cols="4">
                                                      <v-text-field :rules="rules.requerido" label="Numero SEP" class="ml-5" required v-model="data.no_sep"></v-text-field>
                                            </v-col>                                            
                                            
                                            <v-col cols="4">
                                                      <v-text-field :rules="rules.requerido" class="ml-5" label="Numero Inventario" required v-model="data.no_inventario"></v-text-field>
                                            </v-col>                                            
                                            <v-col cols="4">
                                                      <v-text-field :rules="rules.requerido" label="Folio"  required v-model="data.folio"></v-text-field>
                                            </v-col>
                                                                                        
                                            <v-col cols="4">
                                                      <v-text-field :rules="rules.requerido" label="Valor" class="ml-5" required v-model="data.valor"></v-text-field>
                                            </v-col>

                                                                                        <v-col cols="4">
                                                    <v-select :rules="rules.requerido" :items="tipo" label="Tipo" required v-model="data.tipo" class="ml-5"> </v-select>

                                            </v-col>

                                            
                                            <v-col cols="6">
                                                      <v-select :rules="rules.requerido" :items="personal" label="Resguardo" required v-model="data.resguardante"> </v-select>
                                            </v-col>

                                            <v-col cols="6">
                                                      <v-text-field :rules="rules.requerido" label="Documentacion Soporte" class="ml-5" required v-model="data.doc_soporte"></v-text-field>
                                            </v-col>

                                            <v-col cols="6">
                                                <v-sheet height="200">

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

                                            <v-col cols="6">
                                                <v-sheet>
                                                    <v-img  height="150" v-if="file" :src="image" contain class="mt-2"> </v-img>
                                                    <v-file-input
                                                        accept="image/*"
                                                        prepend-icon="mdi-image"
                                                        @change="loadimage"
                                                        label="selecciona una imagen del equipo (opcional)"
                                                        v-model="file">
                                                    </v-file-input>


                                                </v-sheet>
                                                <br>
                                            </v-col>

                                            <v-col cols="12">
                                                  <v-sheet class="d-flex align-center">
                                                    <v-btn color="primary" @click="onsubmit">
                                                      Registrar
                                                    </v-btn>
                                                    <a class="ml-5" @click="sheet = !sheet">Cancelar</a>
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
                        
                        


                        </v-sheet>
    </v-bottom-sheet>
</template>
<script>
import {   mapGetters, mapActions, mapMutations } from 'vuex'
import api from '@/store/api.js'
import XLSX from 'xlsx'

export default {
    name: 'registrarequipo',
    mounted(){

        this.getitems('personal').forEach(element => {
          this.personal.push(element.nombre+' '+element.apellido_paterno+' '+element.apellido_materno)
        });

        this.getitems('tipo').forEach(element => {
          this.tipo.push(element.nombre)
        });

    },
    data: () => ({
        view: true,
        sheet: false,
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
        data: {
          nombre: '',
          marca: '',
          no_serie: '',
          modelo: '',
          foto: '',
          etiquetas: '',
          id_personal: 0,
          id_tipo: 0
        },
        personal: [],
        tipo: [],
        selectipo: '',
        selecpersonal: '',
        rules: {
            requerido: [v => !!v || 'Campo obligatorio']
        },
        file: null,
        headers: [
          { text: 'NUM SEP', value: 'no_sep'},
          { text: 'NUM INVENTARIO ', value: 'no_inventario' },
          { text: 'DESCRIPCION', value: 'nombre' },
          { text: 'MARCA', value: 'marca' },
          { text: 'MODELO', value: 'modelo' },
          { text: 'NUM SERIE', value: 'no_serie' },
          { text: 'VALOR', value: 'valor' },
          { text: 'FOLIO SOL ALTA', value: 'folio' },
          { text: 'FECHA ALTA', value: 'fecha_alta' },
          { text: 'RESGUARDANTE', value: 'resguardante' },
          { text: 'DOC SOPORTE', value: 'doc_soporte' }
        ],
        doc: []

    }),
    methods: {
      ...mapMutations(['message','additemstorage']),
      ...mapActions(['doadditemstorage','update']),
      addproperty() {
        let property={}
        property[this.item.property]=this.item.value
        this.properties.push(property)
        this.item.property=''
        this.item.value=''
      },
      eliminar(key){
        this.properties.splice(key,1)
      },
      loadimage(file){

        if(file){
          this.image = URL.createObjectURL(file)
        }else{
          this.image = null
        }

      },
      loaddata(file){


          if(file) {

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
                      'no_sep': item[0], 
                      'no_inventario': item[1],
                      'nombre': item[2], 
                      'marca': item[3], 
                      'modelo': item[4], 
                      'no_serie' : item[5], 
                      'valor': item[6], 
                      'folio': item[7], 
                      'fecha_alta': item[8],
                      'resguardante' : item[9],
                      'doc_soporte' : item[10]
                    })
            
                  }

                  
                  
                });
            }.bind(this);
            reader.readAsArrayBuffer(file);

            }

      },
      cleardata(){
        this.doc = []
        this.view = true
      },
      

      async onsubmit(){


         if(this.$refs.formequipo.validate()){

                let etiquetas={}
                this.properties.forEach(item => {
                  etiquetas[Object.keys(item)[0]] =  Object.values(item)[0] 
                });
                this.data.etiquetas = JSON.stringify(etiquetas)

                if(this.file){
                  this.data.foto= this.file
                }else{
                  this.data.foto = " "
                }

                this.getitems('personal').forEach(item => {

                  let fullname = item.nombre+' '+item.apellido_paterno+' '+item.apellido_materno

                  if(fullname == this.data.resguardante){
                    this.data.id_personal = item.id
                  }

                });

                this.getitems('tipo').forEach(item => {
    
                  if(item.nombre == this.data.tipo){
                    this.data.id_tipo = item.id
                  }
                });
                               
                let formData = new FormData();
                let today = new Date().toISOString().substring(0,10)

                formData.append("nombre",this.data.nombre);
                formData.append("marca",this.data.marca);
                formData.append("no_serie",this.data.no_serie);
                formData.append("valor",this.data.valor);
                formData.append("folio",this.data.folio);
                formData.append("modelo",this.data.modelo); 
                formData.append("no_inventario",this.data.no_inventario);
                formData.append("no_sep",this.data.no_sep);
                formData.append("etiquetas",this.data.etiquetas);
                formData.append("foto",this.data.foto);
                formData.append("fecha_alta",today);
                formData.append("doc_soporte",this.data.doc_soporte);
                formData.append("id_personal",this.data.id_personal);
                formData.append("id_tipo",this.data.id_tipo);

                let response = await api.uploadequipment( formData )
                if(response.data){
                  this.update()
                  this.sheet = false
                  this.message('Equipo registrado exitosamente')
                  this.data = {}
                }
                
         }

      },
      async onsubmitdoc(){

        let response = await this.doadditemstorage({
          value: this.doc,
          prop: 'equipos'
        }) 

        if(response){
          this.update()
          this.sheet = false
          this.message('Equipo registrado exitosamente')
          this.doc = []
          this.view = true

        }
        
      }

    },
    computed: {
      ...mapGetters(['getitems'])
    }

}
</script>