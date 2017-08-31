import App from '../App'

const matching = r => require.ensure([], () => r(require('../views/matching/matching')), 'matching'); //需求撮合
const login = r => require.ensure([], () => r(require('../views/login/login')), 'login')
const join = r => require.ensure([], () => r(require('../views/join/join')), 'join')
const forget = r => require.ensure([], () => r(require('../views/forget/forget')), 'forget')
const usercenter = r => require.ensure([], () => r(require('../views/usercenter/usercenter')), 'usercenter')
const release = r => require.ensure([], () => r(require('../views/usercenter/children/release')), 'release')
const myreply = r => require.ensure([], () => r(require('../views/usercenter/children/reply')), 'reply')
const favorite = r => require.ensure([], () => r(require('../views/usercenter/children/favorite')), 'favorite')
const reply = r => require.ensure([], () => r(require('../views/reply/reply')), 'reply'); //回复页
const precision = r => require.ensure([], () => r(require('../views/precisionMarketing/precisionMarketing')), 'precisionMarketing'); //精准营销
const replyDetails = r => require.ensure([], () => r(require('../views/usercenter/children/replyDetails')), 'replyDetails'); //回复详情
const releaseDetails = r => require.ensure([], () => r(require('../views/usercenter/children/releaseDetails')), 'releaseDetails'); //发布详情
const favoriteDetails = r => require.ensure([], () => r(require('../views/usercenter/children/favoriteDetails')), 'favoriteDetails'); //收藏详情
const releaseWrite = r => require.ensure([], () => r(require('../views/release/releaseWrite')), 'releaseWrite'); //写发布
const details = r => require.ensure([], () => r(require('../views/usercenter/children/details')), 'details'); //需求详情
const notfound = r => require.ensure([], () => r(require('components/error/404')), 'notfound'); // 404

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //地址为空时跳转index页面
    {
      path: '',
      redirect: '/matching'
    },
    {
      path: '/details',
      component: details,
      meta: {
        title: '需求详情'
      }
    },
    //首页
    //  {
    //    path: '/index',
    //    component: index,
    //    meta: {
    //      title: '首页'
    //    }
    //  },
    //登录注册页
    {
      path: '/login',
      component: login,
      meta: {
        title: '登录'
        /*, keepAlive: true*/
      }
    },
    //注册页
    {
      path: '/join',
      component: join,
      meta: {
        title: '注册'
      }
    },
    //找回密码页
    {
      path: '/forget',
      component: forget,
      meta: {
        title: '找回密码'
      }
    },
    // 个人中心
    {
      path: '/usercenter',
      component: usercenter,
      meta: {
        title: '个人中心',
        requireAuth: true
      },
      children: [{
        path: 'release',
        component: release,
        meta: {
          title: '发布清单'
        }
      }, {
        path: 'reply',
        component: myreply,
        meta: {
          title: '我的回复'
        }
      }, {
        path: 'favorite',
        component: favorite,
        meta: {
          title: '我的收藏'
        }
      }]
    },
    //回复页
    {
      path: "/reply",
      name: "reply",
      component: reply,
      meta: {
        title: '回复',
        requireAuth: true
      }
    },
    //回复详情
    {
      path: "/usercenter/reply/details",
      name: "replyDetails",
      component: replyDetails,
      meta: {
        title: '回复详情'
      }
    },
    //发布详情
    {
      path: "/usercenter/release/details",
      name: "releaseDetails",
      component: releaseDetails,
      meta: {
        title: '发布详情'
      }
    },
    //发布
    {
      path: "/release",
      name: "releaseWrite",
      component: releaseWrite,
      meta: {
        title: '发布',
        requireAuth: true
      }
    },
    //收藏详情
    {
      path: "/usercenter/favorite/details",
      name: "favoriteDetails",
      component: favoriteDetails,
      meta: {
        title: '收藏详情'
      }
    },

    //需求撮合
    {
      path: "/matching",
      name: "matching",
      component: matching,
      meta: {
        title: '需求撮合'
      }
    },
    //精准营销
    {
      path: "/precision",
      name: "precisionMarketing",
      component: precision,
      meta: {
        title: '精准营销'
      }
    },
    {
      path: "/*",
      name: "error",
      component: notfound,
      meta: {
        title: '404'
      }
    }
  ]
}]
