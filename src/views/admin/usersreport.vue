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

                <v-card-title  class="font-weight-bold text-body-2">Usuarios registrados</v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="getitems('personal')"
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
        { text: 'Apellido Paterno', value: 'apellido_paterno' },
        { text: 'Apellido Materno', value: 'apellido_materno' },
        { text: 'Email', value: 'email' }
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
            title: 'Reporte de Usuarios',
            author: 'scese',
          },
            content: [
               {	image: (await this.render("ug_icon")).toDataURL("image/png") , width: 500},
               {
                  text: 'Reporte de Usuarios',
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
                  text: '\nUsuarios Registrados\n\n',
                  style: 'subheader'
                },
                {
                  table: {
                    body: this.users
                        
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
    users: function(){
        let data=[
        [
          {text: 'Nombre', style: 'subheader'},
          {text: 'Apellido Paterno', style: 'subheader'},
          {text: 'Apellido Materno', style: 'subheader'},
          {text: 'Email', style: 'subheader'},
          {text: 'Cargo', style: 'subheader'},
           {text: 'Sexo', style: 'subheader'}
        ]
      ]

      this.getitems('personal').forEach( item => {
        data.push( [item.nombre, item.apellido_paterno, item.apellido_materno, item.email,item.rol,item.sexo] )
      }); 
      return data

    }
    }
}
</script>