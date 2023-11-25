import React, { useEffect, useState } from "react";
import { Switch, Route } from 'react-router-dom';
import NavBar from "./NavBar";
import Cart from "./Cart";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import User from "./User";
import HomePage from "./HomePage"
import Categories from "./Categories";
import Banner from "./Banner";
import CategoryPage from "./CategoryPage";

function App() {

    const [userProfile, setUserProfile] = useState({})
    const [productsArray, setProductsArray] = useState([])

    useEffect(() => {
        fetch("/profile")
        .then (resp => resp.json())
        .then ((data) => setUserProfile(data))
    }, [])

    // console.log(userProfile)

    useEffect(() => {
        fetch("/products")
        .then(resp => resp.json())
        .then((data) => setProductsArray(data))
    }, [])

    // console.log(productsArray)
    


    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Banner />
                    <Categories />
                    <HomePage productsArray = {productsArray} />
                </Route>
                <Route exact path="/categorypage">
                    <CategoryPage />
                </Route>
                <Route exact path="/cart">
                    <Cart />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/logout">
                    <Logout />
                </Route>
                <Route exact path="/profile">
                    <User user = {userProfile}/>
                </Route>
            </Switch>
        </div>
    )
}

export default App;
