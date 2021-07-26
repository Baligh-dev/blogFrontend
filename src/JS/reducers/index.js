import { combineReducers } from "redux";
import userReducer from "./user";
import blogReducer from "./blog";
const rootReducer = combineReducers({
    userReducer,
    blogReducer,
});
export default rootReducer;