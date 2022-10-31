<template>
    <v-bottom-sheet v-model="sheet" inset>

                        <template v-slot:activator="{ on, attrs }">
                            <v-sheet class="d-flex justify-center align-center flex-column select" height="100%" v-bind="attrs" v-on="on">
                                    <v-btn class="mx-2" fab dark color="red">
                                        <v-icon dark>mdi-qrcode</v-icon>
                                    </v-btn>
                                    <br>
                                    <p class="text-center">Generar código QR</p>
                            </v-sheet>
                        </template>

                        <v-sheet height="500px" class="d-flex justify-center align-center">
                            <v-sheet  height="95%" width="95%">
                                <v-container fluid>
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <h2 class="primary--text">Generar codigo QR</h2>
                                            <br>
                                        </v-col>

                                        <v-col cols="6">
                                            <v-form ref="formqr">
                                                <v-row no-gutters>
                                                    <v-col cols="12">
                                                        <v-select
                                                        :items="equipos"
                                                        label="Nombre del equipo"
                                                        :rules="rules.requerido"
                                                        v-model="no_serie" 
                                                        ></v-select>
                                                    </v-col>


                                                    <v-col cols="12">
                                                        <v-text-field :rules="rules.requerido" label="Tamaño" required v-model="tamaño" clearable></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12">
                                                        <v-btn dark color="primary" @click="generar">
                                                            Generar
                                                        </v-btn>
                                                        <v-btn class="ml-3" text @click="sheet=!sheet">Salir</v-btn>

                                                    </v-col>

                                                </v-row>
                                            </v-form>
                                        </v-col>

                                        <v-col cols="6">
                                            <iframe id="iframeContainer" width="100%" height="380" class="ml-5"></iframe>
                                        </v-col>

                                    </v-row>
                                </v-container>
                            </v-sheet>
                        </v-sheet>
    </v-bottom-sheet>
</template>
<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {  mapGetters } from 'vuex'


export default {
    name: 'generarcodigoqr',
    mounted() {

        this.getitems('equipo').forEach( item => { 

            this.equipos.push(item.nombre)

        });
        
    },
    data: () => ({
        sheet: false,
        no_serie: '',
        tamaño: 0,
        rules: {
            requerido: [v => !!v || 'Campo obligatorio']
        },
        equipos: []

    }),
    methods: {
        generar(){

            if(this.$refs.formqr.validate()){

                this.getitems('equipo').forEach( item => {

                    console.log(this.no_serie)

                    if(item.nombre == this.no_serie) {

                        var docDefinition = {
                                info: {
                                    title: 'qr-code'
                                },
                                content: [
                                    { qr: JSON.stringify(item) , fit: this.tamaño}
                                ]
                        }
                        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
                        pdfDocGenerator.getDataUrl((dataUrl) => {
                            const iframe = document.querySelector('#iframeContainer');
                            iframe.src = dataUrl;
                        });

                        console.log("entro")
                
                    }
                        
                });

            }

        },

    },
    computed: {
      ...mapGetters(['getitems'])
    }
}
</script>