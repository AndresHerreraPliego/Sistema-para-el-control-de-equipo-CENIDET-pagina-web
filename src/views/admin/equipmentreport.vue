<template>
   <v-sheet class="pa-4" height="100%" width="100%">
            <v-sheet class="overflow-y-auto overflow-x-hidden"  height="95%">

                <v-sheet  id="ug_icon" class="d-flex justify-space-between"  max-height="50">
                    <img src="@/assets/pleca-gob2.png" height="50px">
                    <img src="@/assets/pleca_tecnm.jpg" height="50px">
                </v-sheet>

                <v-sheet class="text-right pa-2">
                    <div class="font-weight-bold text-body-2">Centro Nacional de Investigación y Desarrollo Tecnológico</div>
                    <div class="text-body-2">Sistema para el control de entrada y salida de equipo</div>
                </v-sheet>

                <v-card-title  class="font-weight-bold text-body-2">Equipo registrado</v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="getitems('equipo')"
                  hide-default-footer
                > </v-data-table>
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
        headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Marca', value: 'marca' },
        { text: 'Modelo', value: 'modelo' },
        { text: 'Numero de serie', value: 'no_serie' }
        ],
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
            title: 'Reporte de Equipo',
            author: 'scese',
          },
            content: [
               {	image: (await this.render("ug_icon")).toDataURL("image/png") , width: 500},
               {
                  text: 'Reporte de Equipo',
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
              
                {
                  text: '\nEquipo Registrado\n\n',
                  style: 'subheader'
                },
                {
                  table: {
                    widths: ['*','*','*','*'],
                    body: this.equipment
                        
                  }
                },
                
             
               
                
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
    ...mapGetters(['getitems']),
    equipment: function(){
        let data=[
        [
          {text: 'Nombre', style: 'subheader'},
          {text: 'Marca', style: 'subheader'},
          {text: 'Modelo', style: 'subheader'},
          {text: 'Numero de serie', style: 'subheader'}
        ]
      ]

      this.getitems('equipo').forEach( item => {
        data.push( [item.nombre, item.marca, item.modelo, item.no_serie] )
      }); 
      return data

    }

    }
}
</script>