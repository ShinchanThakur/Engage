export const initialState = null        //false

export const reducer = (state, action) => {
    if( action.type === "USER") {
        return action.paylodad
    }
    return state
}