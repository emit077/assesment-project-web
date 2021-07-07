export const namespaced = true

export const state = {
    text:"",
    color:"",
    flag:false,
}

export const mutations = {
    SET_SNACKBAR(state, { flag, text, color}){
        state.flag = flag
        state.text = text
        state.color = color
        console.log({state})
    },
}

export const actions = {
    setSnackbar({commit}, items){
        commit('SET_SNACKBAR', items)
    },
}
export const getters = {
    getSnakbar:state=>{
        return state;
    },
}