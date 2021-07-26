import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        card: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
    },
}));
const Blog = ({ match }) => {
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const blog = await axios.get(`/api/blogs/${match.params.id}`);
            setBlog(blog.data.blog);
        }
        fetchData();
    }, [match]);

    return (
        <div className="row ">
            <div className="medium-12 columns">
                <div>
                    <div className="svg-wrap">
                        <svg width={64} height={64} viewBox="0 0 64 64">
                            <path id="arrow-left" d="M26.667 10.667q1.104 0 1.885 0.781t0.781 1.885q0 1.125-0.792 1.896l-14.104 14.104h41.563q1.104 0 1.885 0.781t0.781 1.885-0.781 1.885-1.885 0.781h-41.563l14.104 14.104q0.792 0.771 0.792 1.896 0 1.104-0.781 1.885t-1.885 0.781q-1.125 0-1.896-0.771l-18.667-18.667q-0.771-0.813-0.771-1.896t0.771-1.896l18.667-18.667q0.792-0.771 1.896-0.771z" />
                        </svg>
                        <svg width={64} height={64} viewBox="0 0 64 64">
                            <path id="arrow-right" d="M37.333 10.667q1.125 0 1.896 0.771l18.667 18.667q0.771 0.771 0.771 1.896t-0.771 1.896l-18.667 18.667q-0.771 0.771-1.896 0.771-1.146 0-1.906-0.76t-0.76-1.906q0-1.125 0.771-1.896l14.125-14.104h-41.563q-1.104 0-1.885-0.781t-0.781-1.885 0.781-1.885 1.885-0.781h41.563l-14.125-14.104q-0.771-0.771-0.771-1.896 0-1.146 0.76-1.906t1.906-0.76z" />
                        </svg>
                    </div>
                    {/* MAIN CONTENT */}
                    <div className="container-fluid">
                        {blog && (
                            <div className="row">
                                <div className="leftcolumn">
                                    <div className="card">
                                        <h2>{blog.title}</h2>
                                        <h5>{blog.description}</h5>
                                        <img className="fakeimg" style={{ height: "200px" }} src={blog.image} />
                                        <p>
                                            {blog.content ? JSON.stringify(JSON.parse(blog.content)._immutable.currentContent.blockMap.ikuh.text) : ''}
                                        </p>

                                    </div>
                                </div>

                            </div>
                        )}


                    </div>
                </div>

            </div>
        </div>
    )
}

export default Blog

