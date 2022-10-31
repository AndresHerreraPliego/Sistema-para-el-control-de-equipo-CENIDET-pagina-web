import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost/cenidet/',
    headers: { 
      'user': 'scese.cenidet@gmail.com', 
      'password': 'scese.cenidet'
    } 
  });

const api = {

    admin: function(){
        try {
            return client.get('admin');
        } catch (error) { console.error(error); }
    },
    user: function(id){
        try {
            return client.get('usuario/'+id);
        } catch (error) { console.error(error); }
    },
    login: function(data){
        try {
            return client.post('login',JSON.stringify(data));  
        } catch (error) { console.error(error); }
    },
    getannouncements: function (){
        try {
            return client.get('anuncios');
        } catch (error) { console.error(error); }
    },
    createannouncement: function (data){
        try {
            return client.post('anuncio/create',JSON.stringify(data));
        } catch (error) { console.error(error); }
    },
    deleteannouncement: function (id){
        try {
            return client.get('anuncio/delete/'+id);
        } catch (error) { console.error(error); }
    },
    createitem: function(data){
        try {
            return client.post(data.prop+'/create',JSON.stringify(data.value));
        } catch (error) { console.error(error); }
    },
    updateitem: function(data){
        try {
            return client.post(data.prop+'/update',JSON.stringify([data.value]));
        } catch (error) { console.error(error); }
    },
    createaccount: function(data) {
        try {
            return client.post('personal/create',JSON.stringify(data));
        } catch (error) { console.error(error); }
    },
    recoverpass: function(data){
        try {
            return client.post('recoverpass',JSON.stringify(data));  
        } catch (error) { console.error(error); }
    },
    search: function(data){
        try {
            return client.post('buscar/equipo',JSON.stringify(data));
        } catch (error) { console.error(error); }
    },
    uploadimageuser: function(data){
        try {
            return client.post('image/user',data);  
        } catch (error) { console.error(error); }
    },
    uploadequipment: function(data){
        try {
            return client.post('equipo/create',data);  
        } catch (error) { console.error(error); }
    }

}

export default api