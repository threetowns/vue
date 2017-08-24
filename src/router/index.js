import App from '../App'

const index = r => require.ensure([], () => r(require('../views/index/index')), 'index')
const login = r => require.ensure([], () => r(require('../views/login/login')), 'login')
const join = r => require.ensure([], () => r(require('../views/join/join')), 'join')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转index页面
        {
            path: '',
            redirect: '/index'
        },
        //首页
        {
            path: '/index',
            component: index
        },
        //登录注册页
        {
            path: '/login',
            component: login
        },
        //注册页
        {
            path: '/join',
            component: join
        }
    ]
}]
