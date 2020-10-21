import React, { useState }  from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements  } from '@stripe/react-stripe-js';

import "bootswatch/dist/cyborg/bootstrap.min.css";
import  axios  from 'axios';
import './App.css';

const stripePromise = loadStripe    ("pk_test_51HdG8OEkNWfwBafvdiuD06IbdK6SRU7Qx4AzAYoDniH3dUHDABSLm3bFftYQTJdOShx9ThYb9qoExnRLfIdYHc7B00jZ2dFYPu");

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

   const {error, paymentMethod} =  await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),


    });
    setLoading(true);
    if (!error) {
      console.log (paymentMethod);
      const { id } = paymentMethod;

      try {  

      const { data } = await axios.post("http://localhost:3001/api/checkout", {

      id,
      amount: 10000,
      
      });

      console.log(data);

      elements.getElement(CardElement).clear();

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }


  };
  console.log(!stripe || loading);

  return (
  <form  className= "card card-body" onSubmit={handleSubmit} >

    <img src="https://purepng.com/public/uploads/large/purepng.com-laptoplaptoptechnologyelectronicskeyboard-1121525119750ab9ua.png" 
    alt="k40 keyboard" 
    className="img-fluid"/>

    <h3 className="text-center my-2">price: 100$</h3>

    <div className="form-group">
      <CardElement className="form-control"/>

    </div>

    <button disabled={!stripe} className="btn btn-success">
      {loading ? (
        <div className="spinner-border text-light" role ="status">
          <span className="sr-only"> Loading...</span>

        </div>
      ) : (
        "buy"
      )}
      </button>
  </form>
  );


};


function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className= "row h-100">
          <div className="col-md-4 offset-md-4 h-100">
            <CheckoutForm/>
          </div>
        </div>

      </div>
    </Elements>
  );
}

export default App;
