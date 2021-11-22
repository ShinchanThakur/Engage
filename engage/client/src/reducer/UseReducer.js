export const initialState = false        //false

export const reducer = (state, action) => {
    if( action.type === "USER") {
        localStorage.setItem('userVerified', JSON.stringify(action.payload))
        return action.payload
    }
    return state
}