import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import css from './css/checkoutcss.module.css'

export default function PaymentForm() {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
    }, [])

    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };


    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={1}>
                <div className={css.PaymentForm}>
                    <form id="payment-form" onSubmit={handleSubmit}>
                        <CardElement id="card-element" options={cardStyle} onChange={handleChange}/>
                        <button
                            disabled={processing || disabled || succeeded}
                            id="submit"
                        >
        <span id="button-text">
          {processing ? (
              <div className={css.spinner} id="spinner"></div>
          ) : (
              "Pay now"
          )}
        </span>
                        </button>
                        {/* Show any error that happens when processing the payment */}
                        {error && (
                            <div id="card-error" role="alert">
                                {error}
                            </div>
                        )}
                        {/* Show a success message upon completion */}
                        <p className={succeeded ? css.resultMessage : [css.resultMessage, css.hidden].join(' ')}>
                            Payment succeeded, see the result in your
                            <a
                                href={`https://dashboard.stripe.com/test/payments`}
                            >
                                {" "}
                                Stripe dashboard.
                            </a> Refresh the page to pay again.
                        </p>
                    </form>
                </div>
            </Grid>
        </React.Fragment>
    );
}