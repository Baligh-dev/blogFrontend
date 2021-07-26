

const initialState = {
    myBlogs: [],
    errors: [],
    blogs: [],
    blog: {},
    blogsChanged: false
};

const blogReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_BLOGS":
            return { ...state, blogs: payload };
        case "GET_MY_BLOGS":
            return { ...state, myBlogs: payload, };
        case "ADD_BLOG":
            return {
                ...state,
                blog: payload.blog,
                errors: [],
                blogsChanged: true
            };
        case "FAIL_BLOG":
            return { ...state, errors: [...state.errors, payload] };
        case "BLOGS_UNCHANGED":
            return { ...state, blogsChanged: false }
        default:
            return state;
    }
};

export default blogReducer;