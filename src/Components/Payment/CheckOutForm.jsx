import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useRef, useState } from 'react';
// import useCart from '../../../Hooks/useCart';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

export const CheckOutForm = ({ price, id, refetch }) => {



    // console.log(price);
    // console.log(id);

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const navigate = useNavigate()



    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [pr, setPr] = useState(price)
    const [disable, setDisable] = useState(false)
    const [er, setEr] = useState()
    const totalPrice = pr

    const cuponRef = useRef(null);
    let cuponCode = '12345'
    const hancu = (e) => {
        e.preventDefault();
        const cupon = cuponRef.current.value;
        console.log(cupon);
        console.log(price);
        if (cupon === cuponCode) {
            setPr(price - 20)
            setDisable(true)
            setEr('')
        }
        else {
            setPr(price)
            setDisable(false)
            setEr('invalid cupon')
        }

    }

    console.log(totalPrice);
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then((res) => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        //confirm payment

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })

        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent : ', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transactionId : ', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                // save payment in the database

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    testId: id,
                    status: 'Pending'
                }

                const res = await axiosSecure.post('/payments', payment)
                console.log('payment save : ', res.data);
                const slot = await axiosSecure.patch(`/test-slot/${id}`)

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Payment successfully done",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                navigate('/')
            }
        }

    }


    return (
        <div>
            <div className='border flex justify-between item-center my-4 gap-5 p-5'>
                <label className='mt-3 '>Cupon :</label>
                <input disabled={disable} type="text" ref={cuponRef} name='cupon' placeholder='Enter your Cupon' className="input input-bordered " />
                <button disabled={disable} onClick={hancu} className='btn'>Apply Cupon</button>

            </div>
            
            <form onSubmit={handleSubmit}>

                <CardElement
                    className='border-2 px-2 py-10 '
                    options={{
                        style: {

                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary btn-sm my-5' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                {error?.message && <p className='text-red-700'>{error?.message}</p>}
                {transactionId && <p className='text-green-600'>Your transaction Id : {transactionId}</p>}
            </form>
        </div>
    );
};

// export default CheckOutForm;