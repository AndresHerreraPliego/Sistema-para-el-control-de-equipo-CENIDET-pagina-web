<template>
    <v-sheet class="pa-4" height="100%" width="100%">

            <v-sheet class="overflow-y-auto overflow-x-hidden"  height="95%">
                <v-sheet  id="ag_icon" class="d-flex justify-space-between"  max-height="50">
                    <img src="@/assets/pleca-gob2.png" height="50px">
                    <img src="@/assets/pleca_tecnm.jpg" height="50px">
                </v-sheet>

                <v-sheet class="text-right pa-2">
                    <div class="font-weight-bold text-body-2">Centro Nacional de Investigación y Desarrollo Tecnológico</div>
                    <div class="text-body-2">Sistema para el control de entrada y salida de equipo</div>
                </v-sheet>

                <v-row id="ag_data" style="height: 300px;" class="text-body-2">
                        <v-col cols="4">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ counter.equipo }} </h1>
                                    <br>
                                    <p class="text-center">Equipo registrado</p>
                                </v-sheet>
                            </v-card>
                        </v-col>

                         <v-col cols="4">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ counter.personal }} </h1>
                                     <br>
                                    <p class="text-center">Usuarios registrados</p>
                                </v-sheet>
                            </v-card>
                        </v-col>

                         <v-col cols="4">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ counter.departamentos }} </h1>
                                     <br>
                                    <p class="text-center">Departamentos</p>
                                </v-sheet>
                            </v-card>
                        </v-col>

                         <v-col cols="4">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1>{{ counter.dentro }}</h1>
                                     <br>
                                    <p class="text-center">
                                      Equipo dentro de almacen
                                    </p>
                                </v-sheet>
                            </v-card>
                        </v-col>
                         <v-col cols="4">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1>{{ counter.fuera  }}</h1>
                                    <br>
                                    <p class="text-center">
                                      Equipo fuera de almacen
                                    </p>
                                </v-sheet>
                            </v-card>
                        </v-col>
                         <v-col cols="4">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1>{{ getannouncements.length }}</h1>
                                     <br>
                                    <p class="text-center">
                                      Anuncios activos
                                    </p>
                                </v-sheet>
                            </v-card>
                        </v-col>
                </v-row>

                <v-card flat id="ag_chart">
                  <v-card-title class="font-weight-bold text-body-2">Frecuencia de entrada/salida</v-card-title>
                  <v-card-subtitle>El equipo que usa durante cada mes</v-card-subtitle>
                  <apexchart type="bar" :options="options" :series="series"></apexchart>
                </v-card>

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
    async mounted() {

    this.initcounters()
      
    },
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
        },
        counter: {
          equipo: 0,
          personal: 0,
          dentro: 0,
          fuera: 0,
          departamentos: 0
        },
        
        options: {
          chart: {
            id: 'frecuencia-uso'
          },
          xaxis: {
            categories: ['ene', 'feb', 'mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
          }
        },
        series: [{
          name: 'Equipo usado',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }]
    }),
    methods: {
        async onsubmit(){ 

        this.loading = true
        var dd = {
          footer: function(currentPage) { return [
              { text: 'Página '+currentPage.toString(), margin: [ 30, 0, 0, 0 ] }
         ] },
          info: {
            title: 'Reporte General',
            author: 'scese',
          },
            content: [
                {	image: (await this.render("ag_icon")).toDataURL("image/png") , width: 500},
                {
                  text: 'Reporte General',
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
                  text: '\nDatos Importantes',
                  style: 'subheader'
                },
                {	image: (await this.render("ag_data")).toDataURL("image/png") , width: 500},
                {
                table: {
                    widths: ['*'],
                    body: this.departaments
                      
                    }
                },
                {	image: (await this.render("ag_chart")).toDataURL("image/png") , width: 500},
                {
                  text: '\nAnuncios activos\n\n',
                  style: 'subheader'
                },
                {
                  table: {
                    widths: ['*','*','*'],
                    body: this.anuncios
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
        },
        initcounters() {
          this.counter.equipo =  this.getitems('equipo').length 
          this.counter.personal =  this.getitems('personal').length 
          this.counter.fuera =  this.getitems('salida_equipo').length 
          this.counter.dentro =  this.counter.equipo - this.counter.fuera
          this.counter.departamentos = this.getitems('departamento').length 
        }
    },
    computed: {
    ...mapGetters(['getitems','getannouncements']),
    departaments: function() {
      let data=[ [{text: 'Departamentos', style: 'subheader'}] ]

      this.getitems('departamento').forEach( item => {
        data.push([item.nombre])
      });
      return data
    },
    anuncios: function() {
      let data=[
        [
          {text: 'Mensaje', style: 'subheader'},
          {text: 'Destinatario', style: 'subheader'},
          {text: 'Expira', style: 'subheader'}
        ]
      ]

      this.getannouncements.forEach( item => {
        data.push( [item.mensaje,item.destinatario,item.expira] )
      }); 
      return data
    }


    }
}
</script>