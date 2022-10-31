<template>
    <v-sheet class="pa-4" height="100%" width="100%">
        <v-sheet class="overflow-y-auto overflow-x-hidden"  height="95%">

            <v-sheet  id="ut_icon" class="d-flex justify-space-between"  max-height="50">
                <img src="@/assets/pleca-gob2.png" height="50px">
                <img src="@/assets/pleca_tecnm.jpg" height="50px">
            </v-sheet>

            <v-sheet class="text-right pa-2">
            <div class="font-weight-bold text-body-2">Centro Nacional de Investigación y Desarrollo Tecnológico</div>
            <div class="text-body-2">Sistema para el control de entrada y salida de equipo</div>
            </v-sheet>

            <v-sheet class="font-weight-bold text-body-2">Equipo bajo mi resguardo</v-sheet>

            <v-row>
                <v-col cols="12" v-for="(item,i) in getitems('equipo')" :key="i">
                              <v-card outlined>
                                  <v-list-item three-line>
                                    <v-list-item-content>
                                      <div class="overline">
                                        {{item.marca}}
                                      </div>

                                      <v-list-item-title class="headline mb-1">
                                        {{item.nombre}}
                                      </v-list-item-title>

                                      
                                       <v-list-item-subtitle>
                                         {{item.tipo}}
                                      </v-list-item-subtitle>

                                      <v-list-item-subtitle>
                                       Numero de serie: {{item.no_serie}}
                                      </v-list-item-subtitle>

                                       <v-list-item-subtitle>
                                       Modelo: {{item.modelo}}
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

        <v-btn height="5%" color="primary" @click="onsubmit" :loading="loading" :disabled="loading">Descargar</v-btn>

    </v-sheet>
</template>
<script>
import {  mapGetters  } from 'vuex'
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import html2canvas from 'html2canvas';


export default {
    data: () => ({ 
    loading: false,
    style_doc:  {
              header: {
                fontSize: 18,
                bold: true
              },
              subheader: {
                fontSize: 13,
                bold: true
              },
              quote: {
                italics: true
              },
              small: {
                fontSize: 8
              }
    }
    }),
    methods: {
      async onsubmit(){

        this.loading = true
        var dd = {
          footer: function(currentPage) { return [
              { text: 'Página '+currentPage.toString(), margin: [ 30, 0, 0, 0 ] }
         ] },
          info: {
            title: 'Reporte Rastro y Seguimiento',
            author: 'scese',
          },
            content: [
               {	image: (await this.render("ut_icon")).toDataURL("image/png") , width: 500},
               {
                  text: 'Reporte Rastro y Seguimiento',
                  style: 'header'
                },
                {
                  text: 'Centro Nacional de Investigación y Desarrollo Tecnológico',
                  style: 'subheader',
                  alignment: 'right'
                },
                {
                  text: 'Sistema para el control de entrada y salida de equipo',
                  alignment: 'right'
                },
               // {canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*40, y2: 5, lineWidth: 1 }]},
                {
                  text: "\n"+this.fullname+"\n",
                  style: 'subheader',
                },
                {
                  text: "Email: "+this.getuser.email+"\nMatricula: "+this.getuser.id+"\n\n"
                },
                {
                table: {
                    widths: ['*'],
                    body: this.departaments
                      
                    }

                },
               
                {
                  text: '\nEquipo bajo mi resguardo\n\n',
                  style: 'subheader'
                },
                {
                  table: {
                    widths: ['*','*','*','*','*'],
                    body: this.equipo
                        
                  }
                }    
          ],
            styles: this.style_doc
                  
          }
        pdfMake.createPdf(dd).open();
        this.loading = false

      },
      render(id){
          return html2canvas(document.querySelector("#"+id), {
            scale: 3,
            imageTimeout: 5000
          })
      }

    },
    computed: {
    ...mapGetters(['getuser','getitems']),
        fullname: function () {
        return this.getuser.nombre +' '+this.getuser.apellido_paterno + ' '+ this.getuser.apellido_materno
    },
    departaments: function() {
      let data=[ [{text: 'Departamentos', style: 'subheader'}] ]

      this.getuser.departamentos.forEach( item => {
        data.push([item.nombre])
      });
      return data
    },
    equipo: function() {
      let data=[
        [
          {text: 'Nombre', style: 'subheader'},
          {text: 'Marca', style: 'subheader'},
          {text: 'Numero de serie', style: 'subheader'},
          {text: 'Modelo', style: 'subheader'},
          {text: 'Tipo', style: 'subheader'}
        ]
      ]

      this.getitems('equipo').forEach( item => {
        data.push( [item.nombre, item.marca, item.no_serie, item.modelo, item.tipo] )
      }); 
      return data
    }
    }

}
</script>