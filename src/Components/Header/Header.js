import React from 'react'
import css from './Header.module.css'
import {NavLink, useHistory} from 'react-router-dom'
import Icon from "../Icon/Icon"
import {ICONS} from "../../Constants/Icon_Constants";


const Header = props => {

    const history = useHistory();

    const icon = <div onClick={() => {
        history.push("/basket")
    }}><Icon
        icon={ICONS.basket}
        viewBox={"0 0 32 28"}
        styles={{
            "width": "1.5em",
            "display": "inlineBlock",
            "height": "1.5em",
            "strokeWidth": "0",
            "stroke": "black",
            "fill": "black",
        }}
    /></div>

    return (
        <header className={css.Header}>
            <img src={"/"} alt={"logo"} onClick={() => {
                history.push("/")
            }}/>
            <h1>WorldSourced</h1>

            <div>
                <form>
                    <input type='text'/>
                    <input type='submit'/>
                </form>
            </div>
            <div className={css.Person}>
                <button onClick={(e) => {
                    history.push("/auth")
                }
                }>
                    Login/Register
                </button>
                {icon}
            </div>

            <div className={css.Links}>
                <NavLink to="/">Groceries </NavLink>
                <NavLink to="/">Health</NavLink>
                <NavLink to="/">Beauty</NavLink>
                <NavLink to="/">Contact</NavLink>
            </div>
        </header>
    )
}

export default Header;