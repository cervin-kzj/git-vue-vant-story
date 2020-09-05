// state
const state={
    info:{},
    storylist:[]
}
// mutations
const mutations={
    setDetail(state,info){
        state.info=info
    },
    setStoryList(state,info){
        state.storylist=info
    }
}
// actions
const actions={
    setDetail(context,info){
        context.commit("setDetail",info)
    },
    setStoryList(context,info){
        context.commit("setStoryList",info)
    }
}
// getters
const getters={
    getDetail(state){
        return state.info
    },
    getStoryList(state){
        return state.storylist
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}