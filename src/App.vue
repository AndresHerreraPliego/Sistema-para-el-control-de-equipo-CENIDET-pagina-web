<template>
  <v-app>
    <drawer></drawer>
    <v-main>
      <v-container fluid v-resize="onResize" id="container">
          <router-view></router-view>
      </v-container>
    </v-main>
      <v-snackbar
            v-model="getsnackbar.show"
            :multi-line="true"
            color="indigo"
            top>
            {{getsnackbar.message}}
      </v-snackbar>
  </v-app>
</template>

<style>
.background-cenidet{
  color: #2B266C;
}
.cenidet--text{
  color: #2B266C;
}
.select:hover{
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
}
@keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
}
</style>

<script>
import drawer from '@/components/drawer.vue'
import {  mapActions, mapGetters } from 'vuex'


export default {
  name: 'App',

  components: {
    drawer
  },
  mounted (){

  },
  data: () => ({
    showGuide: true

  }),
  methods: {
    onResize () { 
      document.getElementById('container').style.height=window.innerHeight+'px'
    }
  },
  computed: {
    ...mapGetters(['getsnackbar'])
  }
};
</script>
