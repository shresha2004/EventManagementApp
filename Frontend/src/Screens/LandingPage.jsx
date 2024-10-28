import React from "react";
import Navbar from "../Layouts/Navbar";
import EventsPage from "./EventPages";
import Footer from "../Layouts/Footer";


function LandingPage(){
    return(<> <div className="app-container">
    <Navbar />
    
        <EventsPage/>

        <Footer/>
        </div>
    </>)
}
export default LandingPage;