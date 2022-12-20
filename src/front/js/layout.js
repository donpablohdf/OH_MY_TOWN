import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Help } from "./pages/help"
import { Guia } from "./pages/guia";
import { Login } from "./pages/login";
import { Search } from "./pages/search";
import { Actividades } from "./pages/actividades";
import { SignUp } from "./pages/signup";
import { UserHome } from "./pages/userhome";
import { Cart } from "./pages/cart"
import { Reservas } from "./pages/reservas"
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element = {<Home />} path="/" />
                        <Route element = {<Search/>} path = "/search"/>
                        <Route element = {<Demo />} path="/demo" />
                        <Route element = {<Help />} path="/help" />
                        <Route element = {<Guia />} path="/guia/:theid" />
                        <Route element = {<Actividades />} path="/actividades/:theid" />
                        <Route element = {<Login/>} path = "/login"/>
                        <Route element = {<SignUp/>} path = "/signup"/>
                        <Route element = {<UserHome />} path="/userhome"/>
                        <Route element = {<Cart />} path="/cart" />
                        <Route element = {<Reservas />} path="/reservas/:theid" />
                        <Route element = {<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
