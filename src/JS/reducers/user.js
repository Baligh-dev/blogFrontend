

const initialState = {
    users: [],
    loadUsers: false,
    user: null,
    isAuth: false,
    errors: [],
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case "REGISTER_USER":
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                user: payload.user,
                isAuth: true,
                errors: [],
            };
        case "LOGIN_USER":
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                user: payload.user,
                isAuth: true,
                errors: [],
            };
        case "CURRENT_USER":
            return {
                ...state,
                user: payload,
                isAuth: true,
                errors: [],
            };
        case "FAIL_USER":
            return {
                ...state,
                errors: [...state.errors, payload]
            };
        case "LOGOUT_USER":
            localStorage.removeItem("token");
            return {
                ...state,
                errors: [],
                user: {},
                isAuth: false,
            };
        case "SET_ISAUTH":
            return {
                ...state,
                isAuth: payload
            };
        default:
            return state;
    }
};
export default userReducer;
