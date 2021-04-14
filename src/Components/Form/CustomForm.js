import React from 'react'

const CustomForm = props => {
    return (
        <form onSubmit={props.submitHandler}>
            {props.inputs.map((i ) => (
                <label key={Object.keys(i)}> {Object.keys(i)}
                    <input key={Object.keys(i)} type="text" value={Object.values(i)} name={Object.keys(i)}
                           onChange={props.changeHandler}/>
                </label>
            ))}
        </form>
    )
}
export default CustomForm
