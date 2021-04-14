import React from 'react'
import css from './Grid.module.css'
import Item from "../Item/Item";


const Grid = props => {

    return (
        <div className={css.Grid}>
            {props.items.map((p, i) => {
                return <div key={i} className={css.column}>
                    <Item imageurl={p.imageurl}
                          productId={p.productId}
                          title={p.title}
                          price={p.price}
                    />
                </div>
            })}
        </div>
    )
}

export default Grid;