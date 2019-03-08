import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import Index from './components/index.vue';
import Clases from './components/clases_particulares.vue'
import Apuntes from './components/apuntes.vue'
import Noticias from './components/noticias.vue'
import Contacto from './components/contacto.vue'
import Perfil from './components/perfil.vue'
import Administracion from './components/administracion.vue'
import Anuncio from './components/anuncio.vue'
import Anuncio_noticia from './components/anuncio_noticia.vue'
import store from './components/store';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';
import Registro from './components/Registro.vue';
import ModUsuario from './components/ModUsuario.vue';

const routes = [
  {
    name: 'index',
    path: '/',
    component: Index,
    meta: {
      isPublic: true
    }
  },
  {
  path: '/ClasesParticulares',
  name: 'clases',
  component: Clases,
  meta: {
    isPublic: true
  }
},
{
  path: '/Apuntes',
  name: 'apuntes',
  component: Apuntes,
  meta: {
    isPublic: true
  }
},
{
  path: '/Noticias',
  name: 'noticias',
  component: Noticias,
  meta: {
    isPublic: true
  }
},
{
  path: '/Contacto',
  name: 'contacto',
  component: Contacto,
  meta: {
    isPublic: true
  }
},
{
  path: '/Perfil',
  name: 'perfil',
  component: Perfil,
  meta: {
    isPublic: true
  }
},
{
  path: '/Admninistracion',
  name: 'administracion',
  component: Administracion,
  meta: {
    isPublic: true
  }
},
{
  path: '/Anuncio',
  name: 'anuncio',
  component: Anuncio,
  meta: {
    isPublic: true
  }
},
{
  path: '/AnuncioNoticia',
  name: 'anuncio_noticia',
  component: Anuncio_noticia,
  meta: {
    isPublic: true
  }
},
{
  name: 'Login',
  path: '/Login',
  component: Login,
  meta: {
    isPublic: true,
    justPublic: true
  }
},
{
  name: 'Logout',
  path: '/Logout',
  component: Logout,
},
{
  name: 'Registro',
  path: '/Registro',
  component: Registro,
  meta: {
    isPublic: true,
    justPublic: true
  }
},
{
  name: 'ModUsuario',
  path: '/Usuario/ModUsuario',
  component: ModUsuario,
},
];

const router = new VueRouter({ routes});

router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.isPublic) && localStorage.getItem("token") == null) {
      next();
      next('/Login');
  } else {
    // console.log(store.getters.name )
    if(to.matched.some(record => record.meta.justPublic) && localStorage.getItem("token")) {
      next('/');
    }
    else {
      if(to.matched.some(record => record.meta.isAdmin) && (store.getters.email != "root@root.com")) {
        console.log(store.getters.name )
        next('/');
      }
      else {
     // console.log("adsfadsf")
        next();
      }
    }

  }
})
new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');
