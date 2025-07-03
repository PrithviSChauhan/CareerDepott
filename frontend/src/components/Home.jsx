import React from "react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import HeroSection from "./HeroSection";

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <HeroSection/>
            <Footer className="flex self-end"/>
        </div>
    )
}

export default Home;