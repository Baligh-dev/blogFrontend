import React from 'react';
import { Switch, Route } from "react-router";
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/home/Home';
import MyBlogs from './pages/MyBlogs'
import Blog from './pages/Blog'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        {" "}
        <Route exact path="/" component={Home} />
        <Route path="/myblogs" component={MyBlogs} />
        <Route path="/blog/:id" component={Blog} />
      </Switch>
      <Footer />
    </div>
  );
}
export default App;
