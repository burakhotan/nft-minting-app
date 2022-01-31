import { createStore, combineReducers } from "redux";
import listReducer from "./reducers/listReducer";
import imageUrlReducer from "./reducers/imageUrlReducer";

const reducers = combineReducers({
    list: listReducer,
    imageUrl: imageUrlReducer,
})
const store = createStore(reducers)

export default store