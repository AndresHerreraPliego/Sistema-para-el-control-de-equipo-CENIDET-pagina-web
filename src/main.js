import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueApexCharts from 'vue-apexcharts'
import VueTour from 'vue-tour'

Vue.config.productionTip = false
Vue.component('apexchart', VueApexCharts)

require('vue-tour/dist/vue-tour.css')
Vue.use(VueTour)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')