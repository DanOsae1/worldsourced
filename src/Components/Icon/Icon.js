import * as PropTypes from "prop-types";
import React from 'react'


const Icon = props => {
    const styles = {
        svg: {
            display: 'inline-block',
            verticalAlign: 'middle',
            marginTop: '20%',
            marginLeft: '20%'
        },
        path: {
            fill: props.color,
        },
    };


    return (
        <svg style={props.styles ? props.styles : styles.svg}
             width={props.width}
             height={props.height}
             viewBox={props.viewBox}>
            <path style={styles.path} d={props.icon}/>
        </svg>
    )
}
Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.string
}
Icon.defaultProps = {
    size: 16,
};

export default Icon;