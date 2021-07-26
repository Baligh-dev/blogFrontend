import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getMyBlogs } from '../JS/actions/blog'
import { TextField, Dialog, FormControl, DialogTitle, DialogContent, DialogActions, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { addBlog } from "../JS/actions/blog";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },

    },
    blogsGrid: {
        margin: theme.spacing(2),
        flexGrow: 1,
    }
}));

const MyBlogs = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [myBlogs, setMyBlogs] = useState([])
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState();
    const [content, setContent] = React.useState();
    const title = useRef(null);
    const description = useRef(null);
    const history = useHistory();
    const blogsChanged = useSelector(state => state.blogReducer.blogsChanged)
    const [changed, setChanged] = React.useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const token = window.localStorage.getItem('token');

            if (token) {
                const blogs = await axios.get("/api/blogs/", {
                    params: { token }
                });
                setMyBlogs(blogs.data.blogs);
                setChanged(false)
            }
        }
        fetchData();
    }, [dispatch, changed]);

    const blogDetails = (blogId) => {
        let path = `/blog/${blogId}`;
        history.push(path);
    }

    const handleAddBlog = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        setImage(base64)
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleAddClick = () => {
        const titleValue = title.current.value
        const descriptionValue = description.current.value
        const contentString = JSON.stringify(content)
        const token = window.localStorage.getItem('token');

        dispatch(addBlog({ title: titleValue, description: descriptionValue, image, content: contentString, token }))
        setOpen(false)
        setChanged(true)
    }

    const onEditorStateChange = (editorState) => {
        setContent(editorState)
    }
    return (
        <div>
            <section id="blogs" className="light">
                <header className="title">
                    <h2>Blogs</h2>
                    <IconButton aria-label="add" onClick={handleAddBlog}>
                        <AddIcon />
                    </IconButton>
                </header>
                <div  >
                    <Grid container spacing={1} className={classes.blogsGrid}>
                        {myBlogs && myBlogs.map((blog, i) => (
                            <Grid item xs={4} key={i}>
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
            </section>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
                fullwidth={true} >
                <DialogTitle >Add a new blog</DialogTitle>
                <DialogContent>

                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <FormControl>
                                <TextField label={"Title"} inputRef={title} variant="outlined" fullWidth autoFocus
                                    margin="dense" />
                            </FormControl>
                        </div>

                        <div>
                            <FormControl>
                                <TextField label={"Description"} inputRef={description} variant="outlined" fullWidth margin="dense" />
                            </FormControl>
                        </div>



                        <div>
                            <FormControl>
                                <input type="file" onChange={handleFileRead} />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <Editor
                                    editorState={content}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={onEditorStateChange}
                                />
                            </FormControl>
                        </div>


                        <DialogActions>
                            <div>
                                <FormControl>

                                    <Button onClick={handleAddClick}>Add</Button>

                                </FormControl>
                            </div>
                        </DialogActions>

                    </form>
                </DialogContent>

            </Dialog>



        </div>
    )
}

export default MyBlogs;
