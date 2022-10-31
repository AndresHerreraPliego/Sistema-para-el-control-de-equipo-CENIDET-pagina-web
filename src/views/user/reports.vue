<template>
      <v-sheet height="100%" class=" d-flex justify-space-between flex-wrap">

        <v-card height="100%"  class="pa-5 ma-2" max-width="590px" width="590px">
              <v-sheet height="5%" class="text-h6"> Reporte General </v-sheet>
              <v-sheet height="95%">
                <generalreport/>
              </v-sheet>
        </v-card>

        <v-card height="100%"  class="pa-5 ma-2" max-width="590px" width="590px">
              <v-sheet height="5%" class="text-h6"> Reporte Rastreo y seguimiento </v-sheet>
              <v-sheet height="95%" color="yellow" width="100%">
                <tracereport/>
              </v-sheet>
        </v-card>

        <v-card height="100%"  class="pa-5 ma-2" max-width="590px" width="590px">
              <v-sheet height="5%" class="text-h6"> Reporte de Actividad </v-sheet>
              <v-sheet height="95%">
                <activityreport/>
              </v-sheet>
        </v-card>


        
          
      </v-sheet>

</template>
<script>
import generalreport from '@/views/user/generalreport.vue'
import tracereport from '@/views/user/tracereport.vue'
import activityreport from '@/views/user/activityreport.vue'


export default {
  name: 'reportes',
  components: {
      generalreport,
      tracereport,
      activityreport
  },
  created: function () {

  },
  data: () => ({

  }),
  methods: {

  },
  computed: {

  }
}
</script>