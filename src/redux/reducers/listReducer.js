const INITIAL_STATE = []

const listReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_LIST":
            state = action.payload
            return state;
        default:
            return state;
    }
}

export default listReducer;