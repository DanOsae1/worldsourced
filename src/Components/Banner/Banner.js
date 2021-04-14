import React, {useEffect, useState} from 'react'
import css from './Banner.module.css'
import {Link} from "react-router-dom";
import useInterval from "./setInterval";

const Banner = props => {

    const [imageCounter, setImageCounter] = useState(0)
    const promoImages = ["https://picsum.photos/1000/1000", "https://picsum.photos/1000/1000", "https://picsum.photos/1000/1000"]

    useInterval(() => {
        let i = imageCounter
        if (i === 2) {
            setImageCounter(0)
        } else {
            setImageCounter(i += 1);
        }
    }, 3000)

    useEffect(() => {
    }, [imageCounter])

    return (
        <div className={css.Banner}>
            <h1>WorldSourced</h1>
            <img src={promoImages[imageCounter]}/>
            {/*<Link to="/browse">Shop all</Link>*/}
        </div>
    )
}

export default Banner