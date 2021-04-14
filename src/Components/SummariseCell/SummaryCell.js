import MoneyFormatter from "../../Functions/MoneyFormatter";
import Quantity from "../Quantity/Quantity";

const Summary = (props) => {

    return (
        <div>
            <img src={props.image} alt={props.title}/>
            <p>{props.title}</p>
            <p>{MoneyFormatter(props.price, null)}</p>
            <div>
                <Quantity productId={props.productId} quantity={props.quantity} checkout={true}/>
            </div>
        </div>
    )

}
export default Summary