import {createRouter, createWebHashHistory} from 'vue-router'
import home from '@/view/homeEnter'
import test from '@/view/test'
import userHome from '@/view/handle'
import {ElMessage} from 'element-plus'
import search from '@/components/search'
import ownPage from '@/components/ownPage'
import otherPage from '@/components/otherPage'
const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            // 视频播放主页
            path: '/',
            name: 'home',
            component: home,
        },
        {
            path:'/test',
            name:'test',
            component:test,
        },
        {
            path: '/handle',
            name: 'userHome',
            component: userHome,
            children:[
                // 个人主页
                {
                    path:'ownPage',
                    name:'ownPage',
                    component:ownPage,
                    //判断是否登陆代码
                    // beforeEnter:(to,form,next)=>{
                    //     if (!localStorage.getItem('user')) {
                    //         ElMessage.error('您还未登录')
                    //             router.push('/')
                    //     } else {
                    //         next();
                    //     }
                    // }
                },
                //他人主页
                {
                    //他人主页
                    path: 'otherPage', // 定义一个路由参数 userId
                    name: 'otherPage',
                    component: otherPage
                },
                //搜索
                {
                    //搜索页
                    path: 'search', // 定义一个路由参数 userId
                    name: 'search',
                    component: search
                }
            ]
        },
        ]
})
export default router;