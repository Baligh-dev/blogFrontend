

import axios from "axios";

export const getBlogs = (listBlogs) => {
    return {
        type: "SET_BLOGS",
        payload: listBlogs,
    };
};

export const getMyBlogs = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/blogs/${userId}`);
        dispatch({ type: "GET_MY_BLOGS", payload: res.data.blogsToFind });
    } catch (error) {
        console.log(error);
    }
};

export const addBlog = (newBlog, history) => async (dispatch) => {
    // dispatch({ type: LOAD_JOB });
    try {
        const blog = await axios.post("/api/blogs", newBlog);

        dispatch({ type: "ADD_BLOG", payload: blog.data.blog });
        history.push("/");
    } catch (error) {
        dispatch({ type: "FAIL_BLOG", payload: error.message });
    }
};