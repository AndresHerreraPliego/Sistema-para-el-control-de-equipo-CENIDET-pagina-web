import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/store/api.js'
import createPersistedState from "vuex-persistedstate";
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access: '22',
    save: false,
    auth: false,
    user: {},
    nav: true,
    storage: [],
    announcements: [],
    snackbar: {
      show: false,
      message: ''
    }
  },
  getters: {
    getitem: (state) => (id) => {
      console.log(id)
      console.log(state)
    },
    getitems: (state) => (prop) => {
      return state.storage[prop]
    },
    getannouncements: (state) => {
      return state.announcements;
    },
    getsnackbar: (state) => {
      return state.snackbar;
    },
    getuser: (state) => {
      return state.user
    },
    getlastaccess: (state) => {
      return state.access
    }
  },
  mutations: {
    message (state,data){
      state.snackbar.show = true
      state.snackbar.message = data
    },
    login (state,data) {
      state.user=data
      state.auth = true
    },
    logout (state) {
      state.auth = false
    },
    savesession(state){
      state.save = true
    },
    exitsession(state){
      state.save = false
    },
    shownav(state){
      state.nav=true
    },
    hidenav(state){
      state.nav=false
    },
    init(state, data){
      state.storage = data
    },
    addannouncement(state,data){
      state.announcements.push(data)
    },
    additemstorage(state,data){
      state.storage[data.prop].push(data.value)
    },
    updateitemstorage(state,data){
      state.storage[data.prop].push(data.value)
    },
    lastaccess(state,data){
      state.access = data
    },
    updateuser(state,data){
      state.user = data.value
    }

  },
  actions: {
    async dologin ({ commit },data){

        commit('login',data)
        let today = new Date().toISOString().substring(0,10)
        commit('lastaccess',today)
    
    },
    async dologout ({ commit }) {
      commit('logout')
    },
    async doinit ({ commit }, data){
      
      if(data.type == 'user'){
        let response = await api.user(data.id);
        commit('init', response.data)
      }else{
        let response = await api.admin();
        commit('init', response.data)
      }
         
    },
    async doaddannouncement({commit},data){
      commit('addannouncement',data)
    },
    async doadditemstorage(commit,data){

      let response = await api.createitem(data)
      console.log(response.data)
      
      if(response.data){
        //commit('additemstorage',data)
        return response.data
      }else{
        return false
      }

    },
    async doupdateitemstorage({commit},data){

      let response = await api.updateitem(data)
     
      
      if(response.data){

        if(data.prop == 'personal'){
          commit('updateuser',data)
          
        }
        return true;
        
      }else{
        return false;
      }

    },
    async docreateaccount({commit},data){ 
      let response = await api.createaccount(data)

      if(response.data){
        commit('login',response.data)
        return true
      }else{
        return false
      }

    },
    async update({commit}){

      if(this.state.user.rol == 'admin'){
        let response = await api.admin();
        commit('init', response.data)
      }else{
        let response = await api.user(this.state.user.id);
        commit('init', response.data)
      }

    },
    async dostorage({commit},data){

      let response = await api.createitem(data)
      
      if(response.data){
        commit('additemstorage',{
          prop: 'salidas',
          value: response.data
        })
        return response.data
      }else{
        return false
      }

    },
    async storage({commit},data){

      let response = await api.createitem(data)
      
      if(response.data){
        commit('additemstorage',{
          prop: 'prestamos',
          value: response.data
        })
        return response.data
      }else{
        return false
      }

    }
  },
  plugins: [createPersistedState()]
})
