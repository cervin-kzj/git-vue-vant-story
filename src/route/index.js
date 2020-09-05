import vue from "vue"
import VueRouter from 'vue-router'

vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: "/index",
            component: () => {
                return import("../pages/index")
            }
        },
        {
            path: "/storytype",
            component: () => {
                return import("../pages/storytype")
            }
        },
        {
            path: "/storylist/:classifyId/:classify",
            component: () => {
                return import("../pages/storylist")
            },
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: "/storydetail/:id",
            component: () => {
                return import("../pages/storydetail")
            }
        },
        {
            path: "*",
            redirect: "/index"
        }
    ]
});