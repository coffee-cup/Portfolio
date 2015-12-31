import Vue from 'vue';
import Router from 'vue-router';
import App from '../views/App.vue';

// Components
import Home from '../views/Home.vue';
import Footer from '../views/Footer.vue';
import Nav from '../views/Nav.vue';
import Header from '../views/Header.vue';
import Contact from '../views/Contact.vue';
import Project from '../views/Project.vue';

Vue.use(Router);

// register components
Vue.component('m-footer', Footer);
Vue.component('m-nav', Nav);
Vue.component('m-contact', Contact);
Vue.component('s-header', Header);
Vue.component('s-project', Project);

var router = new Router({
  hashbang: true,
  history: true
});

router.map({
  '/': {
    component: Home
  }
});

router.beforeEach(function() {
  window.scrollTo(0, 0);
});

router.redirect({});

router.start(App, '#app');
