import React from "react";
import Navbar from "../Header/Navbar";
import HomeMain from "./HomeMain";
import HomeFeatures from "./HomeFeatures";
import Footer from "../Header/Footer";
import './HomeBodyStyle.css'

const HomeBody = () => {

    return (<>

        <Navbar />
        <HomeMain />
        <HomeFeatures />
        <Footer />

    </>)

}

export default HomeBody
