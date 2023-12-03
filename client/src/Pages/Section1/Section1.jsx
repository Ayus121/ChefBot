import React from "react";
import Caraousel from '../../components/Caraousel/Caraousel'
import './Section1.css'
const Section1 = ()=>{
    return(
        <>
        <div className="heading">Recommended for You</div>
        <Caraousel/>
        <button className="btn">Vew All Recipes</button>
        </>
    )
}
export default Section1;