import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getBlogs } from '../../JS/actions/blog'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import './Home.css'
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

const Home = () => {
    const classes = useStyles();
    const blogs = useSelector((state) => state.blogReducer.blogs);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {

            const result = await axios.get("/api/blogs");
            dispatch(getBlogs(result.data.blogs));
        }
        fetchData();
    }, [dispatch]);

    const history = useHistory();

    const blogDetails = (blogId) => {
        let path = `/blog/${blogId}`;
        history.push(path);
    }


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

                        {/* ABOUT */}
                        <section id="about" className="light">
                            <header className="title">
                                <h2>About <span>Us</span></h2>
                                <p>Lorem ipsum Esse esse cillum nisi cillum deserunt tempor ut pariatur qui officia. Lorem ipsum Magna eu irure sint <strong>occaecat</strong> cupidatat dolore minim irure cillum.</p>
                            </header>
                        </section>
                        {/* blogs */}
                        <section id="blogs" className="light">
                            <header className="title">
                                <h2>Blogs</h2>
                            </header>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="container-portfolio">
                                        <Grid className="listOfBlogs" >
                                            {blogs && blogs.map((blog, i) => (
                                                <Grid item xs={3} key={i}>
                                                    <Card className={classes.card}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                                className={classes.media}
                                                                src={blog.image}
                                                                component='img'
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    {blog.title}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    {blog.description}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button size="small" color="primary" onClick={() => blogDetails(blog._id)} >
                                                                Read More
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            ))}

                                        </Grid>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* FOOTER CONTACT */}
                        <section id="contact" className="dark">
                            <header className="title">
                                <h2>Contact <span>Us</span></h2>
                                <p>Lorem ipsum Esse esse cillum nisi cillum deserunt tempor ut pariatur qui officia. Lorem ipsum Magna eu irure sint occaecat cupidatat dolore minim irure cillum.</p>
                            </header>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 animated" data-animate="fadeInLeft">
                                        <form action="#">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control" placeholder="Your Name" />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="email" className="form-control" placeholder="Your Email" />
                                                </div>
                                                <div className="col-md-12">
                                                    <textarea className="form-control" rows={3} placeholder="Tell Us Everything" defaultValue={""} />
                                                </div>
                                                <div className="col-md-12">
                                                    <button className="btn btn-default submit">Send Message</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-4 animated" data-animate="fadeInRight">
                                        <address>
                                            <span><i className="fa fa-map-marker fa-lg" /> 84 State Road 123 City, State 24813</span>
                                            <span><i className="fa fa-phone fa-lg" /> (123) xxx - xxx</span>
                                            <span><i className="fa fa-envelope-o fa-lg" /> <a href="mailto:contact@example.com">contact@example.com</a></span>
                                            <span><i className="fa fa-globe fa-lg" /> <a href="http://support.example.com">support.example.com</a></span>
                                        </address>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>{/* /.container-fluid */}
                </div>
            </div>



        </div >

    );
}
export default Home;