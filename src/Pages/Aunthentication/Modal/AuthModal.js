import React from 'react'
import Backdrop from "../../../Components/Backdrop/Backdrop";

const Modal = React.memo(props => {

    return (
        <>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div className={props.css} style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {props.children}
            </div>
        </>
    )
}, (prev, next) => prev.show === next.show);

export default Modal
