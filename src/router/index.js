import {createRouter, createWebHashHistory} from 'vue-router'
import home from '@/view/homeEnter'
import test from '@/components/UploadVideo'

const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path: '/',
            name: 'home',
            component: home,
        },
        {
            path: '/upload',
            name: 'upload',
            component: test,
        }
    ]
})
export default router;