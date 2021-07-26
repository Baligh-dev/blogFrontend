
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const signup = (newUser, history) => async (dispatch) => {
    try {
        const result = await axios.post("/api/users/signup", newUser);
        dispatch({ type: "REGISTER_USER", payload: result.data }); //msg , token , user
        history.push("/profile");
    } catch (error) {
        dispatch({ type: "FAIL_USER", payload: error.message });
    }
};

export const login = (user, history) => async (dispatch) => {
    try {
        const result = await axios.post("/api/users/login", user);
        dispatch({ type: "LOGIN_USER", payload: result.data });
        history.push("/myblogs");
    } catch (error) {
        dispatch({ type: "FAIL_USER", payload: error.response.data.error });
    }
};

export const currentUser = () => async (dispatch) => {
    try {
        const options = {
            headers: { Authorization: localStorage.getItem("token") },
        };
        const result = await axios.get("/api/users/current", options);
        dispatch({ type: "CURRENT_USER", payload: result.data });
    } catch (error) {
        //dispatch({ type: FAIL_USER, payload: error.message });
    }
};

export const logout = () => {
    return {
        type: "LOGOUT_USER",
    };
};




