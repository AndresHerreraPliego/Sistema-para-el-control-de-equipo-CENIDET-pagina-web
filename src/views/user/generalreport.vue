<template>
    <v-sheet class="pa-4" height="100%">

        <v-sheet class="overflow-y-auto overflow-x-hidden"  height="95%">

        <v-sheet  id="ug_icon" class="d-flex justify-space-between"  max-height="50">
            <img src="@/assets/pleca-gob2.png" height="50px">
            <img src="@/assets/pleca_tecnm.jpg" height="50px">
        </v-sheet>

        <v-sheet class="text-right pa-2">
            <div class="font-weight-bold text-body-2">Centro Nacional de Investigación y Desarrollo Tecnológico</div>
            <div class="text-body-2">Sistema para el control de entrada y salida de equipo</div>
        </v-sheet>

        <v-card flat id="ug_chart">
            <v-card-title class="font-weight-bold text-body-2">Frecuencia de uso</v-card-title>
            <v-card-subtitle>El equipo que use durante cada mes</v-card-subtitle>
            <apexchart type="bar" :options="options" :series="series"></apexchart>
        </v-card>

        <v-card flat id="ug_activity">
            <v-card-title  class="font-weight-bold text-body-2">Mi ultima actividad</v-card-title>
            <v-timeline dense>
                <v-timeline-item class="text-body-2" v-for="(item,i) in getitems('actividad').slice(0, 5)" :key="i"> 
                    <v-row>
                        <v-col cols="4">
                            <strong>{{ item.fecha }}</strong>
                            <br>
                            <strong>{{ item.hora }}</strong>

                        </v-col>
                        <v-col>
                            <strong>{{ item.tipo }}</strong>
                            <div class="caption">
                                {{ item.descripcion }}
                            </div>
                        </v-col>
                    </v-row>
                </v-timeline-item>
            </v-timeline>

         </v-card>

        <v-row id="ug_data" style="height: 300px;" class="text-body-2">
                        <v-col cols="4">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ getitems('equipo').length }} </h1>
                                    <br>
                                    <p class="text-center">Equipo resguardo</p>
                                </v-sheet>
                            </v-card>
                        </v-col>

                         <v-col cols="4">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ getitems('prestamos').length }} </h1>
                                     <br>
                                    <p class="text-center">Equipo prestado</p>
                                </v-sheet>
                            </v-card>
                        </v-col>

                         <v-col cols="4">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1> {{ getitems('salidas').filter( salida => salida.estatus == 'recolectado').length }} </h1>
                                     <br>
                                    <p class="text-center">Equipo en uso</p>
                                </v-sheet>
                            </v-card>
                        </v-col>

                         <v-col cols="4">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1>{{ getitems('salidas').filter( salida => salida.estatus == 'activo').length }}</h1>
                                     <br>
                                    <p class="text-center">
                                      Códigos activos 
                                    </p>
                                </v-sheet>
                            </v-card>
                        </v-col>
                         <v-col cols="4">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1>{{ getitems('salidas').filter( salida => salida.estatus == 'recolectado').length }}</h1>
                                    <br>
                                    <p class="text-center">
                                      Códigos recolectados
                                    </p>
                                </v-sheet>
                            </v-card>
                        </v-col>
                         <v-col cols="4">
                            <v-card height="100%">
                                <v-sheet class="d-flex justify-center align-center flex-column" height="100%">
                                    <h1>{{ getitems('salidas').filter( salida => salida.estatus == 'devuelto').length }}</h1>
                                     <br>
                                    <p class="text-center">
                                      Códigos devueltos
                                    </p>
                                </v-sheet>
                            </v-card>
                        </v-col>
        </v-row>

        </v-sheet>


        <v-btn height="5%" color="primary" @click="onsubmit" :loading="loading" :disabled="loading">Descargar</v-btn>


    </v-sheet>
</template>
<script>
//Frecuencia de uso
//actividad esta semana
//datos generales
//datos importantes
//mi equipo
//equipo prestado indicando a quien preste
//equipo en uso
//codigos activos, recolectados, devueltos
//equipo mas usado
import {  mapGetters  } from 'vuex'
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
               {	image: (await this.render("ug_icon")).toDataURL("image/png") , width: 500},
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
                  image: (await this.render("ug_activity")).toDataURL("image/png"), 
                  width: 400,
                  pageBreak: 'after'
                },
                {
                  text: 'Equipo bajo mi resguardo\n\n',
                  style: 'subheader'
                },
                {
                  table: {
                    widths: ['*','*','*','*','*'],
                    body: this.equipo
                        
                  }
                },
                {
                  text: '\nMis códigos\n\n',
                  style: 'subheader'
                },
                {
                  table: {
                    widths: ['*','*','*','*','*'],
                    body: this.codigos
                        
                  }
                },
                {
                  text: '\nMis codigos de prestamos\n\n',
                  style: 'subheader'
                },
                {
                  table: {
                    
                    body: this.prestamos
                        
                  },
                  pageBreak: 'after'
                  
                },
                {
                  text: '\nDatos Importantes',
                  style: 'subheader'
                },
                {	image: (await this.render("ug_data")).toDataURL("image/png") , width: 500},


                
                
               
                
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
    },
    codigos: function() {
      let data=[
        [
          {text: 'Código', style: 'subheader'},
          {text: 'Fecha', style: 'subheader'},
          {text: 'Hora', style: 'subheader'},
          {text: 'Departamento', style: 'subheader'},
          {text: 'Estatus', style: 'subheader'}
        ]
      ]

      this.getitems('salidas').forEach( item => {
        data.push( [item.id, item.fecha, item.hora, item.departamento, item.estatus] )
      }); 
      return data
    },
    prestamos: function() {
      let data=[
        [
          {text: 'Código', style: 'subheader'},
          {text: 'Fecha', style: 'subheader'},
          {text: 'Hora', style: 'subheader'},
          {text: 'Departamento', style: 'subheader'},
          {text: 'Estatus', style: 'subheader'},
          {text: 'Responsable', style: 'subheader'},
          {text: 'Cargo', style: 'subheader'}
        ]
      ]

      this.getitems('prestamos').forEach( item => {
        data.push( [item.id, item.fecha, item.hora, item.departamento, item.estatus, item.responsable, item.cargo] )
      }); 
      return data
    }
    }
}
</script>