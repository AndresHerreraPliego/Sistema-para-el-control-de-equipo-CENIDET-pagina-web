<template>
    <v-sheet height="100%" class=" d-flex justify-space-between flex-wrap">
        <v-card height="100%"  class="pa-5 ma-2" max-width="590px" width="590px">
              <v-sheet height="5%" class="text-h6"> Reporte General </v-sheet>
              <v-sheet height="95%">
                <generalreport/>
              </v-sheet>
        </v-card>

        <v-card height="100%"  class="pa-5 ma-2" max-width="590px" width="590px">
              <v-sheet height="5%" class="text-h6"> Reporte de Usuarios </v-sheet>
              <v-sheet height="95%" width="100%">
                <usersreport/>
              </v-sheet>
        </v-card>

        <v-card height="100%"  class="pa-5 ma-2" max-width="590px" width="590px">
              <v-sheet height="5%" class="text-h6"> Reporte de Equipo </v-sheet>
              <v-sheet height="95%">
                <equipmentreport/>
              </v-sheet>
        </v-card>
      </v-sheet>

</template>
<script>
import generalreport from '@/views/admin/generalreport.vue'
import usersreport from '@/views/admin/usersreport.vue'
import equipmentreport from '@/views/admin/equipmentreport.vue'


export default {
  name: 'reportes',
  components: {
    generalreport,
    usersreport,
    equipmentreport

  },
  created: function () {

  },
  data: () => ({
   
  }),
  methods: {

  }
}
</script>