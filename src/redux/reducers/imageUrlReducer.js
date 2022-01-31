const INITIAL_STATE = []

const imageUrlReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_IMAGE_URL":
            state = action.payload
            return state;
        default:
            return state;
    }
}

export default imageUrlReducer;