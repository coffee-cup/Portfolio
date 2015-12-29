import Vue from 'vue';
import Router from 'vue-router';
import App from '../views/App.vue';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Test from '../views/Test.vue';
import Footer from '../views/Footer.vue';
import Nav from '../views/Nav.vue';

Vue.use(Router);

// register components
Vue.component('m-footer', Footer);
Vue.component('m-nav', Nav);

var router = new Router({
  hashbang: true,
  history: true
});

router.map({
  '/': {
    component: Home
  },
  '/about': {
    component: About
  },
  '/test': {
    component: Test
  }
});

router.beforeEach(function() {
  window.scrollTo(0, 0);
});

router.redirect({});

router.start(App, '#app');
