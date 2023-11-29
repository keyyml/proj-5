import React, { useEffect, useState } from "react";
import axios from "axios";
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
import MakeupPage from "./MakeupPage";
import HairPage from "./HairPage";
import SkinPage from "./SkinPage";
import ProductPage from "./ProductPage";

function App() {

    const [userProfile, setUserProfile] = useState({})
    const [productsArray, setProductsArray] = useState([])
    const [prodCatArr, setProdCatArr] = useState([])
    const [orderDetails, setOrderDetails] = useState(null)

    useEffect(() => {
        fetch("/profile")
        .then (resp => resp.json())
        .then ((data) => setUserProfile(data))
    }, [])

    console.log(userProfile)

    useEffect(() => {
        fetch("/products")
        .then(resp => resp.json())
        .then((data) => setProductsArray(data))
    }, [])

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get("/checkout")
        setOrderDetails(response.data)
      } catch (error) {
        console.error("Error fetching order details:", error)
      }
    }
  
    useEffect(() => {
      fetchOrderDetails();
    }, []);
  
    const updateCart = async (productId, newQuantity) => {
      try {
        await axios.post(`/update_quantity/${productId}`, { quantity: newQuantity })
        fetchOrderDetails()
      } catch (error) {
        console.error("Error updating quantity:", error)
      }
    }

    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Banner />
                    <Categories />
                    <HomePage productsArray = {productsArray} updateCart={updateCart}/>
                </Route>
                <Route exact path="/makeup-page">
                    <MakeupPage productsArray = {productsArray} prodCatArr = {prodCatArr} updateCart={updateCart}/>
                </Route>
                <Route exact path="/hair-page">
                    <HairPage updateCart={updateCart}/>
                </Route>
                <Route exact path="/skin-page">
                    <SkinPage updateCart={updateCart}/>
                </Route>
                <Route exact path="/cart">
                    <Cart orderDetails={orderDetails} fetchOrderDetails={fetchOrderDetails} />
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
                <Route exact path="/product-page">
                    <ProductPage updateCart={updateCart}/>
                </Route>
            </Switch>
        </div>
    )
}

export default App;
