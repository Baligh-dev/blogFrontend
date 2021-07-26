import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { logout, login, signup } from "../JS/actions/user";
import { Button, TextField, Dialog, FormControl, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const dispatch = useDispatch();
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openSignup, setOpenSignup] = React.useState(false);
    const history = useHistory();

    const loginUsername = useRef(null);
    const loginPassword = useRef(null);
    const signupUsername = useRef(null);
    const signupPassword = useRef(null);


    useEffect(() => {
        const token = window.localStorage.getItem('token');

        if (token) {
            dispatch({ type: "SET_ISAUTH", payload: true })
        }
    }, []);

    const handleLogin = () => {
        setOpenLogin(true)
    }

    const handleLoginClick = () => {
        const username = loginUsername.current.value
        const password = loginPassword.current.value

        dispatch(login({ username, password }, history));
        setOpenLogin(false)
    }

    const handleCloseLogin = () => {
        setOpenLogin(false)
    }


    const handleSignup = () => {
        setOpenSignup(true)
    }



    const handleSignupClick = () => {
        const username = signupUsername.current.value
        const password = signupPassword.current.value

        dispatch(signup({ username, password }));
        setOpenSignup(false)
    }
    const handleCloseSignup = () => {
        setOpenSignup(false)
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div>
            {/* HEADER */}
            <section id="header">
                {/* NAVIGATION */}
                <nav className="navbar navbar-fixed-top navbar-default bottom">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <a className="navbar-brand" href="#header">Blog-posting</a>
                        </div>{/* /.navbar-header */}
                        <div className="collapse navbar-collapse" id="menu">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/">Home</a></li>
                                {isAuth ? (
                                    <>
                                        <li><a href="/myblogs">My Blogs</a></li>
                                        <li ><a onClick={handleLogout}>Logout</a></li>
                                    </>

                                ) :
                                    (
                                        <>
                                            <li ><a onClick={handleLogin}>Login</a></li>
                                            <li ><a onClick={handleSignup} >Signup</a></li>
                                        </>
                                    )}
                            </ul>
                        </div> {/* /.navbar-collapse */}
                    </div> {/* /.container */}
                </nav>
                {/* SLIDER */}
                <div className="header-slide">
                    <section>
                        <div id="loader" className="pageload-overlay" data-opening="M 0,0 0,60 80,60 80,0 z M 80,0 40,30 0,60 40,30 z">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 60" preserveAspectRatio="none">
                                <path d="M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z" />
                            </svg>
                        </div> {/* /.pageload-overlay */}
                        <div className="image-slide bg-fixed">
                            <div className="overlay">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="slider-content">
                                                <h1 />
                                                <p>Or anything you want to share with the world.</p>
                                            </div>
                                        </div> {/* /.col-md-12 */}
                                    </div> {/* /.row */}
                                </div> {/* /.container */}
                            </div> {/* /.overlay */}
                        </div> {/* /.image-slide */}
                    </section>
                </div>{/* /.header-slide */}
            </section>
            {/* HEADER END */}
            <Dialog
                open={openLogin}
                onClose={handleCloseLogin}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
                fullwidth={true} >
                <DialogTitle >Connect to your account</DialogTitle>
                <DialogContent>

                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <FormControl>
                                <TextField label={"Username"} inputRef={loginUsername} variant="outlined" fullWidth autoFocus
                                    margin="dense" />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <TextField label={"Password"} inputRef={loginPassword} variant="outlined" fullWidth margin="dense" />
                            </FormControl>
                        </div>

                        <DialogActions>
                            <div>
                                <FormControl>

                                    <Button onClick={handleLoginClick}>Login</Button>

                                </FormControl>
                            </div>
                        </DialogActions>

                    </form>
                </DialogContent>

            </Dialog>


            <Dialog open={openSignup} onClose={handleCloseSignup} aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
                fullwidth={true}>
                <DialogTitle >Create your account</DialogTitle>
                <DialogContent>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <FormControl>
                                <TextField label={"Username"} inputRef={signupUsername} variant="outlined" fullWidth autoFocus
                                    margin="dense" />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <TextField label={"Password"} inputRef={signupPassword} variant="outlined" fullWidth margin="dense" />
                            </FormControl>
                        </div>

                        <DialogActions>
                            <div>
                                <FormControl>

                                    <Button onClick={handleSignupClick}>Signup</Button>

                                </FormControl>
                            </div>
                        </DialogActions>

                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Navbar
