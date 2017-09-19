import Vue from 'vue';
import Router from 'vue-router';
// import Hello from 'src/components/Hello';
import Home from 'components/home/home';
import Subject from 'components/subject/subject';
import Sort from 'components/sort/sort';
import shopCart from 'components/shopcart/shopcart';
import userCenter from 'components/user-center/user-center';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/subject',
      name: 'subject',
      component: Subject
    },
    {
      path: '/sort',
      name: 'sort',
      component: Sort
    },
    {
      path: '/shopcart',
      name: 'shopCart',
      component: shopCart
    },
    {
      path: '/user-center',
      name: 'user-center',
      component: userCenter
    }
  ]
});
