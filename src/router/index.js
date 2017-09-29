import Vue from 'vue';
import Router from 'vue-router';
import Home from 'components/home/home';
import Subject from 'components/subject/subject';
import Sort from 'components/sort/sort';
import shopCart from 'components/shopcart/shopcart';
import userCenter from 'components/user-center/user-center';
import subjectDetail from 'components/subject-detail/subject-detail';
import sortListView from 'components/sortListView/sortListView';
import goodsDetail from 'base/goods-detail/goods-detail';
import OyBuy from 'components/oybuy/oybuy';
import Seckill from 'components/oybuy/seckill';
import Purchased from 'components/oybuy/purchased';
import SearchSubject from 'components/search-subject/search-subject';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/goods',
      component: goodsDetail
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/subject',
      component: Subject,
      children: [
        {
          path: ':id',
          component: subjectDetail
        }
      ]
    },
    {
      path: '/search-subject',
      component: SearchSubject
    },
    {
      path: '/subject/:id',
      component: subjectDetail
    },
    {
      path: '/sort',
      component: Sort,
      children: [
        {
          path: 'liveView',
          component: sortListView
        },
        {
          path: 'goods',
          component: goodsDetail
        }
      ]
    },
    {
      path: '/shopcart',
      component: shopCart
    },
    {
      path: '/user-center',
      component: userCenter,
      children: [{
        path: 'oybuy',
        component: OyBuy,
        children: [
          {
            path: 'seckill',
            component: Seckill
          },
          {
            path: 'purchased',
            component: Purchased
          }
        ]
      }]
    }
  ]
});
