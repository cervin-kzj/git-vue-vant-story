import vue from "vue"
import vuex from "vuex"

vue.use(vuex)

import story from "./module/story"

export default new vuex.Store({
    modules:{
        story
    },
    namespaced:true
})