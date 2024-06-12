import React from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckOutForm } from './CheckOutForm';
// import {CheckOutForm} from './CheckOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <div>
            <div>
                
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;